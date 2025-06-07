/**
 * WPQT Import Types
 * These types define the structure for importing pipelines, stages, tasks, and labels.
 */
type WPQTImport = {
  pipelineName: string;
  pipelineDescription: string;
  stages: WPQTStageImport[];
  tasks: WPQTTaskImport[];
  labels: WPQTLabelImport[];
};

type WPQTStageImport = {
  stageName: string;
  stageDescription: string;
  stageId: string;
};

type WPQTTaskImport = {
  taskName: string;
  taskDescription: string;
  stageId: string;
  assignedLabels: WPQTLabelImport[];
  archived: boolean;
};

type WPQTLabelImport = {
  labelName: string;
  labelId: string;
  color: string;
};

/**
 * Trello Import Types
 * These types define the structure for importing data from Trello.
 */

type TrelloImport = {
  name: string;
  desc: string;
  lists: TrelloImportList[];
  labels: TrelloImportLabels[];
  cards: TrelloImportCard[];
};

type TrelloImportList = {
  id: string;
  idBoard: string;
  name: string;
  closed: boolean;
};

type TrelloImportLabels = {
  id: string;
  idBoard: string;
  name: string;
  color: string;
};

type TrelloImportCard = {
  id: string;
  name: string;
  idBoard: string;
  idList: string;
  closed: boolean;
  labels: TrelloImportLabels[];
};

type WPQTImportFilter = {
  includeArchivedTasks: boolean;
};

enum PipelineImportSource {
  TRELLO = "TRELLO-IMPORT",
}

export {
  PipelineImportSource,
  TrelloImport,
  WPQTImport,
  WPQTImportFilter,
  WPQTStageImport,
  WPQTTaskImport,
};
