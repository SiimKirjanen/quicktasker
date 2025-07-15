import { PipelineImportSource } from "../../../types/imports";
import { getSelectionInfoText, getSelectionText } from "./import-modal-utils";

// Mock WordPress i18n
jest.mock("@wordpress/i18n", () => ({
  __: (text: string) => text,
}));

describe("Import Modal Utils", () => {
  describe("getSelectionText", () => {
    test("returns correct text for Trello source", () => {
      const result = getSelectionText(PipelineImportSource.TRELLO);
      expect(result).toBe("Import from Trello.");
    });

    test("returns correct text for Asana source", () => {
      const result = getSelectionText(PipelineImportSource.ASANA);
      expect(result).toBe("Import from Asana.");
    });

    test("returns correct text for Pipedrive source", () => {
      const result = getSelectionText(PipelineImportSource.PIPEDRIVE);
      expect(result).toBe("Import from Pipedrive.");
    });

    test("returns correct text for QuickTasker source", () => {
      const result = getSelectionText(PipelineImportSource.QUICKTASKER);
      expect(result).toBe("Import from QuickTasker.");
    });

    test("returns default text for unknown source", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionText("UNKNOWN_SOURCE");
      expect(result).toBe("Select import source");
    });
  });

  describe("getSelectionInfoText", () => {
    test("returns correct info text for Trello source", () => {
      const result = getSelectionInfoText(PipelineImportSource.TRELLO);
      expect(result).toBe(
        "Export your Trello board as JSON format and use it for import.",
      );
    });

    test("returns correct info text for Asana source", () => {
      const result = getSelectionInfoText(PipelineImportSource.ASANA);
      expect(result).toBe(
        "Export your Asana project as JSON format and use it for import",
      );
    });

    test("returns correct info text for Pipedrive source", () => {
      const result = getSelectionInfoText(PipelineImportSource.PIPEDRIVE);
      expect(result).toBe(
        "Export your Pipedrive deals as CSV format and use it for import. Please not that generated CSV file column headers should be in English.",
      );
    });

    test("returns correct info text for QuickTasker source", () => {
      const result = getSelectionInfoText(PipelineImportSource.QUICKTASKER);
      expect(result).toBe("Import your QuickTasker board from JSON format.");
    });

    test("returns default info text for unknown source", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionInfoText("UNKNOWN_SOURCE");
      expect(result).toBe("Select an import source to get started");
    });
  });

  describe("edge cases", () => {
    test("handles undefined input for getSelectionText", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionText(undefined);
      expect(result).toBe("Select import source");
    });

    test("handles null input for getSelectionText", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionText(null);
      expect(result).toBe("Select import source");
    });

    test("handles undefined input for getSelectionInfoText", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionInfoText(undefined);
      expect(result).toBe("Select an import source to get started");
    });

    test("handles null input for getSelectionInfoText", () => {
      // @ts-expect-error - Testing an invalid case
      const result = getSelectionInfoText(null);
      expect(result).toBe("Select an import source to get started");
    });
  });
});
