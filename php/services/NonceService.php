<?php
namespace WPQT\Nonce;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class NonceService {
    public static function createNonce($nonceName) {
        return wp_create_nonce($nonceName);
    }

    public static function verifyNonce($nonce, $nonceName) {
        if(!isset($nonce)) {
            throw new \Exception('Nonce not provided');        
        }
        if( !wp_verify_nonce($nonce, $nonceName) ) {
            throw new \Exception('Nonce verification failed');
        }
        return true;
    }
}