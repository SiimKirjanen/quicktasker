<?php
use WPQT\Response\ApiResponse;

function WPQTverifyApiNonce($data) {
    $nonce = $data->get_header('X-WPQT-API-Nonce');

    if (!isset($nonce) || !wp_verify_nonce($nonce, 'wpqt_api_nonce')) {
        throw new Exception('rest_nonce_invalid');
    }

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

                    return new WP_REST_Response((new ApiResponse(true, array(), $pipeline))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
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
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
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
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    /*
    ==================================================================================================================================================================================================================
    Task endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route(
        'wpqt/v1',
        'tasks/(?P<id>\d+)/move',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                global $wpdb;

                $wpdb->query('START TRANSACTION');
                try {
                    WPQTverifyApiNonce($data);
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
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'tasks',
        array(
            'methods' => 'POST',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $taskService = new TaskService();
                    $newTask = $taskService->createTask( $data['stageId'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ) );
                    return new WP_REST_Response((new ApiResponse(true, array(), $newTask))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
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
                    $taskService->editTask( $data['id'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ) );

                    return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
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
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'stages/(?P<id>\d+)',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $stageService = new StageService();

                    $stage = $stageService->editStage( $data['id'], array(
                        "name" => $data['name'],
                        "description" => $data['description']
                    ) );
                    return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } 
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'stages/(?P<id>\d+)/move',
        array(
            'methods' => 'PATCH',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $stageService = new StageService();

                    $stage = $stageService->moveStage( $data['id'], array(
                        "direction" => $data['direction'],
                    ) );
                    return new WP_REST_Response((new ApiResponse(true, array(), $stage))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                } 
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'stages/(?P<id>\d+)',
        array(
            'methods' => 'DELETE',
            'callback' => function( $data ) {
                try {
                    WPQTverifyApiNonce($data);
                    $stageService = new StageService();
                    $stageService->deleteStage( $data['id'] );

                    return new WP_REST_Response((new ApiResponse(true))->toArray(), 200);
                } catch (Exception $e) {
                    return new WP_REST_Response((new ApiResponse(false, array($e->getMessage())))->toArray(), 400);
                }
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
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
                WPQTverifyApiNonce($data);
                return ['s'];
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'users/(?P<id>\d+)',
        array(
            'methods' => 'GET',
            'callback' => function( $data ) {
                WPQTverifyApiNonce($data);
                return ['s'];
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );
}

