import {
  SET_STAGE_FILTER,
  SET_TASK_VIEW_SEARCH_TEXT,
  SET_USER_FILTER,
} from "../constants";
import {
  Action,
  State,
} from "../providers/ActivePipelineTaskViewContextProvider";
import { UserTypes } from "../types/user";
import { activePipelineTaskViewReducer as reducer } from "./active-pipeline-task-view-reducer";

const baseState: State = {
  stageIdFilter: "",
  userFilter: { id: null, type: null },
  searchText: "",
};

describe("active-pipeline-task-view reducer", () => {
  it("SET_USER_FILTER sets user filter", () => {
    const next = reducer(baseState, {
      type: SET_USER_FILTER,
      payload: { id: "u1", type: UserTypes.QUICKTASKER },
    });
    expect(next.userFilter).toEqual({ id: "u1", type: UserTypes.QUICKTASKER });
  });

  it("SET_STAGE_FILTER", () => {
    const next = reducer(baseState, {
      type: SET_STAGE_FILTER,
      payload: "stage-1",
    });
    expect(next.stageIdFilter).toBe("stage-1");
  });

  it("SET_TASK_VIEW_SEARCH_TEXT", () => {
    const next = reducer(baseState, {
      type: SET_TASK_VIEW_SEARCH_TEXT,
      payload: "foo",
    });
    expect(next.searchText).toBe("foo");
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
