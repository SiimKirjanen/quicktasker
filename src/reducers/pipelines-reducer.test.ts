import {
  PIPELINE_ADD_PIPELINE,
  PIPELINE_EDIT_PIPELINE,
  PIPELINE_REMOVE_PIPELINE,
  PIPELINE_SET_PRIMARY,
  PIPELINES_SET,
} from "../constants";
import { Action, State } from "../providers/PipelinesContextProvider";
import { Pipeline, PipelineFromServer } from "../types/pipeline";
import { reducer } from "./pipelines-reducer";

const makeServerPipeline = (
  overrides: Partial<PipelineFromServer> = {},
): PipelineFromServer =>
  ({
    id: "p1",
    name: "P1",
    description: "",
    is_primary: "0",
    stages: [],
    ...overrides,
  }) as unknown as PipelineFromServer;

const makePipeline = (overrides: Partial<Pipeline> = {}): Pipeline =>
  ({
    id: "p1",
    name: "P1",
    description: "",
    is_primary: false,
    stages: [],
    ...overrides,
  }) as unknown as Pipeline;

const baseState: State = { pipelines: [] };

describe("pipelines reducer", () => {
  it("PIPELINES_SET converts is_primary string to boolean", () => {
    const next = reducer(baseState, {
      type: PIPELINES_SET,
      payload: [
        makeServerPipeline({ id: "a", is_primary: "1" }),
        makeServerPipeline({ id: "b", is_primary: "0" }),
      ],
    });
    expect(next.pipelines[0].is_primary).toBe(true);
    expect(next.pipelines[1].is_primary).toBe(false);
  });

  it("PIPELINE_ADD_PIPELINE appends with is_primary=false", () => {
    const state: State = { pipelines: [makePipeline({ id: "a" })] };
    const next = reducer(state, {
      type: PIPELINE_ADD_PIPELINE,
      payload: makeServerPipeline({ id: "b", is_primary: "1" }),
    });
    expect(next.pipelines.map((p) => p.id)).toEqual(["a", "b"]);
    expect(next.pipelines[1].is_primary).toBe(false);
  });

  it("PIPELINE_SET_PRIMARY marks only matching pipeline primary", () => {
    const state: State = {
      pipelines: [
        makePipeline({ id: "a", is_primary: true }),
        makePipeline({ id: "b" }),
      ],
    };
    const next = reducer(state, {
      type: PIPELINE_SET_PRIMARY,
      payload: "b",
    });
    expect(next.pipelines.find((p) => p.id === "a")?.is_primary).toBe(false);
    expect(next.pipelines.find((p) => p.id === "b")?.is_primary).toBe(true);
  });

  it("PIPELINE_EDIT_PIPELINE updates name/description only", () => {
    const state: State = {
      pipelines: [makePipeline({ id: "a", name: "Old", description: "x" })],
    };
    const next = reducer(state, {
      type: PIPELINE_EDIT_PIPELINE,
      payload: makeServerPipeline({ id: "a", name: "New", description: "y" }),
    });
    expect(next.pipelines[0].name).toBe("New");
    expect(next.pipelines[0].description).toBe("y");
  });

  it("PIPELINE_REMOVE_PIPELINE filters by id", () => {
    const state: State = {
      pipelines: [makePipeline({ id: "a" }), makePipeline({ id: "b" })],
    };
    const next = reducer(state, {
      type: PIPELINE_REMOVE_PIPELINE,
      payload: "a",
    });
    expect(next.pipelines.map((p) => p.id)).toEqual(["b"]);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
