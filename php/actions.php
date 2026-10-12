<?php

if (!defined('ABSPATH')) {
    exit;
}
use WPQT\Asset\AssetRepository;
use WPQT\Location\LocationService;
use WPQT\Services\ServiceLocator;

/**
 * Hook into 'plugins_loaded' action to update the database.
 *
 * This function is hooked to the 'plugins_loaded' action and is responsible for
 * calling the wpqt_set_up_db() function to set up or update the database.
 *
 * @return void
 */
add_action('plugins_loaded', 'wpqt_update_db');
if (!function_exists('wpqt_update_db')) {
    function wpqt_update_db()
    {
        wpqt_set_up_db();
    }
}

add_action('plugins_loaded', 'wpqt_db_migrations');
if (!function_exists('wpqt_db_migrations')) {
    function wpqt_db_migrations()
    {
        $quicktasker_db_migration_trigger = get_option('quicktasker_db_migration_trigger');

        if (WP_QUICKTASKER_DB_MIGRATION_TRIGGER !== $quicktasker_db_migration_trigger) {
            $DBMigrateService = ServiceLocator::get('DBMigrateService');
            $DBMigrateService->runMigrations();

            update_option('quicktasker_db_migration_trigger', WP_QUICKTASKER_DB_MIGRATION_TRIGGER);
        }
    }
}

/**
 * Removes a deleted WordPress user from every board, and deletes the API tokens, webhooks and automations that
 * send board data out they created.
 *
 * @param int $userId The ID of the deleted WordPress user.
 * @param int|null $reassign The ID of the user the content was given to, if any.
 * @param WP_User|null $user The deleted user. Passed since WordPress 5.5.
 * @return void
 */
add_action('deleted_user', 'wpqt_delete_wp_user_pipeline_access', 10, 3);
if (!function_exists('wpqt_delete_wp_user_pipeline_access')) {
    function wpqt_delete_wp_user_pipeline_access($userId, $reassign = null, $user = null)
    {
        ServiceLocator::get('PipelineAccessRepository')->deleteWPUserAccess($userId);

        $userName = $user instanceof WP_User ? $user->display_name : 'WordPress user ' . $userId;

        try {
            ServiceLocator::get('PipelineAccessService')->deleteIntegrationsCreatedByWPUser($userId, null, $userName . ' was deleted');
        } catch (Throwable $e) {
            error_log('QuickTasker failed to delete the API tokens, webhooks and automations of a deleted user: ' . $e->getMessage());
        }
    }
}

/**
 * Tells administrators after updating that WordPress users who are not administrators
 * only see the boards they have been added to.
 *
 * @return void
 */
add_action('admin_notices', 'wpqt_board_access_notice');
if (!function_exists('wpqt_board_access_notice')) {
    function wpqt_board_access_notice()
    {
        if ('1' !== get_option(WP_QUICKTASKER_BOARD_ACCESS_NOTICE_OPTION) || !current_user_can('manage_options')) {
            return;
        }

        $userManagementUrl = admin_url('admin.php?page=wp-quicktasker#/user-management');
        $dismissUrl = wp_nonce_url(add_query_arg('wpqt_dismiss_board_access_notice', '1'), 'wpqt_dismiss_board_access_notice');

        echo '<div class="notice notice-warning" data-testid="wpqt-board-access-notice"><p><strong>QuickTasker:</strong> '
            . esc_html__('WordPress users who are not administrators now only see the boards they have been added to. Until you add them to boards, they see no boards, and automations that assign them to tasks do nothing.', 'quicktasker')
            . '</p><p><a href="' . esc_url($userManagementUrl) . '">' . esc_html__('Add users to boards', 'quicktasker') . '</a> | '
            . '<a href="' . esc_url($dismissUrl) . '">' . esc_html__('Dismiss', 'quicktasker') . '</a></p></div>';
    }
}

/**
 * Hides the board access notice for every administrator once one dismisses it.
 *
 * @return void
 */
