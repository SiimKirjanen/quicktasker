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
         * @param string $authorType The type of the author (default is 'quicktasker').
         * 
         * @return mixed The created comment object.
         * 
         * @throws \Exception If the comment could not be added to the database.
         */
        public function createComment($typeId, $type, $isPrivate, $text, $userId, $authorType = WP_QT_QUICKTASKER_USER_TYPE) {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_COMMENTS, array(
                'type_id' => $typeId,
                'type' => $type,
                'is_private' => $isPrivate,
                'text' => $text,
                'author_id' => $userId,
                'author_type' => $authorType,
                'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            ));

            if( $result === false ) {
                throw new WPQTException('Failed to add the comment');
            }

            $commentId = $wpdb->insert_id;

            return ServiceLocator::get('CommentRepository')->getCommentById($commentId);
        }

        /**
         * Deletes comments by type ID and type.
         *
         * @param int $typeId The ID of the type associated with the comments.
         * @param string $type The type of the comments.
         * 
         * @return int The number of rows deleted.
         * 
         * @throws WPQTException If there is an error deleting the comments.
         */
        public function deleteCommentsByTypeIdAndType($typeId, $type) {
            global $wpdb;

            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_COMMENTS, array(
                'type_id' => $typeId,
                'type' => $type,
            ));

            if( $result === false ) {
                throw new WPQTException('Failed to delete the comments');
            }

            return $result;
        }

        /**
         * Deletes comments for tasks by their IDs.
         *
         * @param array $taskIds An array of task IDs for which comments should be deleted.
         * 
         * @return int The number of rows deleted.
         * 
         * @throws WPQTException If there is an error deleting the comments.
         */
        public function deleteTasksComments( $taskIds ) {
            if ( empty($taskIds) ) {
                return 0;
            }

            global $wpdb;

            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));
            $query = $wpdb->prepare(
                "DELETE FROM " . TABLE_WP_QUICKTASKER_COMMENTS . " WHERE type_id IN ($placeholders) AND type = 'task'",
                $taskIds
            );

            $result = $wpdb->query($query);

            if ($result === false) {
                throw new WPQTException('Failed to delete task comments');
            }

            return $results;
        }
    }
}