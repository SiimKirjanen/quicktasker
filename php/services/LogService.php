<?php

namespace WPQT\Log;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class LogService {
    
    /**
     * Logs a message with the specified type and type ID.
     *
     * @param string $text The text to be logged.
     * @param string $type The type of the log.
     * @param int $typeId The ID of the log type.
     * @return int The ID of the inserted log.
     * @throws \Exception If failed to add a log.
     */
    public function log($text, $type, $typeId) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_LOGS, array(
            'text' => $text,
            'type' => $type,
            'type_id' => $typeId
        ));

        if( $result === false ) {
            throw new \Exception('Failed to add a log');
        }

        return $wpdb->insert_id;
    }

}