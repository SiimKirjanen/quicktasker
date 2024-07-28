<?php

class TasksRepository {
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
}