<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\DB\DBSeederService;

add_action('plugins_loaded', 'wpqt_run_db_seeder');
function wpqt_run_db_seeder() {
    global $wpdb;

    $quicktasker_db_seeder_trigger = get_option('quicktasker_db_seeder_trigger');

    if ($quicktasker_db_seeder_trigger !== WP_QUICKTASKER_DB_SEEDER_TRIGGER) {
        $dbSeederService = new DBSeederService();
        $dbSeederService->seedEmptyPipelineSettings();

        update_option('quicktasker_db_seeder_trigger', WP_QUICKTASKER_DB_SEEDER_TRIGGER);
    }
}