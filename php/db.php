<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}
use WPQT\Pipeline\PipelineRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Stage\StageService;
use WPQT\Task\TaskService;
use WPQT\Label\LabelService;
use WPQT\Time\TimeRepository;
use WPQT\Log\LogService;

if ( ! function_exists( 'wpqt_set_up_db' ) ) {
	function wpqt_set_up_db() {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		global $wpdb;

		$wp_quicktasker_db_current_version = get_option( "wp_quicktasker_db_current_version" );
		$charset_collate = $wpdb->get_charset_collate() . ' ENGINE = innoDB';

		if ( WP_QUICKTASKER_DB_VERSION != $wp_quicktasker_db_current_version ) {

			$sql = "CREATE TABLE " . TABLE_WP_QUICKTASKER_PIPELINES . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				name varchar(255) NOT NULL,
				description text,
				is_primary tinyint(1) DEFAULT 0,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				UNIQUE KEY name (name)
			) $charset_collate;";
		
			dbDelta( $sql );  

			$sql2 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_PIPELINE_STAGES . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				name varchar(255) NOT NULL,
				description text,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				INDEX pipeline_id (pipeline_id)
			) $charset_collate;";
		
			dbDelta( $sql2 );
			
			$sql3 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_TASKS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				name varchar(255) NOT NULL,
				description text,
				is_archived tinyint(1) DEFAULT 0,
				is_done tinyint(1) DEFAULT 0,
				free_for_all tinyint(1) DEFAULT 0,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				due_date datetime DEFAULT NULL COMMENT 'UTC',
				task_completed_at datetime DEFAULT NULL COMMENT 'UTC',
				task_hash varchar(255) NOT NULL,
				task_focus_color varchar(255) DEFAULT NULL,
				PRIMARY KEY  (id),
				UNIQUE KEY task_hash (task_hash),
				INDEX pipeline_id (pipeline_id),
				INDEX is_archived (is_archived)
			) $charset_collate;";
		
			dbDelta( $sql3 ); 

			$sql4 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_USERS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				name varchar(255) NOT NULL,
				description text,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				is_active tinyint(1) DEFAULT 1,
				password varchar(255) DEFAULT NULL,
				deleted tinyint(1) DEFAULT 0,
				PRIMARY KEY  (id),
				INDEX deleted (deleted)
			) $charset_collate;";
		
			dbDelta( $sql4 ); 

			$sql5 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				stage_id int(11) DEFAULT NULL,
				task_id int(11) NOT NULL,
				task_order int(11),
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				is_archived tinyint(1) DEFAULT 0,
				PRIMARY KEY  (id),
				UNIQUE KEY task_id (task_id),
				INDEX stage_id (stage_id),
				INDEX task_order (task_order)
			) $charset_collate;";
			
			dbDelta( $sql5 ); 
		
			$sql6 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_STAGES_LOCATION . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				stage_id int(11) NOT NULL,
				stage_order int(11),
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				UNIQUE KEY stage_id (stage_id),
				INDEX pipeline_id (pipeline_id),
				INDEX stage_order (stage_order)
			) $charset_collate;";

			dbDelta( $sql6 ); 

			$sql7 = "CREATE TABLE " . TABLE_WP_QUICKTASKS_LOGS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) DEFAULT NULL,
				text text NOT NULL,
				type_id int(11) DEFAULT NULL,
				type ENUM('task', 'pipeline', 'stage', 'user', 'users') NOT NULL,
				created_by ENUM('system', 'admin', 'quicktasker_user', 'automation', 'import') NOT NULL,
				user_id int(11) DEFAULT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				log_status ENUM('success', 'error') DEFAULT 'success',
				PRIMARY KEY  (id),
				INDEX type_id (type_id),
				INDEX type (type),
				INDEX created_by (created_by),
				INDEX user_id (user_id)
			) $charset_collate;";

			dbDelta( $sql7 ); 

			$sql8 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_COMMENTS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				text text NOT NULL,
				type_id int(11) NOT NULL,
				type ENUM('task', 'user') NOT NULL,
				is_private tinyint(1) DEFAULT 1,
				created_at datetime NOT NULL COMMENT 'UTC',
				author_id int(11) NOT NULL,
				is_admin_comment tinyint(1) DEFAULT 0,
				PRIMARY KEY  (id),
				INDEX type_id (type_id),
				INDEX type (type),
				INDEX is_private (is_private),
				INDEX author_id (author_id),
				INDEX is_admin_comment (is_admin_comment)
			) $charset_collate;";

			dbDelta( $sql8 ); 

			$sql9 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_USER_PAGES . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				user_id int(11) NOT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				page_hash varchar(255) NOT NULL,
				PRIMARY KEY  (id),
				UNIQUE KEY page_hash (page_hash),
				INDEX user_id (user_id)
			) $charset_collate;";

			dbDelta( $sql9 ); 

			$sql10 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_USER_SESSIONS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				session_token varchar(255) NOT NULL,
				user_id int(11) NOT NULL,
				page_hash varchar(255) NOT NULL,
				is_active tinyint(1) DEFAULT 1,
				created_at_utc datetime NOT NULL COMMENT 'UTC',
				expires_at_utc datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				UNIQUE KEY session_token (session_token),
				INDEX user_id (user_id),
				INDEX is_active (is_active),
				INDEX created_at_utc (created_at_utc),
				INDEX expires_at_utc (expires_at_utc)
			) $charset_collate;";

			dbDelta( $sql10 ); 

			$sql11 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_USER_TASK . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				user_id int(11) NOT NULL,
				user_type ENUM('quicktasker', 'wp-user') DEFAULT 'quicktasker',
				task_id int(11) NOT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				UNIQUE KEY unique_user_task (user_id, task_id, user_type),
				INDEX task_id (task_id),
				INDEX user_id (user_id),
				INDEX user_type (user_type)
			) $charset_collate;";

			dbDelta( $sql11 );
			
			$sql12 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				name varchar(255) NOT NULL,
				description text,
				type ENUM('text', 'select', 'checkbox', 'radio', 'datetime', 'file') NOT NULL,
				entity_type ENUM('task', 'user', 'pipeline', 'users') NOT NULL,
				entity_id int(11) DEFAULT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				deleted_at datetime DEFAULT NULL COMMENT 'UTC',
				is_deleted tinyint(1) DEFAULT 0,
				PRIMARY KEY  (id),
				INDEX entity_type (entity_type),
				INDEX entity_id (entity_id),
				INDEX is_deleted (is_deleted)
			) $charset_collate;";

			dbDelta( $sql12 );

			$sql13 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				custom_field_id int(11) NOT NULL,
				entity_id int(11) NOT NULL,
				entity_type ENUM('task', 'user') NOT NULL,
				value TEXT,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				INDEX custom_field_id (custom_field_id),
				INDEX entity_id (entity_id),
				INDEX entity_type (entity_type)
			) $charset_collate;";

			dbDelta( $sql13 );

			$sql14 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				allow_only_last_stage_task_done tinyint(1) DEFAULT 0,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				UNIQUE KEY pipeline_id (pipeline_id)
			) $charset_collate;";

			dbDelta( $sql14 );

			$sql15 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				target_id int(11) DEFAULT NULL,
				target_type ENUM('stage', 'task', 'quicktasker', 'pipeline', 'woocommerce-order') NOT NULL,
				automation_trigger ENUM('task-done', 'task-created', 'task-not-done', 'task-deleted', 'task-assigned', 'task-unassigned', 'task-public-comment-added', 'task-private-comment-added', 'task-attachment-added', 'task-attachment-deleted', 'woocommerce-order-added') NOT NULL,
				automation_action ENUM('archive-task', 'assign-user', 'new-entity-email', 'deleted-entity-email', 'task-assigned-email', 'task-unassigned-email', 'task-public-comment-added-email', 'task-private-comment-added-email', 'task-attachment-added-email', 'task-attachment-deleted-email', 'create-task', 'send-slack-message') NOT NULL,
				automation_action_target_id int(11) DEFAULT NULL,
				automation_action_target_type ENUM('stage', 'task', 'quicktasker', 'pipeline', 'wp-user') DEFAULT NULL,
				metadata TEXT DEFAULT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				updated_at datetime NOT NULL COMMENT 'UTC',
				active tinyint(1) DEFAULT 1,
				verify_success tinyint(1) DEFAULT 0,
				PRIMARY KEY  (id),
				INDEX pipeline_id (pipeline_id),
				INDEX target_id (target_id),
				INDEX target_type (target_type),
				INDEX automation_trigger (automation_trigger),
				INDEX automation_action (automation_action),
				INDEX automation_action_target_id (automation_action_target_id),
				INDEX automation_action_target_type (automation_action_target_type)
			) $charset_collate;";

			dbDelta( $sql15 );

			$sql16 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_LABELS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				pipeline_id int(11) NOT NULL,
				name varchar(255) NOT NULL,
				color varchar(255) NOT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				INDEX pipeline_id (pipeline_id)
			) $charset_collate;";

			dbDelta( $sql16 );

			$sql17 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				label_id int(11) NOT NULL,
				entity_id int(11) NOT NULL,
				entity_type ENUM('task') NOT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				PRIMARY KEY  (id),
				INDEX label_id (label_id)
			) $charset_collate;";

			dbDelta( $sql17 );

			$sql18 = "CREATE TABLE " . TABLE_WP_QUICKTASKER_UPLOADS . " (
				id int(11) NOT NULL AUTO_INCREMENT,
				file_name varchar(255) NOT NULL,
				file_type varchar(255) NOT NULL,
				upload_uuid varchar(255) NOT NULL,
				entity_id int(11) NOT NULL,
				entity_type ENUM('task') NOT NULL,
				created_at datetime NOT NULL COMMENT 'UTC',
				uploader_id int(11) NOT NULL,
				PRIMARY KEY  (id),
				INDEX entity_id (entity_id),
				INDEX entity_type (entity_type),
				UNIQUE KEY upload_uuid (upload_uuid)
			) $charset_collate;";

			dbDelta( $sql18 );

			update_option( "wp_quicktasker_db_current_version", WP_QUICKTASKER_DB_VERSION );
		}
	}
}

