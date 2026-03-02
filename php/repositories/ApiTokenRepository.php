<?php
namespace WPQT\Token;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Token\ApiTokenRepository' ) ) {
    class ApiTokenRepository {

        /**
         * Retrieves a token from the database based on the provided hashed token value.
         *
         * @param string $token The hashed token value to search for in the database.
         * @return object|false Returns the token object if found, or false if no matching token is found.
         */
        public function getToken($token) {
            global $wpdb;

            $result = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT 
                        id,
                        pipeline_id,
                        name,
                        description,
                        token,
                        created_at,
                        updated_at,
                        get_pipeline,
                        patch_pipeline,
                        get_pipeline_stages,
                        post_pipeline_stages,
                        patch_pipeline_stages,
                        delete_pipeline_stages,
                        get_pipeline_tasks,
                        post_pipeline_tasks,
                        patch_pipeline_tasks,
                        delete_pipeline_tasks
                    FROM " . TABLE_WP_QUICKTASKER_API_TOKENS . " WHERE token = %s",
                    $token
                )            
            );

            if ($result) {
                return $result;
            }
            return false;
        }

        /**
         * Retrieves a token from the database based on the provided token ID for frontend display.
         *
         * @param int $tokenId The ID of the token to retrieve from the database.
         * @return object|false Returns the token object if found, or false if no matching token is found.
         */
        public function getTokenForFrontend($tokenId) {
            global $wpdb;

            $result = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT 
                        id,
                        pipeline_id,
                        name,
                        description,
                        created_at,
                        updated_at,
                        get_pipeline,
                        patch_pipeline,
                        get_pipeline_stages,
                        post_pipeline_stages,
                        patch_pipeline_stages,
                        delete_pipeline_stages,
                        get_pipeline_tasks,
                        post_pipeline_tasks,
                        patch_pipeline_tasks,
                        delete_pipeline_tasks
                    FROM " . TABLE_WP_QUICKTASKER_API_TOKENS . " WHERE id = %d",
                    $tokenId
                )            
            );

            if ($result) {
                return $result;
            }
            return false;
        }

        /**
         * Retrieves all tokens associated with a specific pipeline ID for frontend display.
         *
         * @param int $pipelineId The ID of the pipeline for which to retrieve tokens.
         * @return array Returns an array of token objects if found, or an empty array if no tokens are associated with the given pipeline ID.
         */
        public function getPipelineTokensForFrontend($pipelineId) {
            global $wpdb;

            $tokens = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT 
                        id,
                        pipeline_id,
                        name,
                        description,
                        created_at,
                        updated_at,
                        get_pipeline,
                        patch_pipeline,
                        get_pipeline_stages,
                        post_pipeline_stages,
                        patch_pipeline_stages,
                        delete_pipeline_stages,
                        get_pipeline_tasks,
                        post_pipeline_tasks,
                        patch_pipeline_tasks,
                        delete_pipeline_tasks
                    FROM " . TABLE_WP_QUICKTASKER_API_TOKENS . " WHERE pipeline_id = %d",
                    $pipelineId
                )
            );

            return $tokens ? $tokens : [];
        }

        /**
         * Retrieves the cached token name for the current request, if available.
         *
         * @param object $dbToken The token object retrieved from the database.
         * @return string Returns the cached token name.
         */
        public function getApiTokenName($dbToken) {
            if (!empty($dbToken->description)) {
                return $dbToken->name . ' (' . $dbToken->description . ')';
            }
            return $dbToken->name;
        }
    }
}