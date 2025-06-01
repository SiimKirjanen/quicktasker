<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Export\ExportService' ) ) {
    class ExportService {      
        protected $_pipelineId;
        protected $_pipeline;
        protected $_searchFilter;
        protected $_includeArchivedTasks;
        protected $_fileName;
        protected $_tasks = [];

        public function __construct($pipelineId, $searchFilter, $includeArchivedTasks) {
            $this->_pipelineId = $pipelineId;
            $this->_searchFilter = $searchFilter;
            $this->_includeArchivedTasks = $includeArchivedTasks;
            $this->init();
        }

        private function init() {
            $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($this->_pipelineId);
            $tasks = ServiceLocator::get('TaskRepository')->getTasksForExport($this->_pipelineId, $this->_searchFilter, $this->_includeArchivedTasks);

            $this->_tasks = $tasks;
            $this->_pipeline = $pipeline;
            $this->_fileName = strtolower($this->_pipeline->name) . '-tasks-export';
        }

        protected function formatAssignedUsers($users) {
            if (empty($users)) {
                return esc_html__('None', 'quicktasker');
            }
            
            $userNames = array_map(function($user) {
                return "{$user->name}";
            }, $users);
            
            return implode(', ', $userNames);
        }

        protected function formatAssignedLabels($labels) {
            if (empty($labels)) {
                return esc_html__('None', 'quicktasker');
            }
            
            $labelNames = array_map(function($label) {
                return $label->name;
            }, $labels);
            
            return implode(', ', $labelNames);
        }
    }
}