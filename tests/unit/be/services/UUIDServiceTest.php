<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/services/UUIDService.php';

use PHPUnit\Framework\TestCase;
use WPQT\UUID\UUIDService;

class UUIDServiceTest extends TestCase
{
    private $service;

    protected function setUp(): void
    {
        $this->service = new UUIDService();
    }

    public function test_generateUUIDV4_returns_string()
    {
        $uuid = $this->service->generateUUIDV4();

        $this->assertIsString($uuid);
    }

    public function test_generateUUIDV4_returns_correct_length()
    {
        $uuid = $this->service->generateUUIDV4();

        $this->assertEquals(36, strlen($uuid));
    }

    public function test_generateUUIDV4_matches_uuid_format()
    {
        $uuid = $this->service->generateUUIDV4();

        // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        // where x is any hexadecimal digit and y is one of 8, 9, a, or b
        $pattern = '/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i';
        $this->assertMatchesRegularExpression($pattern, $uuid);
    }

    public function test_generateUUIDV4_has_correct_version()
    {
        $uuid = $this->service->generateUUIDV4();

        // The version number is in the 3rd group, first character should be '4'
        $parts = explode('-', $uuid);
        $this->assertEquals('4', $parts[2][0]);
    }

    public function test_generateUUIDV4_has_correct_variant()
    {
        $uuid = $this->service->generateUUIDV4();

        // The variant is in the 4th group, first character should be 8, 9, a, or b
        $parts = explode('-', $uuid);
        $firstChar = strtolower($parts[3][0]);
        $this->assertContains($firstChar, ['8', '9', 'a', 'b']);
    }

    public function test_generateUUIDV4_has_hyphens_in_correct_positions()
    {
        $uuid = $this->service->generateUUIDV4();

        // Hyphens should be at positions 8, 13, 18, 23
        $this->assertEquals('-', $uuid[8]);
        $this->assertEquals('-', $uuid[13]);
        $this->assertEquals('-', $uuid[18]);
        $this->assertEquals('-', $uuid[23]);
    }

    public function test_generateUUIDV4_contains_only_valid_characters()
    {
        $uuid = $this->service->generateUUIDV4();

        // Remove hyphens and check if only hex characters remain
        $hexOnly = str_replace('-', '', $uuid);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{32}$/i', $hexOnly);
    }

    public function test_generateUUIDV4_generates_unique_uuids()
    {
        $uuids = [];
        $iterations = 100;

        for ($i = 0; $i < $iterations; $i++) {
            $uuids[] = $this->service->generateUUIDV4();
        }

        // Check that all UUIDs are unique
        $uniqueUuids = array_unique($uuids);
        $this->assertCount($iterations, $uniqueUuids, 'Generated UUIDs should be unique');
    }

    public function test_generateUUIDV4_generates_different_uuid_each_time()
    {
        $uuid1 = $this->service->generateUUIDV4();
        $uuid2 = $this->service->generateUUIDV4();

        $this->assertNotEquals($uuid1, $uuid2);
    }

    public function test_generateUUIDV4_has_five_groups_separated_by_hyphens()
    {
        $uuid = $this->service->generateUUIDV4();

        $parts = explode('-', $uuid);
        $this->assertCount(5, $parts);
    }

    public function test_generateUUIDV4_group_lengths_are_correct()
    {
        $uuid = $this->service->generateUUIDV4();

        $parts = explode('-', $uuid);
        // Format: 8-4-4-4-12
        $this->assertEquals(8, strlen($parts[0]), 'First group should be 8 characters');
        $this->assertEquals(4, strlen($parts[1]), 'Second group should be 4 characters');
        $this->assertEquals(4, strlen($parts[2]), 'Third group should be 4 characters');
        $this->assertEquals(4, strlen($parts[3]), 'Fourth group should be 4 characters');
        $this->assertEquals(12, strlen($parts[4]), 'Fifth group should be 12 characters');
    }

    public function test_generateUUIDV4_uses_lowercase_hex_characters()
    {
        $uuid = $this->service->generateUUIDV4();

        // Check that all hex letters are lowercase
        $this->assertEquals(strtolower($uuid), $uuid);
    }

    public function test_generateUUIDV4_version_field_is_exactly_4()
    {
        // Run multiple times to ensure consistency
        for ($i = 0; $i < 10; $i++) {
            $uuid = $this->service->generateUUIDV4();
            $parts = explode('-', $uuid);
            
            // Version is the first character of the third group
            $this->assertEquals('4', $parts[2][0], "UUID version should always be 4, attempt $i");
        }
    }

    public function test_generateUUIDV4_variant_field_is_correct_across_multiple_generations()
    {
        // Run multiple times to ensure consistency
        $validVariantChars = ['8', '9', 'a', 'b'];
        
        for ($i = 0; $i < 10; $i++) {
            $uuid = $this->service->generateUUIDV4();
            $parts = explode('-', $uuid);
            
            // Variant is the first character of the fourth group
            $variantChar = strtolower($parts[3][0]);
            $this->assertContains($variantChar, $validVariantChars, "Variant should be 8, 9, a, or b, attempt $i");
        }
    }

    public function test_generateUUIDV4_is_valid_uuid_v4_specification()
    {
        $uuid = $this->service->generateUUIDV4();

        // Complete validation according to RFC 4122
        // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        $parts = explode('-', $uuid);
        
        // 1. Should have 5 parts
        $this->assertCount(5, $parts);
        
        // 2. Parts should have correct lengths (8-4-4-4-12)
        $this->assertEquals(8, strlen($parts[0]));
        $this->assertEquals(4, strlen($parts[1]));
        $this->assertEquals(4, strlen($parts[2]));
        $this->assertEquals(4, strlen($parts[3]));
        $this->assertEquals(12, strlen($parts[4]));
        
        // 3. All parts should be valid hexadecimal
        foreach ($parts as $index => $part) {
            $this->assertMatchesRegularExpression('/^[0-9a-f]+$/i', $part, "Part $index should be valid hex");
        }
        
        // 4. Version field (first char of 3rd group) should be '4'
        $this->assertEquals('4', $parts[2][0], 'Version should be 4');
        
        // 5. Variant field (first char of 4th group) should be 8, 9, A, or B
        $variantChar = strtolower($parts[3][0]);
        $this->assertContains($variantChar, ['8', '9', 'a', 'b'], 'Variant should be RFC 4122 compliant');
    }

    public function test_generateUUIDV4_randomness_distribution()
    {
        // Test that we get a reasonable distribution of variant values
        $variantCounts = ['8' => 0, '9' => 0, 'a' => 0, 'b' => 0];
        $iterations = 400;

        for ($i = 0; $i < $iterations; $i++) {
            $uuid = $this->service->generateUUIDV4();
            $parts = explode('-', $uuid);
            $variantChar = strtolower($parts[3][0]);
            $variantCounts[$variantChar]++;
        }

        // Each variant should appear at least once in 400 iterations
        // (probability of not appearing is extremely low: (3/4)^400)
        foreach ($variantCounts as $char => $count) {
            $this->assertGreaterThan(0, $count, "Variant '$char' should appear at least once in $iterations iterations");
        }
    }
}
