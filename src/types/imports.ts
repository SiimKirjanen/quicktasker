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
  sourcePipelines: WPQTSourcePipeline[];
  taskComments: WPQTTaskComment[];
};

type WPQTStageImport = {
  stageName: string;
  stageDescription: string;
  stageId: string;
  sourcePipeline: WPQTSourcePipeline;
};

type WPQTTaskImport = {
  taskId: string;
  taskName: string;
  taskDescription: string;
  stageId: string;
  assignedLabels: WPQTLabelImport[];
  archived: boolean;
  dueDate: string | null;
  taskCompletedAt: string | null;
  taskFocusColor: string | null;
  sourcePipeline: WPQTSourcePipeline | null;
};

type WPQTLabelImport = {
  labelName: string;
  labelId: string;
  color: string;
};

type WPQTSourcePipeline = {
  name: string;
  id: string;
};

type WPQTTaskComment = {
  commentId: string;
  taskId: string;
  createdAt: string;
  commentText: string;
  authorId: string;
  isAuthorAdmin: boolean;
  isPrivate: boolean;
};

/**
 * Trello Import Types
 * These types define the structure for importing data from Trello.
 */

type TrelloImport = {
  id: string;
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
  due: string | null;
  dateCompleted: string | null;
  cover: {
    color: string | null;
  };
};

/**
 * Asana Import Types
 * These types define the structure for importing data from Asana.
 */

type AsanaImport = {
  data: AsanaTaskImport[];
};

type AsanaTaskImport = {
  gid: string;
  tags: AsanaImportLabel[];
  completed: boolean;
  completed_at: string | null;
  due_on: string | null;
  due_at: string | null;
  name: string;
  projects: AsanaImportProject[];
  memberships: AsanaImportMembership[];
};

type AsanaImportProject = {
  gid: string;
  name: string;
};

type AsanaImportLabel = {
  gid: string;
  name: string;
};

type AsanaImportMembership = {
  project: AsanaImportProject;
  section: AsanaImportSection;
};

type AsanaImportSection = {
  gid: string;
  name: string;
};

/**
 * Pipedrive Import Types
 * These types define the structure for importing data from Pipedrive.
 */

type PipedriveDealImport = {
  id: string;
  title: string;
  value: string;
  status: string;
  stage: string;
  pipeline: string;
  deal_closed_on: string;
  archive_status: string;
  label: string;
  expected_close_date: string;
};

type WPQTImportFilter = {
  includeArchivedTasks: boolean;
  sourcePipelinesFilter: WPQTSourcePipeline[];
};

enum PipelineImportSource {
  TRELLO = "TRELLO-IMPORT",
  ASANA = "ASANA-IMPORT",
  PIPEDRIVE = "PIPEDRIVE-IMPORT",
  QUICKTASKER = "QUICKTASKER-IMPORT",
}

export {
  AsanaImport,
  AsanaImportLabel,
  AsanaImportSection,
  AsanaTaskImport,
  PipedriveDealImport,
  PipelineImportSource,
  TrelloImport,
  TrelloImportList,
  WPQTImport,
  WPQTImportFilter,
  WPQTLabelImport,
  WPQTSourcePipeline,
  WPQTStageImport,
  WPQTTaskImport,
};
