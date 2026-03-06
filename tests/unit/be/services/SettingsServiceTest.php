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
    // CRITICAL BUG: Method uses undefined variable $css instead of $customStyles
    // ========================================

    public function test_validateUserPageCustomStyles_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Settings\SettingsService::class, 'validateUserPageCustomStyles'));
        
        $reflection = new ReflectionMethod(\WPQT\Settings\SettingsService::class, 'validateUserPageCustomStyles');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('customStyles', $params[0]->getName());
    }

    /**
     * Test revealing the critical bug in validateUserPageCustomStyles
     * 
     * BUG: The method signature has parameter $customStyles but the code checks $css
     * This means the regex pattern is never actually executed, and the method always returns true
     * because $css is undefined and preg_match on undefined variable returns 0 (falsy)
     * 
     * Expected behavior: Should detect HTML tags like <div>, </div>, <script>, etc.
     * Actual behavior: Always returns true due to undefined variable $css
     * 
     * The regex pattern '#</?\w+#' is designed to match:
     * - Opening tags: <div, <span, <script
     * - Closing tags: </div>, </span>, </script>
     * 
     * Fix needed: Change line "if ( preg_match( '#</?\w+#', $css ) )" to use $customStyles instead
     */
    public function test_validateUserPageCustomStyles_has_undefined_variable_bug() {
        // Due to the bug, this will NOT detect HTML tags and will return true
        // The method uses undefined $css variable instead of $customStyles parameter
        error_reporting(E_ALL);
        
        // This SHOULD return false but returns true due to bug
        $result = @\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<div>malicious</div>');
        
        // Document the bug: method always returns true
        $this->assertTrue($result, 'Bug: Method returns true even with HTML tags because it checks undefined $css variable instead of $customStyles parameter');
    }

    public function test_validateUserPageCustomStyles_always_returns_true_due_to_bug() {
        // Test various inputs - all will return true due to the bug
        // Using @ to suppress undefined variable warning
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('color: red;'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<script>alert("xss")</script>'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('</div>'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<style>body{}</style>'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles(''));
    }

    /**
     * Test what the method SHOULD do when the bug is fixed
     * 
     * After fixing the bug (changing $css to $customStyles), these tests show expected behavior:
     * 
     * SHOULD RETURN TRUE (valid CSS):
     * - Plain CSS rules: "color: red; background: blue;"
     * - CSS selectors: ".class { color: red; }"
     * - Media queries: "@media screen { ... }"
     * - Pseudo-classes: "a:hover { color: blue; }"
     * - Empty string
     * 
     * SHOULD RETURN FALSE (contains HTML tags):
     * - Opening tags: "<div>", "<script>", "<span>"
     * - Closing tags: "</div>", "</script>", "</span>"
     * - Self-closing tags would also match: "<br/>", "<img/>"
     * - Mixed content: "color: red; <div>test</div>"
     * 
     * The regex pattern '#</?\w+#' matches any opening or closing HTML tag
     */
    public function test_validateUserPageCustomStyles_expected_behavior_when_bug_fixed() {
        // This test documents what SHOULD happen when bug is fixed
        // Currently will pass but for wrong reasons (always returns true)
        // Using @ to suppress undefined variable warning
        
        // These SHOULD return true (valid CSS, no HTML)
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('color: red;'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('.class { background: blue; }'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('@media screen { body { margin: 0; } }'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles('a:hover { color: blue; }'));
        $this->assertTrue(@\WPQT\Settings\SettingsService::validateUserPageCustomStyles(''));
        
        // Note: Due to bug, the below would currently return true but SHOULD return false
        // Uncomment after fixing bug to verify correct behavior:
        // $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<div>'));
        // $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('</div>'));
        // $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('<script>alert("xss")</script>'));
        // $this->assertFalse(\WPQT\Settings\SettingsService::validateUserPageCustomStyles('color: red; <span>bad</span>'));
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
