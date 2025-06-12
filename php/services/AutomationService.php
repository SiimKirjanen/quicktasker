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
         * @param int|null $targetId The ID of the target entity for the automation.
         * @param string $targetType The type of the target entity (e.g., 'task', 'stage').
         * @param string $automationTrigger The trigger that initiates the automation (e.g., 'onCreate', 'onUpdate').
         * @param object|null $data Additional data.
         * 
         * @return object An object containing two arrays:
         *                - 'executedAutomations': An array of successfully executed automations.
         *                - 'failedAutomations': An array of automations that failed to execute.
         */
        public function handleAutomations($boardId, $targetId, $targetType, $automationTrigger, $data = null) {
            $executedAutomations = [];
            $failedAutomations = [];
            $rerunTriggers = [];
            $rerunCounter = 0;
            $maxRerunCounter = 2;

            $results = $this->processAutomations($boardId, $targetId, $targetType, $automationTrigger, $data);

            $executedAutomations = array_merge($executedAutomations, $results->executedAutomations);
            $failedAutomations = array_merge($failedAutomations, $results->failedAutomations);
            $rerunTriggers = array_merge($rerunTriggers, $results->rerunTriggers);

            while (!empty($rerunTriggers) && $rerunCounter < $maxRerunCounter) {
                $rerunCounter++;
                $currentRerunTriggers = $rerunTriggers;
                $rerunTriggers = []; // Reset for the next iteration
                
                foreach ($currentRerunTriggers as $trigger) {
                    $rerunResults = $this->processAutomations(
                        $trigger->boardId,
                        $trigger->targetId,
                        $trigger->targetType,
                        $trigger->automationTrigger,
                        $trigger->data ?? null
                    );
                    
                    // Merge results from this rerun iteration
                    $executedAutomations = array_merge($executedAutomations, $rerunResults->executedAutomations);
                    $failedAutomations = array_merge($failedAutomations, $rerunResults->failedAutomations);
                    $rerunTriggers = array_merge($rerunTriggers, $rerunResults->rerunTriggers);
                }
            }
    
            return (object)[
                'executedAutomations' => $executedAutomations,
                'failedAutomations' => $failedAutomations,
            ];
           
        }

        /**
         * Processes automations based on the provided parameters.
         *
         * This method retrieves active automations related to the specified board, target, 
         * and trigger, and attempts to execute them. It logs any failures and returns 
         * the results of the executed and failed automations.
         *
         * @param int $boardId The ID of the board associated with the automations.
         * @param int $targetId The ID of the target entity for the automations.
         * @param string $targetType The type of the target entity (e.g., task, project).
         * @param string $automationTrigger The trigger that initiates the automations.
         * @param mixed|null $data Optional additional data to pass to the automation execution.
         *
         * @return object An object containing:
         *                - `executedAutomations` (array): List of successfully executed automations.
         *                - `failedAutomations` (array): List of automations that failed to execute.
         *                - `rerunTriggers` (array): Parameters for rerunning automations.
         *
         * @throws \Throwable If an unexpected error occurs during automation execution.
         */
        public function processAutomations($boardId, $targetId, $targetType, $automationTrigger, $data = null) {
            $executedAutomations = [];
            $failedAutomations = [];
            $rerunTriggers = [];

            $relatedAutomations = ServiceLocator::get('AutomationRepository')->getActiveAutomations($boardId, $targetId, $targetType, $automationTrigger);

            if ( !empty($relatedAutomations) ) {
                foreach ($relatedAutomations as $automation) {
                    try {
                        $result = $this->executeAutomation($automation, $targetId, $data);

                        if( $result ) { 
                            if( is_object( $result ) ) {
                                $automation->executionResult = $result->data ?? true;
                                $rerunTriggers = array_merge($rerunTriggers, $result->rerunTriggers ?? []);
                            }else {
                                $automation->executionResult = $result;
                            }
                            $logMessage = $this->getAutomationLogMessage($automation);
                            ServiceLocator::get('LogService')->log($logMessage, [
                                'type' => $targetType,
                                'type_id' => $targetId,
                                'log_status' => WP_QT_LOG_STATUS_SUCCESS,
                                'user_id' => null,
                                'created_by' => WP_QT_LOG_CREATED_BY_AUTOMATION,
                                'pipeline_id' => $boardId,
                            ]);
                            $executedAutomations[] = $automation; 
                        }
                    } catch(\Throwable $e) {
                        $failureLogMessage = $this->getAutomationFailedLogMessage($automation) . $e->getMessage(); 
                        $failedAutomations[] = $automation;
                        ServiceLocator::get('LogService')->log($failureLogMessage, [
                            'type' => $targetType,
                            'type_id' => $targetId,
                            'log_status' => WP_QT_LOG_STATUS_ERROR,
                            'user_id' => null,
                            'created_by' => WP_QT_LOG_CREATED_BY_AUTOMATION,
                            'pipeline_id' => $boardId,
                        ]);
                    }
                }
            }

            return (object)[
                'executedAutomations' => $executedAutomations,
                'failedAutomations' => $failedAutomations,
                'rerunTriggers' => $rerunTriggers,
            ];
        }

        private function executeAutomation($automation, $targetId, $data) {
            
            if( $this->isTaskDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    ServiceLocator::get('TaskService')->archiveTask($targetId, true);

                    return true;
                }
                if( $this->isSlackMessageAction($automation) ) {
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $webhookUrl = $automation->metadata;
                    $userId = $data->doneByUserId;
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, WP_QT_WORDPRESS_USER_TYPE);
                    $message = "Task *{$task->name}* marked as done by *{$user->name}*";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);
                    
                    return true;
                }
            }

            if( $this->isTaskNotDoneTrigger($automation) ) {
                if( $this->isArchiveTaskAction($automation) ) {
                    ServiceLocator::get('TaskService')->archiveTask($targetId, false);

                    return true;
                }
            }

            if( $this->isTaskCreatedTrigger($automation) ) {
                if ( $this->isAssignUserAction($automation) ) {
                    $userId = $automation->automation_action_target_id;
                    $userType = $automation->automation_action_target_type;
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, $userType);

                    ServiceLocator::get('UserService')->assignTaskToUser($userId, $targetId, $userType);

                     return (object)[
                        'success' => true,
                        'data' => $user,
                    ];
                }

                if( $this->isNewEntityEmailAction($automation) ) {
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

                    return true;
                }

                if( $this->isSlackMessageAction($automation) ) {
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$task->name}* created";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if ( $this->isTaskDeletedTrigger($automation) ) {
                $deletedTask = $data->deletedTask;
                $deletedByUserId = $data->deletedByUserId;
                $deletedByUser = ServiceLocator::get('UserRepository')->getUserByIdAndType($deletedByUserId, WP_QT_WORDPRESS_USER_TYPE);

                if ( $this->isDeletedEntityEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($deletedTask->pipeline_id);
                    $templateData = [
                        'taskName' => $deletedTask->name,
                        'boardName' => $pipeline->name,
                        'deleteDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                        'deletedByUserName' => $deletedByUser->name
                    ];
                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_DELETED_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task Deleted', $emailMessage);

                    return true;
                }
                
                if( $this->isSlackMessageAction($automation) ) {
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$deletedTask->name}* deleted by *{$deletedByUser->name}*";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if ( $this->isTaskAssignedTrigger($automation) ) {
                $assignedUser = $data;
                $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);

                if ( $this->isTaskAssignedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'assignedDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                        'userName' => $assignedUser->name,
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_ASSIGNED_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task Assigned', $emailMessage);

                    return true;
                }

                if( $this->isSlackMessageAction($automation) ) {
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$task->name}* assigned to *{$assignedUser->name}*";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if( $this->isTaskUnassignedTrigger($automation) ) {
                $unassignedUser = $data;
                $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);

                if ( $this->isTaskUnassignedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'unassignedDate' => ServiceLocator::get('TimeRepository')->getLocalTime(),
                        'userName' => $unassignedUser->name,
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_UNASSIGNED_TASK_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task Unassigned', $emailMessage);

                    return true;
                }

                if( $this->isSlackMessageAction($automation) ) {
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$task->name}* has been unassigned from *{$unassignedUser->name}*";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if ( $this->isTaskPublicCommentAddedTrigger($automation) ) {
                $comment = $data;
                $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                $authorUserType = $comment->is_admin_comment ? WP_QT_WORDPRESS_USER_TYPE : WP_QT_QUICKTASKER_USER_TYPE;
                $commentAuthor = ServiceLocator::get('UserRepository')->getUserByIdAndType($comment->author_id, $authorUserType);

                if ( $this->isTaskPublicCommentAddedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($comment->created_at),
                        'message' => $comment->text,
                        'authorName' => $commentAuthor->name
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_NEW_PUBLIC_COMMENT_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Public Comment Added', $emailMessage);

                    return true;
                }

                if( $this->isSlackMessageAction($automation) ) {
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$task->name}* has a new public comment by *{$commentAuthor->name}*\n {$comment->text}";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if ( $this->isTaskPrivateCommentAddedTrigger($automation) ) {
                $comment = $data;
                $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                $commentAuthor = ServiceLocator::get('UserRepository')->getUserByIdAndType($comment->author_id, WP_QT_WORDPRESS_USER_TYPE);

                if ( $this->isTaskPrivateCommentAddedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($comment->created_at),
                        'message' => $comment->text,
                        'authorName' => $commentAuthor->name
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_NEW_PRIVATE_COMMENT_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Private Comment Added', $emailMessage);

                    return true;
                }

                if( $this->isSlackMessageAction($automation) ) {
                    $webhookUrl = $automation->metadata;
                    $message = "Task *{$task->name}* has a new private comment by *{$commentAuthor->name}*\n {$comment->text}";
                    ServiceLocator::get('SlackService')->sendMessage($webhookUrl, $message, [], true);

                    return true;
                }
            }

            if( $this->isTaskAttachementAddedTrigger($automation) ) {
                if ( $this->isTaskAttachmentAddedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $upload = $data->upload;
                    $userId = $data->userId;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, WP_QT_WORDPRESS_USER_TYPE);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'creationDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($upload->created_at),
                        'fileName' => $upload->file_name,
                        'uploaderName' => $user->name
                    ];
                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_NEW_ATTACHMENT_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task attachment added', $emailMessage);

                    return true;
                }
            }

            if ( $this->isTaskAttachmentDeletedTrigger($automation) ) {
                if( $this->isTaskAttachmentDeletedEmailAction($automation) ) {
                    $email = $automation->metadata;
                    $upload = $data->deletedUpload;
                    $userId = $data->userId;
                    $task = ServiceLocator::get('TaskRepository')->getTaskById($targetId);
                    $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($task->pipeline_id);
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($userId, WP_QT_WORDPRESS_USER_TYPE);

                    $templateData = [
                        'taskName' => $task->name,
                        'boardName' => $pipeline->name,
                        'deleteDate' => ServiceLocator::get('TimeRepository')->convertUTCToLocal($upload->deleted_at),
                        'fileName' => $upload->file_name,
                        'deleterName' => $user->name
                    ];

                    $emailMessage = ServiceLocator::get('EmailService')->renderTemplate(WP_QUICKTASKER_TASK_ATTACHMENT_DELETED_EMAIL_TEMPLATE, $templateData);
                    ServiceLocator::get('EmailService')->sendEmail($email, 'Task attachment deleted', $emailMessage);

                    return true;

                }
            }

            if( $this->isWoocommerceNewOrderTrigger($automation) ) {
                if ( $this->isTaskCreateAction($automation) ) {
                    $stagToCreateTask = ServiceLocator::get('StageRepository')->getFirstStage( $automation->pipeline_id ); 
                    $woocommerceOrder = $data->woocommerceOrder;

                    if ( $stagToCreateTask === null ) {
                        throw new \Exception('Pipeline stage not found.');
                    }

                    if ( !$woocommerceOrder ) {
                        throw new \Exception('Woocommerce order not found.');
                    }

                    $orderNumber = $woocommerceOrder->get_order_number();
                    $createdTask = ServiceLocator::get('TaskService')->createTask($stagToCreateTask->id, array(
                        'name' => 'Woo #' . $orderNumber,
                        'description' => 'WooCommerce order #' . $orderNumber,
                        'pipelineId' => $automation->pipeline_id,
                    ));

                    if ( !$createdTask ) {
                        throw new \Exception('Failed to get new task.');
                    }

                    return (object)[
                        'success' => true,
                        'rerunTriggers' => [
                            (object)[
                                'boardId' => $automation->pipeline_id,
                                'targetId' => $createdTask->id,
                                'targetType' => WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                                'automationTrigger' => WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED,

                            ]
                        ]
                    ];
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
         * Checks if the automation action is a Slack message action.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation action is a Slack message action and metadata is not null, false otherwise.
         */
        private function isSlackMessageAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_SEND_SLACK_MESSAGE && $automation->metadata !== null;
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

        private function isTaskAttachmentAddedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_ADDED_EMAIL && $automation->metadata !== null;
        }

        private function isTaskAttachmentDeletedEmailAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_TASK_ATTACHMENT_DELETED_EMAIL && $automation->metadata !== null;
        }

        /**
         * Determines if the given automation object represents a "create task" action.
         *
         * @param object $automation The automation object to evaluate.
         *                           It is expected to have a property `automation_action`.
         * @return bool Returns true if the automation action is equal to 
         *              WP_QUICKTASKER_AUTOMATION_ACTION_CREATE_TASK, otherwise false.
         */
        private function isTaskCreateAction($automation) {
            return $automation->automation_action === WP_QUICKTASKER_AUTOMATION_ACTION_CREATE_TASK;
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
         * Checks if the automation trigger is set to "task attachment added".
         *
         * @param object $automation The automation object to check.
         * @return bool Returns true if the automation trigger is "task attachment added", false otherwise.
         */
        private function isTaskAttachementAddedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_ADDED;
        }

        /**
         * Checks if the automation trigger is set to task attachment deleted.
         *
         * @param object $automation The automation object containing the trigger information.
         * @return bool Returns true if the automation trigger is task attachment deleted, false otherwise.
         */
        private function isTaskAttachmentDeletedTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_DELETED;
        }

        /**
         * Checks if the given automation is triggered by a new WooCommerce order.
         *
         * This method evaluates whether the automation's trigger matches the
         * predefined constant for a WooCommerce "order added" event.
         *
         * @param object $automation The automation object to check.
         * @return bool True if the automation trigger is for a new WooCommerce order, false otherwise.
         */
        private function isWoocommerceNewOrderTrigger($automation) {
            return $automation->automation_trigger === WP_QUICKTASKER_AUTOMATION_TRIGGER_WOOCOMMERCE_ORDER_ADDED;
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
         * Generates a log message for a failed automation.
         *
         * @param object $automation The automation object containing details about the failed automation.
         * @return string The formatted log message.
         */
        private function getAutomationFailedLogMessage($automation) {
            return "Automation failed: Board ID: {$automation->pipeline_id}, Target ID: {$automation->target_id}, Target Type: {$automation->target_type}, Trigger: {$automation->automation_trigger}, Action: {$automation->automation_action}, Action target type: {$automation->automation_action_target_type}, Action target id: {$automation->automation_action_target_id}, Metadata: {$automation->metadata}";
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

            $encryptMeta = ServiceLocator::get('AutomationRepository')->isSensitiveMetaAutomation($action);
        
            $data = [
                'pipeline_id' => $pipelineId,
                'target_id' => $targetId,
                'target_type' => $targetType,
                'automation_trigger' => $trigger,
                'automation_action' => $action,
                'automation_action_target_id' => $automationActionTargetId,
                'automation_action_target_type' => $automationActionTargetType,
                'metadata' => $encryptMeta ? ServiceLocator::get('SecretsService')->encrypt($metadata) : $metadata,
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
         * Updates the active state of an automation in the database.
         *
         * @param int $automationId The ID of the automation to update.
         * @param bool|int $active The new active state (e.g., 1 for active, 0 for inactive).
         * 
         * @throws \Exception If the update operation fails.
         * 
         * @return array|null The updated automation data retrieved from the repository, or null if not found.
         */
        public function updateAutomationActiveState($automationId, $active) {
            global $wpdb;

            $result = $wpdb->update(
                TABLE_WP_QUICKTASKER_AUTOMATIONS,
                ['active' => $active],
                ['id' => $automationId]
            );

            if ($result === false) {
                throw new \Exception('Failed to update the automation active state.');
            }

            return ServiceLocator::get('AutomationRepository')->getAutomation($automationId);
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