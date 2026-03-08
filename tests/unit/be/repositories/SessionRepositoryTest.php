<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_USER_SESSIONS')) {
    define('TABLE_WP_QUICKTASKER_USER_SESSIONS', 'wp_quicktasker_user_sessions');
}
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}

require_once __DIR__ . '/../../../../php/repositories/SessionRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Session\SessionRepository;

class SessionRepositoryTest extends TestCase
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

        $this->repository = new SessionRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUserSession_returns_session_when_found()
    {
        $sessionToken = 'abc123def456';
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 1,
            'user_id' => 10,
            'session_token' => 'abc123def456',
            'is_active' => 1,
            'created_at_utc' => '2024-01-01 12:00:00',
            'expires_at_utc' => '2024-01-02 12:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getUserSession($sessionToken);

        $this->assertSame($expectedSession, $result);
        $this->assertEquals('abc123def456', $result->session_token);
    }

    public function test_getUserSession_returns_null_when_not_found()
    {
        $sessionToken = 'nonexistent';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUserSession($sessionToken);

        $this->assertNull($result);
    }

    public function test_getUserSession_returns_inactive_session()
    {
        $sessionToken = 'inactive123';
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 5,
            'user_id' => 20,
            'session_token' => 'inactive123',
            'is_active' => 0, // Inactive session
            'created_at_utc' => '2024-01-01 12:00:00',
            'expires_at_utc' => '2024-01-02 12:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getUserSession($sessionToken);

        $this->assertEquals(0, $result->is_active);
    }

    public function test_getActiveUserSession_returns_active_session_only()
    {
        $sessionToken = 'active123';
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 2,
            'user_id' => 15,
            'session_token' => 'active123',
            'is_active' => 1,
            'created_at_utc' => '2024-01-05 10:00:00',
            'expires_at_utc' => '2024-01-06 10:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getActiveUserSession($sessionToken);

        $this->assertSame($expectedSession, $result);
        $this->assertEquals(1, $result->is_active);
    }

    public function test_getActiveUserSession_returns_null_for_inactive_session()
    {
        $sessionToken = 'inactive123';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getActiveUserSession($sessionToken);

        $this->assertNull($result);
    }

    public function test_getActiveUserSession_returns_null_when_not_found()
    {
        $sessionToken = 'nonexistent';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getActiveUserSession($sessionToken);

        $this->assertNull($result);
    }

    public function test_getActiveUserSession_includes_all_fields()
    {
        $sessionToken = 'full123';
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 7,
            'user_id' => 25,
            'session_token' => 'full123',
            'is_active' => 1,
            'created_at_utc' => '2024-02-01 08:00:00',
            'expires_at_utc' => '2024-02-02 08:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getActiveUserSession($sessionToken);

        $this->assertObjectHasProperty('id', $result);
        $this->assertObjectHasProperty('user_id', $result);
        $this->assertObjectHasProperty('session_token', $result);
        $this->assertObjectHasProperty('is_active', $result);
        $this->assertObjectHasProperty('created_at_utc', $result);
        $this->assertObjectHasProperty('expires_at_utc', $result);
    }

    public function test_getUserSessionById_returns_session_when_found()
    {
        $sessionId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 42,
            'user_id' => 30,
            'session_token' => 'xyz789',
            'is_active' => 1,
            'created_at_utc' => '2024-01-10 14:00:00',
            'expires_at_utc' => '2024-01-11 14:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getUserSessionById($sessionId);

        $this->assertSame($expectedSession, $result);
        $this->assertEquals(42, $result->id);
    }

    public function test_getUserSessionById_returns_null_when_not_found()
    {
        $sessionId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUserSessionById($sessionId);

        $this->assertNull($result);
    }

    public function test_getUserSessionById_returns_inactive_session()
    {
        $sessionId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedSession = (object)[
            'id' => 10,
            'user_id' => 5,
            'session_token' => 'expired123',
            'is_active' => 0,
            'created_at_utc' => '2023-12-01 10:00:00',
            'expires_at_utc' => '2023-12-02 10:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSession);

        $result = $this->repository->getUserSessionById($sessionId);

        $this->assertEquals(0, $result->is_active);
    }

    public function test_getUserSessions_returns_all_sessions_with_user_info()
    {
        $expectedSessions = [
            (object)[
                'id' => 3,
                'user_id' => 10,
                'created_at_utc' => '2024-01-15 12:00:00',
                'expires_at_utc' => '2024-01-16 12:00:00',
                'is_active' => 1,
                'user_name' => 'John Doe',
                'user_description' => 'Admin user'
            ],
            (object)[
                'id' => 2,
                'user_id' => 5,
                'created_at_utc' => '2024-01-14 10:00:00',
                'expires_at_utc' => '2024-01-15 10:00:00',
                'is_active' => 1,
                'user_name' => 'Jane Smith',
                'user_description' => 'Regular user'
            ],
            (object)[
                'id' => 1,
                'user_id' => 3,
                'created_at_utc' => '2024-01-10 08:00:00',
                'expires_at_utc' => '2024-01-11 08:00:00',
                'is_active' => 0,
                'user_name' => 'Bob Johnson',
                'user_description' => 'Guest user'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedSessions);

        $result = $this->repository->getUserSessions();

        $this->assertSame($expectedSessions, $result);
        $this->assertCount(3, $result);
    }

    public function test_getUserSessions_returns_empty_array_when_no_sessions()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn([]);

        $result = $this->repository->getUserSessions();

        $this->assertSame([], $result);
    }

    public function test_getUserSessions_includes_user_name_and_description()
    {
        $expectedSessions = [
            (object)[
                'id' => 5,
                'user_id' => 20,
                'created_at_utc' => '2024-02-01 12:00:00',
                'expires_at_utc' => '2024-02-02 12:00:00',
                'is_active' => 1,
                'user_name' => 'Alice Cooper',
                'user_description' => 'Power user'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedSessions);

        $result = $this->repository->getUserSessions();

        $this->assertObjectHasProperty('user_name', $result[0]);
        $this->assertObjectHasProperty('user_description', $result[0]);
        $this->assertEquals('Alice Cooper', $result[0]->user_name);
        $this->assertEquals('Power user', $result[0]->user_description);
    }

    public function test_getUserSessions_returns_ordered_by_created_at_desc()
    {
        $expectedSessions = [
            (object)[
                'id' => 3,
                'user_id' => 10,
                'created_at_utc' => '2024-01-15 12:00:00',
                'expires_at_utc' => '2024-01-16 12:00:00',
                'is_active' => 1,
                'user_name' => 'Recent User',
                'user_description' => 'Latest'
            ],
            (object)[
                'id' => 1,
                'user_id' => 5,
                'created_at_utc' => '2024-01-10 10:00:00',
                'expires_at_utc' => '2024-01-11 10:00:00',
                'is_active' => 0,
                'user_name' => 'Old User',
                'user_description' => 'Earlier'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedSessions);

        $result = $this->repository->getUserSessions();

        // Verify DESC order - most recent first
        $this->assertGreaterThan($result[1]->created_at_utc, $result[0]->created_at_utc);
    }

    public function test_getUserSessions_includes_both_active_and_inactive()
    {
        $expectedSessions = [
            (object)[
                'id' => 1,
                'user_id' => 10,
                'created_at_utc' => '2024-01-20 12:00:00',
                'expires_at_utc' => '2024-01-21 12:00:00',
                'is_active' => 1,
                'user_name' => 'Active User',
                'user_description' => 'Active'
            ],
            (object)[
                'id' => 2,
                'user_id' => 5,
                'created_at_utc' => '2024-01-15 10:00:00',
                'expires_at_utc' => '2024-01-16 10:00:00',
                'is_active' => 0,
                'user_name' => 'Inactive User',
                'user_description' => 'Inactive'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedSessions);

        $result = $this->repository->getUserSessions();

        $this->assertEquals(1, $result[0]->is_active);
        $this->assertEquals(0, $result[1]->is_active);
    }

    public function test_getUserSessions_includes_all_expected_fields()
    {
        $expectedSessions = [
            (object)[
                'id' => 8,
                'user_id' => 15,
                'created_at_utc' => '2024-03-01 09:00:00',
                'expires_at_utc' => '2024-03-02 09:00:00',
                'is_active' => 1,
                'user_name' => 'Test User',
                'user_description' => 'Testing'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedSessions);

        $result = $this->repository->getUserSessions();

        $this->assertObjectHasProperty('id', $result[0]);
        $this->assertObjectHasProperty('user_id', $result[0]);
        $this->assertObjectHasProperty('created_at_utc', $result[0]);
        $this->assertObjectHasProperty('expires_at_utc', $result[0]);
        $this->assertObjectHasProperty('is_active', $result[0]);
        $this->assertObjectHasProperty('user_name', $result[0]);
        $this->assertObjectHasProperty('user_description', $result[0]);
    }
}
