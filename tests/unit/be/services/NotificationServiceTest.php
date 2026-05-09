<?php
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!function_exists('esc_html')) {
    function esc_html($s) { return $s; }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/NotificationService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Notification\NotificationService;
use WPQT\Services\ServiceLocator;

class NotificationServiceTest extends TestCase
{
    private $service;
    private $notificationRepo;
    private $userRepo;
    private $timeRepo;

    protected function setUp(): void
    {
        parent::setUp();

        $this->notificationRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['insertNotification', 'getNotificationById', 'getNotificationsForUserOnPipeline', 'markAsRead'])
            ->getMock();

        $this->userRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getAssignedUsersByTaskId', 'getAssignedWPUsersByTaskIds'])
            ->getMock();

        $this->timeRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getCurrentUTCTime', 'modifyUTCTime'])
            ->getMock();

        ServiceLocator::register('NotificationRepository', $this->notificationRepo);
        ServiceLocator::register('UserRepository', $this->userRepo);
        ServiceLocator::register('TimeRepository', $this->timeRepo);

        $this->service = new NotificationService();
    }

    public function testServiceCanBeInstantiated(): void
    {
        $this->assertInstanceOf(NotificationService::class, $this->service);
    }

    public function testCreateNotificationDelegatesToRepository(): void
    {
        $now = '2026-05-08 12:00:00';
        $expected = (object) ['id' => 1];

        $this->timeRepo->expects($this->once())
            ->method('getCurrentUTCTime')
            ->willReturn($now);

        $this->notificationRepo->expects($this->once())
            ->method('insertNotification')
            ->with(7, 11, 'wp-user', 'hello', $now)
            ->willReturn($expected);

        $result = $this->service->createNotification(7, 11, 'wp-user', 'hello');

        $this->assertSame($expected, $result);
    }

    public function testGetNotificationsForViewerClampsTooSmallMaxAge(): void
    {
        $this->timeRepo->expects($this->once())
            ->method('modifyUTCTime')
            ->with(-NotificationService::DEFAULT_MAX_AGE_HOURS, 'hour')
            ->willReturn('2026-05-07 12:00:00');

        $this->notificationRepo->expects($this->once())
            ->method('getNotificationsForUserOnPipeline')
            ->with(1, 2, 'wp-user', '2026-05-07 12:00:00')
            ->willReturn([]);

        $this->service->getNotificationsForViewer(1, 2, 'wp-user', 0);
    }

    public function testGetNotificationsForViewerClampsTooLargeMaxAge(): void
    {
        $this->timeRepo->expects($this->once())
            ->method('modifyUTCTime')
            ->with(-NotificationService::MAX_MAX_AGE_HOURS, 'hour')
            ->willReturn('2026-04-08 12:00:00');

        $this->notificationRepo->method('getNotificationsForUserOnPipeline')->willReturn([]);

        $this->service->getNotificationsForViewer(1, 2, 'wp-user', 100000);
    }

    public function testMarkAsReadThrowsWhenNotificationNotFound(): void
    {
        $this->notificationRepo->expects($this->once())
            ->method('getNotificationById')
            ->with(99)
            ->willReturn(null);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Notification not found');

        $this->service->markAsRead(99, 1, 'wp-user');
    }

    public function testMarkAsReadThrowsWhenNotificationBelongsToOtherUser(): void
    {
        $this->notificationRepo->method('getNotificationById')
            ->willReturn((object) ['id' => 1, 'user_id' => 2, 'user_type' => 'wp-user']);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Notification does not belong to the current user');

        $this->service->markAsRead(1, 5, 'wp-user');
    }

    public function testMarkAsReadThrowsWhenUserTypeMismatches(): void
    {
        $this->notificationRepo->method('getNotificationById')
            ->willReturn((object) ['id' => 1, 'user_id' => 2, 'user_type' => 'wp-user']);

        $this->expectException(Exception::class);
        $this->expectExceptionMessage('Notification does not belong to the current user');

        $this->service->markAsRead(1, 2, 'quicktasker');
    }

    public function testMarkAsReadDelegatesToRepositoryWhenAuthorized(): void
    {
        $this->notificationRepo->method('getNotificationById')
            ->willReturn((object) ['id' => 1, 'user_id' => 2, 'user_type' => 'wp-user']);

        $this->notificationRepo->expects($this->once())
            ->method('markAsRead')
            ->with(1)
            ->willReturn((object) ['id' => 1, 'mark_as_read' => 1]);

        $result = $this->service->markAsRead(1, 2, 'wp-user');

        $this->assertEquals(1, $result->mark_as_read);
    }

    public function testNotifyTaskAssigneesNotifiesQuicktaskerAndWordPressUsers(): void
    {
        $this->timeRepo->method('getCurrentUTCTime')->willReturn('2026-05-08 12:00:00');

        $this->userRepo->method('getAssignedUsersByTaskId')
            ->with(50)
            ->willReturn([
                (object) ['id' => 10, 'user_type' => 'quicktasker'],
                (object) ['id' => 11, 'user_type' => 'quicktasker'],
            ]);

        $this->userRepo->method('getAssignedWPUsersByTaskIds')
            ->with([50])
            ->willReturn([
                (object) ['id' => 20, 'user_type' => 'wp-user'],
                (object) ['id' => 21, 'user_type' => 'wp-user'],
            ]);

        $expectedMessage = 'Task "Foo" was archived';

        $calls = [];
        $this->notificationRepo->method('insertNotification')
            ->willReturnCallback(function ($pipelineId, $userId, $userType, $text, $date) use (&$calls) {
                $calls[] = [$pipelineId, $userId, $userType, $text];
                return (object) ['id' => $userId];
            });

        $this->service->notifyTaskAssignees(
            7,
            50,
            'Task "%s" was archived',
            'Foo',
            null
        );

        $this->assertCount(4, $calls);
        $this->assertSame([7, 10, 'quicktasker', $expectedMessage], $calls[0]);
        $this->assertSame([7, 11, 'quicktasker', $expectedMessage], $calls[1]);
        $this->assertSame([7, 20, 'wp-user', $expectedMessage], $calls[2]);
        $this->assertSame([7, 21, 'wp-user', $expectedMessage], $calls[3]);
    }

    public function testNotifyTaskAssigneesSkipsActorWordPressUser(): void
    {
        $this->timeRepo->method('getCurrentUTCTime')->willReturn('2026-05-08 12:00:00');

        $this->userRepo->method('getAssignedUsersByTaskId')->willReturn([]);
        $this->userRepo->method('getAssignedWPUsersByTaskIds')
            ->willReturn([
                (object) ['id' => 20, 'user_type' => 'wp-user'],
                (object) ['id' => 21, 'user_type' => 'wp-user'],
            ]);

        $notifiedIds = [];
        $this->notificationRepo->method('insertNotification')
            ->willReturnCallback(function ($pipelineId, $userId) use (&$notifiedIds) {
                $notifiedIds[] = $userId;
                return (object) ['id' => $userId];
            });

        $this->service->notifyTaskAssignees(7, 50, 'Task "%s" deleted', 'Bar', 21);

        $this->assertSame([20], $notifiedIds);
    }

    public function testNotifyTaskAssigneesActorSkipDoesNotApplyToQuicktaskerUsers(): void
    {
        $this->timeRepo->method('getCurrentUTCTime')->willReturn('2026-05-08 12:00:00');

        $this->userRepo->method('getAssignedUsersByTaskId')->willReturn([
            (object) ['id' => 21, 'user_type' => 'quicktasker'],
        ]);
        $this->userRepo->method('getAssignedWPUsersByTaskIds')->willReturn([]);

        $this->notificationRepo->expects($this->once())
            ->method('insertNotification')
            ->willReturn((object) ['id' => 21]);

        $this->service->notifyTaskAssignees(7, 50, 'Task "%s" deleted', 'Bar', 21);
    }

    public function testNotifyTaskAssigneesSwallowsPerUserExceptions(): void
    {
        $this->timeRepo->method('getCurrentUTCTime')->willReturn('2026-05-08 12:00:00');

        $this->userRepo->method('getAssignedUsersByTaskId')->willReturn([
            (object) ['id' => 10, 'user_type' => 'quicktasker'],
            (object) ['id' => 11, 'user_type' => 'quicktasker'],
        ]);
        $this->userRepo->method('getAssignedWPUsersByTaskIds')->willReturn([]);

        $callCount = 0;
        $this->notificationRepo->method('insertNotification')
            ->willReturnCallback(function () use (&$callCount) {
                $callCount++;
                if ($callCount === 1) {
                    throw new Exception('boom');
                }
                return (object) ['id' => 11];
            });

        $this->service->notifyTaskAssignees(7, 50, 'Task "%s" deleted', 'Bar', null);

        $this->assertSame(2, $callCount, 'Second user should still be notified after first failure');
    }

    public function testNotifyTaskAssigneesHandlesEmptyAssigneeLists(): void
    {
        $this->userRepo->method('getAssignedUsersByTaskId')->willReturn([]);
        $this->userRepo->method('getAssignedWPUsersByTaskIds')->willReturn([]);

        $this->notificationRepo->expects($this->never())->method('insertNotification');

        $this->service->notifyTaskAssignees(7, 50, 'Task "%s" deleted', 'Bar', null);
    }
}
