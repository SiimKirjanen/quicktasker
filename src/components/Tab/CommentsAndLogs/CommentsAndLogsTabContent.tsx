import { useEffect, useState } from "@wordpress/element";
import { LoadingOval } from "../../Loading/Loading";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTComment } from "../../../types/comment";
import { Log } from "../../../types/log";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

type Props<T> = {
  typeId: string;
  fetchData: () => Promise<T[] | undefined>;
  renderItem: (item: T) => JSX.Element;
  noDataMessage: string;
  onAdd: (text: string) => Promise<T | undefined>;
  explanation?: string;
};

function CommentsAndLogsTabContent<T>({
  typeId,
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
  }, [typeId]);

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
        <div className="wpqt-mb-3 wpqt-text-center wpqt-font-semibold">
          {explanation}
        </div>
      )}
      {data.length === 0 && (
        <div className="wpqt-mb-3 wpqt-text-center">{noDataMessage}</div>
      )}
      {data.length > 0 && (
        <div className="wpqt-my-6 wpqt-grid wpqt-grid-cols-[auto_1fr_auto] wpqt-place-items-center wpqt-gap-4">
          {data.map((item) => renderItem(item))}
        </div>
      )}
      <div className="wpqt-flex wpqt-justify-center">
        <div>
          <WPQTTextarea
            rowsCount={3}
            value={newEntry}
            onChange={(text) => setNewEntry(text)}
            className="wpqt-mb-4"
          />
          <WPQTIconButton
            text="Add comment"
            onClick={addEntry}
            icon={<ChatBubbleLeftIcon className="wpqt-icon-blue wpqt-size-5" />}
          />
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

export { CommentsAndLogsTabContent, TabContentItem };
