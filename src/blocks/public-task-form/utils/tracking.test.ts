import {
  getInitialHashes,
  readStoredHashes,
  writeStoredHashes,
} from "./tracking";

describe("tracking utils", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  describe("readStoredHashes", () => {
    test("returns empty array when nothing stored", () => {
      expect(readStoredHashes(1)).toEqual([]);
    });

    test("returns stored array", () => {
      window.localStorage.setItem(
        "wpqt_pub_track_1",
        JSON.stringify(["a", "b"]),
      );
      expect(readStoredHashes(1)).toEqual(["a", "b"]);
    });

    test("returns empty array on invalid JSON", () => {
      window.localStorage.setItem("wpqt_pub_track_1", "{not json");
      expect(readStoredHashes(1)).toEqual([]);
    });

    test("returns empty array when stored value is not an array", () => {
      window.localStorage.setItem("wpqt_pub_track_1", JSON.stringify({ x: 1 }));
      expect(readStoredHashes(1)).toEqual([]);
    });

    test("scopes by pipelineId", () => {
      window.localStorage.setItem("wpqt_pub_track_1", JSON.stringify(["a"]));
      window.localStorage.setItem("wpqt_pub_track_2", JSON.stringify(["b"]));
      expect(readStoredHashes(1)).toEqual(["a"]);
      expect(readStoredHashes(2)).toEqual(["b"]);
    });
  });

  describe("writeStoredHashes", () => {
    test("persists hashes to localStorage", () => {
      writeStoredHashes(1, ["a", "b"]);
      expect(
        JSON.parse(window.localStorage.getItem("wpqt_pub_track_1") || ""),
      ).toEqual(["a", "b"]);
    });

    test("persists arbitrarily large lists without capping", () => {
      const many = Array.from({ length: 50 }, (_, i) => `h${i}`);
      writeStoredHashes(1, many);
      const stored = JSON.parse(
        window.localStorage.getItem("wpqt_pub_track_1") || "",
      );
      expect(stored).toEqual(many);
    });

    test("does not throw when localStorage.setItem fails", () => {
      const spy = jest
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceeded");
        });
      expect(() => writeStoredHashes(1, ["a"])).not.toThrow();
      spy.mockRestore();
    });
  });

  describe("getInitialHashes", () => {
    test("returns stored hashes", () => {
      writeStoredHashes(1, ["a", "b"]);
      expect(getInitialHashes(1)).toEqual(["a", "b"]);
    });

    test("returns empty array when nothing stored", () => {
      expect(getInitialHashes(1)).toEqual([]);
    });
  });
});
