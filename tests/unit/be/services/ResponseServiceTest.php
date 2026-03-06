<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Mock WP_REST_Response class if it doesn't exist
if (!class_exists('WP_REST_Response')) {
    class WP_REST_Response {
        public $data;
        public $status;

        public function __construct($data = null, $status = 200) {
            $this->data = $data;
            $this->status = $status;
        }
    }
}

require_once __DIR__ . '/../../../../php/services/ResponseService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Response\ResponseService;

class ResponseServiceTest extends TestCase
{
    public function test_createTokenApiResponse_returns_WP_REST_Response()
    {
        $response = ResponseService::createTokenApiResponse(true);

        $this->assertInstanceOf(WP_REST_Response::class, $response);
    }

    public function test_createTokenApiResponse_with_success_true()
    {
        $response = ResponseService::createTokenApiResponse(true);

        $this->assertTrue($response->data['success']);
    }

    public function test_createTokenApiResponse_with_success_false()
    {
        $response = ResponseService::createTokenApiResponse(false);

        $this->assertFalse($response->data['success']);
    }

    public function test_createTokenApiResponse_default_status_code_is_200()
    {
        $response = ResponseService::createTokenApiResponse(true);

        $this->assertEquals(200, $response->status);
    }

    public function test_createTokenApiResponse_custom_status_code()
    {
        $response = ResponseService::createTokenApiResponse(false, 400);

        $this->assertEquals(400, $response->status);
    }

    public function test_createTokenApiResponse_with_empty_data_array()
    {
        $response = ResponseService::createTokenApiResponse(true, 200, []);

        $this->assertIsArray($response->data['data']);
        $this->assertEmpty($response->data['data']);
    }

    public function test_createTokenApiResponse_with_data_array()
    {
        $testData = ['token' => 'abc123', 'expires' => 3600];
        $response = ResponseService::createTokenApiResponse(true, 200, $testData);

        $this->assertIsArray($response->data['data']);
        $this->assertEquals($testData, $response->data['data']);
    }

    public function test_createTokenApiResponse_structure_contains_success_and_data()
    {
        $response = ResponseService::createTokenApiResponse(true);

        $this->assertArrayHasKey('success', $response->data);
        $this->assertArrayHasKey('data', $response->data);
    }

    public function test_createTokenApiResponse_with_nested_data()
    {
        $testData = [
            'user' => [
                'id' => 1,
                'name' => 'Test User'
            ],
            'metadata' => [
                'created_at' => '2026-03-06'
            ]
        ];
        $response = ResponseService::createTokenApiResponse(true, 201, $testData);

        $this->assertEquals($testData, $response->data['data']);
        $this->assertEquals(201, $response->status);
    }

    public function test_createTokenApiResponse_with_201_created_status()
    {
        $response = ResponseService::createTokenApiResponse(true, 201);

        $this->assertEquals(201, $response->status);
    }

    public function test_createTokenApiResponse_with_400_bad_request_status()
    {
        $response = ResponseService::createTokenApiResponse(false, 400);

        $this->assertEquals(400, $response->status);
        $this->assertFalse($response->data['success']);
    }

    public function test_createTokenApiResponse_with_401_unauthorized_status()
    {
        $response = ResponseService::createTokenApiResponse(false, 401);

        $this->assertEquals(401, $response->status);
    }

    public function test_createTokenApiResponse_with_403_forbidden_status()
    {
        $response = ResponseService::createTokenApiResponse(false, 403);

        $this->assertEquals(403, $response->status);
    }

    public function test_createTokenApiResponse_with_404_not_found_status()
    {
        $response = ResponseService::createTokenApiResponse(false, 404);

        $this->assertEquals(404, $response->status);
    }

    public function test_createTokenApiResponse_with_500_internal_server_error_status()
    {
        $response = ResponseService::createTokenApiResponse(false, 500);

        $this->assertEquals(500, $response->status);
    }

    public function test_createTokenApiResponse_data_can_contain_error_messages()
    {
        $errorData = ['error' => 'Invalid token', 'code' => 'INVALID_TOKEN'];
        $response = ResponseService::createTokenApiResponse(false, 400, $errorData);

        $this->assertFalse($response->data['success']);
        $this->assertEquals($errorData, $response->data['data']);
    }

    public function test_createTokenApiResponse_is_static_method()
    {
        // Verify we can call it without instantiating the class
        $response = ResponseService::createTokenApiResponse(true);

        $this->assertInstanceOf(WP_REST_Response::class, $response);
    }
}
