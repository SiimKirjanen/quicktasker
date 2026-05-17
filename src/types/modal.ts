import { Task, TaskExportMethods } from "./task";

type TaskModalSettings = {
  allowToMarkTaskAsDone: boolean;
};

type TaskExportModalSettings = {
  selectedMethod: TaskExportMethods;
};

type TaskRestoreModalSettings = {
  taskToRestore: Task | null;
};

type WebhooksLogsModalSettings = {
  webhookId: string | null;
};

type AutomationLogsModalSettings = {
  automationId: string | null;
};

type ApiTokenLogsModalSettings = {
  apiTokenId: string | null;
};

type TaskLogsModalSettings = {
  taskId: string | null;
};

export type {
  ApiTokenLogsModalSettings,
  AutomationLogsModalSettings,
  TaskExportModalSettings,
  TaskLogsModalSettings,
  TaskModalSettings,
  TaskRestoreModalSettings,
  WebhooksLogsModalSettings,
};
