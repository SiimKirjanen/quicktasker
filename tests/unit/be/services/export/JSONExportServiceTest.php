<?php

use PHPUnit\Framework\TestCase;

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/../../../../../');
}

require_once __DIR__ . '/../../../../../php/services/export/ExportService.php';
require_once __DIR__ . '/../../../../../php/services/export/JSONExportService.php';

class JSONExportServiceTest extends TestCase {

    // ========================================
    // Method Validation Tests
    // ========================================

    public function test_class_extends_ExportService() {
        $reflection = new ReflectionClass(\WPQT\Export\JSONExportService::class);
        $this->assertEquals('WPQT\Export\ExportService', $reflection->getParentClass()->getName());
    }

    public function test_constructor_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Export\JSONExportService::class, '__construct'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\JSONExportService::class, '__construct');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(4, $reflection->getNumberOfParameters());
        
        $params = $reflection->getParameters();
        $this->assertEquals('pipelineId', $params[0]->getName());
        $this->assertEquals('searchFilter', $params[1]->getName());
        $this->assertEquals('includeArchivedTasks', $params[2]->getName());
        $this->assertEquals('includePipelineCustomFields', $params[3]->getName());
    }

    public function test_generateTasksJSONExport_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Export\JSONExportService::class, 'generateTasksJSONExport'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\JSONExportService::class, 'generateTasksJSONExport');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    public function test_downloadJSON_method_exists() {
        $this->assertTrue(method_exists(\WPQT\Export\JSONExportService::class, 'downloadJSON'));
        
        $reflection = new ReflectionMethod(\WPQT\Export\JSONExportService::class, 'downloadJSON');
        $this->assertTrue($reflection->isPublic());
        $this->assertFalse($reflection->isStatic());
        $this->assertEquals(0, $reflection->getNumberOfParameters());
    }

    // ========================================
    // Integration Tests
    // ========================================

    /**
     * Integration test for constructor
     * 
     * Requires WordPress environment with ServiceLocator.
     * 
     * Test scenarios:
     * 1. Should call parent::__construct() with all 4 parameters
     * 2. Should initialize parent class properties through parent constructor
     * 
     * Dependencies:
     * - Parent class ExportService constructor
     */
    public function test_constructor_integration() {
        $this->markTestIncomplete('Requires WordPress environment with ServiceLocator');
    }

    /**
     * Integration test for generateTasksJSONExport
     * 
     * Requires WordPress environment with initialized parent class data.
     * 
     * Test scenarios:
     * 1. Should initialize empty arrays: exportStages, exportLabels, exportTasks
     * 2. For each stage in $this->_stages: create array with stageName, stageDescription (or empty string), stageId
     * 3. For each label in $this->_labels: create array with labelName, labelId, color
     * 4. For each task in $this->_tasks: create array with:
     *    - taskId, taskName, taskDescription (or empty string)
     *    - stageId, archived (cast to bool), dueDate, taskCompletedAt
     *    - assignedLabels: array_map to extract labelName, labelId, color (or empty array)
     *    - taskFocusColor (or null), customFields
     * 5. Should build exportData object with: pipelineName, pipelineDescription (or empty string), stages, tasks, labels, taskComments
     * 6. Should return json_encode($exportData, JSON_PRETTY_PRINT)
     * 
     * JSON structure matches WPQTImport format for import compatibility
     * 
     * Dependencies:
     * - Parent class protected properties: _stages, _labels, _tasks, _pipeline, _taskComments
     * - json_encode() with JSON_PRETTY_PRINT
     */
    public function test_generateTasksJSONExport_integration() {
        $this->markTestIncomplete('Requires WordPress environment with initialized parent class data');
    }

    /**
     * Integration test for downloadJSON
     * 
     * Requires WordPress environment with initialized parent class data.
     * 
     * Test scenarios:
     * 1. Should call generateTasksJSONExport() to get JSON data
     * 2. Should construct filename: $this->_fileName . '.json'
     * 3. Should set header: Content-Type: application/json
     * 4. Should set header: Content-Disposition: attachment; filename="[filename]"
     * 5. Should set header: Content-Length: strlen($jsonData)
     * 6. Should set header: Connection: close
     * 7. Should echo $jsonData
     * 8. Should call exit to terminate script execution
     * 
     * Note: This method triggers file download and terminates execution
     * 
     * Dependencies:
     * - $this->generateTasksJSONExport()
     * - header()
     * - echo
     * - exit
     */
    public function test_downloadJSON_integration() {
        $this->markTestIncomplete('Requires WordPress environment and cannot be fully tested (calls exit)');
    }
}
