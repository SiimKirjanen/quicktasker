import {
  INIT_APP_STATE,
  SET_CUSTOM_USER_PAGE_STYLES,
  SET_SITE_URL,
} from "../constants";
import { Action, State } from "../providers/AppContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_SITE_URL: {
      const siteURL: string = action.payload;

      return {
        ...state,
        siteURL,
      };
    }
    case INIT_APP_STATE: {
      const {
        siteURL,
        publicUserPageId,
        timezone,
        isUserAllowedToDelete,
        isUserAllowedToManageSettings,
        userPageCustomStyles,
        pluginURL,
        taskUploadsURL,
      } = action.payload;

      return {
        ...state,
        siteURL,
        publicUserPageId,
        timezone,
        isUserAllowedToDelete,
        isUserAllowedToManageSettings,
        userPageCustomStyles,
        pluginURL,
        taskUploadsURL,
      };
    }
    case SET_CUSTOM_USER_PAGE_STYLES: {
      const userPageCustomStyles: string = action.payload;

      return {
        ...state,
        userPageCustomStyles,
      };
    }
    default:
      return state;
  }
};

export { reducer };
