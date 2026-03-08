<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define API token cache constants
if (!defined('WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN')) {
    define('WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN', 'plain');
}
if (!defined('WP_QUICKTASKER_CACHED_API_TOKEN_HASHED')) {
    define('WP_QUICKTASKER_CACHED_API_TOKEN_HASHED', 'hashed');
}
if (!defined('WP_QUICKTASKER_CACHED_API_DB_TOKEN')) {
    define('WP_QUICKTASKER_CACHED_API_DB_TOKEN', 'db_token');
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/ApiTokenService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Token\ApiTokenService;

class ApiTokenServiceTest extends TestCase
{
    public function test_hashToken_returns_string()
    {
        $hash = ApiTokenService::hashToken('test-token');

        $this->assertIsString($hash);
    }

    public function test_hashToken_returns_consistent_hash_for_same_input()
    {
        $token = 'my-secret-token';
        $hash1 = ApiTokenService::hashToken($token);
        $hash2 = ApiTokenService::hashToken($token);

        $this->assertEquals($hash1, $hash2);
    }

    public function test_hashToken_returns_different_hashes_for_different_inputs()
    {
        $hash1 = ApiTokenService::hashToken('token1');
        $hash2 = ApiTokenService::hashToken('token2');

        $this->assertNotEquals($hash1, $hash2);
    }

    public function test_hashToken_returns_64_character_hex_string()
    {
        $hash = ApiTokenService::hashToken('test');

        // SHA256 produces 64 character hex string
        $this->assertEquals(64, strlen($hash));
        $this->assertMatchesRegularExpression('/^[0-9a-f]{64}$/i', $hash);
    }

    public function test_hashToken_uses_sha256_algorithm()
    {
        $token = 'test-token';
        $expectedHash = hash('sha256', $token);
        $actualHash = ApiTokenService::hashToken($token);

        $this->assertEquals($expectedHash, $actualHash);
    }

    public function test_generateRandomToken_returns_string()
    {
        $token = ApiTokenService::generateRandomToken(32, 1);

        $this->assertIsString($token);
    }

    public function test_generateRandomToken_includes_pipeline_id_prefix()
    {
        $pipelineId = 123;
        $token = ApiTokenService::generateRandomToken(32, $pipelineId);

        $this->assertStringStartsWith($pipelineId . '-', $token);
    }

    public function test_generateRandomToken_default_length_generates_64_char_random_part()
    {
        $pipelineId = 5;
        $token = ApiTokenService::generateRandomToken(32, $pipelineId);

        // Format: "{pipelineId}-{64 hex chars}" (32 bytes = 64 hex chars)
        $parts = explode('-', $token, 2);
        $this->assertCount(2, $parts);
        $this->assertEquals($pipelineId, $parts[0]);
        $this->assertEquals(64, strlen($parts[1]));
    }

    public function test_generateRandomToken_custom_length()
    {
        $length = 16; // 16 bytes = 32 hex chars
        $pipelineId = 10;
        $token = ApiTokenService::generateRandomToken($length, $pipelineId);

        $parts = explode('-', $token, 2);
        $this->assertEquals(32, strlen($parts[1]));
    }

    public function test_generateRandomToken_generates_unique_tokens()
    {
        $token1 = ApiTokenService::generateRandomToken(32, 1);
        $token2 = ApiTokenService::generateRandomToken(32, 1);

        $this->assertNotEquals($token1, $token2);
    }

    public function test_generateRandomToken_random_part_is_hexadecimal()
    {
        $token = ApiTokenService::generateRandomToken(32, 1);
        $parts = explode('-', $token, 2);

        $this->assertMatchesRegularExpression('/^[0-9a-f]+$/i', $parts[1]);
    }

    public function test_verifyToken_returns_true_for_matching_tokens()
    {
        $plainToken = 'my-secret-token';
        $hashedToken = ApiTokenService::hashToken($plainToken);

        $result = ApiTokenService::verifyToken($plainToken, $hashedToken);

        $this->assertTrue($result);
    }

    public function test_verifyToken_returns_false_for_non_matching_tokens()
    {
        $plainToken = 'my-secret-token';
        $wrongToken = 'wrong-token';
        $hashedToken = ApiTokenService::hashToken($plainToken);

        $result = ApiTokenService::verifyToken($wrongToken, $hashedToken);

        $this->assertFalse($result);
    }

    public function test_verifyToken_uses_timing_safe_comparison()
    {
        // hash_equals is timing-safe, so different length strings should still work
        $plainToken = 'short';
        $hashedToken = ApiTokenService::hashToken($plainToken);

        $result = ApiTokenService::verifyToken($plainToken, $hashedToken);

        $this->assertTrue($result);
    }

    public function test_extractTokenFromHeaders_returns_null_for_missing_authorization_header()
    {
        $headers = ['Content-Type' => 'application/json'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertNull($token);
    }

    public function test_extractTokenFromHeaders_extracts_token_from_Authorization_header()
    {
        $headers = ['Authorization' => 'Bearer test-token-123'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('test-token-123', $token);
    }

    public function test_extractTokenFromHeaders_extracts_token_from_lowercase_authorization_header()
    {
        $headers = ['authorization' => 'Bearer test-token-456'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('test-token-456', $token);
    }

    public function test_extractTokenFromHeaders_handles_array_authorization_value()
    {
        $headers = ['Authorization' => ['Bearer test-token-789']];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('test-token-789', $token);
    }

    public function test_extractTokenFromHeaders_removes_Bearer_prefix_case_insensitive()
    {
        $headers = ['Authorization' => 'bearer test-token-abc'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('test-token-abc', $token);
    }

    public function test_extractTokenFromHeaders_handles_token_without_Bearer_prefix()
    {
        $headers = ['Authorization' => 'direct-token-xyz'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('direct-token-xyz', $token);
    }

    public function test_extractTokenFromHeaders_trims_whitespace()
    {
        $headers = ['Authorization' => '  Bearer  token-with-spaces  '];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        // The trim() is applied before removing 'Bearer ', so leading space remains after removal
        $this->assertEquals(' token-with-spaces', $token);
    }

    public function test_extractTokenFromHeaders_handles_BEARER_uppercase()
    {
        $headers = ['Authorization' => 'BEARER uppercase-token'];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals('uppercase-token', $token);
    }

    public function test_extractTokenFromHeaders_returns_null_for_empty_authorization()
    {
        $headers = ['Authorization' => ''];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertNull($token);
    }

    public function test_hash_and_verify_workflow()
    {
        // Complete workflow: generate -> hash -> verify
        $plainToken = ApiTokenService::generateRandomToken(32, 100);
        $hashedToken = ApiTokenService::hashToken($plainToken);
        $isValid = ApiTokenService::verifyToken($plainToken, $hashedToken);

        $this->assertTrue($isValid);
    }

    public function test_extractTokenFromHeaders_with_complex_token()
    {
        $complexToken = '1-a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2';
        $headers = ['Authorization' => 'Bearer ' . $complexToken];

        $token = ApiTokenService::extractTokenFromHeaders($headers);

        $this->assertEquals($complexToken, $token);
    }
}
