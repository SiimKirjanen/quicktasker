<?php
/**
 * Plugin Name: QT Rate Limit Helper (test only)
 * Description: Test-only endpoints for seeding rate-limit / ban state. Do not use in production.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('qt-test/v1', '/seed-rate-limit', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $userId = (int) $req->get_param('user_id');
            $count = (int) $req->get_param('count');
            $offenses = (int) $req->get_param('offenses');
            $bucket = $req->get_param('bucket') ?: 'write_global';
            $now = time();

            $rlWindow = defined('WP_QUICKTASKER_RATE_LIMIT_WRITE_GLOBAL_WINDOW')
                ? WP_QUICKTASKER_RATE_LIMIT_WRITE_GLOBAL_WINDOW : 60;
            $banWindow = defined('WP_QUICKTASKER_BAN_OFFENSE_WINDOW')
                ? WP_QUICKTASKER_BAN_OFFENSE_WINDOW : 1800;

            if ($count > 0) {
                $rlKey = 'wpqt_rl_' . $bucket . '_' . $userId;
                set_transient($rlKey, $count, $rlWindow);
                set_transient($rlKey . '_exp', $now + $rlWindow, $rlWindow);
            }

            if ($offenses > 0) {
                $offKey = 'wpqt_ban_offense_' . $userId;
                set_transient($offKey, $offenses, $banWindow);
                set_transient($offKey . '_exp', $now + $banWindow, $banWindow);
            }

            return new WP_REST_Response(['ok' => true], 200);
        },
    ]);

    register_rest_route('qt-test/v1', '/clear-rate-limit', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $userId = (int) $req->get_param('user_id');
            $bucket = $req->get_param('bucket') ?: 'write_global';

            $rlKey = 'wpqt_rl_' . $bucket . '_' . $userId;
            delete_transient($rlKey);
            delete_transient($rlKey . '_exp');
            delete_transient('wpqt_ban_offense_' . $userId);
            delete_transient('wpqt_ban_offense_' . $userId . '_exp');
            delete_transient('wpqt_offense_lock_' . $bucket . '_' . $userId);

            return new WP_REST_Response(['ok' => true], 200);
        },
    ]);

    register_rest_route('qt-test/v1', '/trigger-throttle', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $userId = (int) $req->get_param('user_id');
            $bucket = $req->get_param('bucket') ?: 'write_global';
            $limit = WP_QUICKTASKER_RATE_LIMIT_WRITE_GLOBAL_LIMIT;
            $window = WP_QUICKTASKER_RATE_LIMIT_WRITE_GLOBAL_WINDOW;
            $now = time();

            // Force the rate-limit counter to the limit so the next enforce()
            // throws. Clear the lock so the resulting offense actually counts.
            $rlKey = 'wpqt_rl_' . $bucket . '_' . $userId;
            set_transient($rlKey, $limit, $window);
            set_transient($rlKey . '_exp', $now + $window, $window);
            delete_transient('wpqt_offense_lock_' . $bucket . '_' . $userId);

            try {
                \WPQT\Services\ServiceLocator::get('UserService')
                    ->enforceWriteRateLimit($bucket, $userId, $limit, $window);
            } catch (\Throwable $e) {
                // Expected — the offense was recorded inside the catch.
            }

            return new WP_REST_Response(['ok' => true], 200);
        },
    ]);

    register_rest_route('qt-test/v1', '/ban-user', [
        'methods'             => 'POST',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $req) {
            $userId = (int) $req->get_param('user_id');
            $userService = \WPQT\Services\ServiceLocator::get('UserService');
            $user = $userService->banQuicktaskerUserForSpam($userId);

            return new WP_REST_Response(['ok' => true, 'user' => $user], 200);
        },
    ]);
});
