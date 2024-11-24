<?php

namespace WPQT\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Settings\SettingRepository;
use WPQT\Time\TimeRepository;

class SettingsService {
    protected $timeRepository;

    public function __construct() {
        $this->timeRepository = new TimeRepository();
    }

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

    /**
     * Inserts a new settings column for a given pipeline into the database.
     *
     * @param int $pipelineId The ID of the pipeline for which the settings column is being inserted.
     * @throws \Exception If the insertion of the settings column fails.
     */
    public function insertSettingsColumnForPipeline($pipelineId) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS, array(
            'pipeline_id' => $pipelineId,
            'created_at' => $this->timeRepository->getCurrentUTCTime(),
            'updated_at' => $this->timeRepository->getCurrentUTCTime()
        ));

        if ($result == false) {
            throw new \Exception('Failed to create board settings');
        } 
    }
}