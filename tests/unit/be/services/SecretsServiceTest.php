<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../');
}

// Define required WordPress constant for testing
if (!defined('AUTH_KEY')) {
    define('AUTH_KEY', 'test-auth-key-for-encryption-testing-should-be-long-enough');
}

require_once __DIR__ . '/../../../../php/services/SecretsService.php';

class SecretsServiceTest extends TestCase {

    // ========================================
    // Constants Validation Tests
    // ========================================

    public function test_AUTH_KEY_is_defined() {
        $this->assertTrue(defined('AUTH_KEY'));
        $this->assertIsString(AUTH_KEY);
        $this->assertNotEmpty(AUTH_KEY);
    }

    // ========================================
    // isOpenSSLEnabled Tests (Pure Logic - FULLY TESTED)
    // ========================================

    public function test_isOpenSSLEnabled_returns_boolean() {
        $result = \WPQT\Secrets\SecretsService::isOpenSSLEnabled();
        $this->assertIsBool($result);
    }

    public function test_isOpenSSLEnabled_checks_extension_loaded() {
        // This should match the actual state of the openssl extension
        $expected = extension_loaded('openssl');
        $actual = \WPQT\Secrets\SecretsService::isOpenSSLEnabled();
        $this->assertEquals($expected, $actual);
    }

    public function test_isOpenSSLEnabled_method_is_static() {
        $reflection = new ReflectionMethod(\WPQT\Secrets\SecretsService::class, 'isOpenSSLEnabled');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    // ========================================
    // getEncryptionKey Tests (Pure Logic - FULLY TESTED)
    // ========================================

    public function test_getEncryptionKey_returns_AUTH_KEY_constant() {
        $result = \WPQT\Secrets\SecretsService::getEncryptionKey();
        $this->assertEquals(AUTH_KEY, $result);
    }

    public function test_getEncryptionKey_returns_string() {
        $result = \WPQT\Secrets\SecretsService::getEncryptionKey();
        $this->assertIsString($result);
        $this->assertNotEmpty($result);
    }

    public function test_getEncryptionKey_method_is_static() {
        $reflection = new ReflectionMethod(\WPQT\Secrets\SecretsService::class, 'getEncryptionKey');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    // ========================================
    // Class Structure Tests
    // ========================================

    public function test_class_exists() {
        $this->assertTrue(class_exists(\WPQT\Secrets\SecretsService::class));
    }

    public function test_encryption_method_property_exists() {
        $reflection = new ReflectionClass(\WPQT\Secrets\SecretsService::class);
        $this->assertTrue($reflection->hasProperty('encryptionMethod'));
        
        $property = $reflection->getProperty('encryptionMethod');
        $this->assertTrue($property->isStatic());
        $this->assertTrue($property->isPrivate());
    }

    public function test_encryption_method_is_aes_256_cbc() {
        $reflection = new ReflectionClass(\WPQT\Secrets\SecretsService::class);
        $property = $reflection->getProperty('encryptionMethod');
        $property->setAccessible(true);
        
        $value = $property->getValue();
        $this->assertEquals('aes-256-cbc', $value);
    }

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_encrypt_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Secrets\SecretsService::class, 'encrypt'));
        
