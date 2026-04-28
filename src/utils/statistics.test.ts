import { hasEnoughDataCheck } from "./statistics";

describe("hasEnoughDataCheck", () => {
  it("returns false when only header row", () => {
    expect(hasEnoughDataCheck([["Stage", "Count"]])).toBe(false);
  });

  it("returns false when all stages have 0 tasks", () => {
    expect(
      hasEnoughDataCheck([
        ["Stage", "Count"],
        ["A", 0],
        ["B", 0],
      ]),
    ).toBe(false);
  });

  it("returns true when at least one stage has tasks", () => {
    expect(
      hasEnoughDataCheck([
        ["Stage", "Count"],
        ["A", 0],
        ["B", 2],
      ]),
    ).toBe(true);
  });
});
