<?php

class PipelineRepository {
    /**
     * Retrieves all pipelines from the database.
     *
     * @return array The list of pipelines.
     */
    public function getPipelines() {
        global $wpdb;

        return $wpdb->get_results(
            "SELECT * FROM ". TABLE_WP_QUICK_TASKS_PIPELINES,
         );
    }

    /**
     * Retrieves a pipeline by its ID from the database.
     *
     * @param int $id The ID of the pipeline.
     * @return object|null The pipeline object if found, null otherwise.
     */
    public static function getPipelineById($id) {
        global $wpdb;

        return $wpdb->get_row( $wpdb->prepare(
            "SELECT * FROM %s
            WHERE id = %d",
            TABLE_WP_QUICK_TASKS_PIPELINES,
            $id
        ) );
    }
}