<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PipelineService.php';
require_once __DIR__ . '/../../../../php/services/PipelineAccessService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineAccessService;
use WPQT\Pipeline\PipelineService;
use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;

class PipelineServicePrimaryBoardTest extends TestCase
{
    /** WordPress users 10, 20 and 30 are administrators. This one is not. */
    private const LIMITED_USER_ID = 40;

    private $service;

    /** @var array<int, object> Boards that exist, keyed by ID. */
    private $boards;

    /** @var array<int, int> Primary board choice per WordPress user ID. */
    private $userChoices;

    /** @var int[] IDs of the WordPress users who can access every board. */
    private $adminUserIds;

    /** @var array<int, int[]> Board IDs per WordPress user ID that the user has been added to. */
    private $userBoardIds;

    /** @var int Number of board queries made through the repository. */
    private $boardQueries;

    protected function setUp(): void
    {
        $this->boardQueries = 0;
        $this->boards = [
            1 => (object) ['id' => '1', 'name' => 'Board 1', 'is_primary' => '1'],
            2 => (object) ['id' => '2', 'name' => 'Board 2', 'is_primary' => '0'],
            3 => (object) ['id' => '3', 'name' => 'Board 3', 'is_primary' => '0'],
        ];
        $this->userChoices = [];
        $this->adminUserIds = [10, 20, 30];
        $this->userBoardIds = [];

        $pipelineRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getUserPrimaryPipelineId', 'setUserPrimaryPipelineId', 'getPipelines', 'checkIfPipelineExists'])
            ->getMock();
        $pipelineRepoMock->method('getUserPrimaryPipelineId')->willReturnCallback(function ($userId) {
            return $this->userChoices[$userId] ?? null;
        });
        $pipelineRepoMock->method('setUserPrimaryPipelineId')->willReturnCallback(function ($userId, $pipelineId) {
            $this->userChoices[$userId] = (int) $pipelineId;
        });
        $pipelineRepoMock->method('getPipelines')->willReturnCallback(function () {
            $this->boardQueries++;

            return array_values($this->boards);
        });
        $pipelineRepoMock->method('checkIfPipelineExists')->willReturnCallback(function ($id) {
            return isset($this->boards[(int) $id]);
        });

        $pipelineAccessRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessAllPipelines', 'getPipelineIdsByWPUserId'])
            ->getMock();
        $pipelineAccessRepoMock->method('canAccessAllPipelines')->willReturnCallback(function ($userId) {
            return in_array($userId, $this->adminUserIds, true);
        });
        $pipelineAccessRepoMock->method('getPipelineIdsByWPUserId')->willReturnCallback(function ($userId) {
            return $this->userBoardIds[$userId] ?? [];
        });

        ServiceLocator::register('PipelineRepository', $pipelineRepoMock);
        ServiceLocator::register('PipelineAccessRepository', $pipelineAccessRepoMock);
        ServiceLocator::register('PipelineAccessService', new PipelineAccessService());

        $this->service = new PipelineService();
    }

    public function test_user_without_a_choice_gets_the_site_wide_primary_board()
    {
        $this->assertSame('1', $this->service->getPrimaryPipelineForUser(10)->id);
    }

    public function test_user_choice_overrides_the_site_wide_primary_board()
    {
        $this->service->setPrimaryPipelineForUser(10, 2);

        $this->assertSame('2', $this->service->getPrimaryPipelineForUser(10)->id);
    }

    public function test_user_choice_does_not_affect_other_users()
    {
        $this->service->setPrimaryPipelineForUser(10, 2);
        $this->service->setPrimaryPipelineForUser(20, 3);

        $this->assertSame('2', $this->service->getPrimaryPipelineForUser(10)->id);
        $this->assertSame('3', $this->service->getPrimaryPipelineForUser(20)->id);
        $this->assertSame('1', $this->service->getPrimaryPipelineForUser(30)->id);
    }

    public function test_choice_of_a_deleted_board_falls_back_to_the_site_wide_primary_board()
    {
        $this->service->setPrimaryPipelineForUser(10, 2);
        unset($this->boards[2]);

        $this->assertSame('1', $this->service->getPrimaryPipelineForUser(10)->id);
    }

    public function test_returns_null_when_there_are_no_boards()
    {
        $this->boards = [];

        $this->assertNull($this->service->getPrimaryPipelineForUser(10));
    }

