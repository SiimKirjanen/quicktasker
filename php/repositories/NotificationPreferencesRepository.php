<?php

namespace WPQT\Notification;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Notification\NotificationPreferencesRepository')) {
    class NotificationPreferencesRepository
    {
        public const NOTIFICATION_TYPES = [
            'task_completion_changed',
            'task_assignment_changed',
            'task_archive_changed',
            'task_deleted',
            'stage_changed',
            'due_date_changed',
            'comment_added',
        ];

        /**
         * @return array|null Associative array with keys filter, max_age_hours,
         *                    selected_pipeline_ids (int[]|null), notification_types (array<string,bool>),
         *                    or null if no row exists.
         */
        public function get($userId, $userType)
        {
            global $wpdb;

            $columns = ['filter', 'max_age_hours', 'selected_pipeline_ids'];
            foreach (self::NOTIFICATION_TYPES as $type) {
                $columns[] = 'notify_' . $type;
            }

            $row = $wpdb->get_row($wpdb->prepare(
                'SELECT ' . implode(', ', $columns) . ' FROM ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
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

            $notificationTypes = [];
            foreach (self::NOTIFICATION_TYPES as $type) {
                $col = 'notify_' . $type;
                $notificationTypes[$type] = isset($row[$col]) ? (bool) ((int) $row[$col]) : true;
            }

            return [
                'filter'                => (string) $row['filter'],
                'max_age_hours'         => (int) $row['max_age_hours'],
                'selected_pipeline_ids' => $selectedIds,
                'notification_types'    => $notificationTypes,
            ];
        }

        /**
         * Returns true if the given notification type is enabled for the user.
         * Defaults to true when no preferences row exists yet.
         */
        public function isTypeEnabled($userId, $userType, $type)
        {
            if (!in_array($type, self::NOTIFICATION_TYPES, true)) {
                return true;
            }

            global $wpdb;

            $value = $wpdb->get_var($wpdb->prepare(
                'SELECT notify_' . $type . ' FROM ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                WHERE user_id = %d AND user_type = %s',
                $userId,
                $userType
            ));

            if (null === $value) {
                return true;
            }

            return (bool) ((int) $value);
        }

        /**
         * @param int[]|null $selectedPipelineIds null means "all boards" (no filter).
         * @param array<string,bool> $notificationTypes Map of type => enabled. Unknown keys are ignored;
         *                                              missing keys default to true.
         */
        public function upsert($userId, $userType, $filter, $maxAgeHours, $selectedPipelineIds, array $notificationTypes = [])
        {
            global $wpdb;

            $encoded = null === $selectedPipelineIds
                ? null
                : wp_json_encode(array_values(array_map('intval', $selectedPipelineIds)));

            $nowUtc = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();

            $insertColumns = ['user_id', 'user_type', 'filter', 'max_age_hours', 'selected_pipeline_ids'];
            $insertPlaceholders = ['%d', '%s', '%s', '%d', (null === $encoded ? 'NULL' : '%s')];
            $params = [$userId, $userType, $filter, $maxAgeHours];
            if (null !== $encoded) {
                $params[] = $encoded;
            }

            $updateAssignments = [
                'filter = VALUES(filter)',
                'max_age_hours = VALUES(max_age_hours)',
                'selected_pipeline_ids = VALUES(selected_pipeline_ids)',
                'updated_at = VALUES(updated_at)',
            ];

            foreach (self::NOTIFICATION_TYPES as $type) {
                $column = 'notify_' . $type;
                $enabled = array_key_exists($type, $notificationTypes)
                    ? ($notificationTypes[$type] ? 1 : 0)
                    : 1;
                $insertColumns[] = $column;
                $insertPlaceholders[] = '%d';
                $params[] = $enabled;
                $updateAssignments[] = $column . ' = VALUES(' . $column . ')';
            }

            $insertColumns[] = 'created_at';
            $insertColumns[] = 'updated_at';
            $insertPlaceholders[] = '%s';
            $insertPlaceholders[] = '%s';
            $params[] = $nowUtc;
            $params[] = $nowUtc;

            $sql = 'INSERT INTO ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                (' . implode(', ', $insertColumns) . ')
                VALUES (' . implode(', ', $insertPlaceholders) . ')
                ON DUPLICATE KEY UPDATE ' . implode(', ', $updateAssignments);

            $wpdb->query($wpdb->prepare($sql, $params));
        }
    }
}
