<?php

namespace WPQT\Log;

class LogRepository {
    public function getLogs($typeId, $type) {
        global $wpdb;

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM " . TABLE_WP_QUICK_TASKS_LOGS . " WHERE type = %s AND type_id = %d",
                $type, $typeId
            )
        );
    }
}