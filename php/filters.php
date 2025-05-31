<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Location\LocationService;
use WPQT\Export\PDFExportService;
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
if ( ! function_exists( 'wpqt_admin_body_class' ) ) {
	function wpqt_admin_body_class($classes) {
		$locationService = new LocationService();

		if( $locationService->isWPQTPage() ) {
			return "$classes wpqt-admin-page"; 
		}

		return $classes;
	}
}

/**
 * This function is a filter callback for the 'template_include' hook.
 * It checks if the current page is a WP Quick Tasks public user page and sets the page template accordingly.
 *
 * @param string $page_template The current page template.
 * @return string The updated page template.
 */
add_filter( 'template_include', 'wpqt_public_user_page_template' );
if ( ! function_exists( 'wpqt_public_user_page_template' ) ) {
	function wpqt_public_user_page_template( $page_template ){
		$locationService = new LocationService();

		if ( $locationService->isWPQTPublicUserPage() ) {
			$page_template = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . '/src/user-page-app/index.php';
		}

		return $page_template;
	}
}

/**
 * This function is a filter callback for the 'init' hook.
 * It checks if the current page is the WP Quick Tasks task PDF export page and generates a PDF export of tasks.
 * If the user does not have sufficient permissions, it displays an error message.
 *
 * @return void
 */
add_filter('init', 'quicktasker_custom_pages');
if ( ! function_exists( 'quicktasker_custom_pages' ) ) {
	function quicktasker_custom_pages() {
		$locationService = new LocationService();
		
		if ( $locationService->isWPQTTaskPDFExportPage() ) {
			if ( ! WPQT\Permission\PermissionService::hasRequiredPermissionsForPrivateAPI() ) {
				wp_die( __( 'You do not have sufficient permissions to access this page.', 'quicktasker' ), 403 );
			}
			$pipelineId = isset($_GET['pipeline_id']) ? $_GET['pipeline_id'] : null;
            $taskSearch = isset($_GET['task_search']) ? $_GET['task_search'] : '';
            $includeArchive = isset($_GET['include_archive']) ? $_GET['include_archive'] : '0';

			if (!WPQT\RequestValidation::validateOptionalNumericParam($pipelineId)) {
				wp_die('Invalid pipeline ID', 400);
			}

			if ( !WPQT\RequestValidation::validateStringParam($taskSearch) ) {
                $task_search = '';
            }

			if (!WPQT\RequestValidation::validateBooleanParam($includeArchive)) {
                wp_die('Invalid archive param', 400);
            }

			$pipelineId = WPQT\RequestValidation::sanitizeOptionalAbsint($pipelineId);
			$taskSearch = WPQT\RequestValidation::sanitizeStringParam($taskSearch);
			$includeArchive = WPQT\RequestValidation::sanitizeBooleanParam($includeArchive); 

			$pdfService = new PDFExportService($pipelineId, $taskSearch, $includeArchive);
			$pdfService->generateTasksPdfExport();

			die();
		}
	}
}