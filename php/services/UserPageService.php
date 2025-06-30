<?php
namespace WPQT\UserPage;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\UserPage\UserPageService' ) ) {
    class UserPageService {        
        /**
         * Check if a user page hash exists.
         *
         * @param string $pageHash The hash of the user page.
         * @return bool Returns true if the user page hash exists, false otherwise.
         */
        public function checkIfUserPageHashExists($pageHash) {
            $userPage = ServiceLocator::get('UserPageRepository')->getUserPageByHash($pageHash);

            return $userPage !== null;
        }

        public function checkIfUserPageSetupCompleted($userId) {
            $hasPassword = ServiceLocator::get('UserService')->checkIfUserHasPassword($userId);

            if( !$hasPassword ) {
                return false;
            }
            return true;
        }
    }
}