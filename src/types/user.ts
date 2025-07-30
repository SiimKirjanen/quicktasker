import { ActionTargetType } from "./automation";

type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  page_hash: string;
  assigned_tasks_count: string;
  user_type: UserTypes.QUICKTASKER;
};

type User = BaseUser & {
  is_active: boolean;
  has_password: boolean;
};
type ServerUser = BaseUser & {
  is_active: string;
  has_password: string;
};
type ServerExtendedUser = BaseUser & {
  is_active: string;
  has_password: boolean;
  setup_completed: boolean;
};
type ExtendedUser = BaseUser & {
  is_active: boolean;
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
  ServerExtendedUser,
  ServerUser,
  User,
  UserEditData,
  UserFilter,
  WPUser,
};
