<?php
namespace WPQT\Export;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Export\ExportService' ) ) {
    class ExportService {      
        protected $_pipelineId;
        protected $_fileName;

        public function __construct($pipelineId) {
            $this->_pipelineId = $pipelineId;
            $this->_fileName = $this->getFileName();

            ServiceLocator::get('UploadService')->setUpExportsFolders();
        }

        protected function getFileName() {
            return 'test 123';
        }
    }
}