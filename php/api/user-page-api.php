<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Comment\CommentRepository;
use WPQT\Comment\CommentService;
use WPQT\CustomField\CustomFieldRepository;
use WPQT\CustomField\CustomFieldService;
use WPQT\Log\LogService;
use WPQT\Password\PasswordService;
use WPQT\Permission\PermissionService;
use WPQT\RequestValidation;
use WPQT\Response\ApiResponse;
use WPQT\Services\ServiceLocator;
use WPQT\Session\SessionService;
use WPQT\Settings\SettingRepository;
use WPQT\Settings\SettingsValidationService;
use WPQT\Stage\StageRepository;
use WPQT\Task\TaskRepository;
use WPQT\Task\TaskService;
use WPQT\User\UserRepository;
use WPQT\User\UserService;
use WPQT\UserPage\UserPageRepository;
use WPQT\UserPage\UserPageService;
use WPQT\WPQTException;

add_action('rest_api_init', 'wpqt_register_user_page_api_routes');
if (!function_exists('wpqt_register_user_page_api_routes')) {
    function wpqt_register_user_page_api_routes()
    {
        register_rest_route('wpqt/v1', 'user-page/status', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data, ['session' => false]);
                    $hasSetupCompleted = true;
                    $isUserActive = true;
                    $userId = null;
                    $userName = null;
                    $profilePictureUrl = null;

                    if ($requestData['isQuicktaskerUser']) {
                        $userPage = ServiceLocator::get('UserPageRepository')->getPageUserByHash($requestData['userPageHash']);

                        if (null === $userPage) {
                            throw new WPQTException('User page not found', true);
                        }
                        $hasSetupCompleted = ServiceLocator::get('UserPageService')->checkIfUserPageSetupCompleted($userPage->user_id);
                        $isUserActive = $userPage->is_active;
                        $userId = $userPage->user_id;
                        $userName = $userPage->name;
                    } else {
                        $userId = $requestData['loggedInWPUserId'];

                        if ($userId) {
                            $WPuser = ServiceLocator::get('UserRepository')->getWPUserById($userId);
                            $userName = $WPuser->name ?? null;
                            $profilePictureUrl = $WPuser->avatar_url ?? null;
                            $isUserActive = ServiceLocator::get('PermissionService')->hasRequiredPermissionsForUserPageApp($userId);
                        }
                    }

                    $userPageStatus = (object) [
                        'isActiveUser'      => $isUserActive,
                        'setupCompleted'    => $hasSetupCompleted,
                        'userId'            => $userId,
                        'userName'          => $userName,
                        'isQuicktaskerUser' => $requestData['isQuicktaskerUser'],
                        'isWordPressUser'   => $requestData['isWordPressUser'],
                        'userType'          => $requestData['userType'],
                        'profilePictureUrl' => $profilePictureUrl
                    ];

                    return new WP_REST_Response((new ApiResponse(true, [], $userPageStatus))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/setup', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data, ['session' => false]);
                    $userPageRepository = new UserPageRepository();
                    $userPageService = new UserPageService();
                    $passwordService = new PasswordService();
                    $logService = new LogService();

                    if (!$requestData['isQuicktaskerUser']) {
                        throw new WPQTException('Setup not available for WordPress users');
                    }

                    $userPage = $userPageRepository->getPageUserByHash($requestData['userPageHash']);
                    $hasSetupCompleted = $userPageService->checkIfUserPageSetupCompleted($userPage->user_id);

                    if ($hasSetupCompleted) {
                        throw new WPQTException('User page setup has already been completed', true);
                    }
                    $passwordService->storePassword($userPage->user_id, $data['password']);
                    $logService->log('User page setup completed', [
                        'user_id'    => $userPage->user_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_QUICKTASKER_USER,
                        'type'       => WP_QT_LOG_TYPE_USER,
                        'type_id'    => $userPage->user_id,
                    ]);

                    return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'password' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/login', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data, ['session' => false]);
                    $passwordService = new PasswordService();
                    $sessionService = new SessionService();
                    $userPageRepository = new UserPageRepository();
                    $logService = new LogService();

                    if (!$requestData['isQuicktaskerUser']) {
                        throw new WPQTException('Login not available for WordPress users');
                    }

                    if (null === $data['password']) {
                        throw new WPQTException('Password is required');
                    }

                    $passwordMatch = $passwordService->verifyPassword($requestData['userPageHash'], $data['password']);

                    if (!$passwordMatch) {
                        throw new WPQTException('Invalid password', true);
                    }

                    $userPage = $userPageRepository->getPageUserByHash($requestData['userPageHash']);
                    $userSession = $sessionService->createSession($userPage->user_id, $requestData['userPageHash']);
                    $logService->log('User logged in', [
                        'user_id'    => $userPage->user_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_QUICKTASKER_USER,
                        'type'       => WP_QT_LOG_TYPE_USER,
                        'type_id'    => $userPage->user_id,
                    ]);

                    return new WP_REST_Response((new ApiResponse(true, [], (object) [
                        'sessionToken' => $userSession->session_token,
                        'expiresAtUTC' => $userSession->expires_at_utc
                    ]))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'password' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/logout', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $sessionService = new SessionService();
                    $logService = new LogService();

                    if ($requestData['isQuicktaskerUser']) {
                        $sessionToken = sanitize_text_field($_COOKIE['wpqt-session-token-' . $requestData['userPageHash']]);
                        $sessionService->markSessionInactive($sessionToken);

                        $logService->log('User logged out', [
                           'user_id'    => $requestData['session']->user_id,
                           'created_by' => WP_QT_LOG_CREATED_BY_QUICKTASKER_USER,
                           'type'       => WP_QT_LOG_TYPE_USER,
                           'type_id'    => $requestData['session']->user_id,
                            ]);
                    } else {
                        $sessionService->logOutCurrentWPUser();
                    }

                    return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/overview', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();

                    $assignedTasks = $taskRepository->getTasksAssignedToUser($requestData['session']->user_id, false, $requestData['userType']);
                    $assignableTasks = $taskRepository->getTasksAssignableToUser();

                    $overviewData = (object) [
                        'assignedTasksCount'  => count($assignedTasks),
                        'assignableTaskCount' => count($assignableTasks)
                    ];

                    return new WP_REST_Response((new ApiResponse(true, [], $overviewData))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/assigned-tasks', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();

                    $assignedTasks = $taskRepository->getTasksAssignedToUser($requestData['session']->user_id, false, $requestData['userType']);

                    return new WP_REST_Response((new ApiResponse(true, [], $assignedTasks))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/assignable-tasks', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();
                    $assignableTasks = $taskRepository->getTasksAssignableToUser();

                    return new WP_REST_Response((new ApiResponse(true, [], $assignableTasks))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $userService = new UserService();
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                    $stageRepository = new StageRepository();
                    $customFieldRepository = new CustomFieldRepository();
                    $settingsRepository = new SettingRepository();

                    $task = $taskRepository->getTaskByHash($data['task_hash'], true, WP_QUICKTASKER_WP_USER_OBJECT_FILTER_MINIMAL);
                    $pipelineSettings = $settingsRepository->getPublicPipelineSettings($task->pipeline_id);

                    if (!$permissionService->checkIfUserIsAllowedToViewTask($requestData['session']->user_id, $task->id, $requestData['userType'])) {
                        throw new WPQTException('Not allowed to view the task data', true);
                    }

                    $data = (object) [
                        'task'             => $task,
                        'stages'           => $stageRepository->getStagesByPipelineId($task->pipeline_id),
                        'customFields'     => $customFieldRepository->getRelatedCustomFields($task->id, 'task'),
                        'pipelineSettings' => $pipelineSettings
                    ];

                    return new WP_REST_Response((new ApiResponse(true, [], $data))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)/comments', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                    $commentRepository = new CommentRepository();

                    $task = $taskRepository->getTaskByHash($data['task_hash']);

                    if (null === $task) {
                        throw new WPQTException('Task not found', true);
                    }
                    if (!$permissionService->checkIfUserIsAllowedToEditTask($requestData['session']->user_id, $task->id, $requestData['userType'])) {
                        throw new WPQTException('Not allowed to view the comments', true);
                    }

                    $comments = $commentRepository->getComments($task->id, 'task', false);

                    return new WP_REST_Response((new ApiResponse(true, [], $comments))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)/comments', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                    $commentService = new CommentService();
                    $commentRepository = new CommentRepository();
                    $logService = new LogService();

                    $task = $taskRepository->getTaskByHash($data['task_hash']);

                    if (null === $task) {
                        throw new WPQTException('Task not found', true);
                    }

                    if (!$permissionService->checkIfUserIsAllowedToEditTask($requestData['session']->user_id, $task->id, $requestData['userType'])) {
                        throw new WPQTException('Not allowed to edit the task', true);
                    }

                    $newComment = $commentService->createComment($task->id, 'task', [
                        'isPrivate'  => false,
                        'text'       => $data['comment'],
                        'authorId'   => $requestData['session']->user_id,
                        'authorType' => $requestData['userType']
                    ]);

                    $logService->log('User posted a comment on ' . $task->name . ' task', [
                        'type'       => WP_QT_LOG_TYPE_TASK,
                        'type_id'    => $task->id,
                        'created_by' => $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN,
                        'user_id'    => $requestData['session']->user_id
                    ]);

                    $comments = $commentRepository->getComments($task->id, 'task', false);

                    $automationExecutionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                        $task->pipeline_id,
                        $task->id,
                        WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                        WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED,
                        $newComment
                    );

                    /* Handle webhooks */
                    ServiceLocator::get('WebhookService')->handleWebhooks(
                        $task->pipeline_id,
                        [
                            [
                                'data' => [
                                    'relatedObject' => $task,
                                    'extraData'     => [
                                        'text'        => $newComment->text,
                                        'is_private'  => $newComment->is_private,
                                        'author_id'   => $newComment->author_id,
                                        'author_type' => $newComment->author_type,
                                    ],
                                ],
                                'webhookData' => [
                                    'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                    'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMMENT_ADDED,
                                ]
                            ]
                        ]
                    );
                    /* End Handle webhooks */

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, [], $comments))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'comment' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/user/comments', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $commentRepository = new CommentRepository();

                    $userComments = $commentRepository->getComments($requestData['session']->user_id, $requestData['userType'], false);

                    return new WP_REST_Response((new ApiResponse(true, [], $userComments))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/comments', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);

                    $createdAfter = ServiceLocator::get('TimeRepository')->modifyUTCTime(-5, 'day');
                    $comments = ServiceLocator::get('CommentRepository')->getCommentsRelatedToUser($requestData['session']->user_id, $requestData['userType'], $createdAfter);

                    return new WP_REST_Response((new ApiResponse(true, [], $comments))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('wpqt/v1', 'user-page/user/comments', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $commentRepository = new CommentRepository();
                    $commentService = new CommentService();
                    $logService = new LogService();
                    $adminComment = $requestData['isQuicktaskerUser'] ? false : true;

                    $commentService->createComment($requestData['session']->user_id, $requestData['userType'], [
                        'isPrivate'  => false,
                        'text'       => $data['comment'],
                        'authorId'   => $requestData['session']->user_id,
                        'authorType' => $requestData['userType']
                    ]);

                    $userComments = $commentRepository->getComments($requestData['session']->user_id, $requestData['userType'], false);

                    $logService->log('User posted a comment on its profile', [
                        'type'       => WP_QT_LOG_TYPE_USER,
                        'type_id'    => $requestData['session']->user_id,
                        'created_by' => $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN,
                        'user_id'    => $requestData['session']->user_id
                    ]);

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, [], $userComments))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'comment' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)/users', [
            'methods'  => 'POST, DELETE',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $isCreating = 'POST' === $data->get_method();
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $userService = new UserService();
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                    $userPageRepository = new UserPageRepository();
                    $logService = new LogService();
                    $automationTrigger = WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED;

                    $task = $taskRepository->getTaskByHash($data['task_hash']);

                    if (null === $task) {
                        throw new WPQTException('Task not found', true);
                    }

                    $taskId = $task->id;
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($requestData['session']->user_id, $requestData['userType']);
                    $createdBy = $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN;

                    if ($isCreating) {
                        if (!$permissionService->checkIfUserCanBeAssignedToTask($requestData['session']->user_id, $taskId)) {
                            throw new WPQTException('Not allowed to assign', true);
                        }

                        $userService->assignTaskToUser($requestData['session']->user_id, $taskId, $requestData['userType']);

                        $logService->log('Assigned itself to ' . $task->name . ' task', [
                            'type'       => WP_QT_LOG_TYPE_USER,
                            'type_id'    => $requestData['session']->user_id,
                            'created_by' => $createdBy,
                            'user_id'    => $requestData['session']->user_id
                        ]);

                        $logService->log($user->name . ' assigned itself to the task ' . $task->name, [
                            'type'        => WP_QT_LOG_TYPE_TASK,
                            'type_id'     => $taskId,
                            'created_by'  => $createdBy,
                            'user_id'     => $requestData['session']->user_id,
                            'pipeline_id' => $task->pipeline_id
                        ]);
                    } else {
                        $automationTrigger = WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED;
                        $userService->removeTaskFromUser($requestData['session']->user_id, $taskId, $requestData['userType']);

                        $logService->log('Unassigned itself from ' . $task->name . ' task', [
                            'type'        => WP_QT_LOG_TYPE_USER,
                            'type_id'     => $requestData['session']->user_id,
                            'created_by'  => $createdBy,
                            'user_id'     => $requestData['session']->user_id,
                            'pipeline_id' => $task->pipeline_id
                        ]);
                        $logService->log($user->name . ' unassigned itself from the task', [
                            'type'        => WP_QT_LOG_TYPE_TASK,
                            'type_id'     => $taskId,
                            'created_by'  => $createdBy,
                            'user_id'     => $requestData['session']->user_id,
                            'pipeline_id' => $task->pipeline_id
                        ]);
                    }

                    $task = $taskRepository->getTaskByHash($data['task_hash'], true);

                    /* Handle automations */
                    $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                        $task->pipeline_id,
                        $taskId,
                        WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                        $automationTrigger,
                        $user
                    );
                    /* End of handling automations */

                    /* Handle webhooks */
                    ServiceLocator::get('WebhookService')->handleWebhooks(
                        $task->pipeline_id,
                        [
                            [
                                'data' => [
                                    'relatedObject' => $task,
                                    'extraData'     => $isCreating
                                        ? [
                                            'assigned_user_id'   => $user->id,
                                            'assigned_user_name' => $user->name,
                                            'assigned_user_type' => $data->user_type,
                                        ]
                                        : [
                                            'unassigned_user_id'   => $user->id,
                                            'unassigned_user_name' => $user->name,
                                            'unassigned_user_type' => $data->user_type,
                                        ],
                                ],
                                'webhookData' => [
                                    'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                    'target_action' => $isCreating ? WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED : WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED,
                                ]
                            ]
                        ]
                    );
                    /* End Handle webhooks */

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, [], (object) [
                        'task'                => $task,
                        'executedAutomations' => $executionResults->executedAutomations
                    ]))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)/stage', [
            'methods'  => 'PATCH',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $taskRepository = new TaskRepository();
                    $permissionService = new PermissionService();
                    $stageRepository = new StageRepository();
                    $taskService = new TaskService();
                    $logService = new LogService();
                    $userPageRepository = new UserPageRepository();

                    $task = $taskRepository->getTaskByHash($data['task_hash'], true);

                    if (!$permissionService->checkIfUserIsAllowedToEditTask($requestData['session']->user_id, $task->id, $requestData['userType'])) {
                        throw new WPQTException('Not allowed to edit the task', true);
                    }
                    $moveInfo = $taskService->moveTask($task->id, $data['stageId'], 0);
                    $stage = $stageRepository->getStageById($moveInfo->newStageId);
                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($requestData['session']->user_id, $requestData['userType']);
                    $createdBy = $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN;

                    $logService->log('User ' . $user->name . ' changed task stage to ' . $stage->name, [
                        'type'        => WP_QT_LOG_TYPE_TASK,
                        'type_id'     => $task->id,
                        'created_by'  => $createdBy,
                        'user_id'     => $requestData['session']->user_id,
                        'pipeline_id' => $task->pipeline_id
                    ]);
                    $logService->log('User changed task ' . $task->name . ' stage to ' . $stage->name, [
                        'type'        => WP_QT_LOG_TYPE_USER,
                        'type_id'     => $requestData['session']->user_id,
                        'created_by'  => $createdBy,
                        'user_id'     => $requestData['session']->user_id,
                        'pipeline_id' => $task->pipeline_id
                    ]);

                    /* Handle webhooks */
                    ServiceLocator::get('WebhookService')->handleWebhooks(
                        $moveInfo->task->pipeline_id,
                        [
                            [
                                'data' => [
                                    'relatedObject' => $moveInfo->task,
                                    'extraData'     => [
                                        'task_prev_stage_id' => $moveInfo->oldStageId,
                                        'task_new_stage_id'  => $moveInfo->newStageId
                                    ],
                                ],
                                'webhookData' => [
                                    'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                    'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_STAGE_CHANGED,
                                ]
                            ]
                        ]
                    );
                    /* End Handle webhooks */

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'stageId' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/tasks/(?P<task_hash>[a-zA-Z0-9]+)/done', [
            'methods'  => 'PATCH',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $permissionService = new PermissionService();
                    $taskService = new TaskService();
                    $logService = new LogService();
                    $taskRepository = new TaskRepository();
                    $userPageRepository = new UserPageRepository();
                    $settingsValidationService = new SettingsValidationService();

                    $task = $taskRepository->getTaskByHash($data['task_hash']);

                    if (!$permissionService->checkIfUserIsAllowedToEditTask($requestData['session']->user_id, $task->id, $requestData['userType'])) {
                        throw new WPQTException('Not allowed to edit the task', true);
                    }

                    if (!$settingsValidationService->isAllowedToMarkTaskDone($task->id)) {
                        throw new WPQTException('Task can be marked as done on last stage', true);
                    }

                    $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($requestData['session']->user_id, $requestData['userType']);
                    $taskService->changeTaskDoneStatus($task->id, $data['done']);
                    $logMessage = $user->name . ' changed task to ' . (true === $data['done'] ? 'completed' : 'not completed');
                    $createdBy = $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN;
                    $task = $taskRepository->getTaskByHash($data['task_hash']); //Get new task data

                    $logService->log($logMessage, [
                        'type'        => WP_QT_LOG_TYPE_USER,
                        'type_id'     => $requestData['session']->user_id,
                        'created_by'  => $createdBy,
                        'user_id'     => $requestData['session']->user_id,
                        'pipeline_id' => $task->pipeline_id
                    ]);

                    $logService->log($logMessage, [
                        'type'        => WP_QT_LOG_TYPE_TASK,
                        'type_id'     => $task->id,
                        'created_by'  => $createdBy,
                        'user_id'     => $requestData['session']->user_id,
                        'pipeline_id' => $task->pipeline_id
                    ]);

                    /* Handle webhooks */
                    ServiceLocator::get('WebhookService')->handleWebhooks(
                        $task->pipeline_id,
                        [
                            [
                                'data' => [
                                    'relatedObject' => $task,
                                ],
                                'webhookData' => [
                                    'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                    'target_action' => $data['done'] ? WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED : WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED,
                                ]
                            ]
                        ]
                    );
                    /* End Handle webhooks */

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'task_hash' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'done' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
            ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'user-page/user', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $requestData = RequestValidation::validateUserPageApiRequest($data);
                    $userRepository = new UserRepository();
                    $customFieldRepository = new CustomFieldRepository();

                    $data = (object) [
                        'user'         => $userRepository->getUserByIdAndType($requestData['session']->user_id, $requestData['userType']),
                        'customFields' => $customFieldRepository->getRelatedCustomFields($requestData['session']->user_id, $requestData['userType']),
                    ];

                    return new WP_REST_Response((new ApiResponse(true, [], $data))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
        ]);

        /*
        ==================================================================================================================================================================================================================
        Custom Field endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route('wpqt/v1', 'user-page/custom-fields/(?P<custom_field_id>\d+)', [
            'methods'  => 'PATCH',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $requestData = RequestValidation::validateUserPageApiRequest($data);

                    if ('task' === $data['entityType']) {
                        $permissionService = new PermissionService();

                        if (!$permissionService->checkIfUserIsAllowedToEditTask($requestData['session']->user_id, $data['entityId'], $requestData['userType'])) {
                            throw new WPQTException('Not allowed to edit task custom fields', true);
                        }
                    } else {
                        if ((int) $requestData['session']->user_id !== $data['entityId']) {
                            throw new WPQTException('Entity ID and session user mismatch', true);
                        }
                    }
                    $customFieldService = new CustomFieldService();
                    $customFieldRepo = new CustomFieldRepository();
                    $logService = new LogService();

                    $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                    $customFieldService->updateCustomFieldValue($data['customFieldId'], $data['entityId'], $data['entityType'], $data['value']);

                    $logService->log('Custom field ' . $customField->name . ' value updated', [
                        'type'        => $customField->entity_type,
                        'type_id'     => $customField->entity_id,
                        'created_by'  => $requestData['isQuicktaskerUser'] ? WP_QT_LOG_CREATED_BY_QUICKTASKER_USER : WP_QT_LOG_CREATED_BY_ADMIN,
                        'user_id'     => $requestData['session']->user_id,
                        'pipeline_id' => WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE == $data['entityType'] ? $data['entityId'] : null,
                    ]);

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
            'entityId' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            'entityType' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateUserPageCustomFieldEntityType'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'value' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'customFieldId' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            ],
        ]);
    }
}
