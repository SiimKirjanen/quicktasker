<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('TABLE_WP_QUICKTASKER_WP_USER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_WP_USER_PIPELINES', 'wp_quicktasker_wp_user_pipelines');
}

if (!defined('TABLE_WP_QUICKTASKER_USER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_USER_PIPELINES', 'wp_quicktasker_user_pipelines');
}

if (!defined('TABLE_WP_QUICKTASKER_PIPELINES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', 'wp_quicktasker_pipelines');
}

if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_STAGES')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', 'wp_quicktasker_pipeline_stages');
}

if (!defined('TABLE_WP_QUICKTASKER_TASKS')) {
    define('TABLE_WP_QUICKTASKER_TASKS', 'wp_quicktasker_tasks');
}

if (!defined('TABLE_WP_QUICKTASKER_LABELS')) {
    define('TABLE_WP_QUICKTASKER_LABELS', 'wp_quicktasker_labels');
}

if (!defined('TABLE_WP_QUICKTASKER_AUTOMATIONS')) {
    define('TABLE_WP_QUICKTASKER_AUTOMATIONS', 'wp_quicktasker_automations');
}

if (!defined('TABLE_WP_QUICKTASKER_WEBHOOKS')) {
    define('TABLE_WP_QUICKTASKER_WEBHOOKS', 'wp_quicktasker_webhooks');
}

if (!defined('TABLE_WP_QUICKTASKER_API_TOKENS')) {
    define('TABLE_WP_QUICKTASKER_API_TOKENS', 'wp_quicktasker_api_tokens');
}

if (!defined('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS')) {
    define('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS', 'wp_quicktasker_custom_fields');
}

if (!defined('TABLE_WP_QUICKTASKER_UPLOADS')) {
    define('TABLE_WP_QUICKTASKER_UPLOADS', 'wp_quicktasker_uploads');
}

if (!defined('WP_QUICKTASKER_ADMIN_ROLE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE', 'quicktasker_admin_role');
}

if (!defined('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS', 'quicktasker_admin_role_manage_settings');
}

