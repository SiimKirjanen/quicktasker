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

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_FOLDER_DIR' ) ) {
    define('WP_QUICKTASKER_PLUGIN_FOLDER_DIR', plugin_dir_path( dirname( __FILE__ ) ));
}

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_MAIN_FILE' ) ) {
    define('WP_QUICKTASKER_PLUGIN_MAIN_FILE', WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'quicktasker.php');
}

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_FOLDER_URL' ) ) {
    define('WP_QUICKTASKER_PLUGIN_FOLDER_URL', plugin_dir_url( dirname( __FILE__ ) ));
}

if ( ! defined( 'WP_QUICKTASKER_PUBLIC_USER_PAGE_ID' ) ) {
    define('WP_QUICKTASKER_PUBLIC_USER_PAGE_ID', 'wp-quick-tasks-user');
}

/*
==================================================================================================================================================================================================================
DB constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_DB_VERSION' ) ) {
    define('WP_QUICKTASKER_DB_VERSION', "1.8.0");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_USERS' ) ) {
    define('TABLE_WP_QUICKTASKER_USERS', $wpdb->prefix . "quicktasker_users");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_PIPELINES' ) ) {
    define('TABLE_WP_QUICKTASKER_PIPELINES', $wpdb->prefix . "quicktasker_pipelines");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_PIPELINE_STAGES' ) ) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_STAGES', $wpdb->prefix . "quicktasker_pipeline_stages");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_TASKS' ) ) {
    define('TABLE_WP_QUICKTASKER_TASKS', $wpdb->prefix . "quicktasker_tasks");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_TASKS_LOCATION' ) ) {
    define('TABLE_WP_QUICKTASKER_TASKS_LOCATION', $wpdb->prefix . "quicktasker_tasks_location");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_STAGES_LOCATION' ) ) {
    define('TABLE_WP_QUICKTASKER_STAGES_LOCATION', $wpdb->prefix . "quicktasker_stages_location");
}

if ( ! defined( 'TABLE_WP_QUICKTASKS_LOGS' ) ) {
    define('TABLE_WP_QUICKTASKS_LOGS', $wpdb->prefix . "quicktasker_logs");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_COMMENTS' ) ) {
    define('TABLE_WP_QUICKTASKER_COMMENTS', $wpdb->prefix . "quicktasker_comments");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_USER_PAGES' ) ) {
    define('TABLE_WP_QUICKTASKER_USER_PAGES', $wpdb->prefix . "quicktasker_user_pages");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_USER_SESSIONS' ) ) {
    define('TABLE_WP_QUICKTASKER_USER_SESSIONS', $wpdb->prefix . "quicktasker_user_sessions");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_USER_TASK' ) ) {
    define('TABLE_WP_QUICKTASKER_USER_TASK', $wpdb->prefix . "quicktasker_user_task");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_CUSTOM_FIELDS' ) ) {
    define('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS', $wpdb->prefix . "quicktasker_custom_fields");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES' ) ) {
    define('TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES', $wpdb->prefix . "quicktasker_custom_fields_values");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS' ) ) {
    define('TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS', $wpdb->prefix . "quicktasker_pipeline_settings");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_AUTOMATIONS' ) ) {
    define('TABLE_WP_QUICKTASKER_AUTOMATIONS', $wpdb->prefix . "quicktasker_automations");
}

/*
==================================================================================================================================================================================================================
Log constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QT_LOG_TYPE_TASK' ) ) {
    define('WP_QT_LOG_TYPE_TASK', "task");
}

if ( ! defined( 'WP_QT_LOG_TYPE_PIPELINE' ) ) {
    define('WP_QT_LOG_TYPE_PIPELINE', "pipeline");
}

if ( ! defined( 'WP_QT_LOG_TYPE_STAGE' ) ) {
    define('WP_QT_LOG_TYPE_STAGE', "stage");
}

if ( ! defined( 'WP_QT_LOG_TYPE_USER' ) ) {
    define('WP_QT_LOG_TYPE_USER', "user");
}

if ( ! defined( 'WP_QT_LOG_CREATED_BY_ADMIN' ) ) {
    define('WP_QT_LOG_CREATED_BY_ADMIN', "admin");
}

if ( ! defined( 'WP_QT_LOG_CREATED_BY_QUICKTASKER_USER' ) ) {
    define('WP_QT_LOG_CREATED_BY_QUICKTASKER_USER', "quicktasker_user");
}

if ( ! defined( 'WP_QT_LOG_CREATED_BY_AUTOMATION' ) ) {
    define('WP_QT_LOG_CREATED_BY_AUTOMATION', "automation");
}

/*
==================================================================================================================================================================================================================
User constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QT_WORDPRESS_USER_TYPE' ) ) {
    define('WP_QT_WORDPRESS_USER_TYPE', "wp-user");
}

if ( ! defined( 'WP_QT_QUICKTASKER_USER_TYPE' ) ) {
    define('WP_QT_QUICKTASKER_USER_TYPE', "quicktasker");
}


/*
==================================================================================================================================================================================================================
Session constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_SESSION_LENGHT' ) ) {
    define('WP_QUICKTASKER_SESSION_LENGHT', DAY_IN_SECONDS);
}

/*
==================================================================================================================================================================================================================
Nonce constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WPQT_ADMIN_API_NONCE' ) ) {
    define('WPQT_ADMIN_API_NONCE', "wpqt_api_nonce");
}

if ( ! defined( 'WPQT_USER_API_NONCE' ) ) {
    define('WPQT_USER_API_NONCE', "wpqt_user_api_nonce");
}

/*
==================================================================================================================================================================================================================
Miscellaneous constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_INVALID_SESSION_TOKEN' ) ) {
    define('WP_QUICKTASKER_INVALID_SESSION_TOKEN', "Invalid session token");
}

if ( ! defined( 'WP_QUICKTASKER_SIDE_EFFECT_TRIGGER' ) ) {
    define('WP_QUICKTASKER_SIDE_EFFECT_TRIGGER', "5");
}

if ( ! defined( 'WP_QUICKTASKER_DB_SEEDER_TRIGGER' ) ) {
    define('WP_QUICKTASKER_DB_SEEDER_TRIGGER', "1");
}

/*
==================================================================================================================================================================================================================
Capabilities constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_ADMIN_ROLE' ) ) {
    define('WP_QUICKTASKER_ADMIN_ROLE', "quicktasker_admin_role"); // Allows access to QuickTasker admin pages and private API GET requests
}

if ( ! defined( 'WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE' ) ) {
    define('WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE', "quicktasker_admin_role_allow_delete"); // Allows private API DELETE requests
}

if ( ! defined( 'WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS' ) ) {
    define("WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS", "quicktasker_admin_role_manage_users"); // Allows access to Users page and related private API endpoints
}

if ( ! defined( 'WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS' ) ) {
    define("WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS", "quicktasker_admin_role_manage_settings"); // Allows access to Settings page and related private API endpoints
}  

/*
==================================================================================================================================================================================================================
Settings constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES' ) ) {
    define('WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES', "quicktasker_user_page_custom_styles");
}

/*
==================================================================================================================================================================================================================
Automation constants
==================================================================================================================================================================================================================
*/

// Types
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK', "task");
}

// Actions
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK', "archive-task");
}

// Triggers
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE', "task-done");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE', "task-not-done");
}

/*
==================================================================================================================================================================================================================
Filtering constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL' ) ) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_FULL', "user-full");
}

if ( ! defined( 'WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE' ) ) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE', "user-admin-fe");
}

if ( ! defined( 'WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL' ) ) {
    define('WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL', "user-minimal");
}
