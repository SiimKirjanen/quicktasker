<?php

namespace WPQT\Pipeline;

if (!defined('ABSPATH')) {
    exit;
}
use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;
use WPQT\Stage\StageRepository;
use WPQT\Task\TaskRepository;
use WPQT\User\UserRepository;

if (!class_exists('WPQT\Pipeline\PipelineRepository')) {
    class PipelineRepository
    {
        /**
         * Retrieves all pipelines from the database.
         *
         * @return array The list of pipelines.
         */
        public function getPipelines()
        {
            global $wpdb;

            return $wpdb->get_results(
                'SELECT * FROM ' . TABLE_WP_QUICKTASKER_PIPELINES,
            );
        }

        /**
         * Retrieves a pipeline by its ID from the database.
         *
         * @param int $id The ID of the pipeline.
         * @return object|null The pipeline object if found, null otherwise.
         */
        public function getPipelineById($id)
        {
            global $wpdb;

            return $wpdb->get_row($wpdb->prepare(
                'SELECT * FROM ' . TABLE_WP_QUICKTASKER_PIPELINES . '
                WHERE id = %d',
                $id
            ));
        }

        /**
         * Retrieves the site-wide primary pipeline from the database.
         *
         * This is the default primary board for WordPress users who have not chosen their own.
         *
         * @return object|null The active pipeline object if found, null otherwise.
         */
        public function getActivePipeline()
        {
            global $wpdb;

            return $wpdb->get_row(
                'SELECT * FROM ' . TABLE_WP_QUICKTASKER_PIPELINES . ' WHERE is_primary = 1'
            );
        }

        /**
         * Retrieves the board a WordPress user has chosen as their primary board.
         *
         * @param int $userId The WordPress user ID.
         * @return int|null The chosen board ID, or null if the user has not chosen one.
         */
        public function getUserPrimaryPipelineId($userId)
        {
            $pipelineId = get_user_option(WP_QUICKTASKER_USER_PRIMARY_PIPELINE_OPTION, $userId);

            return $pipelineId ? (int) $pipelineId : null;
        }

        /**
         * Stores the board a WordPress user has chosen as their primary board.
         *
         * @param int $userId The WordPress user ID.
         * @param int $pipelineId The board ID.
         * @return void
         */
        public function setUserPrimaryPipelineId($userId, $pipelineId)
        {
            update_user_option($userId, WP_QUICKTASKER_USER_PRIMARY_PIPELINE_OPTION, (string) $pipelineId);
        }

        /**
         * Removes the primary board choice of every WordPress user who picked the given board.
         *
         * @param int $pipelineId The board ID.
         * @return void
         */
        public function deleteUserPrimaryPipelineReferences($pipelineId)
        {
            global $wpdb;

            delete_metadata(
                'user',
                0,
                $wpdb->get_blog_prefix() . WP_QUICKTASKER_USER_PRIMARY_PIPELINE_OPTION,
                (string) $pipelineId,
                true
            );
        }

        /**
         * Checks if a pipeline with the given ID exists in the database.
         *
         * @param int $pipelineId The ID of the pipeline to check.
         * @return bool True if the pipeline exists, false otherwise.
         */
        public function checkIfPipelineExists($pipelineId)
        {
            global $wpdb;

            $result = $wpdb->get_var($wpdb->prepare(
                'SELECT COUNT(*) FROM ' . TABLE_WP_QUICKTASKER_PIPELINES . ' WHERE id = %d',
                $pipelineId
            ));

            return $result > 0;
        }

        /**
         * Retrieves the full pipeline with stages and tasks by pipeline ID.
         *
         * @param int $pipelineId The ID of the pipeline.
         * @throws PipelineMissingException If the pipeline with the given ID does not exist.
         * @return Pipeline The full pipeline object with stages and tasks.
         */
        public function getFullPipeline($pipelineId)
        {
            $stageRepository = new StageRepository();
            $taskRepository = new TaskRepository();
            $userRepository = new UserRepository();

            // Fetch the pipeline
            $pipeline = $this->getPipelineById($pipelineId);

            if (!$pipeline) {
                throw new PipelineMissingException("Pipeline with ID $pipelineId not found.");
            }

            // Fetch all stages for the pipeline
            $pipelineStages = $stageRepository->getStagesByPipelineId($pipelineId);

            // Fetch all tasks for the stages
            $stageIds = array_map(function ($stage) {
                return $stage->id;
            }, $pipelineStages);
            $tasks = $taskRepository->getTasksByStageIds($stageIds);

            // Fetch all assigned users for the tasks
            $taskIds = array_map(function ($task) {
                return $task->id;
            }, $tasks);
            $assignedUsers = $userRepository->getAssignedUsersByTaskIds($taskIds);
            $assignedWPUsers = $userRepository->getAssignedWPUsersByTaskIds($taskIds);
            $assignedLabels = ServiceLocator::get('LabelRepository')->getAssignedLabelsByTaskIds($taskIds);

            // Organize tasks under their respective stages
            $tasksByStage = [];
            foreach ($tasks as $task) {
                $tasksByStage[$task->stage_id][] = $task;
            }

            // Organize assigned users under their respective tasks
            $usersByTask = [];
            foreach ($assignedUsers as $user) {
                $usersByTask[$user->task_id][] = $user;
            }

            // Organize assigned WP users under their respective tasks
            $wpUsersByTask = [];
            foreach ($assignedWPUsers as $user) {
                $wpUsersByTask[$user->task_id][] = $user;
            }

            // Organize assigned labels under their respective tasks
            $labelsByTask = [];
            foreach ($assignedLabels as $label) {
                $labelsByTask[$label->entity_id][] = $label;
            }

            // Assign tasks and users to stages. Assign labels to tasks.
            foreach ($pipelineStages as $stage) {
                $stage->tasks = isset($tasksByStage[$stage->id]) ? $tasksByStage[$stage->id] : [];

                foreach ($stage->tasks as $task) {
                    $task->assigned_users = isset($usersByTask[$task->id]) ? $usersByTask[$task->id] : [];
                    $task->assigned_wp_users = isset($wpUsersByTask[$task->id]) ? $wpUsersByTask[$task->id] : [];
                    $task->assigned_labels = isset($labelsByTask[$task->id]) ? $labelsByTask[$task->id] : [];
                }
            }

            $pipeline->stages = $pipelineStages;

            return $pipeline;
        }
    }
}
