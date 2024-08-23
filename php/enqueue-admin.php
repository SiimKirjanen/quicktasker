<?php

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_app_assets' );
function wpqt_enqueue_app_assets(){
	$page = get_current_screen();

	$locationService = new LocationService();
	if( !$locationService->isWPQTPage() ) {
		return;
	}

	$pipelineRepo = new PipelineRepository();
	$activePipeline = $pipelineRepo->getActivePipeline();

	$build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/app.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'wpqt-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wpqt-script', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/app.js', $dependencies, $build_asset['version'], true);

	wp_localize_script('wpqt-script', 'wpqt', array(
		'apiNonce' => wp_create_nonce( 'wpqt_api_nonce' ),
		'siteURL' => site_url(),
		'pluginURL' => WP_QUICK_TASKS_PLUGIN_FOLDER_URL,
		'initialActivePipelineId' => $activePipeline->id,
	));
}
