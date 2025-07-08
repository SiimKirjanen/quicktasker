<?php

namespace WPQT\Header;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Header\HeaderRepository' ) ) {
    class HeaderRepository {
        /**
         * Get the user page hash from the request headers.
         *
         * @param \WP_REST_Request $data The request data.
         * @return string|null The user page hash or null if not set.
         */
       public function getUserPageHash($data) {
            return $data->get_header('X-WPQT-USER-PAGE-CODE');
        }
    }
}
