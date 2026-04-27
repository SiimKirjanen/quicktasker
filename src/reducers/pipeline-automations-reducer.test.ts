import {
  ADD_PIPELINE_AUTOMATION,
  REMOVE_PIPELINE_AUTOMATION,
  SET_PIPELINE_AUTOMATIONS,
  SET_PIPELINE_AUTOMATIONS_LOADING,
  UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
} from "../constants";
import { Action, State } from "../providers/PipelineAutomationsContextProvider";
import { Automation } from "../types/automation";
import { reducer } from "./pipeline-automations-reducer";

const baseState: State = { automations: null, loading: true };

const makeAutomation = (id: string, active = true): Automation =>
  ({ id, active }) as unknown as Automation;

describe("pipeline-automations reducer", () => {
  it("SET_PIPELINE_AUTOMATIONS", () => {
    const next = reducer(baseState, {
      type: SET_PIPELINE_AUTOMATIONS,
      payload: { automations: [makeAutomation("a")] },
    });
    expect(next.automations).toHaveLength(1);
  });

  it("SET_PIPELINE_AUTOMATIONS_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_PIPELINE_AUTOMATIONS_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("REMOVE_PIPELINE_AUTOMATION removes by id", () => {
    const state: State = {
      ...baseState,
      automations: [makeAutomation("a"), makeAutomation("b")],
    };
    const next = reducer(state, {
      type: REMOVE_PIPELINE_AUTOMATION,
      payload: "a",
    });
    expect(next.automations?.map((a) => a.id)).toEqual(["b"]);
  });

  it("REMOVE_PIPELINE_AUTOMATION yields null when null", () => {
    const next = reducer(baseState, {
      type: REMOVE_PIPELINE_AUTOMATION,
      payload: "a",
    });
    expect(next.automations).toBeNull();
  });

  it("UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS toggles only matching", () => {
    const state: State = {
      ...baseState,
      automations: [makeAutomation("a", true), makeAutomation("b", true)],
    };
    const next = reducer(state, {
      type: UPDATE_PIPELINE_AUTOMATION_ACTIVE_STATUS,
      payload: { id: "a", active: false },
    });
    expect(next.automations?.find((a) => a.id === "a")?.active).toBe(false);
    expect(next.automations?.find((a) => a.id === "b")?.active).toBe(true);
  });

  it("ADD_PIPELINE_AUTOMATION appends", () => {
    const state: State = {
      ...baseState,
      automations: [makeAutomation("a")],
    };
    const next = reducer(state, {
      type: ADD_PIPELINE_AUTOMATION,
      payload: makeAutomation("b"),
    });
    expect(next.automations?.map((a) => a.id)).toEqual(["a", "b"]);
  });

  it("ADD_PIPELINE_AUTOMATION initializes when null", () => {
    const next = reducer(baseState, {
      type: ADD_PIPELINE_AUTOMATION,
      payload: makeAutomation("a"),
    });
    expect(next.automations).toEqual([makeAutomation("a")]);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
