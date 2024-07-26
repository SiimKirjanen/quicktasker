<?php

class PermissionsRepository {
    public static function hasRequiredPermissionsForPrivateAPI() {
        return current_user_can( 'manage_options' );
    }
}