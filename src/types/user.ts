type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  email: string;
  phone: string;
};

type User = BaseUser & {
  is_active: boolean;
};
type ServerUser = BaseUser & {
  is_active: string;
};

export type { User, ServerUser };
