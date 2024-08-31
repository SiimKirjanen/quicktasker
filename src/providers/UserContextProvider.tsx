import { createContext, useEffect, useReducer } from "@wordpress/element";
import { User } from "../types/user";
import { reducer } from "../reducers/user-reducer";
import { SET_USERS } from "../constants";

const initialState = {
  loading: true,
  users: [],
  usersSearchValue: "",
};

type State = {
  loading: boolean;
  users: User[];
  usersSearchValue: string;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserContextType = {
  state: State;
  userDispatch: Dispatch;
};

const UserContext = createContext<UserContextType>({
  state: initialState,
  userDispatch: () => {},
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, userDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialUsers = window.wpqt.initialUsers;

    userDispatch({ type: SET_USERS, payload: initialUsers });
  }, []);

  return (
    <UserContext.Provider value={{ state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext, type State, type Action };
