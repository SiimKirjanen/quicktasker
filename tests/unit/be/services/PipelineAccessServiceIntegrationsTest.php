<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('WP_QT_LOG_TYPE_API_TOKEN')) {
    define('WP_QT_LOG_TYPE_API_TOKEN', 'api_token');
}
if (!defined('WP_QT_LOG_TYPE_WEBHOOK')) {
    define('WP_QT_LOG_TYPE_WEBHOOK', 'webhook');
}
if (!defined('WP_QT_LOG_CREATED_BY_ADMIN')) {
    define('WP_QT_LOG_CREATED_BY_ADMIN', 'admin');
}

if (!function_exists('get_current_user_id')) {
    function get_current_user_id() {
        return 1;
    }
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/PipelineAccessService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Pipeline\PipelineAccessService;
use WPQT\Services\ServiceLocator;

/**
 * API tokens and webhooks a WordPress user created, which are deleted when the user loses access.
 */
class PipelineAccessServiceIntegrationsTest extends TestCase
{
    private const USER_ID = 7;

    private $service;

    /** @var array Tokens the user created. */
    private $tokens;

    /** @var array Webhooks the user created. */
    private $webhooks;

    /** @var array<int, int[]|null> The board filter of each token and webhook lookup. */
    private $lookups;

    /** @var array Deleted tokens as [board ID, token ID], and webhooks as webhook IDs. */
    private $deletedTokens;
    private $deletedWebhooks;

    /** @var array Messages and data of the log entries. */
    private $logs;

    protected function setUp(): void
    {
        $this->tokens = [
            (object) ['id' => '4', 'pipeline_id' => '2', 'name' => 'Zapier'],
            (object) ['id' => '5', 'pipeline_id' => '3', 'name' => 'CRM'],
            (object) ['id' => '6', 'pipeline_id' => '3', 'name' => 'Backup'],
        ];
        $this->webhooks = [
            (object) ['id' => '8', 'pipeline_id' => '3', 'target_type' => 'task', 'target_action' => 'created', 'webhook_url' => 'https://example.com'],
        ];
        $this->lookups = [];
        $this->deletedTokens = [];
        $this->deletedWebhooks = [];
        $this->logs = [];

        $tokenRepo = $this->getMockBuilder(stdClass::class)->addMethods(['getTokensCreatedByWPUser'])->getMock();
        $tokenRepo->method('getTokensCreatedByWPUser')->willReturnCallback(function ($userId, $pipelineIds) {
            $this->lookups[] = $pipelineIds;

            return self::USER_ID === $userId ? $this->tokens : [];
        });
        ServiceLocator::register('ApiTokenRepository', $tokenRepo);

        $webhookRepo = $this->getMockBuilder(stdClass::class)->addMethods(['getWebhooksCreatedByWPUser', 'generateWebhookName'])->getMock();
        $webhookRepo->method('getWebhooksCreatedByWPUser')->willReturnCallback(function ($userId, $pipelineIds) {
            $this->lookups[] = $pipelineIds;

            return self::USER_ID === $userId ? $this->webhooks : [];
        });
        $webhookRepo->method('generateWebhookName')->willReturnCallback(function ($webhook) {
            return $webhook->target_type . '.' . $webhook->target_action;
        });
        ServiceLocator::register('WebhookRepository', $webhookRepo);

        $tokenService = $this->getMockBuilder(stdClass::class)->addMethods(['deleteApiToken'])->getMock();
        $tokenService->method('deleteApiToken')->willReturnCallback(function ($pipelineId, $tokenId) {
            $this->deletedTokens[] = [$pipelineId, $tokenId];

            return 1;
        });
        ServiceLocator::register('ApiTokenService', $tokenService);

        $webhookService = $this->getMockBuilder(stdClass::class)->addMethods(['deleteWebhook'])->getMock();
        $webhookService->method('deleteWebhook')->willReturnCallback(function ($webhookId) {
            $this->deletedWebhooks[] = $webhookId;

            return true;
        });
        ServiceLocator::register('WebhookService', $webhookService);

        $logService = $this->getMockBuilder(stdClass::class)->addMethods(['log'])->getMock();
        $logService->method('log')->willReturnCallback(function ($message, $data) {
            $this->logs[] = [$message, $data];
        });
        ServiceLocator::register('LogService', $logService);

        $this->service = new PipelineAccessService();
    }

    public function test_counts_tokens_and_webhooks_per_board()
    {
        $this->assertSame([
            ['pipeline_id' => 2, 'api_token_count' => 1, 'webhook_count' => 0],
            ['pipeline_id' => 3, 'api_token_count' => 2, 'webhook_count' => 1],
        ], $this->service->countIntegrationsCreatedByWPUser(self::USER_ID, [2, 3]));
        $this->assertSame([[2, 3], [2, 3]], $this->lookups);
    }

    public function test_counts_nothing_for_a_user_without_tokens_or_webhooks()
    {
        $this->assertSame([], $this->service->countIntegrationsCreatedByWPUser(99, [2, 3]));
    }

    public function test_deletes_and_logs_each_token_and_webhook()
    {
        $deleted = $this->service->deleteIntegrationsCreatedByWPUser(self::USER_ID, [2, 3], 'Anna was removed from the board');

        $this->assertSame([['2', '4'], ['3', '5'], ['3', '6']], $this->deletedTokens);
        $this->assertSame(['8'], $this->deletedWebhooks);
        $this->assertSame([
            'API token Zapier deleted because Anna was removed from the board',
            'API token CRM deleted because Anna was removed from the board',
            'API token Backup deleted because Anna was removed from the board',
            'Webhook task.created deleted because Anna was removed from the board',
        ], array_column($this->logs, 0));
        $this->assertSame(
            ['type' => 'webhook', 'type_id' => '8', 'user_id' => 1, 'created_by' => 'admin', 'created_by_id' => 1, 'pipeline_id' => '3'],
            $this->logs[3][1]
        );
        $this->assertSame([
            ['pipeline_id' => 2, 'api_token_count' => 1, 'webhook_count' => 0],
            ['pipeline_id' => 3, 'api_token_count' => 2, 'webhook_count' => 1],
        ], $deleted);
    }

    public function test_deletes_on_every_board_when_no_boards_are_given()
    {
        $this->service->deleteIntegrationsCreatedByWPUser(self::USER_ID, null, 'Anna was deleted');

        $this->assertSame([null, null], $this->lookups);
    }
}
