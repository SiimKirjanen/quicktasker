import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SET_USERS,
  SET_USERS_SEARCH_VALUE,
} from "../constants";
import { Action, State } from "../providers/UserContextProvider";
import { ServerUser, User } from "../types/user";

const transformServerUserToUser = (serverUser: ServerUser): User => ({
  ...serverUser,
  is_active: serverUser.is_active === "1",
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USERS: {
      const serverUsers: ServerUser[] = action.payload;
      const users: User[] = serverUsers.map(transformServerUserToUser);

      return {
        ...state,
        users,
      };
    }
    case ADD_USER: {
      const serverUser: ServerUser = action.payload;
      const user: User = transformServerUserToUser(serverUser);

      return {
        ...state,
        users: [...state.users, user],
      };
    }
    case EDIT_USER: {
      const editedServerUser: ServerUser = action.payload;
      const editedUser: User = transformServerUserToUser(editedServerUser);
      const users = state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user,
      );

      return {
        ...state,
        users,
      };
    }
    case DELETE_USER: {
      const userId: string = action.payload;
      const users = state.users.filter((user) => user.id !== userId);

      return {
        ...state,
        users,
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
