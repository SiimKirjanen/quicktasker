<?php
namespace WPQT\Time;

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

}