<?php

namespace WPQT\Error;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WP_REST_Response;
use Throwable;
use WPQT\Response\ApiResponse;

if ( ! class_exists( 'WPQT\Error\ErrorHandlerService' ) ) {
    class ErrorHandlerService {
        public static function handlePrivateApiError(Throwable $e, $message = 'An error occurred while processing the request.') {
            error_log($e->getMessage());
            error_log($e->getTraceAsString());

            return new WP_REST_Response((new ApiResponse(false, array($message)))->toArray(), 400);
        }
    }
}