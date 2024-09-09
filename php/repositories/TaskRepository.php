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

    /**
     * Retrieves tasks assigned to a specific user.
     *
     * @param int $userId The ID of the user.
     * @return array The tasks assigned to the user.
     */
    public function getTasksAssignedToUser($userId) {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT b.* FROM ". TABLE_WP_QUICK_TASKS_USER_TASK . " AS a
            LEFT JOIN ". TABLE_WP_QUICK_TASKS_TASKS ." AS b
            ON a.task_id = b.id
            WHERE a.user_id = %d",
            $userId
        ) );
    }

    /**
     * Retrieves tasks that are assignable to a specific user.
     *
     * @param int $userId The ID of the user.
     * @return array The list of tasks that are assignable to the user.
     */
    public function getTasksAssignableToUser($userId) {
        global $wpdb;
    
        return $wpdb->get_results( $wpdb->prepare(
            "SELECT a.* FROM ". TABLE_WP_QUICK_TASKS_TASKS . " AS a
            LEFT JOIN ". TABLE_WP_QUICK_TASKS_USER_TASK ." AS b
            ON a.id = b.task_id AND b.user_id = %d
            WHERE b.user_id IS NULL AND a.is_archived = 0 AND a.free_for_all = 1",
            $userId
        ) );
    }
}