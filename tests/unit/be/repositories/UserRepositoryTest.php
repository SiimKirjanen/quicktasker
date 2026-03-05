<?php
// Define WordPress constants before loading the repository to prevent exit()
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

// Define filter constants
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE', 'admin_fe');
}
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL', 'minimal');
}
if (!defined('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL')) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL', 'full');
}

// Define role constants
if (!defined('WP_QUICKTASKER_ADMIN_ROLE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE', 'wpqt_admin');
}
if (!defined('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE', 'wpqt_admin_allow_delete');
}
if (!defined('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS', 'wpqt_admin_manage_users');
}
if (!defined('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS', 'wpqt_admin_manage_settings');
}

// Mock WordPress functions
if (!function_exists('get_avatar_data')) {
    function get_avatar_data($user_id, $args = array()) {
        return [
            'found_avatar' => true,
            'url' => 'https://example.com/avatar.jpg'
        ];
    }
}

// Mock WP_User_Query class
if (!class_exists('WP_User_Query')) {
    class WP_User_Query {
        private $results = array();
        
        public function __construct($args = array()) {
            // This will be mocked in tests
        }
        
        public function get_results() {
            return $this->results;
        }
    }
}

require_once __DIR__ . '/../../../../php/repositories/UserRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\User\UserRepository;

