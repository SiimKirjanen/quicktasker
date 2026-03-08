<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_TASKS_LOCATION', 'wp_quicktasker_tasks_location');
}
if (!defined('TABLE_WP_QUICKTASKER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', 'wp_quicktasker_pipelines');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_TASK')) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', 'wp_quicktasker_user_task');
}
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}

// Define user type constants
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE', 'admin_fe');
}

// Mock WordPress function wp_parse_args
if (!function_exists('wp_parse_args')) {
    function wp_parse_args($args, $defaults = array()) {
        if (is_array($args)) {
            return array_merge($defaults, $args);
        }
        return $defaults;
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/TaskRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Task\TaskRepository;
use WPQT\Services\ServiceLocator;

class TaskRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'get_results', 'esc_like'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new TaskRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getTasks_returns_all_tasks_when_no_filters()
    {
        $expectedTasks = [
            (object)[
                'id' => 1,
                'name' => 'Task 1',
                'task_order' => 1,
                'stage_id' => 10,
                'pipeline_name' => 'Pipeline 1'
            ],
            (object)[
                'id' => 2,
                'name' => 'Task 2',
                'task_order' => 2,
                'stage_id' => 11,
                'pipeline_name' => 'Pipeline 2'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasks();

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasks_filters_by_archived_status()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Active Task', 'is_archived' => 0]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasks(['is_archived' => 0]);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasks_filters_by_pipeline_id()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1', 'pipeline_id' => 5]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasks(['pipeline_id' => 5]);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTaskById_returns_task_without_users()
    {
        $taskId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedTask = (object)[
            'id' => 42,
            'name' => 'Test Task',
            'task_order' => 1,
            'stage_id' => 10
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedTask);

        $result = $this->repository->getTaskById($taskId);

        $this->assertSame($expectedTask, $result);
    }

    public function test_getTaskById_returns_null_when_not_found()
    {
        $taskId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getTaskById($taskId);

        $this->assertNull($result);
    }

    public function test_getTaskById_includes_assigned_users_when_requested()
    {
        $taskId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedTask = (object)[
            'id' => 42,
            'name' => 'Test Task'
        ];
        $expectedUsers = [
            (object)['id' => 1, 'name' => 'User 1']
        ];

        $userRepositoryMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedUsersByTaskId'])
            ->getMock();
        $userRepositoryMock->expects($this->once())
            ->method('getAssignedUsersByTaskId')
            ->with($taskId)
            ->willReturn($expectedUsers);

        ServiceLocator::register('UserRepository', $userRepositoryMock);

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedTask);

        $result = $this->repository->getTaskById($taskId, true);

        $this->assertEquals($expectedUsers, $result->assigned_users);
    }

    public function test_getTaskByHash_returns_task_with_pipeline_name()
    {
        $hash = 'abc123hash';
        $preparedSql = "PREPARED_SQL";
        $expectedTask = (object)[
            'id' => 10,
            'name' => 'Hashed Task',
            'task_hash' => 'abc123hash',
            'task_order' => 1,
            'stage_id' => 5,
            'pipeline_name' => 'My Pipeline'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedTask);

        $result = $this->repository->getTaskByHash($hash);

        $this->assertSame($expectedTask, $result);
    }

    public function test_getTaskByHash_returns_null_when_not_found()
    {
        $hash = 'invalidhash';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getTaskByHash($hash);

        $this->assertNull($result);
    }

    public function test_getTasksByStageId_returns_tasks_ordered_by_task_order()
    {
        $stageId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1', 'task_order' => 1, 'stage_id' => 5],
            (object)['id' => 2, 'name' => 'Task 2', 'task_order' => 2, 'stage_id' => 5]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksByStageId($stageId);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTaskOrder_returns_task_location()
    {
        $taskId = 10;
        $stageId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedOrder = (object)[
            'task_id' => 10,
            'stage_id' => 5,
            'task_order' => 3
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedOrder);

        $result = $this->repository->getTaskOrder($taskId, $stageId);

        $this->assertSame($expectedOrder, $result);
    }

    public function test_getTasksByStageIds_returns_empty_array_for_empty_input()
    {
        $this->wpdbMock->expects($this->never())
            ->method('prepare');

        $result = $this->repository->getTasksByStageIds([]);

        $this->assertSame([], $result);
    }

    public function test_getTasksByStageIds_returns_tasks_for_multiple_stages()
    {
        $stageIds = [1, 2, 3];
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1', 'stage_id' => 1],
            (object)['id' => 2, 'name' => 'Task 2', 'stage_id' => 2],
            (object)['id' => 3, 'name' => 'Task 3', 'stage_id' => 3]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksByStageIds($stageIds);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getOrphanedArchivedTasks_returns_tasks_without_pipeline()
    {
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Orphaned Task', 'is_archived' => 1, 'pipeline_name' => null]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedTasks);

        $result = $this->repository->getOrphanedArchivedTasks();

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasksAssignedToUser_returns_user_tasks()
    {
        $userId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'User Task 1', 'pipeline_name' => 'Pipeline 1'],
            (object)['id' => 2, 'name' => 'User Task 2', 'pipeline_name' => 'Pipeline 2']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksAssignedToUser($userId);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasksAssignableToUser_returns_free_for_all_tasks()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Free Task', 'free_for_all' => 1]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksAssignableToUser();

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getArchivedTasks_returns_archived_tasks_without_users()
    {
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Archived Task', 'is_archived' => 1]
        ];

        // When no filters, get_results is called directly without prepare
        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedTasks);

        $result = $this->repository->getArchivedTasks();

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getArchivedTasks_with_search_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Archived Task with keyword']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('esc_like')
            ->with('keyword')
            ->willReturn('keyword');

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getArchivedTasks(false, false, ['search' => 'keyword']);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getArchivedTasks_with_limit()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getArchivedTasks(false, false, ['limit' => 10]);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getArchivedTasks_includes_assigned_users_when_requested()
    {
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1']
        ];
        $expectedUsers = [(object)['id' => 1, 'name' => 'User 1', 'task_id' => 1]];
        $expectedWPUsers = [];

        $userRepositoryMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedUsersByTaskIds', 'getAssignedWPUsersByTaskIds'])
            ->getMock();
        $userRepositoryMock->expects($this->once())
            ->method('getAssignedUsersByTaskIds')
            ->willReturn($expectedUsers);
        $userRepositoryMock->expects($this->once())
            ->method('getAssignedWPUsersByTaskIds')
            ->willReturn($expectedWPUsers);

        ServiceLocator::register('UserRepository', $userRepositoryMock);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedTasks);

        $result = $this->repository->getArchivedTasks(true);

        $this->assertIsArray($result[0]->assigned_users);
        $this->assertIsArray($result[0]->assigned_wp_users);
    }

    public function test_getTasksForExport_without_filters()
    {
        $expectedTasks = [];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksForExport(null, '', false);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasksForExport_with_pipeline_filter()
    {
        $preparedSql = "PREPARED_SQL";
        // Return empty tasks so it doesn't try to access ServiceLocator
        $expectedTasks = [];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksForExport(5, '', false);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasksForExport_with_search_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [];

        $this->wpdbMock->expects($this->once())
            ->method('esc_like')
            ->with('search')
            ->willReturn('search');

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksForExport(null, 'search', false);

        $this->assertSame($expectedTasks, $result);
    }

    public function test_getTasksForExport_includes_related_data()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedTasks = [
            (object)['id' => 1, 'name' => 'Task 1']
        ];

        $userRepositoryMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedUsersByTaskIds', 'getAssignedWPUsersByTaskIds'])
            ->getMock();
        $userRepositoryMock->expects($this->once())
            ->method('getAssignedUsersByTaskIds')
            ->willReturn([]);
        $userRepositoryMock->expects($this->once())
            ->method('getAssignedWPUsersByTaskIds')
            ->willReturn([]);

        $labelRepositoryMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedLabelsByTaskIds'])
            ->getMock();
        $labelRepositoryMock->expects($this->once())
            ->method('getAssignedLabelsByTaskIds')
            ->willReturn([]);

        $customFieldRepositoryMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getActiveCustomFieldsForTasks'])
            ->getMock();
        $customFieldRepositoryMock->expects($this->once())
            ->method('getActiveCustomFieldsForTasks')
            ->willReturn([]);

        ServiceLocator::register('UserRepository', $userRepositoryMock);
        ServiceLocator::register('LabelRepository', $labelRepositoryMock);
        ServiceLocator::register('CustomFieldRepository', $customFieldRepositoryMock);

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTasks);

        $result = $this->repository->getTasksForExport(5, '', false);

        $this->assertIsArray($result[0]->assigned_users);
        $this->assertIsArray($result[0]->assigned_wp_users);
        $this->assertIsArray($result[0]->assigned_labels);
        $this->assertIsArray($result[0]->custom_fields);
    }
}
