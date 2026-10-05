<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PipelineService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineService;
use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;

class PipelineServicePrimaryBoardTest extends TestCase
{
    private $service;

    /** @var array<int, object> Boards that exist, keyed by ID. */
    private $boards;

    /** @var array<int, int> Primary board choice per WordPress user ID. */
    private $userChoices;

    /** @var int|null ID of the site-wide primary board. */
    private $sitePrimaryId;

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
        $this->sitePrimaryId = 1;

        $pipelineRepoMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getUserPrimaryPipelineId', 'setUserPrimaryPipelineId', 'getPipelineById', 'getActivePipeline', 'checkIfPipelineExists'])
            ->getMock();
        $pipelineRepoMock->method('getUserPrimaryPipelineId')->willReturnCallback(function ($userId) {
            return $this->userChoices[$userId] ?? null;
        });
        $pipelineRepoMock->method('setUserPrimaryPipelineId')->willReturnCallback(function ($userId, $pipelineId) {
            $this->userChoices[$userId] = (int) $pipelineId;
        });
        $pipelineRepoMock->method('getPipelineById')->willReturnCallback(function ($id) {
            $this->boardQueries++;

            return $this->boards[(int) $id] ?? null;
        });
        $pipelineRepoMock->method('getActivePipeline')->willReturnCallback(function () {
            $this->boardQueries++;

            return null === $this->sitePrimaryId ? null : ($this->boards[$this->sitePrimaryId] ?? null);
        });
        $pipelineRepoMock->method('checkIfPipelineExists')->willReturnCallback(function ($id) {
            return isset($this->boards[(int) $id]);
        });

        ServiceLocator::register('PipelineRepository', $pipelineRepoMock);

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
        $this->sitePrimaryId = null;

        $this->assertNull($this->service->getPrimaryPipelineForUser(10));
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

    public function test_resolving_from_a_loaded_list_uses_the_users_choice_without_querying_boards()
    {
        $this->service->setPrimaryPipelineForUser(10, 3);
        $this->boardQueries = 0;

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

    public function test_resolving_from_a_loaded_list_returns_null_without_a_primary_board()
    {
        $this->boards[1]->is_primary = '0';

        $this->assertNull($this->service->getPrimaryPipelineForUser(10, array_values($this->boards)));
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
