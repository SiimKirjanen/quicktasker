<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}
if (!defined('TABLE_WP_QUICKTASKER_STAGES_LOCATION')) {
    define('TABLE_WP_QUICKTASKER_STAGES_LOCATION', 'wp_quicktasker_stages_location');
}

require_once __DIR__ . '/../../../../php/repositories/StageRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Stage\StageRepository;

class StageRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_row', 'get_results', 'get_var'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new StageRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getStagesByPipelineId_returns_stages_ordered_by_stage_order()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedStages = [
            (object)[
                'id' => 1,
                'name' => 'To Do',
                'pipeline_id' => 5,
                'stage_order' => 0,
                'created_at' => '2024-01-01 12:00:00'
            ],
            (object)[
                'id' => 2,
                'name' => 'In Progress',
                'pipeline_id' => 5,
                'stage_order' => 1,
                'created_at' => '2024-01-01 12:00:00'
            ],
            (object)[
                'id' => 3,
                'name' => 'Done',
                'pipeline_id' => 5,
                'stage_order' => 2,
                'created_at' => '2024-01-01 12:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedStages);

        $result = $this->repository->getStagesByPipelineId($pipelineId);

        $this->assertSame($expectedStages, $result);
        $this->assertCount(3, $result);
    }

    public function test_getStagesByPipelineId_returns_empty_array_when_no_stages()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getStagesByPipelineId($pipelineId);

        $this->assertSame([], $result);
    }

    public function test_getStagesByPipelineId_includes_stage_order()
    {
        $pipelineId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedStages = [
            (object)[
                'id' => 5,
                'name' => 'Stage 1',
                'pipeline_id' => 10,
                'stage_order' => 0
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedStages);

        $result = $this->repository->getStagesByPipelineId($pipelineId);

        $this->assertObjectHasProperty('stage_order', $result[0]);
        $this->assertEquals(0, $result[0]->stage_order);
    }

    public function test_getStageById_returns_stage_when_found()
    {
        $stageId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedStage = (object)[
            'id' => 42,
            'name' => 'Review',
            'pipeline_id' => 5,
            'stage_order' => 3,
            'created_at' => '2024-01-05 10:00:00',
            'updated_at' => '2024-01-10 15:30:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedStage);

        $result = $this->repository->getStageById($stageId);

        $this->assertSame($expectedStage, $result);
    }

    public function test_getStageById_returns_null_when_not_found()
    {
        $stageId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getStageById($stageId);

        $this->assertNull($result);
    }

    public function test_getStageById_includes_stage_order()
    {
        $stageId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedStage = (object)[
            'id' => 10,
            'name' => 'Testing',
            'pipeline_id' => 2,
            'stage_order' => 5
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedStage);

        $result = $this->repository->getStageById($stageId);

        $this->assertObjectHasProperty('stage_order', $result);
        $this->assertEquals(5, $result->stage_order);
    }

    public function test_getLastStageOrder_returns_max_stage_order()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $maxOrder = 4;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($maxOrder);

        $result = $this->repository->getLastStageOrder($pipelineId);

        $this->assertEquals(4, $result);
    }

    public function test_getLastStageOrder_returns_zero_when_no_stages()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getLastStageOrder($pipelineId);

        $this->assertEquals(0, $result);
    }

    public function test_getLastStageOrder_returns_zero_for_first_stage()
    {
        $pipelineId = 1;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(0);

        $result = $this->repository->getLastStageOrder($pipelineId);

        $this->assertEquals(0, $result);
    }

    public function test_getNextStageOrder_returns_incremented_order()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $lastOrder = 3;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($lastOrder);

        $result = $this->repository->getNextStageOrder($pipelineId);

        $this->assertEquals(4, $result);
    }

    public function test_getNextStageOrder_returns_zero_when_no_existing_stages()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getNextStageOrder($pipelineId);

        $this->assertEquals(0, $result);
    }

    public function test_getNextStageOrder_returns_zero_when_last_order_is_zero()
    {
        $pipelineId = 10;
        $preparedSql = "PREPARED_SQL";
        $lastOrder = 0;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($lastOrder);

        $result = $this->repository->getNextStageOrder($pipelineId);

        // When last order is 0, the method returns 0 (treats as no stages)
        $this->assertEquals(0, $result);
    }

    public function test_getFirstStage_returns_stage_with_lowest_order()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedStage = (object)[
            'id' => 1,
            'name' => 'Backlog',
            'pipeline_id' => 5,
            'stage_order' => 0,
            'created_at' => '2024-01-01 09:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedStage);

        $result = $this->repository->getFirstStage($pipelineId);

        $this->assertSame($expectedStage, $result);
        $this->assertEquals(0, $result->stage_order);
    }

    public function test_getFirstStage_returns_null_when_no_stages()
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

        $result = $this->repository->getFirstStage($pipelineId);

        $this->assertNull($result);
    }

    public function test_getFirstStage_includes_stage_order()
    {
        $pipelineId = 3;
        $preparedSql = "PREPARED_SQL";
        $expectedStage = (object)[
            'id' => 7,
            'name' => 'Initial',
            'pipeline_id' => 3,
            'stage_order' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedStage);

        $result = $this->repository->getFirstStage($pipelineId);

        $this->assertObjectHasProperty('stage_order', $result);
        $this->assertObjectHasProperty('name', $result);
        $this->assertObjectHasProperty('pipeline_id', $result);
    }

    public function test_getFirstStage_with_non_zero_first_stage_order()
    {
        $pipelineId = 8;
        $preparedSql = "PREPARED_SQL";
        // Even if stages don't start at 0, it should return the one with lowest order
        $expectedStage = (object)[
            'id' => 15,
            'name' => 'Start',
            'pipeline_id' => 8,
            'stage_order' => 5 // Might not be 0 in edge cases
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedStage);

        $result = $this->repository->getFirstStage($pipelineId);

        $this->assertSame($expectedStage, $result);
    }
}
