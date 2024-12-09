import {
  AutomationAction,
  AutomationTrigger,
  TargetType,
} from "../types/automation";

const automationCreationInitialState: AutomationCreationState = {
  automationTarget: null,
  automationTrigger: null,
  automationAction: null,
};

type AutomationCreationState = {
  automationTarget: TargetType | null;
  automationTrigger: AutomationTrigger | null;
  automationAction: AutomationAction | null;
};

type Action =
  | { type: "SET_TARGET"; payload: TargetType }
  | { type: "SET_TRIGGER"; payload: AutomationTrigger }
  | { type: "SET_ACTION"; payload: AutomationAction }
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
