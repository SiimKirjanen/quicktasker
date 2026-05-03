import {
  SET_USER_SESSIONS,
  SET_USER_SESSIONS_SEARCH_VALUE,
} from "../constants";
import { Action, State } from "../providers/UserSessionsContextProvider";
import { UserSession } from "../types/user-session";
import { convertUserSessionFromServer } from "../utils/user-session";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_SESSIONS_SEARCH_VALUE: {
      return {
        ...state,
        sessionsSearchValue: action.payload ?? "",
      };
    }
    case SET_USER_SESSIONS: {
      const userSessions: UserSession[] = action.payload.map(
        convertUserSessionFromServer,
      );

      return {
        ...state,
        userSessions,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer };
