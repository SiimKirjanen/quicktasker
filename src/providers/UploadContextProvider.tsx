import { createContext, useReducer } from "@wordpress/element";
import { SET_UPLOADS } from "../constants";
import { reducer } from "../reducers/upload-reducer";
import { Upload } from "../types/upload";

const initialState: State = {
  uploads: [],
};

type State = {
  uploads: Upload[];
};

type Action = { type: typeof SET_UPLOADS; payload: Upload[] };

type Dispatch = (action: Action) => void;

type UploadContextType = {
  state: State;
  uploadDispatch: Dispatch;
};

const UploadContext = createContext<UploadContextType>({
  state: initialState,
  uploadDispatch: () => {},
});

const UploadContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, uploadDispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState,
  );

  return (
    <UploadContext.Provider value={{ state, uploadDispatch }}>
      {children}
    </UploadContext.Provider>
  );
};

export { UploadContext, UploadContextProvider, type Action, type State };
