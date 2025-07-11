import { createContext, useEffect, useReducer } from "@wordpress/element";
import { getUserPageCodeParam } from "../../utils/url";
import { getUserPageStatusRequest } from "../api/user-page-api";
import {
  SET_INIT_DATA,
  SET_USER_LOGGED_IN,
  SET_USER_PAGE_STATUS,
} from "../constants";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useSession } from "../hooks/useSession";
import { reducer } from "../reducers/user-page-app-reducer";

const initialState: State = {
  initialLoading: true,
  isActiveUser: false,
  setupCompleted: false,
  isLoggedIn: false,
  pageHash: getUserPageCodeParam(),
  userId: null,
  userName: null,
  cf: false,
  timezone: "",
  isQuicktaskerUser: false,
  isWordPressUser: false,
};

type State = {
  initialLoading: boolean;
  isActiveUser: boolean;
  setupCompleted: boolean;
  isLoggedIn: boolean;
  pageHash: string | null;
  userId: string | null;
  userName: string | null;
  cf: boolean;
  timezone: string;
  isQuicktaskerUser: boolean;
  isWordPressUser: boolean;
};

type Action =
  | {
      type: typeof SET_USER_PAGE_STATUS;
      payload: {
        isActiveUser: boolean;
        isLoggedIn: boolean;
        setupCompleted: boolean;
        userId: string;
        userName: string;
        isQuicktaskerUser: boolean;
        isWordPressUser: boolean;
      };
    }
  | { type: typeof SET_INIT_DATA; payload: { timezone: string } }
  | { type: typeof SET_USER_LOGGED_IN; payload: boolean };

type Dispatch = (action: Action) => void;

type UserPageAppContextType = {
  state: State;
  userPageAppDispatch: Dispatch;
  loadUserPageStatus: () => void;
};

const UserPageAppContext = createContext<UserPageAppContextType>({
  state: initialState,
  userPageAppDispatch: () => {},
  loadUserPageStatus: () => {},
});

const UserPageAppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, userPageAppDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );
  const { isLoggedIn } = useSession();
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const timezone = window.wpqt_user.timezone;

    userPageAppDispatch({
      type: SET_INIT_DATA,
      payload: { timezone },
    });
  }, []);

  useEffect(() => {
    loadUserPageStatus();
  }, []);

  const loadUserPageStatus = async () => {
    try {
      const userLoggedIn = isLoggedIn();
      const { data } = await getUserPageStatusRequest();

      userPageAppDispatch({
        type: SET_USER_PAGE_STATUS,
        payload: { ...data, isLoggedIn: userLoggedIn },
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <UserPageAppContext.Provider
      value={{ state, userPageAppDispatch, loadUserPageStatus }}
    >
      {children}
    </UserPageAppContext.Provider>
  );
};

export {
  initialState,
  UserPageAppContext,
  UserPageAppContextProvider,
  type Action,
  type State,
};
