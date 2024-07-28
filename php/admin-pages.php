<?php

add_action( 'admin_menu', 'wp_quick_taks_add_admin_menu');
function wp_quick_taks_add_admin_menu() {
    add_menu_page(
        'WP Quick Tasks',
        'WP Quick Tasks',
        'manage_options',
        'wp-quick-tasks',
        'wp_quick_taks_generate_app_page'
    );
}

function wp_quick_taks_generate_app_page() {
    include_once( WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/src/index.php' );
}