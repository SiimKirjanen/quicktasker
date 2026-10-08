<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('WP_QUICKTASKER_ADMIN_ROLE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE', 'quicktasker_admin_role');
}
if (!defined('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS', 'quicktasker_admin_role_manage_users');
}
if (!defined('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE', 'quicktasker_admin_role_allow_delete');
}

// Grants exactly the capabilities listed in $GLOBALS['wpqt_test_current_user_caps'].
if (!function_exists('current_user_can')) {
    function current_user_can($capability) {
        return in_array($capability, $GLOBALS['wpqt_test_current_user_caps'] ?? [], true);
    }
}

if (!function_exists('get_current_user_id')) {
    function get_current_user_id() {
        return 1;
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PermissionService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Permission\PermissionService;
use WPQT\Services\ServiceLocator;

/**
 * Managing a QuickTasker user gives access to their tasks app, so it needs access to every board they are on.
 */
class PermissionServiceQuicktaskerUserTest extends TestCase
{
    /** @var int[] IDs of the QuickTasker users whose boards the current user can all access. */
    private $quicktaskersOnAccessibleBoards;

    protected function setUp(): void
    {
        $this->quicktaskersOnAccessibleBoards = [5];

        $pipelineAccessService = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessQuicktaskerUserPipelines'])
            ->getMock();
        $pipelineAccessService->method('canAccessQuicktaskerUserPipelines')->willReturnCallback(function ($wpUserId, $quicktaskerUserId) {
            return in_array($quicktaskerUserId, $this->quicktaskersOnAccessibleBoards, true);
        });
        ServiceLocator::register('PipelineAccessService', $pipelineAccessService);
    }

    protected function tearDown(): void
    {
        unset($GLOBALS['wpqt_test_current_user_caps']);
    }

    public function test_a_user_manager_can_manage_quicktaskers_on_their_boards_only()
    {
        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE, WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS];

        $this->assertTrue(PermissionService::canManageQuicktaskerUser(5));
        $this->assertFalse(PermissionService::canManageQuicktaskerUser(6));
    }

    public function test_managing_quicktaskers_needs_the_manage_users_capability()
    {
        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE];

        $this->assertFalse(PermissionService::canManageQuicktaskerUser(5));
    }

    public function test_deleting_a_quicktasker_needs_the_delete_capability_and_their_boards()
    {
        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE, WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS, WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE];

        $this->assertTrue(PermissionService::canDeleteQuicktaskerUser(5));
        $this->assertFalse(PermissionService::canDeleteQuicktaskerUser(6));

        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE, WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS];

        $this->assertFalse(PermissionService::canDeleteQuicktaskerUser(5));
    }
}
