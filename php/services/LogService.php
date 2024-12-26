<?php

namespace WPQT\Log;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Log\LogRepository;
use WPQT\Time\TimeRepository;

if ( ! class_exists( 'WPQT\Log\LogService' ) ) {
    class LogService {
        protected $logRepository;
        protected $timeRepository;

        public function __construct() {
            $this->logRepository = new LogRepository();
            $this->timeRepository = new TimeRepository();
        }
        
        /**
         * Logs a message to the database.
         *
         * @param string $text The log message text.
         * @param string $type The type of log message.
         * @param int|string $typeId The ID associated with the log type. String 'null' if we are dealing with users.
         * @param string $createdBy The user type who created the log.
         * @param int|null $userId The ID of the user who is associated with the log.
         * @param string $logStatus The status of the log message.
         * @return mixed The log entry retrieved by its ID.
         * @throws \Exception If the log entry could not be added to the database.
         */
        public function log($text, $type, $typeId, $createdBy, $userId = null, $logStatus = WP_QT_LOG_STATUS_SUCCESS) {
            global $wpdb;

            if($typeId === 'null') {
                $typeId = null; 
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKS_LOGS, array(
                'text' => $text,
                'type' => $type,
                'type_id' => $typeId,
                'user_id' => $userId,
                'created_by' => $createdBy,
                'created_at' => $this->timeRepository->getCurrentUTCTime(),
                'log_status' => $logStatus
            ));

            if( $result === false ) {
                throw new \Exception('Failed to add a log');
            }

            return $this->logRepository->getLogById( $wpdb->insert_id );
        }
    }
}