if (!defined('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE')) {
    define('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE', 'quicktasker_admin_role_allow_delete');
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
            ->addMethods(['prepare', 'get_col', 'get_results', 'get_var', 'get_row', 'query', 'delete'])
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
            3 => ['quicktasker_admin_role', 'quicktasker_admin_role_manage_settings'],
            4 => ['quicktasker_admin_role_manage_settings'],
            5 => ['quicktasker_admin_role', 'quicktasker_admin_role_allow_delete'],
            6 => ['quicktasker_admin_role_allow_delete'],
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

    public function test_only_users_with_quicktasker_and_manage_settings_can_manage_integrations()
    {
        $this->assertTrue($this->repository->canManageIntegrations(3));
        $this->assertFalse($this->repository->canManageIntegrations(2));
        $this->assertFalse($this->repository->canManageIntegrations(4));
        $this->assertFalse($this->repository->canManageIntegrations(99));
    }

    public function test_only_users_with_quicktasker_and_allow_delete_can_delete()
    {
        $this->assertTrue($this->repository->canDelete(5));
        $this->assertFalse($this->repository->canDelete(2));
        $this->assertFalse($this->repository->canDelete(6));
        $this->assertFalse($this->repository->canDelete(99));
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
            ->with($this->logicalAnd(
                $this->stringContains('SELECT wp_user_id AS user_id, pipeline_id FROM wp_quicktasker_wp_user_pipelines'),
                $this->stringContains('WHERE wp_user_id IN (7,8,9)')
            ))
            ->willReturn([
                (object) ['user_id' => '7', 'pipeline_id' => '2'],
                (object) ['user_id' => '9', 'pipeline_id' => '2'],
                (object) ['user_id' => '7', 'pipeline_id' => '4'],
            ]);

        $this->assertSame([7 => [2, 4], 9 => [2]], $this->repository->getPipelineIdsByWPUserIds([7, 8, 9]));
    }

    public function test_getPipelineIdsByQuicktaskerUserId_reads_the_quicktasker_users_boards()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_col')
            ->with($this->logicalAnd(
                $this->stringContains('FROM wp_quicktasker_user_pipelines'),
                $this->stringContains('WHERE user_id = 7')
            ))
            ->willReturn(['3']);

        $this->assertSame([3], $this->repository->getPipelineIdsByQuicktaskerUserId(7));
    }

    public function test_getPipelineIdsByQuicktaskerUserIds_groups_board_ids_by_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($this->logicalAnd(
                $this->stringContains('SELECT user_id AS user_id, pipeline_id FROM wp_quicktasker_user_pipelines'),
                $this->stringContains('WHERE user_id IN (4,5)')
            ))
            ->willReturn([
                (object) ['user_id' => '5', 'pipeline_id' => '1'],
            ]);

        $this->assertSame([5 => [1]], $this->repository->getPipelineIdsByQuicktaskerUserIds([4, 5]));
    }

    public function test_getPipelineIdsByQuicktaskerUserIds_skips_the_query_without_users()
    {
        $this->wpdbMock->expects($this->never())->method('get_results');

        $this->assertSame([], $this->repository->getPipelineIdsByQuicktaskerUserIds([]));
    }

    public function test_addQuicktaskerUserToPipeline_ignores_an_existing_row()
    {
        $this->wpdbMock->expects($this->once())
            ->method('query')
            ->with($this->logicalAnd(
                $this->stringContains('INSERT IGNORE INTO wp_quicktasker_user_pipelines'),
                $this->stringContains('(user_id, pipeline_id, created_at)'),
                $this->stringContains("VALUES (7, 3, '2026-01-01 00:00:00')")
            ))
            ->willReturn(1);

        $this->repository->addQuicktaskerUserToPipeline(7, 3);
    }

    public function test_removeQuicktaskerUserFromPipeline_deletes_the_users_row_for_the_board()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_user_pipelines', ['user_id' => 7, 'pipeline_id' => 3], ['%d', '%d'])
            ->willReturn(1);

        $this->repository->removeQuicktaskerUserFromPipeline(7, 3);
    }

    public function test_deleteQuicktaskerUserAccess_deletes_every_row_of_the_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_user_pipelines', ['user_id' => 7], ['%d'])
            ->willReturn(2);

        $this->repository->deleteQuicktaskerUserAccess(7);
    }

    public function test_deleteQuicktaskerUserAccess_throws_when_the_delete_fails()
    {
        $this->wpdbMock->method('delete')->willReturn(false);

        $this->expectException(\Exception::class);

        $this->repository->deleteQuicktaskerUserAccess(7);
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

    public function test_deletePipelineAccess_deletes_every_row_of_the_board_for_both_user_types()
    {
        $deleted = [];
        $this->wpdbMock->expects($this->exactly(2))
            ->method('delete')
            ->willReturnCallback(function ($table, $where, $format) use (&$deleted) {
                $deleted[] = [$table, $where, $format];

                return 1;
            });

        $this->repository->deletePipelineAccess(3);

        $this->assertSame([
            ['wp_quicktasker_wp_user_pipelines', ['pipeline_id' => 3], ['%d']],
            ['wp_quicktasker_user_pipelines', ['pipeline_id' => 3], ['%d']],
        ], $deleted);
    }

    public function test_deleteWPUserAccess_deletes_every_row_of_the_user()
    {
        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with('wp_quicktasker_wp_user_pipelines', ['wp_user_id' => 7], ['%d']);

        $this->repository->deleteWPUserAccess(7);
    }

    public function test_getPipelineIdOfEntity_reads_the_board_of_the_entity()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with('SELECT pipeline_id FROM wp_quicktasker_tasks WHERE id = 12')
            ->willReturn('4');

        $this->assertSame(4, $this->repository->getPipelineIdOfEntity('task', 12));
    }

    public function test_getPipelineIdOfEntity_returns_null_for_a_missing_entity()
    {
        $this->wpdbMock->method('get_var')->willReturn(null);

        $this->assertNull($this->repository->getPipelineIdOfEntity('webhook', 12));
    }

    public function test_getPipelineIdOfEntity_rejects_unknown_entity_types()
    {
        $this->expectException(\InvalidArgumentException::class);

        $this->repository->getPipelineIdOfEntity('comment', 12);
    }

    public function test_getEntityOf_reads_the_entity_an_upload_belongs_to()
    {
        $entity = (object) ['entity_type' => 'task', 'entity_id' => '9'];
        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with('SELECT entity_type, entity_id FROM wp_quicktasker_uploads WHERE id = 3')
            ->willReturn($entity);

        $this->assertSame($entity, $this->repository->getEntityOf('upload', 3));
    }

    public function test_getEntityOf_rejects_unknown_owner_types()
    {
        $this->expectException(\InvalidArgumentException::class);

        $this->repository->getEntityOf('task', 3);
    }

    public function test_entityExists_finds_an_existing_board()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with('SELECT id FROM wp_quicktasker_pipelines WHERE id = 5')
            ->willReturn('5');

        $this->assertTrue($this->repository->entityExists('pipeline', 5));
    }

    public function test_entityExists_is_false_for_a_deleted_task()
    {
        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with('SELECT id FROM wp_quicktasker_tasks WHERE id = 8')
            ->willReturn(null);

        $this->assertFalse($this->repository->entityExists('task', 8));
    }

    public function test_entityExists_treats_types_without_a_table_as_existing()
    {
        $this->wpdbMock->expects($this->never())->method('get_var');

        $this->assertTrue($this->repository->entityExists('quicktasker', 8));
    }
}
