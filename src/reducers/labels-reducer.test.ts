import {
  ADD_LABEL,
  EDIT_LABEL,
  REMOVE_LABEL,
  RESET_LABEL_CONTEXT,
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
  SET_LABEL_ACTION_STATE_SELECTION,
  SET_LABELS,
} from "../constants";
import {
  Action,
  initialLabelContextState,
  State,
} from "../providers/LabelsContextProvider";
import { Label, LabelActionState } from "../types/label";
import { reducer } from "./labels-reducer";

const makeLabel = (id: string, name = id): Label =>
  ({ id, name, color: "#fff" }) as unknown as Label;

describe("labels reducer", () => {
  it("SET_LABELS replaces labels", () => {
    const next = reducer(initialLabelContextState, {
      type: SET_LABELS,
      payload: [makeLabel("a"), makeLabel("b")],
    });
    expect(next.labels?.map((l) => l.id)).toEqual(["a", "b"]);
  });

  it("ADD_LABEL appends and switches to SELECTION state", () => {
    const state: State = {
      ...initialLabelContextState,
      labels: [makeLabel("a")],
      labelActionState: LabelActionState.CREATION,
    };
    const next = reducer(state, { type: ADD_LABEL, payload: makeLabel("b") });
    expect(next.labels?.map((l) => l.id)).toEqual(["a", "b"]);
    expect(next.labelActionState).toBe(LabelActionState.SELECTION);
  });

  it("ADD_LABEL initializes labels when null", () => {
    const next = reducer(initialLabelContextState, {
      type: ADD_LABEL,
      payload: makeLabel("a"),
    });
    expect(next.labels).toEqual([makeLabel("a")]);
  });

  it("EDIT_LABEL replaces matching label", () => {
    const state: State = {
      ...initialLabelContextState,
      labels: [makeLabel("a", "Old"), makeLabel("b")],
    };
    const next = reducer(state, {
      type: EDIT_LABEL,
      payload: makeLabel("a", "New"),
    });
    expect(next.labels?.find((l) => l.id === "a")?.name).toBe("New");
  });

  it("REMOVE_LABEL removes matching label", () => {
    const state: State = {
      ...initialLabelContextState,
      labels: [makeLabel("a"), makeLabel("b")],
    };
    const next = reducer(state, {
      type: REMOVE_LABEL,
      payload: makeLabel("a"),
    });
    expect(next.labels?.map((l) => l.id)).toEqual(["b"]);
  });

  it("SET_LABEL_ACTION_STATE_SELECTION clears labelToEdit", () => {
    const state: State = {
      ...initialLabelContextState,
      labelActionState: LabelActionState.EDIT,
      labelToEdit: makeLabel("a"),
    };
    const next = reducer(state, { type: SET_LABEL_ACTION_STATE_SELECTION });
    expect(next.labelActionState).toBe(LabelActionState.SELECTION);
    expect(next.labelToEdit).toBeNull();
  });

  it("SET_LABEL_ACTION_STATE_EDITING sets label and EDIT state", () => {
    const next = reducer(initialLabelContextState, {
      type: SET_LABEL_ACTION_STATE_EDITING,
      payload: makeLabel("a"),
    });
    expect(next.labelActionState).toBe(LabelActionState.EDIT);
    expect(next.labelToEdit?.id).toBe("a");
  });

  it("SET_LABEL_ACTION_STATE_CREATION", () => {
    const next = reducer(initialLabelContextState, {
      type: SET_LABEL_ACTION_STATE_CREATION,
    });
    expect(next.labelActionState).toBe(LabelActionState.CREATION);
    expect(next.labelToEdit).toBeNull();
  });

  it("RESET_LABEL_CONTEXT returns initial state", () => {
    const state: State = {
      ...initialLabelContextState,
      labels: [makeLabel("a")],
      labelActionState: LabelActionState.EDIT,
    };
    const next = reducer(state, { type: RESET_LABEL_CONTEXT });
    expect(next).toBe(initialLabelContextState);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(initialLabelContextState, unknown)).toBe(
      initialLabelContextState,
    );
  });
});
