<?php

add_action('rest_api_init', 'wpqt_register_api_routes');
function wpqt_register_api_routes() {
    /*
    ==================================================================================================================================================================================================================
    Pipeline endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route(
        'wpqt/v1',
        'pipeline/(?P<id>\d+)',
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
        'task/(?P<id>\d+)/move',
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
                    "name" => $data['name'],
                    "taskOrder" => $data['order']
                ) );
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
        'user/(?P<id>\d+)',
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

