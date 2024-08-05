<?php


/**
 * Class StageRepository
 *
 * This class represents a repository for retrieving stages by pipeline ID.
 */
class StageRepository {
    public function getStagesByPipelineId($pipelineId) {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT * FROM " . TABLE_WP_QUICK_TASKS_PIPELINE_STAGES . "
            WHERE pipeline_id = %d",
            $pipelineId
        ) );
    }
}