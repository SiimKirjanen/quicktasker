import {
  RESET_MISSING_CONTENT,
  SET_PIPELINE_MISSING,
  SET_STAGE_MISSING,
  SET_TASK_MISSING,
} from "../constants";
import { initialState } from "../providers/MissingContentProvider";
import { reducer } from "./missing-content-reducer";

describe("missing-content reducer", () => {
  it("SET_PIPELINE_MISSING", () => {
    const next = reducer(initialState, {
      type: SET_PIPELINE_MISSING,
      payload: true,
    });
    expect(next.pipelineMissing).toBe(true);
  });

  it("SET_STAGE_MISSING", () => {
    const next = reducer(initialState, {
      type: SET_STAGE_MISSING,
      payload: true,
    });
    expect(next.stageMissing).toBe(true);
  });

  it("SET_TASK_MISSING", () => {
    const next = reducer(initialState, {
      type: SET_TASK_MISSING,
      payload: true,
    });
    expect(next.taskMissing).toBe(true);
  });

  it("RESET_MISSING_CONTENT returns initial state", () => {
    const dirty = {
      pipelineMissing: true,
      stageMissing: true,
      taskMissing: true,
    };
    const next = reducer(dirty, { type: RESET_MISSING_CONTENT });
    expect(next).toEqual(initialState);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as never;
    expect(reducer(initialState, unknown)).toBe(initialState);
  });
});
