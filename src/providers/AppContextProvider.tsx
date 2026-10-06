import { createContext, useReducer } from "@wordpress/element";
import { SET_CUSTOM_USER_PAGE_STYLES, SET_SITE_URL } from "../constants";
import { reducer } from "../reducers/app-reducer";

type State = {
  siteURL: string;
  pluginURL: string;
  publicUserPageId: string;
  is_customFields: boolean;
  timezone: string;
  currentUserId: string;
  isUserAllowedToDelete: boolean;
  isUserAllowedToManageSettings: boolean;
  isUserAllowedToManageUsers: boolean;
  isUserAllowedToDeleteUsers: boolean;
  isUserAllowedToManageWPUsers: boolean;
  isUserAllowedToCleanArchive: boolean;
  userPageCustomStyles: string;
  taskUploadsURL: string;
};

const initialState: State = {
  siteURL: "",
  pluginURL: "",
  publicUserPageId: "",
  is_customFields: true,
  timezone: "",
  currentUserId: "",
  isUserAllowedToDelete: false,
  isUserAllowedToManageSettings: false,
  isUserAllowedToManageUsers: false,
  isUserAllowedToDeleteUsers: false,
  isUserAllowedToManageWPUsers: false,
  isUserAllowedToCleanArchive: false,
  userPageCustomStyles: "",
  taskUploadsURL: "",
};

type Action =
  | { type: typeof SET_CUSTOM_USER_PAGE_STYLES; payload: string }
  | { type: typeof SET_SITE_URL; payload: string };

type Dispatch = (action: Action) => void;

type AppContextType = {
  state: State;
  appDispatch: Dispatch;
};

const AppContext = createContext<AppContextType>({
  state: initialState,
  appDispatch: () => {},
});

// Read synchronously so the state is filled on the first render, before any
// child mount effect runs.
const getInitialStateFromWindow = (state: State): State => ({
  ...state,
  siteURL: window.wpqt.siteURL,
  publicUserPageId: window.wpqt.publicUserPageId,
  timezone: window.wpqt.timezone,
  currentUserId: window.wpqt.currentUserId,
  isUserAllowedToDelete: window.wpqt.isUserAllowedToDelete === "1",
  isUserAllowedToManageSettings:
    window.wpqt.isUserAllowedToManageSettings === "1",
  isUserAllowedToManageUsers: window.wpqt.isUserAllowedToManageUsers === "1",
  isUserAllowedToDeleteUsers: window.wpqt.isUserAllowedToDeleteUsers === "1",
  isUserAllowedToManageWPUsers:
    window.wpqt.isUserAllowedToManageWPUsers === "1",
  isUserAllowedToCleanArchive: window.wpqt.isUserAllowedToCleanArchive === "1",
  userPageCustomStyles: window.wpqt.userPageCustomStyles,
  pluginURL: window.wpqt.pluginURL,
  taskUploadsURL: window.wpqt.taskUploadsURL,
});

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, appDispatch] = useReducer(
    reducer,
    initialState,
    getInitialStateFromWindow,
  );

  return (
    <AppContext.Provider value={{ state, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export {
  AppContext,
  AppContextProvider,
  getInitialStateFromWindow,
  initialState,
  type Action,
  type State,
};
