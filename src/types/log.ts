import { WPQTLogCreatedBy } from "./enums";

type WPQTLogType =
  | "task"
  | "stage"
  | "pipeline"
  | "user"
  | "webhook"
  | "automation"
  | "api_token";

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
  pipeline_id: string | null;
  pipeline_name: string | null;
};

enum LogTypeEnum {
  Pipeline = "pipeline",
  Stage = "stage",
  Task = "task",
  Webhook = "webhook",
  Automation = "automation",
  ApiToken = "api_token",
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
  ApiToken = "api_token",
  Anonymous = "anonymous",
  WpUser = "wp_user",
  All = "all",
}

type Log = BaseLog;
type LogFromServer = BaseLog;

export { LogCreatedByEnum, LogStatusEnum, LogTypeEnum };

export type { Log, LogFromServer, WPQTLogType };
