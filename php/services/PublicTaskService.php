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

            if (!empty($settings->require_logged_in_user) && !is_user_logged_in()) {
                throw new WPQTException('Login required to submit a task to this board', true);
            }

            $limit = max(1, (int) $settings->public_task_creation_limit);
            $count = (int) $settings->public_task_creation_count;
            if ($count >= $limit) {
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
                'created_by_id'        => isset($args['created_by_id']) ? $args['created_by_id'] : null,
                'created_by_type'      => isset($args['created_by_type']) ? $args['created_by_type'] : null,
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
            $limit = $settings ? max(1, (int) $settings->public_task_creation_limit) : 1;
            $count = $settings ? (int) $settings->public_task_creation_count : 0;
            $limitReached = $enabled && $count >= $limit;
            $requiresLogin = $enabled && !empty($settings->require_logged_in_user);
            $loginRequired = $requiresLogin && !is_user_logged_in();

            return (object) [
                'enabled'        => (bool) $enabled,
                'limit_reached'  => (bool) $limitReached,
                'requires_login' => (bool) $requiresLogin,
                'login_required' => (bool) $loginRequired,
            ];
        }

        /**
         * Returns tracking statuses for a batch of public task hashes.
         *
         * Used by the public block to fetch every tracked submission in a
         * single request. Hashes that match no public task (deleted, archived,
         * or never existed) map to null.
         *
         * @param string[] $hashes List of task hashes.
         * @return array<string, object|null> Map keyed by hash.
         */
        public function getPublicTaskStatuses($hashes)
        {
            $result = [];
            foreach ($hashes as $hash) {
                $result[$hash] = null;
            }

            if (empty($hashes)) {
                return $result;
            }

            $tasks = ServiceLocator::get('TaskRepository')->getPublicTasksByHashes($hashes);
            foreach ($tasks as $task) {
                $result[$task->task_hash] = (object) [
                    'name'          => $task->name,
                    'description'   => $task->description,
                    'is_done'       => (bool) $task->is_done,
                    'stage_name'    => $task->stage_name,
                    'pipeline_name' => $task->pipeline_name,
                    'created_at'    => $task->created_at,
                ];
            }

            return $result;
        }
    }
}
