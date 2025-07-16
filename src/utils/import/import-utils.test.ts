import { PipelineImportSource } from "../../types/imports";
import { getImportSourceConfig } from "./import-utils";

describe("getImportSourceConfig", () => {
  const baseConfig = {
    supportsArchiveTaskToggle: false,
    supportTaskCustomFieldsToggle: false,
    supportTaskCommentsToggle: false,
    allowSourceSelection: false,
  };

  test("returns PIPEDRIVE configuration", () => {
    const result = getImportSourceConfig(PipelineImportSource.PIPEDRIVE);

    expect(result).toEqual({
      ...baseConfig,
      supportsArchiveTaskToggle: true,
      allowSourceSelection: true,
    });
  });

  test("returns TRELLO configuration", () => {
    const result = getImportSourceConfig(PipelineImportSource.TRELLO);

    expect(result).toEqual({
      ...baseConfig,
      supportsArchiveTaskToggle: true,
      supportTaskCommentsToggle: true,
    });
  });

  test("returns ASANA configuration", () => {
    const result = getImportSourceConfig(PipelineImportSource.ASANA);

    expect(result).toEqual({
      ...baseConfig,
      supportsArchiveTaskToggle: true,
    });
  });

  test("returns QUICKTASKER configuration", () => {
    const result = getImportSourceConfig(PipelineImportSource.QUICKTASKER);

    expect(result).toEqual({
      ...baseConfig,
      supportsArchiveTaskToggle: true,
      supportTaskCustomFieldsToggle: true,
      supportTaskCommentsToggle: true,
    });
  });

  test("returns base configuration for unknown source", () => {
    const result = getImportSourceConfig(
      "UNKNOWN_SOURCE" as PipelineImportSource,
    );

    expect(result).toEqual(baseConfig);
  });

  test("all configurations include base config properties", () => {
    const sources = [
      PipelineImportSource.PIPEDRIVE,
      PipelineImportSource.TRELLO,
      PipelineImportSource.ASANA,
      PipelineImportSource.QUICKTASKER,
    ];

    sources.forEach((source) => {
      const result = getImportSourceConfig(source);

      expect(result).toHaveProperty("supportsArchiveTaskToggle");
      expect(result).toHaveProperty("supportTaskCustomFieldsToggle");
      expect(result).toHaveProperty("supportTaskCommentsToggle");
      expect(result).toHaveProperty("allowSourceSelection");
    });
  });
});
