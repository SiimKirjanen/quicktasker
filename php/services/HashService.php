<?php

namespace WPQT\Hash;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

class HashService {
    public function generateUserPageHash($salt) {
        return substr(md5(microtime() . $salt), 0, 16);
    }
}