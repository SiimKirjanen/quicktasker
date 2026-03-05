<?php
// Define WordPress constants before loading the repository to prevent exit()
if (!defined('ABSPATH')) {
    define('ABSPATH', '/fake/path/');
}

// Define plugin folder constant
if (!defined('WP_QUICKTASKER_PLUGIN_FOLDER_DIR')) {
    define('WP_QUICKTASKER_PLUGIN_FOLDER_DIR', __DIR__ . '/../../../../');
}

require_once __DIR__ . '/../../../../php/repositories/AssetRepository.php';

use PHPUnit\Framework\TestCase;
use WPQT\Asset\AssetRepository;

class AssetRepositoryTest extends TestCase
{
    public function test_getWPQTScriptBildAssets_returns_array()
    {
        $result = AssetRepository::getWPQTScriptBildAssets();

        $this->assertIsArray($result);
    }

    public function test_getWPQTScriptBildAssets_contains_dependencies_key()
    {
        $result = AssetRepository::getWPQTScriptBildAssets();

        $this->assertArrayHasKey('dependencies', $result);
        $this->assertIsArray($result['dependencies']);
    }

    public function test_getWPQTScriptBildAssets_contains_version_key()
    {
        $result = AssetRepository::getWPQTScriptBildAssets();

        $this->assertArrayHasKey('version', $result);
    }

    public function test_getWPQTScriptBildAssets_version_is_string()
    {
        $result = AssetRepository::getWPQTScriptBildAssets();

        $this->assertIsString($result['version']);
    }

    public function test_getWPQTVendorScriptBildAssets_returns_array()
    {
        $result = AssetRepository::getWPQTVendorScriptBildAssets();

        $this->assertIsArray($result);
    }

    public function test_getWPQTVendorScriptBildAssets_contains_dependencies_key()
    {
        $result = AssetRepository::getWPQTVendorScriptBildAssets();

        $this->assertArrayHasKey('dependencies', $result);
        $this->assertIsArray($result['dependencies']);
    }

    public function test_getWPQTVendorScriptBildAssets_contains_version_key()
    {
        $result = AssetRepository::getWPQTVendorScriptBildAssets();

        $this->assertArrayHasKey('version', $result);
    }

    public function test_getWPQTVendorScriptBildAssets_version_is_string()
    {
        $result = AssetRepository::getWPQTVendorScriptBildAssets();

        $this->assertIsString($result['version']);
    }

    public function test_getWPQTScriptDependencies_returns_array()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        $this->assertIsArray($result);
    }

    public function test_getWPQTScriptDependencies_includes_wp_element()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        $this->assertContains('wp-element', $result);
    }

    public function test_getWPQTScriptDependencies_includes_wp_api_fetch()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        $this->assertContains('wp-api-fetch', $result);
    }

    public function test_getWPQTScriptDependencies_includes_wpqt_vendors()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        $this->assertContains('wpqt-vendors', $result);
    }

    public function test_getWPQTScriptDependencies_includes_base_dependencies()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        // Should include at least the 3 base dependencies
        $this->assertGreaterThanOrEqual(3, count($result));
    }

    public function test_getWPQTScriptDependencies_merges_with_build_dependencies()
    {
        $buildAssets = AssetRepository::getWPQTScriptBildAssets();
        $dependencies = AssetRepository::getWPQTScriptDependencies();

        // The merged dependencies should be larger than just the build dependencies
        // (3 base dependencies + build dependencies)
        $expectedCount = count($buildAssets['dependencies']) + 3;
        $this->assertEquals($expectedCount, count($dependencies));
    }

    public function test_getWPQTScriptDependencies_maintains_order_with_base_first()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        // The first three dependencies should be the base ones
        $this->assertEquals('wp-element', $result[0]);
        $this->assertEquals('wp-api-fetch', $result[1]);
        $this->assertEquals('wpqt-vendors', $result[2]);
    }

    public function test_methods_are_static()
    {
        // Verify that all methods are callable statically
        $this->assertTrue(method_exists(AssetRepository::class, 'getWPQTScriptBildAssets'));
        $this->assertTrue(method_exists(AssetRepository::class, 'getWPQTVendorScriptBildAssets'));
        $this->assertTrue(method_exists(AssetRepository::class, 'getWPQTScriptDependencies'));

        $reflection = new \ReflectionClass(AssetRepository::class);
        
        $method1 = $reflection->getMethod('getWPQTScriptBildAssets');
        $this->assertTrue($method1->isStatic());
        $this->assertTrue($method1->isPublic());

        $method2 = $reflection->getMethod('getWPQTVendorScriptBildAssets');
        $this->assertTrue($method2->isStatic());
        $this->assertTrue($method2->isPublic());

        $method3 = $reflection->getMethod('getWPQTScriptDependencies');
        $this->assertTrue($method3->isStatic());
        $this->assertTrue($method3->isPublic());
    }

    public function test_app_asset_file_exists()
    {
        $assetFile = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . '/build/app.asset.php';
        
        $this->assertFileExists($assetFile, 'app.asset.php file should exist in the build directory');
    }

    public function test_vendors_asset_file_exists()
    {
        $assetFile = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . '/build/vendors.asset.php';
        
        $this->assertFileExists($assetFile, 'vendors.asset.php file should exist in the build directory');
    }

    public function test_both_asset_files_return_compatible_structures()
    {
        $appAssets = AssetRepository::getWPQTScriptBildAssets();
        $vendorAssets = AssetRepository::getWPQTVendorScriptBildAssets();

        // Both should have the same keys
        $this->assertEquals(array_keys($appAssets), array_keys($vendorAssets));
        
        // Both should have dependencies array
        $this->assertIsArray($appAssets['dependencies']);
        $this->assertIsArray($vendorAssets['dependencies']);
        
        // Both should have version string
        $this->assertIsString($appAssets['version']);
        $this->assertIsString($vendorAssets['version']);
    }

    public function test_getWPQTScriptDependencies_contains_all_base_dependencies()
    {
        $result = AssetRepository::getWPQTScriptDependencies();

        // Count occurrences of base dependencies
        $wpElementCount = count(array_keys($result, 'wp-element'));
        $wpApiFetchCount = count(array_keys($result, 'wp-api-fetch'));
        $wpqtVendorsCount = count(array_keys($result, 'wpqt-vendors'));

        // Each should appear at least once (may appear multiple times due to array_merge)
        $this->assertGreaterThanOrEqual(1, $wpElementCount, 'wp-element should appear at least once');
        $this->assertGreaterThanOrEqual(1, $wpApiFetchCount, 'wp-api-fetch should appear at least once');
        $this->assertGreaterThanOrEqual(1, $wpqtVendorsCount, 'wpqt-vendors should appear at least once');
    }
}
