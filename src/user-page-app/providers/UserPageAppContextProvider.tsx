import { createContext, useEffect, useReducer } from "@wordpress/element";
import { UserTypes } from "../../types/user";
import { getUserPageCodeParam } from "../../utils/url";
import { calculateLoginStatus } from "../../utils/user-session";
import { getUserPageStatusRequest } from "../api/user-page-api";
import {
  RESET_USER_PAGE_STATUS,
  SET_INIT_DATA,
  SET_USER_LOGGED_IN,
  SET_USER_PAGE_STATUS,
} from "../constants";
import { useErrorHandler } from "../hooks/useErrorHandler";
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
  userType: null,
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
  userType: UserTypes | null;
};

type Action =
  | {
      type: typeof SET_USER_PAGE_STATUS;
      payload: {
        isActiveUser: boolean;
        setupCompleted: boolean;
        userId: string;
        userName: string;
        isQuicktaskerUser: boolean;
        isWordPressUser: boolean;
        userType: UserTypes;
      };
    }
  | { type: typeof SET_INIT_DATA; payload: { timezone: string } }
  | { type: typeof RESET_USER_PAGE_STATUS }
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

  useEffect(() => {
    if (!state.initialLoading) {
      const isLoggedIn = calculateLoginStatus(state);

      userPageAppDispatch({
        type: SET_USER_LOGGED_IN,
        payload: isLoggedIn,
      });
    }
  }, [
    state.initialLoading,
    state.userId,
    state.isWordPressUser,
    state.isQuicktaskerUser,
    state.pageHash,
  ]);

  const loadUserPageStatus = async () => {
    try {
      const { data } = await getUserPageStatusRequest();

      userPageAppDispatch({
        type: SET_USER_PAGE_STATUS,
        payload: { ...data },
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
