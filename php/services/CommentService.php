<?php

namespace WPQT\Comment;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\WPQTException;
use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Comment\CommentService' ) ) {
    class CommentService {
        /**
         * Creates a new comment in the database.
         *
         * @param int $typeId The ID of the type associated with the comment.
         * @param string $type The type of the comment.
         * @param bool $isPrivate Indicates if the comment is private.
         * @param string $text The text content of the comment.
         * @param int $userId The ID of the user creating the comment.
         * @param boolean $isAdminComment Is comment created by WordPress admin.
         * 
         * @return mixed The created comment object.
         * 
         * @throws \Exception If the comment could not be added to the database.
         */
        public function createComment($typeId, $type, $isPrivate, $text, $userId, $isAdminComment = false) {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_COMMENTS, array(
                'type_id' => $typeId,
                'type' => $type,
                'is_private' => $isPrivate,
                'text' => $text,
                'author_id' => $userId,
                'is_admin_comment' => $isAdminComment,
                'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            ));

            if( $result === false ) {
                throw new WPQTException('Failed to add a comment');
            }

            $commentId = $wpdb->insert_id;

            return ServiceLocator::get('CommentRepository')->getCommentById($commentId);
        }
    }
}