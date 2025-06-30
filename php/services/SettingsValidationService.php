<?php

namespace WPQT\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Settings\SettingsValidationService' ) ) {
    class SettingsValidationService {
        /**
         * Checks if the task is allowed to be marked as done.
         *
         * This method verifies if a task is allowed to be marked as done based on the pipeline settings.
         * If the pipeline settings specify that only tasks in the last stage can be marked as done,
         * it checks if the task is in the last stage. Otherwise, it allows the task to be marked as done.
         *
         * @param int $taskId The ID of the task to check.
         * @return bool True if the task is allowed to be marked as done, false otherwise.
         */
        public function isAllowedToMarkTaskDone($taskId) {
            $task = ServiceLocator::get("TaskRepository")->getTaskById($taskId);
            $pipelineSettings = ServiceLocator::get("SettingRepository")->getPipelineSettings($task->pipeline_id);
            $taskStage = ServiceLocator::get("StageRepository")->getStageById($task->stage_id);

            if ($pipelineSettings->allow_only_last_stage_task_done == '1') {
                $lastStageOrder = ServiceLocator::get("StageRepository")->getLastStageOrder($task->pipeline_id);

                return $taskStage->stage_order == $lastStageOrder;
        
            }else {
                return true;
            }
        }
    }
}