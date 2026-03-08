<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

require_once __DIR__ . '/../../../../php/services/SettingsValidationService.php';

class SettingsValidationServiceTest extends TestCase {

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_isAllowedToMarkTaskDone_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsValidationService::class, 'isAllowedToMarkTaskDone'));
        
        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsValidationService::class, 'isAllowedToMarkTaskDone');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('taskId', $params[0]->getName());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for isAllowedToMarkTaskDone
     * 
     * This test requires ServiceLocator with TaskRepository, SettingRepository, and StageRepository.
     * 
     * Test scenarios:
     * 1. Should get task by ID using TaskRepository->getTaskById($taskId)
     * 2. Should get pipeline settings using SettingRepository->getPipelineSettings($task->pipeline_id)
     * 3. Should get task stage using StageRepository->getStageById($task->stage_id)
     * 4. Should check if pipelineSettings->allow_only_last_stage_task_done == '1' (string comparison)
     * 
     * When allow_only_last_stage_task_done == '1':
     * 5. Should get last stage order using StageRepository->getLastStageOrder($task->pipeline_id)
     * 6. Should compare taskStage->stage_order with lastStageOrder
     * 7. Should return true if stage_order matches lastStageOrder (task is in last stage)
     * 8. Should return false if stage_order does not match lastStageOrder (task is not in last stage)
     * 
     * When allow_only_last_stage_task_done != '1':
     * 9. Should return true immediately (no stage order check)
     * 10. Task can be marked done in any stage
     * 
     * Business logic:
     * - Pipeline setting controls whether only last-stage tasks can be marked done
     * - If restriction enabled, only tasks in the final stage can be marked complete
     * - If restriction disabled, any task can be marked done regardless of stage
     * 
     * Dependencies:
     * - ServiceLocator::get("TaskRepository")->getTaskById($taskId)
     * - ServiceLocator::get("SettingRepository")->getPipelineSettings($pipeline_id)
     * - ServiceLocator::get("StageRepository")->getStageById($stage_id)
     * - ServiceLocator::get("StageRepository")->getLastStageOrder($pipeline_id)
     */
    public function test_isAllowedToMarkTaskDone_integration() {
        $this->markTestIncomplete('Requires ServiceLocator with TaskRepository, SettingRepository, and StageRepository');
    }
}
