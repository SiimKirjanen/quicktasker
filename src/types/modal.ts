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

export type {
  TaskExportModalSettings,
  TaskModalSettings,
  TaskRestoreModalSettings,
  WebhooksLogsModalSettings,
};
