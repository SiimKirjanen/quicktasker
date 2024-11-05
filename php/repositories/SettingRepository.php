<?php

namespace WPQT\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class SettingRepository {

    /**
     * Retrieve the custom styles for the user page.
     *
     * This function fetches the custom styles set for the user page from the WordPress options table.
     *
     * @return string The custom styles for the user page, or an empty string if not set.
     */
    static function getUserPageCustomStyles() {
        return get_option(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES, "");
    }
}