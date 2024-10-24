<?php

namespace WPQT\Capability;

class CapabilityService {

    /**
     * Adds the QuickTasker admin capability to the administrator role.
     *
     * This function checks if the administrator role has the QuickTasker admin capability.
     * If the capability is not present, it adds the capability to the administrator role.
     *
     * @return void
     */
    public function addQuickTaskerAdminCapabilityToAdminRole() {
        $adminRole = get_role('administrator');

        if ( !$adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE) ) {
            $adminRole->add_cap(WP_QUICKTASKER_ADMIN_ROLE);
        }
    }

    /**
     * Removes the QuickTasker admin capability from the administrator role.
     *
     * This function checks if the administrator role has the QuickTasker admin capability
     * and removes it if present.
     *
     * @return void
     */
    public function removeQuickTaskerAdminCapabilityFromAdminRole() {
        $adminRole = get_role('administrator');

        if ( $adminRole->has_cap(WP_QUICKTASKER_ADMIN_ROLE) ) {
            $adminRole->remove_cap(WP_QUICKTASKER_ADMIN_ROLE);
        }
    }
}