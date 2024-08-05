<?php

class TaskRepository {
    /**
     * Retrieves all tasks from the database.
     *
     * @return array The array of tasks retrieved from the database.
     */
    public function getTasks() {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT * FROM %s",
            TABLE_WP_QUICK_TASKS_TASKS
        ) );
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
            "SELECT * FROM %s
            WHERE id = %d",
            TABLE_WP_QUICK_TASKS_TASKS,
            $id
        ) );
    }

    /**
     * Retrieves tasks by stage ID.
     *
     * @param int $stageId The ID of the stage.
     * @return array|null The tasks associated with the stage ID, or null if no tasks found.
     */
    public function getTasksByStageId($stageId) {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT * FROM ". TABLE_WP_QUICK_TASKS_TASKS ."
            WHERE stage_id = %d",
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
            "SELECT * FROM ". TABLE_WP_QUICK_TASKS_TASKS_ORDER ."
            WHERE task_id = %d AND stage_id = %d",
            $taskId,
            $stageId
        ) );
    }
}