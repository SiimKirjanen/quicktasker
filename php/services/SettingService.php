<?php

namespace WPQT\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Settings\SettingRepository;

class SettingsService {


    /**
     * Validates the custom styles provided by the user for a page.
     *
     * This function checks if the provided custom styles contain any HTML tags.
     * If HTML tags are found, the function returns false, indicating invalid styles.
     * Otherwise, it returns true, indicating valid styles.
     *
     * @param string $customStyles The custom styles provided by the user.
     * @return bool True if the custom styles are valid, false otherwise.
     */
    public static function validateUserPageCustomStyles($customStyles) {
        if ( preg_match( '#</?\w+#', $css ) ) {
            return false;
        }
        return true;
    }

    /**
     * Save custom styles for the user page and return the updated styles.
     *
     * This function updates the custom styles for the user page by saving the provided
     * styles to the WordPress options table. After saving, it retrieves and returns
     * the updated custom styles.
     *
     * @param string $customStyles The custom styles to be saved for the user page.
     * 
     * @return string The updated custom styles for the user page.
     */
    public static function saveUserPageCustomStyles($customStyles) {
        self::validateUserPageCustomStyles($customStyles);
        update_option(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES, $customStyles);

        return SettingRepository::getUserPageCustomStyles();
    }
}