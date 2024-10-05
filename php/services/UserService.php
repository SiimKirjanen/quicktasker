<?php

namespace WPQT\User;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\User\UserRepository;
use WPQT\Hash\HashService;
use WPQT\WPQTException;
use WPQT\UserPage\UserPageRepository;

class UserService {
    protected $userRepository;
    protected $userPageRepository;
    protected $hashService;

    public function __construct() {
        $this->userRepository = new UserRepository();
        $this->hashService = new HashService();
    }

 
    /**
     * Creates a new user.
     *
     * @param array $args The user data.
     * @return User The newly created user.
     * @throws Exception If failed to create a user or user page.
     */
    public function createUser($args) {
        global $wpdb;

        $result = $wpdb->insert(
            TABLE_WP_QUICKTASKER_USERS,
            array(
                'name' => $args['name'],
                'description' => $args['description'],
            )
        );

        if (!$result) {
            throw new Exception('Failed to create a user');
        }

        $newUserId = $wpdb->insert_id;
        $pageHash = $this->hashService->generateUserPageHash($args['name']);

        $result2 = $wpdb->insert(
            TABLE_WP_QUICKTASKER_USER_PAGES,
            array(
                'user_id' => $newUserId,
                'page_hash' => $pageHash,
            )
        );

        if (!$result2) {
            throw new \Exception('Failed to create a user page');
        }

        return $this->userRepository->getUserById($newUserId);
    }

    /**
     * Updates a user's information.
     *
     * @param int $userId The ID of the user to be updated.
     * @param array $args The updated user data.
     *   - 'name' (string) The new name of the user.
     *   - 'description' (string) The new description of the user.
     * @return User The updated user object.
     * @throws Exception If the update operation fails.
     */
    public function editUser($userId, $args) {
        global $wpdb;

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USERS,
            array(
                'name' => $args['name'],
                'description' => $args['description'],
            ),
            array('id' => $userId)
        );

        if ($result === false) {
            throw new \Exception('Failed to update a user');
        }

        return $this->userRepository->getUserById($userId);
    }

    /**
     * Change the status of a user.
     *
     * @param int $userId The ID of the user.
     * @param int $status The new status of the user.
     * @return User The updated user object.
     * @throws Exception If failed to disable a user.
     */
    public function changeUserStatus($userId, $status) {
        global $wpdb;

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USERS,
            array(
                'is_active' => $status,
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new \Exception('Failed to disable a user');
        }

        return $this->userRepository->getUserById($userId);
    }

    /**
     * Deletes a user.
     *
     * @param int $userId The ID of the user to delete.
     * @return bool True if the user was successfully deleted, false otherwise.
     * @throws Exception If the user deletion fails.
     */
    public function deleteUser($userId) {
        global $wpdb;

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USERS,
            array(
                'deleted' => 1,
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new \Exception('Failed to delete a user');
        }

        return true;
    }

    /**
     * Check if a user has a password.
     *
     * @param int $userId The ID of the user.
     * @return bool Returns true if the user has a password, false otherwise.
     */
    public function checkIfUserHasPassword($userId) {
        global $wpdb;

        $result = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM " . TABLE_WP_QUICKTASKER_USERS . " WHERE id = %d AND password IS NOT NULL",
                $userId
            )
        );

        if ($result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Assigns a task to a user.
     *
     * @param int $userId The ID of the user.
     * @param int $taskId The ID of the task.
     * @return bool True if the user is successfully assigned to the task, false otherwise.
     * @throws \Exception If failed to assign a user to a task.
     */
    public function assignTaskToUser($userId, $taskId) {
        global $wpdb;

        $result = $wpdb->insert(
            TABLE_WP_QUICKTASKER_USER_TASK,
            array(
                'user_id' => $userId,
                'task_id' => $taskId,
            )
        );

        if (!$result) {
            throw new \Exception('Failed to assign a task to a user');
        }

        return true;
    }

    /**
     * Removes a user from a task.
     *
     * @param int $userId The ID of the user to be removed.
     * @param int $taskId The ID of the task from which the user will be removed.
     * @return bool Returns true if the user was successfully removed from the task, otherwise throws an exception.
     * @throws \Exception If failed to remove a user from a task.
     */
    public function removeTaskFromUser($userId, $taskId) {
        global $wpdb;

        $result = $wpdb->delete(
            TABLE_WP_QUICKTASKER_USER_TASK,
            array(
                'user_id' => $userId,
                'task_id' => $taskId,
            )
        );

        if (!$result) {
            throw new \Exception('Failed to remove a user from a task');
        }

        return true;
    }


    /**
     * Resets the password for a given user.
     *
     * This method will set the user's password to null and delete all user sessions.
     * It first checks if the user has a password set. If not, it throws an exception.
     * If the password reset or session deletion fails, it throws an exception.
     *
     * @param int $userId The ID of the user whose password is to be reset.
     * @return bool Returns true if the password and sessions are successfully reset.
     * @throws \Exception If the user does not have a password set, or if the password reset or session deletion fails.
     */
    public function resetUserPassword($userId) {
        global $wpdb;

        $hasPassword = $this->checkIfUserHasPassword($userId);

        if (!$hasPassword) {
            throw new \Exception('Cannot reset user password if it is not set');
        }

        $result = $wpdb->update(
            TABLE_WP_QUICKTASKER_USERS,
            array(
                'password' => null,
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new \Exception('Failed to reset a user password');
        }

        $result2 = $wpdb->delete(
            TABLE_WP_QUICKTASKER_USER_SESSIONS,
            array('user_id' => $userId)
        );

        if ($result2 === false) {
            throw new \Exception('Failed to reset a user sessions');
        }

        return true;
    }
}