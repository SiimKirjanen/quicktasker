<?php

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_landing_assets' );
function wpqt_enqueue_landing_assets(){
	$page = get_current_screen();

	if( 'toplevel_page_wp-quick-tasks' !== $page->id ) {
		return;
	}
	$build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/landing.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'my-plugin-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wp-quick-landing-scrips', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/landing.js', $dependencies, $build_asset['version'], true);
}

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_user_assets' );
function wpqt_enqueue_user_assets(){
	$page = get_current_screen();

	if( 'wp-quick-tasks_page_wp-quick-tasks-users' !== $page->id ) {
		return;
	}

    $build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/users.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'my-plugin-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wp-quick-users-scrips', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/users.js', $dependencies, $build_asset['version'], true);
}