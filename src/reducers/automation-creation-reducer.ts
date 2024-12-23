import {
  RESET_AUTOMATION_TO_ACTION,
  RESET_AUTOMATION_TO_TARGET,
  RESET_AUTOMATION_TO_TRIGGER,
  SET_AUTOMATION_ACTION_TARGET,
  SET_AUTOMATION_META,
} from "../constants";
import {
  ActionTargetType,
  AutomationActionType,
  AutomationTrigger,
  TargetType,
} from "../types/automation";

const automationCreationInitialState: AutomationCreationState = {
  automationTarget: null,
  automationTrigger: null,
  automationAction: null,
  automationActionTargetId: null,
  automationActionTargetType: null,
  metaData: null,
};

type AutomationCreationState = {
  automationTarget: TargetType | null;
  automationTrigger: AutomationTrigger | null;
  automationAction: AutomationActionType | null;
  automationActionTargetId: string | null;
  automationActionTargetType: ActionTargetType | null;
  metaData: string | null;
};

type Action =
  | { type: "SET_TARGET"; payload: TargetType }
  | { type: "SET_TRIGGER"; payload: AutomationTrigger }
  | { type: "SET_ACTION"; payload: AutomationActionType }
  | {
      type: typeof SET_AUTOMATION_ACTION_TARGET;
      payload: {
        automationActionTargetId: string;
        automationActionTargetType: ActionTargetType;
      };
    }
  | { type: typeof SET_AUTOMATION_META; payload: string }
  | { type: typeof RESET_AUTOMATION_TO_TARGET }
  | { type: typeof RESET_AUTOMATION_TO_TRIGGER }
  | { type: typeof RESET_AUTOMATION_TO_ACTION }
  | { type: "RESET" };

function automationCreationReducer(
  state: AutomationCreationState,
  action: Action,
) {
  switch (action.type) {
    case "SET_TARGET": {
      return {
        ...state,
        automationTarget: action.payload,
        automationTrigger: null,
        automationAction: null,
      };
    }
    case "SET_TRIGGER": {
      return {
        ...state,
        automationTrigger: action.payload,
        automationAction: null,
      };
    }
    case "SET_ACTION": {
      return {
        ...state,
        automationAction: action.payload,
      };
    }
    case "RESET": {
      return automationCreationInitialState;
    }
    case SET_AUTOMATION_ACTION_TARGET: {
      return {
        ...state,
        automationActionTargetId: action.payload.automationActionTargetId,
        automationActionTargetType: action.payload.automationActionTargetType,
      };
    }
    case SET_AUTOMATION_META: {
      return {
        ...state,
        metaData: action.payload,
      };
    }
    case RESET_AUTOMATION_TO_TARGET: {
      return automationCreationInitialState;
    }
    case RESET_AUTOMATION_TO_TRIGGER: {
      return {
        ...automationCreationInitialState,
        automationTarget: state.automationTarget,
      };
    }
    case RESET_AUTOMATION_TO_ACTION: {
      return {
        ...automationCreationInitialState,
        automationTarget: state.automationTarget,
        automationTrigger: state.automationTrigger,
      };
    }
    default:
      return state;
  }
}

export {
  Action,
  automationCreationInitialState,
  automationCreationReducer,
  AutomationCreationState,
};
