<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_PAGES')) {
    define('TABLE_WP_QUICKTASKER_USER_PAGES', 'wp_quicktasker_user_pages');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_TASK')) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', 'wp_quicktasker_user_task');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_SESSIONS')) {
    define('TABLE_WP_QUICKTASKER_USER_SESSIONS', 'wp_quicktasker_user_sessions');
}

// Define user type constant
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/UserService.php';

use PHPUnit\Framework\TestCase;
use WPQT\User\UserService;

class UserServiceTest extends TestCase
{
    private $service;
    private $wpdbMock;
    private $wpdbBackup;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['insert', 'update', 'delete', 'get_var', 'prepare'])
            ->getMock();

        // Add insert_id property
        $this->wpdbMock->insert_id = 0;

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->service = new UserService();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_checkIfUserHasPassword_returns_true_when_user_has_password()
    {
        $userId = 5;
        $expectedSql = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND password IS NOT NULL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $userId)
            ->willReturn("SELECT COUNT(*) FROM wp_quicktasker_users WHERE id = 5 AND password IS NOT NULL");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(1);

        $result = $this->service->checkIfUserHasPassword($userId);

        $this->assertTrue($result);
    }

    public function test_checkIfUserHasPassword_returns_false_when_user_has_no_password()
    {
        $userId = 10;
        $expectedSql = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND password IS NOT NULL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $userId)
            ->willReturn("SELECT COUNT(*) FROM wp_quicktasker_users WHERE id = 10 AND password IS NOT NULL");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(0);

        $result = $this->service->checkIfUserHasPassword($userId);

        $this->assertFalse($result);
    }

    public function test_checkIfUserHasPassword_returns_false_when_query_returns_null()
    {
        $userId = 15;
        $expectedSql = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND password IS NOT NULL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $userId)
            ->willReturn("SELECT COUNT(*) FROM wp_quicktasker_users WHERE id = 15 AND password IS NOT NULL");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(null);

        $result = $this->service->checkIfUserHasPassword($userId);

        $this->assertFalse($result);
    }

    public function test_checkIfUserHasPassword_handles_multiple_passwords()
    {
        // Edge case: if somehow COUNT returns > 1
        $userId = 20;
        $expectedSql = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND password IS NOT NULL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $userId)
            ->willReturn("SELECT COUNT(*) FROM wp_quicktasker_users WHERE id = 20 AND password IS NOT NULL");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(2);

        $result = $this->service->checkIfUserHasPassword($userId);

        $this->assertTrue($result);
    }

    public function test_createUser_requires_service_locator()
    {
        $this->markTestSkipped(
            'createUser requires ServiceLocator with TimeRepository, HashService, ' .
            'and UserRepository. Needs integration testing.'
        );
    }

    public function test_editUser_requires_service_locator()
    {
        $this->markTestSkipped(
            'editUser requires ServiceLocator with TimeRepository and ' .
            'UserRepository. Needs integration testing.'
        );
    }

    public function test_changeUserStatus_requires_service_locator()
    {
        $this->markTestSkipped(
            'changeUserStatus requires ServiceLocator with TimeRepository and ' .
            'UserRepository. Needs integration testing.'
        );
    }

    public function test_deleteUser_requires_service_locator()
    {
        $this->markTestSkipped(
            'deleteUser requires ServiceLocator with TimeRepository and ' .
            'UserRepository. Needs integration testing.'
        );
    }

    public function test_assignTaskToUser_requires_service_locator()
    {
        $this->markTestSkipped(
            'assignTaskToUser requires ServiceLocator with UserRepository, ' .
            'TimeRepository, and TaskRepository. Needs integration testing.'
        );
    }

    public function test_removeTaskFromUser_requires_service_locator()
    {
        $this->markTestSkipped(
            'removeTaskFromUser requires ServiceLocator with TaskRepository. ' .
            'Needs integration testing.'
        );
    }

    public function test_resetUserPassword_requires_service_locator()
    {
        $this->markTestSkipped(
            'resetUserPassword requires ServiceLocator with TimeRepository and ' .
            'UserRepository. Needs integration testing.'
        );
    }

    /**
     * Integration test note:
     * 
     * Methods requiring integration tests:
     * 
     * 1. createUser($args):
     *    - Needs: TimeRepository (getCurrentUTCTime), HashService (generateUserPageHash), UserRepository (getUserById)
     *    - Tests: successful user creation, user page creation, exception on insert failure
     *    - Validates: two-step process (user insert, then user page insert)
     * 
     * 2. editUser($userId, $args):
     *    - Needs: TimeRepository (getCurrentUTCTime), UserRepository (getUserById)
     *    - Tests: successful update, exception on update failure
     *    - Validates: wp_parse_args for defaults, updated_at timestamp
     * 
     * 3. changeUserStatus($userId, $status):
     *    - Needs: TimeRepository (getCurrentUTCTime), UserRepository (getUserById)
     *    - Tests: enable user (status = 1), disable user (status = 0), exception handling
     *    - Validates: is_active field update, updated_at timestamp
     * 
     * 4. deleteUser($userId):
     *    - Needs: TimeRepository (getCurrentUTCTime), UserRepository (getUserById)
     *    - Tests: soft delete (sets deleted = 1), exception handling
     *    - Validates: deleted flag, updated_at timestamp
     * 
     * 5. assignTaskToUser($userId, $taskId, $userType):
     *    - Needs: UserRepository (getUserByIdAndType), TimeRepository, TaskRepository (getTaskById)
     *    - Tests: successful assignment, user not found exception, insert failure exception
     *    - Validates: user existence check before assignment, default user type
     * 
     * 6. removeTaskFromUser($userId, $taskId, $userType):
     *    - Needs: TaskRepository (getTaskById)
     *    - Tests: successful removal, delete failure exception
     *    - Validates: task-user relationship deletion, default user type
     * 
     * 7. resetUserPassword($userId):
     *    - Needs: TimeRepository (getCurrentUTCTime), UserRepository (getUserById)
     *    - Tests: successful reset (password to null), exception if no password set
     *    - Validates: password nullification, session deletion, checkIfUserHasPassword call
     */
    public function test_service_locator_methods_require_integration_testing()
    {
        $this->markTestIncomplete(
            'Methods using ServiceLocator require integration testing with ' .
            'proper service registration. See integration test notes in comments.'
        );
    }

    public function test_checkIfUserHasPassword_uses_prepared_statement()
    {
        // Verify that the method uses prepared statements for security
        $userId = 999;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->stringContains('WHERE id = %d AND password IS NOT NULL'),
                $userId
            )
            ->willReturn("prepared_sql");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with('prepared_sql')
            ->willReturn(0);

        $this->service->checkIfUserHasPassword($userId);
    }

    public function test_checkIfUserHasPassword_queries_correct_table()
    {
        $userId = 123;
        $expectedTable = TABLE_WP_QUICKTASKER_USERS;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->stringContains("FROM " . $expectedTable),
                $userId
            )
            ->willReturn("prepared_sql");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(0);

        $this->service->checkIfUserHasPassword($userId);
    }

    public function test_checkIfUserHasPassword_checks_password_not_null()
    {
        $userId = 456;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->stringContains('password IS NOT NULL'),
                $userId
            )
            ->willReturn("prepared_sql");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(1);

        $result = $this->service->checkIfUserHasPassword($userId);
        $this->assertTrue($result);
    }

    public function test_checkIfUserHasPassword_returns_boolean()
    {
        $userId = 789;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn("prepared_sql");

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->willReturn(1);

        $result = $this->service->checkIfUserHasPassword($userId);

        $this->assertIsBool($result);
    }
}
