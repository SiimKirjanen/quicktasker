<?php

class LocationService {
    public function isWPQTPage() {
        if ( isset($_GET['page']) && $_GET['page'] === 'wp-quick-tasks' ) {
            return true;
        }

        return false;
    }
}