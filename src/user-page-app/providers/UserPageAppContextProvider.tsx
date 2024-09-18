import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/user-page-app-reducer";
import { SET_USER_PAGE_STATUS } from "../constants";
import { getUserPageStatusRequest } from "../api/user-page-api";
import { useSession } from "../hooks/useSession";
import { getQueryParam } from "../../utils/url";
import { useErrorHandler } from "../hooks/useErrorHandler";

const initialState: State = {
  initialLoading: true,
  isActiveUser: false,
  setupCompleted: false,
  isLoggedIn: false,
  pageHash: getQueryParam("code") || "",
  userId: "",
  userName: "",
};

type State = {
  initialLoading: boolean;
  isActiveUser: boolean;
  setupCompleted: boolean;
  isLoggedIn: boolean;
  pageHash: string;
  userId: string;
  userName: string;
};

type Action = {
  type: string;
  payload?: any;
};

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
    loadUserPageStatus();
  }, []);

  const loadUserPageStatus = async () => {
    try {
      const pageHash = state.pageHash;

      if (pageHash) {
        const userLoggedIn = isLoggedIn();
        const { data } = await getUserPageStatusRequest(pageHash);

        userPageAppDispatch({
          type: SET_USER_PAGE_STATUS,
          payload: { ...data, isLoggedIn: userLoggedIn },
        });
      }
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
  UserPageAppContextProvider,
  UserPageAppContext,
  type State,
  type Action,
};
