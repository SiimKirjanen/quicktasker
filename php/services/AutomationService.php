<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\Automation\AutomationRepository;
use WPQT\Task\TaskService;
use WPQT\Log\LogService;

if ( ! class_exists( 'WPQT\Automation\AutomationService' ) ) {
    class AutomationService {
        protected $automationRepository;
        protected $taskService;
        protected $logService;

        public function __construct() {
            $this->automationRepository = new AutomationRepository();
            $this->taskService = new TaskService();
            $this->logService = new LogService();
        }

        public function handleAutomations($boardId, $targetId, $targetType, $automationTrigger) {
            $executedAutomations = [];

            try {
                $relatedAutomations = $this->automationRepository->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

                if ( ! empty($relatedAutomations) ) {
                    foreach ($relatedAutomations as $automation) {
                        $executed = $this->executeAutomation($automation, $targetId);

                        if($executed) {
                            $executedAutomations[] = $automation;
                        }
                        
                    }
                }

                return $executedAutomations;
            } catch(\Exception $e) {
                return $executedAutomations;
            }
        }

        private function executeAutomation($automation, $targetId) {
            if( $this->isTaskDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    $logMessage = $this->getAutomationLogMessage($automation);

                    $this->taskService->archiveTask($targetId, true);
                    $this->logService->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            return false;
        }

        /**
         * Checks if the given automation action is to archive a task.
         *
         * @param object $automation The automation object containing action and target type.
         * @return bool Returns true if the automation action is to archive a task and the target type is task, otherwise false.
         */
        private function isArchiveTaskAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_ARCHIVE_TASK && $automation->target_type === WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK;
        }

        /**
         * Checks if the automation trigger is set to 'task done'.
         *
         * @param object $automation The automation object containing the trigger information.
         * @return bool Returns true if the automation trigger is 'task done', false otherwise.
         */
        private function isTaskDoneTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE;
        }

        private function getAutomationLogMessage($automation) {
            return "Automation executed: Board ID: {$automation->pipeline_id}, Target ID: {$automation->target_id}, Target Type: {$automation->target_type}, Trigger: {$automation->automation_trigger}, Action: {$automation->automation_action}";
        }
    }
}