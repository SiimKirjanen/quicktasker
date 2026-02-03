import { ArrowPathIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useTimezone } from "../../../hooks/useTimezone";
import { WPQTComment } from "../../../types/comment";
import { Alert } from "../../common/Alert/Alert";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { LoadingOval } from "../../Loading/Loading";
import { LogHeader } from "../../Log/LogItem";

type Props<T> = {
  typeId: string;
  fetchData: () => Promise<T[] | undefined>;
  renderItem: (item: T) => JSX.Element;
  noDataMessage: string;
  onAdd?: (text: string) => Promise<T | undefined>;
  explanation?: string;
  enableAdd?: boolean;
};

function CommentsAndLogsTabContent<T>({
  typeId,
  fetchData,
  renderItem,
  noDataMessage,
  explanation,
  onAdd = async () => undefined,
  enableAdd = false,
}: Props<T>) {
  const [data, setData] = useState<T[] | null>(null);
  const [newEntry, setNewEntry] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [addingEntry, setAddingEntry] = useState(false);

  useEffect(() => {
    loadData();
  }, [typeId]);

  const loadData = async () => {
    setLoadingComments(true);
    const data = await fetchData();
    if (data) {
      setData(data);
    }
    setLoadingComments(false);
  };

  const addEntry = async () => {
    if (!newEntry) {
      return;
    }

    setAddingEntry(true);
    const entry = await onAdd(newEntry);
    if (entry) {
      setData((prevData) => (prevData ? [entry, ...prevData] : [entry]));
      setNewEntry("");
    }
    setAddingEntry(false);
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
        <div className="wpqt-flex wpqt-justify-center">
          <Alert type="info" className="wpqt-mb-3 wpqt-text-center">
            {explanation}
          </Alert>
        </div>
      )}
      {data.length === 0 && (
        <div className="wpqt-mb-3 wpqt-text-center">{noDataMessage}</div>
      )}

      <div className="wpqt-mb-3 wpqt-mt-3 wpqt-flex wpqt-justify-center">
        <CommentsRefresh
          isLoading={loadingComments}
          refreshComemnts={loadData}
        />
      </div>

      {enableAdd && (
        <div className="wpqt-flex wpqt-justify-center">
          <div className="wpqt-w-2/3 wpqt-flex wpqt-flex-col wpqt-items-center">
            <WPQTTextarea
              rowsCount={3}
              value={newEntry}
              onChange={(text) => setNewEntry(text)}
              className="wpqt-mb-4 wpqt-w-full"
            />
            <WPQTIconButton
              text="Add comment"
              loading={addingEntry}
              onClick={addEntry}
              icon={
                <ChatBubbleLeftIcon className="wpqt-icon-blue wpqt-size-5" />
              }
            />
          </div>
        </div>
      )}

      {data.length > 0 && (
        <div className="wpqt-mb-[28px] wpqt-mt-[56px] wpqt-logs-grid">
          <LogHeader title={__("Author", "quicktasker")} />
          <LogHeader title={__("Date", "quicktasker")} />
          <LogHeader title={__("Text", "quicktasker")} />
          {data.map((item) => renderItem(item))}
        </div>
      )}
    </div>
  );
}

type CommentsRefreshProps = {
  isLoading: boolean;
  refreshComemnts: () => void;
};
function CommentsRefresh({ isLoading, refreshComemnts }: CommentsRefreshProps) {
  return (
    <>
      {isLoading ? (
        <LoadingOval width="32" height="32" />
      ) : (
        <ArrowPathIcon
          className="wpqt-icon-blue wpqt-size-8 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
          onClick={refreshComemnts}
        />
      )}
    </>
  );
}

function TabContentCommentItem({ item }: { item: WPQTComment }) {
  const { convertToWPTimezone } = useTimezone();
  const isUnknownAuthor = item.author_name === null && item.author_id === null;

  return (
    <>
      {!isUnknownAuthor && (
        <div>
          <div className="wpqt-text-center wpqt-mb-1">{item.author_name}</div>
          <div className="wpqt-text-center">
            {item.author_type === "wp-user"
              ? __("Admin", "quicktasker")
              : __("QuickTasker", "quicktasker")}
          </div>
        </div>
      )}
      {isUnknownAuthor && (
        <div>
          <div className="wpqt-text-center wpqt-mb-1">
            {__("Unknown", "quicktasker")}
          </div>
          <div className="wpqt-text-center">
            {__("Author not found", "quicktasker")}
          </div>
        </div>
      )}
      <div>{convertToWPTimezone(item.created_at)}</div>
      <div>{item.text}</div>
    </>
  );
}

export { CommentsAndLogsTabContent, TabContentCommentItem };
