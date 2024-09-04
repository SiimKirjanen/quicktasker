<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

global $wpdb;

/*
==================================================================================================================================================================================================================
Directories, URL
==================================================================================================================================================================================================================
*/
define('WP_QUICK_TASKS_PLUGIN_FOLDER_DIR', plugin_dir_path( dirname( __FILE__ ) ));
define('WP_QUICK_TASKS_PLUGIN_MAIN_FILE', WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/wp-quick-tasks.php');
define('WP_QUICK_TASKS_PLUGIN_FOLDER_URL', plugin_dir_url( dirname( __FILE__ ) ));
define('WP_QUICK_TASKS_PUBLIC_USER_PAGE_ID', 'wp-quick-tasks-user');

/*
==================================================================================================================================================================================================================
DB constants
==================================================================================================================================================================================================================
*/
define('WP_QUICK_TASKS_DB_VERSION', "1.15");

define('TABLE_WP_QUICK_TASKS_USERS', $wpdb->prefix . "wpqt_users");
define('TABLE_WP_QUICK_TASKS_PIPELINES', $wpdb->prefix . "wpqt_pipelines");
define('TABLE_WP_QUICK_TASKS_PIPELINE_STAGES', $wpdb->prefix . "wpqt_pipeline_stages");
define('TABLE_WP_QUICK_TASKS_TASKS', $wpdb->prefix . "wpqt_tasks");
define('TABLE_WP_QUICK_TASKS_TASKS_LOCATION', $wpdb->prefix . "wpqt_tasks_location");
define('TABLE_WP_QUICK_TASKS_STAGES_LOCATION', $wpdb->prefix . "wpqt_stages_location");
define('TABLE_WP_QUICK_TASKS_LOGS', $wpdb->prefix . "wpqt_logs");
define('TABLE_WP_QUICK_TASKS_COMMENTS', $wpdb->prefix . "wpqt_comments");
define('TABLE_WP_QUICK_TASKS_USER_PAGES', $wpdb->prefix . "wpqt_user_pages");
define('TABLE_WP_QUICK_TASKS_USER_SESSIONS', $wpdb->prefix . "wpqt_user_sessions");

/*
==================================================================================================================================================================================================================
Log constants
==================================================================================================================================================================================================================
*/

define('WP_QT_LOG_TYPE_TASK', "task");

/*

==================================================================================================================================================================================================================
Nonce constants
==================================================================================================================================================================================================================
*/	
define('WPQT_ADMIN_API_NONCE', "wpqt_api_nonce");
define('WPQT_USER_API_NONCE', "wpqt_user_api_nonce");
