<?php

namespace WPQT\Pipeline;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Pipeline\PipelineService')) {
    class PipelineService
    {
        /**
         * Creates a new pipeline with the given name.
         *
         * This method inserts a new pipeline into the database and sets it as the primary pipeline
         * if there is no active pipeline. It also creates the corresponding pipeline settings.
         *
         * @param string $name The name of the pipeline to be created.
         * @param array $args Optional arguments for the pipeline.
         * @return object The newly created pipeline object.
         * @throws \Exception If the pipeline or pipeline settings could not be created.
         */
        public function createPipeline($name, $args = [])
        {
            global $wpdb;

            $defaults = [
                'description' => null,
            ];
            $args = wp_parse_args($args, $defaults);

            $activePipeline = ServiceLocator::get('PipelineRepository')->getActivePipeline();

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_PIPELINES, [
                'name'        => $name,
                'description' => $args['description'],
                'is_primary'  => $activePipeline ? false : true,
                'created_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
                'updated_at'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime()
            ]);

            if (false == $result) {
                throw new \Exception('Failed to create a board');
            }

            $pipelineId = $wpdb->insert_id;

            ServiceLocator::get('SettingService')->insertSettingsColumnForPipeline($pipelineId);

            return ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId);
        }

        /**
         * Edit a pipeline.
         *
         * @param int $pipelineId The ID of the pipeline to edit.
         * @param array $args The arguments for editing the pipeline.
         * @return Pipeline The edited pipeline.
         * @throws Exception If required fields are missing or if editing the pipeline fails.
         */
        public function editPipeline($pipelineId, $args)
        {
            global $wpdb;

            $defaults = [
                'updated_at' => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            ];

            $args = wp_parse_args($args, $defaults);

            $result = $wpdb->update(TABLE_WP_QUICKTASKER_PIPELINES, $args, [
                'id' => $pipelineId
            ]);

            if (false === $result) {
                throw new \Exception('Failed to edit pipeline');
            }

            return ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId);
        }

        /**
         * Marks a pipeline as the site-wide primary pipeline.
         *
         * This method updates the is_primary field of the pipeline table to mark the specified pipeline
         * as the primary pipeline. The updated_at field is set to the current UTC time.
         * The site-wide primary pipeline is the default for WordPress users who have not chosen their own
         * (see setPrimaryPipelineForUser).
         *
         * @param int $pipelineId The ID of the pipeline to mark as primary.
         * @return mixed The updated pipeline object.
         * @throws \Exception If the update operation fails.
         */
        public function markPipelineAsPrimary($pipelineId)
        {
            global $wpdb;

            $current_time_utc = ServiceLocator::get('TimeRepository')->getCurrentUTCTime();
            $result = $wpdb->query(
                $wpdb->prepare(
                    'UPDATE ' . TABLE_WP_QUICKTASKER_PIPELINES . '
                    SET is_primary = CASE
                        WHEN id = %d THEN 1
                        ELSE 0
                    END,
                    updated_at = %s',
                    $pipelineId,
                    $current_time_utc
                )
            );

            if (false === $result) {
                throw new \Exception('Failed to mark pipeline as primary');
            }

            return ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId);
        }

        /**
         * Resolves the primary board of a WordPress user.
         *
         * The user's own choice wins while that board exists. Otherwise the
         * site-wide primary board is used.
         *
         * @param int $userId The WordPress user ID.
         * @param array|null $allPipelines Every board as stored, when the caller has already loaded them.
         *                                 The primary board is then looked up in this list instead of the database,
         *                                 so it must still hold the site-wide is_primary values.
         * @return object|null The primary board, or null if there are no boards.
         */
        public function getPrimaryPipelineForUser($userId, $allPipelines = null)
        {
            $pipelineRepo = ServiceLocator::get('PipelineRepository');
            $chosenPipelineId = $pipelineRepo->getUserPrimaryPipelineId($userId);

            if (null !== $allPipelines) {
                $sitePrimaryPipeline = null;

                foreach ($allPipelines as $pipeline) {
                    if ((int) $pipeline->id === $chosenPipelineId) {
                        return $pipeline;
                    }

                    if ('1' === (string) $pipeline->is_primary) {
                        $sitePrimaryPipeline = $pipeline;
                    }
                }

                return $sitePrimaryPipeline;
            }

            if (null !== $chosenPipelineId) {
                $chosenPipeline = $pipelineRepo->getPipelineById($chosenPipelineId);

                if ($chosenPipeline) {
                    return $chosenPipeline;
                }
            }

            return $pipelineRepo->getActivePipeline();
        }

        /**
         * Sets the primary board of a WordPress user without affecting other users.
         *
         * @param int $userId The WordPress user ID.
         * @param int $pipelineId The ID of the board to make primary.
         * @return void
         * @throws PipelineMissingException If the board does not exist.
         */
        public function setPrimaryPipelineForUser($userId, $pipelineId)
        {
            $pipelineRepo = ServiceLocator::get('PipelineRepository');

            if (!$pipelineRepo->checkIfPipelineExists($pipelineId)) {
                throw new PipelineMissingException('No pipeline found with id ' . $pipelineId);
            }

            $pipelineRepo->setUserPrimaryPipelineId($userId, $pipelineId);
        }

        /**
         * Sets the is_primary flag of the given boards to match a user's primary board.
         *
         * @param array $pipelines The boards to mark.
         * @param object|null $primaryPipeline The user's primary board, from getPrimaryPipelineForUser().
         * @return array The same boards with is_primary set to '1' for the primary board and '0' for the rest.
         */
        public function markPrimaryPipeline($pipelines, $primaryPipeline)
        {
            $primaryPipelineId = $primaryPipeline ? (int) $primaryPipeline->id : null;

            foreach ($pipelines as $pipeline) {
                if (!$pipeline) {
                    continue;
                }

                $pipeline->is_primary = (int) $pipeline->id === $primaryPipelineId ? '1' : '0';
            }

            return $pipelines;
        }

        /**
         * Deletes a pipeline and its associated data from the database.
         *
         * This method performs the following actions:
         * 1. Retrieves the pipeline by its ID.
         * 2. Deletes the pipeline from the database.
         * 3. Deletes all stages associated with the pipeline.
         * 4. Deletes the location data of the pipeline stages.
         * 5. Deletes all non-archived tasks associated with the pipeline.
         *
         * @param int $pipelineId The ID of the pipeline to be deleted.
         * @return mixed The deleted pipeline object.
         * @throws \Exception If the pipeline is not found or any of the delete operations fail.
         */
        public function deletePipeline($pipelineId)
        {
            global $wpdb;

            $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($pipelineId);
            $pipelineIdToLoadAfterDelete = null;

            if (null === $pipeline) {
                throw new \Exception('Board not found');
            }

            $tasksToDelete = ServiceLocator::get('TaskRepository')->getTasks([
                'pipeline_id' => $pipelineId,
                'is_archived' => 0
            ]);
            $tasksToDelteIds = array_map(function ($task) {
                return $task->id;
            }, $tasksToDelete);

            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_PIPELINES, [
                'id' => $pipelineId
            ]);

            if (false === $result) {
                throw new \Exception('Failed to delete the board');
            }

            ServiceLocator::get('TaskService')->deleteTasksByTaskIds($tasksToDelteIds);
            ServiceLocator::get('CommentService')->deleteTasksComments($tasksToDelteIds);
            ServiceLocator::get('PipelineRepository')->deleteUserPrimaryPipelineReferences($pipelineId);

            // If the pipeline was the site-wide primary pipeline, mark another pipeline as primary
            if ($pipeline->is_primary) {
                $newActivePipeline = $wpdb->get_row('SELECT * FROM ' . TABLE_WP_QUICKTASKER_PIPELINES . ' WHERE is_primary = 0 ORDER BY id ASC LIMIT 1');

                if ($newActivePipeline) {
                    $this->markPipelineAsPrimary($newActivePipeline->id);
                }
            }

            $primaryPipelineAfterDelete = $this->getPrimaryPipelineForUser(get_current_user_id());

            if ($primaryPipelineAfterDelete) {
                $pipelineIdToLoadAfterDelete = $primaryPipelineAfterDelete->id;
            }

            return (object) [
                'deletedPipeline'  => $pipeline,
                'pipelineIdToLoad' => $pipelineIdToLoadAfterDelete,
            ];
        }
    }
}
