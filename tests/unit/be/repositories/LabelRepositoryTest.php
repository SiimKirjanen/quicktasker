<?php
// Define WordPress constant before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants before loading the repository
if (!defined('TABLE_WP_QUICKTASKER_LABELS')) {
    define('TABLE_WP_QUICKTASKER_LABELS', 'wp_quicktasker_labels');
}
if (!defined('TABLE_WP_QUICKTASKER_LABEL_RELATIONS')) {
    define('TABLE_WP_QUICKTASKER_LABEL_RELATIONS', 'wp_quicktasker_label_relations');
}

require_once __DIR__ . '/../../../../php/repositories/LabelRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Label\LabelRepository;

class LabelRepositoryTest extends TestCase
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

        $this->repository = new LabelRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getLabelById_returns_label_object_when_found()
    {
        $labelId = 42;
        $expectedSql = "SELECT id, pipeline_id, created_at, color, name FROM " . TABLE_WP_QUICKTASKER_LABELS . "
                WHERE id = %d";
        $preparedSql = "SELECT id, pipeline_id, created_at, color, name FROM wp_quicktasker_labels WHERE id = 42";

        $expectedLabel = (object)[
            'id' => 42,
            'pipeline_id' => 1,
            'created_at' => '2024-01-01 12:00:00',
            'color' => '#FF5733',
            'name' => 'Urgent'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $labelId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedLabel);

        $result = $this->repository->getLabelById($labelId);

        $this->assertSame($expectedLabel, $result);
    }

    public function test_getLabelById_returns_null_when_not_found()
    {
        $labelId = 999;
        $expectedSql = "SELECT id, pipeline_id, created_at, color, name FROM " . TABLE_WP_QUICKTASKER_LABELS . "
                WHERE id = %d";
        $preparedSql = "SELECT id, pipeline_id, created_at, color, name FROM wp_quicktasker_labels WHERE id = 999";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $labelId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getLabelById($labelId);

        $this->assertNull($result);
    }

    public function test_getAssignedLabelsByTaskIds_returns_empty_array_when_taskIds_empty()
    {
        $this->wpdbMock->expects($this->never())
            ->method('prepare');

        $this->wpdbMock->expects($this->never())
            ->method('get_results');

        $result = $this->repository->getAssignedLabelsByTaskIds([]);

        $this->assertSame([], $result);
    }

    public function test_getAssignedLabelsByTaskIds_returns_labels_for_single_task()
    {
        $taskIds = [1];
        $placeholders = '%d';
        $expectedSql = "SELECT a.id, a.pipeline_id, a.created_at, a.color, a.name, b.entity_id
                FROM " . TABLE_WP_QUICKTASKER_LABELS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " AS b 
                ON a.id = b.label_id
                WHERE b.entity_id IN ($placeholders) AND b.entity_type = 'task'
                ORDER BY b.created_at";
        $preparedSql = "PREPARED_SQL_STATEMENT";

        $expectedResults = [
            (object)[
                'id' => 1,
                'pipeline_id' => 1,
                'created_at' => '2024-01-01 12:00:00',
                'color' => '#FF5733',
                'name' => 'Urgent',
                'entity_id' => 1
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $taskIds)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->getAssignedLabelsByTaskIds($taskIds);

        $this->assertSame($expectedResults, $result);
    }

    public function test_getAssignedLabelsByTaskIds_returns_labels_for_multiple_tasks()
    {
        $taskIds = [1, 2, 3];
        $placeholders = '%d,%d,%d';
        $expectedSql = "SELECT a.id, a.pipeline_id, a.created_at, a.color, a.name, b.entity_id
                FROM " . TABLE_WP_QUICKTASKER_LABELS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " AS b 
                ON a.id = b.label_id
                WHERE b.entity_id IN ($placeholders) AND b.entity_type = 'task'
                ORDER BY b.created_at";
        $preparedSql = "PREPARED_SQL_STATEMENT";

        $expectedResults = [
            (object)[
                'id' => 1,
                'pipeline_id' => 1,
                'created_at' => '2024-01-01 12:00:00',
                'color' => '#FF5733',
                'name' => 'Urgent',
                'entity_id' => 1
            ],
            (object)[
                'id' => 2,
                'pipeline_id' => 1,
                'created_at' => '2024-01-02 12:00:00',
                'color' => '#33FF57',
                'name' => 'Normal',
                'entity_id' => 2
            ],
            (object)[
                'id' => 3,
                'pipeline_id' => 1,
                'created_at' => '2024-01-03 12:00:00',
                'color' => '#3357FF',
                'name' => 'Low',
                'entity_id' => 3
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $taskIds)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->getAssignedLabelsByTaskIds($taskIds);

        $this->assertSame($expectedResults, $result);
    }

    public function test_getAssignedLabelsByTaskIds_returns_empty_results_when_no_labels_assigned()
    {
        $taskIds = [999];
        $placeholders = '%d';
        $expectedSql = "SELECT a.id, a.pipeline_id, a.created_at, a.color, a.name, b.entity_id
                FROM " . TABLE_WP_QUICKTASKER_LABELS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " AS b 
                ON a.id = b.label_id
                WHERE b.entity_id IN ($placeholders) AND b.entity_type = 'task'
                ORDER BY b.created_at";
        $preparedSql = "PREPARED_SQL_STATEMENT";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $taskIds)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAssignedLabelsByTaskIds($taskIds);

        $this->assertSame([], $result);
    }

    public function test_getPipelineLabels_returns_labels_for_pipeline()
    {
        $pipelineId = 5;
        $expectedSql = "SELECT id, pipeline_id, created_at, color, name
                FROM " . TABLE_WP_QUICKTASKER_LABELS . "
                WHERE pipeline_id = %d";
        $preparedSql = "PREPARED_SQL_STATEMENT";

        $expectedResults = [
            (object)[
                'id' => 1,
                'pipeline_id' => 5,
                'created_at' => '2024-01-01 12:00:00',
                'color' => '#FF5733',
                'name' => 'Urgent'
            ],
            (object)[
                'id' => 2,
                'pipeline_id' => 5,
                'created_at' => '2024-01-02 12:00:00',
                'color' => '#33FF57',
                'name' => 'Normal'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pipelineId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->getPipelineLabels($pipelineId);

        $this->assertSame($expectedResults, $result);
    }

    public function test_getPipelineLabels_returns_empty_array_when_no_labels_found()
    {
        $pipelineId = 999;
        $expectedSql = "SELECT id, pipeline_id, created_at, color, name
                FROM " . TABLE_WP_QUICKTASKER_LABELS . "
                WHERE pipeline_id = %d";
        $preparedSql = "PREPARED_SQL_STATEMENT";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pipelineId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getPipelineLabels($pipelineId);

        $this->assertSame([], $result);
    }
}
