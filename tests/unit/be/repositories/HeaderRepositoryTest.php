<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Create a stub for WP_REST_Request since it's not available in test environment
if (!class_exists('WP_REST_Request')) {
    class WP_REST_Request {
        public function get_header($header_name) {
            return null;
        }
    }
}

require_once __DIR__ . '/../../../../php/repositories/HeaderRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Header\HeaderRepository;

class HeaderRepositoryTest extends TestCase
{
    private $repository;

    protected function setUp(): void
    {
        $this->repository = new HeaderRepository();
    }

    public function test_getUserPageHash_returns_header_value_when_present()
    {
        $expectedHash = 'abc123def456';
        
        // Create a mock WP_REST_Request
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($expectedHash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($expectedHash, $result);
    }

    public function test_getUserPageHash_returns_null_when_header_not_present()
    {
        // Create a mock WP_REST_Request
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn(null);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertNull($result);
    }

    public function test_getUserPageHash_with_long_hash()
    {
        $longHash = str_repeat('a', 255);
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($longHash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($longHash, $result);
        $this->assertEquals(255, strlen($result));
    }

    public function test_getUserPageHash_with_alphanumeric_hash()
    {
        $hash = 'abc123XYZ789';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($hash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($hash, $result);
    }

    public function test_getUserPageHash_with_special_characters()
    {
        $hash = 'abc-123_def.456';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($hash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($hash, $result);
    }

    public function test_getUserPageHash_with_empty_string()
    {
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn('');

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals('', $result);
        $this->assertIsString($result);
    }

    public function test_getUserPageHash_uses_correct_header_name()
    {
        $hash = 'test123';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        // Verify that the exact header name is requested
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with($this->identicalTo('X-WPQT-USER-PAGE-CODE'))
            ->willReturn($hash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($hash, $result);
    }

    public function test_getUserPageHash_accepts_wp_rest_request()
    {
        // This test verifies the method accepts WP_REST_Request parameter
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->method('get_header')
            ->willReturn('hash');

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertIsString($result);
    }

    public function test_getUserPageHash_method_exists()
    {
        $this->assertTrue(
            method_exists($this->repository, 'getUserPageHash'),
            'getUserPageHash method should exist'
        );
    }

    public function test_getUserPageHash_is_public()
    {
        $reflection = new \ReflectionMethod(HeaderRepository::class, 'getUserPageHash');
        $this->assertTrue($reflection->isPublic(), 'getUserPageHash should be public');
    }

    public function test_getUserPageHash_has_one_parameter()
    {
        $reflection = new \ReflectionMethod(HeaderRepository::class, 'getUserPageHash');
        $this->assertEquals(1, $reflection->getNumberOfParameters(), 'getUserPageHash should have 1 parameter');
    }

    public function test_getUserPageHash_parameter_name_is_data()
    {
        $reflection = new \ReflectionMethod(HeaderRepository::class, 'getUserPageHash');
        $parameters = $reflection->getParameters();
        
        $this->assertEquals('data', $parameters[0]->getName());
    }

    public function test_getUserPageHash_with_numeric_hash()
    {
        $numericHash = '1234567890';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($numericHash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($numericHash, $result);
    }

    public function test_getUserPageHash_preserves_case()
    {
        $mixedCaseHash = 'AbC123DeF456';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($mixedCaseHash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($mixedCaseHash, $result);
        $this->assertNotEquals(strtolower($mixedCaseHash), $result);
    }

    public function test_getUserPageHash_with_uuid_format()
    {
        $uuidHash = '550e8400-e29b-41d4-a716-446655440000';
        
        $requestMock = $this->createMock(\WP_REST_Request::class);
        $requestMock->expects($this->once())
            ->method('get_header')
            ->with('X-WPQT-USER-PAGE-CODE')
            ->willReturn($uuidHash);

        $result = $this->repository->getUserPageHash($requestMock);

        $this->assertEquals($uuidHash, $result);
    }
}
