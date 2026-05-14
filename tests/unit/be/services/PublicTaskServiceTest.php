<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_TASKS_LOCATION', 'wp_quicktasker_tasks_location');
}
if (!defined('TABLE_WP_QUICKTASKER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', 'wp_quicktasker_pipelines');
}
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/PublicTaskService.php';

class PublicTaskServiceTest extends TestCase
{
    public function test_TABLE_WP_QUICKTASKER_TASKS_is_defined()
    {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_TASKS'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_TASKS);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_TASKS);
    }

    public function test_class_can_be_loaded()
    {
        $this->assertTrue(class_exists(\WPQT\PublicTask\PublicTaskService::class));
    }

    public function test_ensureCanCreatePublicTask_method_exists()
    {
        $this->assertTrue(method_exists(\WPQT\PublicTask\PublicTaskService::class, 'ensureCanCreatePublicTask'));

        $reflection = new ReflectionMethod(\WPQT\PublicTask\PublicTaskService::class, 'ensureCanCreatePublicTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());

        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    public function test_createPublicTask_method_exists()
    {
        $this->assertTrue(method_exists(\WPQT\PublicTask\PublicTaskService::class, 'createPublicTask'));

        $reflection = new ReflectionMethod(\WPQT\PublicTask\PublicTaskService::class, 'createPublicTask');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());

        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('args', $params[1]->getName());
    }

    public function test_getSubmissionStatus_method_exists()
    {
        $this->assertTrue(method_exists(\WPQT\PublicTask\PublicTaskService::class, 'getSubmissionStatus'));

        $reflection = new ReflectionMethod(\WPQT\PublicTask\PublicTaskService::class, 'getSubmissionStatus');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());

        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    public function test_getPublicTaskStatus_method_exists()
    {
        $this->assertTrue(method_exists(\WPQT\PublicTask\PublicTaskService::class, 'getPublicTaskStatus'));

        $reflection = new ReflectionMethod(\WPQT\PublicTask\PublicTaskService::class, 'getPublicTaskStatus');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());

        $params = $reflection->getParameters();
        $this->assertEquals('taskHash', $params[0]->getName());
    }

    /**
     * INTEGRATION TEST REQUIRED: ensureCanCreatePublicTask()
     *
     * Throws WPQTException ("Invalid board") when $pipelineId <= 0.
     * Throws WPQTException ("Public task submissions are disabled for this board")
     *   when SettingRepository->getPublicTaskCreationSettings returns null or
     *   allow_public_task_creation is falsy.
     * Throws WPQTException ("Submission limit reached for this board")
     *   when public_task_creation_limit > 0 AND public_task_creation_count >= limit.
     * Returns void (no return) when submissions are enabled and limit not reached
     *   (or limit is 0 = unlimited).
     *
     * Dependencies:
     * - ServiceLocator::get('SettingRepository')->getPublicTaskCreationSettings()
     */
    public function test_ensureCanCreatePublicTask_requires_integration_test()
    {
        $this->markTestIncomplete(
            'ensureCanCreatePublicTask() requires ServiceLocator + SettingRepository mocks. ' .
            'Scenarios: invalid id, settings null, allow flag off, limit reached, allowed.'
        );
    }

    /**
     * INTEGRATION TEST REQUIRED: createPublicTask()
     *
     * - Looks up first stage via StageRepository->getFirstStage($pipelineId).
     * - Calls TaskService->createTask($stageId, [name, description, pipelineId,
     *   is_public_submission=1]).
     * - Calls SettingRepository->incrementPublicTaskCount($pipelineId).
     * - Trims name; description is optional (null when absent).
     * - Returns the created task object.
     *
     * Dependencies:
     * - ServiceLocator::get('StageRepository')->getFirstStage()
     * - ServiceLocator::get('TaskService')->createTask()
     * - ServiceLocator::get('SettingRepository')->incrementPublicTaskCount()
     */
    public function test_createPublicTask_requires_integration_test()
    {
        $this->markTestIncomplete(
            'createPublicTask() requires ServiceLocator mocks for StageRepository, ' .
            'TaskService, and SettingRepository. Verify: first-stage lookup, ' .
            'is_public_submission=1 passed to createTask, counter incremented, ' .
            'name trimmed, description defaults to null.'
        );
    }

    /**
     * INTEGRATION TEST REQUIRED: getSubmissionStatus()
     *
     * Returns object with `enabled` (bool) and `limit_reached` (bool).
     * - enabled = settings exist AND allow_public_task_creation is truthy.
     * - limit_reached = enabled AND limit > 0 AND count >= limit.
     * Throws WPQTException ("Invalid board") when $pipelineId <= 0.
     *
     * Dependencies:
     * - ServiceLocator::get('SettingRepository')->getPublicTaskCreationSettings()
     */
    public function test_getSubmissionStatus_requires_integration_test()
    {
        $this->markTestIncomplete(
            'getSubmissionStatus() requires ServiceLocator + SettingRepository mocks. ' .
            'Scenarios: invalid id throws, null settings → enabled=false, ' .
            'allow on + count<limit → enabled=true/limit_reached=false, ' .
            'allow on + count>=limit → both true, limit=0 → never limit_reached.'
        );
    }

    /**
     * INTEGRATION TEST REQUIRED: getPublicTaskStatus()
     *
     * - Delegates to TaskRepository->getPublicTaskByHash($taskHash).
     * - Throws WPQTException ("Task not found") if repo returns null.
     * - Returns object: {name, description, is_done (bool), stage_name,
     *   pipeline_name, created_at}.
     *
     * Dependencies:
     * - ServiceLocator::get('TaskRepository')->getPublicTaskByHash()
     */
    public function test_getPublicTaskStatus_requires_integration_test()
    {
        $this->markTestIncomplete(
            'getPublicTaskStatus() requires ServiceLocator + TaskRepository mocks. ' .
            'Scenarios: hash not found → throws, found public task → returns ' .
            'shaped object with is_done cast to bool.'
        );
    }
}
