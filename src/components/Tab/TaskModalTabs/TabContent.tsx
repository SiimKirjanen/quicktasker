import { useEffect, useState } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { WPQTComment } from "../../../types/comment";
import { Log } from "../../../types/log";

type Props<T> = {
  taskId: string;
  fetchData: () => Promise<T[] | undefined>;
  renderItem: (item: T) => JSX.Element;
  noDataMessage: string;
  onAdd: (text: string) => Promise<T | undefined>;
  explanation?: string;
};

function TabContent<T>({
  taskId,
  fetchData,
  renderItem,
  noDataMessage,
  explanation,
  onAdd,
}: Props<T>) {
  const [data, setData] = useState<T[] | null>(null);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    loadData();
  }, [taskId]);

  const loadData = async () => {
    const data = await fetchData();
    if (data) {
      setData(data);
    }
  };

  const addEntry = async () => {
    const entry = await onAdd(newEntry);
    if (entry) {
      setData((prevData) => (prevData ? [entry, ...prevData] : [entry]));
      setNewEntry("");
    }
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
        <div>
          <WPQTTextarea
            rowsCount={3}
            value={newEntry}
            onChange={(text) => setNewEntry(text)}
          />
          <div className="wpqt-ml-auto wpqt-flex">
            <WPQTButton
              btnText="Add"
              onClick={addEntry}
              className="wpqt-ml-auto"
            />
          </div>
        </div>
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
