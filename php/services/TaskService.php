<?php
namespace WPQT\Task;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Log\LogService;
use WPQT\Stage\StageRepository;
use WPQT\Task\TaskRepository;
use WPQT\Hash\HashService;
use WPQT\Exceptions\WPQTException;
use WPQT\Pipeline\PipelineRepository;

class TaskService {
    protected $taskRepository;
    protected $stageRepository;
    protected $pipelineRepository;
    protected $logService;
    protected $hashService;

    public function __construct() {
        $this->taskRepository = new TaskRepository();
        $this->stageRepository = new StageRepository();
        $this->pipelineRepository = new PipelineRepository();
        $this->logService = new LogService();
        $this->hashService = new HashService();
    }

    /**
     * Gets the next task order for a stage.
     *
     * @param int $stageId The ID of the stage.
     * @return int The next task order.
     */
    public function getNextTaskOrder($stageId) {
        global $wpdb;

        $result = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT MAX(task_order) FROM " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . " WHERE stage_id = %d AND is_archived = 0",
                $stageId
            )
        );

        return $result === null ? 0 : $result + 1;
    }
    /**
     * Creates a task.
     *
     * @param int $stageId The ID of the stage to add the task to.
     * @param array $args The task data.
     * @return object The created task.
     * @throws Exception If required fields are missing or if failed to create task.
     */
    public function createTask($stageId, $args) {
        global $wpdb;

        $defaults = array(
            'description' => null
        );

        $args = wp_parse_args($args, $defaults);

        if ( !isset($args['name']) ) {
            throw new \Exception('createTask required fields are missing');
        }

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_TASKS, array(
            'name' => $args['name'],
            'pipeline_id' => $args['pipelineId'],
            'task_hash' => $this->hashService->generateTaskHash($args['name'])
        ));

        if( $result === false ) {
            throw new \Exception('Failed to create a task');
        }

        $taskId = $wpdb->insert_id;
        $taskOrder = $this->getNextTaskOrder($stageId);

        $this->addTaskLocation($taskId, $stageId, $taskOrder);

        return $this->taskRepository->getTaskById($taskId);
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
            throw new \Exception('Failed to add task order');
        }
    }

    /**
     * Moves a task to a new stage and updates its order within the stage.
     *
     * @param int $taskId The ID of the task to be moved.
     * @param int $newStageId The ID of the new stage to move the task to.
     * @param int $newOrder The new order of the task within the stage.
     * @return int The number of rows updated in the database.
     * @throws Exception If the task is not found or if the task move fails.
     */
    public function moveTask($taskId, $newStageId, $newOrder) {
        global $wpdb;

        $currentTask = $this->taskRepository->getTaskById($taskId);

        if (!$currentTask) {
            throw new WPQTException('Task not found');
        }
        $currentStageId = $currentTask->stage_id;
        $currentOrder = $currentTask->task_order;
        $stageChanged = $currentStageId != $newStageId;

        if (!$stageChanged) {
            $this->updateTaskOrderWithinStage($currentStageId, $currentOrder, $newOrder);
        } else {
            $this->updateTaskOrderAcrossStages($currentStageId, $currentOrder, $newStageId, $newOrder);
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
            throw new WPQTException('Failed to move task');
        }
        if($stageChanged) {
            $newStage = $this->stageRepository->getStageById($newStageId);
            $this->logService->log('Task moved to a ' . $newStage->name, WP_QT_LOG_TYPE_TASK, $taskId);
        }

        return $rowsUpdated;
    }
    
    /**
     * Updates the task order within a stage.
     *
     * @param int $stageId The ID of the stage.
     * @param int $currentOrder The current task order.
     * @param int $newOrder The new task order.
     * @return void
     */
    private function updateTaskOrderWithinStage($stageId, $currentOrder, $newOrder) {
        global $wpdb;
    
        if ($currentOrder < $newOrder) {
            // Moving down within the same stage
            $result = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                    SET task_order = task_order - 1
                    WHERE stage_id = %d AND task_order > %d AND task_order <= %d AND is_archived = 0",
                    $stageId,
                    $currentOrder,
                    $newOrder
                )
            );
        } else {
            // Moving up within the same stage
            $result = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                    SET task_order = task_order + 1
                    WHERE stage_id = %d AND task_order < %d AND task_order >= %d AND is_archived = 0",
                    $stageId,
                    $currentOrder,
                    $newOrder
                )
            );
        }
      
        if ($result === false) {
            throw new \Exception('Failed to update task order within stage');
        }
    }
    
    /**
     * Updates the task order across stages.
     *
     * This function updates the task order of tasks in different stages based on the provided parameters.
     *
     * @param int $currentStageId The ID of the current stage.
     * @param int $currentOrder The current task order.
     * @param int $newStageId The ID of the new stage.
     * @param int $newOrder The new task order.
     * @return void
     */
    private function updateTaskOrderAcrossStages($currentStageId, $currentOrder, $newStageId, $newOrder) {
        global $wpdb;
    
        // Decrement the task order of tasks in the current stage
        $result1 = $wpdb->query(
            $wpdb->prepare(
                "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                SET task_order = task_order - 1
                WHERE stage_id = %d AND task_order > %d AND is_archived = 0",
                $currentStageId,
                $currentOrder
            )
        );

        if ($result1 === false) {
            throw new \Exception('Failed to decrement task order in current stage');
        }
    
        // Increment the task order of tasks in the new stage
        $result2 = $wpdb->query(
            $wpdb->prepare(
                "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                SET task_order = task_order + 1
                WHERE stage_id = %d AND task_order >= %d AND is_archived = 0",
                $newStageId,
                $newOrder
            )
        );

        if ($result2 === false) {
            throw new \Exception('Failed to increment task order in new stage');
        }
    }

    /**
     * Edit a task.
     *
     * @param int $taskId The ID of the task to edit.
     * @param array $args The arguments to update the task with.
     * @return void
     */
    public function editTask($taskId, $args) {
        global $wpdb;

        $defaults = array();

        $args = wp_parse_args($args, $defaults);

        $result = $wpdb->update(TABLE_WP_QUICK_TASKS_TASKS, $args, array('id' => $taskId));

        if ($result === false) {
            throw new \Exception('Failed to edit task');
        }

        return $this->taskRepository->getTaskById($taskId, true);
    }

    /**
     * Deletes a task.
     *
     * @param int $taskId The ID of the task to delete.
     * @return bool True if the task is successfully deleted, false otherwise.
     * @throws Exception If there is an error deleting the task or its location.
     */
    public function deleteTask($taskId) {
        global $wpdb;

        $taskToDelete = $this->taskRepository->getTaskById($taskId);
        $result = $wpdb->delete(TABLE_WP_QUICK_TASKS_TASKS, array('id' => $taskId));

        if ($result === false) {
            throw new \Exception('Failed to delete task');
        }

        $result2 = $wpdb->delete(TABLE_WP_QUICK_TASKS_TASKS_LOCATION, array('task_id' => $taskId));

        if ($result2 === false) {
            throw new \Exception('Failed to delete task location');
        }

        $this->shiftTaskOrder($taskToDelete->task_order, $taskToDelete->stage_id);

        return true;
    }

    /**
     * Archives a task.
     *
     * @param int $taskId The ID of the task to be archived.
     * @throws Exception If failed to archive the task or delete the task location.
     */
    public function archiveTask($taskId) {
        global $wpdb;

        $taskToArchive = $this->taskRepository->getTaskById($taskId);
        $result = $wpdb->update(TABLE_WP_QUICK_TASKS_TASKS, array('is_archived' => 1), array('id' => $taskId));

        if ($result === false) {
            throw new \Exception('Failed to archive task');
        }

        $result2 = $wpdb->update(TABLE_WP_QUICK_TASKS_TASKS_LOCATION, array('is_archived' => 1), array('task_id' => $taskId));

        if ($result2 === false) {
            throw new \Exception('Failed to archive task location');
        }

        $this->shiftTaskOrder($taskToArchive->task_order, $taskToArchive->stage_id);
    }

    public function restoreArchivedTask($taskId) {
        global $wpdb;

        $task = $this->taskRepository->getTaskById($taskId);

        if ($task === null) {
            throw new WPQTException('Task not found', true);
        }

        $pipeline = $this->pipelineRepository->getPipelineById($task->pipeline_id);

        if (!$pipeline) {
            throw new WPQTException('Board not found', true);
        }

        $pipelineStages = $this->stageRepository->getStagesByPipelineId($pipeline->id);

        if (empty($pipelineStages)) {
            throw new WPQTException('No stages in board', true);
        }

        $stageExists = false;
        foreach ($pipelineStages as $stage) {
            if ($stage->id == $task->stage_id) {
                $stageExists = true;
                break;
            }
        }
    
        if ($stageExists) {
            $this->moveTask($taskId, $task->stage_id, $task->task_order);
        }else {
            $this->moveTask($taskId, $pipelineStages[0]->id, $task->task_order);
        }
        
        $result = $wpdb->update(TABLE_WP_QUICK_TASKS_TASKS, array('is_archived' => 0), array('id' => $taskId));

        if ($result === false) {
            throw new WPQTException('Failed to restore task');
        }

        $result2 = $wpdb->update(TABLE_WP_QUICK_TASKS_TASKS_LOCATION, array('is_archived' => 0), array('task_id' => $taskId));

        if ($result2 === false) {
            throw new WPQTException('Failed to restore task location');
        }
    }

    /**
     * Shifts the task order after a task is deleted or archived.
     *
     * @param int $deletedTaskOrder The order of the deleted task.
     * @param int $stageId The ID of the stage.
     * @return int The number of rows affected by the update query.
     * @throws Exception If the update query fails.
     */
    private function shiftTaskOrder($deletedTaskOrder, $stageId) {
        global $wpdb;

        $result = $wpdb->query(
            $wpdb->prepare(
                "UPDATE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . "
                SET task_order = task_order - 1
                WHERE stage_id = %d AND task_order > %d AND is_archived = 0",
                $stageId,
                $deletedTaskOrder
            )
        );

        if ($result === false) {
            throw new \Exception('Failed to shift tasks order');
        }

        return $result;
    }
}