add_action('admin_init', 'wpqt_dismiss_board_access_notice');
if (!function_exists('wpqt_dismiss_board_access_notice')) {
    function wpqt_dismiss_board_access_notice()
    {
        if (!isset($_GET['wpqt_dismiss_board_access_notice']) || !current_user_can('manage_options')) {
            return;
        }

        check_admin_referer('wpqt_dismiss_board_access_notice');
        delete_option(WP_QUICKTASKER_BOARD_ACCESS_NOTICE_OPTION);
        wp_safe_redirect(remove_query_arg(['wpqt_dismiss_board_access_notice', '_wpnonce']));
        exit;
    }
}

/**
 * Tells administrators after updating that QuickTasker users only see the boards they have been added to.
 *
 * @return void
 */
add_action('admin_notices', 'wpqt_quicktasker_board_access_notice');
if (!function_exists('wpqt_quicktasker_board_access_notice')) {
    function wpqt_quicktasker_board_access_notice()
    {
        if ('1' !== get_option(WP_QUICKTASKER_QUICKTASKER_BOARD_ACCESS_NOTICE_OPTION) || !current_user_can('manage_options')) {
            return;
        }

        // Opens User management on the QuickTaskers tab, where their boards are changed.
        $userManagementUrl = admin_url('admin.php?page=wp-quicktasker#/user-management/quicktaskers');
        $dismissUrl = wp_nonce_url(add_query_arg('wpqt_dismiss_quicktasker_board_access_notice', '1'), 'wpqt_dismiss_quicktasker_board_access_notice');

        echo '<div class="notice notice-warning" data-testid="wpqt-quicktasker-board-access-notice"><p><strong>QuickTasker:</strong> '
            . esc_html__('QuickTasker users now only see tasks on the boards they have been added to. Until you add them to boards, they see no tasks in the tasks app, and automations that assign them to tasks do nothing.', 'quicktasker')
            . '</p><p><a href="' . esc_url($userManagementUrl) . '">' . esc_html__('Add users to boards', 'quicktasker') . '</a> | '
            . '<a href="' . esc_url($dismissUrl) . '">' . esc_html__('Dismiss', 'quicktasker') . '</a></p></div>';
    }
}

/**
 * Hides the QuickTasker user board access notice for every administrator once one dismisses it.
 *
 * @return void
 */
add_action('admin_init', 'wpqt_dismiss_quicktasker_board_access_notice');
if (!function_exists('wpqt_dismiss_quicktasker_board_access_notice')) {
    function wpqt_dismiss_quicktasker_board_access_notice()
    {
        if (!isset($_GET['wpqt_dismiss_quicktasker_board_access_notice']) || !current_user_can('manage_options')) {
            return;
        }

        check_admin_referer('wpqt_dismiss_quicktasker_board_access_notice');
        delete_option(WP_QUICKTASKER_QUICKTASKER_BOARD_ACCESS_NOTICE_OPTION);
        wp_safe_redirect(remove_query_arg(['wpqt_dismiss_quicktasker_board_access_notice', '_wpnonce']));
        exit;
    }
}

add_action('template_redirect', 'wpqt_custom_http_status_code');
if (!function_exists('wpqt_custom_http_status_code')) {
    function wpqt_custom_http_status_code()
    {
        $locationService = new LocationService();

        if ($locationService->isWPQTPublicUserPage()) {
            global $wp_query;
            $wp_query->is_404 = false;
            status_header(200);
        }
    }
}

/**
 * Removes unnecessary tags and scripts from the WordPress header and footer for public user pages.
 *
 * This function performs the following actions:
 * - Removes WordPress emoji scripts and styles.
 * - Removes various tags from the WordPress header, including RSD link, WordPress generator, feed links, and more.
 * - Disables hreflang type for MultilingualPress.
 * - Removes the skip link script from the footer.
 * - Dequeues block library and global styles inline CSS.
 *
 * The function is hooked to the 'after_setup_theme' action and only executes if the current page is a public user page as determined by the LocationService.
 *
 * @return void
 */
