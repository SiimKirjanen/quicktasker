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

    public function updatePipeline($id, $data) {
  
    }

   public function deletePipeline() {

   }
}