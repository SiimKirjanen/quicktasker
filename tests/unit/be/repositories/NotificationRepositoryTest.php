<?php
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_NOTIFICATIONS')) {
    define('TABLE_WP_QUICKTASKER_NOTIFICATIONS', 'wp_quicktasker_notifications');
}

require_once __DIR__ . '/../../../../php/repositories/NotificationRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Notification\NotificationRepository;

class NotificationRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'get_results', 'insert', 'update', 'query'])
            ->getMock();

        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new NotificationRepository();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getNotificationById_returns_row_when_found()
    {
        $expected = (object) [
            'id' => 7,
            'pipeline_id' => 1,
            'user_id' => 2,
            'user_type' => 'wp-user',
            'date' => '2026-05-08 10:00:00',
            'text' => 'hi',
            'mark_as_read' => 0,
        ];

        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('get_row')->with('PREPARED')->willReturn($expected);

        $result = $this->repository->getNotificationById(7);

        $this->assertSame($expected, $result);
    }

    public function test_getNotificationById_returns_null_when_missing()
    {
        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn(null);

        $this->assertNull($this->repository->getNotificationById(999));
    }

    public function test_getNotificationsForUserOnPipeline_returns_results()
    {
        $rows = [
            (object) ['id' => 1, 'text' => 'a'],
            (object) ['id' => 2, 'text' => 'b'],
        ];

        $this->wpdbMock->expects($this->once())->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->expects($this->once())->method('get_results')->with('PREPARED')->willReturn($rows);

        $result = $this->repository->getNotificationsForUserOnPipeline(1, 2, 'wp-user', '2026-05-07 00:00:00');

        $this->assertSame($rows, $result);
    }

    public function test_getNotificationsForUser_without_pipeline_filter_returns_results()
    {
        $rows = [(object) ['id' => 1], (object) ['id' => 2]];
        $capturedSql = null;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturnCallback(function ($sql) use (&$capturedSql) {
                $capturedSql = $sql;
                return 'PREPARED';
            });
        $this->wpdbMock->expects($this->once())->method('get_results')->with('PREPARED')->willReturn($rows);

        $result = $this->repository->getNotificationsForUser(2, 'wp-user', '2026-05-07 00:00:00');

        $this->assertSame($rows, $result);
        $this->assertStringNotContainsString('pipeline_id IN', $capturedSql);
    }

    public function test_getNotificationsForUser_with_pipeline_filter_includes_in_clause()
    {
        $rows = [(object) ['id' => 1]];
        $capturedSql = null;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturnCallback(function ($sql) use (&$capturedSql) {
                $capturedSql = $sql;
                return 'PREPARED';
            });
        $this->wpdbMock->expects($this->once())->method('get_results')->willReturn($rows);

        $result = $this->repository->getNotificationsForUser(2, 'wp-user', '2026-05-07 00:00:00', [3, 4]);

        $this->assertSame($rows, $result);
        $this->assertStringContainsString('pipeline_id IN (%d,%d)', $capturedSql);
    }

    public function test_markNotificationsAsReadForUser_with_empty_ids_returns_zero()
    {
        $this->wpdbMock->expects($this->never())->method('prepare');
        $this->wpdbMock->expects($this->never())->method('query');

        $this->assertSame(0, $this->repository->markNotificationsAsReadForUser(2, 'wp-user', []));
    }

    public function test_markNotificationsAsReadForUser_runs_update()
    {
        $capturedSql = null;

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturnCallback(function ($sql) use (&$capturedSql) {
                $capturedSql = $sql;
                return 'PREPARED';
            });
        $this->wpdbMock->expects($this->once())->method('query')->with('PREPARED')->willReturn(2);

        $result = $this->repository->markNotificationsAsReadForUser(2, 'wp-user', [5, 6]);

        $this->assertSame(2, $result);
        $this->assertStringContainsString('id IN (%d,%d)', $capturedSql);
        $this->assertStringNotContainsString('pipeline_id', $capturedSql);
    }

    public function test_insertNotification_returns_inserted_row()
    {
        $inserted = (object) [
            'id' => 42,
            'pipeline_id' => 3,
            'user_id' => 4,
            'user_type' => 'quicktasker',
            'date' => '2026-05-08 12:00:00',
            'text' => 'task assigned',
            'mark_as_read' => 0,
        ];

        $this->wpdbMock->expects($this->once())
            ->method('insert')
            ->with(
                TABLE_WP_QUICKTASKER_NOTIFICATIONS,
                $this->callback(function ($payload) {
                    return $payload['pipeline_id'] === 3
                        && $payload['user_id'] === 4
                        && $payload['user_type'] === 'quicktasker'
                        && $payload['text'] === 'task assigned'
                        && $payload['date'] === '2026-05-08 12:00:00'
                        && $payload['mark_as_read'] === 0;
                })
            )
            ->willReturn(1);

        $this->wpdbMock->insert_id = 42;

        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn($inserted);

        $result = $this->repository->insertNotification(3, 4, 'quicktasker', 'task assigned', '2026-05-08 12:00:00');

        $this->assertSame($inserted, $result);
    }

    public function test_insertNotification_throws_when_insert_fails()
    {
        $this->wpdbMock->method('insert')->willReturn(false);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Failed to insert notification');

        $this->repository->insertNotification(1, 2, 'wp-user', 'x', '2026-05-08 00:00:00');
    }

    public function test_markAsRead_updates_and_returns_row()
    {
        $row = (object) ['id' => 9, 'mark_as_read' => 1];

        $this->wpdbMock->expects($this->once())
            ->method('update')
            ->with(
                TABLE_WP_QUICKTASKER_NOTIFICATIONS,
                ['mark_as_read' => 1],
                ['id' => 9]
            )
            ->willReturn(1);

        $this->wpdbMock->method('prepare')->willReturn('PREPARED');
        $this->wpdbMock->method('get_row')->willReturn($row);

        $result = $this->repository->markAsRead(9);

        $this->assertSame($row, $result);
    }
}
