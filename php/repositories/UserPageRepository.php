<?php
namespace WPQT\UserPage;

class UserPageRepository {

    /**
     * Retrieves a user page by its hash.
     *
     * @param string $pageHash The hash of the user page.
     * @return object|null The user page object if found, null otherwise.
     */
    public function getUserPageByHash($pageHash) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_USER_PAGES . " WHERE page_hash = %s",
                $pageHash
            )
        );
    }
}