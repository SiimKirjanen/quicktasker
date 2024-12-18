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
         * Renders an email template with the provided data.
         *
         * This function takes a template name and an associative array of data,
         * loads the template file, and replaces placeholders in the template
         * with the corresponding values from the data array.
         *
         * @param string $template The name of the template file (without the .html extension).
         * @param array $data An associative array where the keys are placeholder names
         *                    and the values are the values to replace the placeholders with.
         * @return string The rendered template content with placeholders replaced by data values.
         * @throws \Exception If the template file does not exist.
         */
        public static function renderTemplate($template, $data) {
            $templatePath = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'php/templates/email/' . $template . '.html';
            
            if (!file_exists($templatePath)) {
                throw new \Exception('Email template not found: ' . $template);
            }

            $templateContent = file_get_contents($templatePath);

            foreach ($data as $key => $value) {
                $templateContent = str_replace("{{" . $key . "}}", $value, $templateContent);
            }

            return $templateContent;
        }
    }
}