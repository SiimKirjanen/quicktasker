import { __ } from "@wordpress/i18n";
import dayjs from "dayjs";
import DatePicker from "react-datetime-picker";
import { Value } from "react-datetime-picker/dist/cjs/shared/types";
import { WPQTFilter } from "../../../../components/Filter/WPQTFilter";
import { PipelineOverviewFilter } from "../../../../types/overview";

type Props = {
  overviewFilter: PipelineOverviewFilter;
  onCreationDateChange: (dateString: string | null) => void;
  onDoneDateChange: (dateString: string | null) => void;
};
function PipelineOverviewToolBar({
  overviewFilter,
  onCreationDateChange,
  onDoneDateChange,
}: Props) {
  const formatDate = (value: Value): string => {
    if (value instanceof Date) {
      return dayjs(value).format("YYYY-MM-DD");
    }
    return "";
  };
  const handleCreationDateChange = (value: Value) => {
    const dateString = formatDate(value);
    onCreationDateChange(dateString);
  };
  const handleDoneDateChange = (value: Value) => {
    const dateString = formatDate(value);
    onDoneDateChange(dateString);
  };

  return (
    <div>
      <WPQTFilter
        title={__("Statistics filtering", "quicktasker")}
        titleClassName="wpqt-text-center"
        childrenClassName="wpqt-gap-6 wpqt-justify-center"
        searchChildren={null}
      >
        <div>
          <div className="wpqt-mb-2">
            <div className="wpqt-font-semibold">
              {__("Task creation date", "quicktasker")}
            </div>
            <div>
              {__(
                "(Filter tasks that have creation date equal or bigger than)",
                "quicktasker",
              )}
            </div>
          </div>
          <DatePicker
            onChange={handleCreationDateChange}
            value={overviewFilter.taskCreationDate}
            format="y-MM-dd"
            id="taskCreationDate"
          />
        </div>
        <div>
          <div className="wpqt-mb-2">
            <div className="wpqt-font-semibold">
              {__("Task done date", "quicktasker")}
            </div>
            <div>
              {__(
                "(Filter tasks that have done date equal or smaller than)",
                "quicktasker",
              )}
            </div>
          </div>
          <DatePicker
            onChange={handleDoneDateChange}
            value={overviewFilter.taskDoneDate}
            format="y-MM-dd"
            id="taskCreationDate"
          />
        </div>
      </WPQTFilter>
    </div>
  );
}

export { PipelineOverviewToolBar };
