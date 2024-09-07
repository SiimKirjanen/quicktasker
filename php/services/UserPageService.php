<?php
namespace WPQT\UserPage;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\UserPage\UserPageRepository;
use WPQT\User\UserService;

class UserPageService {
    protected $userPageRepository;
    protected $userService;

    public function __construct() {
        $this->userPageRepository = new UserPageRepository();
        $this->userService = new UserService();
    }
    
    /**
     * Check if a user page hash exists.
     *
     * @param string $pageHash The hash of the user page.
     * @return bool Returns true if the user page hash exists, false otherwise.
     */
    public function checkIfUserPageHashExists($pageHash) {
        $userPage = $this->userPageRepository->getUserPageByHash($pageHash);

        return $userPage !== null;
    }

    /**
     * Checks if the user page setup is completed.
     *
     * @param object $pageUser The user page object.
     * @return bool Returns true if the user page setup is completed, false otherwise.
     */
    public function checkIfUserPageSetupCompleted($pageUser) {
        $hasPassword = $this->userService->checkIfUserHasPassword($pageUser->user_id);

        if( !$hasPassword ) {
            return false;
        }
        return true;
    }
}