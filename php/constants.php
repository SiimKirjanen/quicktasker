<?php

global $wpdb;


/*
==================================================================================================================================================================================================================
Directories, URL
==================================================================================================================================================================================================================
*/
define('WP_QUICK_TASKS_PLUGIN_FOLDER_DIR', plugin_dir_path( dirname( __FILE__ ) ));
define('WP_QUICK_TASKS_PLUGIN_MAIN_FILE', WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/wp-quick-tasks.php');
define('WP_QUICK_TASKS_PLUGIN_FOLDER_URL', plugin_dir_url( dirname( __FILE__ ) ));

/*
==================================================================================================================================================================================================================
DB constants
==================================================================================================================================================================================================================
*/
define('WP_QUICK_TASKS_DB_VERSION', "1.0.12");

define('TABLE_WP_QUICK_TASKS_USERS', $wpdb->prefix . "wpqt_users");
define('TABLE_WP_QUICK_TASKS_PIPELINES', $wpdb->prefix . "wpqt_pipelines");
define('TABLE_WP_QUICK_TASKS_PIPELINE_STAGES', $wpdb->prefix . "wpqt_pipeline_stages");
define('TABLE_WP_QUICK_TASKS_TASKS', $wpdb->prefix . "wpqt_tasks");
define('TABLE_WP_QUICK_TASKS_TASKS_ORDER', $wpdb->prefix . "wpqt_tasks_order");