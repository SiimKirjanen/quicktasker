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

    /** @var array<string, int|null> Board ID per "entity type:entity ID". */
    private $entityBoards;

    /** @var array<string, object> Owning entity per "custom_field:ID" or "upload:ID". */
    private $attachedEntities;

    /** @var int Number of entity lookups made through the repository. */
    private $entityLookups;

    protected function setUp(): void
    {
        $this->existingBoardIds = [1, 2, 3];
        $this->userBoardIds = [];
        $this->entityLookups = 0;
        $this->entityBoards = [
            'task:10'  => 1,
            'task:20'  => 2,
            'task:30'  => null,
            'stage:11' => 1,
        ];
        $this->attachedEntities = [
            'custom_field:5' => (object) ['entity_type' => 'task', 'entity_id' => '10'],
            'custom_field:6' => (object) ['entity_type' => 'quicktasker', 'entity_id' => '3'],
            'upload:7'       => (object) ['entity_type' => 'task', 'entity_id' => '20'],
        ];

        $pipelineRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['checkIfPipelineExists'])
            ->getMock();
        $pipelineRepoMock->method('checkIfPipelineExists')->willReturnCallback(function ($id) {
            return in_array((int) $id, $this->existingBoardIds, true);
        });

        $pipelineAccessRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessAllPipelines', 'getPipelineIdsByWPUserId', 'addWPUserToPipeline', 'removeWPUserFromPipeline', 'getPipelineIdOfEntity', 'getEntityOf', 'getPipelineIdsByWPUserIds'])
            ->getMock();
        $pipelineAccessRepoMock->method('getPipelineIdOfEntity')->willReturnCallback(function ($entityType, $entityId) {
            $this->entityLookups++;

            return $this->entityBoards[$entityType . ':' . $entityId] ?? null;
        });
        $pipelineAccessRepoMock->method('getPipelineIdsByWPUserIds')->willReturnCallback(function ($userIds) {
            return array_intersect_key($this->userBoardIds, array_flip($userIds));
        });
        $pipelineAccessRepoMock->method('getEntityOf')->willReturnCallback(function ($ownerType, $ownerId) {
            $this->entityLookups++;

            return $this->attachedEntities[$ownerType . ':' . $ownerId] ?? null;
        });
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

        $removedPipelineIds = $this->service->setWPUserPipelines(self::LIMITED_USER_ID, [2, '3', 3]);

        $this->assertSame([2, 3], $this->service->getAccessiblePipelineIds(self::LIMITED_USER_ID));
        $this->assertSame([1], $removedPipelineIds);
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

    public function test_administrator_can_access_any_entity_without_lookups()
    {
        $this->assertTrue($this->service->canAccessEntity(self::ADMIN_USER_ID, 'task', 30));
        $this->assertTrue($this->service->canAccessEntity(self::ADMIN_USER_ID, 'upload', 999));
        $this->assertSame(0, $this->entityLookups);
    }

    public function test_user_entities_are_not_limited_by_boards()
    {
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'quicktasker', 3));
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'wp-user', 4));
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'users', null));
    }

    public function test_limited_user_can_access_entities_on_their_boards_only()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];

        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'pipeline', 1));
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'task', 10));
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'stage', 11));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'pipeline', 2));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'task', 20));
    }

    public function test_limited_user_cannot_access_missing_entities_or_entities_without_a_board()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1, 2];

        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'task', 999));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'task', 30));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'pipeline', null));
    }

    public function test_custom_fields_and_uploads_follow_the_entity_they_belong_to()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];

        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'custom_field', 5));
        $this->assertTrue($this->service->canAccessEntity(self::LIMITED_USER_ID, 'custom_field', 6));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'upload', 7));
        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'custom_field', 999));
    }

    public function test_unknown_entity_types_are_denied()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];

        $this->assertFalse($this->service->canAccessEntity(self::LIMITED_USER_ID, 'comment', 1));
    }

    public function test_administrator_keeps_every_item_including_items_without_a_board()
    {
        $items = [(object) ['pipeline_id' => '1'], (object) ['pipeline_id' => null]];

        $this->assertSame($items, $this->service->filterItemsOnAccessiblePipelines(self::ADMIN_USER_ID, $items));
    }

    public function test_limited_user_keeps_only_items_on_their_boards()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [2];
        $items = [
            (object) ['id' => 'a', 'pipeline_id' => '1'],
            (object) ['id' => 'b', 'pipeline_id' => '2'],
            (object) ['id' => 'c', 'pipeline_id' => null],
        ];

        $filtered = $this->service->filterItemsOnAccessiblePipelines(self::LIMITED_USER_ID, $items);

        $this->assertSame(['b'], array_column($filtered, 'id'));
    }

    public function test_adds_board_access_to_wp_users()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [2, 3];
        $users = [(object) ['id' => (string) self::ADMIN_USER_ID], (object) ['id' => (string) self::LIMITED_USER_ID], (object) ['id' => '9']];

        $users = $this->service->addPipelineAccessToWPUsers($users);

        $this->assertSame([true, false, false], array_column($users, 'can_access_all_pipelines'));
        $this->assertSame([[], [2, 3], []], array_column($users, 'pipeline_ids'));
    }

    public function test_tasks_app_users_are_limited_by_boards_only_for_wordpress_users()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];

        $this->assertTrue($this->service->canUserAccessEntity(self::LIMITED_USER_ID, WP_QT_WORDPRESS_USER_TYPE, 'task', 10));
        $this->assertFalse($this->service->canUserAccessEntity(self::LIMITED_USER_ID, WP_QT_WORDPRESS_USER_TYPE, 'task', 20));
        $this->assertTrue($this->service->canUserAccessEntity(self::LIMITED_USER_ID, WP_QT_QUICKTASKER_USER_TYPE, 'task', 20));
    }

    public function test_tasks_app_lists_are_filtered_only_for_wordpress_users()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1];
        $items = [(object) ['id' => 'a', 'pipeline_id' => '1'], (object) ['id' => 'b', 'pipeline_id' => '2']];

        $this->assertSame(['a'], array_column($this->service->filterItemsForUser(self::LIMITED_USER_ID, WP_QT_WORDPRESS_USER_TYPE, $items), 'id'));
        $this->assertSame(['a', 'b'], array_column($this->service->filterItemsForUser(self::LIMITED_USER_ID, WP_QT_QUICKTASKER_USER_TYPE, $items), 'id'));
    }
}
