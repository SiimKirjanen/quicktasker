<?php

namespace WPQT\Capability;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Capability\CapabilityService' ) ) {
    class CapabilityService {

        /**
         * Adds QuickTasker admin capabilities to the administrator role.
         *
         * This function checks if the administrator role has specific QuickTasker capabilities.
         * If the capabilities are not present, they are added to the administrator role.
         *
         * Capabilities added:
         * - WP_QUICKTASKER_ADMIN_ROLE
         * - WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE
         * - WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS
         * - WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS
         *
         * @return void
         */
        public function addQuickTaskerAdminCapabilityToAdminRole() {
            $adminRole = get_role('administrator');

            if ( !$adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE) ) {
                $adminRole->add_cap(WP_QUICKTASKER_ADMIN_ROLE);
            }

            if ( !$adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE) ) {
                $adminRole->add_cap(WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE);
            }

            if ( !$adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS) ) {
                $adminRole->add_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS);
            }

            if ( !$adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS) ) {
                $adminRole->add_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS);
            }
        }

         /**
         * Removes specific QuickTasker capabilities from the administrator role.
         *
         * This function checks if the administrator role has the following capabilities:
         * - WP_QUICKTASKER_ADMIN_ROLE
         * - WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE
         * - WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS
         * - WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS
         *
         * If any of these capabilities are found, they are removed from the administrator role.
         *
         * @return void
         */
        public function removeQuickTaskerAdminCapabilityFromAdminRole() {
            $adminRole = get_role('administrator');

            if ( $adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE) ) {
                $adminRole->remove_cap(WP_QUICKTASKER_ADMIN_ROLE);
            }

            if ( $adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE) ) {
                $adminRole->remove_cap(WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE);
            }

            if ( $adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS) ) {
                $adminRole->remove_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS);
            }

            if ( $adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS) ) {
                $adminRole->remove_cap(WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS);
            }
        }

        /**
         * Updates the capabilities of a WordPress user.
         *
         * @param int   $userId       The ID of the user whose capabilities are to be updated.
         * @param array $capabilities An associative array of capabilities to be updated.
         *                            The key is the capability name and the value is a boolean
         *                            indicating whether to add (true) or remove (false) the capability.
         *
         * @return void
         */
        public function updateWPUserCapabilities($userId, $capabilities) {
            $user = get_user_by('id', $userId);

            if ($user) {
                foreach ($capabilities as $capability => $value) {
                    if ($value) {
                        $user->add_cap($capability);
                    } else {
                        $user->remove_cap($capability);
                    }
                }
            }
        }
    }
}