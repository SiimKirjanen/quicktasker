import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/app-reducer";
import { INIT_APP_STATE } from "../constants";

type State = {
  siteURL: string;
  publicUserPageId: string;
};

const initialState: State = {
  siteURL: "",
  publicUserPageId: "",
};

type Action = {
  type: string;
  payload?: any;
};

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
