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


    /**
     * Retrieves a task by its ID.
     *
     * @param int $taskId The ID of the task to retrieve.
     * @return object The task object if found.
     * @throws Exception If the task retrieval fails.
     */
    public function getTask($taskId) {
        global $wpdb;

        $sql = $wpdb->get_row( $wpdb->prepare("SELECT * FROM " . TABLE_WP_QUICK_TASKS_TASKS . " WHERE id = %d", $taskId) );

        if ($sql) {
            return $sql;
        } else {
            throw new Exception('Failed to get task');
        }
    }

    /**
     * Adds a task order to the database.
     *
     * @param int $taskId The ID of the task.
     * @param int $stageId The ID of the stage.
     * @param int $taskOrder The order of the task.
     * @return int The ID of the inserted task order.
     * @throws Exception If failed to add task order.
     */
    public function addTaskOrder($taskId, $stageId, $taskOrder) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_TASKS_ORDER, array(
            'task_id' => $taskId,
            'stage_id' => $stageId,
            'task_order' => $taskOrder
        ));

        if ($result !== false) {
            return $wpdb->insert_id;
        } else {
            throw new Exception('Failed to add task order');
        }
    }
}