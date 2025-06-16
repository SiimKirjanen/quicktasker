<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Export\JSONExportService' ) ) {
    class JSONExportService extends ExportService {

        public function __construct($pipelineId, $searchFilter, $includeArchivedTasks) {
            parent::__construct($pipelineId, $searchFilter, $includeArchivedTasks);
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
                    'taskName' => $task->name,
                    'taskDescription' => $task->description ?: '',
                    'stageId' => $task->stage_id,
                    'archived' => (bool)$task->is_archived,
                    'dueDate' => $task->due_date,
                    'taskCompletedAt' => $task->task_completed_at,
                    'assignedLabels' => $task->assigned_labels,
                ];
            }

            $exportData = [
                'pipelineName' => $this->_pipeline->name,
                'pipelineDescription' => $this->_pipeline->description ?: '',
                'stages' => $exportStages,
                'tasks' => $exportTasks,
                'labels' => $exportLabels,
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