<?php
namespace WPQT\Permission;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\User\UserService;
use WPQT\Task\TaskRepository;

class PermissionService {

    protected $userService;
    protected $taskRepository;

    public function __construct() {
        $this->userService = new UserService();
        $this->taskRepository = new TaskRepository();
    }
    /**
     * Checks if the current user has the required permissions to access the private API.
     *
     * @return bool Returns true if the current user has the required permissions, false otherwise.
     */
    public static function hasRequiredPermissionsForPrivateAPI() {
        return current_user_can( 'manage_options' );
    }

    /**
     * Checks if a user is allowed to view a task.
     *
     * @param int $userId The ID of the user.
     * @param int $taskId The ID of the task.
     * @return bool Returns true if the user is allowed to view the task, false otherwise.
     */
    public function checkIfUserIsAllowedToViewTask($userId, $taskId) {
        global $wpdb;

        $isAssignedToUser = $this->userService->checkIfUserHasAssignedToTask($userId, $taskId);
        $task = $this->taskRepository->getTaskById($taskId);

        if ($isAssignedToUser === true || $task->free_for_all === '1') {
            return true;
        } else {
            return false;
        }
    }

    public function checkIfUserIsAllowedToEditTask($userId, $taskId) {
        global $wpdb;

        $isAssignedToUser = $this->userService->checkIfUserHasAssignedToTask($userId, $taskId);
        $task = $this->taskRepository->getTaskById($taskId);

        if ($isAssignedToUser === true || $task->free_for_all === '1') {
            return true;
        } else {
            return false;
        }
    }
}