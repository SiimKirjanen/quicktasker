<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'wpqt_register_public_task_form_block');
if (!function_exists('wpqt_register_public_task_form_block')) {
    function wpqt_register_public_task_form_block()
    {
        $build_dir = WP_QUICKTASKER_PLUGIN_FOLDER_DIR . 'build/';
        $build_url = WP_QUICKTASKER_PLUGIN_FOLDER_URL . 'build/';

        $editor_asset_file = $build_dir . 'publicTaskBlock.asset.php';
        $view_asset_file = $build_dir . 'publicTaskBlockView.asset.php';

        if (!file_exists($editor_asset_file) || !file_exists($view_asset_file)) {
            return;
        }

        $editor_asset = require $editor_asset_file;
        $view_asset = require $view_asset_file;

        wp_register_script(
            'wpqt-public-task-block-editor',
            $build_url . 'publicTaskBlock.js',
            $editor_asset['dependencies'],
            $editor_asset['version'],
            true
        );

        wp_register_script(
            'wpqt-public-task-block-view',
            $build_url . 'publicTaskBlockView.js',
            $view_asset['dependencies'],
            $view_asset['version'],
            true
        );

        wp_localize_script(
            'wpqt-public-task-block-view',
            'wpqtPublicTaskBlock',
            [
                'root'  => esc_url_raw(rest_url()),
                'nonce' => wp_create_nonce('wp_rest'),
            ]
        );

        if (file_exists($build_dir . 'publicTaskBlock.css')) {
            wp_register_style(
                'wpqt-public-task-block-editor-style',
                $build_url . 'publicTaskBlock.css',
                [],
                $editor_asset['version']
            );
        }

        if (file_exists($build_dir . 'publicTaskBlockView.css')) {
            wp_register_style(
                'wpqt-public-task-block-view-style',
                $build_url . 'publicTaskBlockView.css',
                [],
                $view_asset['version']
            );
        }

        register_block_type('quicktasker/public-task-form', [
            'api_version'   => 3,
            'editor_script' => 'wpqt-public-task-block-editor',
            'view_script'   => 'wpqt-public-task-block-view',
            'editor_style'  => 'wpqt-public-task-block-editor-style',
            'style'         => 'wpqt-public-task-block-view-style',
            'attributes'    => [
                'pipelineId'     => ['type' => 'number', 'default' => 0],
                'submitLabel'    => ['type' => 'string'],
                'successMessage' => ['type' => 'string'],
            ],
            'render_callback' => 'wpqt_render_public_task_form_block',
        ]);
    }
}

if (!function_exists('wpqt_render_public_task_form_block')) {
    function wpqt_render_public_task_form_block($attributes)
    {
        $pipelineId = isset($attributes['pipelineId']) ? (int) $attributes['pipelineId'] : 0;
        $submitLabel = !empty($attributes['submitLabel'])
            ? (string) $attributes['submitLabel']
            : __('Submit task', 'quicktasker');
        $successMessage = !empty($attributes['successMessage'])
            ? (string) $attributes['successMessage']
            : __('Thanks! Your task has been submitted.', 'quicktasker');

        return '<div class="wpqt-public-task-block" data-wpqt-public-task-form'
            . ' data-pipeline-id="' . (int) $pipelineId . '"'
            . ' data-submit-label="' . esc_attr($submitLabel) . '"'
            . ' data-success-message="' . esc_attr($successMessage) . '"></div>';
    }
}
