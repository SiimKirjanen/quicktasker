<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Services\ServiceLocator;
use WPQT\StageHasTasksException;

/**
 * Helper function to build parameters array from request
 * Only includes parameters that are not null.
 *
 * @param WP_REST_Request $request The request object
 * @param array $paramNames Array of parameter names to extract
 * @return array Associative array with only non-null parameters
 */
function wpqtBuildParamsFromRequest(WP_REST_Request $request, array $paramNames)
{
    $params = [];
    foreach ($paramNames as $paramName) {
        $value = $request->get_param($paramName);
        if (null !== $value) {
            $params[$paramName] = $value;
        }
    }

    return $params;
}

/**
 * Validates if an entity exists and belongs to the specified pipeline.
 *
 * @param object|null $entity The entity to validate (stage, task, etc.)
 * @param int $pipelineId The expected pipeline ID
 * @return bool True if entity is unauthorized (doesn't exist or belongs to different pipeline)
 */
function wpqtIsEntityUnauthorizedForPipeline($entity, $pipelineId)
{
    return !$entity || $entity->pipeline_id !== $pipelineId;
}

add_action('rest_api_init', 'wpqt_register_token_api_routes');
function wpqt_register_token_api_routes()
{
    /*
    ==================================================================================================================================================================================================================
    Pipeline endpoints
    ==================================================================================================================================================================================================================
    */
    register_rest_route('wpqt/v1', '/token/board', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $request) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($cachedDbToken->pipeline_id);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');

                if (!$pipeline) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Board not found for the provided token'
                    ]);
                }

                ServiceLocator::get('LogService')->log(
                    "Board {$pipeline->name} fetched by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $pipeline->id,
                        'pipeline_id'   => $pipeline->id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                return $responseService->createTokenApiResponse(true, 200, [
                    'board' => $pipeline
                ]);
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while getting the board');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_PERMISSION]);
        },
    ]);

    register_rest_route('wpqt/v1', '/token/board', [
        'methods'  => 'PATCH',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $paramsToUpdate = wpqtBuildParamsFromRequest($request, ['name', 'description']);
                $updatedPipeline = ServiceLocator::get('PipelineService')->editPipeline($cachedDbToken->pipeline_id, $paramsToUpdate);

                ServiceLocator::get('LogService')->log(
                    "Board {$updatedPipeline->name} edited by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $updatedPipeline->id,
                        'pipeline_id'   => $updatedPipeline->id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'board' => $updatedPipeline
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while updating the board');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_PERMISSION]);
        },
        'args' => [
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
    ]);

    /*
    ==================================================================================================================================================================================================================
    Pipeline stage endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route('wpqt/v1', '/token/board/stages', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $request) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stages = ServiceLocator::get('StageRepository')->getStagesByPipelineId($cachedDbToken->pipeline_id);

                if (null === $stages) {
                    throw new \Exception('No stages found for the board associated with the provided token.');
                }

                ServiceLocator::get('LogService')->log(
                    "Board stages fetched by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $cachedDbToken->pipeline_id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                return $responseService->createTokenApiResponse(true, 200, [
                    'stages' => $stages
                ]);
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while getting the board stages');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_STAGES_PERMISSION]);
        },
    ]);

    register_rest_route('wpqt/v1', '/token/board/stages', [
        'methods'  => 'POST',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stageData = wpqtBuildParamsFromRequest($request, ['name', 'description']);
                $stage = ServiceLocator::get('StageService')->createStage($cachedDbToken->pipeline_id, $stageData);

                ServiceLocator::get('LogService')->log(
                    "Board stage {$stage->name} created by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $cachedDbToken->pipeline_id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 201, [
                    'stage' => $stage
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while creating a new stage');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_POST_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => [
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
    ]);

    register_rest_route('wpqt/v1', '/token/board/stages/(?P<stage_id>\d+)', [
        'methods'  => 'PATCH',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stageData = wpqtBuildParamsFromRequest($request, ['name', 'description']);
                $stage = ServiceLocator::get('StageRepository')->getStageById($request->get_param('stage_id'));

                if (wpqtIsEntityUnauthorizedForPipeline($stage, $cachedDbToken->pipeline_id)) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Stage not found for the provided token'
                    ]);
                }

                $editedStage = ServiceLocator::get('StageService')->editStage($request->get_param('stage_id'), $stageData, $cachedDbToken->pipeline_id);

                ServiceLocator::get('LogService')->log(
                    "Board stage {$stage->name} edited by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $cachedDbToken->pipeline_id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'stage' => $editedStage
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while editing the stage');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => [
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
            'stage_id' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
        ],
    ]);

    register_rest_route('wpqt/v1', '/token/board/stages/(?P<stage_id>\d+)', [
        'methods'  => 'DELETE',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stage = ServiceLocator::get('StageRepository')->getStageById($request->get_param('stage_id'));

                if (wpqtIsEntityUnauthorizedForPipeline($stage, $cachedDbToken->pipeline_id)) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Stage not found for the provided token'
                    ]);
                }

                ServiceLocator::get('StageService')->deleteStage($request->get_param('stage_id'));
                ServiceLocator::get('LogService')->log(
                    "Board stage {$stage->name} deleted by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $cachedDbToken->pipeline_id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, []);
            } catch (StageHasTasksException $e) {
                $wpdb->query('ROLLBACK');

                return $responseService->createTokenApiResponse(false, 409, [
                    'message' => 'Cannot delete stage. It has associated tasks that need to be deleted or relocated first.'
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while deleting the stage');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_DELETE_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => [
            'stage_id' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
        ],
    ]);

    /*
    ==================================================================================================================================================================================================================
    Pipeline tasks endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route('wpqt/v1', '/token/board/tasks', [
        'methods'  => 'GET',
        'callback' => function (WP_REST_Request $request) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $tasks = ServiceLocator::get('TaskRepository')->getTasks(['pipeline_id' => $cachedDbToken->pipeline_id, 'is_archived' => false]);

                ServiceLocator::get('LogService')->log(
                    "Board tasks fetched by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id'       => $cachedDbToken->pipeline_id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                return $responseService->createTokenApiResponse(true, 200, [
                    'tasks' => $tasks
                ]);
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while getting the board tasks');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_TASKS_PERMISSION]);
        },
    ]);

    register_rest_route('wpqt/v1', '/token/board/tasks', [
        'methods'  => 'POST',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $automationService = ServiceLocator::get('AutomationService');
                $webhookService = ServiceLocator::get('WebhookService');
                $taskData = array_merge(
                    ['pipelineId' => $cachedDbToken->pipeline_id],
                    wpqtBuildParamsFromRequest($request, ['name', 'description', 'task_focus_color'])
                );

                $task = ServiceLocator::get('TaskService')->createTask($request->get_param('stage_id'), $taskData);

                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} created by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                /* Handle automations */
                $executionResults = $automationService->handleAutomations(
                    $task->pipeline_id,
                    $task->id,
                    WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                    WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED,
                );
                /* End of handling automations */

                /* Handle webhooks */
                $webhookService->handleWebhooks(
                    $task->pipeline_id,
                    [
                        [
                            'data' => [
                                'relatedObject' => $task
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

                return $responseService->createTokenApiResponse(true, 200, [
                    'task' => $task
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while creating the task');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_POST_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => [
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
            'task_focus_color' => [
                'required'          => false,
                'validate_callback' => ['WPQT\RequestValidation', 'validateColorParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'stage_id' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ]
        ],
    ]);

    register_rest_route('wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)', [
        'methods'  => 'PATCH',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $paramsToUpdate = wpqtBuildParamsFromRequest($request, ['name', 'description', 'task_focus_color', 'due_date']);
                $taskId = $request->get_param('task_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

                if (wpqtIsEntityUnauthorizedForPipeline($task, $cachedDbToken->pipeline_id)) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }

                $taskUpdated = ServiceLocator::get('TaskService')->editTask($taskId, $paramsToUpdate);

                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} updated by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'task' => $taskUpdated
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while updating the task');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => [
            'task_id' => [
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
            'task_focus_color' => [
                'required'          => false,
                'validate_callback' => ['WPQT\RequestValidation', 'validateColorParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
            'due_date' => [
                'required'          => false,
                'validate_callback' => ['WPQT\RequestValidation', 'validateDateTimeParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
            ],
        ],
    ]);

    register_rest_route('wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)/order', [
        'methods'  => 'PATCH',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $taskId = $request->get_param('task_id');
                $taskOrder = $request->get_param('task_order');
                $stageId = $request->get_param('stage_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

                if (wpqtIsEntityUnauthorizedForPipeline($task, $cachedDbToken->pipeline_id)) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }

                if ($stageId) {
                    $stage = ServiceLocator::get('StageRepository')->getStageById($stageId);

                    if (wpqtIsEntityUnauthorizedForPipeline($stage, $cachedDbToken->pipeline_id)) {
                        return $responseService->createTokenApiResponse(false, 404, [
                            'message' => 'Stage not found for the provided token'
                        ]);
                    }
                }

                $targetStageId = $stageId ?? $task->stage_id;
                $maxTaskOrder = ServiceLocator::get('TaskService')->getNextTaskOrder($targetStageId);

                if ($taskOrder > $maxTaskOrder) {
                    return $responseService->createTokenApiResponse(false, 400, [
                        'message' => 'Invalid task_order. Maximum allowed value is ' . $maxTaskOrder
                    ]);
                }

                $moveResult = ServiceLocator::get('TaskService')->moveTask($taskId, $targetStageId, $taskOrder);

                if (true === $moveResult->stageChanged) {
                    /* Handle webhooks */
                    ServiceLocator::get('WebhookService')->handleWebhooks(
                        $moveResult->task->pipeline_id,
                        [
                            [
                                'data' => [
                                    'relatedObject' => $moveResult->task,
                                    'extraData'     => [
                                        'task_prev_stage_id' => $moveResult->oldStageId,
                                        'task_new_stage_id'  => $moveResult->newStageId
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
                }

                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} order updated by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'task' => $moveResult->task
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while updating the task order');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => [
            'task_id' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            'task_order' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            'stage_id' => [
                'required'          => false,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
        ],
    ]);

    register_rest_route('wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)/done', [
        'methods'  => 'PATCH',
        'callback' => function (WP_REST_Request $request) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $taskMarkedDoneParam = $request->get_param('is_done');
                $taskId = $request->get_param('task_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');

                if (wpqtIsEntityUnauthorizedForPipeline($task, $cachedDbToken->pipeline_id)) {
                    return ServiceLocator::get('ResponseService')->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }

                if (!ServiceLocator::get('SettingsValidationService')->isAllowedToMarkTaskDone($task->id)) {
                    return ServiceLocator::get('ResponseService')->createTokenApiResponse(false, 403, [
                        'message' => 'Tasks can only be marked as done in the last stage according to board settings'
                    ]);
                }

                $changedTask = ServiceLocator::get('TaskService')->changeTaskDoneStatus($task->id, $taskMarkedDoneParam);

                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} marked as " . ($taskMarkedDoneParam ? 'done' : 'not done') . " by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                /* Handle automations */
                $trigger = $taskMarkedDoneParam ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE;
                $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                    $task->pipeline_id,
                    $task->id,
                    WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                    $trigger,
                    (object) [
                       'apiToken' => $cachedDbToken,
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
                                'target_action' => $taskMarkedDoneParam ? WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_COMPLETED : WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_NOT_COMPLETED,
                            ]
                        ]
                    ]
                );
                /* End Handle webhooks */

                $wpdb->query('COMMIT');

                return ServiceLocator::get('ResponseService')->createTokenApiResponse(true, 200, [
                    'task' => $changedTask
                ]);
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while updating the task status');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => [
            'task_id' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
            ],
            'is_done' => [
                'required'          => true,
                'validate_callback' => ['WPQT\RequestValidation', 'validateBooleanParam'],
                'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeBooleanParam'],
            ]
        ],
    ]);

    register_rest_route('wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)', [
        'methods'  => 'DELETE',
        'callback' => function (WP_REST_Request $request) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $taskId = $request->get_param('task_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

                if (wpqtIsEntityUnauthorizedForPipeline($task, $cachedDbToken->pipeline_id)) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }
                ServiceLocator::get('TaskService')->deleteTask($taskId);
                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} deleted by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'pipeline_id'   => $cachedDbToken->pipeline_id,
                        'created_by'    => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                /* Handle automations */
                $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                    $task->pipeline_id,
                    $task->id,
                    WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK,
                    WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED,
                    (object) [
                        'deletedTask'       => $task,
                        'deletedByApiToken' => $cachedDbToken
                    ]
                );
                /* End of handling automations */

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
                                'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED,
                            ]
                        ]
                    ],
                    $executionResults->executedAutomations
                );
                /* End Handle webhooks */

                return $responseService->createTokenApiResponse(true, 200, []);
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, 'A system error occurred while deleting the task');
            }
        },
        'permission_callback' => function (WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_DELETE_PIPELINE_TASKS_PERMISSION]);
        },
    ]);
}
