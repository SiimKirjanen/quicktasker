<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_USER_PAGES')) {
    define('TABLE_WP_QUICKTASKER_USER_PAGES', 'wp_quicktasker_user_pages');
}
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}

require_once __DIR__ . '/../../../../php/repositories/UserPageRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\UserPage\UserPageRepository;

class UserPageRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_row'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new UserPageRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUserPageByHash_returns_user_page_when_found()
    {
        $pageHash = 'abc123hash';
        $expectedSql = "SELECT * FROM " . TABLE_WP_QUICKTASKER_USER_PAGES . " WHERE page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUserPage = (object)[
            'id' => 1,
            'user_id' => 10,
            'page_hash' => 'abc123hash',
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-02 12:00:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUserPage);

        $result = $this->repository->getUserPageByHash($pageHash);

        $this->assertSame($expectedUserPage, $result);
    }

    public function test_getUserPageByHash_returns_null_when_not_found()
    {
        $pageHash = 'nonexistent';
        $expectedSql = "SELECT * FROM " . TABLE_WP_QUICKTASKER_USER_PAGES . " WHERE page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUserPageByHash($pageHash);

        $this->assertNull($result);
    }

    public function test_getUserPageByHash_with_different_hash()
    {
        $pageHash = 'xyz789different';
        $expectedSql = "SELECT * FROM " . TABLE_WP_QUICKTASKER_USER_PAGES . " WHERE page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUserPage = (object)[
            'id' => 5,
            'user_id' => 50,
            'page_hash' => 'xyz789different',
            'created_at' => '2024-03-01 10:00:00',
            'updated_at' => '2024-03-05 15:30:00'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUserPage);

        $result = $this->repository->getUserPageByHash($pageHash);

        $this->assertSame($expectedUserPage, $result);
        $this->assertEquals('xyz789different', $result->page_hash);
        $this->assertEquals(50, $result->user_id);
    }

    public function test_getPageUserByHash_returns_user_with_page_info_when_found()
    {
        $pageHash = 'user123hash';
        $expectedSql = "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.page_hash, b.user_id FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a 
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id 
                    WHERE b.page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUser = (object)[
            'id' => 10,
            'name' => 'John Doe',
            'description' => 'Test user description',
            'created_at' => '2024-01-01 12:00:00',
            'updated_at' => '2024-01-15 14:30:00',
            'is_active' => 1,
            'page_hash' => 'user123hash',
            'user_id' => 10
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUser);

        $result = $this->repository->getPageUserByHash($pageHash);

        $this->assertSame($expectedUser, $result);
    }

    public function test_getPageUserByHash_returns_null_when_not_found()
    {
        $pageHash = 'invalidhash';
        $expectedSql = "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.page_hash, b.user_id FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a 
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id 
                    WHERE b.page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getPageUserByHash($pageHash);

        $this->assertNull($result);
    }

    public function test_getPageUserByHash_with_different_user_data()
    {
        $pageHash = 'another456hash';
        $expectedSql = "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.page_hash, b.user_id FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a 
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id 
                    WHERE b.page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUser = (object)[
            'id' => 25,
            'name' => 'Jane Smith',
            'description' => 'Another user',
            'created_at' => '2024-02-10 09:00:00',
            'updated_at' => '2024-02-20 11:45:00',
            'is_active' => 0,
            'page_hash' => 'another456hash',
            'user_id' => 25
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUser);

        $result = $this->repository->getPageUserByHash($pageHash);

        $this->assertSame($expectedUser, $result);
        $this->assertEquals('Jane Smith', $result->name);
        $this->assertEquals(0, $result->is_active);
        $this->assertEquals('another456hash', $result->page_hash);
    }

    public function test_getPageUserByHash_includes_all_user_fields()
    {
        $pageHash = 'fulldata';
        $expectedSql = "SELECT a.id, a.name, a.description, a.created_at, a.updated_at, a.is_active, b.page_hash, b.user_id FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a 
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id 
                    WHERE b.page_hash = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUser = (object)[
            'id' => 100,
            'name' => 'Complete User',
            'description' => 'Full description text',
            'created_at' => '2023-12-01 08:00:00',
            'updated_at' => '2024-03-01 17:00:00',
            'is_active' => 1,
            'page_hash' => 'fulldata',
            'user_id' => 100
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $pageHash)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUser);

        $result = $this->repository->getPageUserByHash($pageHash);

        // Verify all expected properties exist
        $this->assertObjectHasProperty('id', $result);
        $this->assertObjectHasProperty('name', $result);
        $this->assertObjectHasProperty('description', $result);
        $this->assertObjectHasProperty('created_at', $result);
        $this->assertObjectHasProperty('updated_at', $result);
        $this->assertObjectHasProperty('is_active', $result);
        $this->assertObjectHasProperty('page_hash', $result);
        $this->assertObjectHasProperty('user_id', $result);
    }
}
