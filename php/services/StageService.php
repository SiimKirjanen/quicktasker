<?php
class StageService {
    /**
     * Inserts a new stage into the pipeline.
     *
     * @param int $pipelineId The ID of the pipeline.
     * @param array $args The arguments for the stage.
     * @return int The ID of the newly inserted stage.
     * @throws Exception If required fields are missing or if the stage creation fails.
     */
    public function creatStage($pipelineId, $args) {
        global $wpdb;

        $defaults = array(
            'name' => null
        );

        $args = wp_parse_args($args, $defaults);

        if ( empty($args['name']) ) {
            throw new Exception('Required fields are missing');
        }

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_PIPELINE_STAGES, array(
            'pipeline_id' => $pipelineId,
            'name' => $args['name']
        ));
        if ($result !== false) {
            return $wpdb->insert_id;
        } else {
            throw new Exception('Failed to create stage');
        }
    }
}