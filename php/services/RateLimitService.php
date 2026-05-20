<?php

namespace WPQT\RateLimit;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\WPQTException;

if (!class_exists('WPQT\RateLimit\RateLimitService')) {
    class RateLimitService
    {
        /**
         * Fixed-window per-subject rate limiter backed by WP transients.
         *
         * Throws WPQTException (sendToFrontEnd = true) when the subject has
         * exceeded $limit hits inside the current $windowSeconds window.
         *
         * @param string $bucket Short identifier (e.g. 'write_global', 'comment').
         * @param int|string $subjectId Per-user key, typically session user_id.
         * @param int $limit Max allowed hits per window.
         * @param int $windowSeconds Window length.
         * @throws WPQTException When the limit is exceeded.
         */
        public function enforce($bucket, $subjectId, $limit, $windowSeconds)
        {
            if (empty($subjectId) || $limit <= 0 || $windowSeconds <= 0) {
                return;
            }

            $countKey = 'wpqt_rl_' . $bucket . '_' . $subjectId;
            $expKey = $countKey . '_exp';

            $current = get_transient($countKey);
            $now = time();

            if (false === $current) {
                set_transient($countKey, 1, $windowSeconds);
                set_transient($expKey, $now + $windowSeconds, $windowSeconds);

                return;
            }

            $current = (int) $current;

            if ($current >= $limit) {
                throw new WPQTException('Too many requests. Please slow down and try again in a moment.', true);
            }

            $expiresAt = (int) get_transient($expKey);
            $remaining = $expiresAt > $now ? ($expiresAt - $now) : $windowSeconds;

            set_transient($countKey, $current + 1, $remaining);
        }
    }
}
