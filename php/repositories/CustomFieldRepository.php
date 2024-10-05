<?php

namespace WPQT\Customfield;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

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
            "SELECT id, name, description, type, entity_type, entity_id, created_at, updated_at
            FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
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
    public function getCustomFields($entityId, $entityType) {
        global $wpdb;

        $query = $wpdb->prepare(
            "SELECT id, name, description, type, entity_type, entity_id, created_at, updated_at
            FROM " . TABLE_WP_QUICKTASKER_CUSTOM_FIELDS . "
            WHERE entity_id = %d AND entity_type = %s",
            $entityId, $entityType
        );

        return $wpdb->get_results($query);
    }
}