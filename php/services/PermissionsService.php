<?php

class PermissionsRepository {
    /**
     * Checks if the current user has the required permissions to access the private API.
     *
     * @return bool Returns true if the current user has the required permissions, false otherwise.
     */
    public static function hasRequiredPermissionsForPrivateAPI() {
        return current_user_can( 'manage_options' );
    }
}