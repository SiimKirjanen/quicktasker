<?php

namespace WPQT\Comment;

class CommentRepository {
    public function getTaskComments($taskId) {
        global $wpdb;

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_COMMENTS . " WHERE task_id = %d",
                $taskId
            )
        );
    }   
}