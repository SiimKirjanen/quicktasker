<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Mock WordPress function get_option
if (!function_exists('get_option')) {
    function get_option($option, $default = false) {
        global $wp_options_mock;
        return $wp_options_mock[$option] ?? $default;
    }
}

require_once __DIR__ . '/../../../../php/repositories/TimeRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Time\TimeRepository;

class TimeRepositoryTest extends TestCase
{
    private $repository;

    protected function setUp(): void
    {
        $this->repository = new TimeRepository();
        
        // Reset global mock options
        global $wp_options_mock;
        $wp_options_mock = [];
    }

    protected function tearDown(): void
    {
        // Clean up global mock options
        global $wp_options_mock;
        $wp_options_mock = [];
    }

    public function test_getCurrentUTCTime_returns_valid_format()
    {
        $result = $this->repository->getCurrentUTCTime();

        // Check format matches 'Y-m-d H:i:s'
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);
    }

    public function test_getCurrentUTCTime_returns_current_time()
    {
        $result = $this->repository->getCurrentUTCTime();
        $expected = gmdate('Y-m-d H:i:s');

        // Allow 1 second tolerance for test execution time
        $resultTime = strtotime($result);
        $expectedTime = strtotime($expected);
        
        $this->assertLessThanOrEqual(1, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_adds_hours()
    {
        $result = $this->repository->modifyUTCTime(2, 'hour');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify the result is roughly 2 hours from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + (2 * 3600);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_subtracts_days()
    {
        $result = $this->repository->modifyUTCTime(-3, 'day');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify the result is roughly 3 days ago
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) - (3 * 86400);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_adds_minutes()
    {
        $result = $this->repository->modifyUTCTime(30, 'minute');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify the result is roughly 30 minutes from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + (30 * 60);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_adds_seconds()
    {
        $result = $this->repository->modifyUTCTime(45, 'second');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify the result is roughly 45 seconds from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + 45;
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_adds_weeks()
    {
        $result = $this->repository->modifyUTCTime(2, 'week');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify the result is roughly 2 weeks from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + (2 * 7 * 86400);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_adds_months()
    {
        $result = $this->repository->modifyUTCTime(1, 'month');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Parse result to check it's approximately 1 month from now
        $resultDate = new \DateTime($result, new \DateTimeZone('UTC'));
        $currentDate = new \DateTime('now', new \DateTimeZone('UTC'));
        
        $interval = $currentDate->diff($resultDate);
        
        // Should be approximately 1 month ahead (allowing some tolerance)
        $this->assertGreaterThanOrEqual(28, $interval->days);
        $this->assertLessThanOrEqual(32, $interval->days);
    }

    public function test_modifyUTCTime_adds_years()
    {
        $result = $this->repository->modifyUTCTime(1, 'year');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Parse result to check it's approximately 1 year from now
        $resultDate = new \DateTime($result, new \DateTimeZone('UTC'));
        $currentDate = new \DateTime('now', new \DateTimeZone('UTC'));
        
        $interval = $currentDate->diff($resultDate);
        
        // Should be approximately 1 year ahead
        $this->assertGreaterThanOrEqual(364, $interval->days);
        $this->assertLessThanOrEqual(366, $interval->days);
    }

    public function test_modifyUTCTime_handles_singular_amount()
    {
        $result = $this->repository->modifyUTCTime(1, 'day');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Verify it's roughly 1 day from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + 86400;
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_defaults_to_hour_for_invalid_unit()
    {
        $result = $this->repository->modifyUTCTime(3, 'invalid_unit');

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Should default to hours, so roughly 3 hours from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + (3 * 3600);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_modifyUTCTime_uses_default_unit_when_not_provided()
    {
        $result = $this->repository->modifyUTCTime(5);

        // Verify format
        $this->assertMatchesRegularExpression('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $result);

        // Should use default 'hour', so roughly 5 hours from now
        $resultTime = strtotime($result);
        $expectedTime = strtotime(gmdate('Y-m-d H:i:s')) + (5 * 3600);
        
        $this->assertLessThanOrEqual(2, abs($resultTime - $expectedTime));
    }

    public function test_getWPTimezone_returns_timezone_string_when_set()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'America/New_York';

        $result = $this->repository->getWPTimezone();

        $this->assertEquals('America/New_York', $result);
    }

    public function test_getWPTimezone_converts_gmt_offset_when_no_timezone_string()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = '';
        $wp_options_mock['gmt_offset'] = -5; // EST

        $result = $this->repository->getWPTimezone();

        // timezone_name_from_abbr with -5 offset should return a timezone
        $this->assertNotEmpty($result);
        $this->assertIsString($result);
    }

    public function test_getWPTimezone_returns_utc_when_no_settings()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = '';
        $wp_options_mock['gmt_offset'] = 0;

        $result = $this->repository->getWPTimezone();

        $this->assertEquals('UTC', $result);
    }

    public function test_convertUTCToLocal_converts_utc_to_timezone()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'America/New_York';

        $utcDateString = '2024-01-01 12:00:00';
        $result = $this->repository->convertUTCToLocal($utcDateString);

        // Should convert to EST/EDT (-5 or -4 hours)
        // Format is "F j, Y H:i" like "January 1, 2024 07:00"
        $this->assertStringContainsString('January 1, 2024', $result);
        $this->assertMatchesRegularExpression('/\d{2}:\d{2}$/', $result);
    }

    public function test_convertUTCToLocal_returns_correct_format()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'UTC';

        $utcDateString = '2024-03-15 14:30:00';
        $result = $this->repository->convertUTCToLocal($utcDateString);

        // Should be in format "March 15, 2024 14:30"
        $this->assertEquals('March 15, 2024 14:30', $result);
    }

    public function test_convertUTCToLocal_with_pacific_timezone()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'America/Los_Angeles';

        $utcDateString = '2024-06-01 20:00:00';
        $result = $this->repository->convertUTCToLocal($utcDateString);

        // Should convert to PDT (-7 hours) during June
        // 20:00 UTC = 13:00 PDT
        $this->assertStringContainsString('June 1, 2024', $result);
        $this->assertStringContainsString('13:00', $result);
    }

    public function test_getLocalTime_calls_getCurrentUTCTime_and_convertUTCToLocal()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'UTC';

        // Create a partial mock
        $repository = $this->getMockBuilder(TimeRepository::class)
            ->onlyMethods(['getCurrentUTCTime'])
            ->getMock();

        $mockUTCTime = '2024-02-20 10:30:00';

        $repository->expects($this->once())
            ->method('getCurrentUTCTime')
            ->willReturn($mockUTCTime);

        $result = $repository->getLocalTime();

        // Should be converted to local time format
        $this->assertEquals('February 20, 2024 10:30', $result);
    }

    public function test_getLocalTime_returns_correct_format()
    {
        global $wp_options_mock;
        $wp_options_mock['timezone_string'] = 'UTC';

        $result = $this->repository->getLocalTime();

        // Should match format "Month Day, Year HH:MM"
        $this->assertMatchesRegularExpression('/^[A-Z][a-z]+ \d{1,2}, \d{4} \d{2}:\d{2}$/', $result);
    }
}
