<?php

namespace WPQT\Notification;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Notification\NotificationRepository')) {
    class NotificationRepository
    {
        public const ENTITY_TYPE_TASK = 'task';

        /**
         * Retrieves notifications for a given user on a pipeline since a UTC datetime.
         *
         * @param int $pipelineId
         * @param int $userId
         * @param string $userType
         * @param string $sinceUtc Datetime string (UTC) — only rows with date >= this are returned.
         * @return array
         */
        public function getNotificationsForUserOnPipeline($pipelineId, $userId, $userType, $sinceUtc)
        {
            global $wpdb;

            return $wpdb->get_results($wpdb->prepare(
                'SELECT id, pipeline_id, type, entity_type, entity_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
                WHERE pipeline_id = %d
                  AND user_id = %d
                  AND user_type = %s
                  AND date >= %s
                ORDER BY date DESC',
                $pipelineId,
                $userId,
                $userType,
                $sinceUtc
            ));
        }

        /**
         * Retrieves notifications for a given user across all pipelines (or a subset) since a UTC datetime.
         *
         * @param int $userId
         * @param string $userType
         * @param string $sinceUtc Datetime string (UTC) — only rows with date >= this are returned.
         * @param int[] $pipelineIds Optional list of pipeline IDs to restrict to. Empty array means all pipelines.
         * @return array
         */
        public function getNotificationsForUser($userId, $userType, $sinceUtc, array $pipelineIds = [])
        {
            global $wpdb;

            $ids = array_values(array_filter(array_map('intval', $pipelineIds)));

            if (!empty($ids)) {
                $placeholders = implode(',', array_fill(0, count($ids), '%d'));
                $params = array_merge([$userId, $userType, $sinceUtc], $ids);

                return $wpdb->get_results($wpdb->prepare(
                    'SELECT id, pipeline_id, type, entity_type, entity_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
                    WHERE user_id = %d
                      AND user_type = %s
                      AND date >= %s
                      AND pipeline_id IN (' . $placeholders . ')
                    ORDER BY date DESC',
                    $params
                ));
            }

            return $wpdb->get_results($wpdb->prepare(
                'SELECT id, pipeline_id, type, entity_type, entity_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
                WHERE user_id = %d
                  AND user_type = %s
                  AND date >= %s
                ORDER BY date DESC',
                $userId,
                $userType,
                $sinceUtc
            ));
        }

        /**
         * Like getNotificationsForUser but hydrates an entity_hash column from the related
         * entity table. Currently only task entities have a hash; for other entity types
         * (or notifications without an entity) entity_hash is NULL.
         *
         * @param int $userId
         * @param string $userType
         * @param string $sinceUtc
         * @return array
         */
        public function getNotificationsForUserWithEntityHash($userId, $userType, $sinceUtc)
        {
            global $wpdb;

            $taskType = self::ENTITY_TYPE_TASK;

            return $wpdb->get_results($wpdb->prepare(
                'SELECT n.id, n.pipeline_id, n.type, n.entity_type, n.entity_id, n.user_id, n.user_type, n.date, n.text, n.mark_as_read,
                        CASE WHEN n.entity_type = %s THEN t.task_hash ELSE NULL END AS entity_hash
                FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . ' n
                LEFT JOIN ' . TABLE_WP_QUICKTASKER_TASKS . ' t
                  ON n.entity_type = %s AND t.id = n.entity_id
                WHERE n.user_id = %d
                  AND n.user_type = %s
                  AND n.date >= %s
                ORDER BY n.date DESC',
                $taskType,
                $taskType,
                $userId,
                $userType,
                $sinceUtc
            ));
        }

        public function getNotificationById($id)
        {
            global $wpdb;

            return $wpdb->get_row($wpdb->prepare(
                'SELECT id, pipeline_id, type, entity_type, entity_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . ' WHERE id = %d',
                $id
            ));
        }

        /**
         * Inserts a new notification row.
         *
         * @param string|null $type Notification type (NotificationService::TYPE_*), persisted so
         *                          clients can route differently per type.
         * @param string|null $entityType Optional entity kind (e.g. 'task') the notification relates to.
         * @param int|null $entityId Optional entity id within $entityType.
         * @return object|null The inserted notification row.
         */
        public function insertNotification($pipelineId, $userId, $userType, $text, $dateUtc, $type = null, $entityType = null, $entityId = null)
        {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_NOTIFICATIONS, [
                'pipeline_id'  => $pipelineId,
                'type'         => $type,
                'entity_type'  => $entityType,
                'entity_id'    => $entityId,
                'user_id'      => $userId,
                'user_type'    => $userType,
                'date'         => $dateUtc,
                'text'         => $text,
                'mark_as_read' => 0,
            ]);

            if (false === $result) {
                throw new \Exception('Failed to insert notification');
            }

            return $this->getNotificationById($wpdb->insert_id);
        }

        public function markAsRead($id)
        {
            global $wpdb;

            $wpdb->update(
                TABLE_WP_QUICKTASKER_NOTIFICATIONS,
                ['mark_as_read' => 1],
                ['id'           => $id]
            );

            return $this->getNotificationById($id);
        }

        /**
         * Marks the given notifications as read, but only those that belong to the
         * given viewer on the given pipeline. Returns the number of affected rows.
         *
         * @param int[] $notificationIds
         */
        public function markNotificationsAsReadForViewer($pipelineId, $userId, $userType, array $notificationIds)
        {
            global $wpdb;

            if (empty($notificationIds)) {
                return 0;
            }

            $ids = array_values(array_filter(array_map('intval', $notificationIds)));
            if (empty($ids)) {
                return 0;
            }

            $placeholders = implode(',', array_fill(0, count($ids), '%d'));
            $params = array_merge([$pipelineId, $userId, $userType], $ids);

            return $wpdb->query($wpdb->prepare(
                'UPDATE ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
                SET mark_as_read = 1
                WHERE pipeline_id = %d
                  AND user_id = %d
                  AND user_type = %s
                  AND mark_as_read = 0
                  AND id IN (' . $placeholders . ')',
                $params
            ));
        }

        /**
         * Marks the given notifications as read, but only those that belong to the given viewer.
         * Returns the number of affected rows.
         *
         * @param int[] $notificationIds
         */
        public function markNotificationsAsReadForUser($userId, $userType, array $notificationIds)
        {
            global $wpdb;

            if (empty($notificationIds)) {
                return 0;
            }

            $ids = array_values(array_filter(array_map('intval', $notificationIds)));
            if (empty($ids)) {
                return 0;
            }

            $placeholders = implode(',', array_fill(0, count($ids), '%d'));
            $params = array_merge([$userId, $userType], $ids);

            return $wpdb->query($wpdb->prepare(
                'UPDATE ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
                SET mark_as_read = 1
                WHERE user_id = %d
                  AND user_type = %s
                  AND mark_as_read = 0
                  AND id IN (' . $placeholders . ')',
                $params
            ));
        }
    }
}
