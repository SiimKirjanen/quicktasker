<?php

namespace WPQT\Webhooks;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Webhooks\WebhookEventService' ) ) {
    class WebhookEventService {
        public function constructWebhookEventsFromExecutedAutomations($executedAutomations) {
            if (empty($executedAutomations)) {
                return [];
            }
            $webhookEventRepository = ServiceLocator::get('WebhookEventRepository');
            $automationService = ServiceLocator::get('AutomationService');
            $webhookEvents = [];

            foreach ($executedAutomations as $automation) {
                if ($automationService->isAssignUserAction($automation)) {
                    $webhookEvents[] = $webhookEventRepository->constructTaskAssignedWebhookEvent($automation);

                    continue;
                }
                if ($automationService->isTaskCreateAction($automation)) {
                    $webhookEvents[] = $webhookEventRepository->constructTaskCreatedWebhookEvent($automation);

                    continue;
                }
            }

            return $webhookEvents;
        }
    }
}
