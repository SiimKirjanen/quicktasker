<?php

class TaskService {
    protected $taskRepository;

    public function __construct() {
        $this->taskRepository = new TaskRepository();
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

        $defaults = array();

        $args = wp_parse_args($args, $defaults);

        if ( empty($args['name']) || empty($args['taskOrder']) ) {
            throw new Exception('Required fields are missing');
        }

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_TASKS, array(
            'name' => $args['name']
        ));

        if( $result === false ) {
            throw new Exception('Failed to create task');
        }

        $taskId = $wpdb->insert_id;

        $this->addTaskLocation($taskId, $stageId, $args['taskOrder']);

        return $taskId;
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
    public function addTaskLocation($taskId, $stageId, $taskOrder) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_TASKS_LOCATION, array(
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

    public function moveTask($taskId, $newStageId, $newOrder) {
        global $wpdb;
    
        $currentTask = $this->taskRepository->getTaskById($taskId);
    
        if (!$currentTask) {
            throw new Exception('Task not found');
        }
        $currentStageId = $currentTask->stage_id;
        $currentOrder = $currentTask->task_order;
    
        if ($currentStageId == $newStageId) {
            // Moving within the same stage
            if ($currentOrder < $newOrder) {
                // Moving down within the same stage
                $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                        SET task_order = task_order - 1
                        WHERE stage_id = %d AND task_order > %d AND task_order <= %d",
                        $currentStageId,
                        $currentOrder,
                        $newOrder
                    )
                );
            } else {
                // Moving up within the same stage
                $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                        SET task_order = task_order + 1
                        WHERE stage_id = %d AND task_order < %d AND task_order >= %d",
                        $currentStageId,
                        $currentOrder,
                        $newOrder
                    )
                );
            }
        } else {
            // Moving to a different stage
            // Decrement the task order of tasks in the current stage
            $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                    SET task_order = task_order - 1
                    WHERE stage_id = %d AND task_order > %d",
                    $currentStageId,
                    $currentOrder
                )
            );
    
            // Increment the task order of tasks in the new stage
            $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                    SET task_order = task_order + 1
                    WHERE stage_id = %d AND task_order >= %d",
                    $newStageId,
                    $newOrder
                )
            );
        }
    
        // Update the stage_id and task_order of the moved task
        $rowsUpdated = $wpdb->update(
            TABLE_WP_QUICK_TASKS_TASKS_LOCATION,
            array(
                'stage_id' => $newStageId,
                'task_order' => $newOrder,
            ),
            array(
                'task_id' => $taskId
            ),
            array(
                '%d',
                '%d'
            )
        );
    
        if ($rowsUpdated === false) {
            throw new Exception('Failed to move task');
        }
    
        return $rowsUpdated;
    }
}