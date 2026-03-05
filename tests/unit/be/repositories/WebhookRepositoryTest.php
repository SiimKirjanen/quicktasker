<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_WEBHOOKS')) {
    define('TABLE_WP_QUICKTASKER_WEBHOOKS', 'wp_quicktasker_webhooks');
}

// Define webhook constants used in the repository
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK', 'task');
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED', 'created');
}

// Mock WordPress function wp_parse_args if it doesn't exist
if (!function_exists('wp_parse_args')) {
    function wp_parse_args($args, $defaults = array()) {
        if (is_array($args)) {
            return array_merge($defaults, $args);
        }
        return $defaults;
    }
}

require_once __DIR__ . '/../../../../php/repositories/WebhookRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Webhooks\WebhookRepository;

class WebhookRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'get_results'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new WebhookRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getPipelineWebhooks_returns_webhooks_for_pipeline()
    {
        $pipelineId = 5;
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE pipeline_id = %d";
        $preparedSql = "PREPARED_SQL";

        $expectedResults = [
            (object)[
                'id' => 1,
                'pipeline_id' => 5,
                'target_type' => 'task',
                'target_id' => null,
                'target_action' => 'created',
                'webhook_url' => 'https://example.com/webhook1',
                'webhook_confirm' => 1,
                'active' => 1,
                'created_at' => '2024-01-01 12:00:00'
            ],
            (object)[
                'id' => 2,
                'pipeline_id' => 5,
                'target_type' => 'task',
                'target_id' => null,
                'target_action' => 'updated',
                'webhook_url' => 'https://example.com/webhook2',
                'webhook_confirm' => 0,
                'active' => 1,
                'created_at' => '2024-01-02 12:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pipelineId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->getPipelineWebhooks($pipelineId);

        $this->assertSame($expectedResults, $result);
    }

    public function test_getPipelineWebhooks_returns_empty_array_when_no_webhooks_found()
    {
        $pipelineId = 999;
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE pipeline_id = %d";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pipelineId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getPipelineWebhooks($pipelineId);

        $this->assertSame([], $result);
    }

    public function test_getWebhookById_returns_webhook_object_when_found()
    {
        $webhookId = 42;
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE id = %d";
        $preparedSql = "PREPARED_SQL";

        $expectedWebhook = (object)[
            'id' => 42,
            'pipeline_id' => 5,
            'target_type' => 'task',
            'target_id' => null,
            'target_action' => 'created',
            'webhook_url' => 'https://example.com/webhook',
            'webhook_confirm' => 1,
            'active' => 1,
            'created_at' => '2024-01-01 12:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $webhookId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedWebhook);

        $result = $this->repository->getWebhookById($webhookId);

        $this->assertSame($expectedWebhook, $result);
    }

    public function test_getWebhookById_returns_null_when_not_found()
    {
        $webhookId = 999;
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE id = %d";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $webhookId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getWebhookById($webhookId);

        $this->assertNull($result);
    }

    public function test_findRelatedWebhooks_with_pipeline_id_and_default_args()
    {
        $pipelineId = 5;
        $args = [];
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedResults = [
            (object)[
                'id' => 1,
                'pipeline_id' => 5,
                'target_type' => 'task',
                'target_id' => null,
                'target_action' => 'created',
                'webhook_url' => 'https://example.com/webhook',
                'webhook_confirm' => 1,
                'active' => 1,
                'created_at' => '2024-01-01 12:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, [5, 'task', 'created'])
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->findRelatedWebhooks($pipelineId, $args);

        $this->assertSame($expectedResults, $result);
    }

    public function test_findRelatedWebhooks_with_pipeline_id_and_custom_args()
    {
        $pipelineId = 5;
        $args = [
            'target_type' => 'comment',
            'target_action' => 'updated'
        ];
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedResults = [
            (object)[
                'id' => 2,
                'pipeline_id' => 5,
                'target_type' => 'comment',
                'target_id' => null,
                'target_action' => 'updated',
                'webhook_url' => 'https://example.com/webhook2',
                'webhook_confirm' => 0,
                'active' => 1,
                'created_at' => '2024-01-02 12:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, [5, 'comment', 'updated'])
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->findRelatedWebhooks($pipelineId, $args);

        $this->assertSame($expectedResults, $result);
    }

    public function test_findRelatedWebhooks_with_null_pipeline_id()
    {
        $pipelineId = null;
        $args = [];
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id IS NULL AND target_type = %s AND target_action = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedResults = [
            (object)[
                'id' => 3,
                'pipeline_id' => null,
                'target_type' => 'task',
                'target_id' => null,
                'target_action' => 'created',
                'webhook_url' => 'https://example.com/global-webhook',
                'webhook_confirm' => 1,
                'active' => 1,
                'created_at' => '2024-01-03 12:00:00'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, ['task', 'created'])
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedResults);

        $result = $this->repository->findRelatedWebhooks($pipelineId, $args);

        $this->assertSame($expectedResults, $result);
    }

    public function test_findRelatedWebhooks_returns_empty_array_when_no_results()
    {
        $pipelineId = 999;
        $args = [];
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, [999, 'task', 'created'])
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->findRelatedWebhooks($pipelineId, $args);

        $this->assertSame([], $result);
    }

    public function test_findRelatedWebhooks_returns_empty_array_when_get_results_returns_non_array()
    {
        $pipelineId = 5;
        $args = [];
        $expectedSql = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, [5, 'task', 'created'])
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->findRelatedWebhooks($pipelineId, $args);

        $this->assertSame([], $result);
    }

    public function test_generateWebhookName_returns_formatted_string()
    {
        $webhook = (object)[
            'id' => 1,
            'target_type' => 'task',
            'target_action' => 'created',
            'webhook_url' => 'https://example.com/webhook'
        ];

        $result = $this->repository->generateWebhookName($webhook);

        $expected = 'Webhook (type: task, action: created, URL: https://example.com/webhook)';
        $this->assertSame($expected, $result);
    }

    public function test_generateWebhookName_with_different_webhook_data()
    {
        $webhook = (object)[
            'id' => 2,
            'target_type' => 'comment',
            'target_action' => 'updated',
            'webhook_url' => 'https://api.example.com/hooks/123'
        ];

        $result = $this->repository->generateWebhookName($webhook);

        $expected = 'Webhook (type: comment, action: updated, URL: https://api.example.com/hooks/123)';
        $this->assertSame($expected, $result);
    }
}
