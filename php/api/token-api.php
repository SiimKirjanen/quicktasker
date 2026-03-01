<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Permission\PermissionService;
use WPQT\Services\ServiceLocator;
use WPQT\StageHasTasksException;

/**
 * Helper function to build parameters array from request
 * Only includes parameters that are not null
 * 
 * @param WP_REST_Request $request The request object
 * @param array $paramNames Array of parameter names to extract
 * @return array Associative array with only non-null parameters
 */
function wpqtBuildParamsFromRequest(WP_REST_Request $request, array $paramNames) {
    $params = [];
    foreach ($paramNames as $paramName) {
        $value = $request->get_param($paramName);
        if ($value !== null) {
            $params[$paramName] = $value;
        }
    }
    return $params;
}

add_action('rest_api_init', 'wpqt_register_token_api_routes');
function wpqt_register_token_api_routes() {

    /*
    ==================================================================================================================================================================================================================
    Pipeline endpoints
    ==================================================================================================================================================================================================================
    */
    register_rest_route( 'wpqt/v1', '/token/board', array(
        'methods' => 'GET',
        'callback' => function( WP_REST_Request $request ) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $pipeline = ServiceLocator::get('PipelineRepository')->getPipelineById($cachedDbToken->pipeline_id);
                $responseService = ServiceLocator::get('ResponseService');
                
                if (!$pipeline) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Board not found for the provided token'
                    ]);
                }
                return $responseService->createTokenApiResponse(true, 200, [
                    'board' => $pipeline
                ]);
                
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while getting the board");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_PERMISSION]);
        },
    ) );

    register_rest_route( 'wpqt/v1', '/token/board', array(
        'methods' => 'PATCH',
        'callback' => function( WP_REST_Request $request ) {
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
                        'type' => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id' => $updatedPipeline->id,
                        'pipeline_id' => $updatedPipeline->id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );
            
                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'board' => $updatedPipeline
                ]);
                
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');
                
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while updating the board");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_PERMISSION]);
        },
        'args' => array(
            'name' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'description' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
        ),
    ) );

    /*
    ==================================================================================================================================================================================================================
    Pipeline stage endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route( 'wpqt/v1', '/token/board/stages', array(
        'methods' => 'GET',
        'callback' => function( WP_REST_Request $request ) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $stages = ServiceLocator::get('StageRepository')->getStagesByPipelineId($cachedDbToken->pipeline_id);
                
                if ($stages === null) {
                    throw new \Exception('No stages found for the board associated with the provided token.');
                }

                return $responseService->createTokenApiResponse(true, 200, [
                    'stages' => $stages
                ]);
                
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while getting the board stages");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_STAGES_PERMISSION]);
        },
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/stages', array(
        'methods' => 'POST',
        'callback' => function( WP_REST_Request $request ) {
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
                        'type' => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id' => $cachedDbToken->pipeline_id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );
            
                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 201, [
                    'stage' => $stage
                ]);
                
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while creating a new stage");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_POST_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => array(
            'name' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'description' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
        ),
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/stages/(?P<stage_id>\d+)', array(
        'methods' => 'PATCH',
        'callback' => function( WP_REST_Request $request ) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stageData = wpqtBuildParamsFromRequest($request, ['name', 'description']);
                $stage = ServiceLocator::get('StageRepository')->getStageById($request->get_param('stage_id'));

                if (!$stage || $stage->pipeline_id != $cachedDbToken->pipeline_id) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Stage not found for the provided token'
                    ]);
                }

                $editedStage = ServiceLocator::get('StageService')->editStage($request->get_param('stage_id'), $stageData, $cachedDbToken->pipeline_id);

                ServiceLocator::get('LogService')->log(
                    "Board stage {$stage->name} edited by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type' => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id' => $cachedDbToken->pipeline_id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );
            
                $wpdb->query('COMMIT');

                return $responseService->createTokenApiResponse(true, 200, [
                    'stage' => $editedStage
                ]);
                
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while editing the stage");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => array(
            'name' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'description' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'stage_id' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
            ),
        ),
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/stages/(?P<stage_id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => function( WP_REST_Request $request ) {
            global $wpdb;

            try {
                $wpdb->query('START TRANSACTION');

                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $stage = ServiceLocator::get('StageRepository')->getStageById($request->get_param('stage_id'));

                if (!$stage || $stage->pipeline_id !== $cachedDbToken->pipeline_id) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Stage not found for the provided token'
                    ]);
                }
               
                ServiceLocator::get('StageService')->deleteStage($request->get_param('stage_id'));
                ServiceLocator::get('LogService')->log(
                    "Board stage {$stage->name} deleted by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type' => WP_QT_LOG_TYPE_PIPELINE,
                        'type_id' => $cachedDbToken->pipeline_id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
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

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while deleting the stage");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_DELETE_PIPELINE_STAGES_PERMISSION]);
        },
        'args' => array(
            'stage_id' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
            ),
        ),
    ) );

    /*
    ==================================================================================================================================================================================================================
    Pipeline tasks endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route( 'wpqt/v1', '/token/board/tasks', array(
        'methods' => 'GET',
        'callback' => function( WP_REST_Request $request ) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $tasks = ServiceLocator::get('TaskRepository')->getTasks(['pipeline_id' => $cachedDbToken->pipeline_id, 'is_archived' => false]);
                
                return $responseService->createTokenApiResponse(true, 200, [
                    'tasks' => $tasks
                ]);
                
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while getting the board tasks");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_GET_PIPELINE_TASKS_PERMISSION]);
        },
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/tasks', array(
        'methods' => 'POST',
        'callback' => function( WP_REST_Request $request ) {
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
                        'type' => WP_QT_LOG_TYPE_TASK,
                        'type_id' => $task->id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
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
                    array(
                        array(
                            'data' => array(
                                'relatedObject' => $task
                            ),
                            'webhookData' => array(
                                'target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_CREATED,
                            )
                        )
                    ),
                    $executionResults->executedAutomations
                );
                /* End of handling webhooks */
                
                $wpdb->query('COMMIT');
                
                return $responseService->createTokenApiResponse(true, 200, [
                    'task' => $task
                ]);
                
            } catch (Throwable $e) {
                $wpdb->query('ROLLBACK');

                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while creating the task");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_POST_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => array(
            'name' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'description' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'task_focus_color' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateColorParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'stage_id' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
            )
        ),
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)', array(
        'methods' => 'PATCH',
        'callback' => function( WP_REST_Request $request ) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $paramsToUpdate = wpqtBuildParamsFromRequest($request, ['name', 'description', 'task_focus_color']);
                $taskId = $request->get_param('task_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

                if (!$task || $task->pipeline_id !== $cachedDbToken->pipeline_id) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }

                $taskUpdated = ServiceLocator::get('TaskService')->editTask($taskId, $paramsToUpdate);
                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} updated by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type' => WP_QT_LOG_TYPE_TASK,
                        'type_id' => $task->id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );
                
                return $responseService->createTokenApiResponse(true, 200, [
                    'task' => $taskUpdated
                ]);
                
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while updating the task");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_PATCH_PIPELINE_TASKS_PERMISSION]);
        },
        'args' => array(
            'task_id' => array(
                'required' => true,
                'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
            ),
            'name' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'description' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
            'task_focus_color' => array(
                'required' => false,
                'validate_callback' => array('WPQT\RequestValidation', 'validateColorParam'),
                'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
            ),
        ),
    ) );

    register_rest_route( 'wpqt/v1', '/token/board/tasks/(?P<task_id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => function( WP_REST_Request $request ) {
            try {
                $cachedDbToken = ServiceLocator::get('ApiTokenService')->getRequestTokenCache(WP_QUICKTASKER_CACHED_API_DB_TOKEN);
                $responseService = ServiceLocator::get('ResponseService');
                $apiTokenRepository = ServiceLocator::get('ApiTokenRepository');
                $taskId = $request->get_param('task_id');
                $task = ServiceLocator::get('TaskRepository')->getTaskById($taskId);

                if (!$task || $task->pipeline_id !== $cachedDbToken->pipeline_id) {
                    return $responseService->createTokenApiResponse(false, 404, [
                        'message' => 'Task not found for the provided token'
                    ]);
                }
                ServiceLocator::get('TaskService')->deleteTask($taskId);
                ServiceLocator::get('LogService')->log(
                    "Task {$task->name} deleted by {$apiTokenRepository->getApiTokenName($cachedDbToken)}",
                    [
                        'type' => WP_QT_LOG_TYPE_TASK,
                        'type_id' => $task->id,
                        'pipeline_id' => $cachedDbToken->pipeline_id,
                        'created_by' => WP_QT_LOG_CREATED_BY_API_TOKEN,
                        'created_by_id' => $cachedDbToken->id,
                    ]
                );

                /* Handle automations */
                $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                    $task->pipeline_id, 
                    $task->id, 
                    WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                    WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED,
                    (object)[
                        'deletedTask' => $task,
                        'deletedByApiToken' => $cachedDbToken
                    ]
                );
                /* End of handling automations */

                 /* Handle webhooks */
                ServiceLocator::get('WebhookService')->handleWebhooks(
                    $task->pipeline_id, 
                    array(
                        array(
                            'data' => array(
                                'relatedObject' => $task
                            ),
                            'webhookData' => array(
                                'target_type' => WP_QUICKTASKER_WEBHOOK_TARGET_TYPE_TASK,
                                'target_action' => WP_QUICKTASKER_WEBHOOK_TARGET_ACTION_DELETED,
                            )
                        )
                    ),
                    $executionResults->executedAutomations
                );
                /* End Handle webhooks */
                
                return $responseService->createTokenApiResponse(true, 200, []);
                
            } catch (Throwable $e) {
                return ServiceLocator::get('ErrorHandlerService')->handleTokenApiError($e, "A system error occurred while deleting the task");
            }
        },
        'permission_callback' => function(WP_REST_Request $request) {
            return ServiceLocator::get('ApiTokenService')->validateAndSetRequestTokenCache($request, [WP_QUICKTASKER_API_DELETE_PIPELINE_TASKS_PERMISSION]);
        },
    ) );
}