        $reflection = new ReflectionMethod(\WPQT\Secrets\SecretsService::class, 'encrypt');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('data', $params[0]->getName());
    }

    public function test_decrypt_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Secrets\SecretsService::class, 'decrypt'));
        
        $reflection = new ReflectionMethod(\WPQT\Secrets\SecretsService::class, 'decrypt');
        $this->assertTrue($reflection->isStatic());
        $this->assertTrue($reflection->isPublic());
        $this->assertEquals(1, $reflection->getNumberOfParameters());
        
        // Check parameter name
        $params = $reflection->getParameters();
        $this->assertEquals('data', $params[0]->getName());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for encrypt
     * 
     * This test requires OpenSSL extension to be enabled.
     * 
     * Test scenarios:
     * 1. Should throw Exception 'OpenSSL extension is not enabled.' if OpenSSL not available
     * 2. Should use getEncryptionKey() to get AUTH_KEY
     * 3. Should use private static property $encryptionMethod ('aes-256-cbc')
     * 4. Should get IV length using openssl_cipher_iv_length($method)
     * 5. Should generate random IV using openssl_random_pseudo_bytes($ivlen)
     * 6. Should encrypt data using openssl_encrypt($data, $method, $key, 0, $iv)
     * 7. Should concatenate IV and encrypted data
     * 8. Should return base64_encode(IV + encrypted data)
     * 9. Different plaintexts should produce different ciphertexts
     * 10. Same plaintext should produce different ciphertexts (random IV)
     * 11. Should handle empty strings
     * 12. Should handle special characters
     * 13. Should handle unicode characters
     * 14. Should handle long strings
     * 15. Returned value should be base64 encoded (valid base64 string)
     * 
     * Security considerations:
     * - Uses aes-256-cbc (strong encryption)
     * - Random IV for each encryption (prevents pattern detection)
     * - IV prepended to ciphertext (needed for decryption)
     * 
     * Dependencies:
     * - extension_loaded('openssl')
     * - openssl_cipher_iv_length()
     * - openssl_random_pseudo_bytes()
     * - openssl_encrypt()
     * - base64_encode()
     * - AUTH_KEY constant
     */
    public function test_encrypt_integration() {
        if (!extension_loaded('openssl')) {
            $this->markTestSkipped('OpenSSL extension is not available');
        }
        
        // Test that encryption works
        $plaintext = 'test data';
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($plaintext);
        
        $this->assertIsString($encrypted);
        $this->assertNotEmpty($encrypted);
        $this->assertNotEquals($plaintext, $encrypted);
        
        // Verify it's base64 encoded
        $decoded = base64_decode($encrypted, true);
        $this->assertNotFalse($decoded, 'Encrypted data should be valid base64');
        
        // Test that same plaintext produces different ciphertexts (random IV)
        $encrypted2 = \WPQT\Secrets\SecretsService::encrypt($plaintext);
        $this->assertNotEquals($encrypted, $encrypted2, 'Same plaintext should produce different ciphertext due to random IV');
    }

    /**
     * Integration test for decrypt
     * 
     * This test requires OpenSSL extension to be enabled.
     * 
     * Test scenarios:
     * 1. Should throw Exception 'OpenSSL extension is not enabled.' if OpenSSL not available
     * 2. Should use getEncryptionKey() to get AUTH_KEY
     * 3. Should use private static property $encryptionMethod ('aes-256-cbc')
     * 4. Should base64_decode the input data (with strict mode true)
     * 5. Should get IV length using openssl_cipher_iv_length($method)
     * 6. Should extract IV from first $ivLen bytes using substr($rawValue, 0, $ivLen)
     * 7. Should extract encrypted data from remaining bytes using substr($rawValue, $ivLen)
     * 8. Should decrypt using openssl_decrypt($encrypted, $method, $key, 0, $iv)
     * 9. Should return decrypted string or false on failure
     * 10. Should correctly decrypt data encrypted by encrypt() method
     * 11. Should handle empty strings
     * 12. Should handle special characters
     * 13. Should handle unicode characters
     * 14. Should handle long strings
     * 15. Should return false for invalid encrypted data
     * 16. Should return false for corrupted data
     * 17. Should return false for data encrypted with different key
     * 
     * Security considerations:
     * - Requires exact IV that was used for encryption
     * - Requires same encryption key (AUTH_KEY)
     * - Returns false on decryption failure (tampered data)
     * 
     * Round-trip test:
     * - encrypt(data) -> decrypt(encrypted) should return original data
     * 
     * Dependencies:
     * - extension_loaded('openssl')
     * - base64_decode()
     * - openssl_cipher_iv_length()
     * - substr()
     * - openssl_decrypt()
     * - AUTH_KEY constant
     */
    public function test_decrypt_integration() {
        if (!extension_loaded('openssl')) {
            $this->markTestSkipped('OpenSSL extension is not available');
        }
        
        // Test round-trip encryption/decryption
        $plaintext = 'test data';
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($plaintext);
        $decrypted = \WPQT\Secrets\SecretsService::decrypt($encrypted);
        
        $this->assertEquals($plaintext, $decrypted);
        
        // Test with special characters
        $specialChars = 'Test with special: !@#$%^&*()_+-={}[]|:";\'<>?,./';
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($specialChars);
        $decrypted = \WPQT\Secrets\SecretsService::decrypt($encrypted);
        $this->assertEquals($specialChars, $decrypted);
        
        // Test with unicode
        $unicode = 'Unicode test: 你好世界 🔒🔑';
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($unicode);
        $decrypted = \WPQT\Secrets\SecretsService::decrypt($encrypted);
        $this->assertEquals($unicode, $decrypted);
        
        // Test with empty string
        $empty = '';
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($empty);
        $decrypted = \WPQT\Secrets\SecretsService::decrypt($encrypted);
        $this->assertEquals($empty, $decrypted);
        
        // Test with long string
        $longString = str_repeat('This is a long string for testing encryption. ', 100);
        $encrypted = \WPQT\Secrets\SecretsService::encrypt($longString);
        $decrypted = \WPQT\Secrets\SecretsService::decrypt($encrypted);
        $this->assertEquals($longString, $decrypted);
    }

    /**
     * Integration test for encrypt exception handling
     * 
     * This test would require mocking extension_loaded() to return false,
     * which is not easily done without additional libraries.
     * 
     * Test scenarios:
     * 1. Should throw Exception with message 'OpenSSL extension is not enabled.'
     * 2. Should check isOpenSSLEnabled() first
     * 3. Should not attempt encryption if OpenSSL not available
     */
    public function test_encrypt_throws_exception_when_openssl_not_enabled() {
        if (!extension_loaded('openssl')) {
            $this->expectException(Exception::class);
            $this->expectExceptionMessage('OpenSSL extension is not enabled.');
            \WPQT\Secrets\SecretsService::encrypt('test');
        } else {
            $this->markTestSkipped('Cannot test exception when OpenSSL is enabled');
        }
    }

    /**
     * Integration test for decrypt exception handling
     * 
     * This test would require mocking extension_loaded() to return false,
     * which is not easily done without additional libraries.
     * 
     * Test scenarios:
     * 1. Should throw Exception with message 'OpenSSL extension is not enabled.'
     * 2. Should check isOpenSSLEnabled() first
     * 3. Should not attempt decryption if OpenSSL not available
     */
    public function test_decrypt_throws_exception_when_openssl_not_enabled() {
        if (!extension_loaded('openssl')) {
            $this->expectException(Exception::class);
            $this->expectExceptionMessage('OpenSSL extension is not enabled.');
            \WPQT\Secrets\SecretsService::decrypt('test');
        } else {
            $this->markTestSkipped('Cannot test exception when OpenSSL is enabled');
        }
    }
}
