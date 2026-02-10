import { WPQTLogCreatedBy } from "./enums";

type WPQTLogType = "task" | "stage" | "pipeline" | "user" | "webhook";

type BaseLog = {
  id: string;
  text: string;
  type: WPQTLogType;
  type_id: string;
  created_at: string;
  author_name: string;
  user_id: string;
  created_by: WPQTLogCreatedBy;
  log_status: LogStatusEnum;
};

enum LogTypeEnum {
  Pipeline = "pipeline",
  Stage = "stage",
  Task = "task",
  Webhook = "webhook",
  All = "all",
}

enum LogStatusEnum {
  Success = "success",
  Error = "error",
}

enum LogCreatedByEnum {
  Admin = "admin",
  Quicktasker = "quicktasker_user",
  Automation = "automation",
  Import = "import",
  System = "system",
  All = "all",
}

type Log = BaseLog;
type LogFromServer = BaseLog;

export { LogCreatedByEnum, LogStatusEnum, LogTypeEnum };

export type { Log, LogFromServer, WPQTLogType };
