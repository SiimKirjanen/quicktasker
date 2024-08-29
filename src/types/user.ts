type BaseUser = {
  id: string;
  name: string;
  description: string;
};

type User = BaseUser;
type ServerUser = BaseUser;

export type { User, ServerUser };
