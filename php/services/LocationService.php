<?php
namespace WPQT\Location;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class LocationService {
    public function isWPQTPage() {
        if ( isset($_GET['page']) && $_GET['page'] === 'wp-quick-tasks' ) {
            return true;
        }

        return false;
    }
    public function isWPQTPublicUserPage() {
        if ( isset($_GET['page']) && $_GET['page'] === WP_QUICK_TASKS_PUBLIC_USER_PAGE_ID && isset($_GET['code']) ) {
            return true;
        }

        return false;
    }
}