<?php
require_once __DIR__ . '/../../../../php/services/ServiceLocator.php';

use PHPUnit\Framework\TestCase;
use WPQT\Services\ServiceLocator;

class ServiceLocatorTest extends TestCase
{
    public function test_register_and_get()
    {
        ServiceLocator::register('foo', 'bar');
        $this->assertSame('bar', ServiceLocator::get('foo'));
    }

    public function test_get_throws_exception()
    {
        $this->expectException(\Exception::class);
        ServiceLocator::get('missing');
    }
}