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
    }
}