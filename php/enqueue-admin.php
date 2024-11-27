<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\User\UserRepository;
use WPQT\Time\TimeRepository;
use WPQT\Asset\AssetRepository;
use WPQT\Nonce\NonceService;
use WPQT\Location\LocationService;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Permission\PermissionService;
use WPQT\Settings\SettingRepository;

add_action( 'admin_enqueue_scripts', 'wpqt_enqueue_app_assets' );
if ( ! function_exists( 'wpqt_enqueue_app_assets' ) ) {
	function wpqt_enqueue_app_assets(){
		$locationService = new LocationService();
		$timeRepository = new TimeRepository();

		if( !$locationService->isWPQTPage() ) {
			return;
		}

		$pipelineRepo = new PipelineRepository();
		$userRepo = new UserRepository();

		$activePipeline = $pipelineRepo->getActivePipeline();
		$pipelines = $pipelineRepo->getPipelines();
		$users = $userRepo->getUsers();

		$build_asset = AssetRepository::getWPQTScriptBildAssets();
		$vendors_asset = AssetRepository::getWPQTVendorScriptBildAssets();
		$scriptDependencies = AssetRepository::getWPQTScriptDependencies();

		wp_enqueue_style( 'wpqt-tailwind', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/tailwind.css');
		wp_enqueue_script('wpqt-vendors', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/vendors.js', array(), $vendors_asset['version'], true);
		wp_enqueue_script('wpqt-script', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/app.js', $scriptDependencies, $build_asset['version'], true);

		wp_localize_script('wpqt-script', 'wpqt', array(
			'apiNonce' => NonceService::createNonce( WPQT_ADMIN_API_NONCE ),
			'siteURL' => site_url(),
			'pluginURL' => WP_QUICKTASKER_PLUGIN_FOLDER_URL,
			'initialActivePipelineId' => $activePipeline ? $activePipeline->id : null,
			'initialPipelines' => $pipelines,
			'initialUsers' => $users,
			'publicUserPageId' => WP_QUICKTASKER_PUBLIC_USER_PAGE_ID,
			'timezone' => $timeRepository->getWPTimezone(),
			'isUserAllowedToDelete' => PermissionService::hasRequiredPermissionsForPublicAPIDeleteEndpoints() ? "1" : "0",
			'userPageCustomStyles' => SettingRepository::getUserPageCustomStyles(),
		));

		// Set script translations
		wp_set_script_translations( 'wpqt-script', 'quicktasker', WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'languages/json' );
	}
}
