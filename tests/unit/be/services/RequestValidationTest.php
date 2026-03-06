<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required constants
if (!defined('WP_QT_QUICKTASKER_USER_TYPE')) {
    define('WP_QT_QUICKTASKER_USER_TYPE', 'quicktasker_user');
}
if (!defined('WP_QT_WORDPRESS_USER_TYPE')) {
    define('WP_QT_WORDPRESS_USER_TYPE', 'wordpress_user');
}
if (!defined('WPQT_USER_API_NONCE')) {
    define('WPQT_USER_API_NONCE', 'wpqt_user_api_nonce');
}
if (!defined('WP_QT_USER_TYPES')) {
    define('WP_QT_USER_TYPES', ['quicktasker_user', 'wordpress_user']);
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TARGET_TYPES')) {
    define('WP_QUICKTASKER_AUTOMATION_TARGET_TYPES', ['task', 'stage']);
}
if (!defined('WP_QUICKTASKER_AUTOMATION_TRIGGERS')) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGERS', ['task_created', 'task_updated']);
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTIONS')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTIONS', ['send_email', 'create_task']);
}
if (!defined('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPES')) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPES', ['stage', 'user']);
}
if (!defined('WP_QT_LOG_TYPES')) {
    define('WP_QT_LOG_TYPES', ['info', 'error', 'warning']);
}
if (!defined('WP_QT_LOG_CREATED_BY')) {
    define('WP_QT_LOG_CREATED_BY', ['system', 'user']);
}
if (!defined('WP_QT_LOG_STATUS')) {
    define('WP_QT_LOG_STATUS', ['success', 'failure']);
}
if (!defined('WP_QUICKTASKER_COMMENT_TYPES')) {
    define('WP_QUICKTASKER_COMMENT_TYPES', ['task', 'general']);
}
if (!defined('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPES')) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPES', ['task', 'pipeline']);
}
if (!defined('WP_QUICKTASKER_CUSTOM_FIELD_TYPES')) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_TYPES', ['text', 'number', 'date']);
}
if (!defined('WP_QUICKTASKER_UPLOAD_ENTITY_TYPES')) {
    define('WP_QUICKTASKER_UPLOAD_ENTITY_TYPES', ['task', 'comment']);
}
if (!defined('WP_QUICKTASKER_IMPORT_SOURCES')) {
    define('WP_QUICKTASKER_IMPORT_SOURCES', ['csv', 'json']);
}
if (!defined('WP_QUICKTASKER_ARCHIVE_STATUS_FILTER')) {
    define('WP_QUICKTASKER_ARCHIVE_STATUS_FILTER', ['all', 'archived', 'not_archived']);
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_TYPES')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_TYPES', ['task', 'stage']);
}
if (!defined('WP_QUICKTASKER_WEBHOOK_TARGET_ACTIONS')) {
    define('WP_QUICKTASKER_WEBHOOK_TARGET_ACTIONS', ['created', 'updated', 'deleted']);
}

require_once __DIR__ . '/../../../../php/services/RequestValidation.php';

class RequestValidationTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_WP_QT_QUICKTASKER_USER_TYPE_is_defined() {
        $this->assertTrue(defined('WP_QT_QUICKTASKER_USER_TYPE'));
        $this->assertIsString(WP_QT_QUICKTASKER_USER_TYPE);
        $this->assertNotEmpty(WP_QT_QUICKTASKER_USER_TYPE);
    }

    public function test_WP_QT_WORDPRESS_USER_TYPE_is_defined() {
        $this->assertTrue(defined('WP_QT_WORDPRESS_USER_TYPE'));
        $this->assertIsString(WP_QT_WORDPRESS_USER_TYPE);
        $this->assertNotEmpty(WP_QT_WORDPRESS_USER_TYPE);
    }

    public function test_WPQT_USER_API_NONCE_is_defined() {
        $this->assertTrue(defined('WPQT_USER_API_NONCE'));
        $this->assertIsString(WPQT_USER_API_NONCE);
        $this->assertNotEmpty(WPQT_USER_API_NONCE);
    }

    // ========================================
    // validateNumericParam Tests (Pure Logic)
    // ========================================

    public function test_validateNumericParam_with_integer() {
        $this->assertTrue(\WPQT\RequestValidation::validateNumericParam(123));
    }

    public function test_validateNumericParam_with_float() {
        $this->assertTrue(\WPQT\RequestValidation::validateNumericParam(123.45));
    }

    public function test_validateNumericParam_with_numeric_string() {
        $this->assertTrue(\WPQT\RequestValidation::validateNumericParam('123'));
        $this->assertTrue(\WPQT\RequestValidation::validateNumericParam('123.45'));
    }

    public function test_validateNumericParam_with_non_numeric() {
        $this->assertFalse(\WPQT\RequestValidation::validateNumericParam('abc'));
        $this->assertFalse(\WPQT\RequestValidation::validateNumericParam(null));
        $this->assertFalse(\WPQT\RequestValidation::validateNumericParam([]));
    }

    // ========================================
    // sanitizeAbsint Tests (Require WordPress absint)
    // ========================================

    public function test_sanitizeAbsint_method_exists() {
        $this->assertTrue(method_exists(\WPQT\RequestValidation::class, 'sanitizeAbsint'));
        
        $reflection = new ReflectionMethod(\WPQT\RequestValidation::class, 'sanitizeAbsint');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
    }

    // ========================================
    // validateStringParam Tests (Pure Logic)
    // ========================================

    public function test_validateStringParam_with_string() {
        $this->assertTrue(\WPQT\RequestValidation::validateStringParam('test'));
        $this->assertTrue(\WPQT\RequestValidation::validateStringParam(''));
    }

    public function test_validateStringParam_with_non_string() {
        $this->assertFalse(\WPQT\RequestValidation::validateStringParam(123));
        $this->assertFalse(\WPQT\RequestValidation::validateStringParam(null));
        $this->assertFalse(\WPQT\RequestValidation::validateStringParam([]));
    }

    // ========================================
    // validateBooleanParam Tests (Pure Logic)
    // ========================================

    public function test_validateBooleanParam_with_boolean() {
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam(true));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam(false));
    }

    public function test_validateBooleanParam_with_string_boolean() {
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('true'));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('false'));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('1'));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('0'));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('TRUE'));
        $this->assertTrue(\WPQT\RequestValidation::validateBooleanParam('FALSE'));
    }

    public function test_validateBooleanParam_with_invalid() {
        $this->assertFalse(\WPQT\RequestValidation::validateBooleanParam('yes'));
        $this->assertFalse(\WPQT\RequestValidation::validateBooleanParam('no'));
        $this->assertFalse(\WPQT\RequestValidation::validateBooleanParam('2'));
    }

    // ========================================
    // validateUserPageCustomFieldEntityType Tests (Pure Logic)
    // ========================================

    public function test_validateUserPageCustomFieldEntityType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateUserPageCustomFieldEntityType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateUserPageCustomFieldEntityType('quicktasker'));
        $this->assertTrue(\WPQT\RequestValidation::validateUserPageCustomFieldEntityType('wp-user'));
    }

    public function test_validateUserPageCustomFieldEntityType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateUserPageCustomFieldEntityType('invalid'));
        $this->assertFalse(\WPQT\RequestValidation::validateUserPageCustomFieldEntityType(''));
    }

    // ========================================
    // validateUserType Tests (Pure Logic)
    // ========================================

    public function test_validateUserType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateUserType('quicktasker_user'));
        $this->assertTrue(\WPQT\RequestValidation::validateUserType('wordpress_user'));
    }

    public function test_validateUserType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateUserType('invalid'));
    }

    // ========================================
    // validateDateParam Tests (Pure Logic)
    // ========================================

    public function test_validateDateParam_with_valid_dates() {
        $this->assertEquals(1, \WPQT\RequestValidation::validateDateParam('2024-01-01'));
        $this->assertEquals(1, \WPQT\RequestValidation::validateDateParam('2024-12-31'));
        $this->assertEquals(1, \WPQT\RequestValidation::validateDateParam('9999-99-99')); // Pattern matches, not semantic validation
    }

    public function test_validateDateParam_with_invalid_format() {
        $this->assertEquals(0, \WPQT\RequestValidation::validateDateParam('01-01-2024'));
        $this->assertEquals(0, \WPQT\RequestValidation::validateDateParam('2024/01/01'));
        $this->assertEquals(0, \WPQT\RequestValidation::validateDateParam('2024-1-1'));
        $this->assertEquals(0, \WPQT\RequestValidation::validateDateParam('not a date'));
    }

    // ========================================
    // validateOptionalNumericParam Tests (Pure Logic)
    // ========================================

    public function test_validateOptionalNumericParam_with_null() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalNumericParam(null));
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalNumericParam('null'));
    }

    public function test_validateOptionalNumericParam_with_numeric() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalNumericParam(123));
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalNumericParam('456'));
    }

    public function test_validateOptionalNumericParam_with_invalid() {
        $this->assertFalse(\WPQT\RequestValidation::validateOptionalNumericParam('abc'));
    }

    // ========================================
    // sanitizeOptionalAbsint Tests (Pure Logic)
    // ========================================

    public function test_sanitizeOptionalAbsint_with_null() {
        $this->assertNull(\WPQT\RequestValidation::sanitizeOptionalAbsint(null));
        $this->assertNull(\WPQT\RequestValidation::sanitizeOptionalAbsint('null'));
    }

    // ========================================
    // validateOptionalStringParam Tests (Pure Logic)
    // ========================================

    public function test_validateOptionalStringParam_with_null() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalStringParam(null));
    }

    public function test_validateOptionalStringParam_with_string() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalStringParam('test'));
        $this->assertTrue(\WPQT\RequestValidation::validateOptionalStringParam(''));
    }

    public function test_validateOptionalStringParam_with_non_string() {
        $this->assertFalse(\WPQT\RequestValidation::validateOptionalStringParam(123));
    }

    // ========================================
    // sanitizeOptionalStringParam Tests (Pure Logic)
    // ========================================

    public function test_sanitizeOptionalStringParam_returns_null_for_null() {
        $this->assertNull(\WPQT\RequestValidation::sanitizeOptionalStringParam(null));
    }

    // ========================================
    // validateAutomationTargetType Tests (Pure Logic)
    // ========================================

    public function test_validateAutomationTargetType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationTargetType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationTargetType('stage'));
    }

    public function test_validateAutomationTargetType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateAutomationTargetType('invalid'));
    }

    // ========================================
    // validateAutomationTrigger Tests (Pure Logic)
    // ========================================

    public function test_validateAutomationTrigger_with_valid_triggers() {
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationTrigger('task_created'));
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationTrigger('task_updated'));
    }

    public function test_validateAutomationTrigger_with_invalid_trigger() {
        $this->assertFalse(\WPQT\RequestValidation::validateAutomationTrigger('invalid'));
    }

    // ========================================
    // validateAutomationAction Tests (Pure Logic)
    // ========================================

    public function test_validateAutomationAction_with_valid_actions() {
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationAction('send_email'));
        $this->assertTrue(\WPQT\RequestValidation::validateAutomationAction('create_task'));
    }

    public function test_validateAutomationAction_with_invalid_action() {
        $this->assertFalse(\WPQT\RequestValidation::validateAutomationAction('invalid'));
    }

    // ========================================
    // valdiateAutomationActionTargetType Tests (Pure Logic)
    // Note: Method name has typo - "valdiateAutomationActionTargetType"
    // ========================================

    public function test_valdiateAutomationActionTargetType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::valdiateAutomationActionTargetType('stage'));
        $this->assertTrue(\WPQT\RequestValidation::valdiateAutomationActionTargetType('user'));
    }

    public function test_valdiateAutomationActionTargetType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::valdiateAutomationActionTargetType('invalid'));
    }

    // ========================================
    // validateOptionslAutomationActionTargetType Tests (Pure Logic)
    // Note: Method name has typo - "validateOptionslAutomationActionTargetType"
    // ========================================

    public function test_validateOptionslAutomationActionTargetType_with_null() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionslAutomationActionTargetType(null));
    }

    public function test_validateOptionslAutomationActionTargetType_with_valid_type() {
        $this->assertTrue(\WPQT\RequestValidation::validateOptionslAutomationActionTargetType('stage'));
        $this->assertTrue(\WPQT\RequestValidation::validateOptionslAutomationActionTargetType('user'));
    }

    public function test_validateOptionslAutomationActionTargetType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateOptionslAutomationActionTargetType('invalid'));
    }

    // ========================================
    // validateLogType Tests (Pure Logic)
    // ========================================

    public function test_validateLogType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateLogType('info'));
        $this->assertTrue(\WPQT\RequestValidation::validateLogType('error'));
        $this->assertTrue(\WPQT\RequestValidation::validateLogType('warning'));
    }

    public function test_validateLogType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateLogType('invalid'));
    }

    // ========================================
    // validateLogCreatedBy Tests (Pure Logic)
    // ========================================

    public function test_validateLogCreatedBy_with_valid_values() {
        $this->assertTrue(\WPQT\RequestValidation::validateLogCreatedBy('system'));
        $this->assertTrue(\WPQT\RequestValidation::validateLogCreatedBy('user'));
    }

    public function test_validateLogCreatedBy_with_invalid_value() {
        $this->assertFalse(\WPQT\RequestValidation::validateLogCreatedBy('invalid'));
    }

    // ========================================
    // validateLogStatus Tests (Pure Logic)
    // ========================================

    public function test_validateLogStatus_with_valid_statuses() {
        $this->assertTrue(\WPQT\RequestValidation::validateLogStatus('success'));
        $this->assertTrue(\WPQT\RequestValidation::validateLogStatus('failure'));
    }

    public function test_validateLogStatus_with_invalid_status() {
        $this->assertFalse(\WPQT\RequestValidation::validateLogStatus('invalid'));
    }

    // ========================================
    // valdiateQueryOrder Tests (Pure Logic)
    // Note: Method name has typo - "valdiateQueryOrder"
    // ========================================

    public function test_valdiateQueryOrder_with_valid_orders() {
        $this->assertTrue(\WPQT\RequestValidation::valdiateQueryOrder('ASC'));
        $this->assertTrue(\WPQT\RequestValidation::valdiateQueryOrder('DESC'));
    }

    public function test_valdiateQueryOrder_with_invalid_order() {
        $this->assertFalse(\WPQT\RequestValidation::valdiateQueryOrder('asc')); // Case sensitive
        $this->assertFalse(\WPQT\RequestValidation::valdiateQueryOrder('invalid'));
    }

    // ========================================
    // validateCommentType Tests (Pure Logic)
    // ========================================

    public function test_validateCommentType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateCommentType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateCommentType('general'));
    }

    public function test_validateCommentType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateCommentType('invalid'));
    }

    // ========================================
    // validateCustomFieldEntityType Tests (Pure Logic)
    // ========================================

    public function test_validateCustomFieldEntityType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateCustomFieldEntityType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateCustomFieldEntityType('pipeline'));
    }

    public function test_validateCustomFieldEntityType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateCustomFieldEntityType('invalid'));
    }

    // ========================================
    // validateCustomFieldType Tests (Pure Logic)
    // ========================================

    public function test_validateCustomFieldType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateCustomFieldType('text'));
        $this->assertTrue(\WPQT\RequestValidation::validateCustomFieldType('number'));
        $this->assertTrue(\WPQT\RequestValidation::validateCustomFieldType('date'));
    }

    public function test_validateCustomFieldType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateCustomFieldType('invalid'));
    }

    // ========================================
    // validateHexColor Tests (Pure Logic)
    // ========================================

    public function test_validateHexColor_with_valid_colors() {
        $this->assertEquals(1, \WPQT\RequestValidation::validateHexColor('#000000'));
        $this->assertEquals(1, \WPQT\RequestValidation::validateHexColor('#ffffff'));
        $this->assertEquals(1, \WPQT\RequestValidation::validateHexColor('#FFFFFF'));
        $this->assertEquals(1, \WPQT\RequestValidation::validateHexColor('#abc123'));
    }

    public function test_validateHexColor_with_invalid_colors() {
        $this->assertEquals(0, \WPQT\RequestValidation::validateHexColor('000000')); // Missing #
        $this->assertEquals(0, \WPQT\RequestValidation::validateHexColor('#fff')); // Too short
        $this->assertEquals(0, \WPQT\RequestValidation::validateHexColor('#gggggg')); // Invalid characters
        $this->assertEquals(0, \WPQT\RequestValidation::validateHexColor('#1234567')); // Too long
    }

    // ========================================
    // validateUploadEntityType Tests (Pure Logic)
    // ========================================

    public function test_validateUploadEntityType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateUploadEntityType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateUploadEntityType('comment'));
    }

    public function test_validateUploadEntityType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateUploadEntityType('invalid'));
    }

    // ========================================
    // validateImportSource Tests (Pure Logic)
    // ========================================

    public function test_validateImportSource_with_valid_sources() {
        $this->assertTrue(\WPQT\RequestValidation::validateImportSource('csv'));
        $this->assertTrue(\WPQT\RequestValidation::validateImportSource('json'));
    }

    public function test_validateImportSource_with_invalid_source() {
        $this->assertFalse(\WPQT\RequestValidation::validateImportSource('xml'));
    }

    // ========================================
    // validateColorParam Tests (Pure Logic)
    // ========================================

    public function test_validateColorParam_with_null() {
        $this->assertTrue(\WPQT\RequestValidation::validateColorParam(null));
        $this->assertTrue(\WPQT\RequestValidation::validateColorParam('null'));
    }

    public function test_validateColorParam_with_valid_color() {
        $this->assertEquals(1, \WPQT\RequestValidation::validateColorParam('#ff0000'));
    }

    public function test_validateColorParam_with_invalid_color() {
        $this->assertEquals(0, \WPQT\RequestValidation::validateColorParam('red'));
    }

    // ========================================
    // validateArchiveStatusFilter Tests (Pure Logic)
    // ========================================

    public function test_validateArchiveStatusFilter_with_valid_filters() {
        $this->assertTrue(\WPQT\RequestValidation::validateArchiveStatusFilter('all'));
        $this->assertTrue(\WPQT\RequestValidation::validateArchiveStatusFilter('archived'));
        $this->assertTrue(\WPQT\RequestValidation::validateArchiveStatusFilter('not_archived'));
    }

    public function test_validateArchiveStatusFilter_with_invalid_filter() {
        $this->assertFalse(\WPQT\RequestValidation::validateArchiveStatusFilter('invalid'));
    }

    // ========================================
    // validateWebhookTargetType Tests (Pure Logic)
    // ========================================

    public function test_validateWebhookTargetType_with_valid_types() {
        $this->assertTrue(\WPQT\RequestValidation::validateWebhookTargetType('task'));
        $this->assertTrue(\WPQT\RequestValidation::validateWebhookTargetType('stage'));
    }

    public function test_validateWebhookTargetType_with_invalid_type() {
        $this->assertFalse(\WPQT\RequestValidation::validateWebhookTargetType('invalid'));
    }

    // ========================================
    // validateWebhookTargetAction Tests (Pure Logic)
    // ========================================

    public function test_validateWebhookTargetAction_with_valid_actions() {
        $this->assertTrue(\WPQT\RequestValidation::validateWebhookTargetAction('created'));
        $this->assertTrue(\WPQT\RequestValidation::validateWebhookTargetAction('updated'));
        $this->assertTrue(\WPQT\RequestValidation::validateWebhookTargetAction('deleted'));
    }

    public function test_validateWebhookTargetAction_with_invalid_action() {
        $this->assertFalse(\WPQT\RequestValidation::validateWebhookTargetAction('invalid'));
    }

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_validateUserPageApiRequest_method_exists() {
        $this->assertTrue(method_exists(\WPQT\RequestValidation::class, 'validateUserPageApiRequest'));
        
        $reflection = new ReflectionMethod(\WPQT\RequestValidation::class, 'validateUserPageApiRequest');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(2, $reflection->getNumberOfParameters());
    }

    public function test_sanitizeStringParam_method_exists() {
        $this->assertTrue(method_exists(\WPQT\RequestValidation::class, 'sanitizeStringParam'));
        
        $reflection = new ReflectionMethod(\WPQT\RequestValidation::class, 'sanitizeStringParam');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
    }

    public function test_sanitizeBooleanParam_method_exists() {
        $this->assertTrue(method_exists(\WPQT\RequestValidation::class, 'sanitizeBooleanParam'));
        
        $reflection = new ReflectionMethod(\WPQT\RequestValidation::class, 'sanitizeBooleanParam');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for validateUserPageApiRequest
     * 
     * This test requires WordPress environment with ServiceLocator and WordPress functions.
     * 
     * Test scenarios:
     * 1. Should extract userPageHash from HeaderRepository->getUserPageHash($data)
     * 2. Should get logged in WP user ID from get_current_user_id() or null
     * 3. Should determine isQuicktaskerUser (true if userPageHash exists)
     * 4. Should determine isWordPressUser (true if no userPageHash)
     * 5. Should set userType based on userPageHash (WP_QT_QUICKTASKER_USER_TYPE or WP_QT_WORDPRESS_USER_TYPE)
     * 6. Should use wp_parse_args() to merge args with defaults
     * 7. Default args: nonce=true, hash=true, session=true, userActive=true
     * 
     * For QuickTasker users (userPageHash exists):
     * 8. If nonce=true, should verify nonce from X-WPQT-USER-API-Nonce header via NonceService::verifyNonce()
     * 9. If hash=true, should check UserPageService->checkIfUserPageHashExists(), throws 'User page does not exist'
     * 10. If session=true, should verify session via SessionService->verifySessionToken(), add to requestData
     * 11. If userActive=true and session exists, should check UserRepository->isUserActive(), throws 'User is not active'
     * 
     * For WordPress users (no userPageHash):
     * 12. If session=true and loggedInWPUserId=0, throws 'User is not logged in'
     * 13. Should check PermissionService->hasRequiredPermissionsForUserPageApp(), throws 'User does not have permissions to access the user page app'
     * 14. Should set requestData['session'] as object with user_id property
     * 
     * Return structure:
     * 15. Returns array with: userPageHash, loggedInWPUserId, isQuicktaskerUser, isWordPressUser, userType, session (conditional)
     * 
     * Dependencies:
     * - ServiceLocator::get('HeaderRepository')->getUserPageHash($data)
     * - get_current_user_id()
     * - wp_parse_args()
     * - NonceService::verifyNonce($nonce, WPQT_USER_API_NONCE)
     * - new UserPageService()->checkIfUserPageHashExists($userPageHash)
     * - new SessionService()->verifySessionToken($userPageHash)
     * - new UserRepository()->isUserActive($userId)
     * - ServiceLocator::get('PermissionService')->hasRequiredPermissionsForUserPageApp($loggedInWPUserId)
     * - WPQTException with shouldSendToFrontEnd=true
     */
    public function test_validateUserPageApiRequest_integration() {
        $this->markTestIncomplete('Requires WordPress environment with get_current_user_id(), wp_parse_args(), ServiceLocator, HeaderRepository, NonceService, UserPageService, SessionService, UserRepository, and PermissionService');
    }

    /**
     * Integration test for sanitizeAbsint
     * 
     * This test requires WordPress absint() function.
     * 
     * Test scenarios:
     * 1. Should use absint() to convert to absolute integer
     * 2. Positive integer should remain unchanged
     * 3. Negative integer should become positive
     * 4. String numbers should be converted to integers
     * 5. Zero should remain zero
     * 
     * Dependencies:
     * - absint()
     */
    public function test_sanitizeAbsint_integration() {
        $this->markTestIncomplete('Requires WordPress environment with absint()');
    }

    /**
     * Integration test for sanitizeOptionalAbsint
     * 
     * This test requires WordPress absint() function.
     * 
     * Test scenarios:
     * 1. Should return null for null input
     * 2. Should return null for string 'null'
     * 3. Should use sanitizeAbsint() for non-null values
     * 4. Positive integers should be sanitized
     * 5. Negative integers should become positive
     * 
     * Dependencies:
     * - absint() (via sanitizeAbsint)
     */
    public function test_sanitizeOptionalAbsint_integration() {
        $this->markTestIncomplete('Requires WordPress environment with absint()');
    }

    /**
     * Integration test for sanitizeStringParam
     * 
     * This test requires WordPress sanitize_text_field() function.
     * 
     * Test scenarios:
     * 1. Should use sanitize_text_field() to sanitize input
     * 2. Should remove HTML tags
     * 3. Should escape special characters
     * 4. Should handle empty strings
     * 
     * Dependencies:
     * - sanitize_text_field()
     */
    public function test_sanitizeStringParam_integration() {
        $this->markTestIncomplete('Requires WordPress environment with sanitize_text_field()');
    }

    /**
     * Integration test for sanitizeBooleanParam
     * 
     * This test requires WordPress rest_sanitize_boolean() function.
     * 
     * Test scenarios:
     * 1. Should use rest_sanitize_boolean() to convert to boolean
     * 2. Should handle 'true', 'false', '1', '0', 1, 0, true, false
     * 3. Should return boolean type
     * 
     * Dependencies:
     * - rest_sanitize_boolean()
     */
    public function test_sanitizeBooleanParam_integration() {
        $this->markTestIncomplete('Requires WordPress environment with rest_sanitize_boolean()');
    }
}
