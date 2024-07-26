<?php

/*
	Plugin Name: WP Quick Tasks
	Description: TODO.
	Author: Siim Kirjanen
	Author URI: https://github.com/SiimKirjanen
	Text Domain: wp-quick-tasks
	Version: 1.0.0
	Requires at least: 5.3
	Requires PHP: 7.2.28
	License: GPLv2 or later
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

require( 'php/constants.php' );
require( 'php/db.php' );
require( 'php/repositories/ProjectRepository.php' );
require( 'php/services/ProjectService.php' );
require( 'php/services/PermissionsService.php' );
require( 'php/hooks.php' );
require( 'php/actions.php' );
require( 'php/api.php' );

if( is_admin() ) {
	require( 'php/admin-pages.php' );
	require( 'php/enqueue-admin.php' );	
}
