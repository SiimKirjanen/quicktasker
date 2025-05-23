<?php

namespace WPQT\Slack;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'WPQT\Slack\SlackService' ) ) {
    class SlackService {
        /**
         * Send a message to Slack using Incoming Webhooks
         * 
         * @param string $webhook_url The Slack webhook URL
         * @param string $message The message to send
         * @param array $additional_data Optional additional data like channel, username, etc.
         * @param bool $wait_for_response Whether to wait for response from Slack (default: true)
         * @return string|null The response body on success if waiting for response, null if not waitin
         * @throws \Exception If something goes wrong with the request
         */
        public function sendMessage($webhook_url, $message, $additional_data = [], $wait_for_response = true) {
            if (empty($webhook_url)) {
                throw new \Exception('Slack webhook URL is empty');
            }
            
            $payload = [
                'blocks' => [
                    [
                        'type' => 'section',
                        'text' => [
                            'type' => 'mrkdwn',
                            'text' => $message,
                        ],
                    ],
                ],
            ];
            
            $payload = array_merge($payload, $additional_data);
            
            $args = [
                'body'        => wp_json_encode($payload),
                'headers'     => ['Content-Type' => 'application/json'],
                'timeout'     => 15,
                'blocking'    => $wait_for_response,
                'sslverify'   => true,
            ];
            
            $response = wp_remote_post($webhook_url, $args);

            if (!$wait_for_response) {
                return null;
            }
            
            if (is_wp_error($response)) {
                throw new \Exception('Slack notification error: ' . $response->get_error_message());
            } 
            
            $code = wp_remote_retrieve_response_code($response);
            if ($code !== 200) {
                throw new \Exception('Slack API error: Received response code ' . $code);
            }
            
            $body = wp_remote_retrieve_body($response);
            
            return $body;
        }
    }
}