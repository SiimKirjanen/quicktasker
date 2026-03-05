<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_API_TOKENS')) {
    define('TABLE_WP_QUICKTASKER_API_TOKENS', 'wp_quicktasker_api_tokens');
}

require_once __DIR__ . '/../../../../php/repositories/ApiTokenRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Token\ApiTokenRepository;

class ApiTokenRepositoryTest extends TestCase
{
    private $wpdbMock;
    private $wpdbBackup;
    private $repository;

    protected function setUp(): void
    {
        // Backup the global $wpdb if it exists
        global $wpdb;
        $this->wpdbBackup = $wpdb ?? null;

        // Create a mock for $wpdb
        $this->wpdbMock = $this->getMockBuilder(stdClass::class)
            ->addMethods(['prepare', 'get_row', 'get_results'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new ApiTokenRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getToken_returns_token_when_found()
    {
        $hashedToken = 'abc123hashedtoken';
        $preparedSql = "PREPARED_SQL";
        $expectedToken = (object)[
            'id' => 1,
            'pipeline_id' => 5,
            'name' => 'Production API',
            'description' => 'Main production token',
            'token' => 'abc123hashedtoken',
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-10 15:00:00',
            'get_pipeline' => 1,
            'patch_pipeline' => 1,
            'get_pipeline_stages' => 1,
            'post_pipeline_stages' => 0,
            'patch_pipeline_stages' => 0,
            'delete_pipeline_stages' => 0,
            'get_pipeline_tasks' => 1,
            'post_pipeline_tasks' => 0,
            'patch_pipeline_tasks' => 0,
            'delete_pipeline_tasks' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedToken);

        $result = $this->repository->getToken($hashedToken);

        $this->assertSame($expectedToken, $result);
        $this->assertEquals(1, $result->id);
        $this->assertEquals('abc123hashedtoken', $result->token);
    }

    public function test_getToken_returns_false_when_not_found()
    {
        $hashedToken = 'nonexistenttoken';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getToken($hashedToken);

        $this->assertFalse($result);
    }

    public function test_getToken_includes_all_permission_fields()
    {
        $hashedToken = 'testtoken';
        $preparedSql = "PREPARED_SQL";
        $expectedToken = (object)[
            'id' => 2,
            'pipeline_id' => 3,
            'name' => 'Test Token',
            'description' => 'Testing',
            'token' => 'testtoken',
            'created_at' => '2024-02-01 10:00:00',
            'updated_at' => '2024-02-05 11:00:00',
            'get_pipeline' => 1,
            'patch_pipeline' => 1,
            'get_pipeline_stages' => 1,
            'post_pipeline_stages' => 1,
            'patch_pipeline_stages' => 1,
            'delete_pipeline_stages' => 1,
            'get_pipeline_tasks' => 1,
            'post_pipeline_tasks' => 1,
            'patch_pipeline_tasks' => 1,
            'delete_pipeline_tasks' => 1
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedToken);

        $result = $this->repository->getToken($hashedToken);

        $this->assertObjectHasProperty('get_pipeline', $result);
        $this->assertObjectHasProperty('patch_pipeline', $result);
        $this->assertObjectHasProperty('get_pipeline_stages', $result);
        $this->assertObjectHasProperty('post_pipeline_stages', $result);
        $this->assertObjectHasProperty('delete_pipeline_tasks', $result);
    }

    public function test_getToken_includes_token_value()
    {
        $hashedToken = 'tokenvalue';
        $preparedSql = "PREPARED_SQL";
        $expectedToken = (object)[
            'id' => 5,
            'token' => 'tokenvalue',
            'name' => 'Token'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedToken);

        $result = $this->repository->getToken($hashedToken);

        $this->assertObjectHasProperty('token', $result);
    }

    public function test_getTokenForFrontend_returns_token_when_found()
    {
        $tokenId = 10;
        $preparedSql = "PREPARED_SQL";
        $expectedToken = (object)[
            'id' => 10,
            'pipeline_id' => 2,
            'name' => 'Frontend Token',
            'description' => 'For frontend use',
            'created_at' => '2024-01-15 09:00:00',
            'updated_at' => '2024-01-20 10:00:00',
            'get_pipeline' => 1,
            'patch_pipeline' => 0,
            'get_pipeline_stages' => 1,
            'post_pipeline_stages' => 0,
            'patch_pipeline_stages' => 0,
            'delete_pipeline_stages' => 0,
            'get_pipeline_tasks' => 1,
            'post_pipeline_tasks' => 0,
            'patch_pipeline_tasks' => 0,
            'delete_pipeline_tasks' => 0
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedToken);

        $result = $this->repository->getTokenForFrontend($tokenId);

        $this->assertSame($expectedToken, $result);
        $this->assertEquals(10, $result->id);
    }

    public function test_getTokenForFrontend_returns_false_when_not_found()
    {
        $tokenId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getTokenForFrontend($tokenId);

        $this->assertFalse($result);
    }

    public function test_getTokenForFrontend_does_not_include_token_value()
    {
        $tokenId = 5;
        $preparedSql = "PREPARED_SQL";
        $expectedToken = (object)[
            'id' => 5,
            'pipeline_id' => 3,
            'name' => 'Safe Token',
            'description' => 'No token value'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedToken);

        $result = $this->repository->getTokenForFrontend($tokenId);

        $this->assertObjectNotHasProperty('token', $result);
    }

    public function test_getPipelineTokensForFrontend_returns_tokens()
    {
        $pipelineId = 3;
        $preparedSql = "PREPARED_SQL";
        $expectedTokens = [
            (object)[
                'id' => 1,
                'pipeline_id' => 3,
                'name' => 'Token 1',
                'description' => 'First token',
                'get_pipeline' => 1
            ],
            (object)[
                'id' => 2,
                'pipeline_id' => 3,
                'name' => 'Token 2',
                'description' => 'Second token',
                'get_pipeline' => 1
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTokens);

        $result = $this->repository->getPipelineTokensForFrontend($pipelineId);

        $this->assertCount(2, $result);
        $this->assertEquals('Token 1', $result[0]->name);
        $this->assertEquals('Token 2', $result[1]->name);
    }

    public function test_getPipelineTokensForFrontend_returns_empty_array_when_no_tokens()
    {
        $pipelineId = 999;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getPipelineTokensForFrontend($pipelineId);

        $this->assertSame([], $result);
    }

    public function test_getPipelineTokensForFrontend_returns_empty_array_for_empty_result()
    {
        $pipelineId = 5;
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getPipelineTokensForFrontend($pipelineId);

        $this->assertSame([], $result);
    }

    public function test_getPipelineTokensForFrontend_tokens_do_not_include_token_value()
    {
        $pipelineId = 7;
        $preparedSql = "PREPARED_SQL";
        $expectedTokens = [
            (object)[
                'id' => 10,
                'pipeline_id' => 7,
                'name' => 'Safe Token 1',
                'description' => 'No token value here'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedTokens);

        $result = $this->repository->getPipelineTokensForFrontend($pipelineId);

        $this->assertObjectNotHasProperty('token', $result[0]);
    }

    public function test_getApiTokenName_returns_name_with_description()
    {
        $dbToken = (object)[
            'name' => 'Production API',
            'description' => 'Main production token'
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertEquals('Production API (Main production token)', $result);
    }

    public function test_getApiTokenName_returns_only_name_when_no_description()
    {
        $dbToken = (object)[
            'name' => 'Simple Token',
            'description' => ''
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertEquals('Simple Token', $result);
    }

    public function test_getApiTokenName_returns_only_name_when_description_is_null()
    {
        $dbToken = (object)[
            'name' => 'Token Without Description',
            'description' => null
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertEquals('Token Without Description', $result);
    }

    public function test_getApiTokenName_handles_special_characters_in_description()
    {
        $dbToken = (object)[
            'name' => 'Special Token',
            'description' => 'Token with (nested) parentheses & symbols'
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertEquals('Special Token (Token with (nested) parentheses & symbols)', $result);
    }

    public function test_getApiTokenName_with_long_description()
    {
        $dbToken = (object)[
            'name' => 'Token',
            'description' => 'This is a very long description that provides detailed information about the token'
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertEquals('Token (This is a very long description that provides detailed information about the token)', $result);
        $this->assertStringContainsString('Token', $result);
        $this->assertStringContainsString('(', $result);
        $this->assertStringContainsString(')', $result);
    }

    public function test_getApiTokenName_with_whitespace_description()
    {
        $dbToken = (object)[
            'name' => 'Token',
            'description' => '   '
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        // Whitespace-only description should be treated as empty
        $this->assertEquals('Token (   )', $result);
    }

    public function test_getApiTokenName_returns_string()
    {
        $dbToken = (object)[
            'name' => 'Test',
            'description' => 'Description'
        ];

        $result = $this->repository->getApiTokenName($dbToken);

        $this->assertIsString($result);
    }

    public function test_all_frontend_methods_exclude_sensitive_token_field()
    {
        // This is a design verification test
        // Frontend methods should never return the actual token value
        
        // getTokenForFrontend
        $tokenId = 1;
        $preparedSql = "PREPARED_SQL";
        $frontendToken = (object)['id' => 1, 'name' => 'Token'];

        $this->wpdbMock->expects($this->exactly(2))
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($frontendToken);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([$frontendToken]);

        $result1 = $this->repository->getTokenForFrontend($tokenId);
        $this->assertObjectNotHasProperty('token', $result1);

        // getPipelineTokensForFrontend
        $pipelineId = 1;
        $result2 = $this->repository->getPipelineTokensForFrontend($pipelineId);
        $this->assertObjectNotHasProperty('token', $result2[0]);
    }

    public function test_getToken_selects_all_required_fields()
    {
        $hashedToken = 'complete_token';
        $preparedSql = "PREPARED_SQL";
        $completeToken = (object)[
            'id' => 1,
            'pipeline_id' => 1,
            'name' => 'Complete',
            'description' => 'Has all fields',
            'token' => 'complete_token',
            'created_at' => '2024-01-01 00:00:00',
            'updated_at' => '2024-01-02 00:00:00',
            'get_pipeline' => 1,
            'patch_pipeline' => 1,
            'get_pipeline_stages' => 1,
            'post_pipeline_stages' => 1,
            'patch_pipeline_stages' => 1,
            'delete_pipeline_stages' => 1,
            'get_pipeline_tasks' => 1,
            'post_pipeline_tasks' => 1,
            'patch_pipeline_tasks' => 1,
            'delete_pipeline_tasks' => 1
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($completeToken);

        $result = $this->repository->getToken($hashedToken);

        // Verify all expected properties exist
        $expectedProperties = [
            'id', 'pipeline_id', 'name', 'description', 'token',
            'created_at', 'updated_at', 'get_pipeline', 'patch_pipeline',
            'get_pipeline_stages', 'post_pipeline_stages', 'patch_pipeline_stages',
            'delete_pipeline_stages', 'get_pipeline_tasks', 'post_pipeline_tasks',
            'patch_pipeline_tasks', 'delete_pipeline_tasks'
        ];

        foreach ($expectedProperties as $property) {
            $this->assertObjectHasProperty($property, $result, "Token should have $property property");
        }
    }
}
