<?php

namespace WPQT\Webhooks;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Webhooks\WebhookEventRepository' ) ) {
    class WebhookEventRepository {
        
        public function constructTaskAssignedWebhookEvent($automation) {
            $executionResult = $automation->executionResult;
            $task = $executionResult->task;
            $user = $executionResult->user;

            return [
                'data' => array(
                    'relatedObject' => $task,
                    'extraData' => array(
                        'assigned_user_id' => $user->id,
                        'assigned_user_name' => $user->name,
                        'assigned_user_type' => $user->user_type
                    )
                ),
                'webhookData' => array(
                    'target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                    'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED,
                ) 
            ];
        }

        public function constructTaskCreatedWebhookEvent($automation) {
            $executionResult = $automation->executionResult;
            $task = $executionResult->task;

            return [
                'data' => array(
                    'relatedObject' => $task
                ),
                'webhookData' => array(
                    'target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                    'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
                )                 
            ];
        }
    }
}