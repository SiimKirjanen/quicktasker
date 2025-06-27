<?php

namespace WPQT\Customfield;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Customfield\CustomFieldRepository' ) ) {
    class CustomFieldRepository {
        /**
         * Retrieves a custom field by its ID.
         *
         * This function queries the database to fetch a custom field record
         * based on the provided ID. It returns an object containing the custom
         * field details such as id, name, description, type, entity_type, entity_id,
         * created_at, and updated_at.
         *
         * @param int $id The ID of the custom field to retrieve.
         * @return object|null The custom field object if found, null otherwise.
         */
        public function getCustomFieldById($id) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, name, description, type, entity_type, entity_id, created_at, updated_at, deleted_at, is_deleted FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
                WHERE id = %d",
                $id
            );

            return $wpdb->get_row($query);
        }

        /**
         * Retrieves custom fields for a given entity.
         *
         * @param int|null $entityId The ID of the entity to retrieve custom fields for.
         * @param string $entityType The type of the entity to retrieve custom fields for.
         * @param bool $isDeleted Whether to get deleted custom fields or active fields.
         * @return array|null An array of custom fields or null if none found.
         */
        public function getCustomFields($entityId, $entityType, $isDeleted = false) {
            global $wpdb;

            $isDeletedCondition = $isDeleted ? 1 : 0;
            $query = '';

            if($entityId === null) {
                $query = $wpdb->prepare(
                    "SELECT id, name, description, type, entity_type, entity_id, created_at, updated_at, deleted_at, is_deleted FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
                    WHERE entity_id IS NULL AND entity_type = %s AND is_deleted = %d",
                    $entityType, $isDeletedCondition
                );
            } else {
                $query = $wpdb->prepare(
                    "SELECT id, name, description, type, entity_type, entity_id, created_at, updated_at, deleted_at, is_deleted FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
                    WHERE entity_id = %s AND entity_type = %s AND is_deleted = %d",
                    $entityId, $entityType, $isDeletedCondition
                );
            }

            return $wpdb->get_results($query);
        }

        public function getRelatedCustomFields($entityId, $entityType, $activeFields = true) {
            if($entityType === 'task') {
                return $this->getTaskRelatedCustomFields($entityId, $activeFields);
            }else if($entityType === 'user') {
                return $this->getUserRelatedCustomFields($entityId, $activeFields);
            }
            return $this->getCustomFields($entityId, $entityType, !$activeFields);
        }

        /**
         * Retrieves custom fields related to a specific task and its pipeline.
         *
         * This function fetches custom fields and their values associated with a given task ID and pipeline ID.
         * It joins the custom fields table with the custom field values table to get the relevant data.
         *
         * @param int $taskId The ID of the task for which to retrieve custom fields.
         * @param bool $activeFields Whether to get active or deleted custom fields.
         * @return array|null An array of custom fields and their values, or null if no results are found.
         */
        public function getTaskRelatedCustomFields($taskId, $activeFields = true) {
            global $wpdb;

            $isDeletedCondition = $activeFields ? 0 : 1;
            $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);
            
            $query = $wpdb->prepare(
                "SELECT custom_fields.*, custom_field_values.value 
                FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " custom_fields
                LEFT JOIN " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES . " custom_field_values
                ON custom_fields.id = custom_field_values.custom_field_id 
                AND custom_field_values.entity_id = %d 
                AND custom_field_values.entity_type = 'task'
                WHERE (custom_fields.entity_id = %d AND custom_fields.entity_type = 'task' AND custom_fields.is_deleted = %d) 
                OR (custom_fields.entity_id = %d AND custom_fields.entity_type = 'pipeline' AND custom_fields.is_deleted = %d)",
                $taskId, $taskId, $isDeletedCondition, $task->pipeline_id, $isDeletedCondition
            );
        
            return $wpdb->get_results($query);
        }

        public function getActiveCustomFieldsForTasks($taskIds) {
            global $wpdb;
    
            if (empty($taskIds)) {
                return [];
            }
            $taskIdsplaceholders = implode(',', array_fill(0, count($taskIds), '%d'));

            // Get task-level custom fields with their values (direct task fields)
            $taskSpecificCFquery = $wpdb->prepare(
                "SELECT cf.*, cfv.value, cfv.entity_id as task_id
                FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " cf
                LEFT JOIN " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES . " cfv
                ON cf.id = cfv.custom_field_id 
                WHERE cfv.entity_id IN ($taskIdsplaceholders) 
                AND cfv.entity_type = 'task'
                AND cf.entity_type = 'task'
                AND cf.is_deleted = 0",
                $taskIds
            );

            $taskSpecificCustomFields = $wpdb->get_results($taskSpecificCFquery);

            // Get all tasks with their pipeline IDs
            $tasks = $this->getPipelineIdsFromTasks($taskIds);
            $taskPipelines = [];
            $pipelineIds = [];

            // Map each task to its pipeline
            foreach ($tasks as $task) {
                $taskPipelines[$task->id] = $task->pipeline_id;
                $pipelineIds[$task->pipeline_id] = $task->pipeline_id; // Collect unique pipeline IDs
            }
    
            // If we have pipelines, get their custom fields
            $pipelineCustomFields = [];
            if ( !empty($pipelineIds) ) {
                $pipelinePlaceholders = implode(',', array_fill(0, count($pipelineIds), '%d'));
                
                $pipelineFieldsQuery = $wpdb->prepare(
                    "SELECT cf.*, cf.id as custom_field_id, cf.entity_id as pipeline_id
                    FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " cf
                    WHERE cf.entity_type = 'pipeline'
                    AND cf.entity_id IN ($pipelinePlaceholders)
                    AND cf.is_deleted = 0",
                    array_values($pipelineIds)
                );
                
                $pipelineFields = $wpdb->get_results($pipelineFieldsQuery);
                
                // Get all custom field values for pipeline fields
                $pipelineCustomFieldIds = [];
                foreach ($pipelineFields as $field) {
                    $pipelineCustomFieldIds[] = $field->id;
                    // Store fields by pipeline ID for easy lookup later
                    if (!isset($pipelineCustomFields[$field->pipeline_id])) {
                        $pipelineCustomFields[$field->pipeline_id] = [];
                    }
                    $pipelineCustomFields[$field->pipeline_id][] = $field;
                }
                
                // If we have pipeline custom fields, get their values for our tasks
                if ( !empty($pipelineCustomFieldIds) ) {
                    $fieldPlaceholders = implode(',', array_fill(0, count($pipelineCustomFieldIds), '%d'));
                    $valueQuery = $wpdb->prepare(
                        "SELECT cfv.* 
                        FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES . " cfv
                        WHERE cfv.custom_field_id IN ($fieldPlaceholders)
                        AND cfv.entity_id IN ($taskIdsplaceholders)
                        AND cfv.entity_type = 'task'",
                        array_merge($pipelineCustomFieldIds, $taskIds)
                    );
                    
                    $pipelineFieldValues = $wpdb->get_results($valueQuery);
                    
                    // Index values by custom field ID and task ID for fast lookup
                    $valuesByFieldAndTask = [];
                    foreach ($pipelineFieldValues as $value) {
                        $key = $value->custom_field_id . '_' . $value->entity_id;
                        $valuesByFieldAndTask[$key] = $value->value;
                    }
                }
            }
             // Now build the final result, organized by task
            $customFieldsByTask = [];
            
            // First, add task-level custom fields
            foreach ($taskSpecificCustomFields as $field) {
                if (!isset($customFieldsByTask[$field->task_id])) {
                    $customFieldsByTask[$field->task_id] = [];
                }
                $customFieldsByTask[$field->task_id][] = $field;
            }
            
            // Then, for each task, add applicable pipeline-level custom fields
            foreach ($taskIds as $taskId) {
                if (!isset($customFieldsByTask[$taskId])) {
                    $customFieldsByTask[$taskId] = [];
                }
                
                // Get the pipeline ID for this task
                $pipelineId = isset($taskPipelines[$taskId]) ? $taskPipelines[$taskId] : null;
                
                if ($pipelineId && isset($pipelineCustomFields[$pipelineId])) {
                    foreach ($pipelineCustomFields[$pipelineId] as $pipelineField) {
                        // Create a copy of the pipeline field for this task
                        $fieldCopy = clone $pipelineField;
                        $fieldCopy->task_id = $taskId;
                        
                        // Check if this field has a value for this specific task
                        $valueKey = $pipelineField->id . '_' . $taskId;
                        if (isset($valuesByFieldAndTask[$valueKey])) {
                            $fieldCopy->value = $valuesByFieldAndTask[$valueKey];
                        } else {
                            $fieldCopy->value = null; // No value set for this task
                        }
                        
                        $customFieldsByTask[$taskId][] = $fieldCopy;
                    }
                }
            }
            
            return $customFieldsByTask;
        }

        /**
         * Retrieves pipeline IDs associated with a list of task IDs.
         *
         * This function queries the database to find distinct pipeline IDs
         * that are linked to the provided task IDs.
         *
         * @param array $taskIds An array of task IDs for which to retrieve pipeline IDs.
         * @return array An array of distinct pipeline IDs associated with the given task IDs.
         */
        private function getPipelineIdsFromTasks($taskIds) {
            global $wpdb;
            
            if (empty($taskIds)) {
                return [];
            }
            
            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));
            
            $query = $wpdb->prepare(
                "SELECT id, pipeline_id FROM " . TABLE_WP_QUICKTASKER_TASKS . "
                WHERE id IN ($placeholders)",
                $taskIds
            );
            
            return $wpdb->get_results($query);
        }

        /**
         * Retrieves custom fields related to a specific user.
         *
         * @param int  $userId       The ID of the user whose custom fields are to be retrieved.
         * @param bool $activeFields Optional. Whether to retrieve active custom fields. Default true.
         *                           If true, retrieves fields that are not deleted. If false, retrieves deleted fields.
         * @return array An array of objects containing custom fields and their values.
         */
        public function getUserRelatedCustomFields($userId, $activeFields = true) {
            global $wpdb;

            $isDeletedCondition = $activeFields ? 0 : 1;

            $query = $wpdb->prepare(
                "SELECT custom_fields.*, custom_field_values.value 
                FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " custom_fields
                LEFT JOIN " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS_VALUES . " custom_field_values
                ON custom_fields.id = custom_field_values.custom_field_id 
                AND custom_field_values.entity_id = %d 
                AND custom_field_values.entity_type = 'user'
                WHERE (custom_fields.entity_id = %d AND custom_fields.entity_type = 'user' AND custom_fields.is_deleted = %d) 
                OR (custom_fields.entity_id IS NULL AND custom_fields.entity_type = 'users' AND custom_fields.is_deleted = %d)",
                $userId, $userId, $isDeletedCondition, $isDeletedCondition
            );
        
            return $wpdb->get_results($query);
        }
    }
}