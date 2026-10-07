<?php

namespace WPQT\Token;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Token\ApiTokenRepository')) {
    class ApiTokenRepository
    {
        /**
         * Retrieves a token from the database based on the provided hashed token value.
         *
         * @param string $token The hashed token value to search for in the database.
         * @return object|false Returns the token object if found, or false if no matching token is found.
         */
        public function getToken($token)
        {
            global $wpdb;

            $result = $wpdb->get_row(
                $wpdb->prepare(
                    'SELECT 
                        id,
                        pipeline_id,
                        name,
                        description,
                        token,
                        created_by,
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
                    FROM ' . TABLE_WP_QUICKTASKER_API_TOKENS . ' WHERE token = %s',
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
        public function getTokenForFrontend($tokenId)
        {
            global $wpdb;

            $result = $wpdb->get_row(
                $wpdb->prepare(
                    $this->getFrontendTokenQuery() . ' WHERE t.id = %d',
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
        public function getPipelineTokensForFrontend($pipelineId)
        {
            global $wpdb;

            $tokens = $wpdb->get_results(
                $wpdb->prepare(
                    $this->getFrontendTokenQuery() . ' WHERE t.pipeline_id = %d',
                    $pipelineId
                )
            );

            return $tokens ? $tokens : [];
        }

        /**
         * Retrieves the API tokens a WordPress user created.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[]|null $pipelineIds Only tokens on these boards, or null for tokens on every board.
         * @return array Token objects with id, pipeline_id and name.
         */
        public function getTokensCreatedByWPUser($wpUserId, $pipelineIds = null)
        {
            global $wpdb;

            if (null !== $pipelineIds && empty($pipelineIds)) {
                return [];
            }

            $sql = 'SELECT id, pipeline_id, name, delete_pipeline_stages, delete_pipeline_tasks FROM ' . TABLE_WP_QUICKTASKER_API_TOKENS . ' WHERE created_by = %d';
            $params = [$wpUserId];

            if (null !== $pipelineIds) {
                $sql .= ' AND pipeline_id IN (' . implode(',', array_fill(0, count($pipelineIds), '%d')) . ')';
                $params = array_merge($params, array_values($pipelineIds));
            }

            return $wpdb->get_results($wpdb->prepare($sql . ' ORDER BY id ASC', $params));
        }

        /**
         * Builds the query that selects tokens for frontend display, without the hashed token value
         * and with the name of the WordPress user who created each token.
         *
         * @return string The SELECT and FROM clauses, with the tokens table aliased t.
         */
        private function getFrontendTokenQuery()
        {
            global $wpdb;

            return 'SELECT
                        t.id,
                        t.pipeline_id,
                        t.name,
                        t.description,
                        t.created_at,
                        t.updated_at,
                        t.created_by,
                        u.display_name AS created_by_name,
                        t.get_pipeline,
                        t.patch_pipeline,
                        t.get_pipeline_stages,
                        t.post_pipeline_stages,
                        t.patch_pipeline_stages,
                        t.delete_pipeline_stages,
                        t.get_pipeline_tasks,
                        t.post_pipeline_tasks,
                        t.patch_pipeline_tasks,
                        t.delete_pipeline_tasks
                    FROM ' . TABLE_WP_QUICKTASKER_API_TOKENS . ' AS t
                    LEFT JOIN ' . $wpdb->users . ' AS u ON u.ID = t.created_by';
        }

        /**
         * Retrieves the cached token name for the current request, if available.
         *
         * @param object $dbToken The token object retrieved from the database.
         * @return string Returns the cached token name.
         */
        public function getApiTokenName($dbToken)
        {
            if (!empty($dbToken->description)) {
                return $dbToken->name . ' (' . $dbToken->description . ')';
            }

            return $dbToken->name;
        }
    }
}
