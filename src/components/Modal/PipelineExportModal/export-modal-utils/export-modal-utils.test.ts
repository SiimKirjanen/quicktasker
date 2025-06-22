import { __ } from "@wordpress/i18n";
import { TaskExportMethods } from "../../../../types/task";
import { getModalCtaBtnText } from "./export-modal-utils";

// Mock WordPress i18n function
jest.mock("@wordpress/i18n", () => ({
  __: jest.fn((str) => str),
}));

describe("export-modal-utils", () => {
  describe("getModalCtaBtnText", () => {
    beforeEach(() => {
      // Clear mock calls before each test
      jest.clearAllMocks();
    });

    it("should return 'Export as PDF' text when PDF method is selected", () => {
      const result = getModalCtaBtnText(TaskExportMethods.PDF);

      expect(result).toBe("Export as PDF");
      expect(__).toHaveBeenCalledWith("Export as PDF", "quicktasker");
    });

    it("should return 'Export as JSON' text when JSON method is selected", () => {
      const result = getModalCtaBtnText(TaskExportMethods.JSON);

      expect(result).toBe("Export as JSON");
      expect(__).toHaveBeenCalledWith("Export as JSON", "quicktasker");
    });

    it("should handle all enum values correctly", () => {
      // This ensures we have test coverage for all enum values
      // and will fail if new methods are added without updating tests
      const allMethods = Object.values(TaskExportMethods);

      allMethods.forEach((method) => {
        getModalCtaBtnText(method);
      });

      // Verify we called the translation function once per method plus once for setup
      expect(__).toHaveBeenCalledTimes(Object.keys(TaskExportMethods).length);
    });
  });
});
