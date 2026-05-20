<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required constants
if (!defined('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS')) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS', 'wp_quicktasker_pipeline_settings');
}
if (!defined('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES')) {
    define('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES', 'wpqt_user_page_custom_styles');
}

require_once __DIR__ . '/../../../../php/services/SettingService.php';

class SettingsServiceTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS_is_defined() {
        $this->assertTrue(defined('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS'));
        $this->assertIsString(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS);
        $this->assertNotEmpty(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS);
    }

    public function test_WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES_is_defined() {
        $this->assertTrue(defined('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES'));
        $this->assertIsString(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES);
        $this->assertNotEmpty(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES);
    }

    // ========================================
    // validateUserPageCustomStyles Tests
    // ========================================

    public function test_validateUserPageCustomStyles_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsService::class, 'validateUserPageCustomStyles'));

        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsService::class, 'validateUserPageCustomStyles');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());

        $params = $reflection->getParameters();
        $this->assertEquals('customStyles', $params[0]->getName());
    }

    public function test_validateUserPageCustomStyles_accepts_valid_css() {
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('color: red;'));
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('.class { background: blue; }'));
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('@media screen { body { margin: 0; } }'));
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('a:hover { color: blue; }'));
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles(''));
    }

    public function test_validateUserPageCustomStyles_rejects_html_tags() {
        $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<div>'));
        $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('</div>'));
        $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<script>alert("xss")</script>'));
        $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('color: red; <span>bad</span>'));
        $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<style>body{}</style>'));
    }

    public function test_validateUserPageCustomStyles_allows_at_rules() {
        // @import, expression(), etc. are intentionally allowed — modern browsers
        // don't execute CSS, and the save endpoint is gated on the manage-settings cap.
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('@import url("https://fonts.googleapis.com/css?family=Inter");'));
        $this->assertTrue(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }'));
    }

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_saveUserPageCustomStyles_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsService::class, 'saveUserPageCustomStyles'));
        
        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsService::class, 'saveUserPageCustomStyles');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('customStyles', $params[0]->getName());
    }

    public function test_insertSettingsColumnForPipeline_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsService::class, 'insertSettingsColumnForPipeline'));
        
        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsService::class, 'insertSettingsColumnForPipeline');
        $this->assertFalse($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
    }

    public function test_updatePipelineTaskDoneCompletionRestriction_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsService::class, 'updatePipelineTaskDoneCompletionRestriction'));
        
        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsService::class, 'updatePipelineTaskDoneCompletionRestriction');
        $this->assertFalse($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
        
        // Check parameter names
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('allowOnlyLastStageTaskDone', $params[1]->getName());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for saveUserPageCustomStyles
     * 
     * This test requires WordPress environment with update_option() and SettingRepository.
     * 
     * Test scenarios:
     * 1. Should call validateUserPageCustomStyles($customStyles) first
     * 2. Should use update_option(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES, $customStyles)
     * 3. Should call SettingRepository::getUserPageCustomStyles() after saving
     * 4. Should return the retrieved custom styles from SettingRepository
     * 5. Note: Due to bug in validateUserPageCustomStyles, no validation actually happens
     * 
     * Bug impact:
     * - validateUserPageCustomStyles always returns true, so no HTML tag validation occurs
     * - Potentially allows malicious HTML/JavaScript to be saved in custom styles
     * - Security risk: XSS vulnerability if styles are rendered without proper escaping
     * 
     * Dependencies:
     * - update_option()
     * - SettingRepository::getUserPageCustomStyles()
     * - WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES constant
     * - validateUserPageCustomStyles() (currently broken)
     */
    public function test_saveUserPageCustomStyles_integration() {
        $this->markTestIncomplete('Requires WordPress environment with update_option() and SettingRepository');
    }

    /**
     * Integration test for insertSettingsColumnForPipeline
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should insert into TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS
     * 2. Should insert with columns: pipeline_id, created_at, updated_at
     * 3. Should use ServiceLocator::get('TimeRepository')->getCurrentUTCTime() for both timestamps
     * 4. Should throw Exception 'Failed to create board settings' if insert fails (== false, not strict)
     * 5. Method returns void (no return value)
     * 6. Uses loose comparison (== false) instead of strict (=== false)
     * 
     * Note: Exception message says "board" instead of "pipeline" (inconsistent terminology)
     * 
     * Dependencies:
     * - global $wpdb with insert()
     * - ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
     * - TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS constant
     */
    public function test_insertSettingsColumnForPipeline_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, and TimeRepository');
    }

    /**
     * Integration test for updatePipelineTaskDoneCompletionRestriction
     * 
     * This test requires WordPress environment with $wpdb and ServiceLocator setup.
     * 
     * Test scenarios:
     * 1. Should update TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS
     * 2. Should update columns: allow_only_last_stage_task_done, updated_at
     * 3. Should use ServiceLocator::get('TimeRepository')->getCurrentUTCTime() for updated_at
     * 4. Should update WHERE pipeline_id = $pipelineId
     * 5. Should throw Exception 'Failed to update board settings' if update fails (=== false, strict)
     * 6. Method returns void (no return value)
     * 7. Uses strict comparison (=== false) 
     * 8. $wpdb->update() returns false on error, 0 if no rows updated, >0 if rows updated
     * 9. Only checks if $result === false
     * 
     * Note: Exception message says "board" instead of "pipeline" (inconsistent terminology)
     * 
     * Dependencies:
     * - global $wpdb with update()
     * - ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
     * - TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS constant
     */
    public function test_updatePipelineTaskDoneCompletionRestriction_integration() {
        $this->markTestIncomplete('Requires WordPress environment with $wpdb, ServiceLocator, and TimeRepository');
    }
}
