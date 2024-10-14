<?php
namespace WPQT\Pipeline;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Pipeline\PipelineRepository;
use WPQT\Time\TimeRepository;

class PipelineService {
    protected $pipelineRepository;
    protected $timeRepository;

    public function __construct() {
        $this->pipelineRepository = new PipelineRepository();
        $this->timeRepository = new TimeRepository();
    }

    /**
     * Creates a pipeline with the given name.
     *
     * @param string $name The name of the pipeline.
     * @return void
     */
    public function createPipeline($name) {
        global $wpdb;

        $activePipeline = $this->pipelineRepository->getActivePipeline();

        $result = $wpdb->insert(TABLE_WP_QUICKTASKER_PIPELINES, array(
            'name' => $name,
            'is_primary' => $activePipeline ? false : true,
            'created_at' => $this->timeRepository->getCurrentUTCTime(),
            'updated_at' => $this->timeRepository->getCurrentUTCTime()
        ));

        if ($result == false) {
            throw new \Exception('Failed to create a board');
        } 
        
        return $this->pipelineRepository->getPipelineById($wpdb->insert_id);
    }

    /**
     * Edit a pipeline.
     *
     * @param int $pipelineId The ID of the pipeline to edit.
     * @param array $args The arguments for editing the pipeline.
     *   - name (string|null) The name of the pipeline.
     * @return Pipeline The edited pipeline.
     * @throws Exception If required fields are missing or if editing the pipeline fails.
     */
    public function editPipeline($pipelineId, $args) {
        global $wpdb;

        $defaults = array(
            'name' => null
        );

        $args = wp_parse_args($args, $defaults);

        if (empty($args['name'])) {
            throw new \Exception('Required fields are missing');
        }

        $result = $wpdb->update(TABLE_WP_QUICKTASKER_PIPELINES, array(
            'name' => $args['name'],
            'description' => $args['description'],
            'updated_at' => $this->timeRepository->getCurrentUTCTime()
        ), array(
            'id' => $pipelineId
        ));

        if ($result === false) {
            throw new \Exception('Failed to edit pipeline');
        }

        return $this->pipelineRepository->getPipelineById($pipelineId);       
    }

    /**
     * Marks a pipeline as primary.
     *
     * @param int $pipelineId The ID of the pipeline to mark as primary.
     * @return int The number of rows affected by the update query.
     * @throws Exception If the update query fails.
     */
    public function markPipelineAsPrimary($pipelineId) {
        global $wpdb;

        $current_time_utc = $this->timeRepository->getCurrentUTCTime();
        $result = $wpdb->query(
            $wpdb->prepare(
                "UPDATE " . TABLE_WP_QUICKTASKER_PIPELINES . "
                 SET is_primary = CASE
                     WHEN id = %d THEN 1
                     ELSE 0
                 END,
                 updated_at = %s",
                $pipelineId,
                $current_time_utc
            )
        );

        if ($result === false) {
            throw new \Exception('Failed to mark pipeline as primary');
        }

        return $result;   
    }
}