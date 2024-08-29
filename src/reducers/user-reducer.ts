import { ADD_USER, SET_USERS } from "../constants";
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
    default:
      return state;
  }
};

export { reducer };
