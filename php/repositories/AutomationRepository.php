<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Automation\AutomationRepository' ) ) {
    class AutomationRepository {

        /**
         * Decrypts sensitive metadata for a single automation or a list of automations.
         *
         * @param object|array $automations A single automation object or an array of automation objects.
         * @return object|array The automation(s) with decrypted metadata.
         */
        private function decryptSensitiveMetadata($automations) {
            if (is_array($automations)) {
                foreach ($automations as $automation) {
                    if ($this->isSensitiveMetaAutomation($automation->automation_action)) {
                        $automation->metadata = ServiceLocator::get('SecretsService')->decrypt($automation->metadata);
                    }
                }
            } elseif (is_object($automations)) {
                if ($this->isSensitiveMetaAutomation($automations->automation_action)) {
                    $automations->metadata = ServiceLocator::get('SecretsService')->decrypt($automations->metadata);
                }
            }

            return $automations;
        }

        /**
         * Retrieves automations based on the provided parameters.
         *
         * @param int $boardId The ID of the board.
         * @param int|null $targetId The ID of the target or null if not applicable.
         * @param string $targetType The type of the target.
         * @param string $automationTrigger The trigger for the automation.
         * @return array|null The list of automations matching the criteria, or null if none found.
         */
        public function getAutomations($boardId, $targetId, $targetType, $automationTrigger) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, automation_action_target_id, automation_action_target_type, metadata, created_at, updated_at, active FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE pipeline_id = %d AND target_type = %s AND automation_trigger = %s",
                $boardId,
                $targetType,
                $automationTrigger
            );

            $results = $wpdb->get_results($query);

            return $this->decryptSensitiveMetadata($results);
        }

        /**
         * Retrieves the active automations for a given board, target, and trigger.
         *
         * This method fetches all automations matching the specified parameters
         * and filters them to return only those that are marked as active.
         *
         * @param int $boardId The ID of the board to retrieve automations for.
         * @param int $targetId The ID of the target associated with the automations.
         * @param string $targetType The type of the target (e.g., "task", "project").
         * @param string $automationTrigger The trigger type for the automation (e.g., "onCreate", "onUpdate").
         * 
         * @return array|null An array of active automations if found, or null if no automations exist.
         */
        public function getActiveAutomations($boardId, $targetId, $targetType, $automationTrigger) {
            $automations = $this->getAutomations($boardId, $targetId, $targetType, $automationTrigger);

            if ($automations === null) {
                return null;
            }

            return array_filter($automations, function ($automation) {
                return $automation->active === '1';
            });
        }

        /**
         * Retrieves an automation record from the database based on the provided automation ID.
         *
         * @param int $automationID The ID of the automation to retrieve.
         * @return object|null The automation record as an object if found, null otherwise.
         */
        public function getAutomation($automationID) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, automation_action_target_id, automation_action_target_type, metadata, created_at, updated_at, active FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE id = %d",
                $automationID
            );

            $automation = $wpdb->get_row($query);

            return $this->decryptSensitiveMetadata($automation);
        }

        /**
         * Retrieves automations for a specific pipeline.
         *
         * This function queries the database to fetch all automation records associated with a given pipeline ID.
         *
         * @param int $pipelineId The ID of the pipeline for which to retrieve automations.
         * @return array|null An array of automation objects if found, null otherwise.
         */
        public function getPipelineAutomations($pipelineId) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, automation_action_target_id, automation_action_target_type, created_at, metadata, updated_at, active FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE pipeline_id = %d",
                $pipelineId
            );

            $results = $wpdb->get_results($query);

            return $this->decryptSensitiveMetadata($results);
        }

        /**
         * Checks if the given action contains sensitive metadata
         *
         * @param string $action The action to check.
         * @return bool True if the action is sensitive, false otherwise.
         */
        public function isSensitiveMetaAutomation($action) {
            return in_array($action, WP_QUICKTASKER_AUTOMATIONS_WITH_SENSITIVE_META);
        }

        /**
         * Retrieves a formatted information message for a given automation.
         *
         * @param object $automation The automation object containing details.
         * @return string A formatted string containing the automation details, including
         *                Board ID, Target ID, Target Type, Trigger, and Action.
         */
        public function getAutomationInfoMessage($automation) {
            return "Board ID: {$automation->pipeline_id}, Target ID: {$automation->target_id}, Target Type: {$automation->target_type}, Trigger: {$automation->automation_trigger}, Action: {$automation->automation_action}";
        }

        /**
         * Retrieves the automation action target ID for a given automation.
         *
         * @param object $automation The automation object containing details.
         * @return int|null The automation action target ID if found, null otherwise.
         */
        public function getAutomationsByTrigger($trigger) {
            global $wpdb;

            $query = $wpdb->prepare(
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, automation_action_target_id, automation_action_target_type, created_at, metadata, updated_at, active FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE automation_trigger = %s",
                $trigger
            );

            return $wpdb->get_results($query);
        }
    }
}