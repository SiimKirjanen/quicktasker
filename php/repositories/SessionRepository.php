<?php
namespace WPQT\Session;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class SessionRepository{

    /**
     * Retrieves the user session based on the session token.
     *
     * @param string $sessionToken The session token to retrieve the user session.
     * @return object|null The user session object if found, null otherwise.
     */
    public function getUserSession($sessionToken){
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_USER_SESSIONS . " WHERE session_token = %s",
                $sessionToken
            )
        );
    }
    /**
     * Retrieves a user session by its ID.
     *
     * @param int $sessionId The ID of the session to retrieve.
     * @return object|null The session object if found, null otherwise.
     */
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