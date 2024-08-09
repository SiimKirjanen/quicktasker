<?php

class PipelineService {
    protected $pipelineRepository;

    public function __construct() {
        $this->pipelineRepository = new PipelineRepository();
    }


    public function createPipeline($name) {
        global $wpdb;

        $result = $wpdb->insert(TABLE_WP_QUICK_TASKS_PIPELINES, array(
            'name' => $name
        ));

        if ($result !== false) {
            return $wpdb->insert_id;
        } else {
            throw new Exception('Failed to create pipeline');
        }
    }

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

        return $result;
    }

    public function updatePipeline($id, $data) {
  
    }

   public function deletePipeline() {

   }
}