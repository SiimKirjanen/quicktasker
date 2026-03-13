<?php

namespace WPQT\Response;

use WP_REST_Response;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Response\ResponseService')) {
    class ResponseService
    {
        /**
         * Creates a standardized API response.
         *
         * @param bool $success Indicates whether the API request was successful or not.
         * @param int $statusCode The HTTP status code to be returned with the response. Defaults to 200 (OK).
         * @param array $data The data to be included in the response. This can be any relevant information or results from the API request.
         * @return WP_REST_Response A WP_REST_Response object containing the standardized API response with the success status and data.
         */
        public static function createTokenApiResponse($success, $statusCode = 200, $data = [])
        {
            return new WP_REST_Response([
                'success' => $success,
                'data'    => $data
            ], $statusCode);
        }
    }
}
