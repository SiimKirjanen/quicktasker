<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_USER_TASK')) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', 'wp_quicktasker_user_task');
}
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wp-user');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/UserService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Services\ServiceLocator;
use WPQT\User\UserService;
use WPQT\WPQTException;

class UserServiceAssignTaskTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $service;

    /** @var bool Whether the assigned user can access the task's board. */
    private $canAccessBoard;

    protected function setUp(): void
    {
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;
        $this->canAccessBoard = true;

        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['insert'])
            ->getMock();
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $userRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getUserByIdAndType'])
            ->getMock();
        $userRepo->method('getUserByIdAndType')->willReturn((object) ['id' => '7', 'name' => 'Bob']);

        $taskRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getTaskById'])
            ->getMock();
        $taskRepo->method('getTaskById')->willReturn((object) ['id' => '3', 'pipeline_id' => '1']);

        $timeRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getCurrentUTCTime'])
            ->getMock();
        $timeRepo->method('getCurrentUTCTime')->willReturn('2026-01-01 00:00:00');

        $pipelineAccessService = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessEntity'])
            ->getMock();
        $pipelineAccessService->method('canAccessEntity')->willReturnCallback(function () {
            return $this->canAccessBoard;
        });

        ServiceLocator::register('UserRepository', $userRepo);
        ServiceLocator::register('TaskRepository', $taskRepo);
        ServiceLocator::register('TimeRepository', $timeRepo);
        ServiceLocator::register('PipelineAccessService', $pipelineAccessService);

        $this->service = new UserService();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_wp_user_added_to_the_board_is_assigned()
    {
        $this->wpdbMock->expects($this->once())->method('insert')->willReturn(1);

        $task = $this->service->assignTaskToUser(7, 3, 'wp-user');

        $this->assertSame('3', $task->id);
    }

    public function test_wp_user_not_added_to_the_board_is_not_assigned()
    {
        $this->canAccessBoard = false;
        $this->wpdbMock->expects($this->never())->method('insert');

        $this->expectException(WPQTException::class);
        $this->expectExceptionMessage('The user has not been added to the board of this task');

        $this->service->assignTaskToUser(7, 3, 'wp-user');
    }

    public function test_quicktasker_user_is_assigned_regardless_of_boards()
    {
        $this->canAccessBoard = false;
        $this->wpdbMock->expects($this->once())->method('insert')->willReturn(1);

        $this->service->assignTaskToUser(7, 3, 'quicktasker');
    }
}
