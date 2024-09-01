<?php
namespace WPQT\UserPage;
use WPQT\UserPage\UserPageRepository;

class UserPageService {
    protected $userPageRepository;

    public function __construct() {
        $this->userPageRepository = new UserPageRepository();
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
}