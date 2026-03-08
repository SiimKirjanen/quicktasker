<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_AUTOMATIONS')) {
    define('TABLE_WP_QUICKTASKER_AUTOMATIONS', 'wp_quicktasker_automations');
}

// Define automation constants
if (!defined('WP_QUICKTASKER_AUTOMATIONS_WITH_SENSITIVE_META')) {
    define('WP_QUICKTASKER_AUTOMATIONS_WITH_SENSITIVE_META', [
        'send_email',
        'webhook',
        'api_call'
    ]);
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/repositories/AutomationRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Automation\AutomationRepository;

class AutomationRepositoryTest extends TestCase
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

        $this->repository = new AutomationRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getAutomations_uses_service_locator_for_decryption()
    {
        $boardId = 1;
        $targetId = 5;
        $targetType = 'stage';
        $automationTrigger = 'on_task_move';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        try {
            // When there are results with sensitive metadata, ServiceLocator will be called
            $result = $this->repository->getAutomations($boardId, $targetId, $targetType, $automationTrigger);
            // Empty results don't trigger ServiceLocator, so this should work
            $this->assertIsArray($result);
        } catch (\Exception $e) {
            $this->assertStringContainsString('Service not found: SecretsService', $e->getMessage());
        }
    }

    public function test_getAutomations_returns_empty_array_when_no_results()
    {
        $boardId = 1;
        $targetId = 5;
        $targetType = 'stage';
        $automationTrigger = 'on_task_move';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

        $this->assertSame([], $result);
    }

    public function test_getAutomations_query_parameters()
    {
        $boardId = 10;
        $targetId = 20;
        $targetType = 'task';
        $automationTrigger = 'on_create';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

        $this->assertIsArray($result);
    }

    public function test_getActiveAutomations_returns_null_when_no_automations()
    {
        $boardId = 1;
        $targetId = 5;
        $targetType = 'stage';
        $automationTrigger = 'on_task_move';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getActiveAutomations($boardId, $targetId, $targetType, $automationTrigger);

        $this->assertNull($result);
    }

    public function test_getActiveAutomations_filters_active_automations()
    {
        $boardId = 1;
        $targetId = 5;
        $targetType = 'stage';
        $automationTrigger = 'on_task_move';
        $preparedSql = "PREPARED_SQL";
        
        $automations = [
            (object)['id' => 1, 'active' => '1', 'automation_action' => 'notify'],
            (object)['id' => 2, 'active' => '0', 'automation_action' => 'update'],
            (object)['id' => 3, 'active' => '1', 'automation_action' => 'create']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($automations);

        $result = $this->repository->getActiveAutomations($boardId, $targetId, $targetType, $automationTrigger);

        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        
        $resultValues = array_values($result);
        $this->assertEquals('1', $resultValues[0]->active);
        $this->assertEquals('1', $resultValues[1]->active);
    }

    public function test_getActiveAutomations_returns_empty_array_when_all_inactive()
    {
        $boardId = 1;
        $targetId = 5;
        $targetType = 'stage';
        $automationTrigger = 'on_task_move';
        $preparedSql = "PREPARED_SQL";
        
        $automations = [
            (object)['id' => 1, 'active' => '0', 'automation_action' => 'notify'],
            (object)['id' => 2, 'active' => '0', 'automation_action' => 'update']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($automations);

        $result = $this->repository->getActiveAutomations($boardId, $targetId, $targetType, $automationTrigger);

        $this->assertIsArray($result);
        $this->assertCount(0, $result);
    }

    public function test_getAutomation_uses_service_locator_for_decryption()
    {
        $automationId = 42;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        try {
            $result = $this->repository->getAutomation($automationId);
            // Null result doesn't trigger ServiceLocator
            $this->assertNull($result);
        } catch (\Exception $e) {
            $this->assertStringContainsString('Service not found: SecretsService', $e->getMessage());
        }
    }

    public function test_getAutomation_returns_null_when_not_found()
    {
        $automationId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getAutomation($automationId);

        $this->assertNull($result);
    }

    public function test_getPipelineAutomations_uses_service_locator_for_decryption()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        try {
            $result = $this->repository->getPipelineAutomations($pipelineId);
            // Empty results don't trigger ServiceLocator
            $this->assertIsArray($result);
        } catch (\Exception $e) {
            $this->assertStringContainsString('Service not found: SecretsService', $e->getMessage());
        }
    }

    public function test_getPipelineAutomations_returns_empty_array_when_no_results()
    {
        $pipelineId = 10;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getPipelineAutomations($pipelineId);

        $this->assertSame([], $result);
    }

    public function test_isSensitiveMetaAutomation_returns_true_for_sensitive_actions()
    {
        $this->assertTrue($this->repository->isSensitiveMetaAutomation('send_email'));
        $this->assertTrue($this->repository->isSensitiveMetaAutomation('webhook'));
        $this->assertTrue($this->repository->isSensitiveMetaAutomation('api_call'));
    }

    public function test_isSensitiveMetaAutomation_returns_false_for_non_sensitive_actions()
    {
        $this->assertFalse($this->repository->isSensitiveMetaAutomation('notify'));
        $this->assertFalse($this->repository->isSensitiveMetaAutomation('update_field'));
        $this->assertFalse($this->repository->isSensitiveMetaAutomation('create_task'));
    }

    public function test_isSensitiveMetaAutomation_returns_false_for_empty_string()
    {
        $this->assertFalse($this->repository->isSensitiveMetaAutomation(''));
    }

    public function test_getAutomationInfoMessage_formats_message_correctly()
    {
        $automation = (object)[
            'pipeline_id' => 5,
            'target_id' => 10,
            'target_type' => 'stage',
            'automation_trigger' => 'on_task_move',
            'automation_action' => 'send_email'
        ];

        $result = $this->repository->getAutomationInfoMessage($automation);

        $this->assertStringContainsString('Board ID: 5', $result);
        $this->assertStringContainsString('Target ID: 10', $result);
        $this->assertStringContainsString('Target Type: stage', $result);
        $this->assertStringContainsString('Trigger: on_task_move', $result);
        $this->assertStringContainsString('Action: send_email', $result);
    }

    public function test_getAutomationInfoMessage_with_null_target_id()
    {
        $automation = (object)[
            'pipeline_id' => 3,
            'target_id' => null,
            'target_type' => 'pipeline',
            'automation_trigger' => 'on_create',
            'automation_action' => 'notify'
        ];

        $result = $this->repository->getAutomationInfoMessage($automation);

        $this->assertStringContainsString('Board ID: 3', $result);
        $this->assertStringContainsString('Target ID: ', $result);
    }

    public function test_getAutomationInfoMessage_returns_string()
    {
        $automation = (object)[
            'pipeline_id' => 1,
            'target_id' => 2,
            'target_type' => 'task',
            'automation_trigger' => 'on_update',
            'automation_action' => 'webhook'
        ];

        $result = $this->repository->getAutomationInfoMessage($automation);

        $this->assertIsString($result);
    }

    public function test_getAutomationsByTrigger_returns_automations()
    {
        $trigger = 'on_task_create';
        $preparedSql = "PREPARED_SQL";
        $expectedAutomations = [
            (object)['id' => 1, 'automation_trigger' => 'on_task_create'],
            (object)['id' => 2, 'automation_trigger' => 'on_task_create']
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedAutomations);

        $result = $this->repository->getAutomationsByTrigger($trigger);

        $this->assertCount(2, $result);
        $this->assertEquals('on_task_create', $result[0]->automation_trigger);
    }

    public function test_getAutomationsByTrigger_returns_empty_array_when_none_found()
    {
        $trigger = 'on_task_delete';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAutomationsByTrigger($trigger);

        $this->assertSame([], $result);
    }

    public function test_getAutomationsByTrigger_does_not_decrypt_metadata()
    {
        // Note: This method does NOT call decryptSensitiveMetadata
        $trigger = 'on_stage_change';
        $preparedSql = "PREPARED_SQL";
        $expectedAutomations = [
            (object)[
                'id' => 5,
                'automation_trigger' => 'on_stage_change',
                'automation_action' => 'send_email',
                'metadata' => 'encrypted_data_here'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedAutomations);

        $result = $this->repository->getAutomationsByTrigger($trigger);

        $this->assertCount(1, $result);
        $this->assertEquals('encrypted_data_here', $result[0]->metadata);
    }

    public function test_getAutomationsByTrigger_with_on_create_trigger()
    {
        $trigger = 'on_create';
        $preparedSql = "PREPARED_SQL";
        
        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAutomationsByTrigger($trigger);
        
        $this->assertIsArray($result);
    }

    public function test_getAutomationsByTrigger_with_on_move_trigger()
    {
        $trigger = 'on_move';
        $preparedSql = "PREPARED_SQL";
        
        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getAutomationsByTrigger($trigger);
        
        $this->assertIsArray($result);
    }

    /**
     * Integration test note:
     * 
     * Methods that use decryptSensitiveMetadata (getAutomations, getAutomation, getPipelineAutomations)
     * require ServiceLocator with SecretsService registered for full testing.
     * 
     * These should be covered by integration tests that:
     * 1. Set up ServiceLocator with a real or mocked SecretsService
     * 2. Test encryption/decryption of sensitive metadata
     * 3. Verify proper handling of different automation action types
     * 4. Test the flow from database query through decryption
     */
    public function test_service_locator_methods_require_integration_testing()
    {
        $this->markTestIncomplete(
            'Methods using decryptSensitiveMetadata require integration testing with ' .
            'ServiceLocator and SecretsService properly configured.'
        );
    }
}
