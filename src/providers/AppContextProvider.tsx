import { createContext, useEffect, useReducer } from "@wordpress/element";
import { reducer } from "../reducers/app-reducer";
import { SET_SITE_URL } from "../constants";

const initialState: State = {
  loading: true,
  siteURL: "",
};

type State = {
  loading: boolean;
  siteURL: string;
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
    const siteUrl = window.wpqt.siteURL;

    appDispatch({ type: SET_SITE_URL, payload: siteUrl });
  }, []);

  return (
    <AppContext.Provider value={{ state, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext, type State, type Action };
