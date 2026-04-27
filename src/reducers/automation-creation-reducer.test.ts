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
import {
  Action,
  automationCreationInitialState,
  AutomationCreationState,
  automationCreationReducer as reducer,
} from "./automation-creation-reducer";

const sampleAction: AutomationActionType = {
  id: "any-action",
} as unknown as AutomationActionType;

describe("automation-creation reducer", () => {
  it("SET_TARGET resets trigger and action", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTrigger: AutomationTrigger.TASK_DONE,
      automationAction: sampleAction,
    };
    const next = reducer(dirty, {
      type: "SET_TARGET",
      payload: TargetType.PIPELINE,
    });
    expect(next.automationTarget).toBe(TargetType.PIPELINE);
    expect(next.automationTrigger).toBeNull();
    expect(next.automationAction).toBeNull();
  });

  it("SET_TRIGGER clears action only", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTarget: TargetType.PIPELINE,
      automationAction: sampleAction,
    };
    const next = reducer(dirty, {
      type: "SET_TRIGGER",
      payload: AutomationTrigger.TASK_DONE,
    });
    expect(next.automationTrigger).toBe(AutomationTrigger.TASK_DONE);
    expect(next.automationTarget).toBe(TargetType.PIPELINE);
    expect(next.automationAction).toBeNull();
  });

  it("SET_ACTION sets action", () => {
    const next = reducer(automationCreationInitialState, {
      type: "SET_ACTION",
      payload: sampleAction,
    });
    expect(next.automationAction).toBe(sampleAction);
  });

  it("RESET returns initial state", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTarget: TargetType.PIPELINE,
    };
    expect(reducer(dirty, { type: "RESET" })).toBe(
      automationCreationInitialState,
    );
  });

  it("SET_AUTOMATION_ACTION_TARGET", () => {
    const next = reducer(automationCreationInitialState, {
      type: SET_AUTOMATION_ACTION_TARGET,
      payload: {
        automationActionTargetId: "id-1",
        automationActionTargetType: ActionTargetType.STAGE,
      },
    });
    expect(next.automationActionTargetId).toBe("id-1");
    expect(next.automationActionTargetType).toBe(ActionTargetType.STAGE);
  });

  it("SET_AUTOMATION_META", () => {
    const next = reducer(automationCreationInitialState, {
      type: SET_AUTOMATION_META,
      payload: "meta",
    });
    expect(next.metaData).toBe("meta");
  });

  it("RESET_AUTOMATION_TO_TARGET clears all", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTarget: TargetType.PIPELINE,
    };
    expect(reducer(dirty, { type: RESET_AUTOMATION_TO_TARGET })).toBe(
      automationCreationInitialState,
    );
  });

  it("RESET_AUTOMATION_TO_TRIGGER preserves target", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTarget: TargetType.PIPELINE,
      automationTrigger: AutomationTrigger.TASK_DONE,
      automationAction: sampleAction,
    };
    const next = reducer(dirty, { type: RESET_AUTOMATION_TO_TRIGGER });
    expect(next.automationTarget).toBe(TargetType.PIPELINE);
    expect(next.automationTrigger).toBeNull();
    expect(next.automationAction).toBeNull();
  });

  it("RESET_AUTOMATION_TO_ACTION preserves target and trigger", () => {
    const dirty: AutomationCreationState = {
      ...automationCreationInitialState,
      automationTarget: TargetType.PIPELINE,
      automationTrigger: AutomationTrigger.TASK_DONE,
      automationAction: sampleAction,
    };
    const next = reducer(dirty, { type: RESET_AUTOMATION_TO_ACTION });
    expect(next.automationTarget).toBe(TargetType.PIPELINE);
    expect(next.automationTrigger).toBe(AutomationTrigger.TASK_DONE);
    expect(next.automationAction).toBeNull();
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(automationCreationInitialState, unknown)).toBe(
      automationCreationInitialState,
    );
  });
});
