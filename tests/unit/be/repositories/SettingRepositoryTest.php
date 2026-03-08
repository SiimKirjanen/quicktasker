<?php
// Mock get_option in the WPQT\Settings namespace for testing
namespace WPQT\Settings {
    function get_option($option, $default = false) {
        // This will be called instead of the global get_option when called from SettingRepository
        if (isset($GLOBALS['mock_get_option_return'])) {
            return $GLOBALS['mock_get_option_return'];
        }
        return $default;
    }
}

namespace {
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS', 'wp_quicktasker_pipeline_settings');
}

// Define option constants
if (!defined('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES')) {
    define('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES', 'wp_quicktasker_user_page_custom_styles');
}

require_once __DIR__ . '/../../../../php/repositories/SettingRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Settings\SettingRepository;

class SettingRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_row'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new SettingRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUserPageCustomStyles_returns_custom_styles()
    {
        $expectedStyles = "body { background-color: #f0f0f0; } .header { color: blue; }";
        
        // Set the mock return value
        $GLOBALS['mock_get_option_return'] = $expectedStyles;

        $result = SettingRepository::getUserPageCustomStyles();

        $this->assertEquals($expectedStyles, $result);
        
        // Clean up
        unset($GLOBALS['mock_get_option_return']);
    }

    public function test_getUserPageCustomStyles_returns_empty_string_when_not_set()
    {
        // Set the mock to return empty string
        $GLOBALS['mock_get_option_return'] = "";

        $result = SettingRepository::getUserPageCustomStyles();

        $this->assertEquals("", $result);
        
        // Clean up
        unset($GLOBALS['mock_get_option_return']);
    }

    public function test_getPipelineSettings_returns_full_settings()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'id' => 10,
            'pipeline_id' => 5,
            'allow_only_last_stage_task_done' => 1,
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-10 15:30:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPipelineSettings($pipelineId);

        $this->assertSame($expectedSettings, $result);
        $this->assertObjectHasProperty('id', $result);
        $this->assertObjectHasProperty('pipeline_id', $result);
        $this->assertObjectHasProperty('allow_only_last_stage_task_done', $result);
        $this->assertObjectHasProperty('created_at', $result);
        $this->assertObjectHasProperty('updated_at', $result);
    }

    public function test_getPipelineSettings_returns_null_when_not_found()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getPipelineSettings($pipelineId);

        $this->assertNull($result);
    }

    public function test_getPipelineSettings_with_allow_only_last_stage_false()
    {
        $pipelineId = 3;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'id' => 5,
            'pipeline_id' => 3,
            'allow_only_last_stage_task_done' => 0,
            'created_at' => '2024-02-01 10:00:00',
            'updated_at' => '2024-02-01 10:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPipelineSettings($pipelineId);

        $this->assertEquals(0, $result->allow_only_last_stage_task_done);
    }

    public function test_getPipelineSettings_includes_all_required_fields()
    {
        $pipelineId = 7;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'id' => 15,
            'pipeline_id' => 7,
            'allow_only_last_stage_task_done' => 1,
            'created_at' => '2024-03-01 08:00:00',
            'updated_at' => '2024-03-05 09:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPipelineSettings($pipelineId);

        $this->assertEquals(15, $result->id);
        $this->assertEquals(7, $result->pipeline_id);
    }

    public function test_getPublicPipelineSettings_returns_only_allow_field()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'allow_only_last_stage_task_done' => 1
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPublicPipelineSettings($pipelineId);

        $this->assertSame($expectedSettings, $result);
        $this->assertObjectHasProperty('allow_only_last_stage_task_done', $result);
    }

    public function test_getPublicPipelineSettings_returns_null_when_not_found()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getPublicPipelineSettings($pipelineId);

        $this->assertNull($result);
    }

    public function test_getPublicPipelineSettings_with_allow_enabled()
    {
        $pipelineId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'allow_only_last_stage_task_done' => 1
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPublicPipelineSettings($pipelineId);

        $this->assertEquals(1, $result->allow_only_last_stage_task_done);
    }

    public function test_getPublicPipelineSettings_with_allow_disabled()
    {
        $pipelineId = 12;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'allow_only_last_stage_task_done' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPublicPipelineSettings($pipelineId);

        $this->assertEquals(0, $result->allow_only_last_stage_task_done);
    }

    public function test_getPublicPipelineSettings_does_not_include_extra_fields()
    {
        $pipelineId = 8;
        $preparedSql = "PREPARED_SQL";
        $expectedSettings = (object)[
            'allow_only_last_stage_task_done' => 1
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedSettings);

        $result = $this->repository->getPublicPipelineSettings($pipelineId);

        $this->assertObjectNotHasProperty('id', $result);
        $this->assertObjectNotHasProperty('pipeline_id', $result);
        $this->assertObjectNotHasProperty('created_at', $result);
        $this->assertObjectNotHasProperty('updated_at', $result);
    }
}
}
