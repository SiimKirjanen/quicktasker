<?php

namespace WPQT\Settings;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Settings\SettingsService')) {
    class SettingsService
    {
        /**
         * Mirrors WP Core's Customizer Additional CSS check
         * (WP_Customize_Custom_CSS_Setting::validate): rejects raw HTML tags.
         * The save endpoint requires the manage-settings capability, so the
         * cap check is the real security boundary — this is just hygiene.
         */
        public static function validateUserPageCustomStyles($customStyles)
        {
            if (preg_match('#</?\w+#', $customStyles)) {
                return false;
            }

            return true;
        }

        public static function saveUserPageCustomStyles($customStyles)
        {
            if (!self::validateUserPageCustomStyles($customStyles)) {
                throw new \Exception('Invalid custom styles: HTML markup is not allowed in CSS.');
            }

            update_option(WP_QUICKTASKER_USER_PAGE_CUSTOM_STYLES, $customStyles);

            return SettingRepository::getUserPageCustomStyles();
        }

        /**
         * Inserts a new settings column for a given pipeline into the database.
         *
         * @param int $pipelineId The ID of the pipeline for which the settings column is being inserted.
         * @throws \Exception If the insertion of the settings column fails.
         */
        public function insertSettingsColumnForPipeline($pipelineId)
        {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS, [
                'pipeline_id' => $pipelineId,
                'created_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                'updated_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ]);

            if (false == $result) {
                throw new \Exception('Failed to create board settings');
            }
        }

        /**
         * Updates the pipeline task completion restriction setting.
         *
         * This method updates the setting that restricts task completion to only the last stage in a pipeline.
         *
         * @param int $pipelineId The ID of the pipeline to update.
         * @param bool $allowOnlyLastStageTaskDone Whether to allow only the last stage task to be marked as done.
         * @throws \Exception If the update operation fails.
         */
        public function updatePipelineTaskDoneCompletionRestriction($pipelineId, $allowOnlyLastStageTaskDone)
        {
            global $wpdb;

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS, [
                'allow_only_last_stage_task_done' => $allowOnlyLastStageTaskDone,
                'updated_at'                      => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ], [
                'pipeline_id' => $pipelineId
            ]);

            if (false === $result) {
                throw new \Exception('Failed to update board settings');
            }
        }

        public function updatePipelineSettings($pipelineId, $settings)
        {
            global $wpdb;

            $allowedSettings = [
                'allow_only_last_stage_task_done',
                'pipeline_refresh_interval',
                'allow_public_task_creation',
                'public_task_creation_limit',
                'public_task_creation_count',
                'require_logged_in_user',
                'enable_automation_logs',
                'enable_webhook_logs',
                'enable_api_token_logs',
            ];
            $updateData = [
                'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ];

            foreach ($allowedSettings as $key) {
                if (array_key_exists($key, $settings)) {
                    $updateData[$key] = $settings[$key];
                }
            }

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS, $updateData, [
                'pipeline_id' => $pipelineId
            ]);

            if (false === $result) {
                throw new \Exception('Failed to update board settings');
            }
        }
    }
}
