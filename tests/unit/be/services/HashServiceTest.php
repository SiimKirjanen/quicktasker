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

    public function test_generateUserPageHash_returns_16_hex_characters()
    {
        $hash = $this->service->generateUserPageHash();

        $this->assertIsString($hash);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/', $hash);
    }

    public function test_generateTaskHash_returns_16_hex_characters()
    {
        $hash = $this->service->generateTaskHash();

        $this->assertIsString($hash);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{16}$/', $hash);
    }

    public function test_generateUserPageHash_generates_different_hashes_each_time()
    {
        $this->assertNotEquals($this->service->generateUserPageHash(), $this->service->generateUserPageHash());
    }

    public function test_generateTaskHash_generates_different_hashes_each_time()
    {
        $this->assertNotEquals($this->service->generateTaskHash(), $this->service->generateTaskHash());
    }

    // Hashes are created in quick succession (e.g. bulk imports), so they must not depend on the clock
    public function test_generateUserPageHash_unique_in_rapid_succession()
    {
        $hashes = [];
        for ($i = 0; $i < 1000; $i++) {
            $hashes[] = $this->service->generateUserPageHash();
        }

        $this->assertCount(1000, array_unique($hashes), 'All 1000 hashes should be unique');
    }

    public function test_generateTaskHash_unique_in_rapid_succession()
    {
        $hashes = [];
        for ($i = 0; $i < 1000; $i++) {
            $hashes[] = $this->service->generateTaskHash();
        }

        $this->assertCount(1000, array_unique($hashes), 'All 1000 hashes should be unique');
    }
}
