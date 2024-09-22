import { createContext, useEffect, useReducer } from "@wordpress/element";
import { User } from "../types/user";
import { reducer } from "../reducers/user-reducer";
import { SET_USERS } from "../constants";
import { getUsersRequest } from "../api/api";
import { toast } from "react-toastify";

const initialState: State = {
  users: [],
  usersSearchValue: "",
};

type State = {
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
  updateUsers: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  state: initialState,
  userDispatch: () => {},
  updateUsers: async () => {},
});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, userDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  useEffect(() => {
    const initialUsers = window.wpqt.initialUsers;

    userDispatch({ type: SET_USERS, payload: initialUsers });
  }, []);

  const updateUsers = async () => {
    try {
      const response = await getUsersRequest();
      userDispatch({ type: SET_USERS, payload: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  return (
    <UserContext.Provider value={{ state, userDispatch, updateUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext, type State, type Action };
