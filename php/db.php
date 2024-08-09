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
			is_primary tinyint(1) DEFAULT 0,
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

		$sql5 = "CREATE TABLE " . TABLE_WP_QUICK_TASKS_TASKS_LOCATION . " (
			id int(11) NOT NULL AUTO_INCREMENT,
            stage_id int(11) NOT NULL,
			task_id int(11) NOT NULL,
			task_order int(11),
			PRIMARY KEY  (id),
			UNIQUE KEY task_id (task_id)
		  ) $charset_collate;";
	  
		dbDelta( $sql5 ); 

		update_option( "wp_quick_taks_db_current_version", WP_QUICK_TASKS_DB_VERSION );
	}
}

function wpqt_insert_initial_data() {
	global $wpdb;

	$pipeRepo = new PipelineRepository();
	$pipeService = new PipelineService();
	$stageService = new StageService();
	$taskService = new TaskService();
	$pipelines = $pipeRepo->getPipelines();

	if( !count($pipelines) ) {
		try {
			$newPipeId = $pipeService->createPipeline("Pipeline");
			$pipeService->markPipelineAsPrimary($newPipeId);
			$firstStageId = $stageService->creatStage($newPipeId, array('name' => 'Stage 1'));
			$secondStageId = $stageService->creatStage($newPipeId, array('name' => 'Stage 2'));
			$stageService->creatStage($newPipeId, array('name' => 'Stage 3'));
			$stageService->creatStage($newPipeId, array('name' => 'Stage 4'));

			$taskService->createTask($firstStageId, array('name' => 'Task 1', 'taskOrder' => 0));
			$taskService->createTask($firstStageId, array('name' => 'Task 2', 'taskOrder' => 1));
			$taskService->createTask($secondStageId, array('name' => 'Task 3', 'taskOrder' => 0));
			$taskService->createTask($secondStageId, array('name' => 'Task 4', 'taskOrder' => 1));
		}catch(Exception $e) {
			echo $e->getMessage();
		}
	}
}
