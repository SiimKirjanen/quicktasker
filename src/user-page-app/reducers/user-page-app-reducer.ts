import {
  RESET_USER_PAGE_STATUS,
  SET_INIT_DATA,
  SET_USER_LOGGED_IN,
  SET_USER_PAGE_STATUS,
} from "../constants";
import {
  Action,
  initialState,
  State,
} from "../providers/UserPageAppContextProvider";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_PAGE_STATUS: {
      const {
        isActiveUser,
        setupCompleted,
        userId,
        userName,
        isQuicktaskerUser,
        isWordPressUser,
        userType,
      } = action.payload;

      return {
        ...state,
        isActiveUser: Boolean(isActiveUser),
        setupCompleted,
        initialLoading: false,
        userId,
        userName,
        isQuicktaskerUser,
        isWordPressUser,
        userType,
      };
    }
    case SET_USER_LOGGED_IN: {
      const isLoggedIn: boolean = action.payload;

      return {
        ...state,
        isLoggedIn,
      };
    }
    case SET_INIT_DATA: {
      const { timezone } = action.payload;

      return {
        ...state,
        timezone,
      };
    }
    case RESET_USER_PAGE_STATUS: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export { reducer };
