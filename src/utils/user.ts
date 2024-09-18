import { ServerUser, User } from "../types/user";

const convertUserFromServer = (user: ServerUser): User => ({
  ...user,
  is_active: user.is_active === "1",
});

export { convertUserFromServer };
