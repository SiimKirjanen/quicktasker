<?php
namespace WPQT\Task;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class TaskRepository {
    /**
     * Retrieves all tasks from the database.
     *
     * @return array The array of tasks retrieved from the database.
     */
    public function getTasks() {
        global $wpdb;
    
        return $wpdb->get_results(
            "SELECT * FROM " . TABLE_WP_QUICK_TASKS_TASKS
        );
    }

    /**
     * Retrieves the archived tasks from the database.
     *
     * @return array The archived tasks.
     */
    public function getArchivedTasks() {
        global $wpdb;
    
        return $wpdb->get_results(
            "SELECT * FROM " . TABLE_WP_QUICK_TASKS_TASKS . " WHERE is_archived = 1"
        );
    }

    /**
     * Retrieves a task by its ID.
     *
     * @param int $id The ID of the task to retrieve.
     * @return object|null The task object if found, null otherwise.
     */
    public function getTaskById($id) {
        global $wpdb;

        return $wpdb->get_row( $wpdb->prepare(
            "SELECT a.*, b.task_order, b.stage_id FROM ". TABLE_WP_QUICK_TASKS_TASKS . " AS a
            LEFT JOIN ". TABLE_WP_QUICK_TASKS_TASKS_LOCATION ." AS b
            ON a.id = b.task_id
            WHERE a.id = %d",
            $id
        ) );
    }

    /**
     * Retrieves tasks by stage ID.
     *
     * @param int $stageId The ID of the stage.
     * @return array The array of tasks retrieved from the database.
     */
    public function getTasksByStageId($stageId) {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT a.*, b.task_order, b.stage_id FROM ". TABLE_WP_QUICK_TASKS_TASKS . " AS a
            LEFT JOIN ". TABLE_WP_QUICK_TASKS_TASKS_LOCATION ." AS b
            ON a.id = b.task_id
            WHERE b.stage_id = %d
            ORDER BY b.task_order",
            $stageId
        ) );
    }

    /**
     * Retrieves the task order based on the task ID and stage ID.
     *
     * @param int $taskId The ID of the task.
     * @param int $stageId The ID of the stage.
     * @return object|null The task order object if found, null otherwise.
     */
    public function getTaskOrder($taskId, $stageId) {
        global $wpdb;

        return $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM ". TABLE_WP_QUICK_TASKS_TASKS_LOCATION ."
            WHERE task_id = %d AND stage_id = %d",
            $taskId,
            $stageId
        ) );
    }

    public function getTasksByStageIds($stageIds) {
        global $wpdb;

        // Prepare the placeholders for the IN clause
        $placeholders = implode(',', array_fill(0, count($stageIds), '%d'));

        // Prepare the SQL query
        $sql = $wpdb->prepare(
            "SELECT a.*, b.stage_id 
             FROM " . TABLE_WP_QUICK_TASKS_TASKS . " AS a
             INNER JOIN " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . " AS b
             ON a.id = b.task_id
             WHERE b.stage_id IN ($placeholders)",
            $stageIds
        );

        // Execute the query and get the results
        $results = $wpdb->get_results($sql);

        return $results;
    }
}