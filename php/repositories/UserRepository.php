<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class UserRepository {
    const USER_FIELDS = "a.id, a.name, a.description, a.created_at, a.updated_at, a.email, a.phone, a.is_active";
    /**
     * Retrieves all users from the database.
     *
     * @return array The list of users.
     */
    public function getUsers() {
        global $wpdb;

        return $wpdb->get_results(
            "SELECT " . self::USER_FIELDS . ", b.page_hash FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
            LEFT JOIN " . TABLE_WP_QUICK_TASKS_USER_PAGES . " AS b
            ON a.id = b.user_id
            WHERE a.deleted = 0"
        );
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param int $id The ID of the user to retrieve.
     * @return object|null The user object if found, null otherwise.
     */
    public function getUserById($id) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT " . self::USER_FIELDS . ", b.page_hash FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
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

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT " . self::USER_FIELDS . ", b.page_hash
                 FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
                 INNER JOIN " . TABLE_WP_QUICK_TASKS_USER_TASK . " AS b
                 ON a.id = b.user_id
                 WHERE b.task_id = %d AND a.deleted = 0",
                $taskId
            )
        );
    }

}