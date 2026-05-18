import { Task, TaskExportMethods } from "./task";
import { UserTypes } from "./user";

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

type UserLogsModalSettings = {
  userId: string | null;
  userType: UserTypes | null;
};

export type {
  ApiTokenLogsModalSettings,
  AutomationLogsModalSettings,
  TaskExportModalSettings,
  TaskLogsModalSettings,
  TaskModalSettings,
  TaskRestoreModalSettings,
  UserLogsModalSettings,
  WebhooksLogsModalSettings,
};
