<?php

class PipelineService {
    protected $pipelineRepository;

    public function __construct() {
        $this->pipelineRepository = new PipelineRepository();
    }


    /**
     * Creates a pipeline with the given name.
     *
     * @param string $name The name of the pipeline.
     * @return void
     */
    public function createPipeline($name) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_PIPELINES, array(
            'name' => $name
        ));

        if ($result == false) {
            throw new Exception('Failed to create a board');
        } 
        
        return $this->pipelineRepository->getPipelineById($wpdb->insert_id);
    }

    public function editPipeline($pipelineId, $args) {
        global $wpdb;

        $defaults = array(
            'name' => null
        );

        $args = wp_parse_args($args, $defaults);

        if (empty($args['name'])) {
            throw new Exception('Required fields are missing');
        }

        $result = $wpdb->update(TABLE_WP_QUICK_TASKS_PIPELINES, array(
            'name' => $args['name'],
            'description' => $args['description']
        ), array(
            'id' => $pipelineId
        ));

        if ($result === false) {
            throw new Exception('Failed to edit pipeline');
        }

        return $this->pipelineRepository->getPipelineById($pipelineId);       
    }

    /**
     * Marks a pipeline as primary.
     *
     * @param int $pipelineId The ID of the pipeline to mark as primary.
     * @return Pipeline|null The updated pipeline object if successful, null otherwise.
     * @throws Exception If failed to mark pipeline as primary.
     */
    public function markPipelineAsPrimary($pipelineId) {
        global $wpdb;

        $result = $wpdb->query(
            $wpdb->prepare(
                "UPDATE " . TABLE_WP_QUICK_TASKS_PIPELINES . "
                 SET is_primary = CASE
                     WHEN id = %d THEN 1
                     ELSE 0
                 END",
                $pipelineId
            )
        );

        if ($result === false) {
            throw new Exception('Failed to mark pipeline as primary');
        }

        return $this->pipelineRepository->getPipelineById($pipelineId);   
    }
}