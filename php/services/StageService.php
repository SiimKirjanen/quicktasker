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
            'name' => null,
            'description' => null
        );

        $args = wp_parse_args($args, $defaults);

        if ( empty($args['name']) ) {
            throw new Exception('Required fields are missing');
        }

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_PIPELINE_STAGES, array(
            'pipeline_id' => $pipelineId,
            'name' => $args['name'],
            'description' => $args['description']
        ));

        if( $result === false ) {
            throw new Exception('Failed to create a stage');
        }

        $stageId = $wpdb->insert_id;
        $stageOrder = $this->stageRepository->getNextStageOrder($pipelineId);

        $this->addStageLocation($pipelineId, $stageId, $stageOrder);

        return $this->stageRepository->getStageById($stageId);
    }

    /**
     * Adds a stage location to the pipeline.
     *
     * @param int $pipelineId The ID of the pipeline.
     * @param int $stageId The ID of the stage.
     * @param int $stageOrder The order of the stage.
     * @return void
     */
    private function addStageLocation($pipelineId, $stageId, $stageOrder) {
        global $wpdb;

        $wpdb->insert(TABLE_WP_QUICK_TASKS_STAGES_LOCATION, array(
            'pipeline_id' => $pipelineId,
            'stage_id' => $stageId,
            'stage_order' => $stageOrder
        ));
    }

    /**
     * Edit a stage.
     *
     * @param int $stageId The ID of the stage to edit.
     * @param array $args The arguments to update the stage.
     * @return void
     */
    public function editStage($stageId, $args) {
        global $wpdb;

        if (!array_key_exists('name', $args) || !array_key_exists('description', $args)) {
            throw new Exception('Required fields are missing');
        }

        $result = $wpdb->update(TABLE_WP_QUICK_TASKS_PIPELINE_STAGES, array(
            'name' => $args['name'],
            'description' => $args['description']
        ), array('id' => $stageId));

        if( $result === false ) {
            throw new Exception('Failed to update the stage');
        }

        return $this->stageRepository->getStageById($stageId);
    }

    /**
     * Deletes a stage.
     *
     * @param int $stageId The ID of the stage to delete.
     * @return void
     */
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