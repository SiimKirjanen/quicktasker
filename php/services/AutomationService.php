<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\Automation\AutomationRepository;
use WPQT\Task\TaskService;

if ( ! class_exists( 'WPQT\Automation\AutomationService' ) ) {
    class AutomationService {
        protected $automationRepository;
        protected $taskService;

        public function __construct() {
            $this->automationRepository = new AutomationRepository();
            $this->taskService = new TaskService();
        }

        public function handleAutomations($boardId, $targetId, $targetType, $automationTrigger) {
            try {
                $relatedAutomations = $this->automationRepository->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

                if ( ! empty($relatedAutomations) ) {
                    foreach ($relatedAutomations as $automation) {
                        $this->executeAutomation($automation, $targetId);
                    }
                }
            } catch(\Exception $e) {
                // Log the error
            }
         
        }

        private function executeAutomation($automation, $targetId) {
            if( $this->isTaskDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    $this->taskService->archiveTask($targetId, true);

                    return true;
                }
            }
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
    }
}