<?php

use WPQT\Response\ApiResponse;
use WPQT\UserPage\UserPageService;
use WPQT\UserPage\UserPageRepository;
use WPQT\Password\PasswordService;

function WPQTverifyUserPageHash($hash) {
   $userPageService = new UserPageService();

    if( !$userPageService->checkIfUserPageHashExists($hash) ) {
        throw new Exception('User page hash does not exist');
    }
    return true;
}

add_action('rest_api_init', 'wpqt_register_user_page_api_routes');
function wpqt_register_user_page_api_routes() {
    register_rest_route('wpqt/v1', 'user-page/(?P<hash>[a-zA-Z0-9]+)/status', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    WPQTverifyUserPageHash($data['hash']);
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $pageUser = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($pageUser);

                    $userPageStatus = (object)[
                        'isActiveUser' => $pageUser->is_active,
                        'setupCompleted' => $hasSetupCompleted,
                    ];

                    return new WP_REST_Response((new ApiResponse(true, array(), $userPageStatus))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));
    register_rest_route('wpqt/v1', 'user-page/(?P<hash>[a-zA-Z0-9]+)/setup', array(
        'methods' => 'POST',
        'callback' => function( $data ) {
                try {
                    WPQTverifyUserPageHash($data['hash']);
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $passwordService = new PasswordService();

                    $pageUser = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($pageUser);

                    if( $hasSetupCompleted ) {
                        throw new Exception('User page setup has already been completed');
                    }
                    $passwordService->storePassword($pageUser->id, $data['password']);
                    
                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));
}