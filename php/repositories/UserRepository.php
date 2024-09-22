<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class UserRepository {
    const USER_FIELDS = "a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active";

    /**
     * Retrieves a list of users along with their page hash and the count of assigned tasks.
     *
     * This method executes a SQL query to fetch user details from the database. It joins the users table
     * with the user pages table to get the page hash and performs a subquery to count the number of tasks
     * assigned to each user. Only users who are not marked as deleted are included in the results.
     *
     * @global wpdb $wpdb WordPress database abstraction object.
     *
     * @return array List of users with their details, page hash, and assigned tasks count.
     */
    public function getUsers() {
        global $wpdb;
    
        return $wpdb->get_results(
            "SELECT " . self::USER_FIELDS . ", b.page_hash, 
                    (SELECT COUNT(*) FROM " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS c WHERE c.user_id = a.id) AS assigned_tasks_count
             FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
             LEFT JOIN " . TABLE_WP_QUICK_TASKS_USER_PAGES . " AS b ON a.id = b.user_id
             WHERE a.deleted = 0"
        );
    }

    /**
     * Retrieves a user by their ID, including additional information such as page hash and assigned tasks count.
     *
     * This method queries the database to fetch user details from the `wp_quick_tasks_users` table,
     * along with the associated page hash from the `wp_quick_tasks_user_pages` table and the count of assigned tasks
     * from the `wp_quick_tasks_user_task` table.
     *
     * @param int $id The ID of the user to retrieve.
     * @return object|null The user object containing user details, page hash, and assigned tasks count, or null if no user is found.
     */
    public function getUserById($id) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT " . self::USER_FIELDS . ", b.page_hash, 
                        (SELECT COUNT(*) FROM " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS c WHERE c.user_id = a.id) AS assigned_tasks_count
                FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
                LEFT JOIN " . TABLE_WP_QUICK_TASKS_USER_PAGES . " AS b
                ON a.id = b.user_id
                WHERE a.id = %d AND a.deleted = 0",
                $id
            )
        );
    }

    /**
     * Retrieves users based on task IDs.
     *
     * @param array $taskIds An array of task IDs.
     * @return array The users matching the task IDs.
     */
    public function getAssignedUsersByTaskIds($taskIds) {
        global $wpdb;

        // Prepare the placeholders for the IN clause
        $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));

        $sql = $wpdb->prepare(
            "SELECT " . self::USER_FIELDS . ", b.task_id
             FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
             INNER JOIN " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS b 
             ON a.id = b.user_id
             WHERE b.task_id IN ($placeholders) AND a.deleted = 0",
            $taskIds
        );

        // Execute the query and get the results
        $results = $wpdb->get_results($sql);

        return $results;
    }

    /**
     * Retrieves the assigned users for a specific task.
     *
     * @param int $taskId The ID of the task.
     * @return array|null The assigned users and their associated page hash, or null if no users are assigned.
     */
    public function getAssignedUsersByTaskId($taskId) {
        global $wpdb;

        $query = $wpdb->prepare(
            "SELECT DISTINCT " . self::USER_FIELDS . "
             FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
             INNER JOIN " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS b
             ON a.id = b.user_id
             WHERE b.task_id = %d AND a.deleted = 0
             ORDER BY b.created_at DESC",
            $taskId
        );

        $results = $wpdb->get_results($query);

        return $results;
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
                "SELECT COUNT(*) FROM " . TABLE_WP_QUICK_TASKS_USERS . " WHERE id = %d AND is_active = 1",
                $userId
            )
        );

        if ($result > 0) {
            return true;
        } else {
            return false;
        }
    }
}