<?php
namespace WPQT\Session;

use WPQT\Session\SessionRepository;
use WPQT\WPQTException;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}
class SessionService {
    protected $sessionRepository;

    public function __construct() {
        $this->sessionRepository = new SessionRepository();
    }

    /**
     * Calculates the expiry date for a new token.
     *
     * This method calculates the expiry date for a new token by adding one hour to the current UTC time.
     *
     * @return string The expiry date in 'Y-m-d H:i:s' format in UTC.
     */
    public function getNewTokenExpiryDate() {
         // Get the current UTC time
         $current_time = time();
        
         // Calculate the expiry date by adding one hour
         $expiry_time = $current_time + HOUR_IN_SECONDS;
         
         // Return the expiry date in 'Y-m-d H:i:s' format in UTC
         return gmdate('Y-m-d H:i:s', $expiry_time);
    }

    /**
     * Retrieves the current UTC time in 'Y-m-d H:i:s' format.
     *
     * @return string The current UTC time.
     */
    public function getCurrentUTCTime() {
        // Get the current UTC time in 'Y-m-d H:i:s' format
        return gmdate('Y-m-d H:i:s');
    }

    /**
     * Generates a session token.
     *
     * @return string The generated session token.
     */
    public function generateSessionToken() {
        return bin2hex(random_bytes(32));
    }

    /**
     * Creates a new session for a user.
     *
     * @param int $userId The ID of the user.
     * @param string $userPageHash The page hash associated with the user.
     * @return UserSession The newly created user session.
     * @throws \Exception If failed to delete existing session or create new session.
     */
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

  
    /**
     * Verifies the session token.
     *
     * @throws \Exception If the session token is invalid or has expired.
     *
     * @return Session|null The session object if the token is valid and has not expired, null otherwise.
     */
    public function verifySessionToken($pageHash) {
        $sessionToken = $_COOKIE['wpqt-session-token-' . $pageHash];
        $session = $this->sessionRepository->getUserSession($sessionToken);

        if( $session === null ) {
            throw new WPQTException('Invalid session token', true);
        }

        if($pageHash !== $session->page_hash) {
            throw new WPQTException('Session token does not match the page hash', true);
        }

        if( strtotime($session->expires_at_utc) < time() ) {
            throw new WPQTException('Session has expired', true);
        }

        return $session;
    } 
}