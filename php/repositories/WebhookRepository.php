<?php

namespace WPQT\Webhooks;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Webhooks\WebhookRepository' ) ) {
    class WebhookRepository {
        /**
         * Retrieves webhooks for a specific pipeline.
         *
         * @param int $pipelineId The ID of the pipeline.
         * @return array|null The list of webhooks for the pipeline, or null if none found.
         */
        public function getPipelineWebhooks($pipelineId) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE pipeline_id = %d",
                $pipelineId
            );

            return $wpdb->get_results($query);
        }

        /**
         * Retrieves a webhook by its ID.
         *
         * @param int $id The ID of the webhook.
         * @return object|null The webhook object if found, or null if not found.
         */
        public function getWebhookById($id) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, created_at FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . " WHERE id = %d",
                $id
            );

            return $wpdb->get_row($query);
        }

        /**
         * Finds webhooks based on criteria.
         *
         * @param int|null $pipelineId The ID of the pipeline.
         * @param array $args The criteria to filter webhooks (e.g., target_type, target_action).
         * @return array The list of webhooks matching the criteria.
         */
        public function findRelatedWebhooks($pipelineId, $args) {
            global $wpdb;

            $defaults = array(
                'target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
            ); 
            
            $args = wp_parse_args($args, $defaults);

            if ( $pipelineId === null ) {
                $sql  = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id IS NULL AND target_type = %s AND target_action = %s";
                $prepArgs = array( $args['target_type'], $args['target_action'] );
            } else {
                // Match specific pipeline
                $sql  = "SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, created_at
                         FROM " . TABLE_WP_QUICKTASKER_WEBHOOKS . "
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s";
                $prepArgs = array( (int) $pipelineId, $args['target_type'], $args['target_action'] );
            }

            $query   = $wpdb->prepare( $sql, $prepArgs );
            $results = $wpdb->get_results( $query );

            return is_array( $results ) ? $results : array();
        }

        /**
         * Generates a user-friendly name for a webhook.
         *
         * @param object $webhook The webhook object.
         * @return string The generated webhook name.
         */
        public function generateWebhookName($webhook) {
            return 'Webhook (type: ' . $webhook->target_type . ', action: ' . $webhook->target_action . ', URL: ' . $webhook->webhook_url . ')';
        }
    }
}