<?php
namespace WPQT\Upload;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Upload\UploadRepository' ) ) {
    class UploadRepository{
        public function getUpload($uploadId) {
            global $wpdb;

            return $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT id, file_name, file_type, upload_uuid, entity_id, entity_type, created_at
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " 
                    WHERE id = %d",
                    $uploadId
                )
            );
        }
        public function getUploads($entityId, $entityType) {
            global $wpdb;

            return $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT id, file_name, file_type, upload_uuid, entity_type, entity_type, created_at
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " 
                    WHERE entity_id = %d AND entity_type = %s",
                    $entityId, $entityType
                )
            );
        }
    }
}