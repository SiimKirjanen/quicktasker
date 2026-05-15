<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Response\ApiResponse;
use WPQT\Services\ServiceLocator;
use WPQT\WPQTException;

add_action('rest_api_init', 'wpqt_register_public_api_routes');
if (!function_exists('wpqt_register_public_api_routes')) {
    function wpqt_register_public_api_routes()
    {
        register_rest_route('wpqt/v1', 'public/tasks', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                global $wpdb;

                try {
                    $wpdb->query('START TRANSACTION');

                    $publicTaskService = ServiceLocator::get('PublicTaskService');
                    $publicTaskService->ensureCanCreatePublicTask($data['pipeline_id']);
                    $task = $publicTaskService->createPublicTask($data['pipeline_id'], [
                        'name'        => $data['name'],
                        'description' => $data['description'],
                    ]);

                    if (is_user_logged_in()) {
                        $createdBy = current_user_can('manage_options')
                            ? WP_QT_LOG_CREATED_BY_ADMIN
                            : WP_QT_LOG_CREATED_BY_WP_USER;
                        $createdById = get_current_user_id();
                    } else {
                        $createdBy = WP_QT_LOG_CREATED_BY_ANONYMOUS;
                        $createdById = null;
                    }
                    ServiceLocator::get('LogService')->log('Public submission: task ' . $task->name . ' created', [
                        'type'          => WP_QT_LOG_TYPE_TASK,
                        'type_id'       => $task->id,
                        'user_id'       => $createdById,
                        'created_by'    => $createdBy,
                        'created_by_id' => $createdById,
                        'pipeline_id'   => (int) $data['pipeline_id'],
                    ]);

                    $wpdb->query('COMMIT');

                    return new WP_REST_Response((new ApiResponse(true, [], [
                        'task_hash' => $task->task_hash,
                    ]))->toArray(), 200);
                } catch (WPQTException $e) {
                    $wpdb->query('ROLLBACK');

                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    $wpdb->query('ROLLBACK');

                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
                'pipeline_id' => [
                    'required'          => true,
                    'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                    'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                ],
                'name' => [
                    'required'          => true,
                    'validate_callback' => ['WPQT\RequestValidation', 'validateNonEmptyStringParam'],
                    'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeStringParam'],
                ],
                'description' => [
                    'required'          => false,
                    'validate_callback' => ['WPQT\RequestValidation', 'validateOptionalStringParam'],
                    'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeTextareaParam'],
                ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'public/pipelines/(?P<pipelineId>\d+)/status', [
            'methods'  => 'GET',
            'callback' => function ($data) {
                try {
                    $status = ServiceLocator::get('PublicTaskService')->getSubmissionStatus($data['pipelineId']);

                    return new WP_REST_Response((new ApiResponse(true, [], $status))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
                'pipelineId' => [
                    'required'          => true,
                    'validate_callback' => ['WPQT\RequestValidation', 'validateNumericParam'],
                    'sanitize_callback' => ['WPQT\RequestValidation', 'sanitizeAbsint'],
                ],
            ],
        ]);

        register_rest_route('wpqt/v1', 'public/tasks/statuses', [
            'methods'  => 'POST',
            'callback' => function ($data) {
                try {
                    $statuses = ServiceLocator::get('PublicTaskService')->getPublicTaskStatuses($data['hashes']);

                    return new WP_REST_Response((new ApiResponse(true, [], $statuses))->toArray(), 200);
                } catch (WPQTException $e) {
                    return new WP_REST_Response((new ApiResponse(false, [$e->getMessage()]))->toArray(), 400);
                } catch (Throwable $e) {
                    return ServiceLocator::get('ErrorHandlerService')->handlePublicApiError($e);
                }
            },
            'permission_callback' => '__return_true',
            'args'                => [
                'hashes' => [
                    'required'          => true,
                    'validate_callback' => ['WPQT\RequestValidation', 'validateHashArray'],
                ],
            ],
        ]);

    }
}
