<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Automation\AutomationService' ) ) {
    class AutomationService {
        public function handleAutomations($boardId, $targetId, $targetType, $automationTrigger) {
            $executedAutomations = [];

            try {
                $relatedAutomations = ServiceLocator::get('AutomationRepository')->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

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

                    ServiceLocator::get('TaskService')->archiveTask($targetId, true);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

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

        /**
         * Generates a log message for the given automation.
         *
         * @param object $automation The automation object containing details about the automation.
         * @return string The formatted log message.
         */
        private function getAutomationLogMessage($automation) {
            return "Automation executed: Board ID: {$automation->pipeline_id}, Target ID: {$automation->target_id}, Target Type: {$automation->target_type}, Trigger: {$automation->automation_trigger}, Action: {$automation->automation_action}";
        }

        /**
         * Creates a new automation entry in the database.
         *
         * @param int $pipelineId The ID of the pipeline.
         * @param int|null $targetId The ID of the target, can be null.
         * @param string $targetType The type of the target.
         * @param string $trigger The trigger for the automation.
         * @param string $action The action to be performed by the automation.
         * @return array The created automation data.
         * @throws \Exception If the automation creation fails.
         */
        public function createAutomation($pipelineId, $targetId, $targetType, $trigger, $action) {
            global $wpdb;
        
            $data = [
                'pipeline_id' => $pipelineId,
                'target_id' => $targetId,
                'target_type' => $targetType,
                'automation_trigger' => $trigger,
                'automation_action' => $action,
                'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ];
                
            $result = $wpdb->insert(
                TABLE_WP_QUICKTASKER_AUTOMATIONS,
                $data
            );
        
            if (!$result) {
                throw new \Exception('Failed to create an automation.');
            }
        
            return ServiceLocator::get('AutomationRepository')->getAutomation($wpdb->insert_id);
        }
    }
}