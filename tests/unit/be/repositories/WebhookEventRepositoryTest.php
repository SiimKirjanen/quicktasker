<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define webhook constants used in the repository
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK', 'task');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED', 'assigned');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED', 'created');
}

require_once __DIR__ . '/../../../../php/repositories/WebhookEventRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Webhooks\WebhookEventRepository;

class WebhookEventRepositoryTest extends TestCase
{
    private $repository;

    protected function setUp(): void
    {
        $this->repository = new WebhookEventRepository();
    }

    public function test_constructTaskAssignedWebhookEvent_returns_correct_structure()
    {
        // Create mock objects
        $task = (object)[
            'id' => 123,
            'title' => 'Test Task',
            'description' => 'Task description',
            'stage_id' => 1
        ];

        $user = (object)[
            'id' => 456,
            'name' => 'John Doe',
            'user_type' => 'internal'
        ];

        $executionResult = (object)[
            'task' => $task,
            'user' => $user
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskAssignedWebhookEvent($automation);

        // Assert structure
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('webhookData', $result);

        // Assert data content
        $this->assertArrayHasKey('relatedObject', $result['data']);
        $this->assertArrayHasKey('extraData', $result['data']);
        $this->assertSame($task, $result['data']['relatedObject']);

        // Assert extraData
        $this->assertArrayHasKey('assigned_user_id', $result['data']['extraData']);
        $this->assertArrayHasKey('assigned_user_name', $result['data']['extraData']);
        $this->assertArrayHasKey('assigned_user_type', $result['data']['extraData']);
        $this->assertSame(456, $result['data']['extraData']['assigned_user_id']);
        $this->assertSame('John Doe', $result['data']['extraData']['assigned_user_name']);
        $this->assertSame('internal', $result['data']['extraData']['assigned_user_type']);

        // Assert webhookData
        $this->assertArrayHasKey('target_type', $result['webhookData']);
        $this->assertArrayHasKey('target_action', $result['webhookData']);
        $this->assertSame(WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK, $result['webhookData']['target_type']);
        $this->assertSame(WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED, $result['webhookData']['target_action']);
    }

    public function test_constructTaskAssignedWebhookEvent_with_different_user_data()
    {
        $task = (object)[
            'id' => 999,
            'title' => 'Another Task'
        ];

        $user = (object)[
            'id' => 777,
            'name' => 'Jane Smith',
            'user_type' => 'external'
        ];

        $executionResult = (object)[
            'task' => $task,
            'user' => $user
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskAssignedWebhookEvent($automation);

        // Verify user-specific data
        $this->assertSame(777, $result['data']['extraData']['assigned_user_id']);
        $this->assertSame('Jane Smith', $result['data']['extraData']['assigned_user_name']);
        $this->assertSame('external', $result['data']['extraData']['assigned_user_type']);
        $this->assertSame($task, $result['data']['relatedObject']);
    }

    public function test_constructTaskAssignedWebhookEvent_with_numeric_user_id()
    {
        $task = (object)['id' => 1];

        $user = (object)[
            'id' => 0,
            'name' => 'System User',
            'user_type' => 'system'
        ];

        $executionResult = (object)[
            'task' => $task,
            'user' => $user
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskAssignedWebhookEvent($automation);

        $this->assertSame(0, $result['data']['extraData']['assigned_user_id']);
    }

    public function test_constructTaskCreatedWebhookEvent_returns_correct_structure()
    {
        $task = (object)[
            'id' => 123,
            'title' => 'New Task',
            'description' => 'Task description',
            'stage_id' => 2,
            'created_at' => '2024-01-01 12:00:00'
        ];

        $executionResult = (object)[
            'task' => $task
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskCreatedWebhookEvent($automation);

        // Assert structure
        $this->assertIsArray($result);
        $this->assertArrayHasKey('data', $result);
        $this->assertArrayHasKey('webhookData', $result);

        // Assert data content
        $this->assertArrayHasKey('relatedObject', $result['data']);
        $this->assertSame($task, $result['data']['relatedObject']);

        // Assert no extraData key for created event
        $this->assertArrayNotHasKey('extraData', $result['data']);

        // Assert webhookData
        $this->assertArrayHasKey('target_type', $result['webhookData']);
        $this->assertArrayHasKey('target_action', $result['webhookData']);
        $this->assertSame(WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK, $result['webhookData']['target_type']);
        $this->assertSame(WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED, $result['webhookData']['target_action']);
    }

    public function test_constructTaskCreatedWebhookEvent_with_different_task()
    {
        $task = (object)[
            'id' => 999,
            'title' => 'Different Task',
            'description' => 'Another description',
            'priority' => 'high'
        ];

        $executionResult = (object)[
            'task' => $task
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskCreatedWebhookEvent($automation);

        $this->assertSame($task, $result['data']['relatedObject']);
        $this->assertSame('task', $result['webhookData']['target_type']);
        $this->assertSame('created', $result['webhookData']['target_action']);
    }

    public function test_constructTaskCreatedWebhookEvent_with_minimal_task_data()
    {
        $task = (object)[
            'id' => 1
        ];

        $executionResult = (object)[
            'task' => $task
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskCreatedWebhookEvent($automation);

        $this->assertSame($task, $result['data']['relatedObject']);
        $this->assertSame(1, $result['data']['relatedObject']->id);
    }

    public function test_constructTaskAssignedWebhookEvent_preserves_all_task_properties()
    {
        $task = (object)[
            'id' => 100,
            'title' => 'Complex Task',
            'description' => 'Detailed description',
            'stage_id' => 5,
            'priority' => 'high',
            'due_date' => '2024-12-31',
            'custom_field' => 'custom_value'
        ];

        $user = (object)[
            'id' => 50,
            'name' => 'Test User',
            'user_type' => 'member'
        ];

        $executionResult = (object)[
            'task' => $task,
            'user' => $user
        ];

        $automation = (object)[
            'executionResult' => $executionResult
        ];

        $result = $this->repository->constructTaskAssignedWebhookEvent($automation);

        // Verify all task properties are preserved
        $returnedTask = $result['data']['relatedObject'];
        $this->assertSame(100, $returnedTask->id);
        $this->assertSame('Complex Task', $returnedTask->title);
        $this->assertSame('Detailed description', $returnedTask->description);
        $this->assertSame(5, $returnedTask->stage_id);
        $this->assertSame('high', $returnedTask->priority);
        $this->assertSame('2024-12-31', $returnedTask->due_date);
        $this->assertSame('custom_value', $returnedTask->custom_field);
    }
}
