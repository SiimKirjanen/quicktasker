<?php
namespace WPQT\Location;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Location\LocationService' ) ) {
    class LocationService {

        /**
         * Checks if the current page is a WP Quick Tasks page.
         *
         * @return bool Returns true if the current page is a WP Quick Tasks page, false otherwise.
         */
        public function isWPQTPage() {
            if ( isset($_GET['page']) && $_GET['page'] === 'wp-quick-tasks' ) {
                return true;
            }

            return false;
        }

        /**
         * Checks if the current page is the WP Quick Tasks public user page.
         *
         * @return bool Returns true if the current page is the WP Quick Tasks public user page, false otherwise.
         */
        public function isWPQTPublicUserPage() {
            if ( isset($_GET['page']) && $_GET['page'] === WP_QUICKTASKER_PUBLIC_USER_PAGE_ID && isset($_GET['code']) ) {
                return true;
            }

            return false;
        }

        public function isWPQTTaskPDFExportPage() {
            if ( isset($_GET['wpqt-page']) && $_GET['wpqt-page'] === WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID ) {
                return true;
            }

            return false;
        }
    }
}