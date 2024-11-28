import { __ } from "@wordpress/i18n";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";
import { Value } from "react-date-picker/dist/cjs/shared/types";
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
      >
        <div>
          <div className="wpqt-mb-2">Task creation date</div>
          <DatePicker
            onChange={handleCreationDateChange}
            value={overviewFilter.taskCreationDate}
            format="y-MM-dd"
            id="taskCreationDate"
          />
        </div>
        <div>
          <div className="wpqt-mb-2">Task done date</div>
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
