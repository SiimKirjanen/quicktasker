<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\DB\DBSeederService;

$quicktasker_db_seeder_trigger = get_option('quicktasker_db_seeder_trigger');

if ($quicktasker_db_seeder_trigger !== WP_QUICKTASKER_DB_SEEDER_TRIGGER) {
	$dbSeederService = new DBSeederService();
    $dbSeederService->seedEmptyPipelineSettings();

	update_option( 'quicktasker_db_seeder_trigger', WP_QUICKTASKER_DB_SEEDER_TRIGGER );
}
