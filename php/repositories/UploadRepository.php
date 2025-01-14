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
                    "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $wpdb->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.id = %d",
                    $uploadId
                )
            );
        }
        public function getUploads($entityId, $entityType) {
            global $wpdb;

            return $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT uploads.id, uploads.file_name, uploads.file_type, uploads.upload_uuid, uploads.entity_id, uploads.entity_type, uploads.created_at, uploads.uploader_id, wp_users.display_name AS uploader_name
                    FROM " . TABLE_WP_QUICKTASKER_UPLOADS . " AS uploads
                    LEFT JOIN " . $wpdb->users . " AS wp_users ON uploads.uploader_id = wp_users.ID 
                    WHERE uploads.entity_id = %d AND uploads.entity_type = %s",
                    $entityId, $entityType
                )
            );
        }
    }
}