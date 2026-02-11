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

export type {
  AutomationLogsModalSettings,
  TaskExportModalSettings,
  TaskModalSettings,
  TaskRestoreModalSettings,
  WebhooksLogsModalSettings,
};
