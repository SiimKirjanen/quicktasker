<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required table constants
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_TASKS_LOCATION', 'wp_quicktasker_tasks_location');
}

// Define required comment type constant
if (!defined('WP_QUICKTASKER_COMMENT_TYPE_TASK')) {
    define('WP_QUICKTASKER_COMMENT_TYPE_TASK', 1);
}

require_once __DIR__ . '/../../../../php/services/TaskService.php';

class TaskServiceTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_TABLE_WP_QUICKTASKER_TASKS_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_TASKS'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_TASKS);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_TASKS);
    }

    public function test_TABLE_WP_QUICKTASKER_TASKS_LOCATION_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_TASKS_LOCATION'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_TASKS_LOCATION);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_TASKS_LOCATION);
    }

    public function test_WP_QUICKTASKER_COMMENT_TYPE_TASK_is_defined() {
        $this->assertTrue(defined('WP_QUICKTASKER_COMMENT_TYPE_TASK'));
        $this->assertEquals(1, WP_QUICKTASKER_COMMENT_TYPE_TASK);
    }

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_getNextTaskOrder_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'getNextTaskOrder'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'getNextTaskOrder');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
    }

    public function test_createTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'createTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'createTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_addTaskLocation_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'addTaskLocation'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'addTaskLocation');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(4, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('stageId', $params[1]->getName());
        $this->assertEquals('taskOrder', $params[2]->getName());
        $this->assertEquals('isArchived', $params[3]->getName());
    }

    public function test_moveTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'moveTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'moveTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(3, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('newStageId', $params[1]->getName());
        $this->assertEquals('newOrder', $params[2]->getName());
    }

    public function test_editTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'editTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'editTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_deleteTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'deleteTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'deleteTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
    }

    public function test_deleteTasksByTaskIds_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'deleteTasksByTaskIds'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'deleteTasksByTaskIds');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskIds', $params[0]->getName());
    }

    public function test_archiveTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'archiveTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'archiveTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
    }

    public function test_restoreArchivedTask_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'restoreArchivedTask'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'restoreArchivedTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('pipelineId', $params[1]->getName());
    }

    public function test_deleteArchivedTasksWithoutPipeline_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'deleteArchivedTasksWithoutPipeline'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'deleteArchivedTasksWithoutPipeline');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    public function test_changeTaskDoneStatus_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'changeTaskDoneStatus'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'changeTaskDoneStatus');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('isDone', $params[1]->getName());
    }

    public function test_updateTaskFocusColor_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'updateTaskFocusColor'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'updateTaskFocusColor');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
        $this->assertEquals('color', $params[1]->getName());
    }

    public function test_updateTaskOrderAfterTaskRestore_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'updateTaskOrderAfterTaskRestore'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'updateTaskOrderAfterTaskRestore');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
    }

    public function test_updateTaskOrderWithinStage_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'updateTaskOrderWithinStage'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'updateTaskOrderWithinStage');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(3, $reflection->getNumberOfParameters());
    }

    public function test_updateTaskOrderAcrossStages_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'updateTaskOrderAcrossStages'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'updateTaskOrderAcrossStages');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(4, $reflection->getNumberOfParameters());
    }

    public function test_shiftTaskOrder_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Task\TaskService::class, 'shiftTaskOrder'));
        
        $reflection = new ReflectionMethod(\WPQT\Task\TaskService::class, 'shiftTaskOrder');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for getNextTaskOrder
     * 
     * Requires WordPress environment with $wpdb.
     * 
     * Test scenarios:
     * 1. Should query MAX(task_order) from TABLE_WP_QUICKTASKER_TASKS_LOCATION
     * 2. Should filter WHERE stage_id = $stageId AND is_archived = 0
     * 3. Should return 0 if result is null (no tasks in stage)
     * 4. Should return result + 1 if tasks exist
     * 
     * Dependencies:
     * - global $wpdb with get_var(), prepare()
     */
    public function test_getNextTaskOrder_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb');
    }

    /**
     * Integration test for createTask
     * 
     * Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should use wp_parse_args() with defaults: description=null, task_focus_color=null, due_date=null, is_archived=0, task_completed_at=null, is_done=0
     * 2. Should throw Exception 'createTask required fields are missing' if name is not set
     * 3. Should insert into TABLE_WP_QUICKTASKER_TASKS with name, description, pipeline_id, task_hash, created_at, updated_at, task_focus_color, due_date, is_archived, task_completed_at, is_done
     * 4. Should generate task_hash using HashService->generateTaskHash($args['name'])
     * 5. Should throw Exception 'Failed to create a task' if insert fails (=== false)
     * 6. Should get insert_id after successful insert
     * 7. Should call getNextTaskOrder($stageId) if stageId is provided, else use 0
     * 8. Should call addTaskLocation($taskId, $stageId, $taskOrder, $args['is_archived'])
     * 9. Should return task from TaskRepository->getTaskById($taskId)
     * 
     * Dependencies:
     * - global $wpdb with insert(), insert_id
     * - wp_parse_args()
     * - ServiceLocator::get("HashService")->generateTaskHash()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - $this->getNextTaskOrder()
     * - $this->addTaskLocation()
     */
    public function test_createTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator');
    }

    /**
     * Integration test for addTaskLocation
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should insert into TABLE_WP_QUICKTASKER_TASKS_LOCATION
     * 2. Insert data: task_id, stage_id, task_order, is_archived, created_at, updated_at
     * 3. is_archived defaults to 0
     * 4. Should return insert_id if successful
     * 5. Should throw Exception 'Failed to add task order' if insert fails (=== false)
     * 
     * Dependencies:
     * - global $wpdb with insert(), insert_id
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     */
    public function test_addTaskLocation_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for moveTask
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get current task from TaskRepository->getTaskById($taskId)
     * 2. Should throw WPQTException 'Task not found' if task is null
     * 3. Should determine if stage changed: $currentStageId != $newStageId
     * 4. If currentOrder is null: call updateTaskOrderAfterTaskRestore($newStageId, $newOrder)
     * 5. If stage not changed: call updateTaskOrderWithinStage($currentStageId, $currentOrder, $newOrder)
     * 6. If stage changed: call updateTaskOrderAcrossStages($currentStageId, $currentOrder, $newStageId, $newOrder)
     * 7. Should update TABLE_WP_QUICKTASKER_TASKS_LOCATION: stage_id=$newStageId, task_order=$newOrder, updated_at=UTC
     * 8. Update WHERE task_id = $taskId, format: %d, %d, %s
     * 9. Should throw WPQTException 'Failed to move the task' if update fails (=== false)
     * 10. Should return object with: oldStageId, newStageId, stageChanged, task (from TaskRepository)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - $this->updateTaskOrderAfterTaskRestore()
     * - $this->updateTaskOrderWithinStage()
     * - $this->updateTaskOrderAcrossStages()
     * - WPQTException
     */
    public function test_moveTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, and WPQTException');
    }

    /**
     * Integration test for updateTaskOrderAfterTaskRestore (private)
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should increment task_order by 1 for tasks that need to be shifted
     * 2. UPDATE: SET task_order = task_order + 1, updated_at = UTC
     * 3. WHERE: stage_id = $stageId AND task_order >= $newOrder AND is_archived = 0
     * 4. Should throw Exception 'Failed to update task order after task restore' if query fails (=== false)
     * 5. Should return query result
     * 
     * Purpose: When restoring archived task (currentOrder is null), shift tasks down to make room
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     */
    public function test_updateTaskOrderAfterTaskRestore_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for updateTaskOrderWithinStage (private)
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should throw Exception 'Current order cannot be null when updating task order within a stage' if currentOrder is null
     * 2. If currentOrder < newOrder (moving down):
     *    - Decrement task_order by 1 for tasks in between
     *    - WHERE: stage_id = $stageId AND task_order > $currentOrder AND task_order <= $newOrder AND is_archived = 0
     * 3. If currentOrder >= newOrder (moving up):
     *    - Increment task_order by 1 for tasks in between
     *    - WHERE: stage_id = $stageId AND task_order < $currentOrder AND task_order >= $newOrder AND is_archived = 0
     * 4. Should throw Exception 'Failed to update task order within stage' if query fails (=== false)
     * 
     * Purpose: When moving task within same stage, shift other tasks to fill gap and make room
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     */
    public function test_updateTaskOrderWithinStage_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for updateTaskOrderAcrossStages (private)
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should decrement task_order in current stage to fill gap
     *    - UPDATE: task_order = task_order - 1, updated_at = UTC
     *    - WHERE: stage_id = $currentStageId AND task_order > $currentOrder AND is_archived = 0
     * 2. Should throw Exception 'Failed to decrement task order in current stage' if first query fails (=== false)
     * 3. Should increment task_order in new stage to make room
     *    - UPDATE: task_order = task_order + 1, updated_at = UTC
     *    - WHERE: stage_id = $newStageId AND task_order >= $newOrder AND is_archived = 0
     * 4. Should throw Exception 'Failed to increment task order in new stage' if second query fails (=== false)
     * 
     * Purpose: When moving task across stages, fill gap in old stage and make room in new stage
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     */
    public function test_updateTaskOrderAcrossStages_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for editTask
     * 
     * Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should check if due_date is set and is null or empty string
     * 2. Should set due_date to null if empty string provided (normalize empty to null)
     * 3. Should use wp_parse_args() with default: updated_at = getCurrentUTCTime()
     * 4. Should update TABLE_WP_QUICKTASKER_TASKS with $args WHERE id = $taskId
     * 5. Should throw Exception 'Failed to edit the task' if update fails (=== false)
     * 6. Should return updated task from TaskRepository->getTaskById($taskId, true)
     * 
     * Note: getTaskById called with second parameter true (force fresh query)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - wp_parse_args()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId, true)
     */
    public function test_editTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator');
    }

    /**
     * Integration test for deleteTask
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get task before deletion from TaskRepository->getTaskById($taskId)
     * 2. Should delete from TABLE_WP_QUICKTASKER_TASKS WHERE id = $taskId
     * 3. Should call CommentService->deleteCommentsByTypeIdAndType($taskId, WP_QUICKTASKER_COMMENT_TYPE_TASK)
     * 4. Should throw Exception 'Failed to delete the task' if delete fails (=== false)
     * 5. Should call shiftTaskOrder($taskToDelete->task_order, $taskToDelete->stage_id) to fill gap
     * 6. Should return deleted task object
     * 
     * Note: Deletes associated comments, shifts remaining tasks
     * 
     * Dependencies:
     * - global $wpdb with delete()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - ServiceLocator::get("CommentService")->deleteCommentsByTypeIdAndType()
     * - $this->shiftTaskOrder()
     */
    public function test_deleteTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for deleteTasksByTaskIds
     * 
     * Requires WordPress environment with $wpdb.
     * 
     * Test scenarios:
     * 1. Should return 0 if $taskIds is empty
     * 2. Should cast $taskIds to array with (array)$taskIds
     * 3. Should create placeholders: implode(',', array_fill(0, count($taskIds), '%d'))
     * 4. Should delete from TABLE_WP_QUICKTASKER_TASKS WHERE id IN ($placeholders)
     * 5. Should throw Exception 'Failed to delete the tasks' if query fails (=== false)
     * 6. Should return number of rows affected
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     */
    public function test_deleteTasksByTaskIds_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb');
    }

    /**
     * Integration test for archiveTask
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get task before archiving from TaskRepository->getTaskById($taskId)
     * 2. Should update TABLE_WP_QUICKTASKER_TASKS: is_archived=1, updated_at=UTC WHERE id=$taskId
     * 3. Should throw Exception 'Failed to archive task' if first update fails (=== false)
     * 4. Should update TABLE_WP_QUICKTASKER_TASKS_LOCATION: is_archived=1, updated_at=UTC, task_order=null WHERE task_id=$taskId
     * 5. task_order set to null for archived tasks
     * 6. Should throw Exception 'Failed to archive task location' if second update fails (=== false)
     * 7. Should call shiftTaskOrder($taskToArchive->task_order, $taskToArchive->stage_id) to fill gap
     * 8. Should return updated archived task from TaskRepository->getTaskById($taskId)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - $this->shiftTaskOrder()
     */
    public function test_archiveTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for restoreArchivedTask
     * 
     * Requires WordPress environment with $wpdb, ServiceLocator, and WordPress i18n.
     * 
     * Test scenarios:
     * 1. Should get task from TaskRepository->getTaskById($taskId)
     * 2. Should throw WPQTException 'Task not found' with true if task is null
     * 3. Should get pipeline from PipelineRepository->getPipelineById($pipelineId)
     * 4. Should throw WPQTException 'Board not found' with true if pipeline is null
     * 5. Should get pipeline stages from StageRepository->getStagesByPipelineId($pipeline->id)
     * 6. Should throw WPQTException with translated message 'Cannot restore the task. The selected board needs at least one stage.' if stages empty
     * 7. Should update TABLE_WP_QUICKTASKER_TASKS: is_archived=0, updated_at=UTC, pipeline_id=$pipelineId WHERE id=$taskId
     * 8. Should throw WPQTException 'Failed to restore the task' if first update fails (=== false)
     * 9. Should update TABLE_WP_QUICKTASKER_TASKS_LOCATION: is_archived=0, updated_at=UTC WHERE task_id=$taskId
     * 10. Should throw WPQTException 'Failed to restore task location' if second update fails (=== false)
     * 11. Should call moveTask($taskId, $pipelineStages[0]->id, 0) to place at beginning of first stage
     * 12. Should return restored task from TaskRepository->getTaskById($taskId)
     * 
     * Note: Exception messages use "board" instead of "pipeline", uses esc_html__() for translation
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - ServiceLocator::get("PipelineRepository")->getPipelineById($pipelineId)
     * - ServiceLocator::get("StageRepository")->getStagesByPipelineId()
     * - $this->moveTask()
     * - WPQTException
     * - esc_html__()
     */
    public function test_restoreArchivedTask_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, WPQTException, and i18n functions');
    }

    /**
     * Integration test for deleteArchivedTasksWithoutPipeline
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get orphaned archived tasks from TaskRepository->getOrphanedArchivedTasks()
     * 2. Should return empty array if no orphaned tasks
     * 3. Should extract task IDs using wp_list_pluck($orphanedTaks, 'id')
     * 4. Should create placeholders: implode(',', array_fill(0, count($taskIds), '%d'))
     * 5. Should delete from TABLE_WP_QUICKTASKER_TASKS WHERE id IN ($placeholders) AND is_archived = 1
     * 6. Should throw Exception 'Failed to delete orphaned archived tasks' if first query fails (=== false)
     * 7. Should delete from TABLE_WP_QUICKTASKER_TASKS_LOCATION WHERE task_id IN ($placeholders) AND is_archived = 1
     * 8. Should throw Exception 'Failed to delete orphaned archived tasks location' if second query fails (=== false)
     * 9. Should return array of deleted task IDs
     * 
     * Note: Variable typo in code - $orphanedTaks should be $orphanedTasks
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get("TaskRepository")->getOrphanedArchivedTasks()
     * - wp_list_pluck()
     */
    public function test_deleteArchivedTasksWithoutPipeline_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, and wp_list_pluck()');
    }

    /**
     * Integration test for shiftTaskOrder (private)
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should decrement task_order by 1 for tasks after deleted/archived position
     * 2. UPDATE: SET task_order = task_order - 1, updated_at = UTC
     * 3. WHERE: stage_id = $stageId AND task_order > $deletedTaskOrder AND is_archived = 0
     * 4. Should throw Exception 'Failed to shift tasks order' if query fails (=== false)
     * 5. Should return number of rows affected
     * 
     * Purpose: Fill gap in task ordering after task is deleted or archived
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     */
    public function test_shiftTaskOrder_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for changeTaskDoneStatus
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should build data array: is_done=$isDone, task_completed_at=($isDone ? UTC : null)
     * 2. Should set task_completed_at to current UTC time if marking done, null if marking not done
     * 3. Should build format array: ['%d', $isDone ? '%s' : '%d']
     * 4. Where format: ['%d']
     * 5. Should update TABLE_WP_QUICKTASKER_TASKS with $data WHERE id=$taskId using formats
     * 6. Should throw Exception 'Failed to change task completed status' if update fails (=== false)
     * 7. Should return updated task from TaskRepository->getTaskById($taskId)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     */
    public function test_changeTaskDoneStatus_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for updateTaskFocusColor
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should update TABLE_WP_QUICKTASKER_TASKS: task_focus_color=$color, updated_at=UTC WHERE id=$taskId
     * 2. Should throw Exception 'Failed to update task focus color' if update fails (=== false)
     * 3. Should return updated task from TaskRepository->getTaskById($taskId)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     */
    public function test_updateTaskFocusColor_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }
}
