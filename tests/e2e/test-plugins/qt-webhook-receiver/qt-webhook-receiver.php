<?php
/**
 * Plugin Name: QT Webhook Receiver (test only)
 * Description: Captures webhook requests for e2e tests. Do not use in production.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('qt-test/v1', '/capture/(?P<id>[a-z0-9-]+)', [
        'methods'             => ['POST', 'PATCH', 'DELETE'],
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $id   = $req['id'];
            $key  = 'qt_test_captured_' . $id;
            $list = get_option($key, []);
            if (!is_array($list)) {
                $list = [];
            }
            $list[] = [
                'method'      => $req->get_method(),
                'headers'     => $req->get_headers(),
                'body'        => json_decode($req->get_body(), true),
                'received_at' => microtime(true),
            ];
            update_option($key, $list, false);
            return ['ok' => true];
        },
    ]);

    register_rest_route('qt-test/v1', '/captured/(?P<id>[a-z0-9-]+)', [
        [
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => function (WP_REST_Request $req) {
                $list = get_option('qt_test_captured_' . $req['id'], []);
                return is_array($list) ? $list : [];
            },
        ],
        [
            'methods'             => 'DELETE',
            'permission_callback' => '__return_true',
            'callback'            => function (WP_REST_Request $req) {
                delete_option('qt_test_captured_' . $req['id']);
                return ['ok' => true];
            },
        ],
    ]);
});
