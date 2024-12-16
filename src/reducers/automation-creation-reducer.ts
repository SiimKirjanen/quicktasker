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
};

type AutomationCreationState = {
  automationTarget: TargetType | null;
  automationTrigger: AutomationTrigger | null;
  automationAction: AutomationActionType | null;
  automationActionTargetId: string | null;
  automationActionTargetType: ActionTargetType | null;
};

type Action =
  | { type: "SET_TARGET"; payload: TargetType }
  | { type: "SET_TRIGGER"; payload: AutomationTrigger }
  | { type: "SET_ACTION"; payload: AutomationActionType }
  | {
      type: "SET_ACTION_TARGET";
      payload: {
        automationActionTargetId: string;
        automationActionTargetType: ActionTargetType;
      };
    }
  | { type: "RESET" };

function automationCreationReducer(
  state: AutomationCreationState,
  action: Action,
) {
  switch (action.type) {
    case "SET_TARGET":
      return {
        ...state,
        automationTarget: action.payload,
        automationTrigger: null,
        automationAction: null,
      };
    case "SET_TRIGGER":
      return {
        ...state,
        automationTrigger: action.payload,
        automationAction: null,
      };
    case "SET_ACTION":
      return {
        ...state,
        automationAction: action.payload,
      };
    case "RESET":
      return automationCreationInitialState;
    case "SET_ACTION_TARGET":
      return {
        ...state,
        automationActionTargetId: action.payload.automationActionTargetId,
        automationActionTargetType: action.payload.automationActionTargetType,
      };
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
