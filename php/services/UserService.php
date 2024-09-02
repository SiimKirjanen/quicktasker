<?php

namespace WPQT\User;

use WPQT\User\UserRepository;
use WPQT\Hash\HashService;

class UserService {
    protected $userRepository;
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
            TABLE_WP_QUICK_TASKS_USERS,
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
            TABLE_WP_QUICK_TASKS_USER_PAGES,
            array(
                'user_id' => $newUserId,
                'page_hash' => $pageHash,
            )
        );

        if (!$result2) {
            throw new Exception('Failed to create a user page');
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
            TABLE_WP_QUICK_TASKS_USERS,
            array(
                'name' => $args['name'],
                'description' => $args['description'],
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new Exception('Failed to update a user');
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
            TABLE_WP_QUICK_TASKS_USERS,
            array(
                'is_active' => $status,
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new Exception('Failed to disable a user');
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
            TABLE_WP_QUICK_TASKS_USERS,
            array(
                'deleted' => 1,
            ),
            array('id' => $userId)
        );

        if (!$result) {
            throw new Exception('Failed to delete a user');
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
                "SELECT COUNT(*) FROM " . TABLE_WP_QUICK_TASKS_USERS . " WHERE id = %d AND password IS NOT NULL",
                $userId
            )
        );

        if ($result > 0) {
            return true;
        } else {
            return false;
        }
    }
}