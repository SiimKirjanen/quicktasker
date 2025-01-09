<?php
namespace WPQT\Upload;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Upload\UploadService' ) ) {
    class UploadService{
        public function setUpUploadsFolders(){
            $folderCreated = $this->createTasksUploadFolder();

            if( $folderCreated ){
                ServiceLocator::get('FileService')->createSilenceIndexFile(WP_QUICKTASKER_UPLOAD_FOLDER_DIR);
                ServiceLocator::get('FileService')->createSilenceIndexFile(WP_QUICKTASKER_TASK_UPLOAD_FOLDER_DIR);
            }
        }

        public function createTasksUploadFolder(){
            return ServiceLocator::get('FileService')->createDirectory(WP_QUICKTASKER_TASK_UPLOAD_FOLDER_DIR);
        }

        public function uploadFile($entityId, $entityType, $file) {
            $uploadRecord = $this->insertUploadRecord($entityId, $entityType, $file);
            $uploadPath = $this->saveFileToDisc($file, $uploadRecord);

            return $uploadRecord;
        }

        public function saveFileToDisc($file, $uploadRecord) {
            $uploadDir = WP_QUICKTASKER_TASK_UPLOAD_FOLDER_DIR;
            $uploadUUID = $uploadRecord->upload_uuid;
            $uploadPath = $uploadDir . DIRECTORY_SEPARATOR . $uploadUUID;
        
            // Ensure the upload directory exists
            ServiceLocator::get('FileService')->createDirectory($uploadPath);
        
            // Construct the full file path
            $filePath = $uploadPath . DIRECTORY_SEPARATOR . basename($file['name']);
        
            // Move the uploaded file to the target directory
            $fileSaved = move_uploaded_file($file['tmp_name'], $filePath);
        
            if ($fileSaved === false) {
                throw new \Exception('Failed to save file to disk.');
            }
        
            return $filePath;
        }

        /**
         * Inserts a new upload record into the database.
         *
         * @param int $entityId The ID of the entity associated with the upload.
         * @param string $entityType The type of the entity associated with the upload.
         * @param array $file An associative array containing file details, including 'name' and 'extension'.
         * 
         * @throws \Exception If the insert operation fails.
         * 
         * @return array The newly inserted upload record.
         */
        public function insertUploadRecord($entityId, $entityType, $file) {
            global $wpdb;

            $rowsInserted = $wpdb->insert(
                TABLE_WP_QUICKTASKER_UPLOADS,
                array(
                    'entity_id' => $entityId,
                    'entity_type' => $entityType,
                    'file_name' => $file['name'],
                    'file_type' => $file['type'],
                    'upload_uuid' => ServiceLocator::get('UUIDService')->generateUUIDV4(),
                    'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
                )
            );

            if( $rowsInserted === false ){
                throw new \Exception('Failed to insert upload record.');
            }

            return ServiceLocator::get('UploadRepository')->getUpload( $wpdb->insert_id );
        }

    }
}