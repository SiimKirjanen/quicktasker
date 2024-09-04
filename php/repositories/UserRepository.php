<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class UserRepository {

    /**
     * Retrieves all users from the database.
     *
     * @return array The list of users.
     */
    public function getUsers() {
        global $wpdb;

        return $wpdb->get_results(
            "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.email, a.phone, a.is_active, b.page_hash FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
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
                "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.email, a.phone, a.is_active, b.page_hash FROM " . TABLE_WP_QUICK_TASKS_USERS . " AS a
                LEFT JOIN " . TABLE_WP_QUICK_TASKS_USER_PAGES . " AS b
                ON a.id = b.user_id
                WHERE a.id = %d AND a.deleted = 0",
                $id
            )
        );
    }
}