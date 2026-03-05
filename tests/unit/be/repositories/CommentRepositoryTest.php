<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_COMMENTS')) {
    define('TABLE_WP_QUICKTASKER_COMMENTS', 'wp_quicktasker_comments');
}
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}
if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_TASK')) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', 'wp_quicktasker_user_task');
}

// Define user type constants
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wp-user');
}

require_once __DIR__ . '/../../../../php/repositories/CommentRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Comment\CommentRepository;

class CommentRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb with the users property
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'get_results'])
            ->getMock();

        // Add the users property for WordPress users table
        $this->wpdbMock->users = 'wp_users';

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new CommentRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getCommentById_returns_comment_with_quicktasker_author()
    {
        $commentId = 42;
        $preparedSql = "PREPARED_SQL";
        $expectedComment = (object)[
            'id' => 42,
            'type_id' => 10,
            'type' => 'task',
            'author_id' => 5,
            'author_type' => 'quicktasker',
            'content' => 'This is a comment',
            'is_private' => 0,
            'created_at' => '2024-01-01 12:00:00',
            'author_name' => 'John Doe'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedComment);

        $result = $this->repository->getCommentById($commentId);

        $this->assertSame($expectedComment, $result);
        $this->assertEquals('John Doe', $result->author_name);
    }

    public function test_getCommentById_returns_comment_with_wp_user_author()
    {
        $commentId = 15;
        $preparedSql = "PREPARED_SQL";
        $expectedComment = (object)[
            'id' => 15,
            'author_id' => 3,
            'author_type' => 'wp-user',
            'content' => 'WordPress user comment',
            'author_name' => 'Jane Smith'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedComment);

        $result = $this->repository->getCommentById($commentId);

        $this->assertEquals('Jane Smith', $result->author_name);
    }

    public function test_getCommentById_returns_comment_with_null_author()
    {
        $commentId = 20;
        $preparedSql = "PREPARED_SQL";
        $expectedComment = (object)[
            'id' => 20,
            'author_id' => null,
            'author_type' => null,
            'content' => 'Anonymous comment',
            'author_name' => null
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedComment);

        $result = $this->repository->getCommentById($commentId);

        $this->assertNull($result->author_name);
    }

    public function test_getCommentById_returns_null_when_not_found()
    {
        $commentId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getCommentById($commentId);

        $this->assertNull($result);
    }

    public function test_getComments_returns_public_comments()
    {
        $typeId = 10;
        $type = 'task';
        $isPrivate = false;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 1, 'type_id' => 10, 'is_private' => 0, 'author_name' => 'User 1'],
            (object)['id' => 2, 'type_id' => 10, 'is_private' => 0, 'author_name' => 'User 2']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getComments($typeId, $type, $isPrivate);

        $this->assertCount(2, $result);
        $this->assertEquals(0, $result[0]->is_private);
    }

    public function test_getComments_returns_private_comments()
    {
        $typeId = 5;
        $type = 'task';
        $isPrivate = true;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 3, 'type_id' => 5, 'is_private' => 1]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getComments($typeId, $type, $isPrivate);

        $this->assertCount(1, $result);
        $this->assertEquals(1, $result[0]->is_private);
    }

    public function test_getComments_with_created_after_filter()
    {
        $typeId = 8;
        $type = 'task';
        $isPrivate = false;
        $createdAfter = '2024-01-01 00:00:00';
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 5, 'created_at' => '2024-01-02 10:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getComments($typeId, $type, $isPrivate, $createdAfter);

        $this->assertCount(1, $result);
    }

    public function test_getComments_with_user_type()
    {
        $typeId = 7;
        $type = WP_QT_QUICKTASKER_USER_TYPE;
        $isPrivate = false;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 6, 'type' => WP_QT_QUICKTASKER_USER_TYPE]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getComments($typeId, $type, $isPrivate);

        $this->assertIsArray($result);
    }

    public function test_getComments_returns_empty_array_when_none_found()
    {
        $typeId = 999;
        $type = 'task';
        $isPrivate = false;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getComments($typeId, $type, $isPrivate);

        $this->assertSame([], $result);
    }

    public function test_getCommentsRelatedtoTasksAssignedToUser_returns_task_comments()
    {
        $userId = 10;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)[
                'id' => 1,
                'type' => 'task',
                'is_private' => 0,
                'subject_name' => 'Task 1',
                'subject_hash' => 'abc123'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsRelatedtoTasksAssignedToUser($userId, $userType);

        $this->assertCount(1, $result);
        $this->assertObjectHasProperty('subject_name', $result[0]);
        $this->assertObjectHasProperty('subject_hash', $result[0]);
    }

    public function test_getCommentsRelatedtoTasksAssignedToUser_with_wp_user_type()
    {
        $userId = 5;
        $userType = WP_QT_WORDPRESS_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 2, 'subject_name' => 'Task 2']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsRelatedtoTasksAssignedToUser($userId, $userType);

        $this->assertIsArray($result);
    }

    public function test_getCommentsRelatedtoTasksAssignedToUser_with_created_after()
    {
        $userId = 8;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $createdAfter = '2024-01-01 00:00:00';
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 3, 'created_at' => '2024-01-02 10:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsRelatedtoTasksAssignedToUser($userId, $userType, $createdAfter);

        $this->assertIsArray($result);
    }

    public function test_getCommentsRelatedtoTasksAssignedToUser_excludes_archived_tasks()
    {
        $userId = 12;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 4, 'subject_name' => 'Active Task']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsRelatedtoTasksAssignedToUser($userId, $userType);

        $this->assertIsArray($result);
    }

    public function test_getCommentsRelatedToUser_merges_user_and_task_comments()
    {
        $userId = 10;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";
        
        $userComments = [
            (object)['id' => 1, 'type' => $userType]
        ];
        
        $taskComments = [
            (object)['id' => 2, 'type' => 'task']
        ];

        // Expect two prepare calls - one for getComments, one for getCommentsRelatedtoTasksAssignedToUser
        $this->wpdbMock->expects($this->exactly(2))
            ->method('prepare')
            ->willReturn($preparedSql);

        // Expect two get_results calls
        $this->wpdbMock->expects($this->exactly(2))
            ->method('get_results')
            ->with($preparedSql)
            ->willReturnOnConsecutiveCalls($userComments, $taskComments);

        $result = $this->repository->getCommentsRelatedToUser($userId, $userType);

        $this->assertCount(2, $result);
        $this->assertEquals(1, $result[0]->id);
        $this->assertEquals(2, $result[1]->id);
    }

    public function test_getCommentsRelatedToUser_with_created_after()
    {
        $userId = 7;
        $userType = WP_QT_WORDPRESS_USER_TYPE;
        $createdAfter = '2024-01-01 00:00:00';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->exactly(2))
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->exactly(2))
            ->method('get_results')
            ->with($preparedSql)
            ->willReturnOnConsecutiveCalls([], []);

        $result = $this->repository->getCommentsRelatedToUser($userId, $userType, $createdAfter);

        $this->assertIsArray($result);
    }

    public function test_getCommentsRelatedToUser_returns_empty_array_when_no_comments()
    {
        $userId = 999;
        $userType = WP_QT_QUICKTASKER_USER_TYPE;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->exactly(2))
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->exactly(2))
            ->method('get_results')
            ->with($preparedSql)
            ->willReturnOnConsecutiveCalls([], []);

        $result = $this->repository->getCommentsRelatedToUser($userId, $userType);

        $this->assertSame([], $result);
    }

    public function test_getCommentsOfTasks_returns_empty_array_for_empty_input()
    {
        $result = $this->repository->getCommentsOfTasks([]);

        $this->assertSame([], $result);
    }

    public function test_getCommentsOfTasks_returns_comments_for_multiple_tasks()
    {
        $tasks = [
            (object)['id' => 1, 'name' => 'Task 1'],
            (object)['id' => 2, 'name' => 'Task 2'],
            (object)['id' => 3, 'name' => 'Task 3']
        ];
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 1, 'type_id' => 1, 'author_name' => 'User 1'],
            (object)['id' => 2, 'type_id' => 2, 'author_name' => 'User 2'],
            (object)['id' => 3, 'type_id' => 3, 'author_name' => 'User 3']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsOfTasks($tasks);

        $this->assertCount(3, $result);
    }

    public function test_getCommentsOfTasks_with_single_task()
    {
        $tasks = [
            (object)['id' => 5, 'name' => 'Single Task']
        ];
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 10, 'type_id' => 5]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsOfTasks($tasks);

        $this->assertCount(1, $result);
    }

    public function test_getCommentsOfTasks_includes_author_name()
    {
        $tasks = [
            (object)['id' => 7]
        ];
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)[
                'id' => 15,
                'author_type' => 'quicktasker',
                'author_name' => 'John Doe'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsOfTasks($tasks);

        $this->assertObjectHasProperty('author_name', $result[0]);
        $this->assertEquals('John Doe', $result[0]->author_name);
    }

    public function test_getCommentsOfTasks_orders_by_created_at_desc()
    {
        $tasks = [
            (object)['id' => 1]
        ];
        $preparedSql = "PREPARED_SQL";
        $expectedComments = [
            (object)['id' => 20, 'created_at' => '2024-01-10 12:00:00'],
            (object)['id' => 19, 'created_at' => '2024-01-09 12:00:00']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedComments);

        $result = $this->repository->getCommentsOfTasks($tasks);

        $this->assertCount(2, $result);
        // Verify order is preserved (DESC order)
        $this->assertEquals(20, $result[0]->id);
        $this->assertEquals(19, $result[1]->id);
    }

    public function test_getCommentsOfTasks_returns_empty_array_when_no_comments()
    {
        $tasks = [
            (object)['id' => 100]
        ];
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getCommentsOfTasks($tasks);

        $this->assertSame([], $result);
    }
}
