<?php
namespace WPQT\Password;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class PasswordService {

    /**
     * Creates a password hash using the default algorithm.
     *
     * @param string $password The password to be hashed.
     * @return string The hashed password.
     */
    public function createPasswordHash($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * Verifies a password against its hash.
     *
     * @param string $password The password to verify.
     * @param string $hash The hash to compare against.
     * @return bool Returns true if the password matches the hash, false otherwise.
     */
    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }

    /**
     * Stores the password for a user.
     *
     * @param int $userId The ID of the user.
     * @param string $password The password to be stored.
     * @return bool Returns true if the password is successfully stored, otherwise throws an exception.
     * @throws Exception Throws an exception if failed to store the password.
     */
    public function storePassword($userId, $password) {
        global $wpdb;

        $passwordHash = $this->createPasswordHash($password);
       
        $rowsUpdated = $wpdb->update(
            TABLE_WP_QUICK_TASKS_USERS,
            array(
                'password' => $passwordHash,
            ),
            array(
                'id' => $userId
            )
        );

        if( $rowsUpdated === false ) {
            throw new Exception('Failed to store password');
        }

        return true;
    }
}