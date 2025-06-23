import { createContext, useEffect, useReducer } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { getPipelineAutomationsRequest } from "../api/api";
import {
  ADD_PIPELINE_AUTOMATION,
  REMOVE_PIPELINE_AUTOMATION,
  SET_PIPELINE_AUTOMATIONS,
  SET_PIPELINE_AUTOMATIONS_LOADING,
  UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
} from "../constants";
import { reducer } from "../reducers/pipeline-automations-reducer";
import { Automation } from "../types/automation";
import { convertAutomationsFromServer } from "../utils/automations";

type State = {
  automations: Automation[] | null;
  loading: boolean;
};

const initialState: State = {
  automations: null,
  loading: true,
};

type Action =
  | {
      type: typeof SET_PIPELINE_AUTOMATIONS;
      payload: {
        automations: Automation[];
      };
    }
  | {
      type: typeof SET_PIPELINE_AUTOMATIONS_LOADING;
      payload: boolean;
    }
  | {
      type: typeof REMOVE_PIPELINE_AUTOMATION;
      payload: string;
    }
  | {
      type: typeof ADD_PIPELINE_AUTOMATION;
      payload: Automation;
    }
  | {
      type: typeof UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS;
      payload: {
        id: string;
        active: boolean;
      };
    };

type Dispatch = (action: Action) => void;

type PipelineAutomationsContextType = {
  state: State;
  pipelineAutomationsDispatch: Dispatch;
};

const PipelineAutomationsContext =
  createContext<PipelineAutomationsContextType>({
    state: initialState,
    pipelineAutomationsDispatch: () => {},
  });

const PipelineAutomationsContextProvider = ({
  children,
  pipelineId,
}: {
  children: React.ReactNode;
  pipelineId: string;
}) => {
  const [state, pipelineAutomationsDispatch] = useReducer(
    reducer,
    initialState,
  );

  const loadAutomations = async () => {
    try {
      pipelineAutomationsDispatch({
        type: SET_PIPELINE_AUTOMATIONS_LOADING,
        payload: true,
      });
      const response = await getPipelineAutomationsRequest(pipelineId);
      pipelineAutomationsDispatch({
        type: SET_PIPELINE_AUTOMATIONS,
        payload: {
          automations: convertAutomationsFromServer(response.data.automations),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to load board automations", "quicktasker"));
    } finally {
      pipelineAutomationsDispatch({
        type: SET_PIPELINE_AUTOMATIONS_LOADING,
        payload: false,
      });
    }
  };

  useEffect(() => {
    loadAutomations();
  }, []);

  return (
    <PipelineAutomationsContext.Provider
      value={{ state, pipelineAutomationsDispatch }}
    >
      {children}
    </PipelineAutomationsContext.Provider>
  );
};

export {
  PipelineAutomationsContext,
  PipelineAutomationsContextProvider,
  type Action,
  type State,
};
