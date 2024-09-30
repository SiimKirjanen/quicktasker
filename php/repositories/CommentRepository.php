<?php

namespace WPQT\Comment;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class CommentRepository {
    /**
     * Retrieves a comment by its ID.
     *
     * This function uses the global $wpdb object to query the database for a comment
     * with the specified ID from the TABLE_WP_QUICK_TASKS_COMMENTS table.
     *
     * @param int $commentId The ID of the comment to retrieve.
     * @return object|null The comment object if found, null otherwise.
     */
    public function getCommentById($commentId) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_COMMENTS . " WHERE id = %d",
                $commentId
            )
        );

    }

    /**
     * Retrieves comments based on the specified type ID, type, and privacy status.
     *
     * @param int $typeId The ID of the type to filter comments by.
     * @param string $type The type to filter comments by.
     * @param int $isPrivate The privacy status to filter comments by (1 for private, 0 for public).
     * @return array The list of comments matching the specified criteria.
     */
    public function getComments($typeId, $type, $isPrivate) {
        global $wpdb;
    
        $comments_table = TABLE_WP_QUICK_TASKS_COMMENTS;
        $users_table = TABLE_WP_QUICK_TASKS_USERS;
        $wp_users_table = $wpdb->users;
    
        $query = "
            SELECT comments.*, 
                   CASE 
                       WHEN comments.is_admin_comment = 1 THEN wp_users.display_name 
                       ELSE users.name 
                   END AS author_name
            FROM $comments_table comments
            LEFT JOIN $users_table users ON comments.author_id = users.id AND comments.is_admin_comment = 0
            LEFT JOIN $wp_users_table wp_users ON comments.author_id = wp_users.ID AND comments.is_admin_comment = 1
            WHERE comments.type_id = %d AND comments.type = %s AND comments.is_private = %d
            ORDER BY comments.created_at
        ";
    
        $prepared_query = $wpdb->prepare($query, $typeId, $type, $isPrivate);
    
        return $wpdb->get_results($prepared_query);
    }
    
}