<?php

namespace WPQT\Customfield;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Task\TaskRepository;

if ( ! class_exists( 'WPQT\Customfield\CustomFieldRepository' ) ) {
    class CustomFieldRepository {

        protected $taskRepository;

        public function __construct() {
            $this->taskRepository = new TaskRepository();
        }

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
            $task = $this->taskRepository->getTaskById($taskId);
            
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