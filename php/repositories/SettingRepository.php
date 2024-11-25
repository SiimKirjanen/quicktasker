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

    /**
     * Retrieves the pipeline settings for a given pipeline ID.
     *
     * This function queries the database to fetch the settings associated with a specific pipeline.
     *
     * @param int $pipelineId The ID of the pipeline for which settings are to be retrieved.
     * @return object|null Database query results. A single row object, or null if no results.
     */
    public function getPipelineSettings($pipelineId) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT id, pipeline_id, allow_only_last_stage_task_done, created_at, updated_at FROM " . TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS . " WHERE pipeline_id = %d",
                $pipelineId
            )
        );
    }

    /**
     * Retrieves the public pipeline settings for a given pipeline ID.
     *
     * @param int $pipelineId The ID of the pipeline to retrieve settings for.
     * @return object|null The pipeline settings object containing the 'allow_only_last_stage_task_done' field, or null if no settings are found.
     */
    public function getPublicPipelineSettings($pipelineId) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT allow_only_last_stage_task_done FROM " . TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS . " WHERE pipeline_id = %d",
                $pipelineId
            )
        );
    }
}