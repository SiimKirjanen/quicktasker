<?php

class UserRepository {

    /**
     * Retrieves all users from the database.
     *
     * @return array The list of users.
     */
    public function getUsers() {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT * FROM %s",
            TABLE_WP_QUICK_TASKS_USERS
        ) );
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param int $id The ID of the user to retrieve.
     * @return object|null The user object if found, null otherwise.
     */
    public function getUserById($id) {
        global $wpdb;

        return $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM %s
            WHERE id = %d",
            TABLE_WP_QUICK_TASKS_USERS,
            $id
        ) );
    }
}