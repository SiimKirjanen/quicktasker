<?php

namespace WPQT\DB;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Settings\SettingsService;
use WPQT\Pipeline\PipelineRepository;

if ( ! class_exists( 'WPQT\DB\DBSeederService' ) ) {
    class DBSeederService {
        protected $piplelineRepository;
        protected $settingsService;

        public function __construct() {
            $this->piplelineRepository = new PipelineRepository();
            $this->settingsService = new SettingsService();
        }

        public function seedEmptyPipelineSettings() {
            global $wpdb;

            $pipelines = $this->piplelineRepository->getPipelines();

            foreach ($pipelines as $pipeline) {
                $settingExists = $wpdb->get_var($wpdb->prepare(
                    "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS . " WHERE pipeline_id = %d",
                    $pipeline->id
                ));

                if ($settingExists == 0) {
                    $this->settingsService->insertSettingsColumnForPipeline($pipeline->id);
                }
            }
        }
    }
}