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
$up_dir = wp_upload_dir();

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_FOLDER_DIR' ) ) {
    define('WP_QUICKTASKER_PLUGIN_FOLDER_DIR', plugin_dir_path( dirname( __FILE__ ) ));
}

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_MAIN_FILE' ) ) {
    define('WP_QUICKTASKER_PLUGIN_MAIN_FILE', WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'quicktasker.php');
}

if ( ! defined( 'WP_QUICKTASKER_PLUGIN_FOLDER_URL' ) ) {
    define('WP_QUICKTASKER_PLUGIN_FOLDER_URL', plugin_dir_url( dirname( __FILE__ ) ));
}

if ( ! defined( 'WP_QUICKTASKER_UPLOAD_FOLDER_DIR' ) ) {
    define('WP_QUICKTASKER_UPLOAD_FOLDER_DIR', $up_dir['basedir'] . '/quicktasker');
}

if ( ! defined( 'WP_QUICKTASKER_TASK_UPLOAD_FOLDER_DIR' ) ) {
    define('WP_QUICKTASKER_TASK_UPLOAD_FOLDER_DIR', WP_QUICKTASKER_UPLOAD_FOLDER_DIR . '/tasks');
}

if ( ! defined( 'WP_QUICKTASKER_UPLOAD_FOLDER_URL' ) ) {
    define('WP_QUICKTASKER_UPLOAD_FOLDER_URL', $up_dir['baseurl'] . '/quicktasker');
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
    define('WP_QUICKTASKER_DB_VERSION', "1.22.0");
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

if ( ! defined( 'TABLE_WP_QUICKTASKER_LABELS' ) ) {
    define('TABLE_WP_QUICKTASKER_LABELS', $wpdb->prefix . "quicktasker_labels");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_LABEL_RELATIONS' ) ) {
    define('TABLE_WP_QUICKTASKER_LABEL_RELATIONS', $wpdb->prefix . "quicktasker_label_relations");
}

if ( ! defined( 'TABLE_WP_QUICKTASKER_UPLOADS' ) ) {
    define('TABLE_WP_QUICKTASKER_UPLOADS', $wpdb->prefix . "quicktasker_uploads");
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

if ( ! defined( 'WP_QT_LOG_TYPES' ) ) {
    define('WP_QT_LOG_TYPES', [WP_QT_LOG_TYPE_TASK, WP_QT_LOG_TYPE_PIPELINE, WP_QT_LOG_TYPE_STAGE, WP_QT_LOG_TYPE_USER]);
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

if ( ! defined( 'WP_QT_LOG_CREATED_BY' ) ) {
    define('WP_QT_LOG_CREATED_BY', [WP_QT_LOG_CREATED_BY_ADMIN, WP_QT_LOG_CREATED_BY_QUICKTASKER_USER, WP_QT_LOG_CREATED_BY_AUTOMATION]);
}

if ( ! defined( 'WP_QT_LOG_STATUS_SUCCESS' ) ) {
    define('WP_QT_LOG_STATUS_SUCCESS', "success");
}

if ( ! defined( 'WP_QT_LOG_STATUS_ERROR' ) ) {
    define('WP_QT_LOG_STATUS_ERROR', "error");
}

if ( ! defined( 'WP_QT_LOG_STATUS' ) ) {
    define('WP_QT_LOG_STATUS', [WP_QT_LOG_STATUS_SUCCESS, WP_QT_LOG_STATUS_ERROR]);
}

/*
==================================================================================================================================================================================================================
Comment constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_COMMENT_TYPE_TASK' ) ) {
    define('WP_QUICKTASKER_COMMENT_TYPE_TASK', "task");
}

if ( ! defined( 'WP_QUICKTASKER_COMMENT_TYPE_USER' ) ) {
    define('WP_QUICKTASKER_COMMENT_TYPE_USER', "user");
}

if ( ! defined( 'WP_QUICKTASKER_COMMENT_TYPES' ) ) {
    define('WP_QUICKTASKER_COMMENT_TYPES', [WP_QUICKTASKER_COMMENT_TYPE_TASK, WP_QUICKTASKER_COMMENT_TYPE_USER]);
}

/*
==================================================================================================================================================================================================================
Custom field constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK', "task");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USER' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USER', "user");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USERS' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USERS', "users");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE', "pipeline");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPES' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPES', [
        WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK, 
        WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USER,
        WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_USERS,
        WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE
    ]);
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_TYPE_TEXT' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_TYPE_TEXT', "text");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_TYPE_SELECT' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_TYPE_SELECT', "select");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_TYPE_CHECKBOX' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_TYPE_CHECKBOX', "checkbox");
}

if ( ! defined( 'WP_QUICKTASKER_CUSTOM_FIELD_TYPES' ) ) {
    define('WP_QUICKTASKER_CUSTOM_FIELD_TYPES', [
        WP_QUICKTASKER_CUSTOM_FIELD_TYPE_TEXT, 
        WP_QUICKTASKER_CUSTOM_FIELD_TYPE_SELECT,
        WP_QUICKTASKER_CUSTOM_FIELD_TYPE_CHECKBOX
    ]);
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

if ( ! defined( 'WP_QT_USER_TYPES' ) ) {
    define('WP_QT_USER_TYPES', [WP_QT_WORDPRESS_USER_TYPE, WP_QT_QUICKTASKER_USER_TYPE]);
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
    define('WP_QUICKTASKER_SIDE_EFFECT_TRIGGER', "6");
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
Label constants
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_LABEL_RELATION_TYPE_TASK' ) ) {
    define('WP_QUICKTASKER_LABEL_RELATION_TYPE_TASK', "task");
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

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TARGET_TYPES' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TARGET_TYPES', [WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK]);
}

// Triggers
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE', "task-done");
}
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED', "task-created");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE', "task-not-done");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED', "task-deleted");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED', "task-assigned");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED', "task-unassigned");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED', "task-public-comment-added");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED', "task-private-comment-added");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_TRIGGERS' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_TRIGGERS', [
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE, 
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED, 
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE,
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED,
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED,
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED,
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED,
        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED
    ]);
}

// Actions
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK', "archive-task");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER', "assign-user");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY', "new-entity-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL', "deleted-entity-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL', "task-assigned-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL', "task-unassigned-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL', "task-public-comment-added-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL', "task-private-comment-added-email");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTIONS' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTIONS', [
        WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK, 
        WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER, 
        WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY,
        WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL,
        WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL,
        WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL,
        WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL,
        WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL
    ]);
}

// Action target types
if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER', "quicktasker");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER', "wp-user");
}

if ( ! defined( 'WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPES' ) ) {
    define('WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPES', [
        WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER, 
        WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER
    ]);
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


/*
==================================================================================================================================================================================================================
Email templates
==================================================================================================================================================================================================================
*/

if ( ! defined( 'WP_QUICKTASKER_NEW_TASK_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_NEW_TASK_EMAIL_TEMPLATE', "new-task-created");
}

if ( ! defined( 'WP_QUICKTASKER_DELETED_TASK_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_DELETED_TASK_EMAIL_TEMPLATE', "task-deleted");
}

if ( ! defined( 'WP_QUICKTASKER_ASSIGNED_TASK_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_ASSIGNED_TASK_EMAIL_TEMPLATE', "task-assigned");
}

if ( ! defined( 'WP_QUICKTASKER_UNASSIGNED_TASK_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_UNASSIGNED_TASK_EMAIL_TEMPLATE', "task-unassigned");
}

if ( ! defined( 'WP_QUICKTASKER_TASK_NEW_PUBLIC_COMMENT_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_TASK_NEW_PUBLIC_COMMENT_EMAIL_TEMPLATE', "task-new-public-comment");
}

if ( ! defined( 'WP_QUICKTASKER_TASK_NEW_PRIVATE_COMMENT_EMAIL_TEMPLATE' ) ) {
    define('WP_QUICKTASKER_TASK_NEW_PRIVATE_COMMENT_EMAIL_TEMPLATE', "task-new-private-comment");
}

