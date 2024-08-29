<?php

namespace WPQT\User;

use WPQT\User\UserRepository;

class UserService {
    protected $userRepository;

    public function __construct() {
        $this->userRepository = new UserRepository();
    }
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
}