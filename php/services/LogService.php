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
         * @param array $args Arguments for the log entry.
         *                   - 'type': (Required) The type of log entry.
         *                   - 'type_id': The ID of the type associated with the log.
         *                   - 'log_status': The status of the log (default is WP_QT_LOG_STATUS_SUCCESS).
         *                   - 'user_id': The ID of the user associated with the log (default is null).
         *                   - 'created_by': The creator of the log entry (default is WP_QT_LOG_CREATED_BY_SYSTEM).
         *                   - 'pipeline_id': The ID of the pipeline associated with the log (default is null).
         * @return mixed The log entry retrieved by its ID.
         * @throws \Exception If the log type is not provided or if the log insertion fails.
         */
        public function log($text, $args) {
            global $wpdb;

            $defaults = array(
                'type_id' => null,
                'log_status' => WP_QT_LOG_STATUS_SUCCESS,
                'user_id' => null,
                'created_by' => WP_QT_LOG_CREATED_BY_SYSTEM,
                'pipeline_id' => null,
            );
            $args = wp_parse_args($args, $defaults);

            if ( empty($args['type']) ) {
                throw new \Exception('Log type is required in args array');
            }

            if ( isset($args['type_id']) && $args['type_id'] === 'null' ) {
                $args['type_id'] = null;
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKS_LOGS, array(
                'text' => $text,
                'type' => $args['type'],
                'type_id' => $args['type_id'],
                'user_id' => $args['user_id'],
                'created_by' => $args['created_by'],
                'created_at' => $this->timeRepository->getCurrentUTCTime(),
                'log_status' => $args['log_status'],
                'pipeline_id' => $args['pipeline_id'],
            ));

            if( $result === false ) {
                throw new \Exception('Failed to add a log');
            }

            return $this->logRepository->getLogById( $wpdb->insert_id );
        }
    }
}