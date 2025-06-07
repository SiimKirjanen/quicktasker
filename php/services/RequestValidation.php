<?php
namespace WPQT;

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Nonce\NonceService;
use WPQT\WPQTException;
use WPQT\UserPage\UserPageService;
use WPQT\Session\SessionService;
use WPQT\User\UserRepository;

if ( ! class_exists( 'WPQT\RequestValidation' ) ) {
    class RequestValidation {

        /**
         * Validates the user page API request.
         *
         * This method validates the incoming request data based on the provided arguments.
         * It checks for nonce, hash, and session validity.
         *
         * @param object $data The request data object.
         * @param array $args Optional. An array of arguments to control the validation process.
         *                    Default values:
         *                    - 'nonce' => true (validates the nonce)
         *                    - 'hash' => true (validates the user page hash)
         *                    - 'session' => true (validates the session token)
         *
         * @return array An array containing the session information if session validation is enabled.
         *
         * @throws WPQTException If the user page hash does not exist.
         */
        public static function validateUserPageApiRequest($data, $args = array()) {
            $returnValue = array();
            $defaults = array(
                'nonce' => true,
                'hash' => true,
                'session' => true,
                'userActive' => true
            );
            $args = wp_parse_args($args, $defaults);

            if ($args['nonce'] === true) {
                $nonce = $data->get_header('X-WPQT-USER-API-Nonce');
                NonceService::verifyNonce($nonce, WPQT_USER_API_NONCE);
            }

            if ($args['hash'] === true) {
                $userPageService = new UserPageService();
                if( !$userPageService->checkIfUserPageHashExists($data['hash']) ) {
                    throw new WPQTException('User page does not exist', true);
                }
            }

            if ($args['session'] === true) {
                $sessionService = new SessionService();
                $session = $sessionService->verifySessionToken($data['hash']);
                $returnValue['session'] = $session;
            }

            if ($args['userActive'] === true && isset($returnValue['session'])) {
                $userRepo = new UserRepository();
                $isActive = $userRepo->isUserActive($returnValue['session']->user_id);

                if (!$isActive) {
                    throw new WPQTException('User is not active', true);
                }
                
            }

            return $returnValue;
        }


        /**
         * Validates if a given parameter is numeric.
         *
         * @param mixed  $param   The parameter to validate.
         *
         * @return bool Returns true if the parameter is numeric, false otherwise.
         */
        public static function validateNumericParam($param) {
            return is_numeric($param);
        }

        /**
         * Sanitizes a parameter to ensure it is an absolute integer.
         *
         * @param mixed  $param   The parameter to sanitize.
         *
         * @return int The sanitized absolute integer value of the parameter.
         */
        public static function sanitizeAbsint($param) {
            return absint($param);
        }

        /**
         * Checks if the given parameter is a string.
         *
         * @param mixed $param The parameter to check.
         * @return bool Returns true if the parameter is a string, false otherwise.
         */
        public static function validateStringParam($param) {
            return is_string($param);
        }

        /**
         * Sanitizes a string parameter to ensure it is safe for use.
         *
         * @param mixed  $param   The parameter to sanitize.
         * @param object $request The request object (not used in this function).
         * @param string $key     The key associated with the parameter (not used in this function).
         *
         * @return string The sanitized string value of the parameter.
         */
        public static function sanitizeStringParam($param) {
            return sanitize_text_field($param);
        }

        /**
         * Validates if a given parameter is boolean.
         *
         * @param mixed  $param   The parameter to validate.
         *
         * @return bool Returns true if the parameter is boolean, false otherwise.
         */
        public static function validateBooleanParam($param) {
            return is_bool($param) || in_array(strtolower($param), array('true', 'false', '1', '0'), true);
        }

        /**
         * Sanitizes a boolean parameter to ensure it is safe for use.
         *
         * @param mixed  $param   The parameter to sanitize.
         *
         * @return bool The sanitized boolean value of the parameter.
         */
        public static function sanitizeBooleanParam($param) {
            return rest_sanitize_boolean($param);
        }

        /**
         * Validates if the provided parameter is a valid custom field entity type for a user page.
         *
         * @param string $param The parameter to validate.
         * @return bool Returns true if the parameter is 'task' or 'user', false otherwise.
         */
        public static function validateUserPageCustomFieldEntityType($param) {
            return in_array($param, array('task', 'user'));
        }

        /**
         * Validates the user type against predefined constants.
         *
         * @param string $param The user type to validate.
         * @return bool True if the user type is valid, false otherwise.
         */
        public static function validateUserType($param) {
            return in_array($param, WP_QT_USER_TYPES, true);
        }

        /**
         * Validates if the given parameter is a date in the format YYYY-MM-DD.
         *
         * @param string $param The date parameter to validate.
         * @return bool Returns true if the parameter matches the date format, false otherwise.
         */
        public static function validateDateParam($param) {
            return preg_match('/^\d{4}-\d{2}-\d{2}$/', $param);
        }

        /**
         * Validates an optional numeric parameter.
         *
         * This method checks if the given parameter is either null or a valid numeric value.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is null or a valid numeric value, false otherwise.
         */
        public static function validateOptionalNumericParam($param) {
            if (is_null($param) || $param === 'null') {
                return true;
            }
            return self::validateNumericParam($param);
        }

        /**
         * Sanitizes an optional parameter by converting it to an absolute integer.
         *
         * If the parameter is null, it returns null. Otherwise, it sanitizes the parameter
         * using the sanitizeAbsint method.
         *
         * @param mixed $param The parameter to sanitize.
         * @return int|null The sanitized absolute integer or null if the parameter is null.
         */
        public static function sanitizeOptionalAbsint($param) {
            if (is_null($param) || $param === 'null') {
                return null;
            }
            return self::sanitizeAbsint($param);
        }

        /**
         * Validates if a given parameter is a string or null.
         *
         * @param mixed  $param   The parameter to validate.
         * @param object $request The request object (not used in the current implementation).
         * @param string $key     The key associated with the parameter (not used in the current implementation).
         *
         * @return bool Returns true if the parameter is a string or null, false otherwise.
         */
        public static function validateOptionalStringParam($param) {
            return is_null($param) || self::validateStringParam($param);
        }

        /**
         * Sanitizes an optional string parameter.
         *
         * If the parameter is null, it returns null. Otherwise, it sanitizes the parameter
         * using the sanitizeStringParam method.
         *
         * @param mixed $param The parameter to sanitize.
         * @return string|null The sanitized string or null if the parameter is null.
         */
        public static function sanitizeOptionalStringParam($param) {
            return is_null($param) ? null : self::sanitizeStringParam($param);
        }

        /**
         * Validates if the given parameter is a valid automation target type.
         *
         * This function checks if the provided parameter exists within the predefined
         * list of automation target types defined by the constant WP_QUICKTASKER_AUTOMATION_TARGET_TYPES.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is a valid automation target type, false otherwise.
         */
        public static function validateAutomationTargetType($param) {
            return in_array($param, WP_QUICKTASKER_AUTOMATION_TARGET_TYPES);
        }

        /**
         * Validates if the given parameter is a valid automation trigger.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid automation trigger, false otherwise.
         */
        public static function validateAutomationTrigger($param) {
            return in_array($param, WP_QUICKTASKER_AUTOMATION_TRIGGERS);
        }

        /**
         * Validates if the given parameter is a valid automation action.
         *
         * This function checks if the provided parameter exists within the predefined
         * list of automation actions defined by the constant WP_QUICKTASKER_AUTOMATION_ACTIONS.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is a valid automation action, false otherwise.
         */
        public static function validateAutomationAction($param) {
            return in_array($param, WP_QUICKTASKER_AUTOMATION_ACTIONS);
        }

        /**
         * Validate the automation action target type.
         *
         * This method checks if the provided parameter is a valid automation action target type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid automation action target type, false otherwise.
         */
        public static function valdiateAutomationActionTargetType($param) {
            return in_array($param, WP_QUICKTASKER_AUTOMATION_ACTION_TARGET_TYPES);
        }

        /**
         * Validates the optional automation action target type.
         *
         * This method checks if the provided parameter is either null or a valid automation action target type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is null or a valid automation action target type, false otherwise.
         */
        public static function validateOptionslAutomationActionTargetType($param) {
            return is_null($param) || self::valdiateAutomationActionTargetType($param);
        }

        /**
         * Validates the automation action target value.
         *
         * This method checks if the provided parameter is a valid automation action target value.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid automation action target value, false otherwise.
         */
        public static function validateLogType($param) {
            return in_array($param, WP_QT_LOG_TYPES, true);
        }

        /**
         * Validates the log created by parameter.
         *
         * This method checks if the provided parameter is a valid log created by value.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid log created by value, false otherwise.
         */
        public static function validateLogCreatedBy($param) {
            return in_array($param, WP_QT_LOG_CREATED_BY, true);
        }

        /**
         * Validates the log created for parameter.
         *
         * This method checks if the provided parameter is a valid log created for value.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid log created for value, false otherwise.
         */
        public static function valdiateQueryOrder($param) {
            return in_array($param, array('ASC', 'DESC'));
        }

        /**
         * Validates the comment type parameter.
         *
         * This method checks if the provided parameter is a valid comment type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid comment type, false otherwise.
         */
        public static function validateCommentType($param) {
            return in_array($param, WP_QUICKTASKER_COMMENT_TYPES, true);
        }

        /**
         * Validates the custom field entity type parameter.
         *
         * This method checks if the provided parameter is a valid custom field entity type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid custom field entity type, false otherwise.
         */
        public static function validateCustomFieldEntityType($param) {
            return in_array($param, WP_QUICKTASKER_CUSTOM_FIELD_ENTITY_TYPES, true);
        }

        /**
         * Validates the custom field type parameter.
         *
         * This method checks if the provided parameter is a valid custom field type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid custom field type, false otherwise.
         */
        public static function validateCustomFieldType($param) {
            return in_array($param, WP_QUICKTASKER_CUSTOM_FIELD_TYPES, true);
        }


        /**
         * Validates if the given parameter is a valid hexadecimal color code.
         *
         * This function checks if the provided string matches the pattern of a 
         * hexadecimal color code, which starts with a '#' followed by exactly 
         * six hexadecimal digits (0-9, a-f, A-F).
         *
         * @param string $param The string to be validated as a hexadecimal color code.
         * @return bool Returns true if the string is a valid hexadecimal color code, false otherwise.
         */
        public static function validateHexColor($param) {
            return preg_match('/^#[a-f0-9]{6}$/i', $param);
        }

        /**
         * Validates if the given parameter is a valid upload entity type.
         *
         * @param mixed $param The parameter to validate.
         * @return bool True if the parameter is a valid upload entity type, false otherwise.
         */
        public static function validateUploadEntityType($param) {
            return in_array($param, WP_QUICKTASKER_UPLOAD_ENTITY_TYPES);
        }

        /**
         * Validates the import source parameter.
         *
         * This method checks if the provided parameter is a valid import source.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is a valid import source, false otherwise.
         */
        public static function validateImportSource($param) {
            return in_array($param, WP_QUICKTASKER_IMPORT_SOURCES);
        }

        /**
         * Validates the color parameter.
         *
         * This method checks if the provided parameter is either null or a valid hexadecimal color code.
         *
         * @param mixed $param The parameter to validate.
         * @return bool Returns true if the parameter is null or a valid hexadecimal color code, false otherwise.
         */
        public static function validateColorParam($param) {
            if (is_null($param) || $param === 'null') {
                return true; // Allow null values
            }
            return self::validateHexColor($param);
        }
    }
}