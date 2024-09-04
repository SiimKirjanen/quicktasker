<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Response\ApiResponse;
use WPQT\UserPage\UserPageService;
use WPQT\UserPage\UserPageRepository;
use WPQT\Password\PasswordService;
use WPQT\Session\SessionService;
use WPQT\Nonce\NonceService;

function WPQTverifyUserPageHash($hash) {
   $userPageService = new UserPageService();

    if( !$userPageService->checkIfUserPageHashExists($hash) ) {
        throw new Exception('User page hash does not exist');
    }
    return true;
}

function WPQTverifyUserApiNonce($data) {
    $nonce = $data->get_header('X-WPQT-USER-API-Nonce');
    NonceService::verifyNonce($nonce, WPQT_USER_API_NONCE);

    return true;
}

add_action('rest_api_init', 'wpqt_register_user_page_api_routes');
function wpqt_register_user_page_api_routes() {
    register_rest_route('wpqt/v1', 'user-page/(?P<hash>[a-zA-Z0-9]+)/status', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    WPQTverifyUserApiNonce($data);
                    WPQTverifyUserPageHash($data['hash']);
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($userPage);

                    $userPageStatus = (object)[
                        'isActiveUser' => $userPage->is_active,
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
                    WPQTverifyUserApiNonce($data);
                    WPQTverifyUserPageHash($data['hash']);
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $passwordService = new PasswordService();

                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($userPage);

                    if( $hasSetupCompleted ) {
                        throw new Exception('User page setup has already been completed');
                    }
                    $passwordService->storePassword($userPage->user_id, $data['password']);

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-page/(?P<hash>[a-zA-Z0-9]+)/login', array(
        'methods' => 'POST',
        'callback' => function( $data ) {
                try {
                    WPQTverifyUserApiNonce($data);
                    WPQTverifyUserPageHash($data['hash']);
                    $passwordService = new PasswordService();
                    $sessionService = new SessionService();
                    $userPageRepository = new UserPageRepository();

                    if($data['password'] === null) {
                        throw new Exception('Password is required');
                    }
                
                    $passwordMatch = $passwordService->verifyPassword($data['hash'], $data['password']);

                    if( !$passwordMatch ) {
                        throw new Exception('Invalid password');
                    }
                    
                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $userSession = $sessionService->createSession($userPage->user_id, $data['hash']);

                    return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                        'sessionToken' => $userSession->session_token,
                        'expiresAtUTC' => $userSession->expires_at_utc
                    ]))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-page/overview', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    WPQTverifyUserApiNonce($data);
                    $sessionService = new SessionService();
                    $session = $sessionService->verifySessionToken();

                    $overviewData = (object)[
                        'assignedTasksCount' => 100,
                        'selectableTasksCount' => 55
                    ];

                    return new WP_REST_Response((new ApiResponse(true, array(), $overviewData))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));
}