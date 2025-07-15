<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

require_once( WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'php/libs/tfpdf/tfpdf.php' );

if ( ! class_exists( 'WPQT\Export\PDFExportService' ) ) {
    class PDFExportService extends ExportService {
        private $_pdf = null;

        public function __construct($pipelineId, $searchFilter, $includeArchivedTasks, $includePipelineCustomFields) {
            parent::__construct($pipelineId, $searchFilter, $includeArchivedTasks, $includePipelineCustomFields);
            $this->setUpPdf();
        }
        
        private function setUpPdf() {
            $this->_pdf = new \TFPDF();
            $this->_pdf->SetTitle( $this->_pipeline->name );
            $this->_pdf->SetAuthor('QuickTasker WordPress');
            $this->_pdf->AddFont('DejaVu','','DejaVuSans.ttf', true);
            $this->_pdf->AddFont('DejaVu', 'B', 'DejaVuSans-Bold.ttf', true);
            $this->_pdf->AliasNbPages();
            $this->_pdf->AddPage();
            $this->_pdf->SetFont('DejaVu','',10);
        }
        
        public function generateTasksPdfExport() {
            
            if ( empty($this->_tasks) ) {
                $this->_pdf->Cell(0, 10, 'No tasks found matching the criteria.', 0, 1);
            } else {
                $timeRepository = ServiceLocator::get('TimeRepository');
                $isFirstTask = true;

                foreach ($this->_tasks as $task) {
                    if (!$isFirstTask) {
                        $this->_pdf->AddPage();
                    }
                    $isFirstTask = false;

                    $taskDescription = !empty($task->description) ? $task->description : esc_html__('None', 'quicktasker');
                    $taskDone = $task->is_done ? $timeRepository->convertUTCToLocal($task->task_completed_at) : esc_html__('No', 'quicktasker');
                    $taskArchived = $task->is_archived ? esc_html__('Yes', 'quicktasker') : esc_html__('No', 'quicktasker');
                    $taskPipeline = !empty($task->pipeline_name) ? $task->pipeline_name : esc_html__('None', 'quicktasker');
                    $taskStage = !empty($task->stage_name) ? $task->stage_name : esc_html__('None', 'quicktasker');
                    $taskCreatedAt = !empty($task->created_at) ? $timeRepository->convertUTCToLocal($task->created_at) : esc_html__('None', 'quicktasker');
                    $dueDate = !empty($task->due_date) ? $timeRepository->convertUTCToLocal($task->due_date) : esc_html__('None', 'quicktasker');
                    $assignedWPUsers = $this->formatAssignedUsers($task->assigned_wp_users);
                    $assignedQuickTaskers = $this->formatAssignedUsers($task->assigned_users);
                    $assignedLabels = $this->formatAssignedLabels($task->assigned_labels);

                    $this->addField(esc_html__('Name', 'quicktasker'), $task->name);
                    $this->addField(esc_html__('Description', 'quicktasker'), $taskDescription, true);
                    $this->addField(esc_html__('Created at', 'quicktasker'), $taskCreatedAt);
                    $this->addField(esc_html__('Board', 'quicktasker'), $taskPipeline);
                    $this->addField(esc_html__('Stage', 'quicktasker'), $taskStage);
                    $this->addField(esc_html__('Completed', 'quicktasker'), $taskDone);
                    $this->addField(esc_html__('Due date', 'quicktasker'), $dueDate);
                    $this->addField(esc_html__('Assigned WordPress users', 'quicktasker'), $assignedWPUsers);
                    $this->addField(esc_html__('Assigned QuickTaskers', 'quicktasker'), $assignedQuickTaskers);
                    $this->addField(esc_html__('Added labels', 'quicktasker'), $assignedLabels);
                    $this->addField(esc_html__('Archived', 'quicktasker'), $taskArchived);

                    if ( !empty($task->custom_fields) && $this->_includePipelineCustomFields ) {
                        $this->_pdf->Ln(5);
                        
                        foreach ($task->custom_fields as $customField) {
                            $fieldName = $customField->name;
                            $fieldValue = esc_html__('Not set', 'quicktasker');

                            if ( !empty($customField->value) ) {
                                $fieldValue = $customField->value;
                            } elseif ( !empty($customField->default_value) ) {
                                $fieldValue = $customField->default_value;
                            }

                            $this->addField($fieldName, $fieldValue, false);
                        }
                    }
                } 
            }
            $this->_pdf->Output('I', "{$this->_fileName}.pdf");
        }

        private function setHeaderFont($size = 10) {
            $this->_pdf->SetFont('DejaVu', 'B', $size);
        }

        private function setBodyFont($size = 10) {
            $this->_pdf->SetFont('DejaVu', '', $size);
        }

        private function addField($label, $value, $useMultiCell = false) {
            $this->setHeaderFont();
            $this->_pdf->Cell(40, 6, $label, 0, 1, 'L');
            
            $this->setBodyFont();
            if ($useMultiCell) {
                $this->_pdf->MultiCell(180, 8, $value, 0, 'L');
            } else {
                $this->_pdf->Cell(180, 8, $value, 0, 1, 'L');
            }
        }

        private function truncateText($text, $maxLength = 50) {
            if (strlen($text) > $maxLength) {
                return substr($text, 0, $maxLength - 3) . '...';
            }
            return $text;
        }

        /**
         * Helper method to get task status
         */
        private function getTaskStatus($task) {
            if ($task->is_archived) {
                return 'Archived';
            } elseif ($task->is_done) {
                return 'Completed';
            } else {
                return 'Active';
            }
        }
    }
}