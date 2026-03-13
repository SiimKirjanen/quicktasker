<?php

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\Capability\CapabilityService;
use WPQT\Services\ServiceLocator;

/*
    ======================
    Side effects trigger
    ======================
*/
$quicktasker_trigger_side_effect = get_option('quicktasker_trigger_side_effect');
if (WP_QUICKTASKER_SIDE_EFFECT_TRIGGER !== $quicktasker_trigger_side_effect) {
    $capabilityService = new CapabilityService();

    $capabilityService->addQuickTaskerAdminCapabilityToAdminRole();
    ServiceLocator::get('UploadService')->setUpUploadsFolders();

    update_option('quicktasker_trigger_side_effect', WP_QUICKTASKER_SIDE_EFFECT_TRIGGER);
}
