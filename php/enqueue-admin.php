<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Asset\AssetRepository;
use WPQT\Location\LocationService;
use WPQT\Nonce\NonceService;
use WPQT\Permission\PermissionService;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Services\ServiceLocator;
use WPQT\Settings\SettingRepository;
use WPQT\Time\TimeRepository;
use WPQT\User\UserRepository;

add_action('admin_enqueue_scripts', 'wpqt_enqueue_app_assets');
if (!function_exists('wpqt_enqueue_app_assets')) {
    function wpqt_enqueue_app_assets()
    {
        $locationService = new LocationService();
        $timeRepository = new TimeRepository();

        if (!$locationService->isWPQTPage()) {
            return;
        }

        $pipelineRepo = new PipelineRepository();
        $userRepo = new UserRepository();

        $activePipeline = $pipelineRepo->getActivePipeline();
        $pipelines = $pipelineRepo->getPipelines();
        $users = $userRepo->getUsers();
        $wpUsers = $userRepo->getWPUsersWithCapabilities([WP_QUICKTASKER_ADMIN_ROLE]);
        $notificationPreferences = ServiceLocator::get('NotificationService')->getPreferences(
            get_current_user_id(),
            WP_QT_WORDPRESS_USER_TYPE
        );

        $build_asset = AssetRepository::getWPQTScriptBildAssets();
        $vendors_asset = AssetRepository::getWPQTVendorScriptBildAssets();
        $scriptDependencies = AssetRepository::getWPQTScriptDependencies();

        wp_enqueue_style('wpqt-tailwind', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/tailwind.css', [], $build_asset['version']);
        wp_enqueue_script('wpqt-vendors', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/vendors.js', [], $vendors_asset['version'], true);
        wp_enqueue_script('wpqt-script', WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/app.js', $scriptDependencies, $build_asset['version'], true);

        wp_localize_script('wpqt-script', 'wpqt', [
            'apiNonce'                       => NonceService::createNonce(WPQT_ADMIN_API_NONCE),
            'siteURL'                        => site_url(),
            'pluginURL'                      => WP_QUICKTASKER_PLUGIN_FOLDER_URL,
            'initialActivePipelineId'        => $activePipeline ? $activePipeline->id : null,
            'initialPipelines'               => $pipelines,
            'initialUsers'                   => $users,
            'initialWPUsers'                 => $wpUsers,
            'publicUserPageId'               => WP_QUICKTASKER_PUBLIC_USER_PAGE_ID,
            'timezone'                       => $timeRepository->getWPTimezone(),
            'isPluginAdmin'                  => PermissionService::hasRequiredPermissionsForPrivateAPI() ? '1' : '0',
            'isUserAllowedToDelete'          => PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints() ? '1' : '0',
            'isUserAllowedToManageSettings'  => PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints() ? '1' : '0',
            'userPageCustomStyles'           => SettingRepository::getUserPageCustomStyles(),
            'taskUploadsURL'                 => WP_QUICKTASKER_TASK_UPLOAD_FOLDER_URL,
            'initialNotificationPreferences' => $notificationPreferences,
        ]);

        // Set script translations
        wp_set_script_translations('wpqt-script', 'quicktasker');
    }
}
