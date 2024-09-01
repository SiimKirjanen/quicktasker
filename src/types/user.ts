type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  email: string;
  phone: string;
  page_hash: string;
};

type User = BaseUser & {
  is_active: boolean;
};
type ServerUser = BaseUser & {
  is_active: string;
};

export type { User, ServerUser };
