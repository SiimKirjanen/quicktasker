<?php
namespace WPQT\Task;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\WPQTException;
use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Task\TaskService' ) ) {
    class TaskService {
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
                'task_hash' => ServiceLocator::get("HashService")->generateTaskHash($args['name']),
                'created_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime(),
                'updated_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime(),
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

            return ServiceLocator::get("TaskRepository")->getTaskById($taskId);
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
                'created_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime(),
                'updated_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
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

            $currentTask = ServiceLocator::get("TaskRepository")->getTaskById($taskId);

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
                    'updated_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
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
                'task' => ServiceLocator::get("TaskRepository")->getTaskById($taskId)
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
        
            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();

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

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
        
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
                'updated_at' => ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
            );

            $mappedArgs = wp_parse_args($mappedArgs, $defaults);

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, $mappedArgs, array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to edit task');
            }
            
            return ServiceLocator::get("TaskRepository")->getTaskById($taskId, true);
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
         * @throws Exception If there is an error deleting the task.
         */
        public function deleteTask($taskId) {
            global $wpdb;

            $taskToDelete = ServiceLocator::get("TaskRepository")->getTaskById($taskId);
            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_TASKS, array('id' => $taskId));
            ServiceLocator::get("CommentService")->deleteCommentsByTypeIdAndType($taskId, WP_QUICKTASKER_COMMENT_TYPE_TASK);

            if ($result === false) {
                throw new \Exception('Failed to delete the task');
            }

            $this->shiftTaskOrder($taskToDelete->task_order, $taskToDelete->stage_id);

            return $taskToDelete;
        }

        /**
         * Deletes tasks associated with a specific pipeline.
         *
         * @param int $pipelineId The ID of the pipeline whose tasks should be deleted
         * @param array $args Optional arguments to filter the deletion
         * @return int|false The number of rows affected, or false on error
         * @throws \Exception If the deletion fails
         */
        public function deleteTasksByPipelineId($pipelineId, $args = array()) {
            global $wpdb;

            $defaults = array(
                'is_archived' => 0
            );
            $args = wp_parse_args($args, $defaults);
            
            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_TASKS, array(
                'pipeline_id' => $pipelineId,
                'is_archived' => $args['is_archived']
            ));
            
            if ($result === false) {
                throw new \Exception('Failed to delete board tasks');
            }
            
            return $result;
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

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
            $taskToArchive = ServiceLocator::get("TaskRepository")->getTaskById($taskId);
            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, array('is_archived' => 1, 'updated_at' => $utcTime), array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to archive task');
            }

            $result2 = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array('is_archived' => 1, 'updated_at' => $utcTime), array('task_id' => $taskId));

            if ($result2 === false) {
                throw new \Exception('Failed to archive task location');
            }

            $this->shiftTaskOrder($taskToArchive->task_order, $taskToArchive->stage_id);

            return ServiceLocator::get("TaskRepository")->getTaskById($taskId);
        }

        public function restoreArchivedTask($taskId, $pipelineId) {
            global $wpdb;

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
            $task = ServiceLocator::get("TaskRepository")->getTaskById($taskId);

            if ($task === null) {
                throw new WPQTException('Task not found', true);
            }

            $pipeline = ServiceLocator::get("PipelineRepository")->getPipelineById($pipelineId);

            if (!$pipeline) {
                throw new WPQTException('Board not found', true);
            }

            $pipelineStages = ServiceLocator::get("StageRepository")->getStagesByPipelineId($pipeline->id);

            if (empty($pipelineStages)) {
                throw new WPQTException('No stages in board', true);
            }

            $this->moveTask($taskId, $pipelineStages[0]->id, 0);
         
            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_TASKS, 
                array(
                    'is_archived' => 0, 
                    'updated_at' => $utcTime, 
                    'pipeline_id' => $pipelineId
                ), 
                array('id' => $taskId)
            );

            if ($result === false) {
                throw new WPQTException('Failed to restore task');
            }

            $result2 = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS_LOCATION, array('is_archived' => 0, 'updated_at' => $utcTime), array('task_id' => $taskId));

            if ($result2 === false) {
                throw new WPQTException('Failed to restore task location');
            }

            return ServiceLocator::get("TaskRepository")->getTaskById($taskId);
        }

        /**
         * Deletes archived tasks that do not belong to any pipeline.
         *
         * This method retrieves orphaned archived tasks and deletes them from both the main tasks table
         * and the tasks location table. It returns an array of deleted task IDs.
         *
         * @return  array An array of deleted task IDs.
         * @throws \Exception If the deletion fails.
         */
        public function deleteArchivedTasksWithoutPipeline() {
            global $wpdb;

            $orphanedTaks = ServiceLocator::get("TaskRepository")->getOrphanedArchivedTasks();

            if ( empty($orphanedTaks) ) {
                return [];
            }

            $taskIds = wp_list_pluck($orphanedTaks, 'id');
            $taskIdsPlaceholders = implode(',', array_fill(0, count($taskIds), '%d'));

            // Delete tasks from the main tasks table
            $result = $wpdb->query(
                $wpdb->prepare(
                    "DELETE FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE id IN ($taskIdsPlaceholders) AND is_archived = 1",
                    $taskIds
                )
            );
            if ($result === false) {
                throw new \Exception('Failed to delete orphaned archived tasks');
            }

            // Delete tasks from the tasks location table
            $result2 = $wpdb->query(
                $wpdb->prepare(
                    "DELETE FROM " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " WHERE task_id IN ($taskIdsPlaceholders) AND is_archived = 1",
                    $taskIds
                )
            );

            if ($result2 === false) {
                throw new \Exception('Failed to delete orphaned archived tasks location');
            }

            return $taskIds;
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

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
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

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
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

            return ServiceLocator::get("TaskRepository")->getTaskById($taskId);
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

            $utcTime = ServiceLocator::get("TimeRepository")->getCurrentUTCTime();
            $result = $wpdb->update(TABLE_WP_QUICKTASKER_TASKS, array('task_focus_color' => $color, 'updated_at' => $utcTime), array('id' => $taskId));

            if ($result === false) {
                throw new \Exception('Failed to update task focus color');
            }

            return ServiceLocator::get("TaskRepository")->getTaskById($taskId);
        }
    }
}