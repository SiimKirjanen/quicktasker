import { useEffect, useState } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { WPQTComment } from "../../../types/comment";
import { Log } from "../../../types/log";

type Props<T> = {
  taskId: string;
  fetchData: (taskId: string) => Promise<{ data: T[] }>;
  renderItem: (item: T) => JSX.Element;
  noDataMessage: string;
  onAdd?: (newEntry: string) => void;
  explanation?: string;
};

function TabContent<T>({
  taskId,
  fetchData,
  renderItem,
  noDataMessage,
  onAdd = () => {},
  explanation,
}: Props<T>) {
  const [data, setData] = useState<T[] | null>(null);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    loadData();
  }, [taskId]);

  const loadData = async () => {
    const response = await fetchData(taskId);
    setData(response.data);
  };

  const addEntry = () => {
    onAdd(newEntry);
    setNewEntry("");
  };

  if (data === null) {
    return (
      <div className="wpqt-flex wpqt-justify-center">
        <LoadingOval width="30" height="30" />
      </div>
    );
  }

  return (
    <div>
      {explanation && (
        <div className="wpqt-mb-3 wpqt-text-center">{explanation}</div>
      )}
      {data.length === 0 && (
        <div className="wpqt-mb-3 wpqt-text-center">{noDataMessage}</div>
      )}
      {data.length > 0 && (
        <div className="wpqt-my-5 wpqt-grid wpqt-grid-cols-[auto_1fr_auto] wpqt-place-items-center wpqt-gap-4">
          {data.map((item) => renderItem(item))}
        </div>
      )}
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-justify-center">
        <WPQTTextarea
          rowsCount={3}
          value={newEntry}
          onChange={(text) => setNewEntry(text)}
        />
        <WPQTButton btnText="Add" onClick={addEntry} />
      </div>
    </div>
  );
}

type TabContentItemProps = {
  item: WPQTComment | Log;
};
function TabContentItem({ item }: TabContentItemProps) {
  return (
    <>
      <div>Siim</div>
      <div>{item.text}</div>
      <div>2031</div>
    </>
  );
}

export { TabContent, TabContentItem };
