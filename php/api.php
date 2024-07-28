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

                return $pipelineRepo->getPipelineById( $data['id'] );
            },
            'permission_callback' => function() {
                return PermissionsRepository::hasRequiredPermissionsForPrivateAPI();
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
                return PermissionsRepository::hasRequiredPermissionsForPrivateAPI();
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
                return PermissionsRepository::hasRequiredPermissionsForPrivateAPI();
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
                return PermissionsRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );
}

