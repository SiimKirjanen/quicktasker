<?php

if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

if (!defined('WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN')) {
    define('WP_QUICKTASKER_CACHED_API_TOKEN_PLAIN', 'plain');
}
if (!defined('WP_QUICKTASKER_CACHED_API_TOKEN_HASHED')) {
    define('WP_QUICKTASKER_CACHED_API_TOKEN_HASHED', 'hashed');
}
if (!defined('WP_QUICKTASKER_CACHED_API_DB_TOKEN')) {
    define('WP_QUICKTASKER_CACHED_API_DB_TOKEN', 'db_token');
}
if (!defined('WP_QUICKTASKER_API_DELETE_PERMISSIONS')) {
    define('WP_QUICKTASKER_API_DELETE_PERMISSIONS', ['delete_pipeline_stages', 'delete_pipeline_tasks']);
}

if (!class_exists('WP_Error')) {
    class WP_Error
    {
        private $code;
        private $data;

        public function __construct($code = '', $message = '', $data = '')
        {
            $this->code = $code;
            $this->data = $data;
        }

        public function get_error_code()
        {
            return $this->code;
        }

        public function get_error_data()
        {
            return $this->data;
        }
    }
}

if (!class_exists('WP_REST_Request')) {
    class WP_REST_Request
    {
    }
}

require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';
require_once __DIR__ . '/../../../../php/services/ApiTokenService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Services\ServiceLocator;
use WPQT\Token\ApiTokenService;

/**
 * Checks done on every API token request: the token, its board, its permissions and what its creator can still do.
 */
class ApiTokenServiceValidationTest extends TestCase
{
    private const TOKEN = '1-secret';
    private const CREATOR_ID = '7';

    /** @var object|null The saved token the request's token matches. */
    private $savedToken;

    /** @var bool Whether the token's board exists. */
    private $boardExists;

    /** @var bool Whether the token's creator can still access its board and manage settings. */
    private $creatorCanUseBoard;

    /** @var array The creator IDs canCreatorDelete() was asked about, and whether they can delete. */
    private $deleteChecks;
    private $creatorCanDelete;

    protected function setUp(): void
    {
        $this->savedToken = (object) [
            'id'                     => '3',
            'pipeline_id'            => '2',
            'created_by'             => self::CREATOR_ID,
            'get_pipeline'           => '1',
            'delete_pipeline_stages' => '0',
            'delete_pipeline_tasks'  => '1',
        ];
        $this->boardExists = true;
        $this->creatorCanUseBoard = true;
        $this->deleteChecks = [];
        $this->creatorCanDelete = true;

        $tokenRepo = $this->getMockBuilder(stdClass::class)->addMethods(['getToken'])->getMock();
        $tokenRepo->method('getToken')->willReturnCallback(function ($hashedToken) {
            return ApiTokenService::hashToken(self::TOKEN) === $hashedToken ? $this->savedToken : null;
        });
        ServiceLocator::register('ApiTokenRepository', $tokenRepo);

        $pipelineRepo = $this->getMockBuilder(stdClass::class)->addMethods(['getPipelineById'])->getMock();
        $pipelineRepo->method('getPipelineById')->willReturnCallback(function ($pipelineId) {
            return $this->boardExists ? (object) ['id' => $pipelineId] : null;
        });
        ServiceLocator::register('PipelineRepository', $pipelineRepo);

        $pipelineAccessService = $this->getMockBuilder(stdClass::class)
            ->addMethods(['canCreatorUseBoard', 'canCreatorDelete'])
            ->getMock();
        $pipelineAccessService->method('canCreatorUseBoard')->willReturnCallback(function () {
            return $this->creatorCanUseBoard;
        });
        $pipelineAccessService->method('canCreatorDelete')->willReturnCallback(function ($createdBy) {
            $this->deleteChecks[] = $createdBy;

            return $this->creatorCanDelete;
        });
        ServiceLocator::register('PipelineAccessService', $pipelineAccessService);
    }

    /**
     * A request with the given headers. Mocked, as only get_headers() is used.
     */
    private function request($headers)
    {
        $builder = $this->getMockBuilder(WP_REST_Request::class)->disableOriginalConstructor();
        // Another test may have defined a WP_REST_Request stub without get_headers().
        $builder = method_exists(WP_REST_Request::class, 'get_headers')
            ? $builder->onlyMethods(['get_headers'])
            : $builder->addMethods(['get_headers']);
        $request = $builder->getMock();
        $request->method('get_headers')->willReturn($headers);

        return $request;
    }

    private function validate($requiredPermissions, $token = self::TOKEN)
    {
        return ApiTokenService::validateAndSetRequestTokenCache(
            $this->request(['authorization' => ['Bearer ' . $token]]),
            $requiredPermissions
        );
    }

    private function assertError($status, $code, $result)
    {
        $this->assertInstanceOf(WP_Error::class, $result);
        $this->assertSame($code, $result->get_error_code());
        $this->assertSame(['status' => $status], $result->get_error_data());
    }

    public function test_rejects_a_request_without_a_token()
    {
        $this->assertError(401, 'missing_token', ApiTokenService::validateAndSetRequestTokenCache($this->request([]), ['get_pipeline']));
    }

    public function test_rejects_an_unknown_token()
    {
        $this->assertError(401, 'invalid_token', $this->validate(['get_pipeline'], '1-unknown'));
    }

    public function test_rejects_a_token_whose_board_was_deleted()
    {
        $this->boardExists = false;

        $this->assertError(401, 'invalid_token', $this->validate(['get_pipeline']));
    }

    public function test_rejects_a_token_whose_creator_lost_access_to_the_board()
    {
        $this->creatorCanUseBoard = false;

        $this->assertError(403, 'token_creator_no_access', $this->validate(['get_pipeline']));
    }

    public function test_rejects_a_token_without_the_required_permission()
    {
        $this->assertError(403, 'insufficient_permissions', $this->validate(['delete_pipeline_stages']));
    }

    public function test_accepts_a_valid_token_and_caches_it_for_the_request()
    {
        $this->assertTrue($this->validate(['get_pipeline']));
        $this->assertSame($this->savedToken, ApiTokenService::getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN));
    }

    public function test_rejects_deleting_when_the_creator_cannot_delete()
    {
        $this->creatorCanDelete = false;

        $this->assertError(403, 'token_creator_cannot_delete', $this->validate(['delete_pipeline_tasks']));
        $this->assertSame([self::CREATOR_ID], $this->deleteChecks);
    }

    public function test_allows_deleting_when_the_creator_can_delete()
    {
        $this->assertTrue($this->validate(['delete_pipeline_tasks']));
    }

    public function test_allows_other_requests_when_the_creator_cannot_delete()
    {
        $this->creatorCanDelete = false;

        $this->assertTrue($this->validate(['get_pipeline']));
        $this->assertSame([], $this->deleteChecks);
    }

    public function test_checks_a_token_without_a_creator_as_an_unknown_creator()
    {
        unset($this->savedToken->created_by);

        $this->assertTrue($this->validate(['delete_pipeline_tasks']));
        $this->assertSame([null], $this->deleteChecks);
    }

    public function test_rejects_a_missing_delete_permission_before_checking_the_creator()
    {
        $this->creatorCanDelete = false;

        $this->assertError(403, 'insufficient_permissions', $this->validate(['delete_pipeline_stages']));
        $this->assertSame([], $this->deleteChecks);
    }
}
