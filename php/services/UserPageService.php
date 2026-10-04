<?php

namespace WPQT\UserPage;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\UserPage\UserPageService')) {
    class UserPageService
    {
        /**
         * Check if a page user may use the user page: active and not deleted.
         *
         * @param object $pageUser The user returned by UserPageRepository::getPageUserByHash().
         * @return bool Returns true if the user is active and not deleted, false otherwise.
         */
        public function isPageUserActive($pageUser)
        {
            return (bool) $pageUser->is_active && !(bool) $pageUser->deleted;
        }

        public function checkIfUserPageSetupCompleted($userId)
        {
            $hasPassword = ServiceLocator::get('UserService')->checkIfUserHasPassword($userId);

            if (!$hasPassword) {
                return false;
            }

            return true;
        }
    }
}
