<?php

class StageRepository {
    /**
     * Retrieves stages by pipeline ID.
     *
     * @param int $pipelineId The ID of the pipeline.
     * @return array|null The stages associated with the pipeline, or null if none found.
     */
    public function getStagesByPipelineId($pipelineId) {
        global $wpdb;

        return $wpdb->get_results( $wpdb->prepare(
            "SELECT * FROM " . TABLE_WP_QUICK_TASKS_PIPELINE_STAGES . "
            WHERE pipeline_id = %d",
            $pipelineId
        ) );
    }
}