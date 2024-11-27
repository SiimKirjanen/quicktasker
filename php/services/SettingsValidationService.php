<?php

namespace WPQT\Settings;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Settings\SettingRepository;
use WPQT\Task\TaskRepository;
use WPQT\Stage\StageRepository;

if ( ! class_exists( 'WPQT\Settings\SettingsValidationService' ) ) {
    class SettingsValidationService {
        protected $settingRepository;
        protected $taskRepository;
        protected $stageRepository;

        public function __construct() {
            $this->settingRepository = new SettingRepository();
            $this->taskRepository = new TaskRepository();
            $this->stageRepository = new StageRepository();
        }

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
            $task = $this->taskRepository->getTaskById($taskId);
            $pipelineSettings = $this->settingRepository->getPipelineSettings($task->pipeline_id);
            $taskStage = $this->stageRepository->getStageById($task->stage_id);

            if ($pipelineSettings->allow_only_last_stage_task_done == '1') {
                $lastStageOrder = $this->stageRepository->getLastStageOrder($task->pipeline_id);

                return $taskStage->stage_order == $lastStageOrder;
        
            }else {
                return true;
            }
        }
    }
}