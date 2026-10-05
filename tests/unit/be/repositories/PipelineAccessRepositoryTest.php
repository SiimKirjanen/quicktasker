<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_WP_USER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_WP_USER_PIPELINES', 'wp_quicktasker_wp_user_pipelines');
}

if (!function_exists('user_can')) {
    function user_can($userId, $capability)
    {
        return in_array($capability, $GLOBALS['wpqt_test_user_caps'][$userId] ?? [], true);
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/PipelineAccessRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineAccessRepository;
use WPQT\Services\ServiceLocator;

class PipelineAccessRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_col', 'get_results', 'query', 'delete'])
            ->getMock();
        $this->wpdbMock->method('prepare')->willReturnCallback(function ($query, ...$args) {
            if (1 === count($args) && is_array($args[0])) {
                $args = $args[0];
            }

            return vsprintf(str_replace(['%s', '%d'], ["'%s'", '%s'], $query), $args);
        });

        $GLOBALS['wpdb'] = $this->wpdbMock;
        $GLOBALS['wpqt_test_user_caps'] = [
            1 => ['manage_options'],
            2 => ['quicktasker_admin_role'],
        ];

        $timeRepo = $this->getMockBuilder(stdClass::class)
            ->addMethods(['getCurrentUTCTime'])
            ->getMock();
        $timeRepo->method('getCurrentUTCTime')->willReturn('2026-01-01 00:00:00');
        ServiceLocator::register('TimeRepository', $timeRepo);

        $this->repository = new PipelineAccessRepository();
    }

    protected function tearDown(): void
    {
        $GLOBALS['wpdb'] = $this->wpdbBackup;
        unset($GLOBALS['wpqt_test_user_caps']);
    }

    public function test_only_administrators_can_access_every_board()
    {
        $this->assertTrue($this->repository->canAccessAllPipelines(1));
        $this->assertFalse($this->repository->canAccessAllPipelines(2));
    }

    public function test_getPipelineIdsByWPUserId_returns_integer_ids_of_the_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_col')
            ->with($this->stringContains('WHERE wp_user_id = 7'))
            ->willReturn(['2', '5']);

        $this->assertSame([2, 5], $this->repository->getPipelineIdsByWPUserId(7));
    }

    public function test_getPipelineIdsByWPUserIds_groups_board_ids_by_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($this->stringContains('WHERE wp_user_id IN (7,8,9)'))
            ->willReturn([
                (object) ['wp_user_id' => '7', 'pipeline_id' => '2'],
                (object) ['wp_user_id' => '9', 'pipeline_id' => '2'],
                (object) ['wp_user_id' => '7', 'pipeline_id' => '4'],
            ]);

        $this->assertSame([7 => [2, 4], 9 => [2]], $this->repository->getPipelineIdsByWPUserIds([7, 8, 9]));
    }

    public function test_getPipelineIdsByWPUserIds_skips_the_query_without_users()
    {
        $this->wpdbMock->expects($this->never())->method('get_results');

        $this->assertSame([], $this->repository->getPipelineIdsByWPUserIds([]));
    }

    public function test_addWPUserToPipeline_ignores_an_existing_row()
    {
        $this->wpdbMock->expects($this->once())
            ->method('query')
            ->with($this->logicalAnd(
                $this->stringContains('INSERT IGNORE INTO wp_quicktasker_wp_user_pipelines'),
                $this->stringContains("VALUES (7, 3, '2026-01-01 00:00:00')")
            ))
            ->willReturn(1);

        $this->repository->addWPUserToPipeline(7, 3);
    }

    public function test_addWPUserToPipeline_throws_when_the_insert_fails()
    {
        $this->wpdbMock->method('query')->willReturn(false);

        $this->expectException(\Exception::class);

        $this->repository->addWPUserToPipeline(7, 3);
    }

    public function test_removeWPUserFromPipeline_deletes_the_users_row_for_the_board()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_wp_user_pipelines', ['wp_user_id' => 7, 'pipeline_id' => 3], ['%d', '%d'])
            ->willReturn(1);

        $this->repository->removeWPUserFromPipeline(7, 3);
    }

    public function test_removeWPUserFromPipeline_throws_when_the_delete_fails()
    {
        $this->wpdbMock->method('delete')->willReturn(false);

        $this->expectException(\Exception::class);

        $this->repository->removeWPUserFromPipeline(7, 3);
    }

    public function test_deletePipelineAccess_deletes_every_row_of_the_board()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_wp_user_pipelines', ['pipeline_id' => 3], ['%d']);

        $this->repository->deletePipelineAccess(3);
    }

    public function test_deleteWPUserAccess_deletes_every_row_of_the_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_wp_user_pipelines', ['wp_user_id' => 7], ['%d']);

        $this->repository->deleteWPUserAccess(7);
    }
}
