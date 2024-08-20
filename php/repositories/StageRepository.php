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

    /**
     * Retrieves a stage by its ID.
     *
     * @param int $stageId The ID of the stage to retrieve.
     * @return object|null The stage object if found, null otherwise.
     */
    public function getStageById($stageId) {
        global $wpdb;

        return $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM " . TABLE_WP_QUICK_TASKS_PIPELINE_STAGES . "
            WHERE id = %d",
            $stageId
        ) );
    }

    /**
     * Retrieves the next stage order for a given pipeline ID.
     *
     * @param int $pipelineId The ID of the pipeline.
     * @return int The next stage order.
     */
    public function getNextStageOrder($pipelineId) {
        global $wpdb;

        $result = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT MAX(stage_order) FROM " . TABLE_WP_QUICK_TASKS_STAGES_LOCATION . " WHERE pipeline_id = %d",
                $pipelineId
            )
        );

        return $result === null ? 0 : $result + 1;
    }
}