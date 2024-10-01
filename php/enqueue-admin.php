<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\User\UserRepository;
use WPQT\Nonce\NonceService;
use WPQT\Location\LocationService;
use WPQT\Pipeline\PipelineRepository;

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_app_assets' );
function wpqt_enqueue_app_assets(){
	$locationService = new LocationService();
	
	if( !$locationService->isWPQTPage() ) {
		return;
	}

	$pipelineRepo = new PipelineRepository();
	$userRepo = new UserRepository();

	$activePipeline = $pipelineRepo->getActivePipeline();
	$pipelines = $pipelineRepo->getPipelines();
	$users = $userRepo->getUsers();

	$build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/app.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'wpqt-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wpqt-script', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/app.js', $dependencies, $build_asset['version'], true);

	wp_localize_script('wpqt-script', 'wpqt', array(
		'apiNonce' => NonceService::createNonce( WPQT_ADMIN_API_NONCE ),
		'siteURL' => site_url(),
		'pluginURL' => WP_QUICK_TASKS_PLUGIN_FOLDER_URL,
		'initialActivePipelineId' => $activePipeline ? $activePipeline->id : null,
		'initialPipelines' => $pipelines,
		'initialUsers' => $users,
		'publicUserPageId' => WP_QUICK_TASKS_PUBLIC_USER_PAGE_ID
	));
}
