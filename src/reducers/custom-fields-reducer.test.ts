import {
  ADD_CUSTOM_FIELD,
  DELETE_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_INITIAL_DATA,
  SET_CUSTOM_FIELD_LOADING,
  SET_CUSTOM_FIELDS,
} from "../constants";
import { Action, State } from "../providers/CustomFieldsContextProvider";
import { CustomField, CustomFieldEntityType } from "../types/custom-field";
import { reducer } from "./custom-fields-reducer";

const baseState: State = {
  customFields: [],
  loading: true,
  entityId: "",
  entityType: null,
};

const makeField = (id: string): CustomField =>
  ({ id, name: id }) as unknown as CustomField;

describe("custom-fields reducer", () => {
  it("SET_CUSTOM_FIELD_LOADING", () => {
    const next = reducer(baseState, {
      type: SET_CUSTOM_FIELD_LOADING,
      payload: false,
    });
    expect(next.loading).toBe(false);
  });

  it("SET_CUSTOM_FIELD_INITIAL_DATA stores entity info", () => {
    const next = reducer(baseState, {
      type: SET_CUSTOM_FIELD_INITIAL_DATA,
      payload: { entityId: "e-1", entityType: CustomFieldEntityType.Task },
    });
    expect(next.entityId).toBe("e-1");
    expect(next.entityType).toBe(CustomFieldEntityType.Task);
  });

  it("SET_CUSTOM_FIELDS replaces array", () => {
    const next = reducer(baseState, {
      type: SET_CUSTOM_FIELDS,
      payload: [makeField("a")],
    });
    expect(next.customFields).toHaveLength(1);
  });

  it("ADD_CUSTOM_FIELD appends", () => {
    const state: State = { ...baseState, customFields: [makeField("a")] };
    const next = reducer(state, {
      type: ADD_CUSTOM_FIELD,
      payload: makeField("b"),
    });
    expect(next.customFields.map((f) => f.id)).toEqual(["a", "b"]);
  });

  it("DELETE_CUSTOM_FIELD removes by id", () => {
    const state: State = {
      ...baseState,
      customFields: [makeField("a"), makeField("b")],
    };
    const next = reducer(state, { type: DELETE_CUSTOM_FIELD, payload: "a" });
    expect(next.customFields.map((f) => f.id)).toEqual(["b"]);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
