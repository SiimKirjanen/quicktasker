<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!function_exists('get_transient')) {
    function get_transient($key)
    {
        global $wpqtRateLimitTestStore;

        if (!isset($wpqtRateLimitTestStore[$key])) {
            return false;
        }

        return $wpqtRateLimitTestStore[$key];
    }
}

if (!function_exists('set_transient')) {
    function set_transient($key, $value, $expiration = 0)
    {
        global $wpqtRateLimitTestStore;

        $wpqtRateLimitTestStore[$key] = $value;

        return true;
    }
}

require_once __DIR__ . '/../../../../php/exeptions/WPQTExeption.php';
require_once __DIR__ . '/../../../../php/services/RateLimitService.php';

use PHPUnit\Framework\TestCase;
use WPQT\RateLimit\RateLimitService;
use WPQT\WPQTException;

class RateLimitServiceTest extends TestCase
{
    private $service;

    protected function setUp(): void
    {
        parent::setUp();
        global $wpqtRateLimitTestStore;
        $wpqtRateLimitTestStore = [];
        $this->service = new RateLimitService();
    }

    public function testServiceCanBeInstantiated(): void
    {
        $this->assertInstanceOf(RateLimitService::class, $this->service);
    }

    public function testAllowsCallsUnderTheLimit(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->service->enforce('write_global', 42, 5, 60);
        }

        $this->assertTrue(true);
    }

    public function testThrowsWhenLimitExceeded(): void
    {
        for ($i = 0; $i < 3; $i++) {
            $this->service->enforce('comment', 7, 3, 60);
        }

        $this->expectException(WPQTException::class);
        $this->service->enforce('comment', 7, 3, 60);
    }

    public function testThrownExceptionIsSentToFrontEnd(): void
    {
        $this->service->enforce('comment', 9, 1, 60);

        try {
            $this->service->enforce('comment', 9, 1, 60);
            $this->fail('Expected WPQTException');
        } catch (WPQTException $e) {
            $this->assertTrue($e->shouldSendToFrontEnd());
            $this->assertStringContainsString('Too many requests', $e->getMessage());
        }
    }

    public function testBucketsAreIsolated(): void
    {
        $this->service->enforce('write_global', 1, 1, 60);
        $this->service->enforce('comment', 1, 1, 60);

        $threw = false;

        try {
            $this->service->enforce('write_global', 1, 1, 60);
        } catch (WPQTException $e) {
            $threw = true;
        }
        $this->assertTrue($threw, 'Second hit on write_global should throw');
    }

    public function testSubjectsAreIsolated(): void
    {
        $this->service->enforce('comment', 10, 1, 60);
        $this->service->enforce('comment', 11, 1, 60);

        $this->assertTrue(true);
    }

    public function testNoopWhenSubjectIsEmpty(): void
    {
        $this->service->enforce('write_global', 0, 1, 60);
        $this->service->enforce('write_global', 0, 1, 60);

        $this->assertTrue(true);
    }

    public function testNoopWhenLimitIsZero(): void
    {
        $this->service->enforce('write_global', 1, 0, 60);
        $this->assertTrue(true);
    }

    public function testWindowResetAllowsCallsAgain(): void
    {
        global $wpqtRateLimitTestStore;

        $this->service->enforce('comment', 5, 1, 60);

        $threw = false;
        try {
            $this->service->enforce('comment', 5, 1, 60);
        } catch (WPQTException $e) {
            $threw = true;
        }
        $this->assertTrue($threw);

        // Simulate the transient expiring.
        $wpqtRateLimitTestStore = [];

        $this->service->enforce('comment', 5, 1, 60);
        $this->assertTrue(true);
    }
}
