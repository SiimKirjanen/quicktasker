<?php
namespace WPQT\Task;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Stage\StageRepository;
use WPQT\Task\TaskRepository;
use WPQT\Hash\HashService;
use WPQT\Exceptions\WPQTException;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Time\TimeRepository;

if ( ! class_exists( 'WPQT\Task\TaskService' ) ) {
    class TaskService {
        protected $taskRepository;
        protected $stageRepository;
        protected $pipelineRepository;
        protected $hashService;
        protected $timeRepository;

        public function __construct() {
            $this->taskRepository = new TaskRepository();
            $this->stageRepository = new StageRepository();
            $this->pipelineRepository = new PipelineRepository();
            $this->hashService = new HashService();
            $this->timeRepository = new TimeRepository();
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
                    "SELECT MAX(task_order) FROM " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " WHERE stage_id = %d AND is_archived = 0",
                    $stageId
                )
            );

            return $result === null ? 0 : $result + 1;
        }
        /**
         * Creates a task.
         *
         * @param int|null $stageId The ID of the stage to add the task to.
         * @param array $args The task data.
         * @return object The created task.
         * @throws Exception If required fields are missing or if failed to create task.
         */
        public function createTask($stageId, $args) {
            global $wpdb;

            $defaults = array(
                'description' => null,
                'task_focus_color' => null,
                'due_date' => null,
                'is_archived' => 0,
                'task_completed_at' => null,
                'is_done' => 0,
            );

            $args = wp_parse_args($args, $defaults);

            if ( !isset($args['name']) ) {
                throw new \Exception('createTask required fields are missing');
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_TASKS, array(
                'name' => $args['name'],
                'description' => $args['description'],
                'pipeline_id' => $args['pipelineId'],
                'task_hash' => $this->hashService->generateTaskHash($args['name']),
                'created_at' => $this->timeRepository->getCurrentUTCTime(),
                'updated_at' => $this->timeRepository->getCurrentUTCTime(),
                'task_focus_color' => $args['task_focus_color'],
                'due_date' => $args['due_date'],
                'is_archived' => $args['is_archived'],
                'task_completed_at' => $args['task_completed_at'],
                'is_done' => $args['is_done']
            ));

            if( $result === false ) {
                throw new \Exception('Failed to create a task');
            }

            $taskId = $wpdb->insert_id;

            $taskOrder = $stageId ? $this->getNextTaskOrder($stageId) : 0;

            $this->addTaskLocation($taskId, $stageId, $taskOrder, $args['is_archived']);

            return $this->taskRepository->getTaskById($taskId);
        }

        /**
         * Adds a task order to the database.
         *
         * @param int $taskId The ID of the task.
         * @param int|null $stageId The ID of the stage.
         * @param int $taskOrder The order of the task.
         * @param int $isArchived Whether the task is archived (default is 0).
         * @return int The ID of the inserted task order.
         * @throws Exception If failed to add task order.
         */
        public function addTaskLocation($taskId, $stageId, $taskOrder, $isArchived = 0) {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array(
                'task_id' => $taskId,
                'stage_id' => $stageId,
                'task_order' => $taskOrder,
                'is_archived' => $isArchived,
                'created_at' => $this->timeRepository->getCurrentUTCTime(),
                'updated_at' => $this->timeRepository->getCurrentUTCTime()
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
                TABLE_WP_QUICKTASKER_TASKS_LOCATION,
                array(
                    'stage_id' => $newStageId,
                    'task_order' => $newOrder,
                    'updated_at' => $this->timeRepository->getCurrentUTCTime()
                ),
                array(
                    'task_id' => $taskId
                ),
                array(
                    '%d',
                    '%d',
                    '%s'
                )
            );

            if ($rowsUpdated === false) {
                throw new WPQTException('Failed to move task');
            }
    
            return (object)[
                'oldStageId' => $currentStageId,
                'newStageId' => $newStageId,
                'stageChanged' => $stageChanged,
                'task' => $this->taskRepository->getTaskById($taskId)
            ];
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
        
            $utcTime = $this->timeRepository->getCurrentUTCTime();

            if ($currentOrder < $newOrder) {
                // Moving down within the same stage
                $result = $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . "
                        SET task_order = task_order - 1, updated_at = %s
                        WHERE stage_id = %d AND task_order > %d AND task_order <= %d AND is_archived = 0",
                        $utcTime,
                        $stageId,
                        $currentOrder,
                        $newOrder
                    )
                );
            } else {
                // Moving up within the same stage
                $result = $wpdb->query(
                    $wpdb->prepare(
                        "UPDATE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . "
                        SET task_order = task_order + 1, updated_at = %s
                        WHERE stage_id = %d AND task_order < %d AND task_order >= %d AND is_archived = 0",
                        $utcTime,
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

            $utcTime = $this->timeRepository->getCurrentUTCTime();
        
            // Decrement the task order of tasks in the current stage
            $result1 = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . "
                    SET task_order = task_order - 1, updated_at = %s
                    WHERE stage_id = %d AND task_order > %d AND is_archived = 0",
                    $utcTime,
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
                    "UPDATE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . "
                    SET task_order = task_order + 1, updated_at = %s
                    WHERE stage_id = %d AND task_order >= %d AND is_archived = 0",
                    $utcTime,
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

            // Handle null values for dueDate
            if (isset($args['dueDate']) && ($args['dueDate'] === null || $args['dueDate'] === '')) {
                $args['dueDate'] = null;
            }

             // Map request data to database columns
            $mappedArgs = $this->mapRequestToDbColumns($args);

            $defaults = array(
                'updated_at' => $this->timeRepository->getCurrentUTCTime()
            );

            $mappedArgs = wp_parse_args($mappedArgs, $defaults);

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, $mappedArgs, array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to edit task');
            }
            
            return $this->taskRepository->getTaskById($taskId, true);
        }

        /**
         * Maps request parameters to database column names.
         *
         * This function takes an associative array of request parameters and maps
         * them to the corresponding database column names based on a predefined
         * mapping. If a parameter does not have a corresponding mapping, it is
         * included in the result as-is.
         *
         * @param array $args Associative array of request parameters.
         * @return array Associative array with database column names as keys.
         */
        private function mapRequestToDbColumns($args) {
            $mapping = array(
                'name' => 'name',
                'description' => 'description',
                'dueDate' => 'due_date',
                'freeForAll' => 'free_for_all',
            );
    
            $mappedArgs = array();
            foreach ($args as $key => $value) {
                if (isset($mapping[$key])) {
                    $mappedArgs[$mapping[$key]] = $value;
                } else {
                    $mappedArgs[$key] = $value;
                }
            }
    
            return $mappedArgs;
        }

        /**
         * Deletes a task.
         *
         * @param int $taskId The ID of the task to delete.
         * @return object The deleted task.
         * @throws Exception If there is an error deleting the task or its location.
         */
        public function deleteTask($taskId) {
            global $wpdb;

            $taskToDelete = $this->taskRepository->getTaskById($taskId);
            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_TASKS, array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to delete task');
            }

            $result2 = $wpdb->delete(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array('task_id' => $taskId));

            if ($result2 === false) {
                throw new \Exception('Failed to delete task location');
            }

            $this->shiftTaskOrder($taskToDelete->task_order, $taskToDelete->stage_id);

            $results3 = $wpdb->delete(TABLE_WP_QUICKTASKER_USER_TASK, array('task_id' => $taskId));

            if ($results3 === false) {
                throw new \Exception('Failed to unassign users from the task');
            }

            return $taskToDelete;
        }

    
        /**
         * Archives a task by setting its 'is_archived' status to 1 and updating the 'updated_at' timestamp.
         * This method updates both the main task table and the task location table.
         * 
         * @param int $taskId The ID of the task to be archived.
         * 
         * @throws \Exception If the task or task location update fails.
         * 
         * @return object The updated task object after archiving.
         */
        public function archiveTask($taskId) {
            global $wpdb;

            $utcTime = $this->timeRepository->getCurrentUTCTime();
            $taskToArchive = $this->taskRepository->getTaskById($taskId);
            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, array('is_archived' => 1, 'updated_at' => $utcTime), array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to archive task');
            }

            $result2 = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array('is_archived' => 1, 'updated_at' => $utcTime), array('task_id' => $taskId));

            if ($result2 === false) {
                throw new \Exception('Failed to archive task location');
            }

            $this->shiftTaskOrder($taskToArchive->task_order, $taskToArchive->stage_id);

            return $this->taskRepository->getTaskById($taskId);
        }

        public function restoreArchivedTask($taskId) {
            global $wpdb;

            $utcTime = $this->timeRepository->getCurrentUTCTime();
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
            
            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, array('is_archived' => 0, 'updated_at' => $utcTime), array('id' => $taskId));

            if ($result === false) {
                throw new WPQTException('Failed to restore task');
            }

            $result2 = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array('is_archived' => 0, 'updated_at' => $utcTime), array('task_id' => $taskId));

            if ($result2 === false) {
                throw new WPQTException('Failed to restore task location');
            }

            return $this->taskRepository->getTaskById($taskId);
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

            $utcTime = $this->timeRepository->getCurrentUTCTime();
            $result = $wpdb->query(
                $wpdb->prepare(
                    "UPDATE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . "
                    SET task_order = task_order - 1, updated_at = %s
                    WHERE stage_id = %d AND task_order > %d AND is_archived = 0",
                    $utcTime,
                    $stageId,
                    $deletedTaskOrder
                )
            );

            if ($result === false) {
                throw new \Exception('Failed to shift tasks order');
            }

            return $result;
        }

        /**
         * Changes the completion status of a task.
         *
         * @param int $taskId The ID of the task to update.
         * @param bool $isDone The new completion status of the task.
         * @return array The updated task data.
         * @throws \Exception If the task status update fails.
         */
        function changeTaskDoneStatus($taskId, $isDone) {
            global $wpdb;

            $utcTime = $this->timeRepository->getCurrentUTCTime();
            $data = array(
                'is_done' => $isDone,
                'task_completed_at' => $isDone ? $utcTime : null
            );
            $where = array('id' => $taskId);
            $format = array('%d', $isDone ? '%s' : '%d');
            $where_format = array('%d');

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, $data, $where, $format, $where_format);

            if ($result === false) {
                throw new \Exception('Failed to change task completed status');
            }

            return $this->taskRepository->getTaskById($taskId);
        }

        /**
         * Updates the focus color of a task.
         *
         * @param int $taskId The ID of the task to update.
         * @param string $color The new focus color for the task.
         * @return object The updated task object.
         * @throws \Exception If the update fails.
         */
        public function updateTaskFocusColor($taskId, $color) {
            global $wpdb;

            $utcTime = $this->timeRepository->getCurrentUTCTime();
            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, array('task_focus_color' => $color, 'updated_at' => $utcTime), array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to update task focus color');
            }

            return $this->taskRepository->getTaskById($taskId);
        }
    }
}