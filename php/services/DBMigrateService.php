<?php

namespace WPQT\DB;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\DB\DBMigrateService' ) ) {
    class DBMigrateService {

        public function runMigrations() {
            $this->changeTaskLocationStageIdToNullable();
        }

        private function changeTaskLocationStageIdToNullable() {
            global $wpdb;

            $wpdb->query(
                "ALTER TABLE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " MODIFY stage_id INT(11) DEFAULT NULL"
            );
        }
    }
}