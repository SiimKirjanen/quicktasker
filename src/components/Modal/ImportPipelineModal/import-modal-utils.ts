import { __ } from "@wordpress/i18n";
import { PipelineImportSource } from "../../../types/imports";

const getSelectionText = (selectedImportSource: PipelineImportSource) => {
  switch (selectedImportSource) {
    case PipelineImportSource.TRELLO:
      return __("Import from Trello.", "quicktasker");
    case PipelineImportSource.ASANA:
      return __("Import from Asana.", "quicktasker");
    case PipelineImportSource.PIPEDRIVE:
      return __("Import from Pipedrive.", "quicktasker");
    default:
      return __("Select import source", "quicktasker");
  }
};

const getSelectionInfoText = (selectedImportSource: PipelineImportSource) => {
  switch (selectedImportSource) {
    case PipelineImportSource.TRELLO:
      return __(
        "Export your Trello board as JSON format and use it for import.",
        "quicktasker",
      );
    case PipelineImportSource.ASANA:
      return __(
        "Export your Asana project as JSON format and use it for import",
        "quicktasker",
      );
    case PipelineImportSource.PIPEDRIVE:
      return __(
        "Export your Pipedrive deals as CSV format and use it for import. Please not that generated CSV file column headers should be in English.",
        "quicktasker",
      );
    default:
      return __("Select an import source to get started", "quicktasker");
  }
};

export { getSelectionInfoText, getSelectionText };
