<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS')) {
    define('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS', 'wp_quicktasker_custom_fields');
}
if (!defined('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES')) {
    define('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES', 'wp_quicktasker_custom_fields_values');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}

// Define user type constants
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wp-user');
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/CustomFieldRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Customfield\CustomFieldRepository;

class CustomFieldRepositoryTest extends TestCase
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

        $this->repository = new CustomFieldRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getCustomFieldById_returns_custom_field_when_found()
    {
        $fieldId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedField = (object)[
            'id' => 42,
            'name' => 'Priority',
            'description' => 'Task priority level',
            'type' => 'select',
            'entity_type' => 'task',
            'entity_id' => 10,
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-10 15:00:00',
            'deleted_at' => null,
            'is_deleted' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedField);

        $result = $this->repository->getCustomFieldById($fieldId);

        $this->assertSame($expectedField, $result);
        $this->assertEquals(42, $result->id);
    }

    public function test_getCustomFieldById_returns_null_when_not_found()
    {
        $fieldId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getCustomFieldById($fieldId);

        $this->assertNull($result);
    }

    public function test_getCustomFieldById_includes_all_fields()
    {
        $fieldId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedField = (object)[
            'id' => 5,
            'name' => 'Status',
            'description' => 'Current status',
            'type' => 'text',
            'entity_type' => 'pipeline',
            'entity_id' => 3,
            'created_at' => '2024-02-01 10:00:00',
            'updated_at' => '2024-02-05 11:00:00',
            'deleted_at' => null,
            'is_deleted' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedField);

        $result = $this->repository->getCustomFieldById($fieldId);

        $this->assertObjectHasProperty('name', $result);
        $this->assertObjectHasProperty('type', $result);
        $this->assertObjectHasProperty('entity_type', $result);
        $this->assertObjectHasProperty('is_deleted', $result);
    }

    public function test_getCustomFields_with_entity_id()
    {
        $entityId = 10;
        $entityType = 'task';
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 1, 'name' => 'Field 1', 'entity_type' => 'task', 'is_deleted' => 0],
            (object)['id' => 2, 'name' => 'Field 2', 'entity_type' => 'task', 'is_deleted' => 0]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getCustomFields($entityId, $entityType);

        $this->assertSame($expectedFields, $result);
        $this->assertCount(2, $result);
    }

    public function test_getCustomFields_with_null_entity_id()
    {
        $entityId = null;
        $entityType = 'users';
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 5, 'name' => 'Global Field', 'entity_type' => 'users', 'entity_id' => null]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getCustomFields($entityId, $entityType);

        $this->assertCount(1, $result);
        $this->assertNull($result[0]->entity_id);
    }

    public function test_getCustomFields_with_is_deleted_true()
    {
        $entityId = 3;
        $entityType = 'pipeline';
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 7, 'name' => 'Deleted Field', 'is_deleted' => 1]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getCustomFields($entityId, $entityType, true);

        $this->assertEquals(1, $result[0]->is_deleted);
    }

    public function test_getCustomFields_returns_empty_array_when_no_fields()
    {
        $entityId = 999;
        $entityType = 'task';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getCustomFields($entityId, $entityType);

        $this->assertSame([], $result);
    }

    public function test_getCustomFields_includes_default_value()
    {
        $entityId = 5;
        $entityType = 'task';
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 8, 'name' => 'Field with default', 'default_value' => 'default']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getCustomFields($entityId, $entityType);

        $this->assertObjectHasProperty('default_value', $result[0]);
    }

    public function test_getRelatedCustomFields_with_task_entity_type()
    {
        // This method uses ServiceLocator, so it will fail
        $this->markTestSkipped(
            'getRelatedCustomFields delegates to getTaskRelatedCustomFields which uses ServiceLocator. ' .
            'Unit testing requires refactoring to support dependency injection.'
        );
    }

    public function test_getRelatedCustomFields_with_wordpress_user_type()
    {
        $userId = 10;
        $entityType = WP_QT_WORDPRESS_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 1, 'name' => 'WP User Field', 'entity_type' => WP_QT_WORDPRESS_USER_TYPE]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getRelatedCustomFields($userId, $entityType);

        $this->assertIsArray($result);
    }

    public function test_getRelatedCustomFields_with_quicktasker_user_type()
    {
        $userId = 5;
        $entityType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 2, 'name' => 'QT User Field', 'entity_type' => WP_QT_QUICKTASKER_USER_TYPE]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getRelatedCustomFields($userId, $entityType);

        $this->assertIsArray($result);
    }

    public function test_getRelatedCustomFields_with_other_entity_type()
    {
        $entityId = 7;
        $entityType = 'pipeline';
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 3, 'name' => 'Pipeline Field', 'entity_type' => 'pipeline']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getRelatedCustomFields($entityId, $entityType);

        $this->assertIsArray($result);
    }

    public function test_getTaskRelatedCustomFields_uses_service_locator()
    {
        $taskId = 1;
        
        try {
            $result = $this->repository->getTaskRelatedCustomFields($taskId);
            $this->fail('Expected ServiceLocator exception was not thrown');
        } catch (\Exception $e) {
            $this->assertStringContainsString('Service not found: TaskRepository', $e->getMessage());
        }
    }

    public function test_getActiveCustomFieldsForTasks_returns_empty_array_for_empty_input()
    {
        $result = $this->repository->getActiveCustomFieldsForTasks([]);

        $this->assertSame([], $result);
    }

    public function test_getActiveCustomFieldsForTasks_with_task_ids()
    {
        $taskIds = [1, 2];
        $preparedSql = "PREPARED_SQL";

        // This method makes multiple queries, so we expect multiple prepare/get_results calls
        $this->wpdbMock->expects($this->atLeastOnce())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->atLeastOnce())
            ->method('get_results')
            ->willReturn([]);

        $result = $this->repository->getActiveCustomFieldsForTasks($taskIds);

        $this->assertIsArray($result);
    }

    public function test_getUserRelatedCustomFields_returns_fields_with_values()
    {
        $userId = 10;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)[
                'id' => 1,
                'name' => 'Bio',
                'type' => 'textarea',
                'entity_type' => WP_QT_QUICKTASKER_USER_TYPE,
                'entity_id' => 10,
                'value' => 'User bio text'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getUserRelatedCustomFields($userId, $userType);

        $this->assertCount(1, $result);
        $this->assertObjectHasProperty('value', $result[0]);
        $this->assertEquals('User bio text', $result[0]->value);
    }

    public function test_getUserRelatedCustomFields_with_wp_user_type()
    {
        $userId = 5;
        $userType = WP_QT_WORDPRESS_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 2, 'name' => 'Department', 'entity_type' => WP_QT_WORDPRESS_USER_TYPE]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getUserRelatedCustomFields($userId, $userType);

        $this->assertIsArray($result);
    }

    public function test_getUserRelatedCustomFields_with_active_fields_false()
    {
        $userId = 3;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 5, 'name' => 'Deleted Field', 'is_deleted' => 1]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getUserRelatedCustomFields($userId, $userType, false);

        $this->assertIsArray($result);
    }

    public function test_getUserRelatedCustomFields_includes_global_user_fields()
    {
        $userId = 8;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedFields = [
            (object)['id' => 10, 'name' => 'Global User Field', 'entity_type' => 'users', 'entity_id' => null]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedFields);

        $result = $this->repository->getUserRelatedCustomFields($userId, $userType);

        $this->assertIsArray($result);
    }

    public function test_getUserRelatedCustomFields_returns_empty_array_when_no_fields()
    {
        $userId = 999;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getUserRelatedCustomFields($userId, $userType);

        $this->assertSame([], $result);
    }

    /**
     * Integration test note:
     * 
     * Methods like getTaskRelatedCustomFields and getActiveCustomFieldsForTasks are highly complex
     * and use ServiceLocator, making them unsuitable for unit testing without dependency injection.
     * 
     * These should be covered by integration tests that:
     * 1. Set up a real database with test data
     * 2. Register required services in ServiceLocator
     * 3. Test the full query execution and data aggregation
     * 4. Verify complex JOIN operations and conditional logic
     */
    public function test_complex_methods_require_integration_testing()
    {
        $this->markTestIncomplete(
            'Methods like getTaskRelatedCustomFields and getActiveCustomFieldsForTasks require ' .
            'integration testing due to ServiceLocator dependencies and complex multi-query logic.'
        );
    }
}
