<?php

namespace WPQT\Pipeline;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Pipeline\PipelineAccessRepository')) {
    class PipelineAccessRepository
    {
        /**
         * Checks if a WordPress user can access every board without being added to them.
         *
         * Only WordPress administrators can.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return bool True if the user can access every board.
         */
        public function canAccessAllPipelines($wpUserId)
        {
            return user_can($wpUserId, 'manage_options');
        }

        /**
         * Retrieves the IDs of the boards a WordPress user has been added to.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return int[] The board IDs, in ascending order.
         */
        public function getPipelineIdsByWPUserId($wpUserId)
        {
            global $wpdb;

            $pipelineIds = $wpdb->get_col($wpdb->prepare(
                'SELECT pipeline_id FROM ' . TABLE_WP_QUICKTASKER_WP_USER_PIPELINES . '
                WHERE wp_user_id = %d
                ORDER BY pipeline_id ASC',
                $wpUserId
            ));

            return array_map('intval', $pipelineIds);
        }

        /**
         * Adds a WordPress user to a board. Does nothing if the user is already added.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int $pipelineId The board ID.
         * @return void
         * @throws \Exception If the user could not be added.
         */
        public function addWPUserToPipeline($wpUserId, $pipelineId)
        {
            global $wpdb;

            $result = $wpdb->query($wpdb->prepare(
                'INSERT IGNORE INTO ' . TABLE_WP_QUICKTASKER_WP_USER_PIPELINES . '
                (wp_user_id, pipeline_id, created_at)
                VALUES (%d, %d, %s)',
                $wpUserId,
                $pipelineId,
                ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ));

            if (false === $result) {
                throw new \Exception('Failed to add the user to the board');
            }
        }

        /**
         * Removes a WordPress user from a board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int $pipelineId The board ID.
         * @return void
         * @throws \Exception If the user could not be removed.
         */
        public function removeWPUserFromPipeline($wpUserId, $pipelineId)
        {
            global $wpdb;

            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_WP_USER_PIPELINES, [
                'wp_user_id'  => $wpUserId,
                'pipeline_id' => $pipelineId,
            ], ['%d', '%d']);

            if (false === $result) {
                throw new \Exception('Failed to remove the user from the board');
            }
        }

        /**
         * Removes every WordPress user from a board.
         *
         * @param int $pipelineId The board ID.
         * @return void
         */
        public function deletePipelineAccess($pipelineId)
        {
            global $wpdb;

            $wpdb->delete(TABLE_WP_QUICKTASKER_WP_USER_PIPELINES, [
                'pipeline_id' => $pipelineId,
            ], ['%d']);
        }

        /**
         * Removes a WordPress user from every board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return void
         */
        public function deleteWPUserAccess($wpUserId)
        {
            global $wpdb;

            $wpdb->delete(TABLE_WP_QUICKTASKER_WP_USER_PIPELINES, [
                'wp_user_id' => $wpUserId,
            ], ['%d']);
        }
    }
}
