import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/user-page-app-reducer";
import { SET_USER_PAGE_STATUS } from "../constants";
import { getUserPageStatusRequest } from "../api/user-page-api";
import useQueryParams from "../../hooks/useQueryParams";

const initialState: State = {
  loading: true,
  isActiveUser: false,
  setupCompleted: false,
  pageHash: "",
  isLoggedIn: false,
};

type State = {
  loading: boolean;
  isActiveUser: boolean;
  setupCompleted: boolean;
  pageHash: string;
  isLoggedIn: boolean;
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
  const { getQueryParam } = useQueryParams();

  useEffect(() => {
    getUserPageStatus();
  }, []);

  const getUserPageStatus = async () => {
    try {
      const pageHash = getQueryParam("code");

      if (pageHash) {
        const { data } = await getUserPageStatusRequest(pageHash);

        userPageAppDispatch({
          type: SET_USER_PAGE_STATUS,
          payload: { ...data, pageHash },
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
