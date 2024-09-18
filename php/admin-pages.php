<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

add_action( 'admin_menu', 'wp_quick_taks_add_admin_menu');
function wp_quick_taks_add_admin_menu() {
    add_menu_page(
        'WP Quick Tasks',
        'WP Quick Tasks',
        'manage_options',
        'wp-quick-tasks',
        'wp_quick_taks_generate_app_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        'Overview',
        'Overview',
        'manage_options',
        'wp-quick-tasks',
        'wp_quick_taks_generate_app_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        'Boards',
        'Boards',
        'manage_options',
        'wp-quick-tasks#/boards',
        'wp_quick_taks_generate_app_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        'Users',
        'Users',
        'manage_options',
        'wp-quick-tasks#/users',
        'wp_quick_taks_generate_app_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        'User sessions',
        'User sessions',
        'manage_options',
        'wp-quick-tasks#/user-sessions',
        'wp_quick_taks_generate_app_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        'Archive',
        'Archive',
        'manage_options',
        'wp-quick-tasks#/archive',
        'wp_quick_taks_generate_app_page'
    );
}

function wp_quick_taks_generate_app_page() {
    include_once( WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/src/index.php' );
}