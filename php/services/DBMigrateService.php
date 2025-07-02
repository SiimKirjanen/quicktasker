<?php

namespace WPQT\DB;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\DB\DBMigrateService' ) ) {
    class DBMigrateService {

        public function runMigrations() {
            $this->changeTaskLocationStageIdToNullable();
            $this->changeCommentAuthorIdToNullable();
            $this->changeTaskPipelineIdToNullable();
            $this->addForeignKeys();
        }

        private function changeTaskLocationStageIdToNullable() {
            global $wpdb;

            $wpdb->query(
                "ALTER TABLE " . TABLE_WP_QUICKTASKER_TASKS_LOCATION . " MODIFY stage_id INT(11) DEFAULT NULL"
            );
        }

        private function changeCommentAuthorIdToNullable() {
            global $wpdb;

            $wpdb->query(
                "ALTER TABLE " . TABLE_WP_QUICKTASKER_COMMENTS . " MODIFY author_id INT(11) DEFAULT NULL"
            );
        }

        private function changeTaskPipelineIdToNullable() {
            global $wpdb;

            $wpdb->query(
                "ALTER TABLE " . TABLE_WP_QUICKTASKER_TASKS . " MODIFY pipeline_id INT(11) DEFAULT NULL"
            );
        }

        private function addForeignKeys() {
            global $wpdb;

            try {
                // Add foreign key to pipeline stages table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_PIPELINE_STAGES, 
                    'fk_pipeline_stages_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'CASCADE'
                );
                // Add foreign key to stages location table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_STAGES_LOCATION, 
                    'fk_stages_location_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'CASCADE'
                );
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_STAGES_LOCATION, 
                    'fk_stages_location_stage_id', 
                    'stage_id', 
                    TABLE_WP_QUICKTASKER_PIPELINE_STAGES, 
                    'id', 
                    'CASCADE'
                );
                // Add foreign key to pipeline settings table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_PIPELINE_SETTINGS, 
                    'fk_pipeline_settings_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'CASCADE'
                );

                // Add foreign key to tasks table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_TASKS, 
                    'fk_tasks_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'SET NULL'
                );

                // Add foreign key to tasks location table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_TASKS_LOCATION, 
                    'fk_tasks_location_task_id', 
                    'task_id', 
                    TABLE_WP_QUICKTASKER_TASKS, 
                    'id', 
                    'CASCADE'
                );
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_TASKS_LOCATION, 
                    'fk_tasks_location_stage_id', 
                    'stage_id', 
                    TABLE_WP_QUICKTASKER_PIPELINE_STAGES, 
                    'id', 
                    'SET NULL'
                );

                // Add foreign key to automations table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_AUTOMATIONS, 
                    'fk_automations_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'CASCADE'
                );

                // Add foreign key to labels table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_LABELS, 
                    'fk_labels_pipeline_id', 
                    'pipeline_id', 
                    TABLE_WP_QUICKTASKER_PIPELINES, 
                    'id', 
                    'CASCADE'
                );

                // Add foreign key to label relations table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_LABEL_RELATIONS, 
                    'fk_label_relations_label_id', 
                    'label_id', 
                    TABLE_WP_QUICKTASKER_LABELS, 
                    'id', 
                    'CASCADE'
                );

                // Add foreign key to user task table
                $this->addForeignKeyIfNotExists(
                    TABLE_WP_QUICKTASKER_USER_TASK, 
                    'fk_user_task_task_id', 
                    'task_id', 
                    TABLE_WP_QUICKTASKER_TASKS, 
                    'id', 
                    'CASCADE'
                );

            } catch (\Exception $e) {
                error_log('Error adding QuickTasker table foreign keys: ' . $e->getMessage());
            }
        }

        private function addForeignKeyIfNotExists($table, $constraintName, $column, $refTable, $refColumn, $onDelete = 'CASCADE') {
            global $wpdb;
            
            if ( $this->foreignKeyExists($table, $constraintName) ) {
                return false;
            }
            
            $result = $wpdb->query("
                ALTER TABLE {$table} 
                ADD CONSTRAINT {$constraintName} 
                FOREIGN KEY ({$column}) 
                REFERENCES {$refTable}({$refColumn})
                ON DELETE {$onDelete}
            ");
            
            if ( $result === false ) {
                error_log("Failed to add foreign key {$constraintName}: " . $wpdb->last_error);
                return false;
            }
            
            return true;
        }

        /**
         * Checks if a foreign key constraint already exists
         *
         * @param string $table Table name
         * @param string $constraintName Constraint name to check
         * @return bool True if constraint exists, false otherwise
         */
        private function foreignKeyExists($table, $constraintName) {
            global $wpdb;
            
            
            // Check if constraint exists using information_schema
            $constraintExists = $wpdb->get_var($wpdb->prepare("
                SELECT COUNT(1) 
                FROM information_schema.TABLE_CONSTRAINTS 
                WHERE CONSTRAINT_SCHEMA = DATABASE() 
                AND TABLE_NAME = %s
                AND CONSTRAINT_NAME = %s
                AND CONSTRAINT_TYPE = 'FOREIGN KEY'
            ", $table, $constraintName));
            
            return (bool) $constraintExists;
        }
    }
}