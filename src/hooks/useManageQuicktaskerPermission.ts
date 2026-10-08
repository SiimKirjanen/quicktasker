import { __ } from "@wordpress/i18n";
import { User } from "../types/user";

/**
 * Whether the viewer can manage a QuickTasker user, like editing them, resetting
 * their password or changing their status. Managing a QuickTasker gives access
 * to their tasks app, so users who have not been added to every board the
 * QuickTasker is on can't manage them.
 *
 * Users without can_manage, like one that was just created, can be managed.
 */
const useManageQuicktaskerPermission = (user: Pick<User, "can_manage">) => {
  const canManageQuicktasker = user.can_manage !== false;

  return {
    canManageQuicktasker,
    manageQuicktaskerDisabledReason: canManageQuicktasker
      ? undefined
      : __(
          "This QuickTasker has been added to boards you have not been added to",
          "quicktasker",
        ),
  };
};

export { useManageQuicktaskerPermission };
