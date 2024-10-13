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
     * @throws WPQTException If failed to delete existing session or create new session.
     */
    public function createSession($userId, $userPageHash) {
        global $wpdb;

        $result = $wpdb->insert(
            TABLE_WP_QUICKTASKER_USER_SESSIONS,
            array(
                'user_id' => $userId,
                'page_hash' => $userPageHash,
                'created_at_utc' => $this->getCurrentUTCTime(),
                'expires_at_utc' => $this->getNewTokenExpiryDate(),
                'session_token' => $this->generateSessionToken()
            )
        );

        if( $result === false ) {
            throw new WPQTException('Failed to create new session');
        }
        
        return $this->sessionRepository->getUserSessionById($wpdb->insert_id);
    }

  
    /**
     * Deletes a session by marking it as inactive in the database.
     *
     * This function updates the `is_active` field to 0 for the session
     * identified by the provided session token.
     *
     * @param string $sessionToken The token of the session to be marked as inactive.
     * @return bool Returns true if the session was successfully marked as inactive.
     * @throws WPQTException If the session could not be marked as inactive.
     */
    public function markSessionInactive($sessionToken) {
        global $wpdb;

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USER_SESSIONS,
            array(
                'is_active' => 0
            ),
            array(
                'session_token' => $sessionToken
            )
        );

        if( $result === false ) {
            throw new WPQTException('Failed to mark session as not active', true);
        }

        return true;
    }

    /**
     * Deletes a session from the database.
     *
     * @param int $sessionId The ID of the session to delete.
     * @return bool True on successful deletion.
     * @throws WPQTException If the session deletion fails.
     */
    public function deleteSession($sessionId) {
        global $wpdb;

        $result = $wpdb->delete(
            TABLE_WP_QUICKTASKER_USER_SESSIONS,
            array(
                'id' => $sessionId
            )
        );

        if( $result === false ) {
            throw new WPQTException('Failed to delete session', true);
        }

        return true;
    }

    /**
     * Changes the status of a user session.
     *
     * This function updates the 'is_active' status of a user session in the database.
     *
     * @param int $sessionId The ID of the session to update.
     * @param bool $status The new status of the session (true for active, false for inactive).
     * @return bool Returns true on success.
     * @throws WPQTException If the update fails.
     */
    public function changeSessionStatus($sessionId, $status) {
        global $wpdb;

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USER_SESSIONS,
            array(
                'is_active' => $status
            ),
            array(
                'id' => $sessionId
            )
        );

        if( $result === false ) {
            throw new WPQTException('Failed to change session status', true);
        }

        return true;
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
            throw new WPQTException(WP_QUICKTASKER_INVALID_SESSION_TOKEN, true);
        }

        if($pageHash !== $session->page_hash) {
            throw new WPQTException('Session token does not match the page hash', true);
        }

        if( $session->is_active === '0' ) {
            throw new WPQTException('Session is not active', true);
        }

        if( strtotime($session->expires_at_utc) < time() ) {
            throw new WPQTException('Session has expired', true);
        }

        return $session;
    } 
}