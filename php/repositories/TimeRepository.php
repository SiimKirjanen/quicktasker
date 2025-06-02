<?php
namespace WPQT\Time;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Time\TimeRepository' ) ) {
    class TimeRepository {
        /**
         * Retrieves the current UTC time in 'Y-m-d H:i:s' format.
         *
         * @return string The current UTC time.
         */
        public function getCurrentUTCTime() {
            // Get the current UTC time in 'Y-m-d H:i:s' format
            return gmdate('Y-m-d H:i:s');
        }

        /**
         * Modifies the current UTC time by adding or subtracting a specified time interval.
         *
         * @param int $amount The amount to add (positive) or subtract (negative)
         * @param string $unit The time unit ('second', 'minute', 'hour', 'day', 'week', 'month', 'year')
         * @return string The modified UTC time in 'Y-m-d H:i:s' format.
         */
        public function modifyUTCTime($amount, $unit = 'hour') {
            // Validate unit
            $valid_units = array('second', 'minute', 'hour', 'day', 'week', 'month', 'year');
            if (!in_array(strtolower($unit), $valid_units)) {
                $unit = 'hour'; // Default to hours if invalid unit
            }
            
            // Create DateTime object with current UTC time
            $date = new \DateTime('now', new \DateTimeZone('UTC'));
            
            // Ensure singular form for DateTime::modify
            if (abs($amount) != 1) {
                $unit .= 's';
            }
            
            // Add the specified interval
            $date->modify("$amount $unit");
            
            // Return the adjusted time in the same format as getCurrentUTCTime
            return $date->format('Y-m-d H:i:s');
        }

        /**
         * Retrieves the WordPress timezone setting.
         *
         * This function fetches the timezone setting from the WordPress options.
         * It first checks for a timezone string. If not found, it checks for a GMT offset.
         * If neither is found, it defaults to 'UTC'.
         *
         * @return string The timezone string, GMT offset converted to timezone, or 'UTC'.
         */
        public function getWPTimezone() {
            $timezone_string = get_option('timezone_string');
            $gmt_offset = get_option('gmt_offset');

            if ( $timezone_string ) {
                return $timezone_string;
            } elseif ($gmt_offset) {
                return timezone_name_from_abbr('', $gmt_offset * 3600, 0);
            } else {
                return 'UTC';
            }
        }

         /**
         * Converts a UTC date string to a formatted date string in the WordPress timezone.
         *
         * @param string $utcDateString The UTC date string in 'Y-m-d H:i:s' format.
         * @return string The formatted date string in the WordPress timezone.
         */
        public function convertUTCToLocal($utcDateString) {
            // Create a DateTime object from the UTC date string
            $date = new \DateTime($utcDateString, new \DateTimeZone('UTC'));

            // Get the WordPress timezone
            $wpTimezone = $this->getWPTimezone();

            // Set the timezone to the WordPress timezone
            $date->setTimezone(new \DateTimeZone($wpTimezone));

            // Format the date as "F j, Y H:i"
            return $date->format('F j, Y H:i');
        }

        /**
         * Retrieves the local time.
         *
         * This function gets the current UTC time and converts it to the local time.
         *
         * @return string The local time in the specified format.
         */
        public function getLocalTime() {
            $date = $this->getCurrentUTCTime();

            return $this->convertUTCToLocal($date);
        }
    }
}