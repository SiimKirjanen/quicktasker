<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PipelineAccessService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineAccessService;
use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;

class PipelineAccessServiceTest extends TestCase
{
    private const ADMIN_USER_ID = 1;
    private const LIMITED_USER_ID = 2;

    private $service;

    /** @var int[] IDs of the boards that exist. */
    private $existingBoardIds;

    /** @var array<int, int[]> Board IDs per WordPress user ID that the user has been added to. */
    private $userBoardIds;

    protected function setUp(): void
    {
        $this->existingBoardIds = [1, 2, 3];
        $this->userBoardIds = [];

        $pipelineRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['checkIfPipelineExists'])
            ->getMock();
        $pipelineRepoMock->method('checkIfPipelineExists')->willReturnCallback(function ($id) {
            return in_array((int) $id, $this->existingBoardIds, true);
        });

        $pipelineAccessRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessAllPipelines', 'getPipelineIdsByWPUserId', 'addWPUserToPipeline', 'removeWPUserFromPipeline'])
            ->getMock();
        $pipelineAccessRepoMock->method('canAccessAllPipelines')->willReturnCallback(function ($userId) {
            return self::ADMIN_USER_ID === $userId;
        });
        $pipelineAccessRepoMock->method('getPipelineIdsByWPUserId')->willReturnCallback(function ($userId) {
            $pipelineIds = $this->userBoardIds[$userId] ?? [];
            sort($pipelineIds);

            return $pipelineIds;
        });
        $pipelineAccessRepoMock->method('addWPUserToPipeline')->willReturnCallback(function ($userId, $pipelineId) {
            if (!in_array($pipelineId, $this->userBoardIds[$userId] ?? [], true)) {
                $this->userBoardIds[$userId][] = $pipelineId;
            }
        });
        $pipelineAccessRepoMock->method('removeWPUserFromPipeline')->willReturnCallback(function ($userId, $pipelineId) {
            $this->userBoardIds[$userId] = array_values(array_diff($this->userBoardIds[$userId] ?? [], [$pipelineId]));
        });

        ServiceLocator::register('PipelineRepository', $pipelineRepoMock);
        ServiceLocator::register('PipelineAccessRepository', $pipelineAccessRepoMock);

        $this->service = new PipelineAccessService();
    }

    private function boards(...$ids)
    {
        return array_map(function ($id) {
            return (object) ['id' => (string) $id];
        }, $ids);
    }

    public function test_administrator_can_access_every_board()
    {
        $this->assertNull($this->service->getAccessiblePipelineIds(self::ADMIN_USER_ID));
        $this->assertTrue($this->service->canAccessPipeline(self::ADMIN_USER_ID, 3));
    }

    public function test_administrator_keeps_every_board_when_filtering()
    {
        $pipelines = $this->service->filterAccessiblePipelines(self::ADMIN_USER_ID, $this->boards(1, 2, 3));

        $this->assertSame(['1', '2', '3'], array_column($pipelines, 'id'));
    }

    public function test_limited_user_without_boards_cannot_access_any_board()
    {
        $this->assertSame([], $this->service->getAccessiblePipelineIds(self::LIMITED_USER_ID));
        $this->assertFalse($this->service->canAccessPipeline(self::LIMITED_USER_ID, 1));
        $this->assertSame([], $this->service->filterAccessiblePipelines(self::LIMITED_USER_ID, $this->boards(1, 2, 3)));
    }

    public function test_limited_user_can_only_access_boards_they_are_added_to()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [2];

        $this->assertTrue($this->service->canAccessPipeline(self::LIMITED_USER_ID, 2));
        $this->assertTrue($this->service->canAccessPipeline(self::LIMITED_USER_ID, '2'));
        $this->assertFalse($this->service->canAccessPipeline(self::LIMITED_USER_ID, 3));
    }

    public function test_filtering_keeps_only_accessible_boards_and_reindexes_them()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1, 3];

        $pipelines = $this->service->filterAccessiblePipelines(self::LIMITED_USER_ID, $this->boards(1, 2, 3));

        $this->assertSame([0, 1], array_keys($pipelines));
        $this->assertSame(['1', '3'], array_column($pipelines, 'id'));
    }

    public function test_adding_a_user_to_a_board_gives_access_to_it()
    {
        $this->service->addWPUserToPipeline(self::LIMITED_USER_ID, 3);

        $this->assertTrue($this->service->canAccessPipeline(self::LIMITED_USER_ID, 3));
    }

    public function test_setting_boards_adds_new_and_removes_old_boards()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1, 2];

        $this->service->setWPUserPipelines(self::LIMITED_USER_ID, [2, '3', 3]);

        $this->assertSame([2, 3], $this->service->getAccessiblePipelineIds(self::LIMITED_USER_ID));
    }

    public function test_setting_no_boards_removes_every_board()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1, 2];

        $this->service->setWPUserPipelines(self::LIMITED_USER_ID, []);

        $this->assertSame([], $this->service->getAccessiblePipelineIds(self::LIMITED_USER_ID));
    }

    public function test_setting_a_missing_board_throws_and_changes_nothing()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];

        try {
            $this->service->setWPUserPipelines(self::LIMITED_USER_ID, [2, 999]);
            $this->fail('Expected PipelineMissingException');
        } catch (PipelineMissingException $e) {
            // Expected.
        }

        $this->assertSame([1], $this->service->getAccessiblePipelineIds(self::LIMITED_USER_ID));
    }
}
