<?php

/*
	Plugin Name: QuickTasker
	Description: Task management plugin designed to help you organize your projects, streamline workflows, and get tasks done efficiently.
	Author: Siim Kirjanen
	Author URI: https://github.com/SiimKirjanen
	Text Domain: quicktasker
	Domain Path: /languages
	Version: 1.45.0
	Requires at least: 5.3
	Requires PHP: 7.2.28
	License: GPLv2 or later
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Services\ServiceLocator;

require( 'php/constants.php' );
require( 'php/db.php' );
require( 'php/response/ApiResponse.php' );
require( 'php/exeptions/WPQTExeption.php' );
require( 'php/repositories/PipelineRepository.php' );
require( 'php/repositories/TaskRepository.php' );
require( 'php/repositories/StageRepository.php' );
require( 'php/repositories/LogRepository.php' );
require( 'php/repositories/CommentRepository.php' );
require( 'php/repositories/UserRepository.php' );
require( 'php/repositories/UserPageRepository.php' );
require( 'php/repositories/PasswordRepository.php' );
require( 'php/repositories/SessionRepository.php' );
require( 'php/repositories/CustomFieldRepository.php' );
require( 'php/repositories/TimeRepository.php' );
require( 'php/repositories/AssetRepository.php' );
require( 'php/repositories/SettingRepository.php' );
require( 'php/repositories/OverViewRepository.php' );
require( 'php/repositories/AutomationRepository.php' );
require( 'php/repositories/EmailRepository.php' );
require( 'php/repositories/LabelRepository.php' );
require( 'php/repositories/UploadRepository.php' );
require( 'php/repositories/HeaderRepository.php' );
require( 'php/repositories/WebhookRepository.php' );
require( 'php/repositories/WebhookEventRepository.php' );
require( 'php/services/PipelineService.php' );
require( 'php/services/PermissionService.php' );
require( 'php/services/StageService.php' );
require( 'php/services/TaskService.php' );
require( 'php/services/LocationService.php' );
require( 'php/services/LogService.php' );
require( 'php/services/UserService.php' );
require( 'php/services/HashService.php' );
require( 'php/services/UserPageService.php' );
require( 'php/services/PasswordService.php' );
require( 'php/services/SessionService.php' );
require( 'php/services/NonceService.php' );
require( 'php/services/CommentService.php' );
require( 'php/services/CustomFieldService.php' );
require( 'php/services/CapabilityService.php' );
require( 'php/services/RequestValidation.php' );
require( 'php/services/SettingService.php' );
require( 'php/services/DBSeederService.php' );
require( 'php/services/SettingsValidationService.php' );
require( 'php/services/AutomationService.php' );
require( 'php/services/EmailService.php' );
require( 'php/services/ErrorHandlerService.php' );
require( 'php/services/LabelService.php' );
require( 'php/services/UploadService.php' );
require( 'php/services/UUIDService.php' );
require( 'php/services/FileService.php' );
require( 'php/services/SlackService.php' );
require( 'php/services/ServiceLocator.php' );
require( 'php/services/SecretsService.php' );
require( 'php/services/export/ExportService.php' );
require( 'php/services/export/PDFExportService.php' );
require( 'php/services/export/JSONExportService.php' );
require( 'php/services/import/PipelineImportService.php' );
require( 'php/services/DBMigrateService.php' );
require( 'php/services/WebhookService.php' );
require( 'php/services/WebhookEventService.php' );

ServiceLocator::register('AutomationRepository', new WPQT\Automation\AutomationRepository());
ServiceLocator::register('CustomFieldRepository', new WPQT\Customfield\CustomFieldRepository());
ServiceLocator::register('EmailRepository', new WPQT\Email\EmailRepository());
ServiceLocator::register('TimeRepository', new WPQT\Time\TimeRepository());
ServiceLocator::register('TaskRepository', new WPQT\Task\TaskRepository());
ServiceLocator::register('UserRepository', new WPQT\User\UserRepository());
ServiceLocator::register('PipelineRepository', new WPQT\Pipeline\PipelineRepository());
ServiceLocator::register('CommentRepository', new WPQT\Comment\CommentRepository());
ServiceLocator::register('LogRepository', new WPQT\Log\LogRepository());
ServiceLocator::register('SettingRepository', new WPQT\Settings\SettingRepository());
ServiceLocator::register('LabelRepository', new WPQT\Label\LabelRepository());
ServiceLocator::register('UploadRepository', new WPQT\Upload\UploadRepository());
ServiceLocator::register('TaskService', new WPQT\Task\TaskService());
ServiceLocator::register('UserService', new WPQT\User\UserService());
ServiceLocator::register('AutomationService', new WPQT\Automation\AutomationService());
ServiceLocator::register('ErrorHandlerService', new WPQT\Error\ErrorHandlerService());
ServiceLocator::register('LogService', new WPQT\Log\LogService());
ServiceLocator::register('EmailService', new WPQT\Email\EmailService());
ServiceLocator::register('LabelService', new WPQT\Label\LabelService());
ServiceLocator::register('UploadService', new WPQT\Upload\UploadService());
ServiceLocator::register('FileService', new WPQT\File\FileService());
ServiceLocator::register('UUIDService', new WPQT\UUID\UUIDService());
ServiceLocator::register('StageRepository', new WPQT\Stage\StageRepository());
ServiceLocator::register('SlackService', new WPQT\Slack\SlackService());
ServiceLocator::register('SecretsService', new WPQT\Secrets\SecretsService());
ServiceLocator::register('PipelineImportService', new WPQT\Import\PipelineImportService());
ServiceLocator::register('DBMigrateService', new WPQT\DB\DBMigrateService());
ServiceLocator::register('PasswordRepository', new WPQT\Password\PasswordRepository());
ServiceLocator::register('SettingService', new WPQT\Settings\SettingsService());
ServiceLocator::register('SessionRepository', new WPQT\Session\SessionRepository());
ServiceLocator::register('HashService', new WPQT\Hash\HashService());
ServiceLocator::register('UserPageRepository', new WPQT\UserPage\UserPageRepository());
ServiceLocator::register('StageService', new WPQT\Stage\StageService());
ServiceLocator::register('CommentService', new WPQT\Comment\CommentService());
ServiceLocator::register('CustomFieldService', new WPQT\Customfield\CustomFieldService());
ServiceLocator::register('HeaderRepository', new WPQT\Header\HeaderRepository());
ServiceLocator::register('UserPageService', new WPQT\UserPage\UserPageService());
ServiceLocator::register('PermissionService', new WPQT\Permission\PermissionService());
ServiceLocator::register('WebhookRepository', new WPQT\Webhooks\WebhookRepository());
ServiceLocator::register('WebhookEventRepository', new WPQT\Webhooks\WebhookEventRepository());
ServiceLocator::register('WebhookService', new WPQT\Webhooks\WebhookService());
ServiceLocator::register('WebhookEventService', new WPQT\Webhooks\WebhookEventService());

require( 'php/hooks.php' );
require( 'php/actions.php' );
require( 'php/filters.php' );
require( 'php/api/admin-api.php' );
require( 'php/api/user-page-api.php' );
require( 'php/side-effects.php' );
require( 'php/db-seeder.php' );

if( is_admin() ) {
	require( 'php/admin-pages.php' );
	require( 'php/enqueue-admin.php' );	
}

if( !is_admin() ) {
	require( 'php/enqueue-user-page-public.php' );
}