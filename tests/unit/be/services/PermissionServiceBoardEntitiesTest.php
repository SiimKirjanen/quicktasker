<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!function_exists('get_current_user_id')) {
    function get_current_user_id() {
        return 1;
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PermissionService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Permission\PermissionService;
use WPQT\Services\ServiceLocator;

/**
 * Board checks of admin API routes, and what they remember about refused entities that do not exist.
 */
class PermissionServiceBoardEntitiesTest extends TestCase
{
    /** @var array<string, bool> Whether each "type:id" can be accessed. */
    private $accessible;

    /** @var array<string, bool> Whether each "type:id" exists. */
    private $existing;

    protected function setUp(): void
    {
        $this->accessible = [];
        $this->existing = [];

        $pipelineAccessService = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canAccessEntity', 'entityExists'])
            ->getMock();
        $pipelineAccessService->method('canAccessEntity')->willReturnCallback(function ($userId, $type, $id) {
            return $this->accessible["$type:$id"] ?? false;
        });
        $pipelineAccessService->method('entityExists')->willReturnCallback(function ($type, $id) {
            return $this->existing["$type:$id"] ?? true;
        });
        ServiceLocator::register('PipelineAccessService', $pipelineAccessService);

        PermissionService::takeMissingBoardEntityType();
    }

    public function test_accessible_entities_are_allowed_and_nothing_is_remembered()
    {
        $this->accessible = ['pipeline:1' => true, 'task:2' => true];

        $this->assertTrue(PermissionService::canAccessBoardEntities([['pipeline', 1], ['task', 2]]));
        $this->assertNull(PermissionService::takeMissingBoardEntityType());
    }

    public function test_an_existing_entity_on_another_board_is_refused_without_being_missing()
    {
        $this->accessible = ['pipeline:1' => true];

        $this->assertFalse(PermissionService::canAccessBoardEntities([['pipeline', 1], ['task', 2]]));
        $this->assertNull(PermissionService::takeMissingBoardEntityType());
    }

    public function test_a_missing_entity_is_refused_and_remembered_once()
    {
        $this->accessible = ['pipeline:1' => true];
        $this->existing = ['task:2' => false];

        $this->assertFalse(PermissionService::canAccessBoardEntities([['pipeline', 1], ['task', 2]]));
        $this->assertSame('task', PermissionService::takeMissingBoardEntityType());
        $this->assertNull(PermissionService::takeMissingBoardEntityType());
    }

    public function test_the_first_refused_entity_decides()
    {
        // The board exists but the user has not been added to it, so the missing task is not reported.
        $this->existing = ['task:2' => false];

        $this->assertFalse(PermissionService::canAccessBoardEntities([['pipeline', 1], ['task', 2]]));
        $this->assertNull(PermissionService::takeMissingBoardEntityType());
    }

    public function test_a_later_check_forgets_an_earlier_missing_entity()
    {
        $this->existing = ['pipeline:9' => false];
        PermissionService::canAccessBoardEntities([['pipeline', 9]]);
        $this->accessible = ['pipeline:1' => true];

        $this->assertTrue(PermissionService::canAccessBoardEntities([['pipeline', 1]]));
        $this->assertNull(PermissionService::takeMissingBoardEntityType());
    }
}
