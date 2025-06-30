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

        /**
         * Assigns a label to an entity.
         *
         * @param int $entityId The ID of the entity to which the label will be assigned.
         * @param string $entityType The type of the entity (e.g., 'task', 'project').
         * @param int $labelId The ID of the label to be assigned.
         * @throws \Exception If the label assignment fails.
         * @return mixed The label data retrieved by the LabelRepository.
         */
        public function assignLabel($entityId, $entityType, $labelId) {
            global $wpdb;

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_LABEL_RELATIONS, array(
                'entity_id' => $entityId,
                'label_id' => $labelId,
                'entity_type' => $entityType,
                'created_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ), array('%d', '%d', '%s', '%s'));

            if( $result === false ) {
                throw new \Exception('Failed to assign label to task');
            }

            return ServiceLocator::get('LabelRepository')->getLabelById($labelId);
        }

        /**
         * Unassigns a label from an entity.
         *
         * This function removes the association between a label and an entity (such as a task) in the database.
         *
         * @param int $entityId The ID of the entity from which the label is being unassigned.
         * @param string $entityType The type of the entity (e.g., 'task').
         * @param int $labelId The ID of the label to be unassigned.
         * @return mixed The label data retrieved by the LabelRepository.
         * @throws \Exception If the label could not be unassigned from the entity.
         */
        public function unassignLabel($entityId, $entityType, $labelId) {
            global $wpdb;

            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_LABEL_RELATIONS, array(
                'entity_id' => $entityId,
                'label_id' => $labelId,
                'entity_type' => $entityType
            ), array('%d', '%d', '%s'));

            if( $result === false ) {
                throw new \Exception('Failed to unassign label from task');
            }

            return ServiceLocator::get('LabelRepository')->getLabelById($labelId);
        }

        /**
         * Updates a label with the given ID, name, and color.
         *
         * @param int $labelId The ID of the label to update.
         * @param string $name The new name for the label.
         * @param string $color The new color for the label.
         * @return mixed The updated label object.
         * @throws \Exception If the label update fails.
         */
        public function updateLabel($labelId, $name, $color) {
            global $wpdb;

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_LABELS, array(
                'name' => $name,
                'color' => $color
            ), array('id' => $labelId), array('%s', '%s'), array('%d'));

            if( $result === false ) {
                throw new \Exception('Failed to update label');
            }

            return ServiceLocator::get('LabelRepository')->getLabelById($labelId);
        }

        /**
         * Deletes a label from the database.
         *
         * @param int $labelId The ID of the label to delete.
         * @return mixed The deleted label object.
         * @throws \Exception If the label could not be deleted.
         */
        public function deleteLabel($labelId) {
            global $wpdb;

            $deletedLabel = ServiceLocator::get('LabelRepository')->getLabelById($labelId);
            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_LABELS, array('id' => $labelId), array('%d'));

            if( $result === false ) {
                throw new \Exception('Failed to delete the label');
            }

            return $deletedLabel;
        }
    }
}