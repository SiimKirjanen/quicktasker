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
        /** Entity types that belong to a board through their own pipeline_id column. */
        private const BOARD_ENTITY_TYPES = ['stage', 'task', 'label', 'automation', 'webhook', 'api_token'];

        /** Entity types that do not belong to a board. Only capabilities decide access to them. */
        private const USER_ENTITY_TYPES = ['quicktasker', 'wp-user', 'users'];

        /** Entity types that belong to whatever entity they are attached to. */
        private const ATTACHED_ENTITY_TYPES = ['custom_field', 'upload'];

        /**
         * Checks if a WordPress user can access an entity through the board it belongs to.
         *
         * Entities without a board, like tasks archived from a deleted board, can only be
         * accessed by users who can access every board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param string $entityType 'pipeline', a board entity type ('stage', 'task', 'label', 'automation',
         *                           'webhook', 'api_token'), an attached entity type ('custom_field', 'upload')
         *                           or a user entity type ('quicktasker', 'wp-user', 'users').
         * @param int|null $entityId The entity ID.
         * @return bool True if the user can access the entity.
         */
        public function canAccessEntity($wpUserId, $entityType, $entityId)
        {
            $pipelineAccessRepo = ServiceLocator::get('PipelineAccessRepository');

            if ($pipelineAccessRepo->canAccessAllPipelines($wpUserId)) {
                return true;
            }

            if (in_array($entityType, self::USER_ENTITY_TYPES, true)) {
                return true;
            }

            if ('pipeline' === $entityType) {
                return $this->canAccessPipeline($wpUserId, $entityId);
            }

            if (in_array($entityType, self::ATTACHED_ENTITY_TYPES, true)) {
                $entity = $pipelineAccessRepo->getEntityOf($entityType, $entityId);

                return null !== $entity && $this->canAccessEntity($wpUserId, $entity->entity_type, $entity->entity_id);
            }

            if (!in_array($entityType, self::BOARD_ENTITY_TYPES, true)) {
                return false;
            }

            $pipelineId = $pipelineAccessRepo->getPipelineIdOfEntity($entityType, $entityId);

            return null !== $pipelineId && $this->canAccessPipeline($wpUserId, $pipelineId);
        }

        /**
         * Checks if a board, or something that belongs to a board, exists.
         *
         * @param string $entityType See canAccessEntity().
         * @param int|null $entityId The entity ID.
         * @return bool True if the entity exists, or if it is not something that belongs to a board.
         */
        public function entityExists($entityType, $entityId)
        {
            return ServiceLocator::get('PipelineAccessRepository')->entityExists($entityType, $entityId);
        }

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
         * Keeps only the items, like tasks, that belong to a board the WordPress user can access.
         *
         * Items without a board are kept only for users who can access every board.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param array $items Objects with a pipeline_id property.
         * @return array The accessible items, re-indexed.
         */
        public function filterItemsOnAccessiblePipelines($wpUserId, $items)
        {
            $accessiblePipelineIds = $this->getAccessiblePipelineIds($wpUserId);

            if (null === $accessiblePipelineIds) {
                return array_values($items);
            }

            return array_values(array_filter($items, function ($item) use ($accessiblePipelineIds) {
                return null !== $item->pipeline_id && in_array((int) $item->pipeline_id, $accessiblePipelineIds, true);
            }));
        }

        /**
         * Checks if a user of either type can access an entity. QuickTasker users are not limited by boards.
         *
         * @param int $userId The user ID.
         * @param string $userType WP_QT_WORDPRESS_USER_TYPE or WP_QT_QUICKTASKER_USER_TYPE.
         * @param string $entityType See canAccessEntity().
         * @param int|null $entityId The entity ID.
         * @return bool True if the user can access the entity.
         */
        public function canUserAccessEntity($userId, $userType, $entityType, $entityId)
        {
            return WP_QT_WORDPRESS_USER_TYPE !== $userType || $this->canAccessEntity($userId, $entityType, $entityId);
        }

        /**
         * Keeps only the items a user of either type can access. QuickTasker users are not limited by boards.
         *
         * @param int $userId The user ID.
         * @param string $userType WP_QT_WORDPRESS_USER_TYPE or WP_QT_QUICKTASKER_USER_TYPE.
         * @param array $items Objects with a pipeline_id property.
         * @return array The accessible items, re-indexed.
         */
        public function filterItemsForUser($userId, $userType, $items)
        {
            if (WP_QT_WORDPRESS_USER_TYPE !== $userType) {
                return array_values($items);
            }

            return $this->filterItemsOnAccessiblePipelines($userId, $items);
        }

        /**
         * Adds each WordPress user's board access to the user objects.
         *
         * Sets can_access_all_pipelines, and pipeline_ids with the boards the user has been added to.
         *
         * @param array $wpUsers WordPress user objects with an id property.
         * @return array The same user objects.
         */
        public function addPipelineAccessToWPUsers($wpUsers)
        {
            $pipelineAccessRepo = ServiceLocator::get('PipelineAccessRepository');
            $pipelineIdsByWPUserId = $pipelineAccessRepo->getPipelineIdsByWPUserIds(
                array_map('intval', array_column($wpUsers, 'id'))
            );

            foreach ($wpUsers as $wpUser) {
                $wpUser->can_access_all_pipelines = $pipelineAccessRepo->canAccessAllPipelines((int) $wpUser->id);
                $wpUser->pipeline_ids = $pipelineIdsByWPUserId[(int) $wpUser->id] ?? [];
            }

            return $wpUsers;
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
         * Checks if the creator of an API token, webhook or automation could still create it on its board.
         *
         * API tokens and webhooks only work while this is true, so they stop when the creator is removed from
         * the board, loses the QuickTasker or manage settings capability, for example through a role change,
         * or is deleted. Items created before creators were recorded have no creator and are allowed.
         *
         * @param int|null $createdBy The ID of the WordPress user who created the item.
         * @param int|null $pipelineId The ID of the item's board.
         * @return bool True if the creator is unknown, or can manage integrations and access the board.
         */
        public function canCreatorUseBoard($createdBy, $pipelineId)
        {
            if (empty($createdBy)) {
                return true;
            }

            $creatorId = (int) $createdBy;
            $pipelineAccessRepo = ServiceLocator::get('PipelineAccessRepository');

            if (!$pipelineAccessRepo->canManageIntegrations($creatorId)) {
                return false;
            }

            if (null === $pipelineId) {
                return $pipelineAccessRepo->canAccessAllPipelines($creatorId);
            }

            return $this->canAccessPipeline($creatorId, $pipelineId);
        }

        /**
         * Adds whether each item's creator can still use the item's board. See canCreatorUseBoard().
         *
         * Sets created_by_has_board_access to true or false, or to null when the creator is unknown.
         * A deleted creator has no access, so their API tokens and webhooks that were not deleted with them,
         * like when the plugin was inactive, are shown as not working.
         *
         * @param array $items Objects with pipeline_id and created_by properties.
         * @return array The same objects.
         */
        public function addCreatorBoardAccess($items)
        {
            $accessByCreatorAndPipeline = [];

            foreach ($items as $item) {
                if (empty($item->created_by)) {
                    $item->created_by_has_board_access = null;
                    continue;
                }

                $key = $item->created_by . ':' . $item->pipeline_id;

                if (!array_key_exists($key, $accessByCreatorAndPipeline)) {
                    $accessByCreatorAndPipeline[$key] = $this->canCreatorUseBoard($item->created_by, $item->pipeline_id);
                }

                $item->created_by_has_board_access = $accessByCreatorAndPipeline[$key];
            }

            return $items;
        }

        /**
         * Checks if the creator of an API token can still delete.
         *
         * API tokens can only delete stages and tasks while this is true, so their DELETE requests stop
         * when the creator loses the allow delete capability or is deleted. Tokens created before creators
         * were recorded have no creator and are allowed.
         *
         * @param int|null $createdBy The ID of the WordPress user who created the token.
         * @return bool True if the creator is unknown or can delete.
         */
        public function canCreatorDelete($createdBy)
        {
            if (empty($createdBy)) {
                return true;
            }

            return ServiceLocator::get('PipelineAccessRepository')->canDelete((int) $createdBy);
        }

        /**
         * Adds what each API token's creator can still do, so the API tokens page can show which tokens don't work.
         *
         * Sets created_by_has_board_access, see addCreatorBoardAccess(), and created_by_can_delete, see
         * canCreatorDelete(). Both are null when the creator is unknown.
         *
         * @param array $tokens Objects with pipeline_id and created_by properties.
         * @return array The same objects.
         */
        public function addTokenCreatorStatus($tokens)
        {
            $this->addCreatorBoardAccess($tokens);

            foreach ($tokens as $token) {
                $token->created_by_can_delete = empty($token->created_by) ? null : $this->canCreatorDelete($token->created_by);
            }

            return $tokens;
        }

        /**
         * Counts the API tokens and webhooks a WordPress user created on each of the given boards.
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[]|null $pipelineIds The board IDs, or null for every board.
         * @return array Arrays with pipeline_id, api_token_count and webhook_count, for the boards that have any.
         */
        public function countIntegrationsCreatedByWPUser($wpUserId, $pipelineIds)
        {
            return $this->countIntegrationsByPipeline(
                ServiceLocator::get('ApiTokenRepository')->getTokensCreatedByWPUser($wpUserId, $pipelineIds),
                ServiceLocator::get('WebhookRepository')->getWebhooksCreatedByWPUser($wpUserId, $pipelineIds)
            );
        }

        /**
         * Counts the API tokens with a DELETE permission a WordPress user created on each of the given boards.
         *
         * Their DELETE requests only work while the user can delete, see canCreatorDelete().
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[]|null $pipelineIds The board IDs, or null for every board.
         * @return array Arrays with pipeline_id, api_token_count and webhook_count (always 0), for the boards that have any.
         */
        public function countDeletingTokensCreatedByWPUser($wpUserId, $pipelineIds)
        {
            $tokens = array_filter(
                ServiceLocator::get('ApiTokenRepository')->getTokensCreatedByWPUser($wpUserId, $pipelineIds),
                function ($token) {
                    return '1' === (string) $token->delete_pipeline_stages || '1' === (string) $token->delete_pipeline_tasks;
                }
            );

            return $this->countIntegrationsByPipeline($tokens, []);
        }

        /**
         * Deletes the API tokens and webhooks a WordPress user created, and logs each deletion.
         *
         * Used when the user is deleted, as they can never get access back. While a user only lacks access,
         * their API tokens and webhooks are kept but stop working, see canCreatorUseBoard().
         *
         * @param int $wpUserId The WordPress user ID.
         * @param int[]|null $pipelineIds Only on these boards, or null for every board.
         * @param string $reason Ends the log entries, like "Anna was removed from the board".
         * @return array The deleted API tokens and webhooks, counted as in countIntegrationsCreatedByWPUser().
         * @throws \Exception If an API token or webhook could not be deleted.
         */
        public function deleteIntegrationsCreatedByWPUser($wpUserId, $pipelineIds, $reason)
        {
            $tokens = ServiceLocator::get('ApiTokenRepository')->getTokensCreatedByWPUser($wpUserId, $pipelineIds);
            $webhooks = ServiceLocator::get('WebhookRepository')->getWebhooksCreatedByWPUser($wpUserId, $pipelineIds);
            $logService = ServiceLocator::get('LogService');
            $currentUserId = get_current_user_id();

            foreach ($tokens as $token) {
                ServiceLocator::get('ApiTokenService')->deleteApiToken($token->pipeline_id, $token->id);
                $logService->log('API token ' . $token->name . ' deleted because ' . $reason, [
                    'type'          => WP_QT_LOG_TYPE_API_TOKEN,
                    'type_id'       => $token->id,
                    'user_id'       => $currentUserId,
                    'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                    'created_by_id' => $currentUserId,
                    'pipeline_id'   => $token->pipeline_id,
                ]);
            }

            foreach ($webhooks as $webhook) {
                ServiceLocator::get('WebhookService')->deleteWebhook($webhook->id);
                $logService->log('Webhook ' . ServiceLocator::get('WebhookRepository')->generateWebhookName($webhook) . ' deleted because ' . $reason, [
                    'type'          => WP_QT_LOG_TYPE_WEBHOOK,
                    'type_id'       => $webhook->id,
                    'user_id'       => $currentUserId,
                    'created_by'    => WP_QT_LOG_CREATED_BY_ADMIN,
                    'created_by_id' => $currentUserId,
                    'pipeline_id'   => $webhook->pipeline_id,
                ]);
            }

            return $this->countIntegrationsByPipeline($tokens, $webhooks);
        }

        /**
         * Counts API tokens and webhooks per board.
         *
         * @param array $tokens Objects with a pipeline_id property.
         * @param array $webhooks Objects with a pipeline_id property.
         * @return array Arrays with pipeline_id, api_token_count and webhook_count, ordered by board ID.
         */
        private function countIntegrationsByPipeline($tokens, $webhooks)
        {
            $counts = [];

            foreach (['api_token_count' => $tokens, 'webhook_count' => $webhooks] as $countKey => $items) {
                foreach ($items as $item) {
                    $pipelineId = (int) $item->pipeline_id;
                    $counts[$pipelineId] = $counts[$pipelineId] ?? [
                        'pipeline_id'     => $pipelineId,
                        'api_token_count' => 0,
                        'webhook_count'   => 0,
                    ];
                    ++$counts[$pipelineId][$countKey];
                }
            }

            ksort($counts);

            return array_values($counts);
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
