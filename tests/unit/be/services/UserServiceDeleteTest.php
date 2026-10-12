<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_TASK')) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', 'wp_quicktasker_user_task');
}
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/UserService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Services\ServiceLocator;
use WPQT\User\UserService;

/**
 * Deleting a QuickTasker user removes everything that gives them access, including their boards.
 */
class UserServiceDeleteTest extends TestCase
{
    private const USER_ID = 7;

    private $service;
    private $wpdbBackup;
    private $userRepoMock;
    private $pipelineAccessRepoMock;
    private $sessionServiceMock;

    protected function setUp(): void
    {
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        $wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['update', 'delete'])
            ->getMock();
        $wpdbMock->method('update')->willReturn(1);
        $wpdbMock->method('delete')->willReturn(0);
        $GLOBALS['wpdb'] = $wpdbMock;

        $this->userRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getQuicktaskerUserById'])
            ->getMock();
        $this->userRepoMock->method('getQuicktaskerUserById')
            ->willReturn((object) ['id' => (string) self::USER_ID, 'name' => 'Quinn']);

        // Without assigned tasks there is nothing to unassign first.
        $taskRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getTasksAssignedToUser'])
            ->getMock();
        $taskRepoMock->method('getTasksAssignedToUser')->willReturn([]);

        $timeRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getCurrentUTCTime'])
            ->getMock();
        $timeRepoMock->method('getCurrentUTCTime')->willReturn('2026-01-01 00:00:00');

        $this->sessionServiceMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['deleteUserSessions'])
            ->getMock();

        $this->pipelineAccessRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['deleteQuicktaskerUserAccess'])
            ->getMock();

        ServiceLocator::register('UserRepository', $this->userRepoMock);
        ServiceLocator::register('TaskRepository', $taskRepoMock);
        ServiceLocator::register('TimeRepository', $timeRepoMock);
        ServiceLocator::register('SessionService', $this->sessionServiceMock);
        ServiceLocator::register('PipelineAccessRepository', $this->pipelineAccessRepoMock);

        $this->service = new UserService();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_deleting_a_user_removes_them_from_every_board()
    {
        $this->sessionServiceMock->expects($this->once())->method('deleteUserSessions')->with(self::USER_ID);
        $this->pipelineAccessRepoMock->expects($this->once())
            ->method('deleteQuicktaskerUserAccess')
            ->with(self::USER_ID);

        $user = $this->service->deleteUser(self::USER_ID);

        $this->assertSame('Quinn', $user->name);
    }

    public function test_deleting_fails_when_the_boards_cannot_be_removed()
    {
        // The API rolls the deletion back, so the user is not left deleted but still on boards.
        $this->pipelineAccessRepoMock->method('deleteQuicktaskerUserAccess')
            ->willThrowException(new \Exception('Failed to remove the user from their boards'));

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to remove the user from their boards');

        $this->service->deleteUser(self::USER_ID);
    }

    public function test_a_missing_user_is_not_removed_from_boards()
    {
        $this->userRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getQuicktaskerUserById'])
            ->getMock();
        $this->userRepoMock->method('getQuicktaskerUserById')->willReturn(null);
        ServiceLocator::register('UserRepository', $this->userRepoMock);
        $this->pipelineAccessRepoMock->expects($this->never())->method('deleteQuicktaskerUserAccess');

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('User not found');

        $this->service->deleteUser(self::USER_ID);
    }
}
