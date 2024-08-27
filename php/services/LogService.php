<?php

namespace WPQT\Log;

class LogService {
    public function log($text, $type) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_LOGS, array(
            'text' => $text,
            'type' => $type
        ));

        if( $result === false ) {
            throw new Exception('Failed to add a log');

        }

        return $wpdb->insert_id;
    }
}