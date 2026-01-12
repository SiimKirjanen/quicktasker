<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

add_action( 'admin_menu', 'wp_quick_taks_add_admin_menu');
if ( ! function_exists( 'wp_quick_taks_add_admin_menu' ) ) {
    function wp_quick_taks_add_admin_menu() {
        add_menu_page(
            'QuickTasker',
            'QuickTasker',
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks',
            'wp_quick_taks_generate_app_page',
            plugins_url('img/menu-item.png', dirname(__FILE__) ),
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Boards', 'quicktasker'),
            esc_html__('Boards', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Overview', 'quicktasker'),
            esc_html__('Overview', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks#/overview',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Settings', 'quicktasker'),
            esc_html__('Settings', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS,
            'wp-quick-tasks#/settings',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('User management', 'quicktasker'),
            esc_html__('User management', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS,
            'wp-quick-tasks#/users',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('User tasks page', 'quicktasker'),
            esc_html__('User tasks page', 'quicktasker'),
            WP_QUICKTASKER_ACCESS_USER_PAGE_APP,
            'wp-quick-tasks#/user-page-link',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Quicktasker sessions', 'quicktasker'),
            esc_html__('Quicktasker sessions', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks#/user-sessions',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Archive', 'quicktasker'),
            esc_html__('Archive', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE,
            'wp-quick-tasks#/archive',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('Logs', 'quicktasker'),
            esc_html__('Logs', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks#/logs',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quick-tasks',
            esc_html__('About', 'quicktasker'),
            esc_html__('About', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quick-tasks#/guide',
            'wp_quick_taks_generate_app_page'
        );
    }
}

if ( ! function_exists( 'wp_quick_taks_generate_app_page' ) ) {
    function wp_quick_taks_generate_app_page() {
        include_once( WP_QUICKTASKER_PLUGIN_FOLDER_DIR . '/src/index.php' );
    }
}