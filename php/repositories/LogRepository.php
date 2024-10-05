<?php

namespace WPQT\Log;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class LogRepository {
    /**
     * Retrieves a log entry by its ID.
     *
     * This function queries the database to fetch a log entry from the wp_quick_tasks_logs table
     * based on the provided log ID.
     *
     * @param int $logId The ID of the log entry to retrieve.
     * @return object|null The log entry object if found, null otherwise.
     */
    public function getLogById($logId) {
        global $wpdb;

        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICKTASKS_LOGS . " WHERE id = %d",
                $logId
            )
        );
    }
    /**
     * Retrieves logs from the database based on the provided type and type ID.
     *
     * @param int $typeId The ID of the type to filter logs by.
     * @param string $type The type to filter logs by.
     * @return array|null An array of log objects or null if no logs are found.
     */
    public function getLogs($typeId, $type) {
        global $wpdb;

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICKTASKS_LOGS . " WHERE type = %s AND type_id = %d",
                $type, $typeId
            )
        );
    }
}