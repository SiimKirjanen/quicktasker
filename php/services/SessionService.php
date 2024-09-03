<?php
namespace WPQT\Session;

use WPQT\Session\SessionRepository;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}
class SessionService {
    protected $sessionRepository;

    public function __construct() {
        $this->sessionRepository = new SessionRepository();
    }

    public function getNewTokenExpiryDate() {
         // Get the current UTC time
         $current_time = time();
        
         // Calculate the expiry date by adding one hour
         $expiry_time = $current_time + HOUR_IN_SECONDS;
         
         // Return the expiry date in 'Y-m-d H:i:s' format in UTC
         return gmdate('Y-m-d H:i:s', $expiry_time);
    }

    public function getCurrentUTCTime() {
        // Get the current UTC time in 'Y-m-d H:i:s' format
        return gmdate('Y-m-d H:i:s');
    }

    public function generateSessionToken() {
        return bin2hex(random_bytes(32));
    }

    public function createSession($userId, $userPageHash) {
        global $wpdb;

        $result1 = $wpdb->delete(
            TABLE_WP_QUICK_TASKS_USER_SESSIONS,
            array(
                'user_id' => $userId,
                'page_hash' => $userPageHash
            )
        );

        if( $result1 === false ) {
            throw new \Exception('Failed to delete existing session');
        }

        $result2 = $wpdb->insert(
            TABLE_WP_QUICK_TASKS_USER_SESSIONS,
            array(
                'user_id' => $userId,
                'page_hash' => $userPageHash,
                'created_at_utc' => $this->getCurrentUTCTime(),
                'expires_at_utc' => $this->getNewTokenExpiryDate(),
                'session_token' => $this->generateSessionToken()
            )
        );

        if( $result2 === false ) {
            throw new \Exception('Failed to create new session');
        }
        
        return $this->sessionRepository->getUserSessionById($wpdb->insert_id);
    }
}