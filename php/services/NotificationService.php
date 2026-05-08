<?php

namespace WPQT\Notification;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Notification\NotificationService')) {
    class NotificationService
    {
        public const DEFAULT_MAX_AGE_HOURS = 24;
        public const MAX_MAX_AGE_HOURS = 24 * 30;

        /**
         * Creates a new notification for the given recipient on a pipeline.
         *
         * @return object|null The inserted notification row.
         */
        public function createNotification($pipelineId, $userId, $userType, $text)
        {
            $now = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();

            return ServiceLocator::get('NotificationRepository')->insertNotification(
                (int) $pipelineId,
                (int) $userId,
                $userType,
                $text,
                $now
            );
        }

        /**
         * Returns notifications for the given viewer on a pipeline,
         * filtered to those at most $maxAgeHours old.
         */
        public function getNotificationsForViewer($pipelineId, $userId, $userType, $maxAgeHours = self::DEFAULT_MAX_AGE_HOURS)
        {
            $maxAgeHours = (int) $maxAgeHours;
            if ($maxAgeHours < 1) {
                $maxAgeHours = self::DEFAULT_MAX_AGE_HOURS;
            }
            if ($maxAgeHours > self::MAX_MAX_AGE_HOURS) {
                $maxAgeHours = self::MAX_MAX_AGE_HOURS;
            }

            $sinceUtc = ServiceLocator::get('TimeRepository')->modifyUTCTime(-$maxAgeHours, 'hour');

            return ServiceLocator::get('NotificationRepository')->getNotificationsForUserOnPipeline(
                (int) $pipelineId,
                (int) $userId,
                $userType,
                $sinceUtc
            );
        }

        /**
         * Marks a notification as read after verifying it belongs to the given viewer.
         */
        public function markAsRead($notificationId, $userId, $userType)
        {
            $repo = ServiceLocator::get('NotificationRepository');
            $notification = $repo->getNotificationById((int) $notificationId);

            if (!$notification) {
                throw new \Exception('Notification not found');
            }

            if ((int) $notification->user_id !== (int) $userId || $notification->user_type !== $userType) {
                throw new \Exception('Notification does not belong to the current user');
            }

            return $repo->markAsRead((int) $notificationId);
        }
    }
}
