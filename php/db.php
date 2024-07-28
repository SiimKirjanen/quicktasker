<?php

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
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql );  

        $sql2 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_PIPELINE_STAGES . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            pipeline_id int(11) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql2 );
          
        $sql3 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_TASKS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            stage_id int(11) NOT NULL,
            name varchar(255) NOT NULL,
            description text,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql3 ); 

        $sql4 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_USERS . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            description text,
			PRIMARY KEY  (id)
		  ) $charset_collate;";
	  
		dbDelta( $sql4 ); 

		update_option( "wp_quick_taks_db_current_version", WP_QUICK_TASKS_DB_VERSION );
	}
}

function wpqt_insert_initial_data() {
	global $wpdb;

	$pipeRepo = new PipelineRepository();
	$pipeService = new PipelineService();
	$stageService = new StageService();
	$taskService = new TasksService();
	$pipelines = $pipeRepo->getPipelines();

	if( !count($pipelines) ) {
		try {
			$newPipeId = $pipeService->createPipeline("Pipeline");
			$first_stage_id = $stageService->creatStage($newPipeId, array('name' => 'Stage 1'));
			$stageService->creatStage($newPipeId, array('name' => 'Stage 2'));
			$stageService->creatStage($newPipeId, array('name' => 'Stage 3'));
			$stageService->creatStage($newPipeId, array('name' => 'Stage 4'));

			$taskService->createTask($first_stage_id, array('name' => 'Task 1'));


		}catch(Exception $e) {
			echo $e->getMessage();
		}
	}
}
