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
         * Raw lookup of a single notify_<type> column.
         * Returns null when the row does not exist or the type is unknown.
         */
        public function getNotifyFlag($userId, $userType, $type)
        {
            if (!in_array($type, self::NOTIFICATION_TYPES, true)) {
                return null;
            }

            global $wpdb;

            $value = $wpdb->get_var($wpdb->prepare(
                'SELECT notify_' . $type . ' FROM ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                WHERE user_id = %d AND user_type = %s',
                $userId,
                $userType
            ));

            if (null === $value) {
                return null;
            }

            return (bool) ((int) $value);
        }

        /**
         * @param int[]|null $selectedPipelineIds null means "all boards" (no filter).
         * @param array<string,bool> $notificationTypes Map of type => enabled. Unknown keys are ignored;
         *                                              missing keys default to true.
         */
        public function insert($userId, $userType, $filter, $maxAgeHours, $selectedPipelineIds, array $notificationTypes = [])
        {
            global $wpdb;

            $encoded = $this->encodePipelineIds($selectedPipelineIds);
            $nowUtc = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();

            $columns = ['user_id', 'user_type', 'filter', 'max_age_hours', 'selected_pipeline_ids'];
            $placeholders = ['%d', '%s', '%s', '%d', (null === $encoded ? 'NULL' : '%s')];
            $params = [$userId, $userType, $filter, $maxAgeHours];
            if (null !== $encoded) {
                $params[] = $encoded;
            }

            foreach (self::NOTIFICATION_TYPES as $type) {
                $columns[] = 'notify_' . $type;
                $placeholders[] = '%d';
                $params[] = $this->resolveNotifyValue($type, $notificationTypes);
            }

            $columns[] = 'created_at';
            $columns[] = 'updated_at';
            $placeholders[] = '%s';
            $placeholders[] = '%s';
            $params[] = $nowUtc;
            $params[] = $nowUtc;

            $sql = 'INSERT INTO ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                (' . implode(', ', $columns) . ')
                VALUES (' . implode(', ', $placeholders) . ')';

            $wpdb->query($wpdb->prepare($sql, $params));
        }

        /**
         * @param int[]|null $selectedPipelineIds null means "all boards" (no filter).
         * @param array<string,bool> $notificationTypes Map of type => enabled. Unknown keys are ignored;
         *                                              missing keys default to true.
         */
        public function update($userId, $userType, $filter, $maxAgeHours, $selectedPipelineIds, array $notificationTypes = [])
        {
            global $wpdb;

            $encoded = $this->encodePipelineIds($selectedPipelineIds);
            $nowUtc = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();

            $assignments = ['filter = %s', 'max_age_hours = %d'];
            $params = [$filter, $maxAgeHours];

            if (null === $encoded) {
                $assignments[] = 'selected_pipeline_ids = NULL';
            } else {
                $assignments[] = 'selected_pipeline_ids = %s';
                $params[] = $encoded;
            }

            foreach (self::NOTIFICATION_TYPES as $type) {
                $assignments[] = 'notify_' . $type . ' = %d';
                $params[] = $this->resolveNotifyValue($type, $notificationTypes);
            }

            $assignments[] = 'updated_at = %s';
            $params[] = $nowUtc;

            $params[] = $userId;
            $params[] = $userType;

            $sql = 'UPDATE ' . TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES . '
                SET ' . implode(', ', $assignments) . '
                WHERE user_id = %d AND user_type = %s';

            $wpdb->query($wpdb->prepare($sql, $params));
        }

        private function encodePipelineIds($selectedPipelineIds)
        {
            if (null === $selectedPipelineIds) {
                return null;
            }

            return wp_json_encode(array_values(array_map('intval', $selectedPipelineIds)));
        }

        private function resolveNotifyValue($type, array $notificationTypes)
        {
            if (!array_key_exists($type, $notificationTypes)) {
                return 1;
            }

            return $notificationTypes[$type] ? 1 : 0;
        }
    }
}
