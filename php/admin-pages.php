<?php

add_action( 'admin_menu', 'wp_quick_taks_add_admin_menu');
function wp_quick_taks_add_admin_menu() {

    add_menu_page(
        'WP Quick Tasks',
        'WP Quick Tasks',
        'manage_options',
        'wp-quick-tasks',
        'wp_quick_taks_generate_landing_page'
    );

    add_submenu_page(
        'wp-quick-tasks',
        esc_html__('Home', 'wp-quick-tasks'),
        esc_html__('Home', 'wp-quick-tasks'),
        'manage_options',
        'wp-quick-tasks',
        'wp_quick_taks_generate_landing_page'
    ); 

    add_submenu_page(
		'wp-quick-tasks',  
		esc_html__('Users', 'wp-quick-tasks'),
		esc_html__('Users', 'wp-quick-tasks'), //menu title
		'manage_options',  //capability
		'wp-quick-tasks-users',   //slug
		'wp_quick_taks_generate_users_page'  //callback
	);

}

function wp_quick_taks_generate_landing_page() {
    include_once( WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/src/landing/index.php' );
}

function wp_quick_taks_generate_users_page() {
    include_once( WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/src/users/index.php' );
}
