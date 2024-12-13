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

type WPUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  caps: string[];
  allcaps: string[];
  roles: string[];
  user_type: UserTypes.WORDPRESS;
};

enum UserTypes {
  QUICKTASKER = "quicktasker",
  WORDPRESS = "wp-user",
}

export { UserTypes };
export type { ExtendedUser, ServerExtendedUser, ServerUser, User, WPUser };
