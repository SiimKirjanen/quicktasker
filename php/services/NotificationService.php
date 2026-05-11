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
         * Returns notifications for the given viewer across all pipelines (or a subset),
         * filtered to those at most $maxAgeHours old.
         *
         * @param int[] $pipelineIds Optional list of pipeline IDs to restrict to. Empty array means all pipelines.
         */
        public function getNotificationsForUserGlobal($userId, $userType, $maxAgeHours = self::DEFAULT_MAX_AGE_HOURS, array $pipelineIds = [])
        {
            $maxAgeHours = (int) $maxAgeHours;
            if ($maxAgeHours < 1) {
                $maxAgeHours = self::DEFAULT_MAX_AGE_HOURS;
            }
            if ($maxAgeHours > self::MAX_MAX_AGE_HOURS) {
                $maxAgeHours = self::MAX_MAX_AGE_HOURS;
            }

            $sinceUtc = ServiceLocator::get('TimeRepository')->modifyUTCTime(-$maxAgeHours, 'hour');

            return ServiceLocator::get('NotificationRepository')->getNotificationsForUser(
                (int) $userId,
                $userType,
                $sinceUtc,
                $pipelineIds
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

        /**
         * Marks the given notifications as read, but only those that belong to the given viewer.
         *
         * @param int[] $notificationIds
         */
        public function markNotificationsAsReadForUserGlobal($userId, $userType, array $notificationIds)
        {
            return ServiceLocator::get('NotificationRepository')->markNotificationsAsReadForUser(
                (int) $userId,
                $userType,
                $notificationIds
            );
        }

        public const VALID_FILTERS = ['all', 'unread', 'read'];

        /**
         * Returns the viewer's notification modal preferences, or sensible defaults if none persisted.
         *
         * @return array{filter: string, max_age_hours: int, selected_pipeline_ids: int[]|null}
         */
        public function getPreferences($userId, $userType)
        {
            $row = ServiceLocator::get('NotificationPreferencesRepository')->get((int) $userId, $userType);

            if (!$row) {
                return [
                    'filter'                => 'all',
                    'max_age_hours'         => self::DEFAULT_MAX_AGE_HOURS,
                    'selected_pipeline_ids' => null,
                ];
            }

            $row['max_age_hours'] = $this->clampMaxAgeHours((int) $row['max_age_hours']);
            if (!in_array($row['filter'], self::VALID_FILTERS, true)) {
                $row['filter'] = 'all';
            }

            return $row;
        }

        /**
         * @param int[]|null $selectedPipelineIds null means "all boards".
         */
        public function savePreferences($userId, $userType, $filter, $maxAgeHours, $selectedPipelineIds)
        {
            if (!in_array($filter, self::VALID_FILTERS, true)) {
                $filter = 'all';
            }
            $maxAgeHours = $this->clampMaxAgeHours((int) $maxAgeHours);

            $normalisedIds = null;
            if (is_array($selectedPipelineIds)) {
                $normalisedIds = array_values(array_map('intval', $selectedPipelineIds));
            }

            ServiceLocator::get('NotificationPreferencesRepository')->upsert(
                (int) $userId,
                $userType,
                $filter,
                $maxAgeHours,
                $normalisedIds
            );
        }

        private function clampMaxAgeHours($maxAgeHours)
        {
            if ($maxAgeHours < 1) {
                return self::DEFAULT_MAX_AGE_HOURS;
            }
            if ($maxAgeHours > self::MAX_MAX_AGE_HOURS) {
                return self::MAX_MAX_AGE_HOURS;
            }

            return $maxAgeHours;
        }
    }
}
