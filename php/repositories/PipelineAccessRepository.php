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
         * Checks if a WordPress user can manage API tokens, webhooks and automations.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return bool True if the user exists and has the base QuickTasker and the manage settings capabilities.
         */
        public function canManageIntegrations($wpUserId)
        {
            return user_can($wpUserId, WP_QUICKTASKER_ADMIN_ROLE) && user_can($wpUserId, WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS);
        }

        /**
         * Checks if a WordPress user can delete boards, stages, tasks and other QuickTasker items.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return bool True if the user exists and has the base QuickTasker and the allow delete capabilities.
         */
        public function canDelete($wpUserId)
        {
            return user_can($wpUserId, WP_QUICKTASKER_ADMIN_ROLE) && user_can($wpUserId, WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE);
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
         * Retrieves the IDs of the boards each of the given WordPress users has been added to.
         *
         * @param int[] $wpUserIds The WordPress user IDs.
         * @return array<int, int[]> Board IDs in ascending order, keyed by WordPress user ID.
         *                           Users without boards are left out.
         */
        public function getPipelineIdsByWPUserIds($wpUserIds)
        {
            global $wpdb;

            if (empty($wpUserIds)) {
                return [];
            }

            $placeholders = implode(',', array_fill(0, count($wpUserIds), '%d'));
            $rows = $wpdb->get_results($wpdb->prepare(
                'SELECT wp_user_id, pipeline_id FROM ' . TABLE_WP_QUICKTASKER_WP_USER_PIPELINES . "
                WHERE wp_user_id IN ($placeholders)
                ORDER BY pipeline_id ASC",
                $wpUserIds
            ));
            $pipelineIdsByWPUserId = [];

            foreach ($rows as $row) {
                $pipelineIdsByWPUserId[(int) $row->wp_user_id][] = (int) $row->pipeline_id;
            }

            return $pipelineIdsByWPUserId;
        }

        /**
         * Retrieves the ID of the board an entity belongs to.
         *
         * @param string $entityType One of 'stage', 'task', 'label', 'automation', 'webhook' or 'api_token'.
         * @param int $entityId The entity ID.
         * @return int|null The board ID, or null if the entity does not exist or has no board.
         * @throws \InvalidArgumentException If the entity type is unknown.
         */
        public function getPipelineIdOfEntity($entityType, $entityId)
        {
            global $wpdb;

            $tables = [
                'stage'      => TABLE_WP_QUICKTASKER_PIPELINE_STAGES,
                'task'       => TABLE_WP_QUICKTASKER_TASKS,
                'label'      => TABLE_WP_QUICKTASKER_LABELS,
                'automation' => TABLE_WP_QUICKTASKER_AUTOMATIONS,
                'webhook'    => TABLE_WP_QUICKTASKER_WEBHOOKS,
                'api_token'  => TABLE_WP_QUICKTASKER_API_TOKENS,
            ];

            if (!isset($tables[$entityType])) {
                throw new \InvalidArgumentException('Unknown entity type ' . $entityType);
            }

            $pipelineId = $wpdb->get_var($wpdb->prepare(
                'SELECT pipeline_id FROM ' . $tables[$entityType] . ' WHERE id = %d',
                $entityId
            ));

            return null === $pipelineId ? null : (int) $pipelineId;
        }

        /**
         * Retrieves the entity a custom field or an upload belongs to.
         *
         * @param string $ownerType Either 'custom_field' or 'upload'.
         * @param int $ownerId The custom field or upload ID.
         * @return object|null Object with entity_type and entity_id, or null if it does not exist.
         * @throws \InvalidArgumentException If the owner type is unknown.
         */
        public function getEntityOf($ownerType, $ownerId)
        {
            global $wpdb;

            $tables = [
                'custom_field' => TABLE_WP_QUICKTASKER_CUSTOM_FIELDS,
                'upload'       => TABLE_WP_QUICKTASKER_UPLOADS,
            ];

            if (!isset($tables[$ownerType])) {
                throw new \InvalidArgumentException('Unknown owner type ' . $ownerType);
            }

            return $wpdb->get_row($wpdb->prepare(
                'SELECT entity_type, entity_id FROM ' . $tables[$ownerType] . ' WHERE id = %d',
                $ownerId
            ));
        }

        /**
         * Checks if a board, or something that belongs to a board, exists.
         *
         * @param string $entityType 'pipeline', a board entity type or an attached entity type.
         *                           See PipelineAccessService::canAccessEntity().
         * @param int $entityId The entity ID.
         * @return bool True if the entity exists, or if the entity type has no table to look it up in.
         */
        public function entityExists($entityType, $entityId)
        {
            global $wpdb;

            $tables = [
                'pipeline'     => TABLE_WP_QUICKTASKER_PIPELINES,
                'stage'        => TABLE_WP_QUICKTASKER_PIPELINE_STAGES,
                'task'         => TABLE_WP_QUICKTASKER_TASKS,
                'label'        => TABLE_WP_QUICKTASKER_LABELS,
                'automation'   => TABLE_WP_QUICKTASKER_AUTOMATIONS,
                'webhook'      => TABLE_WP_QUICKTASKER_WEBHOOKS,
                'api_token'    => TABLE_WP_QUICKTASKER_API_TOKENS,
                'custom_field' => TABLE_WP_QUICKTASKER_CUSTOM_FIELDS,
                'upload'       => TABLE_WP_QUICKTASKER_UPLOADS,
            ];

            if (!isset($tables[$entityType])) {
                return true;
            }

            return null !== $wpdb->get_var($wpdb->prepare(
                'SELECT id FROM ' . $tables[$entityType] . ' WHERE id = %d',
                $entityId
            ));
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
