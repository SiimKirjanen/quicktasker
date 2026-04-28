import { StageFromServer } from "../types/stage";
import { TaskFromServer } from "../types/task";
import { convertStageFromServer } from "./stage";

const makeServerTask = (id: string): TaskFromServer =>
  ({
    id,
    task_order: "1",
    free_for_all: "0",
    is_archived: "0",
    is_done: "0",
    assigned_users: [],
  }) as unknown as TaskFromServer;

const makeServerStage = (
  overrides: Partial<StageFromServer> = {},
): StageFromServer =>
  ({
    id: "s1",
    stage_order: "3",
    tasks: [],
    ...overrides,
  }) as unknown as StageFromServer;

describe("convertStageFromServer", () => {
  it("converts stage_order to number", () => {
    const result = convertStageFromServer(makeServerStage());
    expect(result.stage_order).toBe(3);
  });

  it("converts nested tasks", () => {
    const result = convertStageFromServer(
      makeServerStage({ tasks: [makeServerTask("a")] }),
    );
    expect(result.tasks?.[0].id).toBe("a");
    expect(result.tasks?.[0].task_order).toBe(1);
  });

  it("handles missing tasks", () => {
    const result = convertStageFromServer(
      makeServerStage({ tasks: undefined as never }),
    );
    expect(result.tasks).toEqual([]);
  });
});
