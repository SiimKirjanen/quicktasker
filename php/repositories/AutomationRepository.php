<?php

namespace WPQT\Automation;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Automation\AutomationRepository' ) ) {
    class AutomationRepository {

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
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, created_at, updated_at FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE pipeline_id = %d AND target_type = %s AND automation_trigger = %s",
                $boardId,
                $targetType,
                $automationTrigger
            );

            return $wpdb->get_results($query);
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
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, created_at, updated_at FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE id = %d",
                $automationID
            );

            return $wpdb->get_row($query);
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
                "SELECT id, pipeline_id, target_id, target_type, automation_trigger, automation_action, created_at, updated_at FROM " . TABLE_WP_QUICKTASKER_AUTOMATIONS . " WHERE pipeline_id = %d",
                $pipelineId
            );

            return $wpdb->get_results($query);
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
    }
}