<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}
use WPQT\Location\LocationService;

add_action( 'plugins_loaded', 'wpqt_update_db' );
function wpqt_update_db() {
    wpqt_set_up_db();
}

add_action('admin_head', 'wpqt_style_overrides');
function wpqt_style_overrides() {
    $locationService = new LocationService();

    if( $locationService->isWPQTPage() ) {
        echo '<style>
        /* Change the background color of the admin area */
        #wpwrap {
            background-color: #fff;
        }
        </style>';
    }
}

add_action('template_redirect', 'wpqt_custom_http_status_code');
function wpqt_custom_http_status_code() {
	$locationService = new LocationService();

    if ( $locationService->isWPQTPublicUserPage() ) {
		global $wp_query;
        $wp_query->is_404 = false;
        status_header(200);
    }
}


add_action( 'after_setup_theme', 'wpqt_remove_unnecessary_tags_and_more' );
function wpqt_remove_unnecessary_tags_and_more(){
    $locationService = new LocationService();

	if( $locationService->isWPQTPublicUserPage()  ) {
		 // REMOVE WP EMOJI
		 remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
         remove_action( 'wp_print_styles', 'print_emoji_styles' );
         remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		 remove_action( 'admin_print_styles', 'print_emoji_styles' );
	 
		 // remove all tags from header
		 remove_action( 'wp_head', 'rsd_link' );
		 remove_action( 'wp_head', 'wp_generator' );
		 remove_action( 'wp_head', 'feed_links', 2 );
		 remove_action( 'wp_head', 'index_rel_link' );
		 remove_action( 'wp_head', 'wlwmanifest_link' );
		 remove_action( 'wp_head', 'feed_links_extra', 3 );
		 remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
		 remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
		 remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
		 remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
		 remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
		 remove_action( 'wp_head', 'rest_output_link_wp_head' );
		 remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		 remove_action( 'template_redirect', 'rest_output_link_header', 11 );
	 
		 // language
		 add_filter( 'multilingualpress.hreflang_type', '__return_false' );

         // Remove skip link script
         remove_action( 'wp_footer', 'the_block_template_skip_link' );

		 // Remove block library inline CSS
		 add_action( 'wp_enqueue_scripts', function() {
            wp_dequeue_style( 'wp-block-library' );
			wp_dequeue_style( 'global-styles' );
        }, 100 );
	}
}