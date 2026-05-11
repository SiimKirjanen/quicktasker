<?php

namespace WPQT\Notification;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Notification\NotificationPreferencesRepository')) {
    class NotificationPreferencesRepository
    {
        /**
         * @return array|null Associative array with keys filter, max_age_hours, selected_pipeline_ids (int[]|null), or null if no row exists.
         */
        public function get($userId, $userType)
        {
            global $wpdb;

            $row = $wpdb->get_row($wpdb->prepare(
                'SELECT filter, max_age_hours, selected_pipeline_ids FROM ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                WHERE user_id = %d AND user_type = %s',
                $userId,
                $userType
            ), \ARRAY_A);

            if (!$row) {
                return null;
            }

            $rawIds = $row['selected_pipeline_ids'];
            $selectedIds = null;
            if (null !== $rawIds && '' !== $rawIds) {
                $decoded = json_decode($rawIds, true);
                if (is_array($decoded)) {
                    $selectedIds = array_values(array_map('intval', $decoded));
                }
            }

            return [
                'filter'                => (string) $row['filter'],
                'max_age_hours'         => (int) $row['max_age_hours'],
                'selected_pipeline_ids' => $selectedIds,
            ];
        }

        /**
         * @param int[]|null $selectedPipelineIds null means "all boards" (no filter).
         */
        public function upsert($userId, $userType, $filter, $maxAgeHours, $selectedPipelineIds)
        {
            global $wpdb;

            $encoded = null === $selectedPipelineIds
                ? null
                : wp_json_encode(array_values(array_map('intval', $selectedPipelineIds)));

            $nowUtc = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();

            $sql = 'INSERT INTO ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                (user_id, user_type, filter, max_age_hours, selected_pipeline_ids, created_at, updated_at)
                VALUES (%d, %s, %s, %d, ' . (null === $encoded ? 'NULL' : '%s') . ', %s, %s)
                ON DUPLICATE KEY UPDATE
                    filter = VALUES(filter),
                    max_age_hours = VALUES(max_age_hours),
                    selected_pipeline_ids = VALUES(selected_pipeline_ids),
                    updated_at = VALUES(updated_at)';

            $params = [$userId, $userType, $filter, $maxAgeHours];
            if (null !== $encoded) {
                $params[] = $encoded;
            }
            $params[] = $nowUtc;
            $params[] = $nowUtc;

            $wpdb->query($wpdb->prepare($sql, $params));
        }
    }
}
