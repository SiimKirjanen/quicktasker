<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Capability\CapabilityService;

register_activation_hook( WP_QUICKTASKER_PLUGIN_MAIN_FILE, 'quicktasker_activation_check' );
function quicktasker_activation_check() {
    // Check if the other version of the plugin is active
    if ( is_plugin_active('quicktasker-pro/quicktasker.php') && plugin_basename(__FILE__) === 'quicktasker/quicktasker.php' ) {
        // Deactivate the current plugin
        deactivate_plugins(plugin_basename(__FILE__));
        
        // Display an admin notice
        add_action('admin_notices', 'quicktasker_admin_notice_pro_active');
    } elseif ( is_plugin_active('quicktasker/quicktasker.php') && plugin_basename(__FILE__) === 'quicktasker-pro/quicktasker.php' ) {
        // Deactivate the current plugin
        deactivate_plugins(plugin_basename(__FILE__));
        
        // Display an admin notice
        add_action('admin_notices', 'quicktasker_admin_notice_free_active');
    }
}

function quicktasker_admin_notice_pro_active() {
    ?>
    <div class="notice notice-error is-dismissible">
        <p><?php _e('QuickTasker Free cannot be activated because QuickTasker Pro is already active.', 'quicktasker'); ?></p>
    </div>
    <?php
}

function quicktasker_admin_notice_free_active() {
    ?>
    <div class="notice notice-error is-dismissible">
        <p><?php _e('QuickTasker Pro cannot be activated because QuickTasker Free is already active.', 'quicktasker'); ?></p>
    </div>
    <?php
}

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