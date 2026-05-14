<?php

namespace WPQT\PublicTask;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;
use WPQT\WPQTException;

if (!class_exists('WPQT\PublicTask\PublicTaskService')) {
    class PublicTaskService
    {
        /**
         * Asserts that a public task can be created on the given board.
         *
         * Verifies the board exists, that public task submissions are enabled,
         * and that the submission count has not reached its configured limit.
         *
         * @param int $pipelineId The ID of the board to check.
         * @return void
         * @throws WPQTException If the board is invalid, submissions are disabled,
         *                       or the submission limit has been reached.
         */
        public function ensureCanCreatePublicTask($pipelineId)
        {
            $pipelineId = (int) $pipelineId;
            if ($pipelineId <= 0) {
                throw new WPQTException('Invalid board', true);
            }

            $settings = ServiceLocator::get('SettingRepository')->getPublicTaskCreationSettings($pipelineId);
            if (null === $settings || empty($settings->allow_public_task_creation)) {
                throw new WPQTException('Public task submissions are disabled for this board', true);
            }

            $limit = (int) $settings->public_task_creation_limit;
            $count = (int) $settings->public_task_creation_count;
            if ($limit > 0 && $count >= $limit) {
                throw new WPQTException('Submission limit reached for this board', true);
            }
        }

        /**
         * Creates a public task submission on the given board.
         *
         * Places the task in the board's first stage, marks it as a public
         * submission, increments the board's submission counter, and logs the
         * event. Callers are responsible for invoking ensureCanCreatePublicTask
         * first to enforce submission rules.
         *
         * @param int $pipelineId The ID of the board the task belongs to.
         * @param array $args {
         *                    Task data.
         *
         * @type string $name        Task name. Required, will be trimmed.
         * @type string|null $description Optional task description.
         *                   }
         * @return object The created task object as returned by TaskService::createTask.
         */
        public function createPublicTask($pipelineId, $args)
        {
            $pipelineId = (int) $pipelineId;
            $name = trim((string) $args['name']);
            $description = isset($args['description']) ? (string) $args['description'] : null;

            $firstStage = ServiceLocator::get('StageRepository')->getFirstStage($pipelineId);
            $stageId = $firstStage ? (int) $firstStage->id : null;

            $task = ServiceLocator::get('TaskService')->createTask($stageId, [
                'name'                 => $name,
                'description'          => $description,
                'pipelineId'           => $pipelineId,
                'is_public_submission' => 1,
            ]);

            ServiceLocator::get('SettingRepository')->incrementPublicTaskCount($pipelineId);

            return $task;
        }

        /**
         * Returns the public submission status of a board.
         *
         * Used by the public block to decide whether to render the submission
         * form, a "closed" message, or a "limit reached" message.
         *
         * @param int $pipelineId The ID of the board.
         * @return object {
         * @type bool $enabled       Whether public submissions are enabled.
         * @type bool $limit_reached Whether the submission count has reached the configured limit.
         *            }
         * @throws WPQTException If the board ID is invalid.
         */
        public function getSubmissionStatus($pipelineId)
        {
            $pipelineId = (int) $pipelineId;
            if ($pipelineId <= 0) {
                throw new WPQTException('Invalid board', true);
            }
            $settings = ServiceLocator::get('SettingRepository')->getPublicTaskCreationSettings($pipelineId);
            $enabled = $settings && !empty($settings->allow_public_task_creation);
            $limit = $settings ? (int) $settings->public_task_creation_limit : 0;
            $count = $settings ? (int) $settings->public_task_creation_count : 0;
            $limitReached = $enabled && $limit > 0 && $count >= $limit;

            return (object) [
                'enabled'       => (bool) $enabled,
                'limit_reached' => (bool) $limitReached,
            ];
        }

        /**
         * Returns the tracking status for a publicly submitted task.
         *
         * Looks up a task by its hash and returns user-facing status fields
         * (name, description, current stage, board name, done flag). Only
         * returns tasks that were created via public submission.
         *
         * @param string $taskHash The opaque hash identifying the public task.
         * @return object {
         * @type string $name          Task name.
         * @type string|null $description   Task description.
         * @type bool $is_done       Whether the task is marked done.
         * @type string|null $stage_name    Current stage name, or null if unassigned.
         * @type string $pipeline_name Board name.
         * @type string $created_at    Task creation timestamp.
         *              }
         * @throws WPQTException If no public task matches the given hash.
         */
        public function getPublicTaskStatus($taskHash)
        {
            $task = ServiceLocator::get('TaskRepository')->getPublicTaskByHash($taskHash);

            if (!$task) {
                throw new WPQTException('Task not found', true);
            }

            return (object) [
                'name'          => $task->name,
                'description'   => $task->description,
                'is_done'       => (bool) $task->is_done,
                'stage_name'    => $task->stage_name,
                'pipeline_name' => $task->pipeline_name,
                'created_at'    => $task->created_at,
            ];
        }
    }
}
