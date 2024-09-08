<?php
namespace WPQT;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Nonce\NonceService;
use WPQT\WPQTException;
use WPQT\UserPage\UserPageService;
use WPQT\Session\SessionService;

class RequestValidation {
    public static function validateUserPageApiRequest($data, $args = array()) {
        $returnValue = array();
        $defaults = array(
            'nonce' => true,
            'hash' => true,
            'session' => true
        );
        $args = wp_parse_args($args, $defaults);

        if ($args['nonce'] === true) {
            $nonce = $data->get_header('X-WPQT-USER-API-Nonce');
            NonceService::verifyNonce($nonce, WPQT_USER_API_NONCE);
        }

        if ($args['hash'] === true) {
            $userPageService = new UserPageService();
            if( !$userPageService->checkIfUserPageHashExists($data['hash']) ) {
                throw new WPQTException('User page hash does not exist', true);
            }
        }

        if ($args['session'] === true) {
            $sessionService = new SessionService();
            $session = $sessionService->verifySessionToken($data['hash']);
            $returnValue['session'] = $session;
        }

        return $returnValue;
    }
}