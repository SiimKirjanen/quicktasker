<?php

namespace WPQT\Overview;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Stage\StageRepository;

class OverViewRepository {
    protected $stageRepository;

    public function __construct() {
        $this->stageRepository = new StageRepository();
    }

    public function getPipelineOverview($pipelineId) {
        global $wpdb;

        $results = (object)[
            'stages' => [],
            'archivedTasksCount' => 0,
            'notArchivedTasksCount' => 0,
            'doneTasksCount' => 0,
            'notDoneTasksCount' => 0,
        ];

        $pipelineStages = $this->stageRepository->getStagesByPipelineId($pipelineId);

        foreach ($pipelineStages as $stage) {
            $tasksCount = $wpdb->get_var( $wpdb->prepare(
                "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " tl
                INNER JOIN " . TABLE_WP_QUICKTASKER_TASKS . " t ON tl.task_id = t.id
                WHERE tl.stage_id = %d AND t.is_archived = 0",
                $stage->id
            ) );

            $results->stages[] = (object)[
                'id' => $stage->id,
                'name' => $stage->name,
                'tasksCount' => $tasksCount,
            ];
        }

        $results->archivedTasksCount = $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE pipeline_id = %d AND is_archived = 1",
            $pipelineId
        ) );

        $results->notArchivedTasksCount = $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE pipeline_id = %d AND is_archived = 0",
            $pipelineId
        ) );

        $results->doneTasksCount = $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE pipeline_id = %d AND is_done = 1",
            $pipelineId
        ) );

        $results->notDoneTasksCount = $wpdb->get_var( $wpdb->prepare(
            "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE pipeline_id = %d AND is_done = 0",
            $pipelineId
        ) );

        return $results;
    }
}