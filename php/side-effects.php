<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

use WPQT\Capability\CapabilityService;
use WPQT\ServiceLocator;

/*
	======================
	Side effects trigger
	======================
*/
$quicktasker_trigger_side_effect = get_option('quicktasker_trigger_side_effect');
if ($quicktasker_trigger_side_effect !== WP_QUICKTASKER_SIDE_EFFECT_TRIGGER) {
	$capabilityService = new CapabilityService();

    $capabilityService->addQuickTaskerAdminCapabilityToAdminRole();
	ServiceLocator::get('UploadService')->setUpUploadsFolders();

	update_option( 'quicktasker_trigger_side_effect', WP_QUICKTASKER_SIDE_EFFECT_TRIGGER );
}
