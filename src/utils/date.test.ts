import { getDateDifference, parseDate } from "./date";

describe("date utils", () => {
  it("parseDate returns a Date instance", () => {
    const d = parseDate("2026-01-01T00:00:00Z");
    expect(d).toBeInstanceOf(Date);
    expect(d.getUTCFullYear()).toBe(2026);
  });

  it("getDateDifference computes positive deltas", () => {
    const result = getDateDifference(
      "2026-01-01 00:00:00",
      "2026-01-02 01:00:00",
    );
    expect(result.days).toBe(1);
    expect(result.hours).toBe(25);
    expect(result.minutes).toBe(25 * 60);
    expect(result.seconds).toBe(25 * 3600);
  });

  it("getDateDifference is negative when reversed", () => {
    const result = getDateDifference(
      "2026-01-02 00:00:00",
      "2026-01-01 00:00:00",
    );
    expect(result.milliseconds).toBeLessThan(0);
  });
});
