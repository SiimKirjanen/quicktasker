<?php

namespace WPQT\Comment;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\WPQTException;
use WPQT\Services\ServiceLocator;

if ( ! class_exists( 'WPQT\Comment\CommentService' ) ) {
    class CommentService {
        /**
         * Creates a new comment in the database.
         *
         * @param int $typeId The ID of the type associated with the comment.
         * @param string $type The type of the comment.
         * @param array $args Optional arguments for the comment.
         * 
         * @return mixed The created comment object.
         * 
         * @throws \Exception If the comment could not be added to the database.
         */
        public function createComment($typeId, $type, $args = array()) {
            global $wpdb;

            $defaults = array(
                'isPrivate' => false,
                'text' => '',
                'authorType' => WP_QT_QUICKTASKER_USER_TYPE,
                'createdAt' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            );
            $args = wp_parse_args($args, $defaults);

            if ( empty($typeId) || empty($type) || empty($args['authorId']) || empty($args['authorType']) ) {
                throw new WPQTException('Required fields are missing for creating a comment');
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_COMMENTS, array(
                'type_id' => $typeId,
                'type' => $type,
                'is_private' => $args['isPrivate'],
                'text' => $args['text'],
                'author_id' => $args['authorId'],
                'author_type' => $args['authorType'],
                'created_at' => $args['createdAt'],
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