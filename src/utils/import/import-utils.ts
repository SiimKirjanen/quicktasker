import { importSourceConfig, PipelineImportSource } from "../../types/imports";

function getImportSourceConfig(
  selectedImportSource: PipelineImportSource,
): importSourceConfig {
  const baseConfig = {
    supportsArchiveTaskToggle: false,
    supportTaskCustomFieldsToggle: false,
    supportTaskCommentsToggle: false,
    allowSourceSelection: false,
  };

  switch (selectedImportSource) {
    case PipelineImportSource.PIPEDRIVE:
      return {
        ...baseConfig,
        supportsArchiveTaskToggle: true,
        allowSourceSelection: true,
      };

    case PipelineImportSource.TRELLO:
      return {
        ...baseConfig,
        supportsArchiveTaskToggle: true,
        supportTaskCommentsToggle: true,
      };

    case PipelineImportSource.ASANA:
      return {
        ...baseConfig,
        supportsArchiveTaskToggle: true,
      };

    case PipelineImportSource.QUICKTASKER:
      return {
        ...baseConfig,
        supportsArchiveTaskToggle: true,
        supportTaskCustomFieldsToggle: true,
        supportTaskCommentsToggle: true,
      };

    default:
      return baseConfig;
  }
}

export { getImportSourceConfig };
