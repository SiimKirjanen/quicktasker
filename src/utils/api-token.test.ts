import { ApiTokenFromServer } from "../types/api-token";
import {
  converApiTokenFromServer,
  convertApiTokensFromServer,
} from "./api-token";

const makeServerToken = (
  overrides: Partial<ApiTokenFromServer> = {},
): ApiTokenFromServer =>
  ({
    id: "1",
    get_pipeline: "1",
    patch_pipeline: "0",
    get_pipeline_stages: "1",
    post_pipeline_stages: "0",
    patch_pipeline_stages: "1",
    delete_pipeline_stages: "0",
    get_pipeline_tasks: "1",
    post_pipeline_tasks: "0",
    patch_pipeline_tasks: "1",
    delete_pipeline_tasks: "0",
    ...overrides,
  }) as unknown as ApiTokenFromServer;

describe("api-token utils", () => {
  it("converApiTokenFromServer converts string flags to booleans", () => {
    const token = converApiTokenFromServer(makeServerToken());
    expect(token.get_pipeline).toBe(true);
    expect(token.patch_pipeline).toBe(false);
    expect(token.delete_pipeline_tasks).toBe(false);
    expect(token.patch_pipeline_tasks).toBe(true);
  });

  it("convertApiTokensFromServer converts a list", () => {
    const tokens = convertApiTokensFromServer([
      makeServerToken({ id: "a" }),
      makeServerToken({ id: "b", patch_pipeline: "1" }),
    ]);
    expect(tokens.map((t) => t.id)).toEqual(["a", "b"]);
    expect(tokens[1].patch_pipeline).toBe(true);
  });
});
