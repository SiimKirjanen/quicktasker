<?php

namespace WPQT\Email;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

if ( ! class_exists( 'WPQT\Email\EmailService' ) ) {
    class EmailService {

        /**
         * Sends an email using the WordPress wp_mail function.
         *
         * @param string $to The recipient email address.
         * @param string $subject The subject of the email.
         * @param string $message The message body of the email.
         * @return bool True if the email was sent successfully, false otherwise.
         */
        public static function sendEmail($to, $subject, $message) {
            $headers = array('Content-Type: text/html; charset=UTF-8');

            return wp_mail($to, $subject, $message, $headers);
        }

        /**
         * Renders a PHP template with the provided data.
         *
         * This method takes a template file and an associative array of data,
         * extracts the data to variables, and includes the template file.
         * The output of the template is captured and returned as a string.
         *
         * @param string $template The name of the template file (without the .php extension).
         * @param array $data An associative array of data to be extracted and used in the template.
         * @return string The rendered template content, or an empty string if the template file does not exist.
         */
        public static function renderTemplate($template, $data) {
            $templatePath = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'php/templates/email/' . $template . '.php';
            
            if (!file_exists($templatePath)) {
                return '';
            }
        
            ob_start();
            extract($data);
            require $templatePath;
            return ob_get_clean();
        }
    }
}