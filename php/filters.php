<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

/**
 * Adds a filter to modify the admin body class.
 *
 * This function is hooked to the 'admin_body_class' filter.
 * It checks if the current page is a WP Quick Tasks page and adds the 'wpqt-admin-page' class to the body class.
 * Useful for scoping styles to WP Quick Tasks pages.
 *
 * @param array $classes The array of body classes.
 * @return array The modified array of body classes.
 */
add_filter( 'admin_body_class', 'wpqt_admin_body_class' );
function wpqt_admin_body_class($classes) {
    $locationService = new LocationService();

	if( $locationService->isWPQTPage() ) {
		return "$classes wpqt-admin-page"; 
	}

	return $classes;
}

/**
 * This function is a filter callback for the 'template_include' hook.
 * It checks if the current page is a WP Quick Tasks public user page and sets the page template accordingly.
 *
 * @param string $page_template The current page template.
 * @return string The updated page template.
 */
add_filter( 'template_include', 'wpqt_public_user_page_template' );
function wpqt_public_user_page_template( $page_template ){
	$locationService = new LocationService();

    if ( $locationService->isWPQTPublicUserPage() ) {
        $page_template = WP_QUICK_TASKS_PLUGIN_FOLDER_DIR . '/src/user-page-app/index.php';
    }

    return $page_template;
}

/**
 * Hides the admin bar in the user page template for the WP Quick Tasks plugin.
 *
 * This function is used as a filter for the 'show_admin_bar' hook. It checks if the current page is a public user page
 * and if the user is logged in. If both conditions are met, it returns false to hide the admin bar. Otherwise, it returns
 * true to show the admin bar.
 *
 * @return bool Whether to show or hide the admin bar.
 */
add_filter( 'show_admin_bar', 'wpqt_hide_admin_bar_in_user_page_template' );
function wpqt_hide_admin_bar_in_user_page_template(){
	$locationService = new LocationService();

	if( is_user_logged_in() ) {
		if( $locationService->isWPQTPublicUserPage() ) {
			return false;
		}
		return true;
	}

	return false;
}