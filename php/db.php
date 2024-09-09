<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}
use WPQT\Pipeline\PipelineRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Stage\StageService;

function wpqt_set_up_db() {
	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	global $wpdb;

	$wp_quick_taks_db_current_version = get_option( "wp_quick_taks_db_current_version" );
    $charset_collate = $wpdb->get_charset_collate() . ' ENGINE = innoDB';

	if ( WP_QUICK_TASKS_DB_VERSION != $wp_quick_taks_db_current_version ) {

        $sql = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_PIPELINES . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            description text,
			is_primary tinyint(1) DEFAULT 0,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql );  

        $sql2 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_PIPELINE_STAGES . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            pipeline_id int(11) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql2 );
          
        $sql3 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_TASKS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
			pipeline_id int(11) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
			is_archived tinyint(1) DEFAULT 0,
			free_for_all tinyint(1) DEFAULT 0,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql3 ); 

        $sql4 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_USERS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            description text,
			email varchar(255),
			phone varchar(255),
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			is_active tinyint(1) DEFAULT 1,
			password varchar(255) DEFAULT NULL,
			deleted tinyint(1) DEFAULT 0,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql4 ); 

		$sql5 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            stage_id int(11) NOT NULL,
			task_id int(11) NOT NULL,
			task_order int(11),
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id),
			UNIQUE KEY task_id (task_id)
		  ) $charset_collate;";
		
		dbDelta( $sql5 ); 
	  
		$sql6 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_STAGES_LOCATION . " (
			id int(11) NOT NULL AUTO_INCREMENT,
			pipeline_id int(11) NOT NULL,
            stage_id int(11) NOT NULL,
			stage_order int(11),
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id),
			UNIQUE KEY stage_id (stage_id)
		  ) $charset_collate;";

		dbDelta( $sql6 ); 

		$sql7 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_LOGS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            text text NOT NULL,
			type_id int(11) NOT NULL,
			type ENUM('task', 'pipeline', 'stage', 'user') NOT NULL,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";

		  dbDelta( $sql7 ); 

		  $sql8 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_COMMENTS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            text text NOT NULL,
			type_id int(11) NOT NULL,
			type ENUM('task', 'user') NOT NULL,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";

		  dbDelta( $sql8 ); 

		  $sql9 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_USER_PAGES . " (
			id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			page_hash varchar(255) NOT NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY page_hash (page_hash)
		  ) $charset_collate;";

		  dbDelta( $sql9 ); 

		  $sql10 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_USER_SESSIONS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
			session_token varchar(255) NOT NULL,
			user_id int(11) NOT NULL,
			page_hash varchar(255) NOT NULL,
			created_at_utc datetime NOT NULL COMMENT 'UTC',
			expires_at_utc datetime NOT NULL COMMENT 'UTC',
			PRIMARY KEY  (id),
			UNIQUE KEY session_token (session_token)
		  ) $charset_collate;";

		  dbDelta( $sql10 ); 

		  $sql11 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_USER_TASK . " (
			id int(11) NOT NULL AUTO_INCREMENT,
			user_id int(11) NOT NULL,
			task_id int(11) NOT NULL,
			created_at datetime DEFAULT CURRENT_TIMESTAMP,
			updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			PRIMARY KEY  (id)
		  ) $charset_collate;";

		  dbDelta( $sql11 ); 

		update_option( "wp_quick_taks_db_current_version", WP_QUICK_TASKS_DB_VERSION );
	}
}

function wpqt_insert_initial_data() {
	global $wpdb;

	try {
		$wpdb->query('START TRANSACTION');

		$pipeRepo = new PipelineRepository();
		$pipeService = new PipelineService();
		$stageService = new StageService();
		$taskService = new TaskService();
		$pipelines = $pipeRepo->getPipelines();

	if( !count($pipelines) ) {
		$newPipeId = $pipeService->createPipeline("Pipeline")->id;
		$pipeService->markPipelineAsPrimary($newPipeId);
		$firstStageId = $stageService->createStage($newPipeId, array('name' => 'Stage 1'))->id;
		$secondStageId = $stageService->createStage($newPipeId, array('name' => 'Stage 2'))->id;
		$stageService->createStage($newPipeId, array('name' => 'Stage 3'));
		$stageService->createStage($newPipeId, array('name' => 'Stage 4'));

		$taskService->createTask($firstStageId, array('name' => 'Task 1'));
		$taskService->createTask($firstStageId, array('name' => 'Task 2'));
		$taskService->createTask($secondStageId, array('name' => 'Task 3'));
		$taskService->createTask($secondStageId, array('name' => 'Task 4'));

		$wpdb->query('COMMIT');
	}
	} catch (\Throwable $th) {
		$wpdb->query('ROLLBACK');
	}
}
