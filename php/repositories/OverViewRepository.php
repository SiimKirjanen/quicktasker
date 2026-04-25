<?php

namespace WPQT\Overview;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Overview\OverViewRepository')) {
    class OverViewRepository
    {
        public function getPipelineOverview($pipelineId)
        {
            global $wpdb;

            $results = (object) [
                'stages'                => [],
                'archivedTasksCount'    => 0,
                'notArchivedTasksCount' => 0,
                'doneTasksCount'        => 0,
                'notDoneTasksCount'     => 0,
                'overdueTasksCount'     => 0,
                'totalTasksCount'       => 0,
            ];

            $pipelineStages = ServiceLocator::get('StageRepository')->getStagesByPipelineId($pipelineId);

            foreach ($pipelineStages as $stage) {
                $query = 'SELECT COUNT(*) FROM ' . TABLE_WP_QUICKTASKER_TASKS_LOCATION . ' tl
                        INNER JOIN ' . TABLE_WP_QUICKTASKER_TASKS . ' t ON tl.task_id = t.id
                        WHERE tl.stage_id = %d AND t.is_archived = 0';

                $tasksCount = $wpdb->get_var($wpdb->prepare($query, $stage->id));

                $results->stages[] = (object) [
                    'id'         => $stage->id,
                    'name'       => $stage->name,
                    'tasksCount' => $tasksCount,
                ];
            }

            $baseQuery = 'SELECT COUNT(*) FROM ' . TABLE_WP_QUICKTASKER_TASKS . ' WHERE pipeline_id = %d';

            $results->archivedTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_archived = 1', $pipelineId));
            $results->notArchivedTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_archived = 0', $pipelineId));
            $results->doneTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_done = 1 AND is_archived = 0', $pipelineId));
            $results->notDoneTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_done = 0 AND is_archived = 0', $pipelineId));
            $results->overdueTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_done = 0 AND is_archived = 0 AND due_date IS NOT NULL AND due_date < NOW()', $pipelineId));
            $results->totalTasksCount = $wpdb->get_var($wpdb->prepare($baseQuery . ' AND is_archived = 0', $pipelineId));

            return $results;
        }
    }
}