    public function test_falls_back_to_the_board_with_the_lowest_id_without_a_site_wide_primary_board()
    {
        unset($this->boards[1]);
        $this->boards = [3 => $this->boards[3], 2 => $this->boards[2]];

        $this->assertSame('2', $this->service->getPrimaryPipelineForUser(10)->id);
    }

    public function test_loads_the_boards_once_when_no_list_is_given()
    {
        $this->service->getPrimaryPipelineForUser(10);

        $this->assertSame(1, $this->boardQueries);
    }

    public function test_setting_a_missing_board_as_primary_throws()
    {
        $this->expectException(PipelineMissingException::class);

        $this->service->setPrimaryPipelineForUser(10, 999);
    }

    public function test_setting_a_missing_board_as_primary_keeps_the_previous_choice()
    {
        $this->service->setPrimaryPipelineForUser(10, 3);

        try {
            $this->service->setPrimaryPipelineForUser(10, 999);
        } catch (PipelineMissingException $e) {
            // Expected.
        }

        $this->assertSame('3', $this->service->getPrimaryPipelineForUser(10)->id);
    }

    public function test_limited_user_without_boards_has_no_primary_board()
    {
        $this->assertNull($this->service->getPrimaryPipelineForUser(self::LIMITED_USER_ID));
    }

    public function test_limited_user_gets_the_site_wide_primary_board_when_added_to_it()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [1, 3];

        $this->assertSame('1', $this->service->getPrimaryPipelineForUser(self::LIMITED_USER_ID)->id);
    }

    public function test_limited_user_not_added_to_the_site_wide_primary_board_gets_their_lowest_board()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [3, 2];

        $this->assertSame('2', $this->service->getPrimaryPipelineForUser(self::LIMITED_USER_ID)->id);
    }

    public function test_limited_user_choice_is_ignored_after_losing_access_to_it()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [2, 3];
        $this->service->setPrimaryPipelineForUser(self::LIMITED_USER_ID, 3);
        $this->userBoardIds[self::LIMITED_USER_ID] = [2];

        $this->assertSame('2', $this->service->getPrimaryPipelineForUser(self::LIMITED_USER_ID)->id);
    }

    public function test_limited_user_cannot_set_a_board_they_are_not_added_to_as_primary()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [2];

        $this->expectException(PipelineMissingException::class);

        $this->service->setPrimaryPipelineForUser(self::LIMITED_USER_ID, 3);
    }

    public function test_resolving_from_a_loaded_list_uses_the_users_choice_without_querying_boards()
    {
        $this->service->setPrimaryPipelineForUser(10, 3);

        $primaryPipeline = $this->service->getPrimaryPipelineForUser(10, array_values($this->boards));

        $this->assertSame('3', $primaryPipeline->id);
        $this->assertSame(0, $this->boardQueries);
    }

    public function test_resolving_from_a_loaded_list_falls_back_to_the_site_wide_primary_board()
    {
        $this->service->setPrimaryPipelineForUser(10, 2);
        unset($this->boards[2]);

        $primaryPipeline = $this->service->getPrimaryPipelineForUser(10, array_values($this->boards));

        $this->assertSame('1', $primaryPipeline->id);
        $this->assertSame(0, $this->boardQueries);
    }

    public function test_resolving_from_a_loaded_list_only_considers_boards_the_user_can_access()
    {
        $this->userBoardIds[self::LIMITED_USER_ID] = [3];

        $primaryPipeline = $this->service->getPrimaryPipelineForUser(self::LIMITED_USER_ID, array_values($this->boards));

        $this->assertSame('3', $primaryPipeline->id);
        $this->assertSame(0, $this->boardQueries);
    }

    public function test_markPrimaryPipeline_flags_only_the_given_board()
    {
        $pipelines = $this->service->markPrimaryPipeline(array_values($this->boards), $this->boards[3]);

        $this->assertSame(['0', '0', '1'], array_column($pipelines, 'is_primary'));
    }

    public function test_markPrimaryPipeline_flags_nothing_without_a_primary_board()
    {
        $pipelines = $this->service->markPrimaryPipeline(array_values($this->boards), null);

        $this->assertSame(['0', '0', '0'], array_column($pipelines, 'is_primary'));
    }

    public function test_markPrimaryPipeline_skips_missing_boards()
    {
        $pipelines = $this->service->markPrimaryPipeline([null, $this->boards[2]], $this->boards[2]);

        $this->assertNull($pipelines[0]);
        $this->assertSame('1', $pipelines[1]->is_primary);
    }
}
