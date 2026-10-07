<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define automation action constants
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK', 'archive_task');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER', 'assign_user');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY', 'new_entity_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_SEND_SLACK_MESSAGE')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_SEND_SLACK_MESSAGE', 'send_slack_message');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL', 'deleted_entity_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL', 'task_assigned_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL', 'task_unassigned_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL', 'task_public_comment_added_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL', 'task_private_comment_added_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_ADDED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_ADDED_EMAIL', 'task_attachment_added_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_DELETED_EMAIL')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_DELETED_EMAIL', 'task_attachment_deleted_email');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_CREATE_TASK')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_CREATE_TASK', 'create_task');
}

// Define automation action target type constants
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER', 'quicktasker');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER', 'wp-user');
}

// Define automation target type constants
if (!defined('WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK')) {
    define('WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK', 'task');
}

// Define automation trigger constants
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE', 'task_done');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE', 'task_not_done');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED', 'task_created');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED', 'task_deleted');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED', 'task_assigned');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED', 'task_unassigned');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED', 'task_public_comment_added');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED', 'task_private_comment_added');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_ADDED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_ADDED', 'task_attachment_added');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_DELETED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_DELETED', 'task_attachment_deleted');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_WOOCOMMERCE_ORDER_ADDED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_WOOCOMMERCE_ORDER_ADDED', 'woocommerce_order_added');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_CREATED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_CREATED', 'seatreg_booking_created');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED', 'seatreg_booking_approved');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED_VIA_MANAGER')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED_VIA_MANAGER', 'seatreg_booking_approved_via_manager');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING', 'seatreg_booking_pending');
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING_VIA_MANAGER')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING_VIA_MANAGER', 'seatreg_booking_pending_via_manager');
}

// Define table constant
if (!defined('TABLE_WP_QUICKTASKER_AUTOMATIONS')) {
    define('TABLE_WP_QUICKTASKER_AUTOMATIONS', 'wp_quicktasker_automations');
}

// Automation actions that send board data out of the site
if (!defined('WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS')) {
    define('WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS', [WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY, WP_QUICKTASKER_AUTOMATION_ACTION_SEND_SLACK_MESSAGE]);
}

// Define log constants
if (!defined('WP_QT_LOG_STATUS_ERROR')) {
    define('WP_QT_LOG_STATUS_ERROR', 'error');
}
if (!defined('WP_QT_LOG_CREATED_BY_AUTOMATION')) {
    define('WP_QT_LOG_CREATED_BY_AUTOMATION', 'automation');
}

