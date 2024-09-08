import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/user-page-app-reducer";
import { SET_USER_PAGE_STATUS } from "../constants";
import { getUserPageStatusRequest } from "../api/user-page-api";
import { useSession } from "../hooks/useSession";
import { getQueryParam } from "../../utils/url";

const initialState: State = {
  initialLoading: true,
  isActiveUser: false,
  setupCompleted: false,
  isLoggedIn: false,
  pageHash: getQueryParam("code") || "",
};

type State = {
  initialLoading: boolean;
  isActiveUser: boolean;
  setupCompleted: boolean;
  isLoggedIn: boolean;
  pageHash: string;
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

type UserPageAppContextType = {
  state: State;
  userPageAppDispatch: Dispatch;
};

const UserPageAppContext = createContext<UserPageAppContextType>({
  state: initialState,
  userPageAppDispatch: () => {},
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
    } catch (error) {}
  };

  return (
    <UserPageAppContext.Provider value={{ state, userPageAppDispatch }}>
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
