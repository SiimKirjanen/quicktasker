<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../../');
}

require_once __DIR__ . '/../../../../../php/services/export/ExportService.php';

class ExportServiceTest extends TestCase {

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_constructor_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Export\ExportService::class, '__construct'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\ExportService::class, '__construct');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(4, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('searchFilter', $params[1]->getName());
        $this->assertEquals('includeArchivedTasks', $params[2]->getName());
        $this->assertEquals('includePipelineCustomFields', $params[3]->getName());
    }

    public function test_init_method_is_private() {
        $this->assertTrue(method_exists(\WPQT\Export\ExportService::class, 'init'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\ExportService::class, 'init');
        $this->assertTrue($reflection->isPrivate());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    public function test_formatAssignedUsers_method_is_protected() {
        $this->assertTrue(method_exists(\WPQT\Export\ExportService::class, 'formatAssignedUsers'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\ExportService::class, 'formatAssignedUsers');
        $this->assertTrue($reflection->isProtected());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
    }

    public function test_formatAssignedLabels_method_is_protected() {
        $this->assertTrue(method_exists(\WPQT\Export\ExportService::class, 'formatAssignedLabels'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\ExportService::class, 'formatAssignedLabels');
        $this->assertTrue($reflection->isProtected());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for __construct and init
     * 
     * Requires WordPress environment with ServiceLocator and i18n functions.
     * 
     * Test scenarios:
     * 1. Constructor should set protected properties: _pipelineId, _searchFilter, _includeArchivedTasks, _includePipelineCustomFields
     * 2. Constructor should call private init() method
     * 3. init() should get pipeline from PipelineRepository->getPipelineById($this->_pipelineId)
     * 4. init() should get tasks from TaskRepository->getTasksForExport($pipelineId, $searchFilter, $includeArchivedTasks)
     * 5. init() should get stages from StageRepository->getStagesByPipelineId($pipelineId)
     * 6. init() should get labels from LabelRepository->getPipelineLabels($pipelineId)
     * 7. init() should get task comments from CommentRepository->getCommentsOfTasks($tasks)
     * 8. init() should set _tasks, _pipeline, _stages, _labels properties
     * 9. init() should transform _taskComments with array_map to format: commentId, taskId, createdAt, commentText, authorId, authorType, isPrivate (bool)
     * 10. If _taskComments is falsy, should set to empty array
     * 11. init() should set _fileName to lowercase pipeline name + '-tasks-export'
     * 
     * Dependencies:
     * - ServiceLocator::get('PipelineRepository')->getPipelineById()
     * - ServiceLocator::get('TaskRepository')->getTasksForExport()
     * - ServiceLocator::get('StageRepository')->getStagesByPipelineId()
     * - ServiceLocator::get('LabelRepository')->getPipelineLabels()
     * - ServiceLocator::get('CommentRepository')->getCommentsOfTasks()
     */
    public function test_constructor_and_init_integration() {
        $this->markTestIncomplete('Requires WordPress environment with ServiceLocator');
    }

    /**
     * Integration test for formatAssignedUsers (protected)
     * 
     * Requires WordPress i18n functions.
     * 
     * Test scenarios:
     * 1. Should return esc_html__('None', 'quicktasker') if users array is empty
     * 2. Should extract user names using array_map: "{$user->name}"
     * 3. Should join names with ', ' separator using implode
     * 4. Should return comma-separated string of user names
     * 
     * Dependencies:
     * - esc_html__()
     */
    public function test_formatAssignedUsers_integration() {
        $this->markTestIncomplete('Requires WordPress i18n functions');
    }

    /**
     * Integration test for formatAssignedLabels (protected)
     * 
     * Requires WordPress i18n functions.
     * 
     * Test scenarios:
     * 1. Should return esc_html__('None', 'quicktasker') if labels array is empty
     * 2. Should extract label names using array_map: $label->name
     * 3. Should join names with ', ' separator using implode
     * 4. Should return comma-separated string of label names
     * 
     * Dependencies:
     * - esc_html__()
     */
    public function test_formatAssignedLabels_integration() {
        $this->markTestIncomplete('Requires WordPress i18n functions');
    }
}
