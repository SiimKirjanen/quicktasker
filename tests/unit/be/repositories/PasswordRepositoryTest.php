<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_USERS')) {
    define('TABLE_WP_QUICKTASKER_USERS', 'wp_quicktasker_users');
}
if (!defined('TABLE_WP_QUICKTASKER_USER_PAGES')) {
    define('TABLE_WP_QUICKTASKER_USER_PAGES', 'wp_quicktasker_user_pages');
}

require_once __DIR__ . '/../../../../php/repositories/PasswordRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Password\PasswordRepository;

class PasswordRepositoryTest extends TestCase
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
            ->addMethods(['prepare', 'get_var'])
            ->getMock();

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new PasswordRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUserPagePasswordByHash_returns_password_when_found()
    {
        $hash = 'abc123def456';
        $preparedSql = "PREPARED_SQL";
        $expectedPassword = '$2y$10$abcdefghijklmnopqrstuvwxyz1234567890';

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($expectedPassword);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($expectedPassword, $result);
    }

    public function test_getUserPagePasswordByHash_returns_null_when_hash_not_found()
    {
        $hash = 'nonexistent';
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertNull($result);
    }

    public function test_getUserPagePasswordByHash_with_bcrypt_password()
    {
        $hash = 'user123hash';
        $preparedSql = "PREPARED_SQL";
        $bcryptPassword = '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhwy';

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($bcryptPassword);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($bcryptPassword, $result);
        $this->assertStringStartsWith('$2y$', $result);
    }

    public function test_getUserPagePasswordByHash_with_different_hash_formats()
    {
        $testCases = [
            ['hash' => 'short', 'password' => 'pass123'],
            ['hash' => 'very-long-hash-string-with-multiple-characters-123456789', 'password' => 'complex$2y$10$pass'],
            ['hash' => '12345', 'password' => '$2y$10$hashedvalue'],
            ['hash' => 'special-chars-!@#$%', 'password' => 'password']
        ];

        foreach ($testCases as $testCase) {
            $preparedSql = "PREPARED_SQL";

            $this->wpdbMock->expects($this->once())
                ->method('prepare')
                ->willReturn($preparedSql);

            $this->wpdbMock->expects($this->once())
                ->method('get_var')
                ->with($preparedSql)
                ->willReturn($testCase['password']);

            $result = $this->repository->getUserPagePasswordByHash($testCase['hash']);

            $this->assertEquals($testCase['password'], $result);

            // Reset for next iteration
            $this->tearDown();
            $this->setUp();
        }
    }

    public function test_getUserPagePasswordByHash_joins_users_and_pages_tables()
    {
        $hash = 'test123';
        $preparedSql = "PREPARED_SQL";
        $password = 'secure_password';

        // The prepare method should receive the SQL with JOIN
        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->stringContains('INNER JOIN')
            )
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($password);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($password, $result);
    }

    public function test_getUserPagePasswordByHash_selects_password_field()
    {
        $hash = 'page123';
        $preparedSql = "PREPARED_SQL";
        $password = 'hashed_password';

        // Verify that the SQL contains SELECT a.password
        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->logicalAnd(
                    $this->stringContains('SELECT a.password'),
                    $this->stringContains('page_hash')
                )
            )
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($password);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($password, $result);
    }

    public function test_getUserPagePasswordByHash_with_empty_password()
    {
        $hash = 'empty_password_user';
        $preparedSql = "PREPARED_SQL";
        $emptyPassword = '';

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($emptyPassword);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals('', $result);
        $this->assertIsString($result);
    }

    public function test_getUserPagePasswordByHash_returns_string_type()
    {
        $hash = 'type_test';
        $preparedSql = "PREPARED_SQL";
        $password = 'test_password';

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($password);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertIsString($result);
    }

    public function test_getUserPagePasswordByHash_with_long_hash()
    {
        $hash = str_repeat('a', 255); // Very long hash
        $preparedSql = "PREPARED_SQL";
        $password = 'password_for_long_hash';

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($password);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($password, $result);
    }

    public function test_getUserPagePasswordByHash_uses_prepared_statement()
    {
        $hash = 'security_test';
        $preparedSql = "PREPARED_SQL";
        $password = 'secure_pass';

        // Verify that prepare is called with the hash parameter placeholder
        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with(
                $this->stringContains('%s'),
                $hash
            )
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_var')
            ->with($preparedSql)
            ->willReturn($password);

        $result = $this->repository->getUserPagePasswordByHash($hash);

        $this->assertEquals($password, $result);
    }
}
