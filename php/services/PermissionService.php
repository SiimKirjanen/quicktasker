<?php
namespace WPQT\Permission;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Services\ServiceLocator; 

if ( ! class_exists( 'WPQT\Permission\PermissionService' ) ) {
    class PermissionService {
        /**
         * Checks if the current user has the required permissions to access the private API.
         *
         * @return bool Returns true if the current user has the required permissions, false otherwise.
         */
        public static function hasRequiredPermissionsForPrivateAPI() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE );
        }

        /**
         * Checks if the current user has the required permissions to access public API delete endpoints.
         *
         * This function verifies if the current user has the necessary permissions defined by the 
         * WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE capability.
         *
         * @return bool True if the user has the required permissions, false otherwise.
         */
        public static function hasRequiredPermissionsForPrivateAPIDeleteEndpoints() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE );
        }

        /**
         * Check if the current user has the required permissions for private API user endpoints.
         *
         * This function verifies if the current user has the capability defined by the 
         * WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS constant.
         *
         * @return bool True if the user has the required permissions, false otherwise.
         */
        public static function hasRequiredParmissionsForPrivateAPIUsersEndpoints() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS );
        }
        
        /**
         * Checks if the current user has the required permissions to manage private API settings endpoints.
         *
         * This function verifies if the current user has the capability defined by the constant
         * `WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS`.
         *
         * @return bool True if the current user has the required permissions, false otherwise.
         */
        public static function hasRequiredPermissionsForPrivateAPISettingsEndpoints() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS );
        }

        /**
         * Checks if the current user has the required permissions for private API archive endpoints.
         *
         * This function verifies if the current user has the capability defined by the
         * WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE constant.
         *
         * @return bool True if the user has the required permissions, false otherwise.
         */
        public static function hasRequiredPermissionsForPrivateAPIArchiveEndpoints() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE );
        }

        /**
         * Checks if the current user has the required permissions to access the user page app.
         *
         * This function verifies if the current user has the capability defined by the constant
         * WP_QUICKTASKER_ACCESS_USER_PAGE_APP.
         *
         * @return bool True if the user has the required permissions, false otherwise.
         */
        public static function hasRequiredPermissionsForUserPageApp() {
            return current_user_can( WP_QUICKTASKER_ACCESS_USER_PAGE_APP );
        }

            /**
            * Checks if the current user has the required permissions to manage QuickTasker sessions.
            *
            * This function verifies if the current user has the capability defined by the
            * WP_QUICKTASKER_ADMIN_ROLE_MANAGE_QUICKTASKER_SESSIONS constant.
            *
            * @return bool True if the user has the required permissions, false otherwise.
            */
        public static function hasRequiredPermissionsForManagingQuickTaskerSessions() {
            return current_user_can( WP_QUICKTASKER_ADMIN_ROLE_MANAGE_QUICKTASKER_SESSIONS );
        }

        /**
         * Checks if a user is allowed to view a task.
         *
         * @param int $userId The ID of the user.
         * @param int $taskId The ID of the task.
         * @param string $userType The type of user (default is WP_QT_QUICKTASKER_USER_TYPE).
         * @return bool Returns true if the user is allowed to view the task, false otherwise.
         */
        public function checkIfUserIsAllowedToViewTask($userId, $taskId, $userType = WP_QT_QUICKTASKER_USER_TYPE) {
            global $wpdb;

            $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

            if($task->is_archived === '1') {
                return false;
            }

            $assignedUsers = [];

            if ($userType === WP_QT_QUICKTASKER_USER_TYPE) {
                $assignedUsers = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskId($taskId);
            } else {
                $assignedUsers = ServiceLocator::get('UserRepository')->getAssignedWPUsersByTaskIds([$taskId]);
            }

            $isAssignedToTask = false;

                foreach ($assignedUsers as $user) {
                    if ((int)$user->id === (int)$userId) {
                        $isAssignedToTask = true;
                        break;
                    }
                }

            if ($isAssignedToTask === true || ($task->free_for_all === '1' && count($assignedUsers) === 0) ) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Checks if a user can be assigned to a specific task.
         *
         * This method verifies whether a user can be assigned to a task based on the task's
         * properties and the current assigned users. If the task is marked as 'free for all'
         * and there are no users currently assigned, the user can be assigned to the task.
         *
         * @param int $userId The ID of the user to check.
         * @param int $taskId The ID of the task to check.
         * @return bool True if the user can be assigned to the task, false otherwise.
         */
        public function checkIfUserCanBeAssignedToTask($userId, $taskId) {
            global $wpdb;

            $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

            if( $task->is_archived === '1' ) {
                return false;
            }
            
            $assignedUsers = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskId($taskId);
            
            if ($task->free_for_all === '1' && count($assignedUsers) === 0) {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Check if a user page user is allowed to edit a task.
         *
         * @param int $userId The ID of the user.
         * @param int $taskId The ID of the task.
         * @param string $userType The type of user (default is WP_QT_QUICKTASKER_USER_TYPE).
         * @return bool Returns true if the user is allowed to edit the task, false otherwise.
         */
        public function checkIfUserIsAllowedToEditTask($userId, $taskId, $userType = WP_QT_QUICKTASKER_USER_TYPE) {
            global $wpdb;

            $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

            if( $task->is_archived === '1' ) {
                return false;
            }

            $isAssignedToUser = ServiceLocator::get('UserRepository')->checkIfUserHasAssignedToTask($userId, $taskId, $userType);

            return $isAssignedToUser;
        }
    }
}