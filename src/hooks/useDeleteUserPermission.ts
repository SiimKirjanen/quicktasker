import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { AppContext } from "../providers/AppContextProvider";

const useDeleteUserPermission = () => {
  const {
    state: { isUserAllowedToDeleteUsers },
  } = useContext(AppContext);

  return {
    isUserAllowedToDeleteUsers,
    deleteUserDisabledReason: isUserAllowedToDeleteUsers
      ? undefined
      : __("You don't have permission to delete users", "quicktasker"),
  };
};

export { useDeleteUserPermission };
