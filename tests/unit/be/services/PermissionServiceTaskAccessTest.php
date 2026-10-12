<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wp-user');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PermissionService.php';
require_once __DIR__ . '/../../../../php/services/PipelineAccessService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Permission\PermissionService;
use WPQT\Pipeline\PipelineAccessService;
use WPQT\Services\ServiceLocator;

/**
 * Tasks app permission checks for tasks on boards the user may not have been added to.
 */
class PermissionServiceTaskAccessTest extends TestCase
{
    private const USER_ID = 7;
    private const TASK_ID = 3;

    private $service;

    /** @var int[] Boards the WordPress user has been added to. */
    private $userBoardIds;

    /** @var int[] Boards the QuickTasker user has been added to. */
    private $quicktaskerBoardIds;

    protected function setUp(): void
    {
        $this->userBoardIds = [];
        $this->quicktaskerBoardIds = [];

        $pipelineAccessRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessAllPipelines', 'getPipelineIdsByWPUserId', 'getPipelineIdsByQuicktaskerUserId', 'getPipelineIdOfEntity'])
            ->getMock();
        $pipelineAccessRepo->method('canAccessAllPipelines')->willReturn(false);
        $pipelineAccessRepo->method('getPipelineIdsByWPUserId')->willReturnCallback(function () {
            return $this->userBoardIds;
        });
        $pipelineAccessRepo->method('getPipelineIdsByQuicktaskerUserId')->willReturnCallback(function () {
            return $this->quicktaskerBoardIds;
        });
        $pipelineAccessRepo->method('getPipelineIdOfEntity')->willReturn(1);

        $taskRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getTaskById'])
            ->getMock();
        $taskRepo->method('getTaskById')->willReturn((object) [
            'id'           => (string) self::TASK_ID,
            'pipeline_id'  => '1',
            'is_archived'  => '0',
            'free_for_all' => '0',
        ]);

        $userRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedUsersByTaskId', 'getAssignedWPUsersByTaskIds', 'checkIfUserHasAssignedToTask'])
            ->getMock();
        $assignedUser = [(object) ['id' => (string) self::USER_ID]];
        $userRepo->method('getAssignedUsersByTaskId')->willReturn($assignedUser);
        $userRepo->method('getAssignedWPUsersByTaskIds')->willReturn($assignedUser);
        $userRepo->method('checkIfUserHasAssignedToTask')->willReturn(true);

        ServiceLocator::register('PipelineAccessRepository', $pipelineAccessRepo);
        ServiceLocator::register('PipelineAccessService', new PipelineAccessService());
        ServiceLocator::register('TaskRepository', $taskRepo);
        ServiceLocator::register('UserRepository', $userRepo);

        $this->service = new PermissionService();
    }

    public function test_assigned_wp_user_added_to_the_board_can_view_and_edit_the_task()
    {
        $this->userBoardIds = [1];

        $this->assertTrue($this->service->checkIfUserIsAllowedToViewTask(self::USER_ID, self::TASK_ID, WP_QT_WORDPRESS_USER_TYPE));
        $this->assertTrue($this->service->checkIfUserIsAllowedToEditTask(self::USER_ID, self::TASK_ID, WP_QT_WORDPRESS_USER_TYPE));
    }

    public function test_assigned_wp_user_not_added_to_the_board_cannot_view_or_edit_the_task()
    {
        $this->assertFalse($this->service->checkIfUserIsAllowedToViewTask(self::USER_ID, self::TASK_ID, WP_QT_WORDPRESS_USER_TYPE));
        $this->assertFalse($this->service->checkIfUserIsAllowedToEditTask(self::USER_ID, self::TASK_ID, WP_QT_WORDPRESS_USER_TYPE));
    }

    public function test_assigned_quicktasker_added_to_the_board_can_view_and_edit_the_task()
    {
        $this->quicktaskerBoardIds = [1];

        $this->assertTrue($this->service->checkIfUserIsAllowedToViewTask(self::USER_ID, self::TASK_ID, WP_QT_QUICKTASKER_USER_TYPE));
        $this->assertTrue($this->service->checkIfUserIsAllowedToEditTask(self::USER_ID, self::TASK_ID, WP_QT_QUICKTASKER_USER_TYPE));
    }

    public function test_assigned_quicktasker_not_added_to_the_board_cannot_view_or_edit_the_task()
    {
        // Adding the WordPress user with the same ID does not give the QuickTasker access.
        $this->userBoardIds = [1];

        $this->assertFalse($this->service->checkIfUserIsAllowedToViewTask(self::USER_ID, self::TASK_ID, WP_QT_QUICKTASKER_USER_TYPE));
        $this->assertFalse($this->service->checkIfUserIsAllowedToEditTask(self::USER_ID, self::TASK_ID, WP_QT_QUICKTASKER_USER_TYPE));
    }
}
