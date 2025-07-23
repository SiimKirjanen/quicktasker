import { generateUUID } from "./uuid";

describe("generateUUID", () => {
  test("returns a string", () => {
    const result = generateUUID();
    expect(typeof result).toBe("string");
  });

  test("generates valid UUID v4 format", () => {
    const result = generateUUID();

    // Check UUID v4 format: 8-4-4-4-12 hexadecimal digits
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(result).toMatch(uuidRegex);
  });

  test("generates unique UUIDs", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    expect(uuid1).not.toBe(uuid2);
  });

  test("generates multiple unique UUIDs", () => {
    const uuids = new Set();

    for (let i = 0; i < 50; i++) {
      uuids.add(generateUUID());
    }

    // All UUIDs should be unique
    expect(uuids.size).toBe(50);
  });

  test("UUID has correct length", () => {
    const result = generateUUID();
    expect(result).toHaveLength(36); // 32 chars + 4 hyphens
  });

  test("UUID has correct structure", () => {
    const result = generateUUID();
    const parts = result.split("-");

    expect(parts).toHaveLength(5);
    expect(parts[0]).toHaveLength(8);
    expect(parts[1]).toHaveLength(4);
    expect(parts[2]).toHaveLength(4);
    expect(parts[3]).toHaveLength(4);
    expect(parts[4]).toHaveLength(12);
  });
});
