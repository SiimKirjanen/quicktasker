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
         * This function checks if the administrator role has the QuickTasker admin capabilities
         * defined by WP_QUICKTASKER_ADMIN_ROLE and WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE.
         * If the capabilities are not present, they are added to the administrator role.
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
        }

        /**
         * Removes QuickTasker admin capabilities from the administrator role.
         *
         * This function checks if the administrator role has the QuickTasker admin capabilities
         * defined by WP_QUICKTASKER_ADMIN_ROLE and WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE.
         * If the capabilities are present, they are removed from the administrator role.
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