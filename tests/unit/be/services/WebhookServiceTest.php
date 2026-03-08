<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_WEBHOOKS')) {
    define('TABLE_WP_QUICKTASKER_WEBHOOKS', 'wp_quicktasker_webhooks');
}

// Define webhook target type constants
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK', 'task');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_QUICKTASKER')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_QUICKTASKER', 'quicktasker');
}

// Define webhook target action constants
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED', 'created');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED', 'updated');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED', 'deleted');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_ADDED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_ADDED', 'file_added');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_REMOVED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_REMOVED', 'file_removed');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_ADDED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_ADDED', 'label_added');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_REMOVED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_REMOVED', 'label_removed');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED', 'assigned');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED', 'unassigned');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_STAGE_CHANGED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_STAGE_CHANGED', 'stage_changed');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ARCHIVED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ARCHIVED', 'archived');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_RESTORED_ARCHIVED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_RESTORED_ARCHIVED', 'restored_archived');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED', 'completed');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED', 'not_completed');
}

// Define log constants
if (!defined('WP_QT_LOG_TYPE_WEBHOOK')) {
    define('WP_QT_LOG_TYPE_WEBHOOK', 'webhook');
}
if (!defined('WP_QT_LOG_CREATED_BY_WEBHOOK')) {
    define('WP_QT_LOG_CREATED_BY_WEBHOOK', 'webhook');
}
if (!defined('WP_QT_LOG_STATUS_ERROR')) {
    define('WP_QT_LOG_STATUS_ERROR', 'error');
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/WebhookService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Webhooks\WebhookService;

class WebhookServiceTest extends TestCase
{
    private $service;
    private $wpdbMock;
    private $wpdbBackup;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['insert', 'update', 'delete'])
            ->getMock();

        // Add insert_id property
        $this->wpdbMock->insert_id = 0;

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->service = new WebhookService();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_isTargetTypeTaskWebhook_returns_true_for_task_type()
    {
        $webhook = (object)['target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK];

        $result = $this->service->isTargetTypeTaskWebhook($webhook);

        $this->assertTrue($result);
    }

    public function test_isTargetTypeTaskWebhook_returns_false_for_non_task_type()
    {
        $webhook = (object)['target_type' => 'other'];

        $result = $this->service->isTargetTypeTaskWebhook($webhook);

        $this->assertFalse($result);
    }

    public function test_isTargetTypeTaskWebhook_returns_false_for_quicktasker_type()
    {
        $webhook = (object)['target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_QUICKTASKER];

        $result = $this->service->isTargetTypeTaskWebhook($webhook);

        $this->assertFalse($result);
    }

    public function test_isTargetTypeQuicktaskerWebhook_returns_true_for_quicktasker_type()
    {
        $webhook = (object)['target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_QUICKTASKER];

        $result = $this->service->isTargetTypeQuicktaskerWebhook($webhook);

        $this->assertTrue($result);
    }

    public function test_isTargetTypeQuicktaskerWebhook_returns_false_for_non_quicktasker_type()
    {
        $webhook = (object)['target_type' => 'other'];

        $result = $this->service->isTargetTypeQuicktaskerWebhook($webhook);

        $this->assertFalse($result);
    }

    public function test_isTargetTypeQuicktaskerWebhook_returns_false_for_task_type()
    {
        $webhook = (object)['target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK];

        $result = $this->service->isTargetTypeQuicktaskerWebhook($webhook);

        $this->assertFalse($result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_created_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_file_added_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_ADDED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_label_added_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_ADDED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_assigned_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_updated_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_stage_changed_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_STAGE_CHANGED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_archived_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ARCHIVED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_restored_archived_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_RESTORED_ARCHIVED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_label_removed_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_REMOVED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_completed_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_PATCH_for_not_completed_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('PATCH', $result);
    }

    public function test_determineWebhookHttpMethod_returns_DELETE_for_deleted_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('DELETE', $result);
    }

    public function test_determineWebhookHttpMethod_returns_DELETE_for_file_removed_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_REMOVED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('DELETE', $result);
    }

    public function test_determineWebhookHttpMethod_returns_DELETE_for_unassigned_action()
    {
        $webhook = (object)['target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('DELETE', $result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_unknown_action()
    {
        $webhook = (object)['target_action' => 'unknown_action'];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_determineWebhookHttpMethod_returns_POST_for_empty_action()
    {
        $webhook = (object)['target_action' => ''];

        $result = $this->service->determineWebhookHttpMethod($webhook);

        $this->assertEquals('POST', $result);
    }

    public function test_createWebhook_requires_service_locator()
    {
        $this->markTestSkipped(
            'createWebhook requires ServiceLocator with TimeRepository and ' .
            'WebhookRepository. Needs integration testing.'
        );
    }

    public function test_createWebhook_throws_exception_on_insert_failure()
    {
        $this->markTestSkipped(
            'createWebhook requires ServiceLocator with TimeRepository and ' .
            'WebhookRepository for proper testing. Needs integration testing.'
        );
    }

    public function test_editWebhook_throws_exception_on_update_failure()
    {
        $webhookId = 5;
        $args = ['webhook_url' => 'https://new-url.com'];

        $this->wpdbMock->expects($this->once())
            ->method('update')
            ->willReturn(false);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to edit the webhook');

        $this->service->editWebhook($webhookId, $args);
    }

    public function test_deleteWebhook_returns_true_on_success()
    {
        $webhookId = 10;

        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->with(
                TABLE_WP_QUICKTASKER_WEBHOOKS,
                ['id' => $webhookId]
            )
            ->willReturn(1);

        $result = $this->service->deleteWebhook($webhookId);

        $this->assertTrue($result);
    }

    public function test_deleteWebhook_throws_exception_on_delete_failure()
    {
        $webhookId = 10;

        $this->wpdbMock->expects($this->once())
            ->method('delete')
            ->willReturn(false);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Failed to delete the webhook');

        $this->service->deleteWebhook($webhookId);
    }

    public function test_handleWebhooks_requires_service_locator()
    {
        $this->markTestSkipped(
            'handleWebhooks requires ServiceLocator for WebhookEventService, ' .
            'WebhookRepository, and LogService. Needs integration testing.'
        );
    }

    public function test_processWebhook_requires_service_locator()
    {
        $this->markTestSkipped(
            'processWebhook calls sendWebhookRequest which uses WordPress ' .
            'wp_remote_request function. Requires integration testing.'
        );
    }

    public function test_sendWebhookRequest_requires_wordpress_functions()
    {
        $this->markTestSkipped(
            'sendWebhookRequest uses wp_remote_request, wp_remote_retrieve_response_code, ' .
            'and is_wp_error which are WordPress functions. Requires integration testing.'
        );
    }

    /**
     * Integration test note:
     * 
     * Methods requiring integration tests:
     * - createWebhook: Needs ServiceLocator with TimeRepository and WebhookRepository
     * - editWebhook: Needs ServiceLocator with WebhookRepository
     * - handleWebhooks: Complex method using multiple services (WebhookEventService, WebhookRepository, LogService)
     * - processWebhook: Processes webhook data and calls sendWebhookRequest
     * - sendWebhookRequest: Uses WordPress HTTP API functions (wp_remote_request, etc.)
     * 
     * These should be tested with:
     * 1. Mock HTTP responses for wp_remote_request
     * 2. ServiceLocator properly configured with mocked services
     * 3. Test various webhook scenarios (task, quicktasker, different actions)
     * 4. Test error handling and logging
     */
    public function test_service_locator_methods_require_integration_testing()
    {
        $this->markTestIncomplete(
            'Methods using ServiceLocator and WordPress functions require integration testing ' .
            'with proper service registration and HTTP mocking.'
        );
    }

    public function test_all_http_methods_are_covered()
    {
        // Verify that all defined actions are handled
        $postActions = [
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_ADDED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_ADDED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED
        ];

        $patchActions = [
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_STAGE_CHANGED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ARCHIVED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_RESTORED_ARCHIVED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_REMOVED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED
        ];

        $deleteActions = [
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_REMOVED,
            WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED
        ];

        foreach ($postActions as $action) {
            $webhook = (object)['target_action' => $action];
            $this->assertEquals('POST', $this->service->determineWebhookHttpMethod($webhook), "Action $action should be POST");
        }

        foreach ($patchActions as $action) {
            $webhook = (object)['target_action' => $action];
            $this->assertEquals('PATCH', $this->service->determineWebhookHttpMethod($webhook), "Action $action should be PATCH");
        }

        foreach ($deleteActions as $action) {
            $webhook = (object)['target_action' => $action];
            $this->assertEquals('DELETE', $this->service->determineWebhookHttpMethod($webhook), "Action $action should be DELETE");
        }
    }
}
