<?php

namespace WPQT\Log;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class LogService {
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