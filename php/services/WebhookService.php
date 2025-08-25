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
            'target_id' => null,
            'webhook_confirm' => false
        );
        $args = wp_parse_args($args, $defaults);

        $result = $wpdb->insert(TABLE_WP_QUICKTASKER_WEBHOOKS, array(
            'pipeline_id' => $pipelineId,
            'target_type' => $args['target_type'],
            'target_id' => $args['target_id'],
            'target_action' => $args['target_action'],
            'webhook_url' => $args['webhook_url'],
            'created_at' => $args['created_at'],
            'webhook_confirm' => $args['webhook_confirm'],
        ));

        if ( $result === false ) {
            throw new \Exception('Failed to add a webhook');
        }

        return ServiceLocator::get('WebhookRepository')->getWebhookById($wpdb->insert_id);
      }

      /**
       * Edits an existing webhook.
       *
       * @param int $webhookId The ID of the webhook to edit.
       * @param array $args The updated webhook data.
       * @return object|null The updated webhook object, or null on failure.
       * @throws \Exception If the webhook could not be edited.
       */
      public function editWebhook($webhookId, $args) {
        global $wpdb;

        $results = $wpdb->update(TABLE_WP_QUICKTASKER_WEBHOOKS, $args, array(
            'id' => $webhookId
        ));

        if ($results === false) {
            throw new \Exception('Failed to edit the webhook');
        }

        return ServiceLocator::get('WebhookRepository')->getWebhookById($webhookId);
      }

        /**
         * Deletes a webhook by its ID.
         *
         * @param int $webhookId The ID of the webhook to delete.
         * @return bool True on success, false on failure.
         * @throws \Exception If the webhook could not be deleted.
         */
      public function deleteWebhook($webhookId) {
        global $wpdb;

        $result = $wpdb->delete(TABLE_WP_QUICKTASKER_WEBHOOKS, array(
            'id' => $webhookId
        ));

        if ( $result === false ) {
            throw new \Exception('Failed to delete the webhook');
        }

        return true;
      }

      public function handleWebhooks($pipelineId, $relatedObject, $args) {
        $relatedWebhooks = ServiceLocator::get('WebhookRepository')->findRelatedWebhooks($pipelineId, $args);

        foreach ($relatedWebhooks as $webhook) {
          $webHookName = ServiceLocator::get('WebhookRepository')->generateWebhookName($webhook);
          $baseLog = array(
            'type'        => WP_QT_LOG_TYPE_WEBHOOK,
            'type_id'     => $webhook->id,
            'user_id'     => get_current_user_id(),
            'created_by'  => WP_QT_LOG_CREATED_BY_ADMIN,
            'pipeline_id' => $pipelineId,
          );

          try {
            $this->processWebhook($webhook, $relatedObject);

            ServiceLocator::get('LogService')->log('Executed ' . $webHookName, $baseLog);
          } catch (\Exception $e) {
            $errorMessage = $e->getMessage();
            $message = 'Error processing ' . $webHookName . ' Reason: ' . $errorMessage;

            ServiceLocator::get('LogService')->log($message, array_merge($baseLog, [
              'log_status' => WP_QT_LOG_STATUS_ERROR
            ]));
          }
        }
      }

      public function processWebhook($webhook, $relatedObject) {
        $webhookData = (object)[
          'id' => $webhook->id,
          'pipeline_id' => $webhook->pipeline_id,
          'target_type' => $webhook->target_type,
          'target_action' => $webhook->target_action,
          'webhook_url' => $webhook->webhook_url,
          'created_at' => $webhook->created_at
        ];

        if ( $this->isTargetTypeTaskWebhook($webhook) ) {
          $task = (object)[
            'id' => $relatedObject->id,
            'name' => $relatedObject->name,
            'description' => $relatedObject->description,
            'pipeline_id' => $relatedObject->pipeline_id,
            'is_archived' => $relatedObject->is_archived,
            'is_done' => $relatedObject->is_done,
            'due_date' => $relatedObject->due_date,
            'free_for_all' => $relatedObject->free_for_all,
            'created_at' => $relatedObject->created_at,
            'updated_at' => $relatedObject->updated_at,
            'task_completed_at' => $relatedObject->task_completed_at,
            'task_focus_color' => $relatedObject->task_focus_color
          ];
          $this->sendWebhookRequest(
            $webhook,
            array(
              'task' => $task,
              'webhook' => $webhookData,
            ),
          );
          
        } elseif ( $this->isTargetTypeQuicktaskerWebhook($webhook) ) {
          $quicktasker = (object)[
            'id' => $relatedObject->id,
            'name' => $relatedObject->name,
            'description' => $relatedObject->description,
            'created_at' => $relatedObject->created_at,
            'updated_at' => $relatedObject->updated_at,
            'is_active' => $relatedObject->is_active
          ];
          $this->sendWebhookRequest(
            $webhook,
            array(
              'quicktasker' => $quicktasker,
              'webhook' => $webhookData,
            ),
          );
        }
      }

      public function isTargetTypeTaskWebhook($webhook) {
        return $webhook->target_type === WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK;
      }

      public function isTargetTypeQuicktaskerWebhook($webhook) {
        return $webhook->target_type === WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_QUICKTASKER;
      }

     public function determineWebhookHttpMethod( $webhook ) {
        $action = $webhook->target_action;

        switch ( $action ) {
          case WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED:
            return 'POST';
          case WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED:
            return 'PATCH';
          case WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED:
            return 'DELETE';
          default:
            return 'POST';
        }
      }

      public function sendWebhookRequest($webhook, $body) {
        $waitForResponse = $webhook->webhook_confirm === '1';
        $requestArgs = array(
          'method'    => $this->determineWebhookHttpMethod($webhook),
          'body'      => json_encode($body),
          'headers'   => array(
            'Content-Type' => 'application/json',
          ),
          'timeout'   => 15,
          'blocking'  => $waitForResponse,
          'sslverify' => true,
        );

        $response = wp_remote_request($webhook->webhook_url, $requestArgs);

        if (!$waitForResponse) {
          return null;
        }

        if ( is_wp_error( $response ) ) {
          throw new \Exception(
            'Request error: ' . $response->get_error_message()
          );
        }

      $status = wp_remote_retrieve_response_code( $response );

      if ( $status < 200 || $status >= 300 ) {
          throw new \Exception(
            'Request failed with status ' . $status
          );
       }
    }
  }
}