class UserRepositoryTest extends TestCase
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
        
        // Add prefix property
        $this->wpdbMock->prefix = 'wp_';

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new UserRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUserByIdAndType_returns_quicktasker_user()
    {
        $userId = 123;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $expectedUser = (object)['id' => 123, 'name' => 'Test User', 'user_type' => 'quicktasker'];

        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUser);

        $result = $this->repository->getUserByIdAndType($userId, $userType);

        $this->assertSame($expectedUser, $result);
    }

    public function test_getUserByIdAndType_returns_null_for_unknown_type()
    {
        $userId = 123;
        $userType = 'unknown-type';

        $result = $this->repository->getUserByIdAndType($userId, $userType);

        $this->assertNull($result);
    }

    public function test_getUsers_returns_list_of_users()
    {
        $expectedUsers = [
            (object)[
                'id' => 1,
                'name' => 'User 1',
                'description' => 'Description 1',
                'created_at' => '2024-01-01 12:00:00',
                'updated_at' => '2024-01-02 12:00:00',
                'is_active' => 1,
                'user_type' => 'quicktasker',
                'has_password' => 1,
                'page_hash' => 'hash123',
                'assigned_tasks_count' => 5
            ],
            (object)[
                'id' => 2,
                'name' => 'User 2',
                'description' => 'Description 2',
                'created_at' => '2024-01-03 12:00:00',
                'updated_at' => '2024-01-04 12:00:00',
                'is_active' => 0,
                'user_type' => 'quicktasker',
                'has_password' => 0,
                'page_hash' => 'hash456',
                'assigned_tasks_count' => 2
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->willReturn($expectedUsers);

        $result = $this->repository->getUsers();

        $this->assertSame($expectedUsers, $result);
    }

    public function test_getUserById_returns_user_object()
    {
        $userId = 42;
        $expectedUser = (object)[
            'id' => 42,
            'name' => 'Test User',
            'description' => 'Test Description',
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-02 12:00:00',
            'is_active' => 1,
            'page_hash' => 'hash789',
            'user_type' => 'quicktasker',
            'assigned_tasks_count' => 3
        ];

        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUser);

        $result = $this->repository->getUserById($userId);

        $this->assertSame($expectedUser, $result);
    }

    public function test_getUserById_returns_null_when_not_found()
    {
        $userId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUserById($userId);

        $this->assertNull($result);
    }

    public function test_getAssignedUsersByTaskIds_returns_empty_array_for_empty_input()
    {
        $this->wpdbMock->expects($this->never())
            ->method('prepare');

        $result = $this->repository->getAssignedUsersByTaskIds([]);

        $this->assertSame([], $result);
    }

    public function test_getAssignedUsersByTaskIds_returns_users_for_tasks()
    {
        $taskIds = [1, 2, 3];
        $preparedSql = "PREPARED_SQL";

        $expectedUsers = [
            (object)[
                'id' => 1,
                'name' => 'User 1',
                'description' => 'Desc 1',
                'created_at' => '2024-01-01',
                'updated_at' => '2024-01-02',
                'is_active' => 1,
                'task_id' => 1,
                'user_type' => 'quicktasker'
            ],
            (object)[
                'id' => 2,
                'name' => 'User 2',
                'description' => 'Desc 2',
                'created_at' => '2024-01-03',
                'updated_at' => '2024-01-04',
                'is_active' => 1,
                'task_id' => 2,
                'user_type' => 'quicktasker'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedUsers);

        $result = $this->repository->getAssignedUsersByTaskIds($taskIds);

        $this->assertSame($expectedUsers, $result);
    }

    public function test_getAssignedUsersByTaskId_returns_users_for_task()
    {
        $taskId = 5;
        $preparedSql = "PREPARED_SQL";

        $expectedUsers = [
            (object)[
                'id' => 1,
                'name' => 'User 1',
                'description' => 'Desc 1',
                'created_at' => '2024-01-01',
                'updated_at' => '2024-01-02',
                'is_active' => 1,
                'user_type' => 'quicktasker'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedUsers);

        $result = $this->repository->getAssignedUsersByTaskId($taskId);

        $this->assertSame($expectedUsers, $result);
    }

    public function test_checkIfUserHasAssignedToTask_returns_true_when_assigned()
    {
        $userId = 10;
        $taskId = 20;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(1);

        $result = $this->repository->checkIfUserHasAssignedToTask($userId, $taskId, $userType);

        $this->assertTrue($result);
    }

    public function test_checkIfUserHasAssignedToTask_returns_false_when_not_assigned()
    {
        $userId = 10;
        $taskId = 20;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(0);

        $result = $this->repository->checkIfUserHasAssignedToTask($userId, $taskId, $userType);

        $this->assertFalse($result);
    }

    public function test_checkIfUserHasAssignedToTask_uses_default_user_type()
    {
        $userId = 10;
        $taskId = 20;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(0);

        $result = $this->repository->checkIfUserHasAssignedToTask($userId, $taskId);

        $this->assertFalse($result);
    }

    public function test_isUserActive_returns_true_when_active()
    {
        $userId = 15;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(1);

        $result = $this->repository->isUserActive($userId);

        $this->assertTrue($result);
    }

    public function test_isUserActive_returns_false_when_inactive()
    {
        $userId = 15;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(0);

        $result = $this->repository->isUserActive($userId);

        $this->assertFalse($result);
    }

    public function test_getAssignedWPUsersByTaskIds_returns_empty_array_for_empty_input()
    {
        $this->wpdbMock->expects($this->never())
            ->method('prepare');

        $result = $this->repository->getAssignedWPUsersByTaskIds([]);

        $this->assertSame([], $result);
    }

    public function test_getWPUsersMinimal_filters_user_properties()
    {
        // Create a partial mock to override getWPUsers method
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $fullUsers = [
            (object)[
                'id' => '1',
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'description' => 'Description',
                'user_type' => 'wp-user',
                'caps' => [],
                'roles' => []
            ],
            (object)[
                'id' => '2',
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'description' => 'Description',
                'user_type' => 'wp-user',
                'caps' => [],
                'roles' => []
            ]
        ];

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['include' => [1, 2]])
            ->willReturn($fullUsers);

        $result = $repository->getWPUsersMinimal(['include' => [1, 2]]);

        $this->assertCount(2, $result);
        $this->assertEquals('John Doe', $result[0]->name);
        $this->assertEquals('1', $result[0]->id);
        $this->assertEquals('wp-user', $result[0]->user_type);
        $this->assertObjectNotHasProperty('email', $result[0]);
        $this->assertObjectNotHasProperty('description', $result[0]);
    }

    public function test_getWPUserById_returns_first_user()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $expectedUser = (object)[
            'id' => '5',
            'name' => 'Test User',
            'email' => 'test@example.com',
            'user_type' => 'wp-user'
        ];

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['include' => [5]])
            ->willReturn([$expectedUser]);

        $result = $repository->getWPUserById(5);

        $this->assertSame($expectedUser, $result);
    }

    public function test_getWPUserById_returns_null_when_not_found()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['include' => [999]])
            ->willReturn([]);

        $result = $repository->getWPUserById(999);

        $this->assertNull($result);
    }

    public function test_getWPAdminUsers_calls_getWPUsers_with_role()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $expectedUsers = [
            (object)['id' => '1', 'name' => 'Admin User', 'user_type' => 'wp-user']
        ];

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['role' => 'Administrator'])
            ->willReturn($expectedUsers);

        $result = $repository->getWPAdminUsers();

        $this->assertSame($expectedUsers, $result);
    }

    public function test_getWPNonAdminUsers_calls_getWPUsers_with_role_not_in()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $expectedUsers = [
            (object)['id' => '2', 'name' => 'Regular User', 'user_type' => 'wp-user']
        ];

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['role__not_in' => ['Administrator']])
            ->willReturn($expectedUsers);

        $result = $repository->getWPNonAdminUsers();

        $this->assertSame($expectedUsers, $result);
    }

    public function test_getWPUsersForFrontend_removes_email_and_filters_caps()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsers'])
            ->getMock();

        $fullUsers = [
            (object)[
                'id' => '1',
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'description' => 'Description',
                'user_type' => 'wp-user',
                'allcaps' => [
                    WP_QUICKTASKER_ADMIN_ROLE => true,
                    WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE => true,
                    'some_other_cap' => true,
                    'another_cap' => false
                ]
            ]
        ];

        $repository->expects($this->once())
            ->method('getWPUsers')
            ->with(['include' => [1]])
            ->willReturn($fullUsers);

        $result = $repository->getWPUsersForFrontend(['include' => [1]]);

        $this->assertCount(1, $result);
        $this->assertObjectNotHasProperty('email', $result[0]);
        $this->assertArrayHasKey(WP_QUICKTASKER_ADMIN_ROLE, $result[0]->allcaps);
        $this->assertArrayHasKey(WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE, $result[0]->allcaps);
        $this->assertArrayNotHasKey('some_other_cap', $result[0]->allcaps);
        $this->assertArrayNotHasKey('another_cap', $result[0]->allcaps);
    }

    public function test_getWPUsersWithCapabilities_handles_single_capability()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsersForFrontend'])
            ->getMock();

        $expectedUsers = [
            (object)['id' => '1', 'name' => 'User 1']
        ];

        $repository->expects($this->once())
            ->method('getWPUsersForFrontend')
            ->with($this->callback(function($args) {
                return isset($args['meta_query']) && 
                       is_array($args['meta_query']) &&
                       $args['meta_query']['relation'] === 'OR';
            }))
            ->willReturn($expectedUsers);

        $result = $repository->getWPUsersWithCapabilities('edit_posts');

        $this->assertSame($expectedUsers, $result);
    }

    public function test_getWPUsersWithCapabilities_handles_array_of_capabilities()
    {
        // Create a partial mock
        $repository = $this->getMockBuilder(UserRepository::class)
            ->onlyMethods(['getWPUsersForFrontend'])
            ->getMock();

        $expectedUsers = [
            (object)['id' => '1', 'name' => 'User 1']
        ];

        $repository->expects($this->once())
            ->method('getWPUsersForFrontend')
            ->with($this->callback(function($args) {
                return isset($args['meta_query']) && 
                       is_array($args['meta_query']) &&
                       count($args['meta_query']) >= 3; // 2 capabilities + administrator + relation
            }))
            ->willReturn($expectedUsers);

        $result = $repository->getWPUsersWithCapabilities(['edit_posts', 'publish_posts']);

        $this->assertSame($expectedUsers, $result);
    }
}
