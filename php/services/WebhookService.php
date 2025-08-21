<?php

namespace WPQT\Webhooks;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Webhooks\WebhookService' ) ) {
    class WebhookService {

      /**
       * Creates a new webhook.
       *
       * @param int $pipelineId The ID of the pipeline.
       * @param array $args The webhook data.
       * @return object|null The created webhook object, or null on failure.
       * @throws \Exception If the webhook could not be created.
       */
      public function createWebhook($pipelineId, $args) {
        global $wpdb;

        $defaults = array(
            'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            'target_id' => null
        );
        $args = wp_parse_args($args, $defaults);

        $result = $wpdb->insert(TABLE_WP_QUICKTASKER_WEBHOOKS, array(
            'pipeline_id' => $pipelineId,
            'target_type' => $args['target_type'],
            'target_id' => $args['target_id'],
            'target_action' => $args['target_action'],
            'webhook_url' => $args['webhook_url'],
            'created_at' => $args['created_at']
        ));

        if ( $result === false ) {
            throw new \Exception('Failed to add a webhook');
        }

        return ServiceLocator::get('WebhookRepository')->getWebhookById($wpdb->insert_id);
      }
    }
}