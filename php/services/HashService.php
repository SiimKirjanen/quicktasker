<?php

namespace WPQT\Hash;

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('WPQT\Hash\HashService')) {
    class HashService
    {
        /**
         * Generates a hash for a user page.
         *
         * The hash identifies a QuickTasker user's page, so it must be unique
         * and unguessable: it is 8 cryptographically secure random bytes.
         *
         * @return string A 16-character hexadecimal hash.
         */
        public function generateUserPageHash()
        {
            return $this->generateRandomHash();
        }

        /**
         * Generates a hash for a task.
         *
         * The hash is used in task URLs and public task status lookups, so it
         * must be unique and unguessable: it is 8 cryptographically secure random bytes.
         *
         * @return string A 16-character hexadecimal hash.
         */
        public function generateTaskHash()
        {
            return $this->generateRandomHash();
        }

        private function generateRandomHash()
        {
            return bin2hex(random_bytes(8));
        }
    }
}
