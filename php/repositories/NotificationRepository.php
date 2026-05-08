<?php

namespace WPQT\Notification;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Notification\NotificationRepository')) {
    class NotificationRepository
    {
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
                'SELECT id, pipeline_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . '
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

        public function getNotificationById($id)
        {
            global $wpdb;

            return $wpdb->get_row($wpdb->prepare(
                'SELECT id, pipeline_id, user_id, user_type, date, text, mark_as_read FROM ' . TABLE_WP_QUICKTASKER_NOTIFICATIONS . ' WHERE id = %d',
                $id
            ));
        }

        /**
         * Inserts a new notification row.
         *
         * @return object|null The inserted notification row.
         */
        public function insertNotification($pipelineId, $userId, $userType, $text, $dateUtc)
        {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_NOTIFICATIONS, [
                'pipeline_id'  => $pipelineId,
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
    }
}
