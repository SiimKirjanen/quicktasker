<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Automation\AutomationService;
use WPQT\Capability\CapabilityService;
use WPQT\Comment\CommentService;
use WPQT\Customfield\CustomFieldRepository;
use WPQT\Customfield\CustomFieldService;
use WPQT\Log\LogRepository;
use WPQT\Log\LogService;
use WPQT\Overview\OverViewRepository;
use WPQT\Permission\PermissionService;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Response\ApiResponse;
use WPQT\Services\ServiceLocator;
use WPQT\Session\SessionRepository;
use WPQT\Session\SessionService;
use WPQT\Settings\SettingRepository;
use WPQT\Settings\SettingsService;
use WPQT\Settings\SettingsValidationService;
use WPQT\Stage\StageRepository;
use WPQT\Stage\StageService;
use WPQT\Task\TaskService;
use WPQT\User\UserRepository;
use WPQT\User\UserService;
use WPQT\UserPage\UserPageService;
use WPQT\WPQTException;

add_action('rest_api_init', 'wpqt_register_api_routes');
if (!function_exists('wpqt_register_api_routes')) {
    function wpqt_register_api_routes()
    {
        /*
        ==================================================================================================================================================================================================================
        Pipeline endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $pipelineRepo = ServiceLocator::get('PipelineRepository');

                        $pipeline = $pipelineRepo->getFullPipeline($data['id']);
                        $pipelines = $pipelineRepo->getPipelines();
                        $pipelineSettings = ServiceLocator::get('SettingRepository')->getPipelineSettings($data['id']);
                        $pipeline->settings = $pipelineSettings;

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'pipeline'  => $pipeline,
                            'pipelines' => $pipelines,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e, 'Failed to get pipeline');
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $pipelineRepo = new PipelineRepository();
                        $pipelines = $pipelineRepo->getPipelines();

                        return new WP_REST_Response((new ApiResponse(true, [], $pipelines))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        $newPipeline = $pipelineService->createPipeline($data['name'], [
                            'description' => $data['description'],
                        ]);
                        $userId = get_current_user_id();

                        $logService->log('Board ' . $newPipeline->name . ' created', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $newPipeline->id,
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $newPipeline->id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $newPipeline))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam']
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();

                        $pipelineData = $data->get_json_params();
                        $args = [];

                        if (isset($pipelineData['name'])) {
                            $args['name'] = $pipelineData['name'];
                        }
                        if (isset($pipelineData['description'])) {
                            $args['description'] = $pipelineData['description'];
                        }

                        $pipeline = $pipelineService->editPipeline($data['id'], $args);
                        $userId = get_current_user_id();

                        $logService->log('Board ' . $pipeline->name . ' edited', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $pipeline->id,
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $pipeline->id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $pipeline))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/set-primary',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        $pipeline = $pipelineService->markPipelineAsPrimary($data['id']);
                        $logService->log('Board ' . $pipeline->name . ' marked as primary', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $pipeline->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $pipeline->id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();

                        $data = $pipelineService->deletePipeline($data['id']);
                        $logService->log('Board ' . $data->deletedPipeline->name . ' deleted', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $data->deletedPipeline->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'deletedPipelineId' => $data->deletedPipeline->id,
                            'pipelineIdToLoad'  => $data->pipelineIdToLoad
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/api-tokens',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $tokenRepo = ServiceLocator::get('ApiTokenRepository');
                        $tokens = $tokenRepo->getPipelineTokensForFrontend($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], $tokens))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/api-tokens',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    try {
                        $apiTokenData = ServiceLocator::get('ApiTokenService')->generateApiToken([
                            'name'                   => $data['name'],
                            'description'            => $data['description'],
                            'pipeline_id'            => $data['id'],
                            'get_pipeline'           => $data['get_pipeline'],
                            'patch_pipeline'         => $data['patch_pipeline'],
                            'get_pipeline_stages'    => $data['get_pipeline_stages'],
                            'post_pipeline_stages'   => $data['post_pipeline_stages'],
                            'patch_pipeline_stages'  => $data['patch_pipeline_stages'],
                            'delete_pipeline_stages' => $data['delete_pipeline_stages'],
                            'get_pipeline_tasks'     => $data['get_pipeline_tasks'],
                            'post_pipeline_tasks'    => $data['post_pipeline_tasks'],
                            'patch_pipeline_tasks'   => $data['patch_pipeline_tasks'],
                            'delete_pipeline_tasks'  => $data['delete_pipeline_tasks'],
                        ]);

                        $dbToken = (array) $apiTokenData['db_token'];
                        $dbToken['token'] = $apiTokenData['token'];

                        return new WP_REST_Response((new ApiResponse(true, [], $dbToken))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'get_pipeline' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'patch_pipeline' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'get_pipeline_stages' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'post_pipeline_stages' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'patch_pipeline_stages' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'delete_pipeline_stages' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'get_pipeline_tasks' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'post_pipeline_tasks' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'patch_pipeline_tasks' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'delete_pipeline_tasks' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/api-tokens/(?P<token_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    try {
                        $numberOfDeleted = ServiceLocator::get('ApiTokenService')->deleteApiToken($data['id'], $data['token_id']);

                        if (0 === $numberOfDeleted) {
                            return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 404);
                        }

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'token_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Task endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'tasks/archived',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $limit = $data['limit'] ?? null;
                        $search = $data['search'] ?? null;
                        $pipelineId = $data['pipelineId'] ?? null;
                        $status = $data['status'] ?? null;

                        $archivedTasks = ServiceLocator::get('TaskRepository')->getArchivedTasks(true, true, [
                            'limit'      => $limit,
                            'search'     => $search,
                            'pipelineId' => $pipelineId,
                            'status'     => $status,
                            'order'      => $data['order'] ?? 'DESC',
                        ]);

                        return new WP_REST_Response((new ApiResponse(true, [], $archivedTasks))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIArchiveEndpoints();
                },
                'args' => [
                    'limit' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'pipelineId' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'status' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateArchiveStatusFilter'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'search' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'order' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'valdiateQueryOrder'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/logs',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $logs = ServiceLocator::get('LogRepository')->getLogs($data['id'], WP_QT_LOG_TYPE_TASK);

                        return new WP_REST_Response((new ApiResponse(true, [], $logs))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/move',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();
                        $stageRepo = new StageRepository();
                        $moveInfo = $taskService->moveTask($data['id'], $data['stageId'], $data['order']);
                        $stage = $stageRepo->getStageById($data['stageId']);

                        if (true === $moveInfo->stageChanged) {
                            $logService->log('Task ' . $moveInfo->task->name . ' moved to ' . $stage->name . ' stage', [
                                'type'          => WP_QT_LOG_TYPE_STAGE,
                                'type_id'       => $data['stageId'],
                                'user_id'       => get_current_user_id(),
                                'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                                'created_by_id' => get_current_user_id(),
                                'pipeline_id'   => $moveInfo->task->pipeline_id
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
                        } else {
                            $logService->log('Task ' . $moveInfo->task->name . ' order changed in ' . $stage->name . ' stage', [
                                'type'        => WP_QT_LOG_TYPE_STAGE,
                                'type_id'     => $data['stageId'],
                                'user_id'     => get_current_user_id(),
                                'created_by'  => WP_QT_LOG_CREATED_BY_ADMIN,
                                'pipeline_id' => $moveInfo->task->pipeline_id
                            ]);
                        }

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'stageId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'order' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();
                        $automationService = ServiceLocator::get('AutomationService');
                        $webhookService = ServiceLocator::get('WebhookService');
                        $userId = get_current_user_id();

                        $newTask = $taskService->createTask($data['stageId'], [
                            'name'       => $data['name'],
                            'pipelineId' => $data['pipelineId'],
                        ]);
                        $logService->log('Task ' . $newTask->name . ' created', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $newTask->id,
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $newTask->pipeline_id
                        ]);

                        /* Handle automations */
                        $executionResults = $automationService->handleAutomations(
                            $newTask->pipeline_id,
                            $newTask->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED,
                        );
                        /* End of handling automations */

                        /* Handle webhooks */
                        $webhookService->handleWebhooks(
                            $newTask->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $newTask
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
                                    ]
                                ]
                            ],
                            $executionResults->executedAutomations
                        );
                        /* End of handling webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'newTask'             => $newTask,
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations'   => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'stageId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'pipelineId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskData = $data->get_json_params();
                        $args = [];

                        if (isset($taskData['name'])) {
                            $args['name'] = $taskData['name'];
                        }
                        if (isset($taskData['description'])) {
                            $args['description'] = $taskData['description'];
                        }
                        if (isset($taskData['free_for_all'])) {
                            $args['free_for_all'] = $taskData['free_for_all'];
                        }
                        if (isset($taskData['due_date'])) {
                            $args['due_date'] = $taskData['due_date'];
                        }

                        $task = ServiceLocator::get('TaskService')->editTask($data['id'], $args);

                        ServiceLocator::get('LogService')->log('Task ' . $task->name . ' edited', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UPDATED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $task))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'free_for_all' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'due_date' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $deletedTask = ServiceLocator::get('TaskService')->deleteTask($data['id']);
                        ServiceLocator::get('LogService')->log('Task ' . $deletedTask->name . ' deleted', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $deletedTask->pipeline_id
                        ]);

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $deletedTask->pipeline_id,
                            $deletedTask->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED,
                            (object) [
                                'deletedTask'     => $deletedTask,
                                'deletedByUserId' => get_current_user_id()
                            ]
                        );
                        /* End of handling automations */

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $deletedTask->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $deletedTask
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED,
                                    ]
                                ]
                            ],
                            $executionResults->executedAutomations
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations'   => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/archive',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();

                        $task = $taskService->archiveTask($data['id']);
                        $logService->log('Task ' . $task->name . ' archived', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id
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
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ARCHIVED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/archive-restore',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = ServiceLocator::get('TaskService');
                        $logService = ServiceLocator::get('LogService');

                        $task = $taskService->restoreArchivedTask($data['id'], $data['boardId']);

                        $logService->log('Task ' . $task->name . ' restored from the archive', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_RESTORED_ARCHIVED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIArchiveEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'boardId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ]
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/done',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();
                        $settingsValidationService = new SettingsValidationService();
                        $automationService = new AutomationService();
                        $taskMarkedAsDone = $data['done'];
                        $currentUserId = get_current_user_id();

                        if (!$settingsValidationService->isAllowedToMarkTaskDone($data['id'])) {
                            throw new WPQTException('Task can be marked as done on last stage', true);
                        }

                        $task = $taskService->changeTaskDoneStatus($data['id'], $taskMarkedAsDone);
                        $logMessage = $taskMarkedAsDone ? 'Task ' . $task->name . ' status changed to completed' : 'Task ' . $task->name . ' status changed to not completed';

                        $logService->log($logMessage, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => $currentUserId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $currentUserId,
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        /* Handle automations */
                        $trigger = $taskMarkedAsDone ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE;
                        $executionResults = $automationService->handleAutomations(
                            $task->pipeline_id,
                            $task->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            $trigger,
                            (object) [
                                'doneByUserId' => $currentUserId
                            ]
                        );
                        /* End of handling automations */

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
                                        'target_action' => $taskMarkedAsDone ? WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED : WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'task'                => $task,
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations'   => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'done' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/focus-color',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $task = ServiceLocator::get('TaskService')->updateTaskFocusColor($data['id'], $data['color']);
                        ServiceLocator::get('LogService')->log('Task ' . $task->name . ' focus color changed', [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'color' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateColorParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Stage endpoints
        ==================================================================================================================================================================================================================
        */
        register_rest_route(
            'wpqt/v1',
            'stages',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();

                        $newStage = $stageService->createStage($data['pipelineId'], [
                            'name'        => $data['name'],
                            'description' => $data['description']
                        ]);

                        $logService->log('Stage ' . $newStage->name . ' created', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $data['pipelineId'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $data['pipelineId']
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $newStage))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'pipelineId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();

                        $stage = $stageService->editStage($data['id'], [
                            'name'        => $data['name'],
                            'description' => $data['description'] ?? ''
                        ]);
                        $logService->log('Stage ' . $stage->name . ' edited', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $stage->pipeline_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $stage->pipeline_id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $stage))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)/move',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();

                        $stage = $stageService->moveStage($data['id'], [
                            'direction' => $data['direction'],
                        ]);
                        $logService->log('Stage ' . $stage->name . ' moved', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $stage->pipeline_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $stage->pipeline_id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $stage))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'direction' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $deletedStage = $stageService->deleteStage($data['id']);
                        ServiceLocator::get('LogService')->log('Stage ' . $deletedStage->name . ' deleted', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $deletedStage->pipeline_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $deletedStage->pipeline_id
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)/archive-tasks',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();
                        $archivedTasks = $stageService->archiveStageTasks($data['id']);

                        foreach ($archivedTasks as $task) {
                            $logService->log('Task ' . $task->name . ' archived', [
                                'type'          => WP_QT_LOG_TYPE_TASK,
                                'type_id'       => $task->id,
                                'user_id'       => get_current_user_id(),
                                'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                                'created_by_id' => get_current_user_id(),
                                'pipeline_id'   => $task->pipeline_id
                            ]);
                        }

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );
        /*
        ==================================================================================================================================================================================================================
        User endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'users',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $userRepo = new UserRepository();
                        $users = $userRepo->getUsers();

                        return new WP_REST_Response((new ApiResponse(true, [], $users))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/extended',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $userRepo = new UserRepository();
                        $userService = new UserService();
                        $userPageService = new UserPageService();
                        $user = $userRepo->getUserById($data['id']);

                        if (!$user) {
                            throw new WPQTException('Failed to get user data', true);
                        }
                        $user->has_password = $userService->checkIfUserHasPassword($data['id']);
                        $user->setup_completed = $userPageService->checkIfUserPageSetupCompleted($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->createUser([
                            'name'        => $data['name'],
                            'description' => $data['description'],
                        ]);
                        $logService->log('Quicktasker ' . $user->name . ' created', [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $user->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $userTasks = ServiceLocator::get('TaskRepository')->getTasksAssignedToUser($data['id'], true);

                        return new WP_REST_Response((new ApiResponse(true, [], $userTasks))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks/(?P<task_id>\d+)',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $userService = new UserService();
                        $logService = new LogService();
                        $userRepo = new UserRepository();

                        $task = $userService->assignTaskToUser($data['id'], $data['task_id'], $data['user_type']);
                        $user = $userRepo->getUserByIdAndType($data['id'], $data['user_type']);
                        $userId = get_current_user_id();

                        $logService->log('Task ' . $task->name . ' assigned to ' . $user->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $data->get_param('task_id'),
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        $logService->log('Task ' . $task->name . ' assigned to ' . $user->name, [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $user->id,
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id,
                            $task->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED,
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
                                        'extraData'     => [
                                            'assigned_user_id'   => $user->id,
                                            'assigned_user_name' => $user->name,
                                            'assigned_user_type' => $data['user_type']
                                        ]
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_ASSIGNED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations'   => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'task_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'user_type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateUserType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks/(?P<task_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $logService = ServiceLocator::get('LogService');

                        $task = ServiceLocator::get('UserService')->removeTaskFromUser($data['id'], $data['task_id'], $data['user_type']);
                        $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($data['id'], $data['user_type']);
                        $userId = get_current_user_id();

                        $logService->log('Task ' . $task->name . ' unassigned from ' . $user->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $data['task_id'],
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        $logService->log('User ' . $user->name . ' unassigned from ' . $task->name . ' task', [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $user->id,
                            'user_id'       => $userId,
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => $userId,
                            'pipeline_id'   => $task->pipeline_id
                        ]);

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id,
                            $task->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED,
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
                                        'extraData'     => [
                                            'unassigned_user_id'   => $user->id,
                                            'unassigned_user_name' => $user->name,
                                            'unassigned_user_type' => $data['user_type']
                                        ]
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_UNASSIGNED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations'   => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'task_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'user_type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateUserType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $userUpdateData = $data->get_json_params();
                        $args = [];

                        if (isset($userUpdateData['name'])) {
                            $args['name'] = $userUpdateData['name'];
                        }
                        if (isset($userUpdateData['description'])) {
                            $args['description'] = $userUpdateData['description'];
                        }

                        $user = $userService->editUser($data['id'], $args);

                        $logService->log('User ' . $user->name . ' edited', [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $user->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => null
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                      'name' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/password-reset',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->resetUserPassword($data['id']);

                        $logService->log('User ' . $user->name . ' password reset', [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/status',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->changeUserStatus($data['id'], $data['status']);
                        $statusString = $data['status'] ? 'active' : 'disabled';
                        $logService->log('User ' . $user->name . ' status changed to ' . $statusString, [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'status' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->deleteUser($data['id']);
                        $logService->log('User ' . $user->name . ' marked as deleted', [
                            'type'          => WP_QT_LOG_TYPE_USER,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        QuickTasker user type session endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'users/sessions/(?P<id>\d+)/status',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    try {
                        $sessionService = new SessionService();
                        $sessionService->changeSessionStatus($data['id'], $data['status']);

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForManagingQuickTaskerSessions();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'status' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/sessions/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    try {
                        $sessionService = new SessionService();
                        $sessionService->deleteSession($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForManagingQuickTaskerSessions();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ]
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'users/sessions',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $sessionsRepo = new SessionRepository();
                        $userSessions = $sessionsRepo->getUserSessions();

                        return new WP_REST_Response((new ApiResponse(true, [], $userSessions))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForManagingQuickTaskerSessions();
                }
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        WP users endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'wp-users',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $userRepo = new UserRepository();
                        $users = $userRepo->getWPNonAdminUsers();

                        return new WP_REST_Response((new ApiResponse(true, [], $users))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredParmissionsForPrivateAPIUsersEndpoints();
                },
                'args' => [
                    'type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'wp-users/(?P<id>\d+)/capabilities',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    try {
                        $capabilityService = new CapabilityService();
                        $capabilities = (object) [
                            WP_QUICKTASKER_ADMIN_ROLE                 => $data[WP_QUICKTASKER_ADMIN_ROLE],
                            WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE    => $data[WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE],
                            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS    => $data[WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS],
                            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS => $data[WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS],
                            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE  => $data[WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE],
                            WP_QUICKTASKER_ACCESS_USER_PAGE_APP       => $data[WP_QUICKTASKER_ACCESS_USER_PAGE_APP],
                        ];

                        $capabilityService->updateWPUserCapabilities($data['id'], $capabilities);

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredParmissionsForPrivateAPIUsersEndpoints();
                },
                'args' => [
                    WP_QUICKTASKER_ADMIN_ROLE => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    WP_QUICKTASKER_ADMIN_ROLE_MANAGE_ARCHIVE => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    WP_QUICKTASKER_ACCESS_USER_PAGE_APP => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Logs endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'logs',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $logRepo = new LogRepository();
                        $logs = $logRepo->getLogs($data['typeId'], $data['type']);

                        return new WP_REST_Response((new ApiResponse(true, [], $logs))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'typeId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ]
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'global-logs',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $logRepo = new LogRepository();

                        $type = $data['type'] ?? null;
                        $typeId = $data['typeId'] ?? null;
                        $numberOfLogs = $data['numberOfLogs'] ?? null;
                        $createdBy = $data['createdBy'] ?? null;
                        $createdById = $data['createdById'] ?? null;
                        $logStatus = $data['status'] ?? null;
                        $logSearch = $data['search'] ?? null;

                        $logs = $logRepo->getGlobalLogs($type, $typeId, $createdBy, $numberOfLogs, $data['order'], $logStatus, $logSearch, $createdById);

                        return new WP_REST_Response((new ApiResponse(true, [], $logs))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'type' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateLogType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'typeId' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'numberOfLogs' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'createdBy' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateLogCreatedBy'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'createdById' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeOptionalAbsint'],
                    ],
                    'order' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'valdiateQueryOrder'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'status' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateLogStatus'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam']
                    ],
                    'search' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam']
                    ]
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Comments endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'comments',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $comments = ServiceLocator::get('CommentRepository')->getComments($data->get_param('typeId'), $data->get_param('type'), $data->get_param('isPrivate'));

                        return new WP_REST_Response((new ApiResponse(true, [], $comments))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'typeId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCommentType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'isPrivate' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'comments',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    try {
                        $commentService = new CommentService();
                        $adminId = get_current_user_id();

                        $newComemnt = $commentService->createComment($data['typeId'], $data['type'], [
                            'isPrivate'  => $data['isPrivate'],
                            'text'       => $data['comment'],
                            'authorId'   => $adminId,
                            'authorType' => WP_QT_WORDPRESS_USER_TYPE,
                        ]);
                        $automationExecutionResults = [];

                        if (WP_QT_LOG_TYPE_TASK == $data['type']) {
                            $automationTrigger = $data['isPrivate'] ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED;
                            $task = ServiceLocator::get('TaskRepository')->getTaskById($data['typeId']);

                            /* Handle automations */
                            $automationExecutionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                                $task->pipeline_id,
                                $task->id,
                                WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                                $automationTrigger,
                                $newComemnt
                            );
                            /* End of handling automations */

                            /* Handle webhooks */
                            ServiceLocator::get('WebhookService')->handleWebhooks(
                                $task->pipeline_id,
                                [
                                    [
                                        'data' => [
                                            'relatedObject' => $task,
                                            'extraData'     => [
                                                'text'        => $newComemnt->text,
                                                'is_private'  => $newComemnt->is_private,
                                                'author_id'   => $newComemnt->author_id,
                                                'author_type' => $newComemnt->author_type,
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
                        }

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'newComment'          => $newComemnt,
                            'executedAutomations' => $automationExecutionResults,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'comment' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'typeId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCommentType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'isPrivate' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Custom Field endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'custom-fields',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $activeFields = $data->get_param('active');
                        $customFields = ServiceLocator::get('CustomFieldRepository')->getRelatedCustomFields($data['entityId'], $data['entityType'], $activeFields);

                        return new WP_REST_Response((new ApiResponse(true, [], $customFields))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'entityType' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCustomFieldEntityType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'entityId' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeOptionalAbsint'],
                    ],
                    'pipelineId' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'active' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ]
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();
                        $entityId = 0 === $data['entityId'] ? null : $data['entityId'];

                        $customField = $customFieldService->createCustomField($data['name'], $data['description'], $data['type'], $data['entityType'], $entityId);
                        $logService->log('Custom field ' . $data['name'] . ' created', [
                            'type'          => $data['entityType'],
                            'type_id'       => $data['entityId'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE == $data['entity_type'] ? $data['entityId'] : null,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $customField))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'entityType' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCustomFieldEntityType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'entityId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'description' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCustomFieldType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $customFieldRepo = new CustomFieldRepository();
                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();

                        $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                        $customFieldService->markCustomFieldAsDeleted($data['custom_field_id']);

                        $logService->log('Custom field ' . $customField->name . ' marked as deleted', [
                            'type'          => $customField->entity_type,
                            'type_id'       => $customField->entity_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE == $customField->entity_type ? $customField->entity_id : null,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'custom_field_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)/value',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();
                        $customFieldRepo = new CustomFieldRepository();

                        $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                        $customFieldService->updateCustomFieldValue($data['custom_field_id'], $data['entityId'], $data['entityType'], $data['value']);
                        $logService->log('Custom field ' . $customField->name . ' value updated', [
                            'type'          => $customField->entity_type,
                            'type_id'       => $customField->entity_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE == $customField->entity_type ? $customField->entity_id : null,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'custom_field_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'entityId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'entityType' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateCustomFieldEntityType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'value' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)/default-value',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $customFieldService = ServiceLocator::get('CustomFieldService');
                        $logService = ServiceLocator::get('LogService');
                        $customFieldRepo = ServiceLocator::get('CustomFieldRepository');

                        $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                        $customFieldService->updateCustomFieldDefaultValue($data['custom_field_id'], $data['value']);
                        $logService->log('Custom field ' . $customField->name . ' default value updated', [
                            'type'          => $customField->entity_type,
                            'type_id'       => $customField->entity_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $customField->entity_id,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'custom_field_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'value' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)/restore',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();

                        $customField = $customFieldService->restoreCustomField($data['custom_field_id']);
                        $logService->log('Custom field ' . $customField->name . ' restored', [
                            'type'          => $customField->entity_type,
                            'type_id'       => $customField->entity_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPE_PIPELINE == $customField->entity_type ? $customField->entity_id : null,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], $customField))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'custom_field_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ]
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Settings endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'settings/user-page-custom-styles',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    try {
                        $styles = SettingsService::saveUserPageCustomStyles($data['styles']);

                        return new WP_REST_Response((new ApiResponse(true, [], $styles))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'styles' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/settings',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $settingRepo = new SettingRepository();
                        $pipelineSettings = $settingRepo->getPipelineSettings($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'settings' => $pipelineSettings,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/settings/task-completion-done-restriction',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    try {
                        $settingsService = new SettingsService();
                        $settingsService->updatePipelineTaskDoneCompletionRestriction($data['id'], $data['allow_task_completion_only_on_last_stage']);

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'allow_task_completion_only_on_last_stage' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Archive settings endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'archive/settings/task-cleanup',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $deletedTaskIds = $taskService->deleteArchivedTasksWithoutPipeline();

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'deletedTaskIds' => $deletedTaskIds,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIArchiveEndpoints();
                },
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Overview endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/overview',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $overviewRepo = new OverviewRepository();

                        $taskStartDate = $data['taskStartDate'] ?? null;
                        $taskDoneDate = $data['taskDoneDate'] ?? null;
                        $overview = $overviewRepo->getPipelineOverview($data['id'], $taskStartDate, $taskDoneDate);

                        return new WP_REST_Response((new ApiResponse(true, [], $overview))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'taskStartDate' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateDateParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'taskDoneDate' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateDateParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Automation endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $automationRepo = ServiceLocator::get('AutomationRepository');
                        $pipelineAutomations = $automationRepo->getPipelineAutomations($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'automations' => $pipelineAutomations,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    try {
                        $automation = ServiceLocator::get('AutomationService')->createAutomation($data['id'], null, $data['automationTarget'], $data['automationTrigger'], $data['automationAction'], $data['automationActionTargetId'], $data['automationActionTargetType'], $data['automationMetadata']);

                        return new WP_REST_Response((new ApiResponse(true, [], $automation))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'automationTarget' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateAutomationTargetType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'automationTrigger' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateAutomationTrigger'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'automationAction' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateAutomationAction'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'automationActionTargetId' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeOptionalAbsint'],
                    ],
                    'automationActionTargetType' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionslAutomationActionTargetType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeOptionalStringParam'],
                    ],
                    'automationMetadata' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeOptionalStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations/(?P<automation_id>\d+)/active',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    try {
                        $automation = ServiceLocator::get('AutomationService')->updateAutomationActiveState($data['automation_id'], $data['active']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'automation' => $automation,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'automation_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'active' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations/(?P<automation_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $deletedAutomation = ServiceLocator::get('AutomationService')->deleteAutomation($data['automation_id']);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'automation_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'automations/(?P<id>\d+)/logs',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ]
        );

        /*
        ==================================================================================================================================================================================================================
        Webhooks endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/webhooks',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $pipelineWebhooks = ServiceLocator::get('WebhookRepository')->getPipelineWebhooks($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'webhooks' => $pipelineWebhooks,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/webhooks',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $webhook = ServiceLocator::get('WebhookService')->createWebhook(
                            $data['id'],
                            [
                                'target_type'     => $data['target_type'],
                                'target_action'   => $data['target_action'],
                                'webhook_url'     => $data['webhook_url'],
                                'webhook_confirm' => $data['webhook_confirm'],
                            ]
                        );
                        $webhookName = ServiceLocator::get('WebhookRepository')->generateWebhookName($webhook);

                        ServiceLocator::get('LogService')->log('Created ' . $webhookName, [
                            'type'          => WP_QT_LOG_TYPE_WEBHOOK,
                            'type_id'       => $webhook->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $webhook->pipeline_id,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'webhook' => $webhook,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'target_type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateWebhookTargetType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'target_action' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateWebhookTargetAction'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'webhook_url' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'webhook_confirm' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'webhooks/(?P<id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $webhookData = $data->get_json_params();
                        $args = [];

                        if (isset($webhookData['webhook_confirm'])) {
                            $args['webhook_confirm'] = $webhookData['webhook_confirm'];
                        }

                        if (isset($webhookData['active'])) {
                            $args['active'] = $webhookData['active'];
                        }

                        $webhook = ServiceLocator::get('WebhookService')->editWebhook(
                            $data['id'],
                            $args
                        );
                        $webhookName = ServiceLocator::get('WebhookRepository')->generateWebhookName($webhook);

                        ServiceLocator::get('LogService')->log('Edited ' . $webhookName, [
                            'type'          => WP_QT_LOG_TYPE_WEBHOOK,
                            'type_id'       => $webhook->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $webhook->pipeline_id,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'webhook' => $webhook,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'webhook_confirm' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                    'active' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'webhooks/(?P<id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $webhook = ServiceLocator::get('WebhookRepository')->getWebhookById($data['id']);
                        ServiceLocator::get('WebhookService')->deleteWebhook($data['id']);

                        $webhookName = ServiceLocator::get('WebhookRepository')->generateWebhookName($webhook);

                        ServiceLocator::get('LogService')->log('Deleted ' . $webhookName, [
                            'type'          => WP_QT_LOG_TYPE_WEBHOOK,
                            'type_id'       => $webhook->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $webhook->pipeline_id,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Labels endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $labels = ServiceLocator::get('LabelRepository')->getPipelineLabels($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'labels' => $labels,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $label = ServiceLocator::get('LabelService')->createLabel($data['id'], $data['name'], $data['color']);
                        ServiceLocator::get('LogService')->log('Label ' . $label->name . ' created', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $data['id'],
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'label' => $label,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'color' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateHexColor'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/tasks/(?P<task_id>\d+)/labels',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $label = ServiceLocator::get('LabelService')->assignLabel($data['task_id'], WP_QUICKTASKER_LABEL_RELATION_TYPE_TASK, $data['labelId']);
                        $task = ServiceLocator::get('TaskRepository')->getTaskById($data['task_id']);

                        ServiceLocator::get('LogService')->log('Label ' . $label->name . ' added to task ' . $task->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id,
                        ]);

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task,
                                        'extraData'     => [
                                            'label_id'    => $label->id,
                                            'label_name'  => $label->name,
                                            'label_color' => $label->color
                                        ],
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_ADDED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'label' => $label,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'task_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'labelId' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/tasks/(?P<task_id>\d+)/labels/(?P<label_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $label = ServiceLocator::get('LabelService')->unassignLabel($data['task_id'], WP_QUICKTASKER_LABEL_RELATION_TYPE_TASK, $data['label_id']);
                        $task = ServiceLocator::get('TaskRepository')->getTaskById($data['task_id']);
                        ServiceLocator::get('LogService')->log('Label ' . $label->name . ' removed from task ' . $task->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id,
                        ]);

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task,
                                        'extraData'     => [
                                            'label_id'    => $label->id,
                                            'label_name'  => $label->name,
                                            'label_color' => $label->color
                                        ],
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_LABEL_REMOVED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, []))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'task_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'label_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels/(?P<label_id>\d+)',
            [
                'methods'  => 'PATCH',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $label = ServiceLocator::get('LabelService')->updateLabel($data['label_id'], $data['name'], $data['color']);
                        ServiceLocator::get('LogService')->log('Label ' . $label->name . ' edited', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $data['id'],
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $data['id'],
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'label' => $label,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'label_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'name' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateStringParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'color' => [
                        'required'          => false,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateHexColor'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels/(?P<label_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $deletedLabel = ServiceLocator::get('LabelService')->deleteLabel($data['label_id']);
                        ServiceLocator::get('LogService')->log('Label ' . $deletedLabel->name . ' deleted', [
                            'type'          => WP_QT_LOG_TYPE_PIPELINE,
                            'type_id'       => $deletedLabel->pipeline_id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $deletedLabel->pipeline_id,
                        ]);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'deletedLabel' => $deletedLabel,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'label_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ]
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Upload endpoints
        ==================================================================================================================================================================================================================
        */
        register_rest_route(
            'wpqt/v1',
            'uploads',
            [
                'methods'  => 'GET',
                'callback' => function ($data) {
                    try {
                        $uploads = ServiceLocator::get('UploadRepository')->getUploads($data['entity_id'], $data['entity_type']);

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'uploads' => $uploads,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'entity_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'entity_type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateUploadEntityType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'uploads',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $upload = ServiceLocator::get('UploadService')->uploadFile($data['entity_id'], $data['entity_type'], $_FILES['file_to_upload']);
                        $task = ServiceLocator::get('TaskRepository')->getTaskById($upload->entity_id);
                        ServiceLocator::get('LogService')->log('File ' . $upload->file_name . ' uploaded to task ' . $task->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id,
                        ]);

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id,
                            $task->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_ADDED,
                            (object) [
                                'upload' => $upload,
                                'userId' => get_current_user_id(),
                            ]
                        );
                        /* End of handling automations */

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task,
                                        'extraData'     => [
                                            'file_name'     => $upload->file_name,
                                            'file_type'     => $upload->file_type,
                                            'uploader_id'   => $upload->uploader_id,
                                            'uploader_name' => $upload->uploader_name,
                                            'uploader_type' => WP_QT_WORDPRESS_USER_TYPE
                                        ],
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_ADDED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'upload' => $upload,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => [
                    'entity_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                    'entity_type' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateUploadEntityType'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                ],
            ],
        );

        register_rest_route(
            'wpqt/v1',
            'uploads/(?P<upload_id>\d+)',
            [
                'methods'  => 'DELETE',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $deletedUpload = ServiceLocator::get('UploadService')->deleteUpload($data['upload_id']);
                        $task = ServiceLocator::get('TaskRepository')->getTaskById($deletedUpload->entity_id);
                        ServiceLocator::get('LogService')->log('File ' . $deletedUpload->file_name . ' deleted from task ' . $task->name, [
                            'type'          => WP_QT_LOG_TYPE_TASK,
                            'type_id'       => $task->id,
                            'user_id'       => get_current_user_id(),
                            'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                            'created_by_id' => get_current_user_id(),
                            'pipeline_id'   => $task->pipeline_id,
                        ]);

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id,
                            $task->id,
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ATTACHMENT_DELETED,
                            (object) [
                                'deletedUpload' => $deletedUpload,
                                'userId'        => get_current_user_id(),
                            ]
                        );
                        /* End of handling automations */

                        /* Handle webhooks */
                        ServiceLocator::get('WebhookService')->handleWebhooks(
                            $task->pipeline_id,
                            [
                                [
                                    'data' => [
                                        'relatedObject' => $task,
                                        'extraData'     => [
                                            'file_name'     => $deletedUpload->file_name,
                                            'file_type'     => $deletedUpload->file_type,
                                            'uploader_id'   => $deletedUpload->uploader_id,
                                            'uploader_name' => $deletedUpload->uploader_name,
                                            'uploader_type' => WP_QT_WORDPRESS_USER_TYPE
                                        ],
                                    ],
                                    'webhookData' => [
                                        'target_type'   => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                        'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_FILE_REMOVED,
                                    ]
                                ]
                            ]
                        );
                        /* End Handle webhooks */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'deletedUpload' => $deletedUpload,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => [
                    'upload_id' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                    ],
                ],
            ],
        );

        /*
        ==================================================================================================================================================================================================================
        Import endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'import',
            [
                'methods'  => 'POST',
                'callback' => function ($data) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineRepo = ServiceLocator::get('PipelineRepository');
                        $pipelineId = ServiceLocator::get('PipelineImportService')->importPipeline($data['source'], $data['data']);
                        $pipeline = $pipelineRepo->getPipelineById($pipelineId);

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, [], (object) [
                            'pipeline' => $pipeline,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function () {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => [
                    'source' => [
                        'required'          => true,
                        'validate_callback' => ['WPQT\RequestValidation', 'validateImportSource'],
                        'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                    ],
                    'data' => [
                        'required'          => true,
                        'validate_callback' => function ($value, $request, $param) {
                            try {
                                ServiceLocator::get('PipelineImportService')->validateWPQTImport($value);

                                return true;
                            } catch (Exception $e) {
                                return new WP_Error('validation_error', $e->getMessage());
                            }
                        },
                    ],
                ],
            ],
        );
    }
}
