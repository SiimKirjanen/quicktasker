<?php
// Define WordPress constants before loading the service to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define constants used by LocationService
if (!defined('WP_QUICKTASKER_PUBLIC_USER_PAGE_ID')) {
    define('WP_QUICKTASKER_PUBLIC_USER_PAGE_ID', 'wpqt-user-page');
}
if (!defined('WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID')) {
    define('WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID', 'wpqt-task-pdf-export');
}
if (!defined('WP_QUICKTASKER_TASK_JSON_EXPORT_PAGE_ID')) {
    define('WP_QUICKTASKER_TASK_JSON_EXPORT_PAGE_ID', 'wpqt-task-json-export');
}

require_once __DIR__ . '/../../../../php/services/LocationService.php';

use PHPUnit\Framework\TestCase;
use WPQT\Location\LocationService;

class LocationServiceTest extends TestCase
{
    private $service;
    private $originalGet;

    protected function setUp(): void
    {
        $this->service = new LocationService();
        // Backup $_GET
        $this->originalGet = $_GET;
        // Clear $_GET for clean state
        $_GET = [];
    }

    protected function tearDown(): void
    {
        // Restore $_GET
        $_GET = $this->originalGet;
    }

    public function test_isWPQTPage_returns_true_when_page_is_wp_quick_tasks()
    {
        $_GET['page'] = 'wp-quick-tasks';

        $result = $this->service->isWPQTPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTPage_returns_false_when_page_parameter_is_missing()
    {
        unset($_GET['page']);

        $result = $this->service->isWPQTPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTPage_returns_false_when_page_is_different()
    {
        $_GET['page'] = 'some-other-page';

        $result = $this->service->isWPQTPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTPage_returns_false_for_empty_page()
    {
        $_GET['page'] = '';

        $result = $this->service->isWPQTPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTPublicUserPage_returns_true_when_page_is_user_page()
    {
        $_GET['page'] = WP_QUICKTASKER_PUBLIC_USER_PAGE_ID;

        $result = $this->service->isWPQTPublicUserPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTPublicUserPage_returns_false_when_page_parameter_is_missing()
    {
        unset($_GET['page']);

        $result = $this->service->isWPQTPublicUserPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTPublicUserPage_returns_false_when_page_is_different()
    {
        $_GET['page'] = 'wp-quick-tasks';

        $result = $this->service->isWPQTPublicUserPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskPDFExportPage_returns_true_when_wpqt_page_is_pdf_export()
    {
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID;

        $result = $this->service->isWPQTTaskPDFExportPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTTaskPDFExportPage_returns_false_when_wpqt_page_parameter_is_missing()
    {
        unset($_GET['wpqt-page']);

        $result = $this->service->isWPQTTaskPDFExportPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskPDFExportPage_returns_false_when_wpqt_page_is_different()
    {
        $_GET['wpqt-page'] = 'some-other-export';

        $result = $this->service->isWPQTTaskPDFExportPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskJSONExportPage_returns_true_when_wpqt_page_is_json_export()
    {
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_JSON_EXPORT_PAGE_ID;

        $result = $this->service->isWPQTTaskJSONExportPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTTaskJSONExportPage_returns_false_when_wpqt_page_parameter_is_missing()
    {
        unset($_GET['wpqt-page']);

        $result = $this->service->isWPQTTaskJSONExportPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskJSONExportPage_returns_false_when_wpqt_page_is_different()
    {
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID;

        $result = $this->service->isWPQTTaskJSONExportPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskExportPage_returns_true_when_pdf_export_page()
    {
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID;

        $result = $this->service->isWPQTTaskExportPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTTaskExportPage_returns_true_when_json_export_page()
    {
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_JSON_EXPORT_PAGE_ID;

        $result = $this->service->isWPQTTaskExportPage();

        $this->assertTrue($result);
    }

    public function test_isWPQTTaskExportPage_returns_false_when_no_export_page()
    {
        $_GET['wpqt-page'] = 'other-page';

        $result = $this->service->isWPQTTaskExportPage();

        $this->assertFalse($result);
    }

    public function test_isWPQTTaskExportPage_returns_false_when_wpqt_page_parameter_is_missing()
    {
        unset($_GET['wpqt-page']);

        $result = $this->service->isWPQTTaskExportPage();

        $this->assertFalse($result);
    }

    public function test_multiple_checks_can_coexist()
    {
        $_GET['page'] = 'wp-quick-tasks';
        $_GET['wpqt-page'] = WP_QUICKTASKER_TASK_PDF_EXPORT_PAGE_ID;

        $this->assertTrue($this->service->isWPQTPage());
        $this->assertTrue($this->service->isWPQTTaskPDFExportPage());
        $this->assertTrue($this->service->isWPQTTaskExportPage());
        $this->assertFalse($this->service->isWPQTPublicUserPage());
    }

    public function test_all_methods_return_boolean()
    {
        $_GET['page'] = 'wp-quick-tasks';

        $this->assertIsBool($this->service->isWPQTPage());
        $this->assertIsBool($this->service->isWPQTPublicUserPage());
        $this->assertIsBool($this->service->isWPQTTaskPDFExportPage());
        $this->assertIsBool($this->service->isWPQTTaskJSONExportPage());
        $this->assertIsBool($this->service->isWPQTTaskExportPage());
    }

    public function test_case_sensitive_page_matching()
    {
        $_GET['page'] = 'WP-QUICK-TASKS'; // uppercase

        $result = $this->service->isWPQTPage();

        $this->assertFalse($result, 'Page matching should be case-sensitive');
    }
}
