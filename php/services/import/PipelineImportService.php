<?php

namespace WPQT\Import;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use Exception;
use WPQT\ServiceLocator;
use WPQT\Pipeline\PipelineService;
use WPQT\Stage\StageService;

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
                ! isset($importData['labels'])
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
                    ! isset($task['taskName']) ||
                    ! isset($task['taskDescription']) ||
                    ! isset($task['stageId']) ||
                    ! isset($task['assignedLabels']) ||
                    ! isset($task['archived'])
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
        }

        public function importPipeline($source, $importData) {
            $pipelineService = new PipelineService();
            $stageService = new StageService();
            $labelService = ServiceLocator::get('LabelService');
            $taskService = ServiceLocator::get('TaskService');

            //Step 1. Create a new pipeline
            $newPipeline = $pipelineService->createPipeline(
                $importData['pipelineName'],
                $importData['pipelineDescription']
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
            }
            
            // Step 4. Create tasks and assign them to stages and labels
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
                    ]
                );

                // Assign labels to the task
                foreach ($task['assignedLabels'] as $label) {
                    $newLabelId = isset($labelIdMap[$label['labelId']]) ? $labelIdMap[$label['labelId']] : null;

                    if ($newLabelId) {
                        $labelService->assignLabel($newTask->id, 'task', $newLabelId);
                    }
                }
            }

            return $newPipeline->id;
        }
    }
}