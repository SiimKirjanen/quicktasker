<?php

namespace WPQT\Services;

class ServiceLocator {
    private static $services = array();

    public static function register($name, $service) {
        self::$services[$name] = $service;
    }

    public static function get($name) {
        if (isset(self::$services[$name])) {
            return self::$services[$name];
        }

        throw new \Exception("Service not found: " . $name);
    }
}