if (!function_exists('get_current_user_id')) {
    function get_current_user_id()
    {
        return 1;
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/LogService.php';
require_once __DIR__ . '/../../../../php/services/AutomationService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Automation\AutomationService;
use WPQT\Services\ServiceLocator;

class AutomationServiceTest extends TestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = new AutomationService();
    }

    // Tests for isAssignUserAction()
    public function test_isAssignUserAction_returns_true_for_quicktasker_user_with_target_id()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER,
            'automation_action_target_id' => 123
        ];

        $result = $this->service->isAssignUserAction($automation);

        $this->assertTrue($result);
    }

    public function test_isAssignUserAction_returns_true_for_wp_user_with_target_id()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER,
            'automation_action_target_id' => 456
        ];

        $result = $this->service->isAssignUserAction($automation);

        $this->assertTrue($result);
    }

    public function test_isAssignUserAction_returns_false_for_null_target_id()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER,
            'automation_action_target_id' => null
        ];

        $result = $this->service->isAssignUserAction($automation);

        $this->assertFalse($result);
    }

    public function test_isAssignUserAction_returns_false_for_wrong_action()
    {
        $automation = (object)[
            'automation_action' => 'other_action',
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER,
            'automation_action_target_id' => 123
        ];

        $result = $this->service->isAssignUserAction($automation);

        $this->assertFalse($result);
    }

    public function test_isAssignUserAction_returns_false_for_invalid_target_type()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => 'invalid_type',
            'automation_action_target_id' => 123
        ];

        $result = $this->service->isAssignUserAction($automation);

        $this->assertFalse($result);
    }

    // Tests for isTaskCreateAction()
    public function test_isTaskCreateAction_returns_true_for_create_task_action()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_CREATE_TASK
        ];

        $result = $this->service->isTaskCreateAction($automation);

        $this->assertTrue($result);
    }

    public function test_isTaskCreateAction_returns_false_for_other_action()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER
        ];

        $result = $this->service->isTaskCreateAction($automation);

        $this->assertFalse($result);
    }

    // Tests for isTaskDoneTrigger()
    public function test_isTaskDoneTrigger_returns_true_for_task_done_trigger()
    {
        $automation = (object)[
            'automation_trigger' => WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE
        ];

        $result = $this->service->isTaskDoneTrigger($automation);

        $this->assertTrue($result);
    }

    public function test_isTaskDoneTrigger_returns_false_for_other_trigger()
    {
        $automation = (object)[
            'automation_trigger' => WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED
        ];

        $result = $this->service->isTaskDoneTrigger($automation);

        $this->assertFalse($result);
    }

    // Test ServiceLocator-dependent methods
    public function test_handleAutomations_requires_service_locator()
    {
        $this->markTestSkipped(
            'handleAutomations requires ServiceLocator with AutomationRepository, ' .
            'LogService, and complex automation execution. Needs integration testing.'
        );
    }

    public function test_processAutomations_requires_service_locator()
    {
        $this->markTestSkipped(
            'processAutomations requires ServiceLocator with AutomationRepository, ' .
            'LogService, and get_current_user_id(). Needs integration testing.'
        );
    }

    public function test_executeAutomation_requires_service_locator()
    {
        $this->markTestSkipped(
            'executeAutomation is complex with many service dependencies. ' .
            'Needs integration testing.'
        );
    }

    public function test_createAutomation_requires_service_locator()
    {
        $this->markTestSkipped(
            'createAutomation requires ServiceLocator with AutomationRepository, ' .
            'TimeRepository, and SecretsService. Needs integration testing.'
        );
    }

    public function test_updateAutomationActiveState_requires_service_locator()
    {
        $this->markTestSkipped(
            'updateAutomationActiveState requires ServiceLocator with ' .
            'AutomationRepository. Needs integration testing.'
        );
    }

    public function test_deleteAutomation_requires_service_locator()
    {
        $this->markTestSkipped(
            'deleteAutomation requires ServiceLocator with AutomationRepository. ' .
            'Needs integration testing.'
        );
    }

    /**
     * Integration test note:
     * 
     * AutomationService is a complex orchestration service with many dependencies:
     * 
     * Key methods requiring integration tests:
     * 
     * 1. handleAutomations($boardId, $targetId, $targetType, $automationTrigger, $data)
     *    - Orchestrates automation execution with retry logic (maxRerunCounter = 2)
     *    - Merges executedAutomations and failedAutomations across reruns
     *    - Returns object with executedAutomations and failedAutomations arrays
     * 
     * 2. processAutomations($boardId, $targetId, $targetType, $automationTrigger, $data)
     *    - Retrieves active automations from repository
     *    - Executes each automation and handles exceptions
     *    - Logs success/failure for each automation
     *    - Returns executedAutomations, failedAutomations, and rerunTriggers
     * 
     * 3. executeAutomation($automation, $targetId, $data)
     *    - Massive method with ~20 different trigger/action combinations
     *    - Integrates with: TaskService, UserService, EmailService, SlackService, 
     *      PipelineRepository, UserRepository, TaskRepository, TimeRepository
     *    - Handles complex data flows and nested service calls
     * 
     * 4. createAutomation(...) - Creates automation with optional metadata encryption
     * 5. updateAutomationActiveState($automationId, $active) - Toggles automation
     * 6. deleteAutomation($automationId) - Removes automation
     * 
     * Pure logic methods (fully tested):
     * - isAssignUserAction() - Validates assign user action and target type
     * - isTaskCreateAction() - Checks create task action
     * - isTaskDoneTrigger() - Checks task done trigger
     * 
     * Private validation methods (not directly testable but used internally):
     * - 20+ is*Trigger() and is*Action() methods for routing logic
     */
    public function test_service_locator_integration_required()
    {
        $this->markTestIncomplete(
            'AutomationService is a complex orchestration service requiring extensive ' .
            'integration testing with ServiceLocator, multiple repositories, and external services.'
        );
    }

    public function test_isAssignUserAction_with_zero_target_id()
    {
        // Edge case: 0 might be falsy but !== null
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER,
            'automation_action_target_id' => 0
        ];

        $result = $this->service->isAssignUserAction($automation);

        // 0 is not null, but in PHP context it might fail !== null check
        // The actual code checks !== null, so 0 should pass
        $this->assertTrue($result);
    }

    public function test_public_methods_return_boolean()
    {
        $automation = (object)[
            'automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER,
            'automation_action_target_type' => WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER,
            'automation_action_target_id' => 1,
            'automation_trigger' => WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE
        ];

        $this->assertIsBool($this->service->isAssignUserAction($automation));
        $this->assertIsBool($this->service->isTaskCreateAction($automation));
        $this->assertIsBool($this->service->isTaskDoneTrigger($automation));
    }

    /**
     * Runs processAutomations() with one automation, a creator who can or can't use the board, and logging on or off.
     *
     * The automation's trigger matches no action, so it never runs, and only the creator check is tested.
     *
     * @return array The result, the creators that were checked as [created_by, pipeline_id], and the log messages.
     */
    private function processAutomation($automationAction, $createdBy, $creatorCanUseBoard, $shouldLog = true)
    {
        $automation = (object) [
            'id'                 => '9',
            'pipeline_id'        => '2',
            'automation_trigger' => 'test-trigger',
            'automation_action'  => $automationAction,
            'created_by'         => $createdBy,
        ];
        $creatorChecks = [];
        $logs = [];

        $automationRepo = $this->getMockBuilder(stdClass::class)->addMethods(['getActiveAutomations'])->getMock();
        $automationRepo->method('getActiveAutomations')->willReturn([$automation]);
        ServiceLocator::register('AutomationRepository', $automationRepo);

        $logService = $this->getMockBuilder(stdClass::class)->addMethods(['shouldLog', 'log'])->getMock();
        $logService->method('shouldLog')->willReturn($shouldLog);
        $logService->method('log')->willReturnCallback(function ($message, $data) use (&$logs) {
            $logs[] = [$message, $data];
        });
        ServiceLocator::register('LogService', $logService);

        $pipelineAccessService = $this->getMockBuilder(stdClass::class)->addMethods(['canCreatorUseBoard'])->getMock();
        $pipelineAccessService->method('canCreatorUseBoard')->willReturnCallback(
            function ($creator, $pipelineId) use (&$creatorChecks, $creatorCanUseBoard) {
                $creatorChecks[] = [$creator, $pipelineId];

                return $creatorCanUseBoard;
            }
        );
        ServiceLocator::register('PipelineAccessService', $pipelineAccessService);

        $result = $this->service->processAutomations(2, 5, 'task', 'test-trigger');

        return [$result, $creatorChecks, $logs];
    }

    public function test_sendsBoardData_is_true_only_for_email_and_slack_actions()
    {
        $this->assertTrue($this->service->sendsBoardData((object) ['automation_action' => WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS[0]]));
        $this->assertFalse($this->service->sendsBoardData((object) ['automation_action' => WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK]));
    }

    public function test_processAutomations_skips_and_logs_a_sending_automation_whose_creator_cannot_use_the_board()
    {
        [$result, $creatorChecks, $logs] = $this->processAutomation(WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS[0], '7', false);

        $this->assertSame([['7', '2']], $creatorChecks);
        $this->assertCount(1, $logs);
        $this->assertStringStartsWith('Automation skipped on ', $logs[0][0]);
        $this->assertStringEndsWith(' (its creator lost access to the board or the permission to manage settings)', $logs[0][0]);
        $this->assertSame([
            'type'          => 'task',
            'type_id'       => 5,
            'log_status'    => WP_QT_LOG_STATUS_ERROR,
            'created_by'    => WP_QT_LOG_CREATED_BY_AUTOMATION,
            'created_by_id' => '9',
            'pipeline_id'   => 2,
        ], $logs[0][1]);
        $this->assertSame([], $result->executedAutomations);
        $this->assertSame([], $result->failedAutomations);
    }

    public function test_processAutomations_skips_without_logging_when_logging_is_off()
    {
        [, $creatorChecks, $logs] = $this->processAutomation(WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS[0], '7', false, false);

        $this->assertSame([['7', '2']], $creatorChecks);
        $this->assertSame([], $logs);
    }

    public function test_processAutomations_runs_a_sending_automation_whose_creator_can_use_the_board()
    {
        [, $creatorChecks, $logs] = $this->processAutomation(WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS[0], '7', true);

        $this->assertSame([['7', '2']], $creatorChecks);
        $this->assertSame([], $logs);
    }

    public function test_processAutomations_checks_a_sending_automation_without_a_creator_as_an_unknown_creator()
    {
        [, $creatorChecks] = $this->processAutomation(WP_QUICKTASKER_AUTOMATION_SENDING_ACTIONS[0], null, true);

        $this->assertSame([[null, '2']], $creatorChecks);
    }

    public function test_processAutomations_runs_an_automation_that_acts_inside_the_board_whatever_its_creator_can_do()
    {
        [, $creatorChecks, $logs] = $this->processAutomation(WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK, '7', false);

        $this->assertSame([], $creatorChecks);
        $this->assertSame([], $logs);
    }
}