add_action('after_setup_theme', 'wpqt_remove_unnecessary_tags_and_more');
if (!function_exists('wpqt_remove_unnecessary_tags_and_more')) {
    function wpqt_remove_unnecessary_tags_and_more()
    {
        $locationService = new LocationService();

        if ($locationService->isWPQTPublicUserPage()) {
            // REMOVE WP EMOJI
            remove_action('wp_head', 'print_emoji_detection_script', 7);
            remove_action('wp_print_styles', 'print_emoji_styles');
            remove_action('admin_print_scripts', 'print_emoji_detection_script');
            remove_action('admin_print_styles', 'print_emoji_styles');

            // remove all tags from header
            remove_action('wp_head', 'rsd_link');
            remove_action('wp_head', 'wp_generator');
            remove_action('wp_head', 'feed_links', 2);
            remove_action('wp_head', 'index_rel_link');
            remove_action('wp_head', 'wlwmanifest_link');
            remove_action('wp_head', 'feed_links_extra', 3);
            remove_action('wp_head', 'start_post_rel_link', 10, 0);
            remove_action('wp_head', 'parent_post_rel_link', 10, 0);
            remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0);
            remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
            remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
            remove_action('wp_head', 'rest_output_link_wp_head');
            remove_action('wp_head', 'wp_oembed_add_discovery_links');
            remove_action('template_redirect', 'rest_output_link_header', 11);

            // language
            add_filter('multilingualpress.hreflang_type', '__return_false');

            // Remove skip link script
            remove_action('wp_footer', 'the_block_template_skip_link');

            // Remove block library inline CSS
            add_action('wp_enqueue_scripts', function () {
                wp_dequeue_style('wp-block-library');
                wp_dequeue_style('global-styles');
            }, 100);
        }
    }
}

/**
 * Hooks into the 'wp_print_scripts' action to include allowed scripts.
 *
 * This function checks if the current page is a WPQT public user page. If it is,
 * it retrieves the script dependencies from the AssetRepository and merges them
 * with the 'wpqt-script'. The resulting array of allowed scripts is then set to
 * the global $wp_scripts queue.
 *
 * @return void
 */
add_action('wp_print_scripts', 'wpqt_include_allowed_scripts', PHP_INT_MAX);
if (!function_exists('wpqt_include_allowed_scripts')) {
    function wpqt_include_allowed_scripts()
    {
        $locationService = new LocationService();

        if ($locationService->isWPQTPublicUserPage()) {
            global $wp_scripts;

            $dependencies = AssetRepository::getWPQTScriptDependencies();
            $allowedToLoad = array_merge($dependencies, ['wpqt-script']);
            $wp_scripts->queue = $allowedToLoad;
        }
    }
}

add_action('woocommerce_new_order', 'quicktasker_handle_woocommerce_new_order', 10, 1);
if (!function_exists('quicktasker_handle_woocommerce_new_order')) {
    function quicktasker_handle_woocommerce_new_order($order_id)
    {
        try {
            if (!$order_id) {
                return;
            }

            if (!function_exists('wc_get_order')) {
                return;
            }

            $order = wc_get_order($order_id);

            if (!$order) {
                return;
            }

            $relatedAutomations = ServiceLocator::get('AutomationRepository')->getAutomationsByTrigger(
                WP_QUICKTASKER_AUTOMATION_TRIGGER_WOOCOMMERCE_ORDER_ADDED
            );

            if ($relatedAutomations) {
                $executedAutomations = [];
                $pipelineId = $relatedAutomations[0]->pipeline_id;

                foreach ($relatedAutomations as $automation) {
                    $executionResult = ServiceLocator::get('AutomationService')->handleAutomations(
                        $pipelineId,
                        null,
                        WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_WOOCEMMERCE_ORDER,
                        WP_QUICKTASKER_AUTOMATION_TRIGGER_WOOCOMMERCE_ORDER_ADDED,
                        (object) [
                            'woocommerceOrder' => $order,
                        ]
                    );
                    $executedAutomations = array_merge(
                        $executedAutomations,
                        $executionResult->executedAutomations ?? []
                    );
                }
                ServiceLocator::get('WebhookService')->handleWebhooks(
                    $pipelineId,
                    [],
                    $executedAutomations
                );
            }
        } catch (Exception $e) {
            error_log('QuickTasker WooCommerce woocommerce_new_order action error: ' . $e->getMessage());
        }
    }
}

/**
 * Common handler for SeatReg booking actions.
 *
 * @param int $bookingId The booking ID
 * @param string $triggerType The automation trigger type constant
 * @return void
 */
