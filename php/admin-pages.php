<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('admin_menu', 'wp_quick_taks_add_admin_menu');
if (!function_exists('wp_quick_taks_add_admin_menu')) {
    function wp_quick_taks_add_admin_menu()
    {
        add_menu_page(
            'QuickTasker',
            'QuickTasker',
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quicktasker',
            'wp_quick_taks_generate_app_page',
            plugins_url('img/menu-item.png', dirname(__FILE__)),
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('Boards', 'quicktasker'),
            esc_html__('Boards', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quicktasker',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('User management', 'quicktasker'),
            esc_html__('User management', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS,
            'wp-quicktasker#/user-management',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('Tasks app', 'quicktasker'),
            esc_html__('Tasks app', 'quicktasker'),
            WP_QUICKTASKER_ACCESS_USER_PAGE_APP,
            'wp-quicktasker#/tasks-app-settings',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('Quicktasker sessions', 'quicktasker'),
            esc_html__('Quicktasker sessions', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_QUICKTASKER_SESSIONS,
            'wp-quicktasker#/quicktasker-sessions',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('Archive', 'quicktasker'),
            esc_html__('Archive', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE,
            'wp-quicktasker#/archive',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('Logs', 'quicktasker'),
            esc_html__('Logs', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quicktasker#/logs',
            'wp_quick_taks_generate_app_page'
        );

        add_submenu_page(
            'wp-quicktasker',
            esc_html__('About', 'quicktasker'),
            esc_html__('About', 'quicktasker'),
            WP_QUICKTASKER_ADMIN_ROLE,
            'wp-quicktasker#/about',
            'wp_quick_taks_generate_app_page'
        );
    }
}

if (!function_exists('wp_quick_taks_generate_app_page')) {
    function wp_quick_taks_generate_app_page()
    {
        include_once(WP_QUICKTASKER_PLUGIN_FOLDER_DIR . '/php/templates/admin-app-root.php');
    }
}
