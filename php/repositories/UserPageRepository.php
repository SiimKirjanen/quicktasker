<?php

namespace WPQT\UserPage;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\UserPage\UserPageRepository')) {
    class UserPageRepository
    {
        /**
         * Retrieves a user by its page hash. Deleted users are included so
         * callers can tell them apart from a page that does not exist.
         *
         * @param string $pageHash The hash of the user page.
         * @return object|null The user object if found, null otherwise.
         */
        public function getPageUserByHash($pageHash)
        {
            global $wpdb;

            return $wpdb->get_row(
                $wpdb->prepare(
                    'SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, a.deleted, b.page_hash, b.user_id FROM ' . TABLE_WP_QUICKTASKER_USERS . ' AS a 
                    LEFT JOIN ' . TABLE_WP_QUICKTASKER_USER_PAGES . ' AS b
                    ON a.id = b.user_id 
                    WHERE b.page_hash = %s',
                    $pageHash
                )
            );
        }
    }
}
