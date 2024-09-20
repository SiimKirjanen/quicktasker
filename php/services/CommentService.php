<?php

namespace WPQT\Comment;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Comment\CommentRepository;

class CommentService {
    protected $commentRepository;

    public function __construct() {
        $this->commentRepository = new CommentRepository();
    }

    /**
     * Creates a new comment in the database.
     *
     * @param int $typeId The ID of the type associated with the comment.
     * @param string $type The type of the comment.
     * @param bool $isPrivate Indicates whether the comment is private.
     * @param string $text The text content of the comment.
     * 
     * @return mixed The newly created comment object.
     * 
     * @throws \Exception If the comment could not be added to the database.
     */
    public function createComment($typeId, $type, $isPrivate, $text ) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_COMMENTS, array(
            'type_id' => $typeId,
            'type' => $type,
            'is_private' => $isPrivate,
            'text' => $text
        ));

        if( $result === false ) {
            throw new \Exception('Failed to add a comment');
        }

        $commentId = $wpdb->insert_id;

        return $this->commentRepository->getCommentById($commentId);
    }
}
