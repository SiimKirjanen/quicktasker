<?php

namespace WPQT\Services;

if (!defined('ABSPATH')) {
    exit;
}

class ServiceLocator
{
    private static $services = [];

    public static function register($name, $service)
    {
        self::$services[$name] = $service;
    }

    public static function get($name)
    {
        if (isset(self::$services[$name])) {
            return self::$services[$name];
        }

        throw new \Exception('Service not found: ' . esc_html($name));
    }
}
