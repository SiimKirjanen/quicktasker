<?php
class StageService {
    protected $stageRepository;
    protected $taskRepository;

    public function __construct() {
        $this->stageRepository = new StageRepository();
        $this->taskRepository = new TaskRepository();
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

    public function deleteStage($stageId) {
        global $wpdb;
        
        if( count( $this->taskRepository->getTasksByStageId($stageId) ) > 0 ) {
            throw new Exception('Stage has tasks. Please delete the tasks first.');
        }

        $result = $wpdb->delete(TABLE_WP_QUICK_TASKS_PIPELINE_STAGES, array('id' => $stageId));

        if( $result === false ) {
            throw new Exception('Failed to delete the stage');
        }

        return $result;
    }
}