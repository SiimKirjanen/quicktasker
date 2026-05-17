<?php

namespace WPQT\Log;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Log\LogService')) {
    class LogService
    {
        private $logEnabledFlagsCache = [];

        public const SOURCE_AUTOMATION = 'automation';
        public const SOURCE_WEBHOOK = 'webhook';
        public const SOURCE_API_TOKEN = 'api_token';

        /**
         * Returns true if the given pipeline has logging enabled for the given source.
         * Sources without a per-board toggle default to true. Missing settings rows
         * (e.g. legacy boards before the column existed) also default to true to
         * preserve the prior always-on behavior.
         */
        public function shouldLog($pipelineId, $source)
        {
            $column = null;
            if (self::SOURCE_AUTOMATION === $source) {
                $column = 'enable_automation_logs';
            } elseif (self::SOURCE_WEBHOOK === $source) {
                $column = 'enable_webhook_logs';
            } elseif (self::SOURCE_API_TOKEN === $source) {
                $column = 'enable_api_token_logs';
            }

            if (null === $column || empty($pipelineId)) {
                return true;
            }

            if (!array_key_exists($pipelineId, $this->logEnabledFlagsCache)) {
                $this->logEnabledFlagsCache[$pipelineId] = ServiceLocator::get('SettingRepository')->getLogEnabledFlags($pipelineId);
            }

            $flags = $this->logEnabledFlagsCache[$pipelineId];

            if (null === $flags || !isset($flags->$column)) {
                return true;
            }

            return 1 === (int) $flags->$column;
        }

        /**
         * Logs a message to the database.
         *
         * @param string $text The log message text.
         * @param array $args Arguments for the log entry.
         *                    - 'type': (Required) The type of log entry.
         *                    - 'type_id': The ID of the type associated with the log.
         *                    - 'log_status': The status of the log (default is WP_QT_LOG_STATUS_SUCCESS).
         *                    - 'user_id': The ID of the user associated with the log (default is null).
         *                    - 'created_by': The creator of the log entry (default is WP_QT_LOG_CREATED_BY_SYSTEM).
         *                    - 'created_by_id': The ID of the creator of the log entry (default is null).
         *                    - 'pipeline_id': The ID of the pipeline associated with the log (default is null).
         * @return mixed The log entry retrieved by its ID.
         * @throws \Exception If the log type is not provided or if the log insertion fails.
         */
        public function log($text, $args)
        {
            global $wpdb;

            $defaults = [
                'type_id'       => null,
                'log_status'    => WP_QT_LOG_STATUS_SUCCESS,
                'user_id'       => null,
                'created_by'    => WP_QT_LOG_CREATED_BY_SYSTEM,
                'pipeline_id'   => null,
                'created_by_id' => null,
            ];
            $args = wp_parse_args($args, $defaults);

            if (empty($args['type'])) {
                throw new \Exception('Log type is required in args array');
            }

            if (isset($args['type_id']) && 'null' === $args['type_id']) {
                $args['type_id'] = null;
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKS_LOGS, [
                'text'          => $text,
                'type'          => $args['type'],
                'type_id'       => $args['type_id'],
                'user_id'       => $args['user_id'],
                'created_by'    => $args['created_by'],
                'created_at'    => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                'log_status'    => $args['log_status'],
                'pipeline_id'   => $args['pipeline_id'],
                'created_by_id' => $args['created_by_id'],
            ]);

            if (false === $result) {
                throw new \Exception('Failed to add a log');
            }

            return ServiceLocator::get('LogRepository')->getLogById($wpdb->insert_id);
        }
    }
}
