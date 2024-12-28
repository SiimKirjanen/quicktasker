<?php
namespace WPQT\Label;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Label\LabelService' ) ) {
    class LabelService {

        /**
         * Creates a new label in the database.
         *
         * @param int $pipelineId The ID of the pipeline to which the label belongs.
         * @param string $name The name of the label.
         * @param string $color The color of the label.
         * @return array The newly created label data.
         * @throws \Exception If the label creation fails.
         */
        public function createLabel($pipelineId, $name, $color) {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_LABELS, array(
                'pipeline_id' => $pipelineId,
                'name' => $name,
                'color' => $color,
                'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ), array('%d', '%s', '%s', '%s'));

            if( $result === false ) {
                throw new \Exception('Failed to create a label');
            }

            return ServiceLocator::get('LabelRepository')->getLabelById($wpdb->insert_id);
        }
    }
}