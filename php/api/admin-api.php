<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Response\ApiResponse;
use WPQT\Log\LogRepository;
use WPQT\Comment\CommentRepository;
use WPQT\Comment\CommentService;
use WPQT\User\UserRepositry;
use WPQT\User\UserService;
use WPQT\Nonce\NonceService;
use WPQT\Pipeline\PipelineRepository;
use WPQT\Customfield\CustomFieldRepository;
use WPQT\Pipeline\PipelineService;
use WPQT\Task\TaskRepository;
use WPQT\Task\TaskService;
use WPQT\Stage\StageService;
use WPQT\Permission\PermissionService;
use WPQT\RequestValidation;
use WPQT\Session\SessionRepository;
use WPQT\Session\SessionService;
use WPQT\Log\LogService;
use WPQT\User\UserRepository;
use WPQT\UserPage\UserPageService;

function validate_numeric($param, $request, $key) {
    return is_numeric($param);
}

function sanitize_absint($param, $request, $key) {
    return absint($param);
}

function WPQTverifyApiNonce($data) {
    $nonce = $data->get_header('X-WPQT-API-Nonce');
    NonceService::verifyNonce($nonce, WPQT_ADMIN_API_NONCE);

    return true;
}

add_action('rest_api_init', 'wpqt_register_api_routes');
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
                    WPQTverifyApiNonce($data);
                    $pipelineRepo = new PipelineRepository();
                    $pipeline = $pipelineRepo->getFullPipeline( $data['id'] );
                    $pipelines = $pipelineRepo->getPipelines();

                    return new WP_REST_Response((new ApiResponse(true, array(), (object)[
                        'pipeline' => $pipeline,
                        'pipelines' => $pipelines

                    ]))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $pipelineRepo = new PipelineRepository();
                    $pipelines = $pipelineRepo->getPipelines();

                    return new WP_REST_Response((new ApiResponse(true, array(), $pipelines))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                try {
                    WPQTverifyApiNonce($data);
                    $pipelineService = new PipelineService();
                    $newPipeline = $pipelineService->createPipeline($data['name']);
                   
                    return new WP_REST_Response((new ApiResponse(true, array(), $newPipeline))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $pipelineService = new PipelineService();
                    $pipeline = $pipelineService->editPipeline($data['id'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ));

                    $wpdb->query('COMMIT');
                    return new WP_REST_Response((new ApiResponse(true, array(), $pipeline))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $pipelineService = new PipelineService();
                    $pipelineService->markPipelineAsPrimary($data['id']);

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $tasksRepo = new TaskRepository();
                    $archivedTasks = $tasksRepo->getArchivedTasks();

                    return new WP_REST_Response((new ApiResponse(true, array(), $archivedTasks))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $logRepo = new LogRepository();
                    $logs = $logRepo->getLogs($data['id'], WP_QT_LOG_TYPE_TASK);
              

                    return new WP_REST_Response((new ApiResponse(true, array(), $logs))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $taskService = new TaskService();
                    $taskService->moveTask( $data['id'], $data['stageId'], $data['order'] );

                    $wpdb->query('COMMIT');
                    return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $taskService = new TaskService();
                    
                    $newTask = $taskService->createTask( $data['stageId'], array(
                        "name" => $data['name'],
                        "pipelineId" => $data['pipelineId'],
                    ) );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array(), $newTask))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $taskService = new TaskService();
                    $task = $taskService->editTask( $data['id'], array(
                        "name" => $data['name'],
                        "description" => $data['description'],
                        "free_for_all" => $data['freeForAll'],
                    ) );

                    return new WP_REST_Response((new ApiResponse(true, array(), $task))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');
                    $taskService = new TaskService();
                    $taskService->deleteTask( $data['id'] );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
        'tasks/(?P<id>\d+)/archive',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                global $wpdb;

                try {
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');
                    $taskService = new TaskService();
                    $taskService->archiveTask( $data['id'] );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');
                    $taskService = new TaskService();
                    $taskService->restoreArchivedTask( $data['id'] );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $stageService = new StageService();

                    $newStage = $stageService->createStage( $data['pipelineId'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ) );
                    return new WP_REST_Response((new ApiResponse(true, array(), $newStage))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $stageService = new StageService();

                    $stage = $stageService->editStage( $data['id'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ) );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    'required' => true,
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $stageService = new StageService();

                    $stage = $stageService->moveStage( $data['id'], array(
                        "direction" => $data['direction'],
                    ) );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $stageService = new StageService();
                    $stageService->deleteStage( $data['id'] );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');
                    
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
        'stages/(?P<id>\d+)/archive-tasks',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                global $wpdb;

                try {
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $stageService = new StageService();
                    $stageService->archiveStageTasks( $data['id'] );
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                } catch (Exception $e) {
                    $wpdb->query('ROLLBACK');
                    
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $userRepo = new UserRepository();
                    $users = $userRepo->getUsers();

                    return new WP_REST_Response((new ApiResponse(true, array(), $users))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
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
                }catch(WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array()))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');
                    $userService = new UserService();
                    $user = $userService->createUser(array(
                        "name" => $data['name'],
                        "description" => $data['description'],
                    ));
                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                }catch(Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
            
                    $taskRepo = new TaskRepository();
                    $userTasks = $taskRepo->getTasksAssignedToUser($data['id'], true);
                   
                    return new WP_REST_Response((new ApiResponse(true, array(), $userTasks))->toArray(), 200);
                }catch(Exception $e) {
    
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
        'users/(?P<id>\d+)/tasks',
        array(
            'methods' => 'POST',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
            
                    $userService = new UserService();
                    $userService->assignTaskToUser($data['id'], $data->get_param('task_id'));

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                }catch(Exception $e) {
    
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
            ),
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'users/(?P<id>\d+)/tasks',
        array(
            'methods' => 'DELETE',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
            
                    $userService = new UserService();
                    $userService->removeTaskFromUser($data['id'], $data->get_param('task_id'));

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                }catch(Exception $e) {
                    
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $userService = new UserService();
                    $user = $userService->editUser($data['id'], $data->get_param('user'));

                    return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $wpdb->query('START TRANSACTION');

                    $userService = new UserService();
                    $userService->resetUserPassword($data['id']);
                    
                    $wpdb->query('COMMIT');
                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                }catch(Exception $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $userService = new UserService();
                    $user = $userService->changeUserStatus($data['id'], $data['status']);

                    return new WP_REST_Response((new ApiResponse(true, array(), $user))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
        'users/(?P<id>\d+)',
        array(
            'methods' => 'DELETE',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $userService = new UserService();
                    $userService->deleteUser($data['id']);

                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
        'users/sessions/(?P<id>\d+)/status',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $sessionService = new SessionService();
                    $sessionService->changeSessionStatus($data['id'], $data['status']);
                 
                    return new WP_REST_Response((new ApiResponse(true, array() ))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $sessionService = new SessionService();
                    $sessionService->deleteSession($data['id']);
                 
                    return new WP_REST_Response((new ApiResponse(true, array()))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $sessionsRepo = new SessionRepository();
                    $userSessions = $sessionsRepo->getUserSessions();
                    
                    return new WP_REST_Response((new ApiResponse(true, array(), $userSessions))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionService::hasRequiredPermissionsForPrivateAPI();
            }
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
                    WPQTverifyApiNonce($data);
                    $logRepo = new LogRepository();
                    $logs = $logRepo->getLogs($data['typeId'], $data['type']);
                    
                    return new WP_REST_Response((new ApiResponse(true, array(), $logs))->toArray(), 200);
                }catch(Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    WPQTverifyApiNonce($data);
                    $commentRepo = new CommentRepository();
                    $comments = $commentRepo->getComments( $data->get_param('typeId'), $data->get_param('type'), $data->get_param('isPrivate') );
              
                    return new WP_REST_Response((new ApiResponse(true, array(), $comments))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
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
                    WPQTverifyApiNonce($data);
                    $commentService = new CommentService();
                    $adminId = get_current_user_id();
                    $newComemnt = $commentService->createComment($data['typeId'], $data['type'], $data['isPrivate'], $data['comment'], $adminId, true);
              
                    return new WP_REST_Response((new ApiResponse(true, array(), $newComemnt))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
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
                    'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
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
    Custom Fields endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route(
        'wpqt/v1',
        'custom-fields',
        array(
            'methods' => 'GET',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $customFieldRepo = new CustomFieldRepository();

                    $customFields = $customFieldRepo->getCustomFields($data['entityId'], $data['entityType']);

                    return new WP_REST_Response((new ApiResponse(true, array(), $customFields))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionService::hasRequiredPermissionsForPrivateAPI();
            },
            'args' => array(
                'entityType' => array(
                    'required' => true,
                    'validate_callback' => array('WPQT\RequestValidation', 'validateStringParam'),
                    'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeStringParam'),
                ),
                'entityId' => array(
                    'required' => true,
                    'validate_callback' => array('WPQT\RequestValidation', 'validateNumericParam'),
                    'sanitize_callback' => array('WPQT\RequestValidation', 'sanitizeAbsint'),
                ),
            ),
        ),
    );
}

