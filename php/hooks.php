<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Capability\CapabilityService;

if ( ! function_exists( 'is_plugin_active' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}

$plugin_main_file = dirname(plugin_dir_path(__FILE__)) . '/quicktasker.php';

register_activation_hook($plugin_main_file, function() use ($plugin_main_file) {
    if ( is_plugin_active('quicktasker-pro/quicktasker.php') && strpos($plugin_main_file, 'quicktasker/quicktasker.php') !== false) {
        wp_die(
            __('QuickTasker cannot be activated because QuickTasker Pro is already active.', 'quicktasker'),
            __('Plugin Activation Error', 'quicktasker'),
            array('back_link' => true)
        );
    } elseif ( is_plugin_active('quicktasker/quicktasker.php') && strpos($plugin_main_file, 'quicktasker-pro/quicktasker.php') !== false) {
        wp_die(
            __('QuickTasker Pro cannot be activated because QuickTasker is already active.', 'quicktasker'),
            __('Plugin Activation Error', 'quicktasker'),
            array('back_link' => true)
        );
    }
});
 
register_activation_hook( WP_QUICKTASKER_PLUGIN_MAIN_FILE, 'wpqt_plugin_activate' );
if ( ! function_exists( 'wpqt_plugin_activate' ) ) {
    function wpqt_plugin_activate() {
        $capabilityService = new CapabilityService();
        $capabilityService->addQuickTaskerAdminCapabilityToAdminRole();
        
        wpqt_set_up_db();
        wpqt_insert_initial_data();
    }
}

register_deactivation_hook( WP_QUICKTASKER_PLUGIN_MAIN_FILE, 'wpqt_plugin_deactivate' );
if ( ! function_exists( 'wpqt_plugin_deactivate' ) ) {
    function wpqt_plugin_deactivate() {
        $capabilityService = new CapabilityService();
        $capabilityService->removeQuickTaskerAdminCapabilityFromAdminRole();
    }
}