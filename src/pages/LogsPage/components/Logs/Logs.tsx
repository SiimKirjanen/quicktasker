import { Log } from "../../../../types/log";

type Props = {
  logs: Log[];
  loading: boolean;
};
const Logs = ({ logs }: Props) => {
  return (
    <div>
      {logs.map((log) => (
        <div key={log.id}>{log.text}</div>
      ))}
    </div>
  );
};

export { Logs };
