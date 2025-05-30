<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Export\ExportService' ) ) {
    class ExportService {      
        protected $_pipelineId;
        protected $_searchFilter;
        protected $_includeArchivedTasks;
        protected $_fileName;
        protected $_tasks = [];

        public function __construct($pipelineId, $searchFilter, $includeArchivedTasks) {
            $this->_pipelineId = $pipelineId;
            $this->_searchFilter = $searchFilter;
            $this->_includeArchivedTasks = $includeArchivedTasks;
            $this->_fileName = $this->getFileName();
            $this->setTasks();
        }

        private function getFileName() {
            return 'test 123';
        }

        private function setTasks() {
            $taskRepository = ServiceLocator::get('TaskRepository');
            $tasks = $taskRepository->getTasksForExport($this->_pipelineId, $this->_searchFilter, $this->_includeArchivedTasks);
            $this->_tasks = $tasks;
        }
    }
}