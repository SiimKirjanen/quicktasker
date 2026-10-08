import { ActionTargetType } from "./automation";

type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  // Only sent to users who can manage QuickTaskers.
  page_hash?: string;
  assigned_tasks_count: string;
  user_type: UserTypes.QUICKTASKER;
  // The boards the user has been added to. Missing on a user that was just created.
  pipeline_ids?: number[];
};

type User = BaseUser & {
  is_active: boolean;
  is_banned: boolean;
  banned_at: string | null;
  has_password: boolean;
};
type ServerUser = BaseUser & {
  is_active: string;
  is_banned: string;
  banned_at: string | null;
  has_password: string;
};
type ServerExtendedUser = BaseUser & {
  is_active: string;
  is_banned: string;
  banned_at: string | null;
  has_password: boolean;
  setup_completed: boolean;
};
type ExtendedUser = BaseUser & {
  is_active: boolean;
  is_banned: boolean;
  banned_at: string | null;
  has_password: boolean;
  setup_completed: boolean;
};

type UserFilter = {
  id: string | null;
  type: UserTypes | null;
};

type WPUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  caps: string[];
  allcaps: string[];
  roles: string[];
  user_type: UserTypes.WP_USER;
  profile_picture: string;
  pipeline_ids?: number[];
  can_access_all_pipelines?: boolean;
};

// API tokens, webhooks and automations that send board data out a WordPress user created on one board.
type PipelineIntegrationCount = {
  pipeline_id: number;
  api_token_count: number;
  webhook_count: number;
  automation_count: number;
};

type UserPipelinesUpdate = {
  // All the boards the user is on after the update, including ones the request did not mention.
  pipeline_ids: number[];
  added_pipeline_ids: number[];
  removed_pipeline_ids: number[];
  removed_pipelines_with_assigned_tasks: {
    pipeline_id: number;
    task_count: number;
  }[];
  // API tokens, webhooks and sending automations the user created on the removed boards, which don't work without access to them.
  // Only WordPress users can create them.
  stopped_integrations?: PipelineIntegrationCount[];
};

type WPUserPipelinesUpdate = UserPipelinesUpdate & {
  stopped_integrations: PipelineIntegrationCount[];
};

type WPUserCapabilitiesUpdate = {
  // API tokens, webhooks and sending automations the user created, which don't work now that they can no longer manage settings.
  stopped_integrations: PipelineIntegrationCount[];
  // API tokens with a DELETE permission the user created, which can't delete now that the user can't. No webhooks or automations.
  stopped_token_deletes: PipelineIntegrationCount[];
};

type UserEditData = {
  name?: string;
  description?: string;
};

enum UserTypes {
  QUICKTASKER = ActionTargetType.QUICKTASKER,
  WP_USER = ActionTargetType.WP_USER,
}

export { UserTypes };
export type {
  ExtendedUser,
  PipelineIntegrationCount,
  ServerExtendedUser,
  ServerUser,
  User,
  UserEditData,
  UserFilter,
  UserPipelinesUpdate,
  WPUser,
  WPUserCapabilitiesUpdate,
  WPUserPipelinesUpdate,
};
