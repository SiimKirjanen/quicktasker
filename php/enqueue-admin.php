<?php

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_app_assets' );
function wpqt_enqueue_app_assets(){
	$page = get_current_screen();

	if( 'toplevel_page_wp-quick-tasks' !== $page->id ) {
		return;
	}
	$build_asset = require(WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/build/app.asset.php');
	$dependencies = array_merge(array('wp-element', 'wp-api-fetch'), $build_asset['dependencies']);

	wp_enqueue_style( 'my-plugin-tailwind', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/tailwind.css');
    wp_enqueue_script('wp-quick-landing-scrips', WP_QUICK_TASKS_PLUGIN_FOLDER_URL . '/build/app.js', $dependencies, $build_asset['version'], true);
}
