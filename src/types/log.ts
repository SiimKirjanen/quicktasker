type BaseLog = {
  text: string;
  type: "task" | "stage" | "pipeline" | "user";
};

type Log = BaseLog;
type LogFromServer = BaseLog;

export type { Log, LogFromServer };
