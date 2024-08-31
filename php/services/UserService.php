<?php

namespace WPQT\User;

use WPQT\User\UserRepository;

class UserService {
    protected $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }

    /**
     * Creates a new user.
     *
     * @param array $args The user data.
     *   - 'name'        (string) The name of the user.
     *   - 'description' (string) The description of the user.
     *
     * @return User The newly created user.
     *
     * @throws Exception If failed to create a user.
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
}