<?php

namespace WPQT\Customfield;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class CustomFieldRepository {

    const PUBLIC_TABLE_COLUMNS = [
        'id',
        'name',
        'description',
        'type',
        'entity_type',
        'entity_id',
        'created_at',
        'updated_at'
    ];

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
        $columns = implode(', ', self::PUBLIC_TABLE_COLUMNS);

        $query = $wpdb->prepare(
            "SELECT {$columns} FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
            WHERE id = %d",
            $id
        );

        return $wpdb->get_row($query);
    }

    /**
     * Retrieves custom fields for a given entity.
     *
     * @param int $entityId The ID of the entity to retrieve custom fields for.
     * @param string $entityType The type of the entity to retrieve custom fields for.
     * @return array|null An array of custom fields or null if none found.
     */
    public function getCustomFields($entityId, $entityType, $isDeleted = false) {
        global $wpdb;
        $columns = implode(', ', self::PUBLIC_TABLE_COLUMNS);
        $isDeletedCondition = $isDeleted ? 1 : 0;

        $query = $wpdb->prepare(
            "SELECT {$columns} FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
            WHERE entity_id = %s AND entity_type = %s AND is_deleted = %d",
            $entityId, $entityType, $isDeletedCondition
        );

        return $wpdb->get_results($query);
    }

    public function getRelatedCustomFields($entityId, $entityType, $pipelineId) {
        if($entityType === 'task') {
            return $this->getTaskRelatedCustomFields($entityId, $pipelineId);
        }else if($entityType === 'user') {
            return $this->getUserRelatedCustomFields($entityId);
        }
        return $this->getCustomFields($entityId, $entityType);
    }

    public function getTaskRelatedCustomFields($taskId, $pipelineId) {
        global $wpdb;
        $columns = implode(', ', self::PUBLIC_TABLE_COLUMNS);

        $query = $wpdb->prepare(
            "SELECT {$columns} FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " 
            WHERE (entity_id = %d AND entity_type = 'task') 
            OR (entity_id = %d AND entity_type = 'pipeline') 
            AND is_deleted = 0", 
            $taskId, $pipelineId
        );
        
        return $wpdb->get_results($query);
    }

    public function getUserRelatedCustomFields($userId) {
        global $wpdb;
        $columns = implode(', ', self::PUBLIC_TABLE_COLUMNS);

        $query = $wpdb->prepare(
            "SELECT {$columns} FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . " 
            WHERE (entity_id = %d AND entity_type = 'user') 
            OR ( entity_type = 'users') 
            AND is_deleted = 0", 
            $userId
        );

        return $wpdb->get_results($query);
    }
}