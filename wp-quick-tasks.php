<?php

/*
	Plugin Name: QuickTasker
	Description: TODO.
	Author: Siim Kirjanen
	Author URI: https://github.com/SiimKirjanen
	Text Domain: quick-tasker
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
require( 'php/response/ApiResponse.php' );
require( 'php/repositories/PipelineRepository.php' );
require( 'php/repositories/TaskRepository.php' );
require( 'php/repositories/StageRepository.php' );
require( 'php/repositories/LogRepository.php' );
require( 'php/services/PipelineService.php' );
require( 'php/services/PermissionService.php' );
require( 'php/services/StageService.php' );
require( 'php/services/TaskService.php' );
require( 'php/services/LocationService.php' );
require( 'php/services/LogService.php' );
require( 'php/hooks.php' );
require( 'php/actions.php' );
require( 'php/filters.php' );
require( 'php/api.php' );

if( is_admin() ) {
	require( 'php/admin-pages.php' );
	require( 'php/enqueue-admin.php' );	
}
