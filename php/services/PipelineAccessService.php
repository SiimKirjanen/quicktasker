<?php

namespace WPQT\Pipeline;

if (!defined('ABSPATH')) {
    exit;
}

use WPQT\PipelineMissingException;
use WPQT\Services\ServiceLocator;

if (!class_exists('WPQT\Pipeline\PipelineAccessService')) {
    /**
     * Decides which boards a WordPress user can access.
     *
     * WordPress administrators can access every board. Other WordPress users can only access the
     * boards they have been added to. QuickTasker users are not affected.
     */
    class PipelineAccessService
    {
        /**
         * Retrieves the IDs of the boards a WordPress user can access.
         *
         * @param int $wpUserId The WordPress user ID.
         * @return int[]|null The board IDs, or null if the user can access every board.
         */
        public function getAccessiblePipelineIds($wpUserId)
        {
            $pipelineAccessRepo = ServiceLocator::get('PipelineAccessRepository');

            if ($pipelineAccessRepo->canAccessAllPipelines($wpUserId)) {
                return null;
            }

            return $pipelineAccessRepo->getPipelineIdsByWPUserId($wpUserId);
        }

        /**
         * Checks if a WordPress user can access a board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int $pipelineId The board ID.
         * @return bool True if the user can access the board.
         */
        public function canAccessPipeline($wpUserId, $pipelineId)
        {
            $accessiblePipelineIds = $this->getAccessiblePipelineIds($wpUserId);

            return null === $accessiblePipelineIds || in_array((int) $pipelineId, $accessiblePipelineIds, true);
        }

        /**
         * Keeps only the boards a WordPress user can access.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param array $pipelines The boards to filter.
         * @return array The accessible boards, re-indexed.
         */
        public function filterAccessiblePipelines($wpUserId, $pipelines)
        {
            $accessiblePipelineIds = $this->getAccessiblePipelineIds($wpUserId);

            if (null === $accessiblePipelineIds) {
                return array_values($pipelines);
            }

            return array_values(array_filter($pipelines, function ($pipeline) use ($accessiblePipelineIds) {
                return in_array((int) $pipeline->id, $accessiblePipelineIds, true);
            }));
        }

        /**
         * Adds a WordPress user to a board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int $pipelineId The board ID.
         * @return void
         * @throws \Exception If the user could not be added.
         */
        public function addWPUserToPipeline($wpUserId, $pipelineId)
        {
            ServiceLocator::get('PipelineAccessRepository')->addWPUserToPipeline($wpUserId, $pipelineId);
        }

        /**
         * Sets the boards a WordPress user has been added to, replacing the previous ones.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[] $pipelineIds The board IDs.
         * @return int[] The IDs of the boards the user was removed from.
         * @throws PipelineMissingException If one of the boards does not exist. No changes are made.
         * @throws \Exception If the boards could not be saved.
         */
        public function setWPUserPipelines($wpUserId, $pipelineIds)
        {
            $pipelineRepo = ServiceLocator::get('PipelineRepository');
            $pipelineAccessRepo = ServiceLocator::get('PipelineAccessRepository');
            $pipelineIds = array_values(array_unique(array_map('intval', $pipelineIds)));

            foreach ($pipelineIds as $pipelineId) {
                if (!$pipelineRepo->checkIfPipelineExists($pipelineId)) {
                    throw new PipelineMissingException('No pipeline found with id ' . $pipelineId);
                }
            }

            $currentPipelineIds = $pipelineAccessRepo->getPipelineIdsByWPUserId($wpUserId);
            $removedPipelineIds = array_values(array_diff($currentPipelineIds, $pipelineIds));

            foreach ($removedPipelineIds as $pipelineId) {
                $pipelineAccessRepo->removeWPUserFromPipeline($wpUserId, $pipelineId);
            }

            foreach (array_diff($pipelineIds, $currentPipelineIds) as $pipelineId) {
                $pipelineAccessRepo->addWPUserToPipeline($wpUserId, $pipelineId);
            }

            return $removedPipelineIds;
        }
    }
}
