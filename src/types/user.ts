type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  page_hash: string;
  assigned_tasks_count: string;
};

type User = BaseUser & {
  is_active: boolean;
};
type ServerUser = BaseUser & {
  is_active: string;
};
type ServerExtendedUser = BaseUser & {
  is_active: string;
  has_password: boolean;
  setup_complete: boolean;
};
type ExtendedUser = BaseUser & {
  is_active: boolean;
  has_password: boolean;
  setup_complete: boolean;
};

export type { User, ServerUser, ExtendedUser, ServerExtendedUser };
