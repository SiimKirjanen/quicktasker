<?php

namespace WPQT\Log;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Log\LogRepository;

class LogService {
    protected $logRepository;

    public function __construct() {
        $this->logRepository = new LogRepository();
    }
    
    /**
     * Logs a message to the database.
     *
     * @param string $text The log message text.
     * @param string $type The type of log message.
     * @param int $typeId The ID associated with the log type.
     * @return mixed The log entry retrieved by its ID.
     * @throws \Exception If the log entry could not be added to the database.
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

        $logId = $wpdb->insert_id;

        return $this->logRepository->getLogById($logId);
    }
}