<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define table constants
if (!defined('TABLE_WP_QUICKTASKER_UPLOADS')) {
    define('TABLE_WP_QUICKTASKER_UPLOADS', 'wp_quicktasker_uploads');
}

require_once __DIR__ . '/../../../../php/repositories/UploadRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Upload\UploadRepository;

class UploadRepositoryTest extends TestCase
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
        
        // Add users property (WordPress core table)
        $this->wpdbMock->users = 'wp_users';

        // Set the global $wpdb to our mock
        $GLOBALS['wpdb'] = $this->wpdbMock;

        $this->repository = new UploadRepository();
    }

    protected function tearDown(): void
    {
        // Restore the original $wpdb
        $GLOBALS['wpdb'] = $this->wpdbBackup;
    }

    public function test_getUpload_returns_upload_with_uploader_info()
    {
        $uploadId = 42;
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.id = %d";
        $preparedSql = "PREPARED_SQL";

        $expectedUpload = (object)[
            'id' => 42,
            'file_name' => 'document.pdf',
            'file_type' => 'application/pdf',
            'upload_uuid' => 'abc-123-def-456',
            'entity_id' => 10,
            'entity_type' => 'task',
            'created_at' => '2024-01-01 12:00:00',
            'uploader_id' => 5,
            'uploader_name' => 'John Doe'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $uploadId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUpload);

        $result = $this->repository->getUpload($uploadId);

        $this->assertSame($expectedUpload, $result);
    }

    public function test_getUpload_returns_null_when_not_found()
    {
        $uploadId = 999;
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.id = %d";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $uploadId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn(null);

        $result = $this->repository->getUpload($uploadId);

        $this->assertNull($result);
    }

    public function test_getUpload_returns_upload_with_image_file()
    {
        $uploadId = 1;
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.id = %d";
        $preparedSql = "PREPARED_SQL";

        $expectedUpload = (object)[
            'id' => 1,
            'file_name' => 'screenshot.png',
            'file_type' => 'image/png',
            'upload_uuid' => 'xyz-789-uvw-012',
            'entity_id' => 25,
            'entity_type' => 'comment',
            'created_at' => '2024-02-15 14:30:00',
            'uploader_id' => 12,
            'uploader_name' => 'Jane Smith'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $uploadId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUpload);

        $result = $this->repository->getUpload($uploadId);

        $this->assertSame($expectedUpload, $result);
        $this->assertEquals('image/png', $result->file_type);
        $this->assertEquals('screenshot.png', $result->file_name);
    }

    public function test_getUpload_includes_all_expected_fields()
    {
        $uploadId = 100;
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.id = %d";
        $preparedSql = "PREPARED_SQL";

        $expectedUpload = (object)[
            'id' => 100,
            'file_name' => 'test.txt',
            'file_type' => 'text/plain',
            'upload_uuid' => 'unique-uuid',
            'entity_id' => 1,
            'entity_type' => 'task',
            'created_at' => '2024-01-01 00:00:00',
            'uploader_id' => 1,
            'uploader_name' => 'Admin'
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $uploadId)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_row')
            ->with($preparedSql)
            ->willReturn($expectedUpload);

        $result = $this->repository->getUpload($uploadId);

        // Verify all expected properties exist
        $this->assertObjectHasProperty('id', $result);
        $this->assertObjectHasProperty('file_name', $result);
        $this->assertObjectHasProperty('file_type', $result);
        $this->assertObjectHasProperty('upload_uuid', $result);
        $this->assertObjectHasProperty('entity_id', $result);
        $this->assertObjectHasProperty('entity_type', $result);
        $this->assertObjectHasProperty('created_at', $result);
        $this->assertObjectHasProperty('uploader_id', $result);
        $this->assertObjectHasProperty('uploader_name', $result);
    }

    public function test_getUploads_returns_multiple_uploads_for_entity()
    {
        $entityId = 10;
        $entityType = 'task';
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.entity_id = %d AND uploads.entity_type = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUploads = [
            (object)[
                'id' => 1,
                'file_name' => 'file1.pdf',
                'file_type' => 'application/pdf',
                'upload_uuid' => 'uuid-1',
                'entity_id' => 10,
                'entity_type' => 'task',
                'created_at' => '2024-01-01 10:00:00',
                'uploader_id' => 5,
                'uploader_name' => 'John Doe'
            ],
            (object)[
                'id' => 2,
                'file_name' => 'file2.jpg',
                'file_type' => 'image/jpeg',
                'upload_uuid' => 'uuid-2',
                'entity_id' => 10,
                'entity_type' => 'task',
                'created_at' => '2024-01-02 11:00:00',
                'uploader_id' => 6,
                'uploader_name' => 'Jane Smith'
            ],
            (object)[
                'id' => 3,
                'file_name' => 'file3.docx',
                'file_type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'upload_uuid' => 'uuid-3',
                'entity_id' => 10,
                'entity_type' => 'task',
                'created_at' => '2024-01-03 12:00:00',
                'uploader_id' => 7,
                'uploader_name' => 'Bob Johnson'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $entityId, $entityType)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedUploads);

        $result = $this->repository->getUploads($entityId, $entityType);

        $this->assertSame($expectedUploads, $result);
        $this->assertCount(3, $result);
    }

    public function test_getUploads_returns_empty_array_when_no_uploads()
    {
        $entityId = 999;
        $entityType = 'task';
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.entity_id = %d AND uploads.entity_type = %s";
        $preparedSql = "PREPARED_SQL";

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $entityId, $entityType)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn([]);

        $result = $this->repository->getUploads($entityId, $entityType);

        $this->assertSame([], $result);
    }

    public function test_getUploads_filters_by_entity_type()
    {
        $entityId = 5;
        $entityType = 'comment';
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.entity_id = %d AND uploads.entity_type = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUploads = [
            (object)[
                'id' => 50,
                'file_name' => 'comment-attachment.png',
                'file_type' => 'image/png',
                'upload_uuid' => 'comment-uuid',
                'entity_id' => 5,
                'entity_type' => 'comment',
                'created_at' => '2024-03-01 15:00:00',
                'uploader_id' => 10,
                'uploader_name' => 'Commenter Name'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $entityId, $entityType)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedUploads);

        $result = $this->repository->getUploads($entityId, $entityType);

        $this->assertSame($expectedUploads, $result);
        $this->assertEquals('comment', $result[0]->entity_type);
    }

    public function test_getUploads_returns_single_upload_in_array()
    {
        $entityId = 20;
        $entityType = 'task';
        $expectedSql = "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $this->wpdbMock->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.entity_id = %d AND uploads.entity_type = %s";
        $preparedSql = "PREPARED_SQL";

        $expectedUploads = [
            (object)[
                'id' => 75,
                'file_name' => 'single-file.txt',
                'file_type' => 'text/plain',
                'upload_uuid' => 'single-uuid',
                'entity_id' => 20,
                'entity_type' => 'task',
                'created_at' => '2024-02-20 09:30:00',
                'uploader_id' => 15,
                'uploader_name' => 'Single Uploader'
            ]
        ];

        $this->wpdbMock->expects($this->once())
            ->method('prepare')
            ->with($expectedSql, $entityId, $entityType)
            ->willReturn($preparedSql);

        $this->wpdbMock->expects($this->once())
            ->method('get_results')
            ->with($preparedSql)
            ->willReturn($expectedUploads);

        $result = $this->repository->getUploads($entityId, $entityType);

        $this->assertIsArray($result);
        $this->assertCount(1, $result);
        $this->assertEquals('single-file.txt', $result[0]->file_name);
    }
}
