import { AutomationExecutionResult } from "../types/automation";
import { User, UserTypes, WPUser } from "../types/user";

function isUser(user: User | WPUser): user is User {
  return !user.user_type || user.user_type === UserTypes.QUICKTASKER;
}

function isWPUser(user: User | WPUser): user is WPUser {
  return user.user_type === UserTypes.WORDPRESS;
}

function isUserOrWPUser(
  result: AutomationExecutionResult,
): result is User | WPUser {
  return (
    result &&
    typeof result === "object" &&
    (!result.user_type ||
      result.user_type === UserTypes.QUICKTASKER ||
      result.user_type === UserTypes.WORDPRESS)
  );
}

export { isUser, isUserOrWPUser, isWPUser };
