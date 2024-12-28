<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\WPQTException;
use WPQT\Response\ApiResponse;
use WPQT\Log\LogRepository;
use WPQT\Comment\CommentRepository;
use WPQT\Comment\CommentService;
use WPQT\User\UserRepositry;
use WPQT\Settings\SettingRepository;
use WPQT\User\UserService;
use WPQT\Nonce\NonceService;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Customfield\CustomFieldRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Task\TaskRepository;
use WPQT\Overview\OverViewRepository;
use WPQT\Task\TaskService;
use WPQT\Stage\StageService;
use WPQT\Permission\PermissionService;
use WPQT\RequestValidation;
use WPQT\Session\SessionRepository;
use WPQT\Session\SessionService;
use WPQT\Log\LogService;
use WPQT\User\UserRepository;
use WPQT\Stage\StageRepository;
use WPQT\UserPage\UserPageService;
use WPQT\Customfield\CustomFieldService;
use WPQT\Settings\SettingsService;
use WPQT\Settings\SettingsValidationService;
use WPQT\Capability\CapabilityService;
use WPQT\Automation\AutomationService;
use WPQT\ServiceLocator;

add_action('rest_api_init', 'wpqt_register_api_routes');
if ( ! function_exists( 'wpqt_register_api_routes' ) ) {
    function wpqt_register_api_routes() {
        /*
        ==================================================================================================================================================================================================================
        Pipeline endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $pipelineRepo = ServiceLocator::get('PipelineRepository');

                        $pipeline = $pipelineRepo->getFullPipeline( $data['id'] );
                        $pipelines = $pipelineRepo->getPipelines();
                        $pipelineSettings = ServiceLocator::get('SettingRepository')->getPipelineSettings($data['id']);
                        $pipeline->settings = $pipelineSettings;
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'pipeline' => $pipeline,
                            'pipelines' => $pipelines,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e, "Failed to get pipeline");
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $pipelineRepo = new PipelineRepository();
                        $pipelines = $pipelineRepo->getPipelines();

                        return new WP_REST_Response((new ApiResponse(true, array(), $pipelines))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        $newPipeline = $pipelineService->createPipeline($data['name']);
                        $logService->log('Board ' . $newPipeline->name . ' created', WP_QT_LOG_TYPE_PIPELINE, $newPipeline->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                    
                        $wpdb->query('COMMIT');
                        return new WP_REST_Response((new ApiResponse(true, array(), $newPipeline))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'name' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        $pipeline = $pipelineService->editPipeline($data['id'], array(
                            "name" => $data['name'],
                            "description" => $data['description']
                        ));
                        $logService->log('Board ' . $pipeline->name . ' edited', WP_QT_LOG_TYPE_PIPELINE, $pipeline->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        $wpdb->query('COMMIT');
                        return new WP_REST_Response((new ApiResponse(true, array(), $pipeline))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
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
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/set-primary',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        $pipeline = $pipelineService->markPipelineAsPrimary($data['id']);
                        $logService->log('Board ' . $pipeline->name . ' marked as primary', WP_QT_LOG_TYPE_PIPELINE, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $pipelineService = new PipelineService();
                        $logService = new LogService();
                        
                        $data = $pipelineService->deletePipeline($data['id']);
                        $logService->log('Board ' . $data->deletedPipeline->name . ' deleted', WP_QT_LOG_TYPE_PIPELINE, $data->deletedPipeline->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'deletedPipelineId' => $data->deletedPipeline->id,
                            'pipelineIdToLoad' => $data->pipelineIdToLoad
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Task endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'tasks/archived',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $tasksRepo = new TaskRepository();
                        $archivedTasks = $tasksRepo->getArchivedTasks(true);

                        return new WP_REST_Response((new ApiResponse(true, array(), $archivedTasks))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/logs',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $logs = ServiceLocator::get('LogRepository')->getLogs($data['id'], WP_QT_LOG_TYPE_TASK);
                
                        return new WP_REST_Response((new ApiResponse(true, array(), $logs))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/move',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();
                        $stageRepo = new StageRepository();
                        $moveInfo = $taskService->moveTask( $data['id'], $data['stageId'], $data['order'] );
                        $stage = $stageRepo->getStageById($data['stageId']);

                        if($moveInfo->stageChanged === true) {
                            $logService->log('Task ' . $moveInfo->task->name . ' moved to ' . $stage->name . ' stage', WP_QT_LOG_TYPE_TASK, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        }else {
                            $logService->log('Task ' . $moveInfo->task->name . ' order changed in ' . $stage->name . ' stage', WP_QT_LOG_TYPE_TASK, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        }
                        
                        $wpdb->query('COMMIT');
                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'stageId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'order' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        
                        $taskService = new TaskService();
                        $logService = new LogService();
                        $automationService = ServiceLocator::get('AutomationService');
                        
                        $newTask = $taskService->createTask( $data['stageId'], array(
                            "name" => $data['name'],
                            "pipelineId" => $data['pipelineId'],
                        ) );
                        $logService->log('Task ' . $newTask->name . ' created', WP_QT_LOG_TYPE_TASK, $newTask->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        /* Handle automations */
                        $executionResults = $automationService->handleAutomations(
                            $newTask->pipeline_id, 
                            $newTask->id, 
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_CREATED,
                        );
                        /* End of handling automations */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'newTask' => $newTask,
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations' => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'stageId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'name' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'pipelineId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $taskService = new TaskService();
                        $logService = new LogService();

                        $task = $taskService->editTask( $data['id'], array(
                            "name" => $data['name'],
                            "description" => $data['description'],
                            "free_for_all" => $data['freeForAll'],
                        ) );
                        $logService->log('Task ' . $task->name . ' edited', WP_QT_LOG_TYPE_TASK, $task->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array(), $task))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
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
                    'freeForAll' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        
                        $deletedTask = ServiceLocator::get('TaskService')->deleteTask( $data['id'] );

                         /* Handle automations */
                         $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $deletedTask->pipeline_id, 
                            $deletedTask->id, 
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DELETED,
                            (object)[
                                'deletedTask' => $deletedTask,
                                'deletedByUserId' => get_current_user_id()
                            ]
                         );
                         /* End of handling automations */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations' => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/archive',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();

                        $task = $taskService->archiveTask( $data['id'] );
                        $logService->log('Task ' . $task->name . ' archived', WP_QT_LOG_TYPE_TASK, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/archive-restore',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $taskService = new TaskService();
                        $logService = new LogService();

                        $task = $taskService->restoreArchivedTask( $data['id'] );
                        $logService->log('Task ' . $task->name . ' restored from archive', WP_QT_LOG_TYPE_TASK, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'tasks/(?P<id>\d+)/done',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');        
                        $taskService = new TaskService();
                        $logService = new LogService();
                        $settingsValidationService = new SettingsValidationService();
                        $automationService = new AutomationService();
                        $taskMarkedAsDone = $data['done'];

                        if( !$settingsValidationService->isAllowedToMarkTaskDone($data['id']) ) {
                            throw new WPQTException('Task can be marked as done on last stage', true);
                        }

                        $task = $taskService->changeTaskDoneStatus( $data['id'], $taskMarkedAsDone);
                        $logMessage = $taskMarkedAsDone ? 'Task ' . $task->name .  ' status changed to completed' : 'Task ' . $task->name .  ' status changed to not completed';

                        $logService->log($logMessage, WP_QT_LOG_TYPE_TASK, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        /* Handle automations */
                        $trigger = $taskMarkedAsDone ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_DONE : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_NOT_DONE;
                        $executionResults = $automationService->handleAutomations(
                            $task->pipeline_id, 
                            $task->id, WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                            $trigger
                        );
                        /* End of handling automations */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'task' => $task,
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations' => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'done' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Stage endpoints
        ==================================================================================================================================================================================================================
        */
        register_rest_route(
            'wpqt/v1',
            'stages',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        $stageService = new StageService();
                        $logService = new LogService();

                        $newStage = $stageService->createStage( $data['pipelineId'], array(
                            "name" => $data['name'],
                            "description" => $data['description']
                        ) );

                        $logService->log('Stage ' . $newStage->name .  ' created', WP_QT_LOG_TYPE_STAGE, $newStage->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array(), $newStage))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'pipelineId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'name' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'description' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();

                        $stage = $stageService->editStage( $data['id'], array(
                            "name" => $data['name'],
                            "description" => $data['description'] ?? ''
                        ) );
                        $logService->log('Stage ' . $stage->name . ' edited', WP_QT_LOG_TYPE_STAGE, $stage->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
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
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)/move',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();

                        $stage = $stageService->moveStage( $data['id'], array(
                            "direction" => $data['direction'],
                        ) );
                        $logService->log('Stage ' . $stage->name . ' moved', WP_QT_LOG_TYPE_STAGE, $stage->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'direction' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $stageService->deleteStage( $data['id'] );
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'stages/(?P<id>\d+)/archive-tasks',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $stageService = new StageService();
                        $logService = new LogService();
                        $archivedTasks = $stageService->archiveStageTasks( $data['id'] );

                        foreach($archivedTasks as $task) {
                            $logService->log('Task ' . $task->name . ' archived', WP_QT_LOG_TYPE_TASK, $task->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        }

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );
        /*
        ==================================================================================================================================================================================================================
        User endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'users',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $userRepo = new UserRepository();
                        $users = $userRepo->getUsers();

                        return new WP_REST_Response((new ApiResponse(true, array(), $users))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/extended',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
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

                        return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->createUser(array(
                            "name" => $data['name'],
                            "description" => $data['description'],
                        ));
                        $logService->log('User ' . $user->name . ' created', WP_QT_LOG_TYPE_USER, $user->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'name' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'description' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {                
                        $userTasks = ServiceLocator::get('TaskRepository')->getTasksAssignedToUser($data['id'], true);
                    
                        return new WP_REST_Response((new ApiResponse(true, array(), $userTasks))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks/(?P<task_id>\d+)',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');                
                        $userService = new UserService();
                        $logService = new LogService();
                        $userRepo = new UserRepository();

                        $task = $userService->assignTaskToUser($data['id'], $data['task_id'], $data['user_type']);
                        $user = $userRepo->getUserByIdAndType($data['id'], $data['user_type']);

                        $logService->log('Task ' . $task->name . ' assigned to ' . $user->name, WP_QT_LOG_TYPE_TASK, $data->get_param('task_id'), WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $logService->log('Task ' . $task->name . ' assigned to ' . $user->name, WP_QT_LOG_TYPE_USER, $user->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id, 
                            $task->id, 
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_ASSIGNED,
                            $user
                         );
                         /* End of handling automations */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations' => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'task_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'user_type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateUserType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/tasks/(?P<task_id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {   
                        $wpdb->query('START TRANSACTION');             
                        $logService = ServiceLocator::get('LogService');

                        $task = ServiceLocator::get('UserService')->removeTaskFromUser($data['id'], $data['task_id'], $data['user_type']);
                        $user = ServiceLocator::get('UserRepository')->getUserByIdAndType($data['id'], $data['user_type']);

                        $logService->log('Task ' . $task->name . ' unassigned from ' . $user->name, WP_QT_LOG_TYPE_TASK, $data['task_id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $logService->log('User ' . $user->name . ' unassigned from ' . $task->name . " task", WP_QT_LOG_TYPE_USER, $user->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        /* Handle automations */
                        $executionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                            $task->pipeline_id, 
                            $task->id, 
                            WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                            WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_UNASSIGNED,
                            $user
                         );
                         /* End of handling automations */

                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'executedAutomations' => $executionResults->executedAutomations,
                            'failedAutomations' => $executionResults->failedAutomations
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'task_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'user_type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateUserType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->editUser($data['id'], $data->get_param('user'));
                        $logService->log('User ' . $user->name . ' edited', WP_QT_LOG_TYPE_USER, $user->id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/password-reset',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;
                    
                    try {
                        $wpdb->query('START TRANSACTION');

                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->resetUserPassword($data['id']);

                        $logService->log('User ' . $user->name . ' password reset', WP_QT_LOG_TYPE_USER, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        
                        $wpdb->query('COMMIT');
                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)/status',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->changeUserStatus($data['id'], $data['status']);
                        $statusString = $data['status'] ? 'active' : 'disabled';
                        $logService->log('User ' . $user->name . ' status changed to ' . $statusString , WP_QT_LOG_TYPE_USER, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'status' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/(?P<id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    try {
                        $userService = new UserService();
                        $logService = new LogService();

                        $user = $userService->deleteUser($data['id']);
                        $logService->log('User ' . $user->name . ' marked as deleted', WP_QT_LOG_TYPE_USER, $data['id'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/sessions/(?P<id>\d+)/status',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $sessionService = new SessionService();
                        $sessionService->changeSessionStatus($data['id'], $data['status']);
                    
                        return new WP_REST_Response((new ApiResponse(true, array() ))->toArray(), 200);
                    } catch (Throwable $e) {

                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'status' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/sessions/(?P<id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    try {
                        $sessionService = new SessionService();
                        $sessionService->deleteSession($data['id']);
                    
                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    )
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'users/sessions',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $sessionsRepo = new SessionRepository();
                        $userSessions = $sessionsRepo->getUserSessions();
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), $userSessions))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                }
            ),
        );

    
        /*
        ==================================================================================================================================================================================================================
        WP users endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'wp-users',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $userRepo = new UserRepository();
                        $users = $userRepo->getWPNonAdminUsers();

                        return new WP_REST_Response((new ApiResponse(true, array(), $users))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredParmissionsForPrivateAPIUsersEndpoints();
                },
                'args' => array(
                    'type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'wp-users/(?P<id>\d+)/capabilities',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $capabilityService = new CapabilityService();
                        $capabilities = (object)[
                            WP_QUICKTASKER_ADMIN_ROLE => $data[WP_QUICKTASKER_ADMIN_ROLE],
                            WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE => $data[WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE],
                            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS => $data[WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS],
                            WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS => $data[WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS]
                        ];
                          
                        $capabilityService->updateWPUserCapabilities($data['id'], $capabilities);
                   
                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredParmissionsForPrivateAPIUsersEndpoints();
                },
                'args' => array(
                    WP_QUICKTASKER_ADMIN_ROLE => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                    WP_QUICKTASKER_ADMIN_ROLE_ALLOW_DELETE => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                    WP_QUICKTASKER_ADMIN_ROLE_MANAGE_USERS => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                    WP_QUICKTASKER_ADMIN_ROLE_MANAGE_SETTINGS => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Logs endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'logs',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $logRepo = new LogRepository();
                        $logs = $logRepo->getLogs($data['typeId'], $data['type']);
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), $logs))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'typeId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    )
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'global-logs',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $logRepo = new LogRepository();

                        $type = $data['type'] ?? null;
                        $typeId = $data['typeId'] ?? null;
                        $numberOfLogs = $data['numberOfLogs'] ?? null;
                        $createdBy = $data['createdBy'] ?? null;

                        $logs = $logRepo->getGlobalLogs($type, $typeId, $createdBy, $numberOfLogs, $data['order']);
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), $logs))->toArray(), 200);
                    }catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'type' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateLogType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'typeId' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'numberOfLogs' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'createdBy' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateLogCreatedBy'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'order' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'valdiateQueryOrder'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Comments endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'comments',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $comments = ServiceLocator::get('CommentRepository')->getComments( $data->get_param('typeId'), $data->get_param('type'), $data->get_param('isPrivate') );
                
                        return new WP_REST_Response((new ApiResponse(true, array(), $comments))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'typeId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCommentType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'isPrivate' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'comments',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        $commentService = new CommentService();
                        $adminId = get_current_user_id();
                        $newComemnt = $commentService->createComment($data['typeId'], $data['type'], $data['isPrivate'], $data['comment'], $adminId, true);
                        $automationExecutionResults = [];
                        
                          /* Handle automations */
                          if ( $data['type'] == WP_QT_LOG_TYPE_TASK ) {
                            $automationTrigger = $data['isPrivate'] ? WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PRIVATE_COMMENT_ADDED : WP_QUICKTASKER_AUTOMATION_TRIGGER_TASK_PUBLIC_COMMENT_ADDED;
                            $task = ServiceLocator::get('TaskRepository')->getTaskById($data['typeId']);
                            $automationExecutionResults = ServiceLocator::get('AutomationService')->handleAutomations(
                                $task->pipeline_id, 
                                $task->id, 
                                WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_TASK, 
                                $automationTrigger,
                                $newComemnt
                             );
                          }  
                         /* End of handling automations */
                
                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'newComment' => $newComemnt,
                            'executedAutomations' => $automationExecutionResults,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'comment' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'typeId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCommentType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'isPrivate' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Custom Field endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'custom-fields',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $activeFields = $data->get_param( 'active' );
                        $customFields = ServiceLocator::get('CustomFieldRepository')->getRelatedCustomFields($data['entityId'], $data['entityType'], $activeFields);

                        return new WP_REST_Response((new ApiResponse(true, array(), $customFields))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'entityType' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCustomFieldEntityType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'entityId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'pipelineId' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'active' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    )
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();

                        $customField = $customFieldService->createCustomField($data['name'], $data['description'], $data['type'], $data['entityType'], $data['entityId']);
                        $logService->log('Custom field ' . $data['name'] . ' created', $data['entityType'], $data['entityId'], WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array(), $customField))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'entityType' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCustomFieldEntityType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'entityId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
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
                    'type' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCustomFieldType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    try {
                        $customFieldRepo = new CustomFieldRepository();
                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();

                        $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                        $customFieldService->markCustomFieldAsDeleted($data['custom_field_id']);
                        $logService->log('Custom field ' . $customField->name . ' marked as deleted', $customField->entity_type, $customField->entity_id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPIDeleteEndpoints();
                },
                'args' => array(
                    'custom_field_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)/value',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();
                        $customFieldRepo = new CustomFieldRepository();

                        $customField = $customFieldRepo->getCustomFieldById($data['custom_field_id']);
                        $customFieldService->updateCustomFieldValue($data['custom_field_id'], $data['entityId'], $data['entityType'], $data['value']);
                        $logService->log('Custom field ' . $customField->name . ' value updated', $customField->entity_type, $customField->entity_id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'custom_field_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'entityId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'entityType' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateCustomFieldEntityType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'value' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'custom-fields/(?P<custom_field_id>\d+)/restore',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $customFieldService = new CustomFieldService();
                        $logService = new LogService();

                        $customField = $customFieldService->restoreCustomField($data['custom_field_id']);
                        $logService->log('Custom field ' . $customField->name . ' restored', $customField->entity_type, $customField->entity_id, WP_QT_LOG_CREATED_BY_ADMIN, get_current_user_id());
                        $wpdb->query('COMMIT');

                        return new WP_REST_Response((new ApiResponse(true, array(), $customField))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'custom_field_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    )
                ),
            ),
        );

        /*
        ==================================================================================================================================================================================================================
        Settings endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'settings/user-page-custom-styles',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {
                        $styles = SettingsService::saveUserPageCustomStyles($data['styles']);

                        return new WP_REST_Response((new ApiResponse(true, array(), $styles))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'styles' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/settings',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {                        
                        $settingRepo = new SettingRepository();
                        $pipelineSettings = $settingRepo->getPipelineSettings($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'settings' => $pipelineSettings,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/settings/task-completion-done-restriction',
            array(
                'methods' => 'PATCH',
                'callback' => function( $data ) {
                    try {                        
                        $settingsService = new SettingsService();
                        $settingsService->updatePipelineTaskDoneCompletionRestriction($data['id'], $data['allow_task_completion_only_on_last_stage']);

                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'allow_task_completion_only_on_last_stage' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateBooleanParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeBooleanParam'),
                    ),
                ),
            ),
        );

         /*
        ==================================================================================================================================================================================================================
        Overview endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/overview',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $overviewRepo = new OverviewRepository();

                        $taskStartDate = $data['taskStartDate'] ?? null;
                        $taskDoneDate = $data['taskDoneDate'] ?? null;
                        $overview = $overviewRepo->getPipelineOverview($data['id'], $taskStartDate, $taskDoneDate);
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), $overview))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'taskStartDate' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateDateParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'taskDoneDate' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateDateParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

         /*
        ==================================================================================================================================================================================================================
        Automation endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {                 
                        $automationRepo = ServiceLocator::get('AutomationRepository');
                        $pipelineAutomations = $automationRepo->getPipelineAutomations($data['id']);

                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'automations' => $pipelineAutomations,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        $automation = ServiceLocator::get('AutomationService')->createAutomation($data['id'], null, $data['automationTarget'], $data['automationTrigger'], $data['automationAction'], $data['automationActionTargetId'], $data['automationActionTargetType'], $data['automationMetadata']);
                 
                        return new WP_REST_Response((new ApiResponse(true, array(), $automation))->toArray(), 200);
                    } catch (Throwable $e) {
                     
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'automationTarget' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateAutomationTargetType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'automationTrigger' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateAutomationTrigger'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'automationAction' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateAutomationAction'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'automationActionTargetId' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateOptionalNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeOptionalAbsint'),
                    ),
                    'automationActionTargetType' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateOptionslAutomationActionTargetType'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeOptionalStringParam'),
                    ),
                    'automationMetadata' => array(
                        'required' => false,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateOptionalStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeOptionalStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/automations/(?P<automation_id>\d+)',
            array(
                'methods' => 'DELETE',
                'callback' => function( $data ) {
                    global $wpdb;

                    try {
                        $wpdb->query('START TRANSACTION');
                        $deletedAutomation = ServiceLocator::get('AutomationService')->deleteAutomation($data['automation_id']);
      
                        $wpdb->query('COMMIT');
                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        $wpdb->query('ROLLBACK');
                        
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPISettingsEndpoints();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'automation_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );


         /*
        ==================================================================================================================================================================================================================
        Labels endpoints
        ==================================================================================================================================================================================================================
        */

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels',
            array(
                'methods' => 'GET',
                'callback' => function( $data ) {
                    try {
                        $labels = ServiceLocator::get('LabelRepository')->getPipelineLabels($data['id']);
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'labels' => $labels,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/labels',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        $label = ServiceLocator::get('LabelService')->createLabel($data['id'], $data['name'], $data['color']);
                        
                        return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                            'label' => $label,
                        ]))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'name' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                    'color' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                    ),
                ),
            ),
        );

        register_rest_route(
            'wpqt/v1',
            'pipelines/(?P<id>\d+)/tasks/(?P<task_id>\d+)/labels',
            array(
                'methods' => 'POST',
                'callback' => function( $data ) {
                    try {
                        ServiceLocator::get('LabelService')->assignLabel($data['task_id'], WP_QUICKTASKER_LABEL_RELATION_TYPE_TASK, $data['labelId']);
                        
                        return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                    } catch (Throwable $e) {
                        return ServiceLocator::get('ErrorHandlerService')->handlePrivateApiError($e);
                    }
                },
                'permission_callback' => function() {
                    return PermissionService::hasRequiredPermissionsForPrivateAPI();
                },
                'args' => array(
                    'id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'task_id' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                    'labelId' => array(
                        'required' => true,
                        'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                        'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                    ),
                ),
            ),
        );

    }
}

