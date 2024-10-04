type BaseLog = {
  id: string;
  text: string;
  type: "task" | "stage" | "pipeline" | "user";
  type_id: string;
  created_at: string;
};

type Log = BaseLog;
type LogFromServer = BaseLog;

export type { Log, LogFromServer };
