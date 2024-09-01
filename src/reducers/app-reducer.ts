import { INIT_APP_STATE, SET_SITE_URL } from "../constants";
import { Action, State } from "../providers/AppContextProvider";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_SITE_URL: {
      const siteURL: string = action.payload;

      return {
        ...state,
        siteURL,
      };
    }
    case INIT_APP_STATE: {
      const { siteURL, publicUserPageId } = action.payload;

      return {
        ...state,
        siteURL,
        publicUserPageId,
      };
    }
    default:
      return state;
  }
};

export { reducer };
