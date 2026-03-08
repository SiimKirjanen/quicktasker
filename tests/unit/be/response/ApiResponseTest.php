<?php
// Define WordPress constants before loading the class to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

require_once __DIR__ . '/../../../../php/response/ApiResponse.php';

use PHPUnit\Framework\TestCase;
use WPQT\Response\ApiResponse;

class ApiResponseTest extends TestCase
{
    public function test_constructor_sets_success_true()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertTrue($array['success']);
    }

    public function test_constructor_sets_success_false()
    {
        $response = new ApiResponse(false);
        $array = $response->toArray();

        $this->assertFalse($array['success']);
    }

    public function test_constructor_with_default_messages()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertSame([], $array['messages']);
    }

    public function test_constructor_with_custom_messages()
    {
        $messages = ['Error: Invalid input', 'Warning: Missing field'];
        $response = new ApiResponse(false, $messages);
        $array = $response->toArray();

        $this->assertSame($messages, $array['messages']);
    }

    public function test_constructor_with_single_message()
    {
        $messages = ['Success message'];
        $response = new ApiResponse(true, $messages);
        $array = $response->toArray();

        $this->assertCount(1, $array['messages']);
        $this->assertEquals('Success message', $array['messages'][0]);
    }

    public function test_constructor_with_empty_messages_array()
    {
        $response = new ApiResponse(true, []);
        $array = $response->toArray();

        $this->assertSame([], $array['messages']);
    }

    public function test_constructor_with_default_data()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertNull($array['data']);
    }

    public function test_constructor_with_array_data()
    {
        $data = ['id' => 1, 'name' => 'Task 1', 'status' => 'completed'];
        $response = new ApiResponse(true, [], $data);
        $array = $response->toArray();

        $this->assertSame($data, $array['data']);
    }

    public function test_constructor_with_object_data()
    {
        $data = (object)['id' => 10, 'title' => 'Test Title'];
        $response = new ApiResponse(true, [], $data);
        $array = $response->toArray();

        $this->assertSame($data, $array['data']);
    }

    public function test_constructor_with_string_data()
    {
        $data = 'Simple string data';
        $response = new ApiResponse(true, [], $data);
        $array = $response->toArray();

        $this->assertEquals($data, $array['data']);
    }

    public function test_constructor_with_numeric_data()
    {
        $data = 42;
        $response = new ApiResponse(true, [], $data);
        $array = $response->toArray();

        $this->assertEquals($data, $array['data']);
    }

    public function test_constructor_with_null_data()
    {
        $response = new ApiResponse(true, [], null);
        $array = $response->toArray();

        $this->assertNull($array['data']);
    }

    public function test_toArray_returns_array()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertIsArray($array);
    }

    public function test_toArray_has_success_key()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertArrayHasKey('success', $array);
    }

    public function test_toArray_has_messages_key()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertArrayHasKey('messages', $array);
    }

    public function test_toArray_has_data_key()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertArrayHasKey('data', $array);
    }

    public function test_toArray_has_all_three_keys()
    {
        $response = new ApiResponse(true);
        $array = $response->toArray();

        $this->assertCount(3, $array);
        $this->assertArrayHasKey('success', $array);
        $this->assertArrayHasKey('messages', $array);
        $this->assertArrayHasKey('data', $array);
    }

    public function test_success_response_with_all_parameters()
    {
        $messages = ['Operation completed successfully'];
        $data = ['id' => 5, 'created_at' => '2024-01-01'];
        
        $response = new ApiResponse(true, $messages, $data);
        $array = $response->toArray();

        $this->assertTrue($array['success']);
        $this->assertSame($messages, $array['messages']);
        $this->assertSame($data, $array['data']);
    }

    public function test_error_response_with_all_parameters()
    {
        $messages = ['Error: Database connection failed', 'Error: Timeout exceeded'];
        $data = ['error_code' => 500, 'timestamp' => '2024-01-01 12:00:00'];
        
        $response = new ApiResponse(false, $messages, $data);
        $array = $response->toArray();

        $this->assertFalse($array['success']);
        $this->assertCount(2, $array['messages']);
        $this->assertSame($data, $array['data']);
    }

    public function test_response_with_nested_array_data()
    {
        $data = [
            'user' => ['id' => 1, 'name' => 'John'],
            'tasks' => [
                ['id' => 1, 'title' => 'Task 1'],
                ['id' => 2, 'title' => 'Task 2']
            ]
        ];
        
        $response = new ApiResponse(true, [], $data);
        $array = $response->toArray();

        $this->assertSame($data, $array['data']);
        $this->assertCount(2, $array['data']['tasks']);
    }

    public function test_response_with_empty_data_array()
    {
        $response = new ApiResponse(true, [], []);
        $array = $response->toArray();

        $this->assertSame([], $array['data']);
    }

    public function test_multiple_toArray_calls_return_same_result()
    {
        $messages = ['Test message'];
        $data = ['key' => 'value'];
        $response = new ApiResponse(true, $messages, $data);

        $array1 = $response->toArray();
        $array2 = $response->toArray();

        $this->assertSame($array1, $array2);
    }

    public function test_response_with_boolean_data()
    {
        $response = new ApiResponse(true, [], false);
        $array = $response->toArray();

        $this->assertFalse($array['data']);
    }

    public function test_response_preserves_message_order()
    {
        $messages = ['First', 'Second', 'Third'];
        $response = new ApiResponse(true, $messages);
        $array = $response->toArray();

        $this->assertEquals('First', $array['messages'][0]);
        $this->assertEquals('Second', $array['messages'][1]);
        $this->assertEquals('Third', $array['messages'][2]);
    }

    public function test_response_with_special_characters_in_messages()
    {
        $messages = ['Error: <script>alert("XSS")</script>', 'Message with "quotes"'];
        $response = new ApiResponse(false, $messages);
        $array = $response->toArray();

        $this->assertStringContainsString('<script>', $array['messages'][0]);
        $this->assertStringContainsString('"quotes"', $array['messages'][1]);
    }

    public function test_response_with_unicode_in_messages()
    {
        $messages = ['Success: Операция выполнена успешно', 'エラーが発生しました'];
        $response = new ApiResponse(true, $messages);
        $array = $response->toArray();

        $this->assertCount(2, $array['messages']);
        $this->assertStringContainsString('Операция', $array['messages'][0]);
    }

    public function test_response_structure_is_consistent()
    {
        $response1 = new ApiResponse(true);
        $response2 = new ApiResponse(false, ['error'], ['data' => 'test']);

        $array1 = $response1->toArray();
        $array2 = $response2->toArray();

        // Both should have the same keys
        $this->assertEquals(array_keys($array1), array_keys($array2));
    }
}
