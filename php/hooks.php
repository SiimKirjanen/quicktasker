<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

register_activation_hook( WP_QUICK_TASKS_PLUGIN_MAIN_FILE, 'wpqt_plugin_activate' );
function wpqt_plugin_activate() {
	wpqt_set_up_db();
	wpqt_insert_initial_data();
}