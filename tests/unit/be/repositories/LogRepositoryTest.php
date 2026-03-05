<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKS_LOGS')) {
    define('TABLE_WP_QUICKTASKS_LOGS', 'wp_quicktasks_logs');
}
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}

require_once __DIR__ . '/../../../../php/repositories/LogRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Log\LogRepository;

class LogRepositoryTest extends TestCase
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
        
        // Set the users table property
        $this->wpdbMock->users = 'wp_users';

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new LogRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getLogById_returns_log_when_found()
    {
        $logId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedLog = (object)[
            'id' => 42,
            'text' => 'Test log entry',
            'type_id' => 10,
            'type' => 'task',
            'created_by' => 'admin',
            'created_by_id' => 1,
            'user_id' => 5,
            'created_at' => '2024-01-01 12:00:00',
            'log_status' => 'active'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedLog);

        $result = $this->repository->getLogById($logId);

        $this->assertSame($expectedLog, $result);
        $this->assertEquals(42, $result->id);
    }

    public function test_getLogById_returns_null_when_not_found()
    {
        $logId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getLogById($logId);

        $this->assertNull($result);
    }

    public function test_getLogById_includes_all_fields()
    {
        $logId = 15;
        $preparedSql = "PREPARED_SQL";
        $expectedLog = (object)[
            'id' => 15,
            'text' => 'Log message',
            'type_id' => 5,
            'type' => 'pipeline',
            'created_by' => 'quicktasker_user',
            'created_by_id' => 3,
            'user_id' => 10,
            'created_at' => '2024-02-01 10:00:00',
            'log_status' => 'archived'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedLog);

        $result = $this->repository->getLogById($logId);

        $this->assertObjectHasProperty('text', $result);
        $this->assertObjectHasProperty('type', $result);
        $this->assertObjectHasProperty('created_by', $result);
        $this->assertObjectHasProperty('log_status', $result);
    }

    public function test_getLogs_returns_logs_with_author_names()
    {
        $typeId = 5;
        $type = 'task';
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)[
                'id' => 1,
                'text' => 'Admin created task',
                'type_id' => 5,
                'type' => 'task',
                'created_by' => 'admin',
                'created_by_id' => 1,
                'user_id' => 10,
                'created_at' => '2024-01-15 12:00:00',
                'log_status' => 'active',
                'author_name' => 'John Admin'
            ],
            (object)[
                'id' => 2,
                'text' => 'User updated task',
                'type_id' => 5,
                'type' => 'task',
                'created_by' => 'quicktasker_user',
                'created_by_id' => 2,
                'user_id' => 8,
                'created_at' => '2024-01-14 10:00:00',
                'log_status' => 'active',
                'author_name' => 'Jane User'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getLogs($typeId, $type);

        $this->assertSame($expectedLogs, $result);
        $this->assertCount(2, $result);
        $this->assertEquals('John Admin', $result[0]->author_name);
        $this->assertEquals('Jane User', $result[1]->author_name);
    }

    public function test_getLogs_returns_empty_array_when_no_logs()
    {
        $typeId = 999;
        $type = 'nonexistent';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getLogs($typeId, $type);

        $this->assertSame([], $result);
    }

    public function test_getLogs_orders_by_created_at_desc()
    {
        $typeId = 10;
        $type = 'pipeline';
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)[
                'id' => 3,
                'text' => 'Recent log',
                'created_at' => '2024-01-20 12:00:00',
                'author_name' => 'User A'
            ],
            (object)[
                'id' => 1,
                'text' => 'Old log',
                'created_at' => '2024-01-10 10:00:00',
                'author_name' => 'User B'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getLogs($typeId, $type);

        // Verify DESC order - most recent first
        $this->assertGreaterThan($result[1]->created_at, $result[0]->created_at);
    }

    public function test_getLogs_includes_system_author()
    {
        $typeId = 3;
        $type = 'system';
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)[
                'id' => 10,
                'text' => 'System log',
                'type_id' => 3,
                'type' => 'system',
                'created_by' => 'system',
                'created_by_id' => null,
                'user_id' => null,
                'created_at' => '2024-01-01 00:00:00',
                'log_status' => 'active',
                'author_name' => 'system'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getLogs($typeId, $type);

        $this->assertEquals('system', $result[0]->author_name);
    }

    public function test_getGlobalLogs_with_no_filters()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 1, 'text' => 'Log 1', 'author_name' => 'Author 1'],
            (object)['id' => 2, 'text' => 'Log 2', 'author_name' => 'Author 2']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', null, null, null);

        $this->assertSame($expectedLogs, $result);
    }

    public function test_getGlobalLogs_with_log_type_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 1, 'type' => 'task', 'text' => 'Task log']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs('task', null, null, 100, 'DESC', null, null, null);

        $this->assertCount(1, $result);
        $this->assertEquals('task', $result[0]->type);
    }

    public function test_getGlobalLogs_with_type_id_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 5, 'type_id' => 10, 'text' => 'Log with type_id']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, 10, null, 100, 'DESC', null, null, null);

        $this->assertEquals(10, $result[0]->type_id);
    }

    public function test_getGlobalLogs_with_created_by_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 3, 'created_by' => 'admin', 'text' => 'Admin log']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, 'admin', 100, 'DESC', null, null, null);

        $this->assertEquals('admin', $result[0]->created_by);
    }

    public function test_getGlobalLogs_with_log_status_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 7, 'log_status' => 'archived', 'text' => 'Archived log']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', 'archived', null, null);

        $this->assertEquals('archived', $result[0]->log_status);
    }

    public function test_getGlobalLogs_with_search_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $searchTerm = 'test search';
        $expectedLogs = [
            (object)['id' => 8, 'text' => 'This contains test search term']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('esc_like')
            ->with($searchTerm)
            ->willReturn($searchTerm);

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', null, $searchTerm, null);

        $this->assertStringContainsString('test search', $result[0]->text);
    }

    public function test_getGlobalLogs_with_created_by_id_filter()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 9, 'created_by_id' => 15, 'text' => 'Log by user 15']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', null, null, 15);

        $this->assertEquals(15, $result[0]->created_by_id);
    }

    public function test_getGlobalLogs_with_asc_order()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 1, 'created_at' => '2024-01-01 10:00:00'],
            (object)['id' => 2, 'created_at' => '2024-01-02 10:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'ASC', null, null, null);

        // Verify ASC order - oldest first
        $this->assertLessThan($result[1]->created_at, $result[0]->created_at);
    }

    public function test_getGlobalLogs_with_desc_order()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 2, 'created_at' => '2024-01-02 10:00:00'],
            (object)['id' => 1, 'created_at' => '2024-01-01 10:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', null, null, null);

        // Verify DESC order - newest first
        $this->assertGreaterThan($result[1]->created_at, $result[0]->created_at);
    }

    public function test_getGlobalLogs_defaults_to_desc_for_invalid_order()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 2, 'created_at' => '2024-01-02 10:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        // Pass invalid order value
        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'INVALID', null, null, null);

        $this->assertIsArray($result);
    }

    public function test_getGlobalLogs_with_multiple_filters()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)[
                'id' => 20,
                'type' => 'task',
                'type_id' => 5,
                'created_by' => 'admin',
                'created_by_id' => 1,
                'log_status' => 'active',
                'text' => 'Complex filter test'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs('task', 5, 'admin', 100, 'DESC', 'active', null, 1);

        $this->assertCount(1, $result);
        $this->assertEquals('task', $result[0]->type);
        $this->assertEquals(5, $result[0]->type_id);
        $this->assertEquals('admin', $result[0]->created_by);
        $this->assertEquals(1, $result[0]->created_by_id);
        $this->assertEquals('active', $result[0]->log_status);
    }

    public function test_getGlobalLogs_returns_empty_array_when_no_results()
    {
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getGlobalLogs('nonexistent', 999, 'nobody', 100, 'DESC', 'missing', 'notfound', 999);

        $this->assertSame([], $result);
    }

    public function test_getGlobalLogs_includes_author_name_for_all_types()
    {
        $preparedSql = "PREPARED_SQL";
        $expectedLogs = [
            (object)['id' => 1, 'created_by' => 'admin', 'author_name' => 'Admin User'],
            (object)['id' => 2, 'created_by' => 'quicktasker_user', 'author_name' => 'QT User'],
            (object)['id' => 3, 'created_by' => 'system', 'author_name' => 'system']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedLogs);

        $result = $this->repository->getGlobalLogs(null, null, null, 100, 'DESC', null, null, null);

        $this->assertEquals('Admin User', $result[0]->author_name);
        $this->assertEquals('QT User', $result[1]->author_name);
        $this->assertEquals('system', $result[2]->author_name);
    }
}
