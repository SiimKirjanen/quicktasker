<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required table constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', 'wp_quicktasker_pipelines');
}

require_once __DIR__ . '/../../../../php/services/PipelineService.php';

class PipelineServiceTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_TABLE_WP_QUICKTASKER_PIPELINES_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_PIPELINES'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_PIPELINES);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_PIPELINES);
    }

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_createPipeline_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Pipeline\PipelineService::class, 'createPipeline'));
        
        $reflection = new ReflectionMethod(\WPQT\Pipeline\PipelineService::class, 'createPipeline');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        // Check parameter names and defaults
        $params = $reflection->getParameters();
        $this->assertEquals('name', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
        $this->assertTrue($params[1]->isDefaultValueAvailable());
        $this->assertEquals([], $params[1]->getDefaultValue());
    }

    public function test_editPipeline_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Pipeline\PipelineService::class, 'editPipeline'));
        
        $reflection = new ReflectionMethod(\WPQT\Pipeline\PipelineService::class, 'editPipeline');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        // Check parameter names
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
        $this->assertFalse($params[1]->isDefaultValueAvailable());
    }

    public function test_markPipelineAsPrimary_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Pipeline\PipelineService::class, 'markPipelineAsPrimary'));
        
        $reflection = new ReflectionMethod(\WPQT\Pipeline\PipelineService::class, 'markPipelineAsPrimary');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter names
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    public function test_deletePipeline_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Pipeline\PipelineService::class, 'deletePipeline'));
        
        $reflection = new ReflectionMethod(\WPQT\Pipeline\PipelineService::class, 'deletePipeline');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter names
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for createPipeline
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should create pipeline with name and description
     * 2. Should set is_primary to true if no active pipeline exists
     * 3. Should set is_primary to false if active pipeline exists
     * 4. Should use wp_parse_args() to merge args with defaults
     * 5. Default args: description = null
     * 6. Should insert with created_at and updated_at (from TimeRepository)
     * 7. Should throw Exception 'Failed to create a board' if insert fails
     * 8. Should get insert_id after successful insert
     * 9. Should call SettingService->insertSettingsColumnForPipeline($pipelineId)
     * 10. Should return pipeline object from PipelineRepository->getPipelineById($pipelineId)
     * 11. Should check for active pipeline via PipelineRepository->getActivePipeline()
     * 
     * Dependencies:
     * - global $wpdb with insert(), insert_id property
     * - wp_parse_args()
     * - ServiceLocator::get('PipelineRepository')->getActivePipeline()
     * - ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId)
     * - ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
     * - ServiceLocator::get('SettingService')->insertSettingsColumnForPipeline($pipelineId)
     * - TABLE_WP_QUICKTASKER_PIPELINES constant
     * 
     * Database operations:
     * - INSERT into TABLE_WP_QUICKTASKER_PIPELINES with columns: name, description, is_primary, created_at, updated_at
     */
    public function test_createPipeline_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, wp_parse_args(), ServiceLocator, PipelineRepository, TimeRepository, and SettingService');
    }

    /**
     * Integration test for editPipeline
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should update pipeline with provided args
     * 2. Should use wp_parse_args() to merge args with defaults
     * 3. Default args: updated_at = current UTC time (from TimeRepository)
     * 4. Should update by pipeline id (WHERE id = $pipelineId)
     * 5. Should throw Exception 'Failed to edit pipeline' if update fails ($result === false)
     * 6. Should return updated pipeline object from PipelineRepository->getPipelineById($pipelineId)
     * 7. $wpdb->update() returns false on error, 0 if no rows updated (no change), >0 if rows updated
     * 8. Only checks if $result === false (strict comparison)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - wp_parse_args()
     * - ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
     * - ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId)
     * - TABLE_WP_QUICKTASKER_PIPELINES constant
     * 
     * Database operations:
     * - UPDATE TABLE_WP_QUICKTASKER_PIPELINES SET {args} WHERE id = $pipelineId
     */
    public function test_editPipeline_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, wp_parse_args(), ServiceLocator, TimeRepository, and PipelineRepository');
    }

    /**
     * Integration test for markPipelineAsPrimary
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should set is_primary = 1 for specified pipeline
     * 2. Should set is_primary = 0 for all other pipelines
     * 3. Should update updated_at for ALL pipelines to current UTC time
     * 4. Should use prepared statement with $wpdb->prepare()
     * 5. SQL uses CASE statement: WHEN id = %d THEN 1 ELSE 0 END
     * 6. Should throw Exception 'Failed to mark pipeline as primary' if query fails
     * 7. Should return updated pipeline object from PipelineRepository->getPipelineById($pipelineId)
     * 8. Updates ALL rows in pipelines table in single query
     * 
     * Dependencies:
     * - global $wpdb with query(), prepare()
     * - ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
     * - ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId)
     * - TABLE_WP_QUICKTASKER_PIPELINES constant
     * 
     * Database operations:
     * - UPDATE TABLE_WP_QUICKTASKER_PIPELINES SET is_primary = CASE WHEN id = %d THEN 1 ELSE 0 END, updated_at = %s
     */
    public function test_markPipelineAsPrimary_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, TimeRepository, and PipelineRepository');
    }

    /**
     * Integration test for deletePipeline
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should retrieve pipeline by ID first (throws Exception 'Board not found' if null)
     * 2. Should get all non-archived tasks for the pipeline (is_archived = 0)
     * 3. Should extract task IDs from tasks using array_map
     * 4. Should delete pipeline from TABLE_WP_QUICKTASKER_PIPELINES
     * 5. Should throw Exception 'Failed to delete the board' if delete fails
     * 6. Should call TaskService->deleteTasksByTaskIds($tasksToDelteIds) - Note: Typo "Delte"
     * 7. Should call CommentService->deleteTasksComments($tasksToDelteIds)
     * 8. If deleted pipeline was primary (is_primary = true):
     *    a. Should find first non-primary pipeline (WHERE is_primary = 0 ORDER BY id ASC LIMIT 1)
     *    b. Should mark that pipeline as primary (call markPipelineAsPrimary)
     *    c. Should set pipelineIdToLoad to new primary pipeline ID
     * 9. If deleted pipeline was NOT primary:
     *    a. Should get current active pipeline
     *    b. Should throw Exception 'Failed to get active board' if null
     *    c. Should set pipelineIdToLoad to current active pipeline ID
     * 10. Should return object with deletedPipeline and pipelineIdToLoad properties
     * 11. Variable name typo: $tasksToDelteIds (should be $tasksToDeleteIds)
     * 
     * Dependencies:
     * - global $wpdb with delete(), get_row()
     * - ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId)
     * - ServiceLocator::get('PipelineRepository')->getActivePipeline()
     * - ServiceLocator::get('TaskRepository')->getTasks(['pipeline_id' => $pipelineId, 'is_archived' => 0])
     * - ServiceLocator::get('TaskService')->deleteTasksByTaskIds($tasksToDelteIds)
     * - ServiceLocator::get('CommentService')->deleteTasksComments($tasksToDelteIds)
     * - $this->markPipelineAsPrimary($newActivePipeline->id)
     * - TABLE_WP_QUICKTASKER_PIPELINES constant
     * 
     * Database operations:
     * - DELETE from TABLE_WP_QUICKTASKER_PIPELINES WHERE id = $pipelineId
     * - SELECT * FROM TABLE_WP_QUICKTASKER_PIPELINES WHERE is_primary = 0 ORDER BY id ASC LIMIT 1
     * 
     * Code quality issues:
     * - Typo in variable name: $tasksToDelteIds (should be $tasksToDeleteIds)
     * - Exception messages mention "board" instead of "pipeline" (inconsistent terminology)
     */
    public function test_deletePipeline_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, PipelineRepository, TaskRepository, TaskService, and CommentService');
    }
}
