<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

require_once __DIR__ . '/../../../../php/services/UserPageService.php';

class UserPageServiceTest extends TestCase {

    // ========================================
    // Method Validation Tests
    // ========================================

    // ========================================
    // isPageUserActive Tests
    // ========================================

    public function test_isPageUserActive_true_for_active_user() {
        $pageUser = (object) ['is_active' => '1', 'deleted' => '0'];

        $this->assertTrue((new \WPQT\UserPage\UserPageService())->isPageUserActive($pageUser));
    }

    public function test_isPageUserActive_false_for_disabled_user() {
        $pageUser = (object) ['is_active' => '0', 'deleted' => '0'];

        $this->assertFalse((new \WPQT\UserPage\UserPageService())->isPageUserActive($pageUser));
    }

    public function test_isPageUserActive_false_for_deleted_user_still_marked_active() {
        // Users deleted before deleteUser started clearing is_active keep is_active = 1.
        $pageUser = (object) ['is_active' => '1', 'deleted' => '1'];

        $this->assertFalse((new \WPQT\UserPage\UserPageService())->isPageUserActive($pageUser));
    }

    public function test_checkIfUserPageSetupCompleted_method_exists() {
        $this->assertTrue(method_exists(\WPQT\UserPage\UserPageService::class, 'checkIfUserPageSetupCompleted'));
        
        $reflection = new ReflectionMethod(\WPQT\UserPage\UserPageService::class, 'checkIfUserPageSetupCompleted');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('userId', $params[0]->getName());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for checkIfUserPageSetupCompleted
     * 
     * Requires WordPress environment with ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should check if user has password using UserService->checkIfUserHasPassword($userId)
     * 2. Should return false if user does not have password
     * 3. Should return true if user has password
     * 
     * Business logic: User page setup considered complete if user has a password
     * 
     * Dependencies:
     * - ServiceLocator::get('UserService')->checkIfUserHasPassword($userId)
     */
    public function test_checkIfUserPageSetupCompleted_integration() {
        $this->markTestIncomplete('Requires WordPress environment with ServiceLocator');
    }
}
