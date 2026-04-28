import { AutomationFromServer } from "../types/automation";
import { convertAutomationsFromServer } from "./automations";

const makeServerAutomation = (
  overrides: Partial<AutomationFromServer> = {},
): AutomationFromServer =>
  ({
    id: "1",
    active: "1",
    verify_success: "0",
    ...overrides,
  }) as unknown as AutomationFromServer;

describe("convertAutomationsFromServer", () => {
  it("converts active and verify_success flags", () => {
    const result = convertAutomationsFromServer([
      makeServerAutomation({ id: "a", active: "1", verify_success: "1" }),
      makeServerAutomation({ id: "b", active: "0", verify_success: "0" }),
    ]);
    expect(result[0].active).toBe(true);
    expect(result[0].verify_success).toBe(true);
    expect(result[1].active).toBe(false);
    expect(result[1].verify_success).toBe(false);
  });

  it("returns empty list for empty input", () => {
    expect(convertAutomationsFromServer([])).toEqual([]);
  });
});
