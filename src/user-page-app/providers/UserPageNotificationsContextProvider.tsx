import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "@wordpress/element";
import { WPQTComment } from "../../types/comment";
import { reducer } from "../reducers/user-page-notifications-reducer";
import { getUserPageCommentsRequest } from "../api/user-page-api";
import { UserPageAppContext } from "./UserPageAppContextProvider";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { convertCommentFromServer } from "../../utils/comment";
import {
  CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
  SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS,
} from "../constants";

const initialState: State = {
  newComments: [],
  loading: true,
};

type State = {
  newComments: WPQTComment[];
  loading: boolean;
};

type Action =
  | {
      type: typeof SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS;
      payload: WPQTComment[];
    }
  | { type: typeof CHANGE_USER_PAGE_NOTIFICATIONS_LOADING; payload: boolean };

type Dispatch = (action: Action) => void;

type UserPageNotificationsContextType = {
  state: State;
  userPageNotificationsDispatch: Dispatch;
  checkNewComments: () => void;
};

const UserPageNotificationsContext =
  createContext<UserPageNotificationsContextType>({
    state: initialState,
    userPageNotificationsDispatch: () => {},
    checkNewComments: () => {},
  });

const UserPageNotificationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, userPageNotificationsDispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);
  const { handleError } = useErrorHandler();
  const { getStoredComments } = useLocalStorage();

  useEffect(() => {
    checkNewComments();
  }, []);

  const setLoading = (loading: boolean) => {
    userPageNotificationsDispatch({
      type: CHANGE_USER_PAGE_NOTIFICATIONS_LOADING,
      payload: loading,
    });
  };

  const checkNewComments = async () => {
    try {
      setLoading(true);
      const storedComments = await getStoredComments();
      const response = await getUserPageCommentsRequest(pageHash);
      const newComments = response.data
        .map(convertCommentFromServer)
        .filter((comment) => !storedComments.find((c) => c.id === comment.id));

      userPageNotificationsDispatch({
        type: SET_USER_PAGE_NOTIFICATIONS_NEW_COMMENTS,
        payload: newComments,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserPageNotificationsContext.Provider
      value={{ state, userPageNotificationsDispatch, checkNewComments }}
    >
      {children}
    </UserPageNotificationsContext.Provider>
  );
};

export {
  UserPageNotificationsContextProvider,
  UserPageNotificationsContext,
  type State,
  type Action,
};
