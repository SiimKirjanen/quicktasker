import { CustomField } from "../../types/custom-field";
import { ServerUser, WPUser } from "../../types/user";

type UserPageUserResponse = {
  user: ServerUser | WPUser;
  customFields: CustomField[];
};

export type { UserPageUserResponse };
