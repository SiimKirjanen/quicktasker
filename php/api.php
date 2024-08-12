<?php
use WPQT\Response\ApiResponse;

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
                $pipelineRepo = new PipelineRepository();
                $test = $data['id'];

                $pipeline = $pipelineRepo->getFullPipeline( $data['id'] );

                return $pipeline;
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
                $pipelineRepo = new PipelineRepository();

                return $pipelineRepo->getPipelines();
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
                $taskService = new TaskService();
                return $taskService->moveTask( $data['id'], $data['stageId'], $data['order'] );
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
                $taskService = new TaskService();

                return $taskService->createTask( $data['stageId'], array(
                    "name" => $data['name']
                ) );
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
                $stageService = new StageService();

                return $stageService->createStage( $data['pipelineId'], array(
                    "name" => $data['name']
                ) );
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
                return ['s'];
            },
            'permission_callback' => function() {
                return PermissionRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );
}

