<?php

namespace WPQT\User;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;
use WPQT\WPQTException;

if (!class_exists('WPQT\User\UserService')) {
    class UserService
    {
        /**
         * Creates a new quicktasker user.
         *
         * @param array $args The user data.
         * @return User The newly created user.
         * @throws Exception If failed to create a user or user page.
         */
        public function createUser($args)
        {
            global $wpdb;

            $result = $wpdb->insert(
                TABLE_WP_QUICKTASKER_USERS,
                [
                    'name'        => $args['name'],
                    'description' => $args['description'],
                    'created_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                    'updated_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['%s', '%s', '%s', '%s']
            );

            if (!$result) {
                throw new Exception('Failed to create a user');
            }

            $newUserId = $wpdb->insert_id;
            $pageHash = ServiceLocator::get('HashService')->generateUserPageHash($args['name']);

            $result2 = $wpdb->insert(
                TABLE_WP_QUICKTASKER_USER_PAGES,
                [
                    'user_id'    => $newUserId,
                    'page_hash'  => $pageHash,
                    'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                    'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['%d', '%s', '%s', '%s']
            );

            if (!$result2) {
                throw new \Exception('Failed to create a user page');
            }

            return ServiceLocator::get('UserRepository')->getQuicktaskerUserById($newUserId);
        }

        /**
         * Updates a user's information.
         *
         * @param int $userId The ID of the user to be updated.
         * @param array $args The updated user data.
         * @return User The updated user object.
         * @throws Exception If the update operation fails.
         */
        public function editUser($userId, $args)
        {
            global $wpdb;

            $defaults = [
                'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ];
            $args = wp_parse_args($args, $defaults);

            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_USERS,
                $args,
                ['id' => $userId]
            );

            if (false === $result) {
                throw new \Exception('Failed to update a user');
            }

            return ServiceLocator::get('UserRepository')->getQuicktaskerUserById($userId);
        }

        /**
         * Change the status of a user.
         *
         * @param int $userId The ID of the user.
         * @param bool $status The new status of the user.
         * @return User The updated user object.
         * @throws Exception If failed to disable a user.
         */
        public function changeUserStatus($userId, $status)
        {
            global $wpdb;

            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_USERS,
                [
                    'is_active'  => $status,
                    'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['id' => $userId],
                ['%d', '%s'],
            );

            if (!$result) {
                throw new \Exception('Failed to disable a user');
            }

            return ServiceLocator::get('UserRepository')->getQuicktaskerUserById($userId);
        }

        /**
         * Calls the rate limiter; on overflow, records an offense for the user.
         * When offenses reach WP_QUICKTASKER_BAN_OFFENSE_THRESHOLD inside
         * WP_QUICKTASKER_BAN_OFFENSE_WINDOW seconds, the user is auto-banned.
         * Either way the WPQTException from the limiter is re-thrown so the
         * caller's existing error handling surfaces a 400 to the client.
         */
        public function enforceWriteRateLimit($bucket, $userId, $limit, $windowSeconds)
        {
            try {
                ServiceLocator::get('RateLimitService')->enforce($bucket, $userId, $limit, $windowSeconds);
            } catch (WPQTException $e) {
                $this->recordRateLimitOffense($bucket, $userId, $windowSeconds);

                throw $e;
            }
        }

        /**
         * Records that a QuickTasker user was throttled in the given bucket.
         * Counts at most one offense per rate-limit window per bucket — repeated
         * throttled requests inside the same window do not stack. When the user
         * accumulates WP_QUICKTASKER_BAN_OFFENSE_THRESHOLD offenses inside
         * WP_QUICKTASKER_BAN_OFFENSE_WINDOW seconds, they are auto-banned.
         *
         * @param string $bucket The rate-limit bucket that fired.
         * @param int $userId The QuickTasker user ID being throttled.
         * @param int $windowSeconds The bucket's rate-limit window length.
         * @return void
         */
        private function recordRateLimitOffense($bucket, $userId, $windowSeconds)
        {
            if (empty($userId)) {
                return;
            }

            global $wpdb;
            // Transients are stored in wp_options. Endpoint callbacks wrap their
            // work in START TRANSACTION / ROLLBACK on WPQTException, which would
            // also discard our offense counter write. Commit the in-flight
            // transaction first — at this point only rate-limit counters have
            // been written, so an early commit is safe. The endpoint's outer
            // ROLLBACK after we re-throw becomes a no-op.
            $wpdb->query('COMMIT');

            // Count at most one offense per rate-limit window per bucket. Once a
            // user has been throttled in a given window, subsequent throttled
            // requests in that same window are noise from the same incident, not
            // a fresh offense. The lock lives as long as the rate-limit window.
            $lockKey = 'wpqt_offense_lock_' . $bucket . '_' . $userId;

            if (false !== get_transient($lockKey)) {
                return;
            }

            $rlExpKey = 'wpqt_rl_' . $bucket . '_' . $userId . '_exp';
            $now = time();
            $rlExpiresAt = (int) get_transient($rlExpKey);
            $lockTtl = $rlExpiresAt > $now ? ($rlExpiresAt - $now) : $windowSeconds;
            set_transient($lockKey, 1, $lockTtl);

            $key = 'wpqt_ban_offense_' . $userId;
            $expKey = $key . '_exp';
            $window = WP_QUICKTASKER_BAN_OFFENSE_WINDOW;
            $current = get_transient($key);
            $now = time();

            if (false === $current) {
                set_transient($key, 1, $window);
                set_transient($expKey, $now + $window, $window);
                $offenses = 1;
            } else {
                $expiresAt = (int) get_transient($expKey);
                $remaining = $expiresAt > $now ? ($expiresAt - $now) : $window;
                $offenses = ((int) $current) + 1;
                set_transient($key, $offenses, $remaining);
            }

            if ($offenses >= WP_QUICKTASKER_BAN_OFFENSE_THRESHOLD) {
                $this->banQuicktaskerUserForSpam($userId);
                delete_transient($key);
                delete_transient($expKey);
            }
        }

        /**
         * Bans a QuickTasker user for spam and writes an audit log entry.
         * No-op (returns the existing user) if the user is already banned.
         *
         * @param int $userId The QuickTasker user ID to ban.
         * @return object The user row after the ban attempt.
         */
        public function banQuicktaskerUserForSpam($userId)
        {
            $userRepo = ServiceLocator::get('UserRepository');

            if ($userRepo->isQuicktaskerUserBanned($userId)) {
                return $userRepo->getQuicktaskerUserById($userId);
            }

            $userRepo->banQuicktaskerUserForSpam($userId);

            $user = $userRepo->getQuicktaskerUserById($userId);
            ServiceLocator::get('LogService')->log(
                'User ' . $user->name . ' was automatically banned for excessive activity (spam protection)',
                [
                    'type'       => WP_QT_LOG_TYPE_QUICKTASKER_USER,
                    'type_id'    => $userId,
                    'user_id'    => $userId,
                    'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
                    'log_status' => WP_QT_LOG_STATUS_ERROR,
                ]
            );

            return $user;
        }

        /**
         * Lifts a QuickTasker user's ban and clears all related ban / offense
         * transients so the user starts with a clean slate.
         *
         * @param int $userId The QuickTasker user ID to unban.
         * @return object The updated user row.
         * @throws \Exception If the underlying repository update fails.
         */
        public function unbanQuicktaskerUser($userId)
        {
            $userRepo = ServiceLocator::get('UserRepository');
            $result = $userRepo->unbanQuicktaskerUser($userId);

            if (false === $result) {
                throw new \Exception('Failed to unban user');
            }

            delete_transient('wpqt_ban_offense_' . $userId);
            delete_transient('wpqt_ban_offense_' . $userId . '_exp');
            delete_transient('wpqt_offense_lock_write_global_' . $userId);

            return $userRepo->getQuicktaskerUserById($userId);
        }

        /**
         * Deletes a user.
         *
         * @param int $userId The ID of the user to delete.
         * @return bool True if the user was successfully deleted, false otherwise.
         * @throws Exception If the user deletion fails.
         */
        public function deleteUser($userId)
        {
            global $wpdb;

            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_USERS,
                [
                    'deleted'    => 1,
                    'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['id' => $userId],
                ['%d', '%s']
            );

            if (!$result) {
                throw new \Exception('Failed to delete a user');
            }

            return ServiceLocator::get('UserRepository')->getQuicktaskerUserById($userId);
        }

        /**
         * Check if a user has a password.
         *
         * @param int $userId The ID of the user.
         * @return bool Returns true if the user has a password, false otherwise.
         */
        public function checkIfUserHasPassword($userId)
        {
            global $wpdb;

            $result = $wpdb->get_var(
                $wpdb->prepare(
                    'SELECT COUNT(*) FROM ' . TABLE_WP_QUICKTASKER_USERS . ' WHERE id = %d AND password IS NOT NULL',
                    $userId
                )
            );

            if ($result > 0) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Assigns a task to a user.
         *
         * This method inserts a record into the `TABLE_WP_QUICKTASKER_USER_TASK` table
         * to associate a user with a task. If the insertion fails, an exception is thrown.
         *
         * @param int $userId The ID of the user to whom the task is being assigned.
         * @param int $taskId The ID of the task being assigned to the user.
         * @param string $userType The type of user being assigned the task. (quicktasker or wp-user)
         * @return mixed The task details retrieved from the task repository.
         * @throws \Exception If the task assignment fails.
         */
        public function assignTaskToUser($userId, $taskId, $userType = WP_QT_QUICKTASKER_USER_TYPE)
        {
            global $wpdb;

            $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, $userType);

            if (!$user) {
                throw new \Exception('Assignable user not found');
            }

            $result = $wpdb->insert(
                TABLE_WP_QUICKTASKER_USER_TASK,
                [
                    'user_id'    => $userId,
                    'task_id'    => $taskId,
                    'user_type'  => $userType,
                    'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                    'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['%d', '%d', '%s', '%s', '%s']
            );

            if (!$result) {
                throw new \Exception('Failed to assign a task to a user');
            }

            return ServiceLocator::get('TaskRepository')->getTaskById($taskId);
        }

        /**
         * Removes a task from a user.
         *
         * This function deletes the association between a user and a task in the database.
         *
         * @param int $userId The ID of the user.
         * @param int $taskId The ID of the task.
         * @param string $userType The type of the user being removed. (quicktasker or wp-user)
         * @return mixed The task details after removal.
         * @throws \Exception If the task could not be removed from the user.
         */
        public function removeTaskFromUser($userId, $taskId, $userType = WP_QT_QUICKTASKER_USER_TYPE)
        {
            global $wpdb;

            $result = $wpdb->delete(
                TABLE_WP_QUICKTASKER_USER_TASK,
                [
                    'user_id'   => $userId,
                    'task_id'   => $taskId,
                    'user_type' => $userType,
                ],
                ['%d', '%d', '%s']
            );

            if (!$result) {
                throw new \Exception('Failed to remove user from a task');
            }

            return ServiceLocator::get('TaskRepository')->getTaskById($taskId);
        }

        /**
         * Resets the password for a given user.
         *
         * This method will set the user's password to null and update the
         * 'updated_at' timestamp to the current UTC time. It will also delete
         * all sessions associated with the user.
         *
         * @param int $userId The ID of the user whose password is to be reset.
         * @throws \Exception If the user does not have a password set or if the
         *                    password reset or session deletion fails.
         * @return mixed The user object after the password reset.
         */
        public function resetUserPassword($userId)
        {
            global $wpdb;

            $hasPassword = $this->checkIfUserHasPassword($userId);

            if (!$hasPassword) {
                throw new \Exception('Cannot reset user password if it is not set');
            }

            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_USERS,
                [
                    'password'   => null,
                    'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                ],
                ['id' => $userId],
                ['%s', '%s'],
                ['%d']
            );

            if (!$result) {
                throw new \Exception('Failed to reset a user password');
            }

            $result2 = $wpdb->delete(
                TABLE_WP_QUICKTASKER_USER_SESSIONS,
                ['user_id' => $userId]
            );

            if (false === $result2) {
                throw new \Exception('Failed to reset a user sessions');
            }

            return ServiceLocator::get('UserRepository')->getQuicktaskerUserById($userId);
        }
    }
}
