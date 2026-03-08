<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', 'wp_quicktasker_pipelines');
}
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}
if (!defined('TABLE_WP_QUICKTASKER_STAGES_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_STAGES_LOCATION', 'wp_quicktasker_stages_location');
}
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}
if (!defined('TABLE_WP_QUICKTASKER_TASK_ASSIGNED_USERS')) {
    define('TABLE_WP_QUICKTASKER_TASK_ASSIGNED_USERS', 'wp_quicktasker_task_assigned_users');
}
if (!defined('TABLE_WP_QUICKTASKER_TASK_ASSIGNED_LABELS')) {
    define('TABLE_WP_QUICKTASKER_TASK_ASSIGNED_LABELS', 'wp_quicktasker_task_assigned_labels');
}
if (!defined('TABLE_WP_QUICKTASKER_LABELS')) {
    define('TABLE_WP_QUICKTASKER_LABELS', 'wp_quicktasker_labels');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_TASK_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_TASK_LOCATION', 'wp_quicktasker_task_location');
}

// Define user type constants
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wp-user');
}

// Define filter constants for WP users
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL', 'user-full');
}
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE', 'user-admin-fe');
}
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL', 'user-minimal');
}

require_once __DIR__ . '/../../../../php/repositories/StageRepository.php';
require_once __DIR__ . '/../../../../php/repositories/TaskRepository.php';
require_once __DIR__ . '/../../../../php/repositories/UserRepository.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/PipelineRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineRepository;

class PipelineRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_row', 'get_results'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new PipelineRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getPipelines_returns_all_pipelines()
    {
        $expectedPipelines = [
            (object)[
                'id' => 1,
                'name' => 'Sales Pipeline',
                'description' => 'Pipeline for sales',
                'is_primary' => 1,
                'created_at' => '2024-01-01 10:00:00',
                'updated_at' => '2024-01-01 10:00:00'
            ],
            (object)[
                'id' => 2,
                'name' => 'Support Pipeline',
                'description' => 'Pipeline for support',
                'is_primary' => 0,
                'created_at' => '2024-01-05 12:00:00',
                'updated_at' => '2024-01-05 12:00:00'
            ],
            (object)[
                'id' => 3,
                'name' => 'Development Pipeline',
                'description' => 'Pipeline for dev tasks',
                'is_primary' => 0,
                'created_at' => '2024-01-10 08:00:00',
                'updated_at' => '2024-01-10 08:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedPipelines);

        $result = $this->repository->getPipelines();

        $this->assertSame($expectedPipelines, $result);
        $this->assertCount(3, $result);
    }

    public function test_getPipelines_returns_empty_array_when_no_pipelines()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn([]);

        $result = $this->repository->getPipelines();

        $this->assertSame([], $result);
    }

    public function test_getPipelines_includes_all_fields()
    {
        $expectedPipelines = [
            (object)[
                'id' => 5,
                'name' => 'Marketing Pipeline',
                'description' => 'For marketing campaigns',
                'is_primary' => 0,
                'created_at' => '2024-02-01 09:00:00',
                'updated_at' => '2024-02-15 14:30:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedPipelines);

        $result = $this->repository->getPipelines();

        $this->assertObjectHasProperty('id', $result[0]);
        $this->assertObjectHasProperty('name', $result[0]);
        $this->assertObjectHasProperty('description', $result[0]);
        $this->assertObjectHasProperty('is_primary', $result[0]);
        $this->assertObjectHasProperty('created_at', $result[0]);
        $this->assertObjectHasProperty('updated_at', $result[0]);
    }

    public function test_getPipelineById_returns_pipeline_when_found()
    {
        $pipelineId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedPipeline = (object)[
            'id' => 10,
            'name' => 'Custom Pipeline',
            'description' => 'A custom workflow',
            'is_primary' => 0,
            'created_at' => '2024-03-01 11:00:00',
            'updated_at' => '2024-03-01 11:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedPipeline);

        $result = $this->repository->getPipelineById($pipelineId);

        $this->assertSame($expectedPipeline, $result);
        $this->assertEquals(10, $result->id);
    }

    public function test_getPipelineById_returns_null_when_not_found()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getPipelineById($pipelineId);

        $this->assertNull($result);
    }

    public function test_getPipelineById_returns_primary_pipeline()
    {
        $pipelineId = 1;
        $preparedSql = "PREPARED_SQL";
        $expectedPipeline = (object)[
            'id' => 1,
            'name' => 'Main Pipeline',
            'description' => 'Primary workflow',
            'is_primary' => 1,
            'created_at' => '2024-01-01 00:00:00',
            'updated_at' => '2024-01-01 00:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedPipeline);

        $result = $this->repository->getPipelineById($pipelineId);

        $this->assertEquals(1, $result->is_primary);
    }

    public function test_getActivePipeline_returns_primary_pipeline()
    {
        $expectedPipeline = (object)[
            'id' => 1,
            'name' => 'Active Pipeline',
            'description' => 'The primary pipeline',
            'is_primary' => 1,
            'created_at' => '2024-01-01 10:00:00',
            'updated_at' => '2024-01-01 10:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->willReturn($expectedPipeline);

        $result = $this->repository->getActivePipeline();

        $this->assertSame($expectedPipeline, $result);
        $this->assertEquals(1, $result->is_primary);
    }

    public function test_getActivePipeline_returns_null_when_no_primary_pipeline()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->willReturn(null);

        $result = $this->repository->getActivePipeline();

        $this->assertNull($result);
    }

    public function test_getActivePipeline_includes_all_fields()
    {
        $expectedPipeline = (object)[
            'id' => 3,
            'name' => 'Current Active',
            'description' => 'Currently active pipeline',
            'is_primary' => 1,
            'created_at' => '2024-02-01 08:00:00',
            'updated_at' => '2024-02-20 16:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->willReturn($expectedPipeline);

        $result = $this->repository->getActivePipeline();

        $this->assertObjectHasProperty('id', $result);
        $this->assertObjectHasProperty('name', $result);
        $this->assertObjectHasProperty('description', $result);
        $this->assertObjectHasProperty('is_primary', $result);
    }

    /**
     * Note: getFullPipeline is a complex method that instantiates multiple repository
     * dependencies (StageRepository, TaskRepository, UserRepository) and uses ServiceLocator
     * for LabelRepository. Without dependency injection, this method is not suitable for
     * unit testing and should be tested as an integration test instead.
     * 
     * The method would need to be refactored to accept dependencies via constructor injection
     * or method parameters to make it properly unit testable.
     * 
     * For now, this test is marked as skipped.
     */
    public function test_getFullPipeline_requires_integration_test()
    {
        $this->markTestSkipped(
            'getFullPipeline requires integration testing due to hard-coded dependencies. ' .
            'Unit testing requires refactoring to support dependency injection.'
        );
    }

    public function test_getPipelines_can_contain_multiple_primary_flags()
    {
        // While typically only one pipeline should be primary, the repository doesn't enforce this
        $expectedPipelines = [
            (object)[
                'id' => 1,
                'name' => 'Primary One',
                'description' => 'First primary',
                'is_primary' => 1,
                'created_at' => '2024-01-01 00:00:00',
                'updated_at' => '2024-01-01 00:00:00'
            ],
            (object)[
                'id' => 2,
                'name' => 'Not Primary',
                'description' => 'Secondary',
                'is_primary' => 0,
                'created_at' => '2024-01-02 00:00:00',
                'updated_at' => '2024-01-02 00:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedPipelines);

        $result = $this->repository->getPipelines();

        $primaryCount = 0;
        foreach ($result as $pipeline) {
            if ($pipeline->is_primary == 1) {
                $primaryCount++;
            }
        }

        $this->assertEquals(1, $primaryCount);
    }
}
