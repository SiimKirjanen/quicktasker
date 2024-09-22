import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { reducer } from "../reducers/user-sessions-reducer";
import { UserSession } from "../types/user-session";
import { getUserSessionsRequest } from "../api/api";
import { SET_FULL_PAGE_LOADING, SET_USER_SESSIONS } from "../constants";
import { toast } from "react-toastify";
import { LoadingContext } from "./LoadingContextProvider";

const initialState = {
  loading: true,
  sessionsSearchValue: "",
  userSessions: [],
};

type State = {
  loading: boolean;
  sessionsSearchValue: string;
  userSessions: UserSession[];
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserSessionsContextType = {
  state: State;
  usersSessionDispatch: Dispatch;
  loadUserSessions: () => Promise<void>;
};

const UserSessionsContext = createContext<UserSessionsContextType>({
  state: initialState,
  usersSessionDispatch: () => {},
  loadUserSessions: async () => {},
});

const UserSessionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, usersSessionDispatch] = useReducer(reducer, initialState);
  const { loadingDispatch } = useContext(LoadingContext);

  useEffect(() => {
    loadUserSessions();
  }, []);

  const loadUserSessions = async () => {
    try {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: true });
      const response = await getUserSessionsRequest();

      usersSessionDispatch({
        type: SET_USER_SESSIONS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user sessions");
    } finally {
      loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
    }
  };

  return (
    <UserSessionsContext.Provider
      value={{ state, usersSessionDispatch, loadUserSessions }}
    >
      {children}
    </UserSessionsContext.Provider>
  );
};

export {
  UserSessionsContextProvider,
  UserSessionsContext,
  type State,
  type Action,
};
