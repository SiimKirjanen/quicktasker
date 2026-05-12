<?php
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES')) {
    define('TABLE_WP_QUICKTASKER_USER_NOTIFICATION_PREFERENCES', 'wp_quicktasker_user_notification_preferences');
}

if (!defined('ARRAY_A')) {
    define('ARRAY_A', 'ARRAY_A');
}

if (!function_exists('wp_json_encode')) {
    function wp_json_encode($data)
    {
        return json_encode($data);
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/NotificationPreferencesRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Notification\NotificationPreferencesRepository;
use WPQT\Services\ServiceLocator;

class NotificationPreferencesRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'query'])
            ->getMock();

        $GLOBALS['wpdb'] = $this->wpdbMock;

        $timeRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getCurrentUTCTime'])
            ->getMock();
        $timeRepo->method('getCurrentUTCTime')->willReturn('2026-01-01 00:00:00');
        ServiceLocator::register('TimeRepository', $timeRepo);

        $this->repository = new NotificationPreferencesRepository();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_get_returns_null_when_no_row()
    {
        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn(null);

        $this->assertNull($this->repository->get(1, 'wp-user'));
    }

    public function test_get_returns_decoded_row()
    {
        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn([
            'filter'                => 'unread',
            'max_age_hours'         => 72,
            'selected_pipeline_ids' => '[3,5]',
        ]);

        $result = $this->repository->get(1, 'wp-user');

        $this->assertSame('unread', $result['filter']);
        $this->assertSame(72, $result['max_age_hours']);
        $this->assertSame([3, 5], $result['selected_pipeline_ids']);
    }

    public function test_get_returns_null_pipeline_ids_when_column_null()
    {
        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn([
            'filter'                => 'all',
            'max_age_hours'         => 24,
            'selected_pipeline_ids' => null,
        ]);

        $result = $this->repository->get(1, 'wp-user');

        $this->assertNull($result['selected_pipeline_ids']);
    }

    public function test_insert_runs_prepared_query()
    {
        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('query')->with('PREPARED');

        $this->repository->insert(1, 'wp-user', 'unread', 72, [3, 5]);
    }

    public function test_insert_handles_null_selected_pipeline_ids()
    {
        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('query')->with('PREPARED');

        $this->repository->insert(1, 'wp-user', 'all', 24, null);
    }

    public function test_update_runs_prepared_query()
    {
        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('query')->with('PREPARED');

        $this->repository->update(1, 'wp-user', 'unread', 72, [3, 5]);
    }

    public function test_update_handles_null_selected_pipeline_ids()
    {
        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('query')->with('PREPARED');

        $this->repository->update(1, 'wp-user', 'all', 24, null);
    }

    public function test_get_notify_flag_returns_null_for_unknown_type()
    {
        $this->assertNull($this->repository->getNotifyFlag(1, 'wp-user', 'not_a_real_type'));
    }
}
