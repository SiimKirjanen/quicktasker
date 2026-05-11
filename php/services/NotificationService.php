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
         * Sends an in-app notification to every user assigned to the given task.
         * Optionally skips a WordPress user (typically the actor performing the action).
         */
        public function notifyTaskAssignees(
            $pipelineId,
            $taskId,
            $messageTemplate,
            $taskName,
            $skipWordPressUserId = null,
            $skipQuicktaskerUserId = null
        ) {
            $userRepo = ServiceLocator::get('UserRepository');
            $qtUsers = $userRepo->getAssignedUsersByTaskId((int) $taskId);
            $wpUsers = $userRepo->getAssignedWPUsersByTaskIds([(int) $taskId]);

            $message = sprintf($messageTemplate, $taskName);

            foreach ((array) $qtUsers as $u) {
                if (null !== $skipQuicktaskerUserId && (int) $u->id === (int) $skipQuicktaskerUserId) {
                    continue;
                }

                try {
                    $this->createNotification($pipelineId, (int) $u->id, $u->user_type, $message);
                } catch (\Throwable $e) {
                    error_log('Failed to create task notification: ' . $e->getMessage());
                }
            }
            foreach ((array) $wpUsers as $u) {
                if (null !== $skipWordPressUserId && (int) $u->id === (int) $skipWordPressUserId) {
                    continue;
                }

                try {
                    $this->createNotification($pipelineId, (int) $u->id, $u->user_type, $message);
                } catch (\Throwable $e) {
                    error_log('Failed to create task notification: ' . $e->getMessage());
                }
            }
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

        /**
         * Marks the given notifications as read, but only those that belong to the
         * given viewer on the given pipeline.
         *
         * @param int[] $notificationIds
         */
        public function markNotificationsAsReadForViewer($pipelineId, $userId, $userType, array $notificationIds)
        {
            return ServiceLocator::get('NotificationRepository')->markNotificationsAsReadForViewer(
                (int) $pipelineId,
                (int) $userId,
                $userType,
                $notificationIds
            );
        }
    }
}
