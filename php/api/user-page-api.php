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
use WPQT\Pipeline\PipelineRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Task\TaskRepository;
use WPQT\User\UserService;
use WPQT\WPQTException;
use WPQT\RequestValidation;
use WPQT\Permission\PermissionService;

add_action('rest_api_init', 'wpqt_register_user_page_api_routes');
function wpqt_register_user_page_api_routes() {
    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/status', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    RequestValidation::validateUserPageApiRequest($data, array('session' => false));
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($userPage);

                    $userPageStatus = (object)[
                        'isActiveUser' => $userPage->is_active,
                        'setupCompleted' => $hasSetupCompleted,
                        'userId' => $userPage->user_id
                    ];

                    return new WP_REST_Response((new ApiResponse(true, array(), $userPageStatus))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/setup', array(
        'methods' => 'POST',
        'callback' => function( $data ) {
                try {
                    RequestValidation::validateUserPageApiRequest($data, array('session' => false));
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $passwordService = new PasswordService();

                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($userPage);

                    if( $hasSetupCompleted ) {
                        throw new WPQTException('User page setup has already been completed', true);
                    }
                    $passwordService->storePassword($userPage->user_id, $data['password']);

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/login', array(
        'methods' => 'POST',
        'callback' => function( $data ) {
                try {
                    RequestValidation::validateUserPageApiRequest($data, array('session' => false));
                    $passwordService = new PasswordService();
                    $sessionService = new SessionService();
                    $userPageRepository = new UserPageRepository();

                    if($data['password'] === null) {
                        throw new WPQTException('Password is required');
                    }
                
                    $passwordMatch = $passwordService->verifyPassword($data['hash'], $data['password']);

                    if( !$passwordMatch ) {
                        throw new WPQTException('Invalid password', true);
                    }
                    
                    $userPage = $userPageRepository->getPageUserByHash($data['hash']);
                    $userSession = $sessionService->createSession($userPage->user_id, $data['hash']);

                    return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                        'sessionToken' => $userSession->session_token,
                        'expiresAtUTC' => $userSession->expires_at_utc
                    ]))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/overview', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    $session = RequestValidation::validateUserPageApiRequest($data)['session'];
                    $taskRepository = new TaskRepository();
                    $assignedTasks = $taskRepository->getTasksAssignedToUser($session->user_id);
                    $assignableTasks = $taskRepository->getTasksAssignableToUser($session->user_id);

                    $overviewData = (object)[
                        'assignedTasksCount' => count($assignedTasks),
                        'assignableTaskCount' => count($assignableTasks)
                    ];

                    return new WP_REST_Response((new ApiResponse(true, array(), $overviewData))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/assigned-tasks', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    $session = RequestValidation::validateUserPageApiRequest($data)['session'];
                    $taskRepository = new TaskRepository();
                    $assignedTasks = $taskRepository->getTasksAssignedToUser($session->user_id);

                    return new WP_REST_Response((new ApiResponse(true, array(), $assignedTasks))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/assignable-tasks', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    $session = RequestValidation::validateUserPageApiRequest($data)['session'];
                    $taskRepository = new TaskRepository();
                    $assignableTasks = $taskRepository->getTasksAssignableToUser($session->user_id);

                    return new WP_REST_Response((new ApiResponse(true, array(), $assignableTasks))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/tasks/(?P<task_id>[0-9]+)', array(
        'methods' => 'GET',
        'callback' => function( $data ) {
                try {
                    $session = RequestValidation::validateUserPageApiRequest($data)['session'];
                    $userService = new UserService();
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                  
                    if(!$permissionService->checkIfUserIsAllowedToViewTask($session->user_id, $data['task_id'])) {
                        throw new WPQTException('Not allowed', true);
                    }

                    $task = $taskRepository->getTaskById($data['task_id'], true);

                    return new WP_REST_Response((new ApiResponse(true, array(), $task))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wpqt/v1', 'user-pages/(?P<hash>[a-zA-Z0-9]+)/tasks/(?P<task_id>[0-9]+)/users', array(
        'methods' => 'POST, DELETE',
        'callback' => function( $data ) {
                try {
                    $session = RequestValidation::validateUserPageApiRequest($data)['session'];
                    $userService = new UserService();
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                  
                    if(!$permissionService->checkIfUserIsAllowedToEditTask($session->user_id, $data['task_id'])) {
                        throw new WPQTException('Not allowed', true);
                    }

                    if ($data->get_method() === 'POST') {
                        $userService->assignTaskToUser($session->user_id, $data['task_id']);
                    } elseif ($data->get_method() === 'DELETE') {
                        $userService->removeTaskFromUser($session->user_id, $data['task_id']);
                    }

                    $task = $taskRepository->getTaskById($data['task_id'], true);

                    return new WP_REST_Response((new ApiResponse(true, array(), $task))->toArray(), 200);
                } catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
                }
            },
        'permission_callback' => '__return_true'
    ));
}