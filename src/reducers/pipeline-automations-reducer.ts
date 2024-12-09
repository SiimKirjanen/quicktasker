import {
  ADD_PIPELINE_AUTOMATION,
  REMOVE_PIPELINE_AUTOMATION,
  SET_PIPELINE_AUTOMATIONS,
  SET_PIPELINE_AUTOMATIONS_LOADING,
} from "../constants";
import { Action, State } from "../providers/PipelineAutomationsContextProvider";
import { Automation } from "../types/automation";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PIPELINE_AUTOMATIONS: {
      const automations: Automation[] = action.payload.automations;

      return {
        ...state,
        automations,
      };
    }
    case SET_PIPELINE_AUTOMATIONS_LOADING: {
      const loading: boolean = action.payload;

      return {
        ...state,
        loading,
      };
    }
    case REMOVE_PIPELINE_AUTOMATION: {
      const automationId: string = action.payload;
      const automations =
        state.automations?.filter(
          (automation) => automation.id !== automationId,
        ) ?? null;

      return {
        ...state,
        automations,
      };
    }
    case ADD_PIPELINE_AUTOMATION: {
      const automation: Automation = action.payload;
      const automations = state.automations
        ? [...state.automations, automation]
        : [automation];

      return {
        ...state,
        automations,
      };
    }
    default:
      return state;
  }
};

export { reducer };
