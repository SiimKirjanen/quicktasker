type BaseUser = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

type User = BaseUser;
type ServerUser = BaseUser;

export type { User, ServerUser };
