import { WPQTLogCreatedBy } from "./enums";

type BaseLog = {
  id: string;
  text: string;
  type: "task" | "stage" | "pipeline" | "user";
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
  All = "all",
}

type Log = BaseLog;
type LogFromServer = BaseLog;

export { LogCreatedByEnum, LogTypeEnum };

export type { Log, LogFromServer };
