<?php

namespace WPQT\Import;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Exception;
use WPQT\ServiceLocator;
use WPQT\Pipeline\PipelineService;
use WPQT\Stage\StageService;
use WPQT\Comment\CommentService;

if ( ! class_exists( 'WPQT\Import\PipelineImportService' ) ) {
    class PipelineImportService {
        /**
             * Validate the WPQTImport structure.
             *
             * @param array $importData The decoded import data.
             * @return void
             * @throws Exception If validation fails.
         */
        public function validateWPQTImport($importData) {
            if (
                ! isset($importData['pipelineName']) ||
                ! isset($importData['pipelineDescription']) ||
                ! isset($importData['stages']) ||
                ! isset($importData['tasks']) ||
                ! isset($importData['labels']) ||
                ! isset($importData['taskComments'])
            ) {
                throw new Exception('Invalid WPQTImport structure.');
            }

            // Validate stages
            foreach ($importData['stages'] as $stage) {
                if (
                    ! isset($stage['stageName']) ||
                    ! isset($stage['stageDescription']) ||
                    ! isset($stage['stageId'])
                ) {
                    throw new Exception('Invalid stage structure.');
                }
            }

            // Validate tasks
            foreach ($importData['tasks'] as $task) {
                if (
                    ! isset($task['taskId']) ||
                    ! isset($task['taskName']) ||
                    ! isset($task['taskDescription']) ||
                    ! isset($task['stageId']) ||
                    ! isset($task['assignedLabels']) ||
                    ! isset($task['archived']) ||
                    ! array_key_exists('dueDate', $task) ||
                    ! array_key_exists('taskCompletedAt', $task)
                ) {
                    throw new Exception('Invalid task structure.');
                }

                // Validate assigned labels in tasks
                foreach ($task['assignedLabels'] as $label) {
                    if (
                        ! isset($label['labelName']) ||
                        ! isset($label['labelId']) ||
                        ! isset($label['color'])
                    ) {
                        throw new Exception('Invalid label structure in task.');
                    }
                }

                // Validate custom fields
                foreach ($task['customFields'] as $field) {
                    if (
                        ! isset($field['name']) ||
                        ! isset($field['type']) ||
                        ! isset($field['entity_type']) ||
                        ! isset($field['entity_id']) ||
                        ! isset($field['task_id'])
                    ) {
                        throw new Exception('Invalid task custom field structure.');
                    }
                }
            }

            // Validate labels
            foreach ($importData['labels'] as $label) {
                if (
                    ! isset($label['labelName']) ||
                    ! isset($label['labelId']) ||
                    ! isset($label['color'])
                ) {
                    throw new Exception('Invalid label structure.');
                }
            }

            // Validate task public comments
            foreach ($importData['taskComments'] as $comment) {
                if (
                    ! isset($comment['commentId']) ||
                    ! isset($comment['taskId']) ||
                    ! isset($comment['createdAt']) ||
                    ! isset($comment['commentText']) ||
                    ! isset($comment['isPrivate'])
                ) {
                    throw new Exception('Invalid comment structure.');
                }
            }
        }

        public function importPipeline($source, $importData) {
            $pipelineService = new PipelineService();
            $stageService = new StageService();
            $commentService = new CommentService();
            $labelService = ServiceLocator::get('LabelService');
            $taskService = ServiceLocator::get('TaskService');
            $logService = ServiceLocator::get('LogService');
            $customFieldService = ServiceLocator::get('CustomFieldService');
        
            $currentUserId = get_current_user_id();

            //Step 1. Create a new pipeline
            $newPipeline = $pipelineService->createPipeline(
                $importData['pipelineName'],
                [
                    'description' => $importData['pipelineDescription'],
                ]
            );
            $logService->log("Board {$newPipeline->name} created by {$source}", [
                    'type' => WP_QT_LOG_TYPE_PIPELINE,
                    'type_id' => $newPipeline->id,
                    'created_by' => WP_QT_LOG_CREATED_BY_IMPORT,
                    'pipeline_id' => $newPipeline->id,
                    'user_id' => $currentUserId,
                ]
            );

            // Step 2. Create stages
            $stageIdMap = []; 
            foreach ($importData['stages'] as $stage) {
                $newStage = $stageService->createStage(
                    $newPipeline->id,
                    [
                        'name' => $stage['stageName'],
                        'description' => $stage['stageDescription'],
                    ]
                );

                // Map original stageId to newly created stage ID
                $stageIdMap[$stage['stageId']] = $newStage->id;

                $logService->log("Stage {$newStage->name} created by {$source}", [
                    'type' => WP_QT_LOG_TYPE_PIPELINE,
                    'type_id' => $newPipeline->id,
                    'created_by' => WP_QT_LOG_CREATED_BY_IMPORT,
                    'pipeline_id' => $newPipeline->id,
                    'user_id' => $currentUserId,
                ]);
            }

            // Step 3. Add labels to the pipeline
            $labelIdMap = [];
            foreach ($importData['labels'] as $label) {
                $newLabel = $labelService->createLabel(
                    $newPipeline->id,
                    $label['labelName'],
                    $label['color']
                );

                // Map original labelId to newly created label ID
                $labelIdMap[$label['labelId']] = $newLabel->id;

                $logService->log("Label {$newLabel->name} created by {$source}", [
                    'type' => WP_QT_LOG_TYPE_PIPELINE,
                    'type_id' => $newPipeline->id,
                    'created_by' => WP_QT_LOG_CREATED_BY_IMPORT,
                    'pipeline_id' => $newPipeline->id,
                    'user_id' => $currentUserId,
                ]);
            }

            // Step 4. Create pipeline level custom fields
            $pipelineLevelCustomFields = [];
            foreach ($importData['tasks'] as $task) {
                if ( isset($task['customFields']) && is_array($task['customFields']) ) {
                    foreach ( $task['customFields'] as $field ) {
                        if ( $field['entity_type'] === WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE && !isset($pipelineLevelCustomFields[$field['id']])) {
                            $pipelineLevelCustomFields[$field['id']] = $field;

                            $newCustomField = $customFieldService->createCustomField(
                                $field['name'],
                                $field['description'],
                                $field['type'],
                                WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE,
                                $newPipeline->id,
                            );

                            if ( $field['value'] ) {
                                $customFieldService->updateCustomFieldValue(
                                    $newCustomField->id,
                                    $newPipeline->id,
                                    WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE,
                                    $field['value']
                                );
                            }
                        } 
                    }
                }
            }

            // Step 5. Create tasks and assign them to stages and labels
            foreach ($importData['tasks'] as $task) {
                // Get the new stage ID using the mapped stageId
                $newStageId = isset($stageIdMap[$task['stageId']]) ? $stageIdMap[$task['stageId']] : null;

                // Create the task
                $newTask = $taskService->createTask(
                    $newStageId,
                    [
                        'name' => $task['taskName'],
                        'description' => $task['taskDescription'],
                        'pipelineId' => $newPipeline->id,
                        'is_archived' => $task['archived'],
                        'due_date' => isset($task['dueDate']) ? $task['dueDate'] : null,
                        'task_completed_at' => isset($task['taskCompletedAt']) ? $task['taskCompletedAt'] : null,
                        'is_done' => isset($task['taskCompletedAt']) ? true : false,
                        'task_focus_color' => isset($task['taskFocusColor']) ? $task['taskFocusColor'] : null,
                    ]
                );

                $logService->log("Task {$newTask->name} created by {$source}", [
                    'type' => WP_QT_LOG_TYPE_TASK,
                    'type_id' => $newTask->id,
                    'created_by' => WP_QT_LOG_CREATED_BY_IMPORT,
                    'pipeline_id' => $newPipeline->id,
                    'user_id' => $currentUserId,
                ]);

                // Assign labels to the task
                foreach ($task['assignedLabels'] as $label) {
                    $newLabelId = isset($labelIdMap[$label['labelId']]) ? $labelIdMap[$label['labelId']] : null;

                    if ($newLabelId) {
                        $labelService->assignLabel($newTask->id, 'task', $newLabelId);
                    }
                }

                // Add comments to the task
                $taskComments = isset($importData['taskComments']) ? array_filter($importData['taskComments'], function($comment) use ($task) {
                    return $comment['taskId'] === $task['taskId'];
                }) : [];

                foreach ($taskComments as $comment) {
                    
                    $commentService->createComment(
                        $newTask->id,
                        WP_QUICKTASKER_COMMENT_TYPE_TASK,
                        array(
                            'isPrivate' => (bool) $comment['isPrivate'],
                            'text' => $comment['commentText'],
                            'authorId' => $comment['authorId'],
                            'authorType' => $comment['authorType'],
                            'createdAt' => $comment['createdAt'],
                        )
                    );

                    $logService->log("Comment was added to a task {$newTask->name} by {$source}", [
                        'type' => WP_QT_LOG_TYPE_TASK,
                        'type_id' => $newTask->id,
                        'created_by' => WP_QT_LOG_CREATED_BY_IMPORT,
                        'pipeline_id' => $newPipeline->id,
                        'user_id' => $comment['authorId'],
                    ]);
                }

                // Add task level custom fields
                if ( isset($task['customFields']) && is_array($task['customFields']) ) {
                    foreach ( $task['customFields'] as $field ) {
                        if ( $field['entity_type'] === WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK ) {
                            $createdCustomField = $customFieldService->createCustomField(
                                $field['name'],
                                $field['description'],
                                $field['type'],
                                WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK,
                                $newTask->id
                            );

                            if ( $field['value'] ) {
                                $customFieldService->updateCustomFieldValue(
                                    $createdCustomField->id,
                                    $newTask->id,
                                    WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_TASK,
                                    $field['value'] 
                                );
                            }
                        }
                    }
                }
            }

            return $newPipeline->id;
        }
    }
}