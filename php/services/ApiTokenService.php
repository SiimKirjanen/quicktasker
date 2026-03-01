<?php
namespace WPQT\Token;
use WP_REST_Request;
use WP_Error;
use WPQT\Services\ServiceLocator;
use WPQT\WPQTException;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Token\ApiTokenService' ) ) {
    class ApiTokenService {
        private static $hashMethod = 'sha256';
        private static $requestTokenCache = [];

        private static $allowedCacheKeys = [
            WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN,
            WP_QUICKTASKER_CACHED_API_TOKEN_HASHED,
            WP_QUICKTASKER_CACHED_API_DB_TOKEN
        ];

        /**
         * Hashes the given token using the defined hashing method.
         *
         * @param string $token The plain token to be hashed.
         * @return string The hashed version of the token.
         */
        public static function hashToken($token) {
            return hash(self::$hashMethod, $token);
        }

        /**
         * Generates a random token string of the specified length, prefixed with the pipeline ID.
         *
         * @param int $length The length of the random part of the token (excluding the pipeline ID and separator). Defaults to 32.
         * @param int|string $pipelineId The ID of the pipeline to be included in the token.
         * @return string The generated token string in the format "{pipelineId}-{randomString}".
         */
        public static function generateRandomToken($length = 32, $pipelineId) {
            return $pipelineId . '-' . bin2hex(random_bytes($length));
        }

        /**
         * Verifies if the provided plain token matches the hashed token.
         *
         * @param string $token The plain token to verify.
         * @param string $hashedToken The hashed token to compare against.
         * @return bool Returns true if the tokens match, false otherwise.
         */
        public static function verifyToken($token, $hashedToken) {
            return hash_equals(self::hashToken($token), $hashedToken);
        }

        /**
         * Extracts the token from the request headers, supporting both 'Authorization' and 'authorization' keys, and handles 'Bearer ' prefix.
         *
         * @param array $headers The array of request headers to extract the token from.
         * @return string|null The extracted token string if found, or null if no valid token is present in the headers.
         */
        public static function extractTokenFromHeaders($headers) {
            // Check for Authorization header (case-insensitive)
            $auth = $headers['Authorization'] ?? $headers['authorization'] ?? null;
            
            if (!$auth) {
                return null;
            }
            
            // Handle array case
            if (is_array($auth)) {
                $auth = reset($auth); // Get first element
            }
            
            // Remove 'Bearer ' prefix (case-insensitive)
            $auth = trim($auth);
            if (stripos($auth, 'Bearer ') === 0) {
                return substr($auth, 7); // Remove 'Bearer ' (7 characters)
            }
            
            return $auth;
        }

        /**
         * Validates the token from the request headers and caches its data for the current request.
         *
         * @param WP_REST_Request $request The REST API request object containing the headers to extract the token from.
         * @param array $requiredPermissions An optional array of required permission keys that the token must have to be considered valid.
         * @return bool|WP_Error Returns true if the token is valid and has the required permissions, or a WP_Error object if validation fails.
         */
        public static function validateAndSetRequestTokenCache(WP_REST_Request $request, $requiredPermissions = []) {
            $token = self::extractTokenFromHeaders($request->get_headers());
            
            if (!$token) {
                 return new WP_Error('missing_token', 'Authorization token not provided.', array('status' => 401));
            }

            $tokenHashed = self::hashToken($token);
            $savedToken = ServiceLocator::get('ApiTokenRepository')->getToken($tokenHashed);
            if (!$savedToken) {
                return new WP_Error('invalid_token', 'Invalid authorization token.', array('status' => 401));
            }

            $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($savedToken->pipeline_id);
            if (!$pipeline) {
                return new WP_Error('invalid_token', 'Invalid authorization token: associated pipeline not found.', array('status' => 401));
            }

             if (!empty($requiredPermissions) && !self::checkTokenPermissions($savedToken, $requiredPermissions)) {
                return new WP_Error('insufficient_permissions', 'The token does not have the required permissions.', array('status' => 403));
            }

            if (!$savedToken) {
                return new WP_Error('invalid_token', 'Invalid authorization token.', array('status' => 401));
            }

            if (!empty($requiredPermissions) && !self::checkTokenPermissions($savedToken, $requiredPermissions)) {
                return new WP_Error('insufficient_permissions', 'The token does not have the required permissions.', array('status' => 403));
            }

            // Cache token data for this request
            self::$requestTokenCache = [
                WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN => $token,
                WP_QUICKTASKER_CACHED_API_TOKEN_HASHED => $tokenHashed,
                WP_QUICKTASKER_CACHED_API_DB_TOKEN => $savedToken
            ];

            return true;
        }

        /**
         * Checks if the token has the required permissions.
         *
         * @param object $dbToken The token object retrieved from the database, containing its permissions.
         * @param array $requiredPermissions An array of required permission keys to check against the token's capabilities.
         * @return bool Returns true if the token has all required permissions, false otherwise.
         */
        public static function checkTokenPermissions($dbToken, $requiredPermissions) {
            foreach ($requiredPermissions as $permission) {
                if (
                    !property_exists($dbToken, $permission) ||
                    (string)$dbToken->$permission !== '1'
                ) {
                    return false;
                }
            }
            return true;
        }

        /**
         * Retrieves the cached token data for the current request. If a specific key is provided, it returns the corresponding value from the cache.
         *
         * @param string|null $key An optional key to retrieve a specific piece of token data from the cache. Must be one of the allowed cache keys.
         * @return mixed Returns the entire token cache array if no key is provided, or the specific cached value if a valid key is given. Returns null if an invalid key is requested.
         */
        public static function getRequestTokenCache($key = null) {
            if ($key !== null) {
                // Validate key is allowed
                if (!in_array($key, self::$allowedCacheKeys, true)) {
                    return null;
                }
                return self::$requestTokenCache[$key] ?? null;
            }
            
            return self::$requestTokenCache;
        }

        public static function generateApiToken($args) {
            global $wpdb;

            $defaultParams = array(
                'name' => null,
                'pipeline_id' => null,
                'description' => '',
                'get_pipeline' => true,
                'patch_pipeline' => false,
                'get_pipeline_stages' => false,
                'post_pipeline_stages' => false,
                'patch_pipeline_stages' => false,
                'delete_pipeline_stages' => false,
                'get_pipeline_tasks' => false,
                'post_pipeline_tasks' => false,
                'patch_pipeline_tasks' => false,
                'delete_pipeline_tasks' => false,
            );
            $args = wp_parse_args($args, $defaultParams);

            if (empty($args['name'])) {
                throw new WPQTException('Token name is required.');
            }
            if (empty($args['pipeline_id'])) {
                throw new WPQTException('Board ID is required.');
            }

            $token = self::generateRandomToken(32, $args['pipeline_id']);
            $hashedToken = self::hashToken($token);
            $timeRepository = ServiceLocator::get("TimeRepository");

            $result = $wpdb->insert(
                TABLE_WP_QUICKTASKER_API_TOKENS,
                array(
                    'name' => sanitize_text_field($args['name']),
                    'pipeline_id' => intval($args['pipeline_id']),
                    'description' => sanitize_textarea_field($args['description']),
                    'token' => $hashedToken,
                    'created_at' => $timeRepository->getCurrentUTCTime(),
                    'updated_at' => $timeRepository->getCurrentUTCTime(),
                    'get_pipeline' => $args['get_pipeline'],
                    'patch_pipeline' => $args['patch_pipeline'],
                    'get_pipeline_stages' => $args['get_pipeline_stages'],
                    'post_pipeline_stages' => $args['post_pipeline_stages'],
                    'patch_pipeline_stages' => $args['patch_pipeline_stages'],
                    'delete_pipeline_stages' => $args['delete_pipeline_stages'],
                    'get_pipeline_tasks' => $args['get_pipeline_tasks'],
                    'post_pipeline_tasks' => $args['post_pipeline_tasks'],
                    'patch_pipeline_tasks' => $args['patch_pipeline_tasks'],
                    'delete_pipeline_tasks' => $args['delete_pipeline_tasks'],
                ),
                array(
                    '%s', // name
                    '%d', // pipeline_id
                    '%s', // description
                    '%s', // token
                    '%s', // created_at
                    '%s', // updated_at
                    '%d', // get_pipeline
                    '%d', // patch_pipeline
                    '%d', // get_pipeline_stages
                    '%d', // post_pipeline_stages
                    '%d', // patch_pipeline_stages
                    '%d', // delete_pipeline_stages
                    '%d', // get_pipeline_tasks
                    '%d', // post_pipeline_tasks
                    '%d', // patch_pipeline_tasks
                    '%d', // delete_pipeline_tasks
                )
            );
    
            if ($result === false) {
                throw new WPQTException('Failed to generate API token.');
            }
            $tokenId = $wpdb->insert_id;

            $savedToken = ServiceLocator::get('ApiTokenRepository')->getTokenForFrontend($tokenId);

            return array(
                'token' => $token,
                'token_hashed' => $hashedToken,
                'db_token' => $savedToken
            );
        }

        public static function deleteApiToken($pipelineId, $tokenId) {
            global $wpdb;

            $result = $wpdb->delete(
                TABLE_WP_QUICKTASKER_API_TOKENS,
                array('id' => intval($tokenId), 'pipeline_id' => intval($pipelineId)),
                array('%d', '%d')
            );

            if ($result === false) {
                throw new WPQTException('Failed to delete API token.');
            }

            return $result;
        }
    }
}
