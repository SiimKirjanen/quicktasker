<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class UserRepository {
    const USER_FIELDS = "a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active";

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
            "SELECT " . self::USER_FIELDS . ", b.page_hash, 
                    (SELECT COUNT(*)
                     FROM " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS c
                     JOIN " . TABLE_WP_QUICK_TASKS_TASKS . " AS d
                     ON c.task_id = d.id
                     WHERE c.user_id = a.id AND d.is_archived = 0) AS assigned_tasks_count
             FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
             LEFT JOIN " . TABLE_WP_QUICK_TASKS_USER_PAGES . " AS b ON a.id = b.user_id
             WHERE a.deleted = 0"
        );
    }

    /**
     * Retrieves a user by their ID, including additional information such as the page hash and the count of assigned tasks.
     *
     * This function performs a query to fetch user details from the database, including:
     * - User fields defined in the constant `USER_FIELDS`
     * - Page hash from the `TABLE_WP_QUICK_TASKS_USER_PAGES` table
     * - Count of assigned tasks from the `TABLE_WP_QUICK_TASKS_USER_TASK` and `TABLE_WP_QUICK_TASKS_TASKS` tables
     *
     * @param int $id The ID of the user to retrieve.
     * @return object|null The user object containing the requested information, or null if the user is not found.
     */
    public function getUserById($id) {
        global $wpdb;
    
        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT " . self::USER_FIELDS . ", b.page_hash, 
                        (SELECT COUNT(*)
                         FROM " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS c
                         JOIN " . TABLE_WP_QUICK_TASKS_TASKS . " AS d
                         ON c.task_id = d.id
                         WHERE c.user_id = a.id AND d.is_archived = 0) AS assigned_tasks_count
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