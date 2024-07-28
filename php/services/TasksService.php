<?php

class TasksService {
    protected $tasksRepository;

    public function __construct() {
        $this->tasksRepository = new TasksRepository();
    }

    /**
     * Creates a new task.
     *
     * @param int $stageId The ID of the stage to which the task belongs.
     * @param array $args An array of arguments for creating the task.
     *                    - name: (string) The name of the task.
     *
     * @return int The ID of the newly created task.
     *
     * @throws Exception If the task creation fails.
     */

    public function createTask($stageId, $args) {
        global $wpdb;

        $defaults = array(
            'name' => null
        );

        $args = wp_parse_args($args, $defaults);

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_TASKS, array(
            'name' => $args['name'],
            'stage_id' => $stageId
        ));

        if ($result !== false) {
            return $wpdb->insert_id;
        } else {
            throw new Exception('Failed to create task');
        }
    }
}