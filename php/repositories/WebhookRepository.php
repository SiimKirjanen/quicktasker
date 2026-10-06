<?php

namespace WPQT\Webhooks;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Webhooks\WebhookRepository')) {
    class WebhookRepository
    {
        /**
         * Retrieves webhooks for a specific pipeline.
         *
         * @param int $pipelineId The ID of the pipeline.
         * @return array|null The list of webhooks for the pipeline, or null if none found.
         */
        public function getPipelineWebhooks($pipelineId)
        {
            global $wpdb;

            $query = $wpdb->prepare(
                $this->getWebhookQuery() . ' WHERE w.pipeline_id = %d',
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
        public function getWebhookById($id)
        {
            global $wpdb;

            $query = $wpdb->prepare(
                $this->getWebhookQuery() . ' WHERE w.id = %d',
                $id
            );

            return $wpdb->get_row($query);
        }

        /**
         * Retrieves the webhooks a WordPress user created, active or not.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[]|null $pipelineIds Only webhooks on these boards, or null for webhooks on every board.
         * @return array Webhook objects.
         */
        public function getWebhooksCreatedByWPUser($wpUserId, $pipelineIds = null)
        {
            global $wpdb;

            if (null !== $pipelineIds && empty($pipelineIds)) {
                return [];
            }

            $sql = $this->getWebhookQuery() . ' WHERE w.created_by = %d';
            $params = [$wpUserId];

            if (null !== $pipelineIds) {
                $sql .= ' AND w.pipeline_id IN (' . implode(',', array_fill(0, count($pipelineIds), '%d')) . ')';
                $params = array_merge($params, array_values($pipelineIds));
            }

            return $wpdb->get_results($wpdb->prepare($sql . ' ORDER BY w.id ASC', $params));
        }

        /**
         * Builds the query that selects webhooks with the name of the WordPress user who created each one.
         *
         * @return string The SELECT and FROM clauses, with the webhooks table aliased w.
         */
        private function getWebhookQuery()
        {
            global $wpdb;

            return 'SELECT w.id, w.pipeline_id, w.target_type, w.target_id, w.target_action, w.webhook_url, w.webhook_confirm, w.active, w.created_at, w.created_by, u.display_name AS created_by_name
                FROM ' . TABLE_WP_QUICKTASKER_WEBHOOKS . ' AS w
                LEFT JOIN ' . $wpdb->users . ' AS u ON u.ID = w.created_by';
        }

        /**
         * Finds webhooks based on criteria.
         *
         * @param int|null $pipelineId The ID of the pipeline.
         * @param array $args The criteria to filter webhooks (e.g., target_type, target_action).
         * @return array The list of webhooks matching the criteria.
         */
        public function findRelatedWebhooks($pipelineId, $args)
        {
            global $wpdb;

            $defaults = [
                'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
            ];

            $args = wp_parse_args($args, $defaults);

            if (null === $pipelineId) {
                $sql = 'SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at, created_by
                         FROM ' . TABLE_WP_QUICKTASKER_WEBHOOKS . '
                         WHERE pipeline_id IS NULL AND target_type = %s AND target_action = %s';
                $prepArgs = [$args['target_type'], $args['target_action']];
            } else {
                // Match specific pipeline
                $sql = 'SELECT id, pipeline_id, target_type, target_id, target_action, webhook_url, webhook_confirm, active, created_at, created_by
                         FROM ' . TABLE_WP_QUICKTASKER_WEBHOOKS . '
                         WHERE pipeline_id = %d AND target_type = %s AND target_action = %s';
                $prepArgs = [(int) $pipelineId, $args['target_type'], $args['target_action']];
            }

            $query = $wpdb->prepare($sql, $prepArgs);
            $results = $wpdb->get_results($query);

            return is_array($results) ? $results : [];
        }

        /**
         * Generates a user-friendly name for a webhook.
         *
         * @param object $webhook The webhook object.
         * @return string The generated webhook name.
         */
        public function generateWebhookName($webhook)
        {
            return 'Webhook (type: ' . $webhook->target_type . ', action: ' . $webhook->target_action . ', URL: ' . $webhook->webhook_url . ')';
        }
    }
}
