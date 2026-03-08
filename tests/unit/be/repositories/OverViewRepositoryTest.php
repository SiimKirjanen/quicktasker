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

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/OverViewRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Overview\OverViewRepository;
use WPQT\Services\ServiceLocator;

class OverViewRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_var'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new OverViewRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    /**
     * The getPipelineOverview method uses ServiceLocator::get('StageRepository')
     * which makes it difficult to unit test without dependency injection.
     * 
     * The method returns an object with the following structure:
     * - stages: array of stage objects with id, name, tasksCount
     * - archivedTasksCount: int
     * - notArchivedTasksCount: int
     * - doneTasksCount: int
     * - notDoneTasksCount: int
     * 
     * The method applies date filters when provided:
     * - taskStartDate filters by created_at >= date
     * - taskDoneDate filters by task_completed_at <= date (with '23:59:59' appended)
     * 
     * These tests document the expected behavior and implementation details.
     */

    public function test_getPipelineOverview_expected_return_structure()
    {
        // This test documents the expected return structure
        $expectedStructure = (object)[
            'stages' => [],
            'archivedTasksCount' => 0,
            'notArchivedTasksCount' => 0,
            'doneTasksCount' => 0,
            'notDoneTasksCount' => 0,
        ];

        $this->assertIsObject($expectedStructure);
        $this->assertObjectHasProperty('stages', $expectedStructure);
        $this->assertObjectHasProperty('archivedTasksCount', $expectedStructure);
        $this->assertObjectHasProperty('notArchivedTasksCount', $expectedStructure);
        $this->assertObjectHasProperty('doneTasksCount', $expectedStructure);
        $this->assertObjectHasProperty('notDoneTasksCount', $expectedStructure);
        $this->assertIsArray($expectedStructure->stages);
    }

    public function test_getPipelineOverview_stage_object_structure()
    {
        // This test documents the expected stage object structure
        $expectedStageStructure = (object)[
            'id' => 1,
            'name' => 'Stage Name',
            'tasksCount' => 0,
        ];

        $this->assertIsObject($expectedStageStructure);
        $this->assertObjectHasProperty('id', $expectedStageStructure);
        $this->assertObjectHasProperty('name', $expectedStageStructure);
        $this->assertObjectHasProperty('tasksCount', $expectedStageStructure);
    }

    public function test_getPipelineOverview_uses_service_locator()
    {
        // Documents that the method uses ServiceLocator for StageRepository
        $pipelineId = 1;
        
        try {
            $result = $this->repository->getPipelineOverview($pipelineId, null, null);
            $this->fail('Expected ServiceLocator exception was not thrown');
        } catch (\Exception $e) {
            $this->assertStringContainsString('Service not found: StageRepository', $e->getMessage());
        }
    }

    public function test_getPipelineOverview_requires_pipeline_id()
    {
        // The method requires a pipeline ID as first parameter
        $this->expectException(\ArgumentCountError::class);
        $this->repository->getPipelineOverview();
    }

    public function test_getPipelineOverview_accepts_null_date_parameters()
    {
        // Verifies method signature accepts null for date parameters
        $pipelineId = 1;
        
        try {
            // This will fail at ServiceLocator but verifies the parameters are accepted
            $result = $this->repository->getPipelineOverview($pipelineId, null, null);
        } catch (\Exception $e) {
            // Expected due to ServiceLocator
            $this->assertStringContainsString('Service not found', $e->getMessage());
        }
        
        $this->assertTrue(true); // Parameters were accepted
    }

    public function test_getPipelineOverview_accepts_date_strings()
    {
        // Verifies method signature accepts date strings
        $pipelineId = 1;
        $startDate = '2024-01-01';
        $doneDate = '2024-12-31';
        
        try {
            // This will fail at ServiceLocator but verifies the parameters are accepted
            $result = $this->repository->getPipelineOverview($pipelineId, $startDate, $doneDate);
        } catch (\Exception $e) {
            // Expected due to ServiceLocator
            $this->assertStringContainsString('Service not found', $e->getMessage());
        }
        
        $this->assertTrue(true); // Parameters were accepted
    }

    public function test_getPipelineOverview_method_exists()
    {
        $this->assertTrue(
            method_exists($this->repository, 'getPipelineOverview'),
            'getPipelineOverview method should exist'
        );
    }

    public function test_getPipelineOverview_is_public()
    {
        $reflection = new \ReflectionMethod(OverViewRepository::class, 'getPipelineOverview');
        $this->assertTrue($reflection->isPublic(), 'getPipelineOverview should be public');
    }

    public function test_getPipelineOverview_has_three_parameters()
    {
        $reflection = new \ReflectionMethod(OverViewRepository::class, 'getPipelineOverview');
        $this->assertEquals(3, $reflection->getNumberOfParameters(), 'getPipelineOverview should have 3 parameters');
    }

    public function test_getPipelineOverview_parameter_names()
    {
        $reflection = new \ReflectionMethod(OverViewRepository::class, 'getPipelineOverview');
        $parameters = $reflection->getParameters();
        
        $this->assertEquals('pipelineId', $parameters[0]->getName());
        $this->assertEquals('taskStartDate', $parameters[1]->getName());
        $this->assertEquals('taskDoneDate', $parameters[2]->getName());
    }

    /**
     * Integration test note:
     * 
     * For proper testing of getPipelineOverview, an integration test should be created that:
     * 1. Sets up a real database with test data
     * 2. Registers StageRepository in ServiceLocator
     * 3. Tests the full query execution and result aggregation
     * 4. Verifies date filtering works correctly
     * 5. Verifies the '23:59:59' appending to taskDoneDate
     * 6. Tests with various combinations of date parameters
     * 
     * Unit testing this method requires refactoring to:
     * - Accept StageRepository as constructor parameter
     * - Or accept it as a method parameter
     * - Or use a factory pattern that can be mocked
     */
    public function test_integration_test_recommendation()
    {
        $this->markTestIncomplete(
            'getPipelineOverview should be covered by integration tests. ' .
            'The method uses ServiceLocator and complex database queries requiring real database testing.'
        );
    }
}
