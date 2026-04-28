import { parseCSV } from "./csv-parse";

describe("parseCSV", () => {
  it("returns empty array for empty/non-string input", () => {
    expect(parseCSV("")).toEqual([]);
    expect(parseCSV(null as unknown as string)).toEqual([]);
  });

  it("normalizes headers (lowercase, spaces → underscores, strip non-alnum)", () => {
    const result = parseCSV("First Name,Last-Name!\nAlice,Smith");
    expect(result).toEqual([{ first_name: "Alice", lastname: "Smith" }]);
  });

  it("parses multiple rows", () => {
    const result = parseCSV("a,b\n1,2\n3,4");
    expect(result).toEqual([
      { a: "1", b: "2" },
      { a: "3", b: "4" },
    ]);
  });

  it("handles quoted values containing commas", () => {
    const result = parseCSV('a,b\n"hello, world",x');
    expect(result[0].a).toBe("hello, world");
    expect(result[0].b).toBe("x");
  });

  it("handles escaped quotes inside quoted values", () => {
    const result = parseCSV('a\n"she said ""hi"""');
    expect(result[0].a).toBe('she said "hi"');
  });

  it("fills missing trailing values with empty string", () => {
    const result = parseCSV("a,b,c\n1,2");
    expect(result[0]).toEqual({ a: "1", b: "2", c: "" });
  });

  it("filters out empty lines", () => {
    const result = parseCSV("a,b\n\n1,2\n");
    expect(result).toHaveLength(1);
  });
});
