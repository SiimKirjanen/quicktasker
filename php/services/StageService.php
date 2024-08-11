<?php
class StageService {
    protected $stageRepository;

    public function __construct() {
        $this->stageRepository = new StageRepository();
    }


    /**
     * Creates a stage for a pipeline.
     *
     * @param int $pipelineId The ID of the pipeline.
     * @param array $args The arguments for creating the stage.
     * @return Stage The created stage.
     * @throws Exception If required fields are missing or if the stage creation fails.
     */
    public function createStage($pipelineId, $args) {
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

        if( $result === false ) {
            throw new Exception('Failed to create a stage');
        }

        return $this->stageRepository->getStageById($wpdb->insert_id);
    }
}