if ( ! function_exists( 'wpqt_insert_initial_data' ) ) {
	function wpqt_insert_initial_data() {
		global $wpdb;

		$pipeRepo = new PipelineRepository();
		$pipeService = new PipelineService();
		$stageService = new StageService();
		$taskService = new TaskService();
		$labelService = new LabelService();
		$timeRepo = new TimeRepository();
		$logService = new LogService();
		$transaction_started = false;
		$currentUserId = get_current_user_id();
		
		try {
			$pipelines = $pipeRepo->getPipelines();

			if( !count($pipelines) ) {
				$wpdb->query('START TRANSACTION');
				$transaction_started = true;

				$newPipeline = $pipeService->createPipeline("Demo board", array(
					'description' => 'This is a demo food store board.',
				));
				$newPipeId = (int) $newPipeline->id;

				$logService->log("Board {$newPipeline->name} created", [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$pipeService->markPipelineAsPrimary($newPipeId);
				$firstStage = $stageService->createStage($newPipeId, array('name' => 'Order Received'));
				$firstStageId = (int) $firstStage->id;
				$logService->log('Stage ' . $firstStage->name .  ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$secondStage = $stageService->createStage($newPipeId, array('name' => 'Preparing Order'));
				$secondStageId = (int) $secondStage->id;
				$logService->log('Stage ' . $secondStage->name .  ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);


				$thirdStage = $stageService->createStage($newPipeId, array('name' => 'Out for Delivery'));
				$thirdStageId = (int) $thirdStage->id;
				$logService->log('Stage ' . $thirdStage->name .  ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$fourthStage = $stageService->createStage($newPipeId, array('name' => 'Delivered'));
				$fourthStageId = (int) $fourthStage->id;
				$logService->log('Stage ' . $fourthStage->name .  ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$task1 = $taskService->createTask($firstStageId, array(
					'name' => 'Order #1001',
					'description' => 'Large pizza and a soda.',
					'pipelineId' => $newPipeId,
					'task_focus_color' => '#22D21E',
				));
				$logService->log('Task ' . $task1->name . ' created', [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task1->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$task2 = $taskService->createTask($firstStageId, array(
					'name' => 'Order #1002',
					'description' => 'Burger and fries.',
					'pipelineId' => $newPipeId,
					'due_date' => $timeRepo->modifyUTCTime(4, 'day'),
				));
				$logService->log('Task ' . $task2->name . ' created', [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task2->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$task3 = $taskService->createTask($secondStageId, array(
					'name' => 'Order #1003',
					'description' => 'Tacos and nachos.',
					'pipelineId' => $newPipeId,
				));
				$logService->log('Task ' . $task3->name . ' created', [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task3->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$task4 = $taskService->createTask($thirdStageId, array(
					'name' => 'Order #1004',
					'description' => 'Steak dinner with mashed potatoes.',
					'pipelineId' => $newPipeId,
					'due_date' => $timeRepo->modifyUTCTime(2, 'hour'),
				));
				$logService->log('Task ' . $task4->name . ' created', [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task4->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId
				]);

				$label = $labelService->createLabel($newPipeId, 'Important', '#FF9800');
				$logService->log('Label ' . $label->name . ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId,
				]);

				$label2 = $labelService->createLabel($newPipeId, 'VIP Customer', '#FFD700');
				$logService->log('Label ' . $label2->name . ' created', [
					'type' => WP_QT_LOG_TYPE_PIPELINE,
					'type_id' => $newPipeId,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $newPipeId,
				]);

				$labelService->assignLabel($task1->id, 'task', $label->id);
				$logService->log('Label ' . $label->name . ' added to task ' . $task1->name, [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task1->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $task1->pipeline_id,
				]);

				$labelService->assignLabel($task4->id, 'task', $label2->id);
				$logService->log('Label ' . $label2->name . ' added to task ' . $task4->name, [
					'type' => WP_QT_LOG_TYPE_TASK,
					'type_id' => $task4->id,
					'user_id' => $currentUserId,
					'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
					'pipeline_id' => $task4->pipeline_id,
				]);

				$wpdb->query('COMMIT');
			}
		} catch (\Throwable $th) {
			if ($transaction_started) {
				$wpdb->query('ROLLBACK');
			}

			//error_log('Error in wpqt_insert_initial_data: ' . $th->getMessage());
		}
	}
}