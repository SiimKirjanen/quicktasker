<?php

add_action('rest_api_init', 'wpqt_register_api_routes');
function wpqt_register_api_routes() {
    /*
    ==================================================================================================================================================================================================================
    Project endpoints
    ==================================================================================================================================================================================================================
    */

    register_rest_route(
        'wpqt/v1',
        'project/(?P<id>\d+)',
        array(
            'methods' => 'GET',
            'callback' => function( $data ) {
                $projectRepo = new ProjectRepository();
                $test = $data['id'];

                return $projectRepo->getProjectById( $data['id'] );
            },
            'permission_callback' => function() {
                return PermissionsRepository::hasRequiredPermissionsForPrivateAPI();
            }
        ),
    );

    register_rest_route(
        'wpqt/v1',
        'projects',
        array(
            'methods' => 'GET',
            'callback' => function( $data ) {
                $projectRepo = new ProjectRepository();

                return $projectRepo->getProjects();
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

