<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Automation\AutomationService' ) ) {
    class AutomationService {

        /**
         * Handles the execution of automations based on the provided parameters.
         *
         * @param int $boardId The ID of the board where the automations are defined.
         * @param int $targetId The ID of the target entity for the automation.
         * @param string $targetType The type of the target entity (e.g., 'task', 'project').
         * @param string $automationTrigger The trigger that initiates the automation (e.g., 'onCreate', 'onUpdate').
         * @param object|null $data Additional data to be used in the automation execution.
         * 
         * @return object An object containing two arrays:
         *                - 'executedAutomations': An array of successfully executed automations.
         *                - 'failedAutomations': An array of automations that failed to execute.
         */
        public function handleAutomations($boardId, $targetId, $targetType, $automationTrigger, $data = null) {
            $executedAutomations = [];
            $failedAutomations = [];
            $relatedAutomations = ServiceLocator::get('AutomationRepository')->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

            if ( ! empty($relatedAutomations) ) {
                foreach ($relatedAutomations as $automation) {
                    try {
                        $result = $this->executeAutomation($automation, $targetId, $data);

                        if($result) {
                            $automation->executionResult = $result;
                            $executedAutomations[] = $automation;
                        }
                    } catch(\Exception $e) {
    
                        $failedAutomations[] = $automation;
                    }
                    
                }
            }

            return (object)[
                'executedAutomations' => $executedAutomations,
                'failedAutomations' => $failedAutomations
            ];
           
        }

        private function executeAutomation($automation, $targetId, $data) {
            $logMessage = $this->getAutomationLogMessage($automation);

            if( $this->isTaskDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    ServiceLocator::get('TaskService')->archiveTask($targetId, true);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if( $this->isTaskNotDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    ServiceLocator::get('TaskService')->archiveTask($targetId, false);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if( $this->isTaskCreatedTrigger($automation) ) {
                if ( $this->isAssignUserAction($automation) ) {
                    $userId = $automation->automation_action_target_id;
                    $userType = $automation->automation_action_target_type;
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, $userType);

                    ServiceLocator::get('UserService')->assignTaskToUser($userId, $targetId, $userType);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return $user;
                }

                if ( $this->isNewEntityEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($task->created_at)
                    ];
                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_NEW_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'New Task Created', $emailMessage);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if ( $this->isTaskDeletedTrigger($automation) ) {
                if ($this->isDeletedEntityEmailAction($automation)) {
                    $email = $automation->metadata;
                    $deletedTask = $data->deletedTask;
                    $deletedByUserId = $data->deletedByUserId;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($deletedTask->pipeline_id);
                    $deletedByUser = ServiceLocator::get('UserRepository')->getUserByIdAndType($deletedByUserId, WP_QT_WORDPRESS_USER_TYPE);

                    $templateData = [
                        'taskName' => $deletedTask->name,
                        'boardName' => $pipeline->name,
                        'deleteDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                        'deletedByUserName' => $deletedByUser->name
                    ];
                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_DELETED_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task Deleted', $emailMessage);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if ( $this->isTaskAssignedTrigger($automation) ) {
              if ( $this->isTaskAssignedEmailAction($automation) ) {
                $email = $automation->metadata;
                $assignedUser = $data;
                $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);

                $templateData = [
                    'taskName' => $task->name,
                    'boardName' => $pipeline->name,
                    'assignedDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                    'userName' => $assignedUser->name,
                ];

                $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_ASSIGNED_TASK_EMAIL_TEMPLATE, $templateData);
                ServiceLocator::get('EmailService')->sendEmail($email, 'Task Assigned', $emailMessage);
                ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                return true;
              }
            }

            if( $this->isTaskUnassignedTrigger($automation) ) {
                if ( $this->isTaskUnassignedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $unassignedUser = $data;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'unassignedDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                        'userName' => $unassignedUser->name,
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_UNASSIGNED_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task Unassigned', $emailMessage);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if ( $this->isTaskPublicCommentAddedTrigger($automation) ) {
                if ( $this->isTaskPublicCommentAddedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $comment = $data;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $authorUserType = $comment->is_admin_comment ? WP_QT_WORDPRESS_USER_TYPE : WP_QT_QUICKTASKER_USER_TYPE;
                    $commentAuthor = ServiceLocator::get('UserRepository')->getUserByIdAndType($comment->author_id, $authorUserType);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($comment->created_at),
                        'message' => $comment->text,
                        'authorName' => $commentAuthor->name
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_NEW_PUBLIC_COMMENT_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Public Comment Added', $emailMessage);
                    ServiceLocator::get('LogService')->log($logMessage, WP_QT_LOG_TYPE_TASK, $targetId, WP_QT_LOG_CREATED_BY_AUTOMATION);

                    return true;
                }
            }

            if ( $this->isTaskPrivateCommentAddedTrigger($automation) ) {
                if ( $this->isTaskPrivateCommentAddedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $comment = $data;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $commentAuthor = ServiceLocator::get('UserRepository')->getUserByIdAndType($comment->author_id, WP_QT_WORDPRESS_USER_TYPE);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($comment->created_at),
                        'message' => $comment->text,
                        'authorName' => $commentAuthor->name
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_NEW_PRIVATE_COMMENT_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Private Comment Added', $emailMessage);
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
         * Checks if the given automation action is to assign a user.
         *
         * This function verifies if the automation action is of type 'assign user' and 
         * if the target type of the automation action is 'user'.
         *
         * @param object $automation The automation object containing action details.
         * @return bool Returns true if the automation action is to assign a user, false otherwise.
         */
        private function isAssignUserAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_ASSIGN_USER &&
                   in_array($automation->automation_action_target_type, [WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_QUICKTASKER, WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPE_WP_USER], true) &&
                   $automation->automation_action_target_id !== null;
        }

        private function isNewEntityEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_NEW_ENTITY && $automation->metadata !== null;
        }

        /**
         * Checks if the automation action is a deleted entity email action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a deleted entity email action and metadata is not null, false otherwise.
         */
        private function isDeletedEntityEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_DELETED_ENTITY_EMAIL && $automation->metadata !== null;
        }

        /**
         * Checks if the automation action is a task assigned email action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a task assigned email action and metadata is not null, false otherwise.
         */
        private function isTaskAssignedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ASSIGNED_EMAIL && $automation->metadata !== null;
        }

        /**
         * Checks if the automation action is a task unassigned email action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a task unassigned email action and metadata is not null, false otherwise.
         */
        private function isTaskUnassignedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_UNASSIGNED_EMAIL && $automation->metadata !== null;
        }

        /**
         * Checks if the automation action is a task public comment added email action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a task public comment added email action and metadata is not null, false otherwise.
         */
        private function isTaskPublicCommentAddedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PUBLIC_COMMENT_ADDED_EMAIL && $automation->metadata !== null;
        }

        /**
         * Checks if the automation action is a task private comment added email action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a task private comment added email action and metadata is not null, false otherwise.
         */
        private function isTaskPrivateCommentAddedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_PRIVATE_COMMENT_ADDED_EMAIL && $automation->metadata !== null;
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
         * Checks if the automation trigger is set to "task not done".
         *
         * This function evaluates whether the provided automation object's trigger
         * is equal to the constant `WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE`.
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is "task not done", false otherwise.
         */
        private function isTaskNotDoneTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE;
        }

        /**
         * Checks if the automation trigger is set to "task created".
         *
         * @param object $automation The automation object containing the trigger information.
         * @return bool Returns true if the automation trigger is "task created", false otherwise.
         */
        private function isTaskCreatedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED;
        }

        /**
         * Checks if the automation trigger is set to task deleted.
         *
         * @param object $automation The automation object containing the trigger information.
         * @return bool Returns true if the automation trigger is set to task deleted, false otherwise.
         */
        private function isTaskDeletedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED;
        }

        /**
         * Checks if the automation trigger is set to task assigned.
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is task assigned, false otherwise.
         */
        private function isTaskAssignedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED;
        }

        /**
         * Checks if the automation trigger is set to task unassigned.
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is task unassigned, false otherwise.
         */
        private function isTaskUnassignedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED;
        }

        /**
         * Checks if the automation trigger is set to task public comment added.
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is task public comment added, false otherwise.
         */
        private function isTaskPublicCommentAddedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED;
        }

        /**
         * Checks if the automation trigger is set to task private comment added.
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is task private comment added, false otherwise.
         */
        private function isTaskPrivateCommentAddedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED;
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
         * @param int|null $automationActionTargetId The ID of the target for the action, can be null.
         * @param string|null $automationActionTargetType The type of the target for the action, can be null.
         * @param string|null $metadata Additional metadata for the automation, can be null.
         * @return array The created automation data.
         * @throws \Exception If the automation creation fails.
         */
        public function createAutomation($pipelineId, $targetId, $targetType, $trigger, $action, $automationActionTargetId = null, $automationActionTargetType = null, $metadata = null) {
            global $wpdb;
        
            $data = [
                'pipeline_id' => $pipelineId,
                'target_id' => $targetId,
                'target_type' => $targetType,
                'automation_trigger' => $trigger,
                'automation_action' => $action,
                'automation_action_target_id' => $automationActionTargetId,
                'automation_action_target_type' => $automationActionTargetType,
                'metadata' => $metadata,
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

  
        /**
         * Deletes an automation by its ID.
         *
         * This function retrieves the automation by its ID and deletes it from the database.
         * If the automation is not found, it throws an exception.
         * If the deletion fails, it throws an exception.
         *
         * @param int $automationId The ID of the automation to delete.
         * @return object The deleted automation object.
         * @throws \Exception If the automation is not found or the deletion fails.
         */
        public function deleteAutomation($automationId) {
            global $wpdb;

            $automation = ServiceLocator::get('AutomationRepository')->getAutomation($automationId);

            if (!$automation) {
                throw new \Exception('Automation not found.');
            }

            $result = $wpdb->delete(
                TABLE_WP_QUICKTASKER_AUTOMATIONS,
                ['id' => $automationId]
            );

            if (!$result) {
                throw new \Exception('Failed to delete the automation.');
            }

            return $automation;
        }
    }
}