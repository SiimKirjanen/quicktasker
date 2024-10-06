import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/app-reducer";
import { INIT_APP_STATE, SET_SITE_URL } from "../constants";

type State = {
  siteURL: string;
  publicUserPageId: string;
  is_customFields: boolean;
};

const initialState: State = {
  siteURL: "",
  publicUserPageId: "",
  is_customFields: true,
};

type Action =
  | {
      type: typeof INIT_APP_STATE;
      payload: { siteURL: string; publicUserPageId: string };
    }
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

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, appDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const siteURL = window.wpqt.siteURL;
    const publicUserPageId = window.wpqt.publicUserPageId;

    appDispatch({
      type: INIT_APP_STATE,
      payload: {
        siteURL,
        publicUserPageId,
      },
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext, type State, type Action };
