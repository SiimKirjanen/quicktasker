import { createContext, useEffect, useReducer } from "@wordpress/element";
import { RESET_MISSING_CONTENT, SET_PIPELINE_MISSING } from "../constants";
import { reducer } from "../reducers/missing-content-reducer";

const initialState = {
  pipelineMissing: false,
};

type State = {
  pipelineMissing: boolean;
};

type Action =
  | { type: typeof SET_PIPELINE_MISSING; payload: boolean }
  | { type: typeof RESET_MISSING_CONTENT };

type ContextValue = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const MissingContentContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => null,
});

type ProviderProps = {
  children: React.ReactNode;
};

function MissingContentProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleUrlChange = () => {
      dispatch({ type: RESET_MISSING_CONTENT });
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  return (
    <MissingContentContext.Provider value={{ state, dispatch }}>
      {children}
    </MissingContentContext.Provider>
  );
}

export { initialState, MissingContentContext, MissingContentProvider };
export type { Action, State };
