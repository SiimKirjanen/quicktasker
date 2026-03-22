<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Capability\CapabilityService;
use WPQT\Services\ServiceLocator;

if (!function_exists('is_plugin_active')) {
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

$plugin_main_file = dirname(plugin_dir_path(__FILE__)) . '/quicktasker.php';

register_activation_hook(WP_QUICKTASKER_PLUGIN_MAIN_FILE, 'wpqt_plugin_activate');
if (!function_exists('wpqt_plugin_activate')) {
    function wpqt_plugin_activate()
    {
        $capabilityService = new CapabilityService();
        $capabilityService->addQuickTaskerAdminCapabilityToAdminRole();

        wpqt_set_up_db();
        wpqt_insert_initial_data();
        ServiceLocator::get('UploadService')->setUpUploadsFolders();
    }
}

register_deactivation_hook(WP_QUICKTASKER_PLUGIN_MAIN_FILE, 'wpqt_plugin_deactivate');
if (!function_exists('wpqt_plugin_deactivate')) {
    function wpqt_plugin_deactivate()
    {
        $capabilityService = new CapabilityService();
        $capabilityService->removeQuickTaskerAdminCapabilityFromAdminRole();
    }
}
