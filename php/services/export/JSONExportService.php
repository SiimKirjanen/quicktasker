<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Export\JSONExportService' ) ) {
    class JSONExportService extends ExportService {

        public function __construct($pipelineId, $searchFilter, $includeArchivedTasks, $includePipelineCustomFields) {
            parent::__construct($pipelineId, $searchFilter, $includeArchivedTasks, $includePipelineCustomFields);
        }

        public function generateTasksJSONExport() {
            $exportStages = [];
            $exportLabels = [];
            $exportTasks = [];

            foreach ( $this->_stages as $stage ) {
                $exportStages[] = [
                    'stageName' => $stage->name,
                    'stageDescription' => $stage->description ?: '',
                    'stageId' => $stage->id,
                ];
            }

            foreach ( $this->_labels as $label ) {
                $exportLabels[] = [
                    'labelName' => $label->name,
                    'labelId' => $label->id,
                    'color' => $label->color
                ];
            }

            foreach ( $this->_tasks as $task ) {                
                $exportTasks[] = [
                    'taskId' => $task->id,
                    'taskName' => $task->name,
                    'taskDescription' => $task->description ?: '',
                    'stageId' => $task->stage_id,
                    'archived' => (bool)$task->is_archived,
                    'dueDate' => $task->due_date,
                    'taskCompletedAt' => $task->task_completed_at,
                    'assignedLabels' => $task->assigned_labels ? array_map(function($label) {
                        return [
                            'labelName' => $label->name,
                            'labelId' => $label->id,
                            'color' => $label->color
                        ];
                    }, $task->assigned_labels) : [],
                    'taskFocusColor' => $task->task_focus_color ?: null,
                    'customFields' => $task->custom_fields 
                ];
            }

            $exportData = [
                'pipelineName' => $this->_pipeline->name,
                'pipelineDescription' => $this->_pipeline->description ?: '',
                'stages' => $exportStages,
                'tasks' => $exportTasks,
                'labels' => $exportLabels,
                'taskComments' => $this->_taskComments,
            ];

            return json_encode($exportData, JSON_PRETTY_PRINT);
        }

        public function downloadJSON() {
            $jsonData = $this->generateTasksJSONExport();
            $filename = $this->_fileName . '.json';
            
            // Set headers for download
            header('Content-Type: application/json');
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            header('Content-Length: ' . strlen($jsonData));
            header('Connection: close');
            
            // Output the JSON data
            echo $jsonData;
            exit;
        }
    }
}