<?php
namespace WPQT\Task;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\ServiceLocator;

if ( ! class_exists( 'WPQT\Task\TaskRepository' ) ) {
    class TaskRepository {

        /**
         * Retrieves tasks from the database.
         *
         * This function fetches tasks from the database based on the provided arguments.
         * It can filter tasks by their archived status and pipeline ID.
         *
         * @param array $args Optional. An array of arguments to modify the query.
         * 
         * @return array An array of tasks. Each task may include additional information like task order and stage ID.
         */
        public function getTasks($args = []) {
            global $wpdb;

            $defaults = array(
                'is_archived' => null,
                'pipeline_id' => null,
            );
            $args = wp_parse_args($args, $defaults);
            $query_args = [];
        
            $sql = "SELECT a.*, b.task_order, b.stage_id, c.name as pipeline_name
                FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b ON a.id = b.task_id
                LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON a.pipeline_id = c.id
                WHERE 1=1";

            if ($args['is_archived'] !== null) {
                $sql .= " AND a.is_archived = %d";
                $query_args[] = $args['is_archived'];
            }
            if ($args['pipeline_id'] !== null) {
                $sql .= " AND a.pipeline_id = %d";
                $query_args[] = $args['pipeline_id'];
            }

            $sql .= " ORDER BY a.created_at DESC";

            if ( !empty($query_args) ) {
                return $wpdb->get_results($wpdb->prepare($sql, $query_args));
            } else {
                return $wpdb->get_results($sql);
            }
        }

        /**
         * Retrieves archived tasks from the database.
         *
         * This function fetches tasks that are marked as archived from the database.
         * Optionally, it can include assigned users and labels for each task.
         *
         * @param bool $addAssignedUsers. Whether to include assigned users for each task. Default false.
         * @param bool $addAssignedLabels Whether to include assigned labels for each task. Default false.
         * @param array $args Optional. An array of arguments to modify the query.
         * 
         * @return array An array of archived tasks. Each task may include assigned users if $addAssignedUsers is true.
         */
        public function getArchivedTasks($addAssignedUsers = false, $addAssignedLabels = false, $args = []) {
            global $wpdb;

            $defaults = array(
                'limit' => null,
                'search' => null,
                'pipelineId' => null,
                'status' => null,
                'order' => 'DESC',
            );
            $args = wp_parse_args($args, $defaults);
            $query_args = [];
            $tasks = [];
            $sql = "SELECT a.*, b.task_order, b.stage_id, c.name as pipeline_name
                        FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                        LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b ON a.id = b.task_id
                        LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON a.pipeline_id = c.id
                        WHERE a.is_archived = 1";

            if ( $args['search'] !== null ) {
                $sql .= " AND (a.name LIKE %s OR a.description LIKE %s)";
                $search_term = '%' . $wpdb->esc_like($args['search']) . '%';
                $query_args[] = $search_term;
                $query_args[] = $search_term;
            }

            if ( $args['pipelineId'] !== null ) {
                $sql .= " AND a.pipeline_id = %d";
                $query_args[] = $args['pipelineId'];
            }

            if ( $args['status'] !== null ) {
                $sql .= " AND a.is_done = %s";
                $query_args[] = $args['status'];
            }

            if ( !empty($args['order']) && in_array(strtoupper($args['order']), ['ASC', 'DESC']) ) {
                $sql .= " ORDER BY a.created_at " . strtoupper($args['order']);
            } else {
                $sql .= " ORDER BY a.created_at DESC";
            }

            if ($args['limit'] !== null) {
                $sql .= " LIMIT %d";
                $query_args[] = $args['limit'];
            }
            
            $tasks = !empty($query_args) 
                ? $wpdb->get_results($wpdb->prepare($sql, $query_args))
                : $wpdb->get_results($sql);

            $taskIds = array_map(function($task) {
                return $task->id;
            }, $tasks);
        
            if ($addAssignedUsers) {
                $userRepository = ServiceLocator::get('UserRepository');
                $assignedUsers = $userRepository->getAssignedUsersByTaskIds($taskIds);
                $assignedWPUsers = $userRepository->getAssignedWPUsersByTaskIds($taskIds);

                $usersByTask = [];
                foreach ($assignedUsers as $user) {
                    $usersByTask[$user->task_id][] = $user;
                }
                $wpUsersByTask = [];
                foreach ($assignedWPUsers as $user) {
                    $wpUsersByTask[$user->task_id][] = $user;
                }

                foreach ($tasks as $task) {
                    $task->assigned_users = isset($usersByTask[$task->id]) ? $usersByTask[$task->id] : [];
                    $task->assigned_wp_users = isset($wpUsersByTask[$task->id]) ? $wpUsersByTask[$task->id] : [];
                }
            }

            if ($addAssignedLabels) {
                $addedLabels = ServiceLocator::get('LabelRepository')->getAssignedLabelsByTaskIds($taskIds);

                $labelsByTask = [];
                foreach ($addedLabels as $label) {
                    $labelsByTask[$label->entity_id][] = $label;
                }

                foreach ($tasks as $task) {
                    $task->assigned_labels = isset($labelsByTask[$task->id]) ? $labelsByTask[$task->id] : [];
                }
            }
        
            return $tasks;
        }

        /**
         * Retrieves archived tasks that have no associated board.
         *
         * This function fetches tasks that are marked as archived and do not have an associated board.
         * It returns the results as an array of task objects.
         *
         * @return array An array of archived tasks that have no associated board.
         */
        public function getOrphanedArchivedTasks() {
            global $wpdb;

            $sql = "SELECT a.*, b.name as pipeline_name
                    FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS b ON a.pipeline_id = b.id
                    WHERE a.is_archived = 1 AND b.name IS NULL";

            return $wpdb->get_results($sql);
        }

        /**
         * Retrieves a task by its ID.
         *
         * @param int $id The ID of the task to retrieve.
         * @param bool $addAssignedUsers Whether to include assigned users in the task object.
         * @return object|null The task object if found, null otherwise.
         */
        public function getTaskById($id, $addAssignedUsers = false) {
            global $wpdb;

            $task = $wpdb->get_row( $wpdb->prepare(
                "SELECT a.*, b.task_order, b.stage_id FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b
                ON a.id = b.task_id
                WHERE a.id = %d",
                $id
            ) );

            if ( $task && $addAssignedUsers) {
                $users = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskId($task->id);
                $task->assigned_users = $users;
            }

            return $task;
        }

        /**
         * Retrieves a task by its hash value.
         *
         * This function fetches a task from the database using the provided hash value.
         * Optionally, it can also fetch and include the users assigned to the task.
         *
         * @param string $hash The hash value of the task to retrieve.
         * @param bool $addAssignedUsers Optional. Whether to include assigned users in the result. Default false.
         * @param string $userObjectFiltering Optional. The user object filtering to apply when fetching assigned users. Default WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE.
         * @return object|null The task object if found, null otherwise. If $addAssignedUsers is true, the task object will include an 'assigned_users' property containing the assigned users.
         */
        public function getTaskByHash($hash, $addAssignedUsers = false, $userObjectFiltering = WP_QUICKTASKER_WP_USER_OBJECT_FILTER_ADMIN_FE) {
            global $wpdb;

            $task = $wpdb->get_row( $wpdb->prepare(
                "SELECT a.*, b.task_order, b.stage_id, c.name as pipeline_name FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b ON a.id = b.task_id
                LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON a.pipeline_id = c.id
                WHERE a.task_hash = %s",
                $hash
            ) );

            if ( $task && $addAssignedUsers) {
                $task->assigned_users = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskId($task->id);
                $task->assigned_wp_users = ServiceLocator::get('UserRepository')->getAssignedWPUsersByTaskIds([$task->id], $userObjectFiltering);
            }

            return $task;
        }

        /**
         * Retrieves tasks by stage ID.
         *
         * @param int $stageId The ID of the stage.
         * @return array The array of tasks retrieved from the database.
         */
        public function getTasksByStageId($stageId) {
            global $wpdb;

            return $wpdb->get_results( $wpdb->prepare(
                "SELECT a.*, b.task_order, b.stage_id FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b
                ON a.id = b.task_id
                WHERE b.stage_id = %d
                AND a.is_archived = 0
                ORDER BY b.task_order",
                $stageId
            ) );
        }

        /**
         * Retrieves the task order based on the task ID and stage ID.
         *
         * @param int $taskId The ID of the task.
         * @param int $stageId The ID of the stage.
         * @return object|null The task order object if found, null otherwise.
         */
        public function getTaskOrder($taskId, $stageId) {
            global $wpdb;

            return $wpdb->get_row( $wpdb->prepare(
                "SELECT * FROM ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ."
                WHERE task_id = %d AND stage_id = %d",
                $taskId,
                $stageId
            ) );
        }

        /**
         * Retrieves tasks by their stage IDs.
         *
         * This function fetches tasks from the database that are associated with the given stage IDs.
         * It joins the tasks table with the tasks location table to get the stage IDs and orders the results by task order.
         *
         * @param array $stageIds An array of stage IDs to filter the tasks.
         * @return array An array of task objects that match the given stage IDs.
         */
        public function getTasksByStageIds($stageIds) {
            global $wpdb;

            if ( empty($stageIds) ) {
                return [];
            }

            // Prepare the placeholders for the IN clause
            $placeholders = implode(',', array_fill(0, count($stageIds), '%d'));

            // Prepare the SQL query
            $sql = $wpdb->prepare(
                "SELECT a.*, b.stage_id 
                FROM " . TABLE_WP_QUICKTASKER_TASKS . " AS a
                INNER JOIN " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " AS b
                ON a.id = b.task_id
                WHERE b.stage_id IN ($placeholders)
                AND a.is_archived = 0
                ORDER BY b.task_order",
                $stageIds
            );

            // Execute the query and get the results
            $results = $wpdb->get_results($sql);

            return $results;
        }

        /**
         * Retrieves tasks assigned to a specific user.
         *
         * @param int $userId The ID of the user.
         * @return array The tasks assigned to the user.
         */
        public function getTasksAssignedToUser($userId, $addAssignedUsers = false) {
            global $wpdb;
        
            $tasks = $wpdb->get_results($wpdb->prepare(
                "SELECT b.*, c.name as pipeline_name FROM " . TABLE_WP_QUICKTASKER_USER_TASK . " AS a
                LEFT JOIN " . TABLE_WP_QUICKTASKER_TASKS . " AS b ON a.task_id = b.id
                LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON b.pipeline_id = c.id
                WHERE a.user_id = %d
                AND a.user_type = 'quicktasker'
                AND b.is_archived = 0
                ORDER BY b.created_at DESC",
                $userId
            ));
        
            if ($addAssignedUsers) {
                foreach ($tasks as $task) {
                    $users = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskId($task->id);
                    $task->assigned_users = $users;
                    $task->assigned_wp_users = ServiceLocator::get('UserRepository')->getAssignedWPUsersByTaskIds([$task->id]);
                }
            }
        
            return $tasks;
        }

        /**
         * Retrieves tasks that are assignable to a specific user.
         *
         * @param int $userId The ID of the user.
         * @return array The list of tasks that are assignable to the user.
         */
        public function getTasksAssignableToUser($userId) {
            global $wpdb;
        
            return $wpdb->get_results( $wpdb->prepare(
                "SELECT a.*, c.name as pipeline_name FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                LEFT JOIN " . TABLE_WP_QUICKTASKER_USER_TASK . " AS b ON a.id = b.task_id
                LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON a.pipeline_id = c.id
            
                WHERE b.task_id IS NULL AND a.is_archived = 0 AND a.free_for_all = 1 ORDER BY a.created_at DESC",
            ) );
        }

        /**
         * Retrieves tasks for export based on the provided pipeline ID, search filter, and archived status.
         *
         * @param int|null $pipelineId The ID of the pipeline to filter tasks by.
         * @param string $searchFilter The search filter to apply to task titles and descriptions.
         * @param bool $includeArchivedTasks Whether to include archived tasks in the results.
         * @return array An array of tasks that match the criteria.
         */
        public function getTasksForExport($pipelineId, $searchFilter, $includeArchivedTasks) {
            global $wpdb;

            $sql = "SELECT a.*, b.task_order, b.stage_id, c.name as pipeline_name, d.name as stage_name
                    FROM ". TABLE_WP_QUICKTASKER_TASKS . " AS a
                    LEFT JOIN ". TABLE_WP_QUICKTASKER_TASKS_LOCATION ." AS b ON a.id = b.task_id
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINES . " AS c ON a.pipeline_id = c.id
                    LEFT JOIN " . TABLE_WP_QUICKTASKER_PIPELINE_STAGES . " AS d ON b.stage_id = d.id
                    WHERE 1=1";
           $args = [];

            if ( !empty($pipelineId )) {
                $sql .= " AND a.pipeline_id = %d";
                $args[] = $pipelineId;
            }

            if ( !$includeArchivedTasks ) {
                $sql .= " AND a.is_archived = 0";
            }

            if ( !empty($searchFilter) ) {
                $sql .= " AND (a.name LIKE %s OR a.description LIKE %s)";
                $searchPattern = '%' . $wpdb->esc_like($searchFilter) . '%';
                $args[] = $searchPattern;
                $args[] = $searchPattern;
            }

            $sql .= " ORDER BY a.created_at DESC";
            $query = count($args) > 0 ? $wpdb->prepare($sql, $args) : $sql;
            $tasks = $wpdb->get_results($query);

            if ( !empty($tasks) ) {
                $taskIds = array_map(function($task) {
                    return $task->id;
                }, $tasks);
                
                $assignedUsers = ServiceLocator::get('UserRepository')->getAssignedUsersByTaskIds($taskIds);
                $assignedWPUsers = ServiceLocator::get('UserRepository')->getAssignedWPUsersByTaskIds($taskIds);
                $assignedLabels = ServiceLocator::get('LabelRepository')->getAssignedLabelsByTaskIds($taskIds);
                $customFields = ServiceLocator::get('CustomFieldRepository')->getActiveCustomFieldsForTasks($taskIds);
                
                $usersByTask = [];
                foreach ($assignedUsers as $user) {
                    $usersByTask[$user->task_id][] = $user;
                }
                
                $wpUsersByTask = [];
                foreach ($assignedWPUsers as $user) {
                    $wpUsersByTask[$user->task_id][] = $user;
                }

                $labelsByTask = [];
                foreach ($assignedLabels as $label) {
                    $labelsByTask[$label->entity_id][] = $label;
                }
                
                foreach ($tasks as $task) {
                    $task->assigned_users = isset($usersByTask[$task->id]) ? $usersByTask[$task->id] : [];
                    $task->assigned_wp_users = isset($wpUsersByTask[$task->id]) ? $wpUsersByTask[$task->id] : [];
                    $task->assigned_labels = isset($labelsByTask[$task->id]) ? $labelsByTask[$task->id] : [];
                    $task->custom_fields = isset($customFields[$task->id]) ? $customFields[$task->id] : [];
                }        
            }

            return $tasks;
        }
    }
}