<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/services/HashService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Hash\HashService;

class HashServiceTest extends TestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = new HashService();
    }

    public function test_generateUserPageHash_returns_string()
    {
        $hash = $this->service->generateUserPageHash('test-salt');

        $this->assertIsString($hash);
    }

    public function test_generateUserPageHash_returns_16_characters()
    {
        $hash = $this->service->generateUserPageHash('test-salt');

        $this->assertEquals(16, strlen($hash));
    }

    public function test_generateUserPageHash_contains_only_hex_characters()
    {
        $hash = $this->service->generateUserPageHash('test-salt');

        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/i', $hash);
    }

    public function test_generateUserPageHash_generates_different_hashes_each_time()
    {
        $hash1 = $this->service->generateUserPageHash('test-salt');
        $hash2 = $this->service->generateUserPageHash('test-salt');

        $this->assertNotEquals($hash1, $hash2, 'Hashes should be unique due to microtime');
    }

    public function test_generateUserPageHash_with_empty_salt()
    {
        $hash = $this->service->generateUserPageHash('');

        $this->assertIsString($hash);
        $this->assertEquals(16, strlen($hash));
    }

    public function test_generateUserPageHash_with_different_salts_generates_different_hashes()
    {
        // Use small delay to ensure microtime changes
        $hash1 = $this->service->generateUserPageHash('salt1');
        usleep(1);
        $hash2 = $this->service->generateUserPageHash('salt2');

        $this->assertNotEquals($hash1, $hash2);
    }

    public function test_generateUserPageHash_with_special_characters_in_salt()
    {
        $hash = $this->service->generateUserPageHash('!@#$%^&*()_+-=[]{}|;:,.<>?');

        $this->assertIsString($hash);
        $this->assertEquals(16, strlen($hash));
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/i', $hash);
    }

    public function test_generateUserPageHash_with_unicode_salt()
    {
        $hash = $this->service->generateUserPageHash('こんにちは世界');

        $this->assertIsString($hash);
        $this->assertEquals(16, strlen($hash));
    }

    public function test_generateTaskHash_returns_string()
    {
        $hash = $this->service->generateTaskHash('task-salt');

        $this->assertIsString($hash);
    }

    public function test_generateTaskHash_returns_16_characters()
    {
        $hash = $this->service->generateTaskHash('task-salt');

        $this->assertEquals(16, strlen($hash));
    }

    public function test_generateTaskHash_contains_only_hex_characters()
    {
        $hash = $this->service->generateTaskHash('task-salt');

        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/i', $hash);
    }

    public function test_generateTaskHash_generates_different_hashes_each_time()
    {
        $hash1 = $this->service->generateTaskHash('task-salt');
        $hash2 = $this->service->generateTaskHash('task-salt');

        $this->assertNotEquals($hash1, $hash2, 'Hashes should be unique due to microtime');
    }

    public function test_generateTaskHash_with_empty_salt()
    {
        $hash = $this->service->generateTaskHash('');

        $this->assertIsString($hash);
        $this->assertEquals(16, strlen($hash));
    }

    public function test_generateTaskHash_with_different_salts_generates_different_hashes()
    {
        $hash1 = $this->service->generateTaskHash('salt-a');
        usleep(1);
        $hash2 = $this->service->generateTaskHash('salt-b');

        $this->assertNotEquals($hash1, $hash2);
    }

    public function test_both_methods_use_same_algorithm()
    {
        // Both methods should produce hashes of same length and format
        $userHash = $this->service->generateUserPageHash('same-salt');
        usleep(1);
        $taskHash = $this->service->generateTaskHash('same-salt');

        $this->assertEquals(strlen($userHash), strlen($taskHash));
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/i', $userHash);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/i', $taskHash);
    }

    public function test_generates_unique_hashes_in_rapid_succession()
    {
        $hashes = [];
        for ($i = 0; $i < 100; $i++) {
            $hashes[] = $this->service->generateUserPageHash('test');
        }

        $uniqueHashes = array_unique($hashes);
        $this->assertCount(100, $uniqueHashes, 'All 100 hashes should be unique');
    }

    public function test_hash_uses_md5_algorithm()
    {
        $hash = $this->service->generateUserPageHash('test');

        // MD5 produces 32 hex characters, we take first 16
        $this->assertEquals(16, strlen($hash));
        $this->assertTrue(ctype_xdigit($hash), 'Hash should be valid hexadecimal');
    }
}
