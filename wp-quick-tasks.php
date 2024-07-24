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

if( is_admin() ) {
	require( 'php/admin-pages.php' );	
}




add_action( 'admin_enqueue_scripts', 'wp_quick_tasks_enqueue_landing_scripts' );
function wp_quick_tasks_enqueue_landing_scripts(){
	$page = get_current_screen();

	if( 'toplevel_page_wp-quick-tasks' !== $page->id ) {
		return;
	}

    $plugin_url  = plugin_dir_url( __FILE__ );
    $build_asset = require(plugin_dir_path(__FILE__) . 'build/landing.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);
    wp_enqueue_script('wp-quick-landing-scrips', $plugin_url . '/build/landing.js', $dependencies, $build_asset['version'], true);
}

add_action( 'admin_enqueue_scripts', 'wp_quick_tasks_enqueue_user_scripts' );
function wp_quick_tasks_enqueue_user_scripts(){
	$page = get_current_screen();

	if( 'wp-quick-tasks_page_wp-quick-tasks-users' !== $page->id ) {
		return;
	}
	
    $plugin_url  = plugin_dir_url( __FILE__ );
    $build_asset = require(plugin_dir_path(__FILE__) . 'build/users.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);
    wp_enqueue_script('wp-quick-users-scrips', $plugin_url . '/build/users.js', $dependencies, $build_asset['version'], true);
}