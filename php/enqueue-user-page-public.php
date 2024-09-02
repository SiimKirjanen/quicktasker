<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\User\UserRepository;

add_action( 'wp_enqueue_scripts', 'wpqt_enqueue_user_public_page' );
function wpqt_enqueue_user_public_page(){
	$locationService = new LocationService();

	if( !$locationService->isWPQTPublicUserPage() ) {
		return;
	}

	$pipelineRepo = new PipelineRepository();
	$userRepo = new UserRepository();

	$build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/userApp.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'wpqt-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wpqt-script', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/userApp.js', $dependencies, $build_asset['version'], true);

	wp_localize_script('wpqt-script', 'wpqt_user', array(
		'userApiNonce' => wp_create_nonce( 'wpqt_user_api_nonce' ),
		'siteURL' => site_url(),
		'pluginURL' => WP_QUICK_TASKS_PLUGIN_FOLDER_URL,
	));
}
