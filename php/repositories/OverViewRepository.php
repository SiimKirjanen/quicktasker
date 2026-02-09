<?php

namespace WPQT\Overview;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Services\ServiceLocator;

if ( ! class_exists( 'WPQT\Overview\OverViewRepository' ) ) {
    class OverViewRepository {
        public function getPipelineOverview($pipelineId, $taskStartDate, $taskDoneDate) {
            global $wpdb;

            $results = (object)[
                'stages' => [],
                'archivedTasksCount' => 0,
                'notArchivedTasksCount' => 0,
                'doneTasksCount' => 0,
                'notDoneTasksCount' => 0,
            ];

            $pipelineStages = ServiceLocator::get('StageRepository')->getStagesByPipelineId($pipelineId);

            foreach ($pipelineStages as $stage) {
                $query = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " tl
                        INNER JOIN " . TABLE_WP_QUICKTASKER_TASKS . " t ON tl.task_id = t.id
                        WHERE tl.stage_id = %d AND t.is_archived = 0";
                $params = [$stage->id];

                if ($taskStartDate) {
                    $query .= " AND t.created_at >= %s";
                    $params[] = $taskStartDate;
                }

                if ($taskDoneDate) {
                    $taskDoneDateEnd = $taskDoneDate . ' 23:59:59';
                    $query .= " AND t.task_completed_at <= %s";
                    $params[] = $taskDoneDateEnd;
                }

                $tasksCount = $wpdb->get_var($wpdb->prepare($query, ...$params));

                $results->stages[] = (object)[
                    'id' => $stage->id,
                    'name' => $stage->name,
                    'tasksCount' => $tasksCount,
                ];
            }

            $baseQuery = "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_TASKS . " WHERE pipeline_id = %d";
            $params = [$pipelineId];

            if ($taskStartDate) {
                $baseQuery .= " AND created_at >= %s";
                $params[] = $taskStartDate;
            }

            if ($taskDoneDate) {
                $taskDoneDateEnd = $taskDoneDate . ' 23:59:59';
                $baseQuery .= " AND task_completed_at <= %s";
                $params[] = $taskDoneDateEnd;
            }

            $results->archivedTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . " AND is_archived = 1", ...$params));
            $results->notArchivedTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . " AND is_archived = 0", ...$params));
            $results->doneTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . " AND is_done = 1", ...$params));
            $results->notDoneTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . " AND is_done = 0", ...$params));

            return $results;
        }
    }
}