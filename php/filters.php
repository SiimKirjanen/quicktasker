<?php

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
	if( !isset($_GET['page']) ) {
		return $classes;
	}

    $locationService = new LocationService();

	if( $locationService->isWPQTPage() ) {
		return "$classes wpqt-admin-page"; 
	}

	return $classes;
}