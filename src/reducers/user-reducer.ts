import { ADD_USER, SET_USERS, SET_USERS_SEARCH_VALUE } from "../constants";
import { Action, State } from "../providers/UserContextProvider";
import { ServerUser } from "../types/user";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_USERS: {
      const users: ServerUser[] = action.payload;

      return {
        ...state,
        users,
      };
    }
    case ADD_USER: {
      const user: ServerUser = action.payload;

      return {
        ...state,
        users: [...state.users, user],
      };
    }
    case SET_USERS_SEARCH_VALUE: {
      const usersSearchValue: string = action.payload;

      return {
        ...state,
        usersSearchValue,
      };
    }
    default:
      return state;
  }
};

export { reducer };
