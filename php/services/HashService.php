<?php

namespace WPQT\Hash;

class HashService {
    public function generateUserPageHash($salt) {
        return substr(md5(microtime() . $salt), 0, 16);
    }
}