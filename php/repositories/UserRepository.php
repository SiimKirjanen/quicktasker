<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WP_User_Query;

if ( ! class_exists( 'WPQT\User\UserRepository' ) ) {
    class UserRepository {
        /**
         * Retrieves a user by their ID and type.
         *
         * Depending on the user type, this function will either retrieve a QuickTasker user
         * or a WordPress user by their ID.
         *
         * @param int $userId The ID of the user to retrieve.
         * @param string $userType The type of the user. Should be either WP_QT_QUICKTASKER_USER_TYPE or WP_QT_WORDPRESS_USER_TYPE.
         * 
         * @return mixed The user object if found, or null if the user type is not recognized.
         */
        public function getUserByIdAndType($userId, $userType) {
            if ( $userType === WP_QT_QUICKTASKER_USER_TYPE ) {

                return $this->getUserById($userId);
            } else if ( $userType === WP_QT_WORDPRESS_USER_TYPE ) {

                return $this->getWPUserById($userId);
            }

            return null;
        }

        /**
         * Retrieves a list of users along with their assigned tasks count and page hash.
         *
         * This method executes a SQL query to fetch user details from the database.
         * It joins multiple tables to gather additional information such as the number
         * of assigned tasks (excluding archived tasks) and the page hash associated with each user.
         *
         * @global wpdb $wpdb WordPress database abstraction object.
         *
         * @return array|object|null List of users with their details, or null on failure.
         */
        public function getUsers() {
            global $wpdb;
        
            return $wpdb->get_results(
                "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, 'quicktasker' AS user_type,
                        CASE 
                            WHEN a.password IS NULL THEN 0 
                            ELSE 1 
                        END AS has_password, b.page_hash, 
                        (SELECT COUNT(*)
                        FROM " . TABLE_WP_QUICKTASKER_USER_TASK . " AS c
                        JOIN " . TABLE_WP_QUICKTASKER_TASKS . " AS d
                        ON c.task_id = d.id
                        WHERE c.user_id = a.id AND d.is_archived = 0 AND c.user_type = 'quicktasker') AS assigned_tasks_count
                FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a
                LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b ON a.id = b.user_id
                WHERE a.deleted = 0"
            );
        }

        /**
         * Retrieves a user by their ID.
         *
         * This function fetches user details from the database, including the user's ID, name, description,
         * creation and update timestamps, active status, associated page hash, and the count of assigned tasks
         * that are not archived.
         *
         * @param int $id The ID of the user to retrieve.
         * @return object|null The user object containing user details and assigned tasks count, or null if the user is not found.
         */
        public function getUserById($id) {
            global $wpdb;
        
            return $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.page_hash, 'quicktasker' AS user_type, 
                            (SELECT COUNT(*)
                            FROM " . TABLE_WP_QUICKTASKER_USER_TASK . " AS c
                            JOIN " . TABLE_WP_QUICKTASKER_TASKS . " AS d
                            ON c.task_id = d.id
                            WHERE c.user_id = a.id AND d.is_archived = 0 AND c.user_type = 'quicktasker') AS assigned_tasks_count
                    FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id
                    WHERE a.id = %d AND a.deleted = 0",
                    $id
                )
            );
        }

        /**
         * Retrieves quicktasker users based on task IDs.
         *
         * @param array $taskIds An array of task IDs.
         * @return array The quicktasker type users matching the task IDs.
         */
        public function getAssignedUsersByTaskIds($taskIds) {
            global $wpdb;

            if ( empty($taskIds) ) {
                return [];
            }

            // Prepare the placeholders for the IN clause
            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));

            $sql = $wpdb->prepare(
                "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.task_id, 'quicktasker' AS user_type
                FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_USER_TASK . " AS b 
                ON a.id = b.user_id
                WHERE b.task_id IN ($placeholders) AND a.deleted = 0 AND b.user_type = 'quicktasker'",
                $taskIds
            );

            // Execute the query and get the results
            $results = $wpdb->get_results($sql);

            return $results;
        }

        public function getAssignedWPUsersByTaskIds($taskIds, $filter = WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE) {
            global $wpdb;

            if ( empty($taskIds) ) {
                return [];
            }
            $wpUsers = [];
            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));

            $sql = $wpdb->prepare(
                "SELECT id, user_id, task_id, user_type FROM " . TABLE_WP_QUICKTASKER_USER_TASK . "
                WHERE task_id IN ($placeholders) AND user_type = 'wp-user'",
                $taskIds
            );

            $result = $wpdb->get_results($sql);

            if (empty($result)) {
                return [];
            }

            $wpUserIds = array_map(function($item) {
                return $item->user_id;
            }, $result);

            $wpUsersData = [];

            switch ($filter) {
                case WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE:
                    $wpUsersData = $this->getWPUsersForFrontend(['include' => $wpUserIds]);
                    break;
                case WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL:
                    $wpUsersData = $this->getWPUsersMinimal(['include' => $wpUserIds]);
                    break;
                case WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL:
                default:
                    $wpUsersData = $this->getWPUsers(['include' => $wpUserIds]);
                    break;
            }


            $wpUserMap = [];
            foreach ($wpUsersData as $user) {
                $wpUserMap[$user->id] = $user;
            }

            $combinedResults = array_map(function($item) use ($wpUserMap) {
                $user = $wpUserMap[$item->user_id] ?? null;
                if ($user) {
                    $userClone = clone $user;
                    $userClone->task_id = $item->task_id;
        
                    return $userClone;
                }
                return null;
            }, $result);

            return array_filter($combinedResults);
        }

        /**
         * Retrieves the assigned quicktasker users for a specific task.
         *
         * @param int $taskId The ID of the task.
         * @return array|null The assigned users and their associated page hash, or null if no users are assigned.
         */
        public function getAssignedUsersByTaskId($taskId) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT DISTINCT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, 'quicktasker' AS user_type
                FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_USER_TASK . " AS b
                ON a.id = b.user_id
                WHERE b.task_id = %d AND a.deleted = 0 AND b.user_type = 'quicktasker' 
                ORDER BY b.created_at DESC",
                $taskId
            );

            $results = $wpdb->get_results($query);

            return $results;
        }

        /**
         * Check if a user is assigned to a specific task.
         *
         * This method checks the database to determine if a user has been assigned to a specific task.
         *
         * @param int $userId The ID of the user.
         * @param int $taskId The ID of the task.
         * @param string $userType The type of user (default is WP_QT_QUICKTASKER_USER_TYPE).
         * @return bool True if the user is assigned to the task, false otherwise.
         */
        public function checkIfUserHasAssignedToTask($userId, $taskId, $userType = WP_QT_QUICKTASKER_USER_TYPE) {
            global $wpdb;

            $result = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USER_TASK . " 
                    WHERE user_id = %d AND task_id = %d AND user_type = %s",
                    $userId,
                    $taskId,
                    $userType
                )
            );

            return ($result > 0);
        }

        /**
         * Checks if a user is active.
         *
         * This function queries the database to determine if a user with the given ID is marked as active.
         *
         * @param int $userId The ID of the user to check.
         * @return bool True if the user is active, false otherwise.
         */
        public function isUserActive($userId) {
            global $wpdb;

            $result = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND is_active = 1",
                    $userId
                )
            );

            if ($result > 0) {
                return true;
            } else {
                return false;
            }
        }


        public function getWPUsersWithCapabilities($capabilities) {
            global $wpdb;
        
            // Ensure $capabilities is an array
            if (!is_array($capabilities)) {
                $capabilities = array($capabilities);
            }
        
            // Construct the meta_query
            $meta_query = array('relation' => 'OR');
            foreach ($capabilities as $capability) {
                $meta_query[] = array(
                    'key' => $wpdb->prefix . 'capabilities',
                    'value' => '"' . $capability . '"', // Ensure the capability is quoted
                    'compare' => 'LIKE'
                );
            }

            // Include users with the administrator role
            $meta_query[] = array(
                'key' => $wpdb->prefix . 'capabilities',
                'value' => '"administrator"',
                'compare' => 'LIKE'
            );
        
            $args = array(
                'meta_query' => $meta_query
            );
        
            return $this->getWPUsersForFrontend($args);
        }

        /**
         * Retrieves a list of WordPress users with the 'Administrator' role.
         *
         * @return array An array of WP_User objects representing the administrators.
         */
        public function getWPAdminUsers() {
            $args = array(
                'role' => 'Administrator',
            );

            $users = $this->getWPUsers($args);
    
            return $users;
        }

        /**
         * Retrieves a list of WordPress users who are not administrators.
         *
         * This function fetches all WordPress users excluding those with the 'Administrator' role.
         *
         * @return array List of non-administrator WordPress users.
         */
        public function getWPNonAdminUsers() {
            $args = array(
                'role__not_in' => ['Administrator'],
            );

            $users = $this->getWPUsers($args);
    
            return $users;
        }

        public function getWPUserById($id) {
            $args = array(
                'include' => [$id],
            );

            $users = $this->getWPUsers($args);

            return $users[0] ?? null;
        }

        /**
         * Retrieves WordPress users based on the provided arguments.
         *
         * @param array $args Arguments to query users. Accepts WP_User_Query arguments.
         * @return array An array of user objects with the following properties:
         *               - id (int): The user ID.
         *               - name (string): The display name of the user.
         *               - email (string): The email address of the user.
         *               - description (string): The description of the user.
         *               - created_at (string): The date the user was registered.
         *               - updated_at (string): The date the user was registered (same as created_at).
         *               - caps (array): The capabilities of the user.
         *               - roles (array): The roles assigned to the user.
         *               - allcaps (array): All capabilities of the user.
         *               - user_type (string): The type of user, always 'wp-user'.
         */
        public function getWPUsers($args) {       
            $user_query = new WP_User_Query($args);
            $results = $user_query->get_results();

            $users = array_map(function($user) {
                $avatar_url = null;
                $avatar_data = get_avatar_data($user->ID);

                if ( $avatar_data['found_avatar'] ) {
                    $avatar_url = $avatar_data['url'];
                }

                return (object)[
                    'id' => $user->ID,
                    'name' => $user->display_name,
                    'email' => $user->user_email,
                    'description' => $user->description,
                    'created_at' => $user->user_registered,
                    'updated_at' => $user->user_registered,
                    'caps' => $user->caps,
                    'roles' => array_values($user->roles),
                    'allcaps' => $user->allcaps,
                    'user_type' => 'wp-user',
                    'profile_picture' => $avatar_url
                ];
            }, $results);
        
            return $users;
        }

        /**
         * Retrieves WordPress users for frontend display.
         *
         * This method fetches WordPress users based on the provided arguments
         * and removes some sensitive information.
         *
         * @param array $args Arguments to filter the WordPress users.
         * @return array Filtered list of WordPress users without email property.
         */
        public function getWPUsersForFrontend($args) {
            $users = $this->getWPUsers($args);

            $allowedAllCaps = [
                WP_QUICKTASKER_ADMIN_ROLE,
                WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE,
                WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS,
                WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS
            ];
        
            $filteredUsers = array_map(function($user) use ($allowedAllCaps) {
                unset($user->email);
                $user->allcaps = array_intersect_key($user->allcaps, array_flip($allowedAllCaps));
                return $user;
            }, $users);
        
            return $filteredUsers;
        }

        public function getWPUsersMinimal($args) {
            $users = $this->getWPUsers($args);

            $filteredUsers = array_map(function($user) {
                return (object)[
                    'name' => $user->name,
                    'id' => $user->id,
                    'user_type' => $user->user_type,
                ];
            }, $users);
            return $filteredUsers;
        }
    }
}