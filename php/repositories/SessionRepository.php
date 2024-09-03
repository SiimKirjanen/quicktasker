<?php
namespace WPQT\Session;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class SessionRepository{
    public function getUserSession($sessionToken){
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_USER_SESSIONS . " WHERE session_token = %s",
                $sessionToken
            )
        );
    }
    public function getUserSessionById($sessionId){
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_USER_SESSIONS . " WHERE id = %d",
                $sessionId
            )
        );
    }
}