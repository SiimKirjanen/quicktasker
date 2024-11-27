<?php
namespace WPQT\Password;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Password\PasswordRepository' ) ) {
    class PasswordRepository {
        public function getUserPagePasswordByHash($hash) {
            global $wpdb;

            return $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT a.password 
                    FROM " . TABLE_WP_QUICKTASKER_USERS . " AS a
                    INNER JOIN " . TABLE_WP_QUICKTASKER_USER_PAGES . " AS b
                    ON a.id = b.user_id
                    WHERE b.page_hash = %s",
                    $hash
                )
            );
        }
    }
}