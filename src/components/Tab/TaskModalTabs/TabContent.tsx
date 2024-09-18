import { useEffect, useState } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";

type Props<T> = {
  taskId: string;
  fetchData: (taskId: string) => Promise<{ data: T[] }>;
  renderItem: (item: T) => JSX.Element;
  noDataMessage: string;
};

function TabContent<T>({
  taskId,
  fetchData,
  renderItem,
  noDataMessage,
}: Props<T>) {
  const [data, setData] = useState<T[] | null>(null);

  const loadData = async () => {
    const response = await fetchData(taskId);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, [taskId]);

  if (data === null) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <LoadingOval width="30" height="30" />
      </div>
    );
  }

  if (data.length === 0) {
    return <div>{noDataMessage}</div>;
  }

  return <div>{data.map((item) => renderItem(item))}</div>;
}

export { TabContent };
