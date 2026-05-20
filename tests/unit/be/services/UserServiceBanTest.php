<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Constants the new methods read directly.
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
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker');
}
if (!defined('WP_QT_LOG_TYPE_QUICKTASKER_USER')) {
    define('WP_QT_LOG_TYPE_QUICKTASKER_USER', 'quicktasker_user');
}
if (!defined('WP_QT_LOG_CREATED_BY_SYSTEM')) {
    define('WP_QT_LOG_CREATED_BY_SYSTEM', 'system');
}
if (!defined('WP_QT_LOG_STATUS_ERROR')) {
    define('WP_QT_LOG_STATUS_ERROR', 'error');
}
if (!defined('WP_QUICKTASKER_BAN_OFFENSE_WINDOW')) {
    define('WP_QUICKTASKER_BAN_OFFENSE_WINDOW', 1800);
}
if (!defined('WP_QUICKTASKER_BAN_OFFENSE_THRESHOLD')) {
    define('WP_QUICKTASKER_BAN_OFFENSE_THRESHOLD', 3);
}

// Stub the transient + delete API the service relies on.
if (!function_exists('get_transient')) {
    function get_transient($key)
    {
        global $wpqtRateLimitTestStore;

        return $wpqtRateLimitTestStore[$key] ?? false;
    }
}
if (!function_exists('set_transient')) {
    function set_transient($key, $value, $ttl = 0)
    {
        global $wpqtRateLimitTestStore;
        $wpqtRateLimitTestStore[$key] = $value;

        return true;
    }
}
if (!function_exists('delete_transient')) {
    function delete_transient($key)
    {
        global $wpqtRateLimitTestStore;
        unset($wpqtRateLimitTestStore[$key]);

        return true;
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/RateLimitService.php';
require_once __DIR__ . '/../../../../php/services/UserService.php';

use PHPUnit\Framework\TestCase;
use WPQT\User\UserService;
use WPQT\WPQTException;
use WPQT\Services\ServiceLocator;

class UserServiceBanTest extends TestCase
{
    private $service;
    private $wpdbBackup;
    private $userRepoMock;
    private $logServiceMock;
    private $rateLimitServiceMock;

    protected function setUp(): void
    {
        global $wpdb, $wpqtRateLimitTestStore;
        $this->wpdbBackup = $wpdb ?? null;
        $wpqtRateLimitTestStore = [];

        // Minimal $wpdb stub — recordRateLimitOffense calls $wpdb->query('COMMIT').
        $wpdb = $this->getMockBuilder(stdClass::class)
            ->addMethods(['query'])
            ->getMock();
        $GLOBALS['wpdb'] = $wpdb;

        $this->userRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods([
                'isQuicktaskerUserBanned',
                'banQuicktaskerUserForSpam',
                'unbanQuicktaskerUser',
                'getQuicktaskerUserById',
            ])
            ->getMock();
        $this->logServiceMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['log'])
            ->getMock();
        $this->rateLimitServiceMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['enforce'])
            ->getMock();

        ServiceLocator::register('UserRepository', $this->userRepoMock);
        ServiceLocator::register('LogService', $this->logServiceMock);
        ServiceLocator::register('RateLimitService', $this->rateLimitServiceMock);

        $this->service = new UserService();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    // ── enforceWriteRateLimit / recordRateLimitOffense ──────────────────────

    public function test_enforceWriteRateLimit_passes_when_limiter_does_not_throw(): void
    {
        $this->rateLimitServiceMock->expects($this->once())
            ->method('enforce')
            ->with('write_global', 42, 30, 60);

        $this->userRepoMock->expects($this->never())->method('banQuicktaskerUserForSpam');

        $this->service->enforceWriteRateLimit('write_global', 42, 30, 60);
    }

    public function test_first_throttled_request_records_one_offense_and_sets_lock(): void
    {
        $this->rateLimitServiceMock->method('enforce')->willThrowException(
            new WPQTException('Too many requests', true)
        );

        $this->expectException(WPQTException::class);
        try {
            $this->service->enforceWriteRateLimit('write_global', 42, 30, 60);
        } finally {
            global $wpqtRateLimitTestStore;
            $this->assertSame(1, $wpqtRateLimitTestStore['wpqt_ban_offense_42'] ?? null);
            $this->assertArrayHasKey('wpqt_offense_lock_write_global_42', $wpqtRateLimitTestStore);
        }
    }

    public function test_repeat_throttled_request_within_same_window_does_not_stack_offenses(): void
    {
        global $wpqtRateLimitTestStore;
        // Simulate prior offense + active lock for this window.
        $wpqtRateLimitTestStore['wpqt_ban_offense_42'] = 1;
        $wpqtRateLimitTestStore['wpqt_ban_offense_42_exp'] = time() + 1800;
        $wpqtRateLimitTestStore['wpqt_offense_lock_write_global_42'] = 1;

        $this->rateLimitServiceMock->method('enforce')->willThrowException(
            new WPQTException('Too many requests', true)
        );

        try {
            $this->service->enforceWriteRateLimit('write_global', 42, 30, 60);
            $this->fail('Expected WPQTException');
        } catch (WPQTException $e) {
            // Offense count must NOT have incremented while lock is held.
            $this->assertSame(1, $wpqtRateLimitTestStore['wpqt_ban_offense_42']);
        }
    }

    public function test_offense_increment_falls_back_to_window_when_exp_missing(): void
    {
        global $wpqtRateLimitTestStore;
        // Existing offense counter but no _exp sibling and no lock.
        $wpqtRateLimitTestStore['wpqt_ban_offense_42'] = 1;

        $this->rateLimitServiceMock->method('enforce')->willThrowException(
            new WPQTException('Too many requests', true)
        );

        try {
            $this->service->enforceWriteRateLimit('write_global', 42, 30, 60);
            $this->fail('Expected WPQTException');
        } catch (WPQTException $e) {
            $this->assertSame(2, $wpqtRateLimitTestStore['wpqt_ban_offense_42']);
        }
    }

    public function test_reaching_threshold_triggers_ban_and_clears_offense_counter(): void
    {
        global $wpqtRateLimitTestStore;
        // Two prior offenses, no lock → next throttle hits threshold (3).
        $wpqtRateLimitTestStore['wpqt_ban_offense_42'] = 2;
        $wpqtRateLimitTestStore['wpqt_ban_offense_42_exp'] = time() + 1800;

        $this->rateLimitServiceMock->method('enforce')->willThrowException(
            new WPQTException('Too many requests', true)
        );

        $this->userRepoMock->method('isQuicktaskerUserBanned')->willReturn(false);
        $this->userRepoMock->expects($this->once())->method('banQuicktaskerUserForSpam')->with(42);
        $this->userRepoMock->method('getQuicktaskerUserById')->willReturn((object) ['id' => 42, 'name' => 'spammer']);
        $this->logServiceMock->expects($this->once())->method('log');

        try {
            $this->service->enforceWriteRateLimit('write_global', 42, 30, 60);
            $this->fail('Expected WPQTException');
        } catch (WPQTException $e) {
            // Offense transients should be cleared after the ban fires.
            $this->assertArrayNotHasKey('wpqt_ban_offense_42', $wpqtRateLimitTestStore);
            $this->assertArrayNotHasKey('wpqt_ban_offense_42_exp', $wpqtRateLimitTestStore);
        }
    }

    // ── banQuicktaskerUserForSpam idempotency ───────────────────────────────

    public function test_banQuicktaskerUserForSpam_returns_early_when_already_banned(): void
    {
        $this->userRepoMock->method('isQuicktaskerUserBanned')->willReturn(true);
        $this->userRepoMock->expects($this->never())->method('banQuicktaskerUserForSpam');
        $this->logServiceMock->expects($this->never())->method('log');
        $this->userRepoMock->method('getQuicktaskerUserById')->willReturn((object) ['id' => 42]);

        $result = $this->service->banQuicktaskerUserForSpam(42);

        $this->assertSame(42, $result->id);
    }

    public function test_banQuicktaskerUserForSpam_writes_ban_and_log_when_not_banned(): void
    {
        $this->userRepoMock->method('isQuicktaskerUserBanned')->willReturn(false);
        $this->userRepoMock->expects($this->once())->method('banQuicktaskerUserForSpam')->with(42);
        $this->userRepoMock->method('getQuicktaskerUserById')->willReturn((object) ['id' => 42, 'name' => 'spammer']);
        $this->logServiceMock->expects($this->once())->method('log');

        $this->service->banQuicktaskerUserForSpam(42);
    }

    // ── unbanQuicktaskerUser cleanup ────────────────────────────────────────

    public function test_unbanQuicktaskerUser_clears_all_ban_transients(): void
    {
        global $wpqtRateLimitTestStore;
        $wpqtRateLimitTestStore['wpqt_ban_offense_42'] = 5;
        $wpqtRateLimitTestStore['wpqt_ban_offense_42_exp'] = time() + 1800;
        $wpqtRateLimitTestStore['wpqt_offense_lock_write_global_42'] = 1;

        $this->userRepoMock->method('unbanQuicktaskerUser')->willReturn(1);
        $this->userRepoMock->method('getQuicktaskerUserById')->willReturn((object) ['id' => 42]);

        $this->service->unbanQuicktaskerUser(42);

        $this->assertArrayNotHasKey('wpqt_ban_offense_42', $wpqtRateLimitTestStore);
        $this->assertArrayNotHasKey('wpqt_ban_offense_42_exp', $wpqtRateLimitTestStore);
        $this->assertArrayNotHasKey('wpqt_offense_lock_write_global_42', $wpqtRateLimitTestStore);
    }

    public function test_unbanQuicktaskerUser_throws_when_repository_update_fails(): void
    {
        $this->userRepoMock->method('unbanQuicktaskerUser')->willReturn(false);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to unban user');
        $this->service->unbanQuicktaskerUser(42);
    }
}