if (!function_exists('quicktasker_handle_seatreg_booking_action')) {
    function quicktasker_handle_seatreg_booking_action($bookingId, $triggerType)
    {
        try {
            if (!$bookingId) {
                return;
            }

            if (!class_exists('SeatregBookingRepository') || !class_exists('SeatregRegistrationRepository')) {
                return;
            }

            $relatedAutomations = ServiceLocator::get('AutomationRepository')->getAutomationsByTrigger($triggerType);

            if (!$relatedAutomations) {
                return;
            }

            $bookingRepository = new SeatregBookingRepository();
            $registrationRepository = new SeatregRegistrationRepository();
            $pipelineId = $relatedAutomations[0]->pipeline_id;
            $seatregBookings = $bookingRepository->getBookingsById($bookingId);

            if (!$seatregBookings) {
                return;
            }

            $registration = $registrationRepository->getRegistrationByCode($seatregBookings[0]->registration_code);
            $executedAutomations = [];

            foreach ($relatedAutomations as $automation) {
                $executionResult = ServiceLocator::get('AutomationService')->handleAutomations(
                    $pipelineId,
                    null,
                    WP_QUICKTASKER_AUTOMATION_TARGET_TYPE_SEATREG_BOOKING,
                    $triggerType,
                    (object) [
                        'seatregBookings' => $seatregBookings,
                        'registration'    => $registration
                    ]
                );
                $executedAutomations = array_merge(
                    $executedAutomations,
                    $executionResult->executedAutomations ?? []
                );
            }

            ServiceLocator::get('WebhookService')->handleWebhooks(
                $pipelineId,
                [],
                $executedAutomations
            );
        } catch (Exception $e) {
            error_log('QuickTasker SeatReg ' . $triggerType . ' action error: ' . $e->getMessage());
        }
    }
}

add_action('seatreg_action_booking_submitted', 'quicktasker_handle_seatreg_booking_submitted', 10, 1);
add_action('seatreg_action_booking_manually_added', 'quicktasker_handle_seatreg_booking_submitted', 10, 1);
if (!function_exists('quicktasker_handle_seatreg_booking_submitted')) {
    function quicktasker_handle_seatreg_booking_submitted($bookingId)
    {
        quicktasker_handle_seatreg_booking_action(
            $bookingId,
            WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_CREATED
        );
    }
}

add_action('seatreg_action_booking_approved', 'quicktasker_handle_seatreg_booking_approved', 10, 1);
if (!function_exists('quicktasker_handle_seatreg_booking_approved')) {
    function quicktasker_handle_seatreg_booking_approved($bookingId)
    {
        quicktasker_handle_seatreg_booking_action(
            $bookingId,
            WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED
        );
    }
}

add_action('seatreg_action_booking_pending', 'quicktasker_handle_seatreg_booking_pending', 10, 1);
if (!function_exists('quicktasker_handle_seatreg_booking_pending')) {
    function quicktasker_handle_seatreg_booking_pending($bookingId)
    {
        quicktasker_handle_seatreg_booking_action(
            $bookingId,
            WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING
        );
    }
}

add_action('seatreg_action_booking_pending_via_manager', 'quicktasker_handle_seatreg_booking_pending_via_manager', 10, 1);
if (!function_exists('quicktasker_handle_seatreg_booking_pending_via_manager')) {
    function quicktasker_handle_seatreg_booking_pending_via_manager($bookingId)
    {
        quicktasker_handle_seatreg_booking_action(
            $bookingId,
            WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_PENDING_VIA_MANAGER
        );
    }
}

add_action('seatreg_action_booking_approved_via_manager', 'quicktasker_handle_seatreg_booking_approved_via_manager', 10, 1);
if (!function_exists('quicktasker_handle_seatreg_booking_approved_via_manager')) {
    function quicktasker_handle_seatreg_booking_approved_via_manager($bookingId)
    {
        quicktasker_handle_seatreg_booking_action(
            $bookingId,
            WP_QUICKTASKER_AUTOMATION_TRIGGER_SEATREG_BOOKING_APPROVED_VIA_MANAGER
        );
    }
}
