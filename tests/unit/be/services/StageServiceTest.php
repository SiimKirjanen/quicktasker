<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required table constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}
if (!defined('TABLE_WP_QUICKTASKER_STAGES_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_STAGES_LOCATION', 'wp_quicktasker_stages_location');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_TASKS_LOCATION', 'wp_quicktasker_tasks_location');
}

require_once __DIR__ . '/../../../../php/services/StageService.php';

class StageServiceTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_TABLE_WP_QUICKTASKER_PIPELINE_STAGES_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_PIPELINE_STAGES);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_PIPELINE_STAGES);
    }

    public function test_TABLE_WP_QUICKTASKER_STAGES_LOCATION_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_STAGES_LOCATION'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_STAGES_LOCATION);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_STAGES_LOCATION);
    }

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

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_createStage_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'createStage'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'createStage');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_editStage_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'editStage'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'editStage');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_moveStage_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'moveStage'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'moveStage');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_deleteStage_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'deleteStage'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'deleteStage');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
    }

    public function test_deleteStagesByPipelineId_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'deleteStagesByPipelineId'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'deleteStagesByPipelineId');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    public function test_archiveStageTasks_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'archiveStageTasks'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'archiveStageTasks');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('stageId', $params[0]->getName());
    }

    public function test_addStageLocation_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'addStageLocation'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'addStageLocation');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(3, $reflection->getNumberOfParameters());
    }

    public function test_updateStageOrder_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Stage\StageService::class, 'updateStageOrder'));
        
        $reflection = new ReflectionMethod(\WPQT\Stage\StageService::class, 'updateStageOrder');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(4, $reflection->getNumberOfParameters());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for createStage
     * 
     * Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should use wp_parse_args() with defaults: name=null, description=null
     * 2. Should throw Exception 'Required fields are missing' if name is empty
     * 3. Should insert into TABLE_WP_QUICKTASKER_PIPELINE_STAGES with pipeline_id, name, description, created_at, updated_at
     * 4. Should throw Exception 'Failed to create a stage' if insert fails (=== false)
     * 5. Should get insert_id after successful insert
     * 6. Should call StageRepository->getNextStageOrder($pipelineId) to get new stage order
     * 7. Should call private addStageLocation($pipelineId, $stageId, $stageOrder)
     * 8. Should return stage from StageRepository->getStageById($stageId)
     * 
     * Dependencies:
     * - global $wpdb with insert(), insert_id
     * - wp_parse_args()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("StageRepository")->getNextStageOrder($pipelineId)
     * - ServiceLocator::get("StageRepository")->getStageById($stageId)
     * - $this->addStageLocation()
     */
    public function test_createStage_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, wp_parse_args(), and ServiceLocator');
    }

    /**
     * Integration test for editStage
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should check if 'name' key exists in $args using array_key_exists()
     * 2. Should check if 'description' key exists in $args
     * 3. Should throw Exception 'Required fields are missing' if either key is missing
     * 4. Should update TABLE_WP_QUICKTASKER_PIPELINE_STAGES with name, description, updated_at
     * 5. Should update WHERE id = $stageId
     * 6. Should throw Exception 'Failed to update the stage' if update fails (=== false)
     * 7. Should return updated stage from StageRepository->getStageById($stageId)
     * 
     * Note: Uses array_key_exists() which allows null values, different from empty() check
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("StageRepository")->getStageById($stageId)
     */
    public function test_editStage_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for moveStage
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should check if 'direction' key exists in $args using array_key_exists()
     * 2. Should throw Exception 'Required fields are missing' if direction missing
     * 3. Should get stage from StageRepository->getStageById($stageId)
     * 4. Should get all pipeline stages from StageRepository->getStagesByPipelineId()
     * 5. Should throw Exception 'Stage not found' if stage is null
     * 6. Should throw Exception 'Stage is already at the beginning' if direction='left' and currentOrder <= 0
     * 7. Should throw Exception 'Stage is already at the end' if direction='right' and currentOrder === count($stages) - 1
     * 8. Should calculate newOrder: currentOrder + (direction === 'left' ? -1 : 1)
     * 9. Should call private updateStageOrder($stageId, $pipeline_id, $newOrder, $currentOrder)
     * 10. Should return updated stage from StageRepository->getStageById($stageId)
     * 
     * Direction logic:
     * - 'left' moves stage backward (order decreases by 1)
     * - 'right' moves stage forward (order increases by 1)
     * - Validation prevents moving beyond boundaries
     * 
     * Dependencies:
     * - ServiceLocator::get("StageRepository")->getStageById($stageId)
     * - ServiceLocator::get("StageRepository")->getStagesByPipelineId($pipeline_id)
     * - $this->updateStageOrder()
     */
    public function test_moveStage_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }

    /**
     * Integration test for deleteStage
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get tasks by stage ID from TaskRepository->getTasksByStageId($stageId)
     * 2. Should throw StageHasTasksException 'Stage has tasks. Please delete/relocate the tasks first.' if count > 0
     * 3. Should get stage before deletion from StageRepository->getStageById($stageId)
     * 4. Should delete from TABLE_WP_QUICKTASKER_PIPELINE_STAGES WHERE id = $stageId
     * 5. Should throw Exception 'Failed to delete the stage.' if first delete fails
     * 6. Should delete from TABLE_WP_QUICKTASKER_STAGES_LOCATION WHERE stage_id = $stageId
     * 7. Should throw Exception 'Failed to delete the stage.' if second delete fails
     * 8. Should return deleted stage object
     * 
     * Note: Uses custom StageHasTasksException for business logic validation
     * 
     * Dependencies:
     * - global $wpdb with delete()
     * - ServiceLocator::get("TaskRepository")->getTasksByStageId($stageId)
     * - ServiceLocator::get("StageRepository")->getStageById($stageId)
     * - StageHasTasksException
     */
    public function test_deleteStage_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, and StageHasTasksException');
    }

    /**
     * Integration test for deleteStagesByPipelineId
     * 
     * Requires WordPress environment with $wpdb.
     * 
     * Test scenarios:
     * 1. Should delete from TABLE_WP_QUICKTASKER_PIPELINE_STAGES WHERE pipeline_id = $pipelineId
     * 2. Should throw Exception 'Failed to delete board stages' if first delete fails
     * 3. Should delete from TABLE_WP_QUICKTASKER_STAGES_LOCATION WHERE pipeline_id = $pipelineId
     * 4. Should throw Exception 'Failed to delete board stages location' if second delete fails
     * 5. Should return true on success
     * 
     * Note: Exception messages use "board" instead of "pipeline" (inconsistent terminology)
     * 
     * Dependencies:
     * - global $wpdb with delete()
     */
    public function test_deleteStagesByPipelineId_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb');
    }

    /**
     * Integration test for archiveStageTasks
     * 
     * Requires WordPress environment with $wpdb and ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should get current UTC time from TimeRepository
     * 2. Should get tasks to archive from TaskRepository->getTasksByStageId($stageId)
     * 3. Should execute UPDATE with INNER JOIN to set is_archived=1 on tasks table
     * 4. JOIN: TABLE_WP_QUICKTASKER_TASKS AS a INNER JOIN TABLE_WP_QUICKTASKER_TASKS_LOCATION AS b ON a.id = b.task_id
     * 5. SET: a.is_archived=1, a.updated_at=current_time WHERE b.stage_id=$stageId
     * 6. Should throw Exception 'Failed to archive tasks' if query fails
     * 7. Should update TABLE_WP_QUICKTASKER_TASKS_LOCATION set is_archived=1, updated_at=current_time WHERE stage_id=$stageId
     * 8. Update uses format arrays: data format (%d, %s), where format (%d)
     * 9. Should throw Exception 'Failed to archive task locations' if update fails
     * 10. Should return array of tasks that were archived
     * 
     * Note: Variable typo - $tasksToArvhive should be $tasksToArchive
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare(), update()
     * - ServiceLocator::get("TimeRepository")->getCurrentUTCTime()
     * - ServiceLocator::get("TaskRepository")->getTasksByStageId($stageId)
     */
    public function test_archiveStageTasks_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb and ServiceLocator');
    }
}
