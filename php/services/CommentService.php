<?php

namespace WPQT\Comment;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;
use WPQT\WPQTException;

if (!class_exists('WPQT\Comment\CommentService')) {
    class CommentService
    {
        /**
         * Creates a new comment in the database.
         *
         * @param int $typeId The ID of the type associated with the comment.
         * @param string $type The type of the comment.
         * @param array $args Optional arguments for the comment.
         *
         * @return mixed The created comment object.
         *
         * @throws \Exception If the comment could not be added to the database.
         */
        public function createComment($typeId, $type, $args = [])
        {
            global $wpdb;

            $defaults = [
                'isPrivate'  => false,
                'text'       => '',
                'authorType' => WP_QT_QUICKTASKER_USER_TYPE,
                'createdAt'  => ServiceLocator::get('TimeRepository')->getCurrentUTCTime(),
            ];
            $args = wp_parse_args($args, $defaults);

            if (empty($typeId) || empty($type) || empty($args['authorId']) || empty($args['authorType'])) {
                throw new WPQTException('Required fields are missing for creating a comment');
            }

            $result = $wpdb->insert(TABLE_WP_QUICKTASKER_COMMENTS, [
                'type_id'     => $typeId,
                'type'        => $type,
                'is_private'  => $args['isPrivate'],
                'text'        => $args['text'],
                'author_id'   => $args['authorId'],
                'author_type' => $args['authorType'],
                'created_at'  => $args['createdAt'],
            ]);

            if (false === $result) {
                throw new WPQTException('Failed to add the comment');
            }

            $commentId = $wpdb->insert_id;

            return ServiceLocator::get('CommentRepository')->getCommentById($commentId);
        }

        /**
         * Run the follow-up actions that should happen when a task comment is
         * created: trigger matching automations, dispatch webhooks, and notify
         * the task's assignees.
         *
         * @param object $task The task the comment was added to.
         * @param object $newComment The freshly-created comment object.
         * @param int $authorId The WP user ID of the comment author (used to skip self-notification).
         * @return array Automation execution results, suitable for returning to the client.
         */
        public function handleTaskCommentCreated($task, $newComment, $authorId)
        {
            $isPrivate = (bool) $newComment->is_private;
            $automationTrigger = $isPrivate
                ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED
                : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED;

            $automationExecutionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                $task->pipeline_id,
                $task->id,
                WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                $automationTrigger,
                $newComment
            );

            ServiceLocator::get('WebhookService')->handleWebhooks(
                $task->pipeline_id,
                [
                    [
                        'data' => [
                            'relatedObject' => $task,
                            'extraData'     => [
                                'text'        => $newComment->text,
                                'is_private'  => $newComment->is_private,
                                'author_id'   => $newComment->author_id,
                                'author_type' => $newComment->author_type,
                            ],
                        ],
                        'webhookData' => [
                            'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                            'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMMENT_ADDED,
                        ]
                    ]
                ]
            );

            try {
                ServiceLocator::get('NotificationService')->notifyTaskAssignees(
                    $task->pipeline_id,
                    $task->id,
                    $isPrivate
                        /* translators: %s = task name */
                        ? __('A private comment was added to task "%s"', 'quicktasker')
                        /* translators: %s = task name */
                        : __('A public comment was added to task "%s"', 'quicktasker'),
                    $task->name,
                    \WPQT\Notification\NotificationService::TYPE_COMMENT_ADDED,
                    $authorId
                );
            } catch (\Throwable $notificationError) {
                error_log('Failed to create task comment notification: ' . $notificationError->getMessage());
            }

            return $automationExecutionResults;
        }

        /**
         * Deletes comments by type ID and type.
         *
         * @param int $typeId The ID of the type associated with the comments.
         * @param string $type The type of the comments.
         *
         * @return int The number of rows deleted.
         *
         * @throws WPQTException If there is an error deleting the comments.
         */
        public function deleteCommentsByTypeIdAndType($typeId, $type)
        {
            global $wpdb;

            $result = $wpdb->delete(TABLE_WP_QUICKTASKER_COMMENTS, [
                'type_id' => $typeId,
                'type'    => $type,
            ]);

            if (false === $result) {
                throw new WPQTException('Failed to delete the comments');
            }

            return $result;
        }

        /**
         * Deletes comments for tasks by their IDs.
         *
         * @param array $taskIds An array of task IDs for which comments should be deleted.
         *
         * @return int The number of rows deleted.
         *
         * @throws WPQTException If there is an error deleting the comments.
         */
        public function deleteTasksComments($taskIds)
        {
            if (empty($taskIds)) {
                return 0;
            }

            global $wpdb;

            $placeholders = implode(',', array_fill(0, count($taskIds), '%d'));
            $query = $wpdb->prepare(
                'DELETE FROM ' . TABLE_WP_QUICKTASKER_COMMENTS . " WHERE type_id IN ($placeholders) AND type = 'task'",
                $taskIds
            );

            $result = $wpdb->query($query);

            if (false === $result) {
                throw new WPQTException('Failed to delete task comments');
            }

            return $results;
        }
    }
}
