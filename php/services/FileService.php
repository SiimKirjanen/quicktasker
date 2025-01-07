<?php

namespace WPQT\File;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\File\FileService' ) ) {
    class FileService {

        /**
         * Creates an index.php file in the specified directory if it does not already exist.
         *
         * @param string $directory The directory where the index.php file should be created.
         * @return bool Returns true if the file was created successfully or already exists, false if the file creation failed.
         */
        public function createSilenceIndexFile($directory) {
            $indexFilePath = $directory . '/index.php';
            
            if (!file_exists($indexFilePath)) {
                $indexFileContent = "<?php\n// Silence is golden.\n";
                if (file_put_contents($indexFilePath, $indexFileContent) !== false) {
                    return true; // File created successfully
                } else {
                    return false; // Failed to create file
                }
            }
            return true; // File already exists
        }

         /**
         * Creates a directory if it does not already exist.
         *
         * @param string $directory The path of the directory to create.
         * @return bool Returns true if the directory was created or already exists, false on failure.
         */
        public function createDirectory($directory) {
            if (!file_exists($directory)) {
                if (!mkdir($directory, 0775, true)) {
                    return false;
                }
            }
            return true;
        }
    }
}