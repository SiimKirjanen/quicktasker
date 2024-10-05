<?php

namespace WPQT\Customfield;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\WPQTException;
use WPQT\Customfield\CustomFieldRepository;

class CustomFieldService {
    protected $customFieldRepository;

    public function __construct() {
        $this->customFieldRepository = new CustomFieldRepository();
    }

/**
 * Creates a custom field in the database.
 *
 * @param string $name The name of the custom field.
 * @param string $description The description of the custom field.
 * @param string $type The type of the custom field.
 * @param string $entityType The type of the entity the custom field is associated with.
 * @param int $entityId The ID of the entity the custom field is associated with.
 * @return int The ID of the newly created custom field.
 * @throws WPQTException If the custom field could not be added to the database.
 */
   public function createCustomField($name, $description, $type, $entityType, $entityId) {
        global $wpdb;

        $result = $wpdb->insert(
            TABLE_WP_QUICKTASKER_CUSTOM_FIELDS,
            array(
                'name' => $name,
                'description' => $description,
                'type' => $type,
                'entity_type' => $entityType,
                'entity_id' => $entityId
            )
        );

        if( $result === false ) {
            throw new WPQTException('Failed to add a custom field');
        }

        $customFieldId = $wpdb->insert_id;

        return $this->customFieldRepository->getCustomFieldById($customFieldId);
    }
}