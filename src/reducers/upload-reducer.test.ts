import { ADD_UPLOAD, REMOVE_UPLOAD, SET_UPLOADS } from "../constants";
import { Action, State } from "../providers/UploadContextProvider";
import { Upload } from "../types/upload";
import { reducer } from "./upload-reducer";

const makeUpload = (id: string): Upload =>
  ({ id, name: id }) as unknown as Upload;

const baseState: State = { uploads: [] };

describe("upload reducer", () => {
  it("SET_UPLOADS replaces array", () => {
    const next = reducer(baseState, {
      type: SET_UPLOADS,
      payload: [makeUpload("a")],
    });
    expect(next.uploads).toEqual([makeUpload("a")]);
  });

  it("ADD_UPLOAD appends", () => {
    const state: State = { uploads: [makeUpload("a")] };
    const next = reducer(state, {
      type: ADD_UPLOAD,
      payload: makeUpload("b"),
    });
    expect(next.uploads.map((u) => u.id)).toEqual(["a", "b"]);
  });

  it("REMOVE_UPLOAD removes by id", () => {
    const state: State = { uploads: [makeUpload("a"), makeUpload("b")] };
    const next = reducer(state, { type: REMOVE_UPLOAD, payload: "a" });
    expect(next.uploads.map((u) => u.id)).toEqual(["b"]);
  });

  it("returns state for unknown action", () => {
    const unknown = { type: "UNKNOWN" } as unknown as Action;
    expect(reducer(baseState, unknown)).toBe(baseState);
  });
});
