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

// Grants exactly the capabilities listed in $GLOBALS['wpqt_test_current_user_caps'].
if (!function_exists('current_user_can')) {
    function current_user_can($capability) {
        return in_array($capability, $GLOBALS['wpqt_test_current_user_caps'] ?? [], true);
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PermissionService.php';
require_once __DIR__ . '/../../../../php/services/UserService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Services\ServiceLocator;
use WPQT\User\UserService;

class UserServiceUsersForViewerTest extends TestCase
{
    private $service;

    protected function setUp(): void
    {
        $userRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getUsers'])
            ->getMock();
        $userRepoMock->method('getUsers')->willReturnCallback(function () {
            return [
                (object) ['id' => '1', 'name' => 'First', 'has_password' => '0', 'page_hash' => 'aaaaaaaaaaaaaaaa'],
                (object) ['id' => '2', 'name' => 'Second', 'has_password' => '1', 'page_hash' => 'bbbbbbbbbbbbbbbb'],
            ];
        });

        ServiceLocator::register('UserRepository', $userRepoMock);

        $this->service = new UserService();
    }

    protected function tearDown(): void
    {
        unset($GLOBALS['wpqt_test_current_user_caps']);
    }

    public function test_getUsersForCurrentViewer_includes_page_hash_for_user_managers()
    {
        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE, WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS];

        $users = $this->service->getUsersForCurrentViewer();

        $this->assertSame(['aaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbb'], array_column($users, 'page_hash'));
    }

    public function test_getUsersForCurrentViewer_omits_page_hash_without_manage_users()
    {
        $GLOBALS['wpqt_test_current_user_caps'] = [WP_QUICKTASKER_ADMIN_ROLE];

        $users = $this->service->getUsersForCurrentViewer();

        $this->assertCount(2, $users);
        foreach ($users as $user) {
            $this->assertFalse(property_exists($user, 'page_hash'));
        }
        $this->assertSame(['First', 'Second'], array_column($users, 'name'));
    }
}
