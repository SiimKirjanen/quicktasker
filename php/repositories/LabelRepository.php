<?php

namespace WPQT\Label;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Label\LabelRepository' ) ) {
    class LabelRepository {

        /**
         * Retrieves the labels assigned to the specified task IDs.
         *
         * This function queries the database to fetch labels that are associated with the given task IDs.
         *
         * @param array $taskIds An array of task IDs for which to retrieve the assigned labels.
         * @return array An array of label objects assigned to the specified task IDs. If no task IDs are provided, an empty array is returned.
         */
        public function getAssignedLabelsByTaskIds($taskIds) {
            global $wpdb;

            if ( empty($taskIds) ) {
                return [];
            }

            // Prepare the placeholders for the IN clause
            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));

            $sql = $wpdb->prepare(
                "SELECT a.id, a.pipeline_id, a.created_at, a.color, a.name, b.entity_id
                FROM " . TABLE_WP_QUICKTASKER_LABELS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " AS b 
                ON a.id = b.label_id
                WHERE b.entity_id IN ($placeholders) AND b.entity_type = 'task'",
                $taskIds
            );

            return $wpdb->get_results($sql);
        }

        /**
         * Retrieves the labels assigned to the specified pipeline ID.
         *
         * This function queries the database to fetch labels that are associated with the given pipeline ID.
         *
         * @param int $pipelineId The ID of the pipeline for which to retrieve the assigned labels.
         * @return array An array of label objects assigned to the specified pipeline ID.
         */
        public function getPipelineTaskLabels($pipelineId) {
            global $wpdb;

            $sql = $wpdb->prepare(
                "SELECT a.id, a.pipeline_id, a.created_at, a.color, a.name, b.entity_id
                FROM " . TABLE_WP_QUICKTASKER_LABELS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_LABEL_RELATIONS . " AS b 
                ON a.id = b.label_id
                WHERE a.pipeline_id = %d AND b.entity_type = 'task'",
                $pipelineId
            );

            return $wpdb->get_results($sql);
        }
    }
}