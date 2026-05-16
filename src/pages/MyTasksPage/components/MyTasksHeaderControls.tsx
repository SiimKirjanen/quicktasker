import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { WPQTInput } from "../../../components/common/Input/Input";
import { WPQTSelect } from "../../../components/common/Select/WPQTSelect";
import { LoadingOval } from "../../../components/Loading/Loading";

type BoardOption = { value: string; label: string };

type Props = {
  boardOptions: BoardOption[];
  boardFilter: string;
  onBoardFilterChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  onRefresh: () => void;
};

function MyTasksHeaderControls({
  boardOptions,
  boardFilter,
  onBoardFilterChange,
  searchValue,
  onSearchChange,
  loading,
  onRefresh,
}: Props) {
  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-4">
      <WPQTSelect
        options={boardOptions}
        selectedOptionValue={boardFilter}
        onSelectionChange={onBoardFilterChange}
        allSelectorLabel={__("All boards", "quicktasker")}
        className="!wpqt-h-[30px] !wpqt-min-h-[30px] !wpqt-py-0 !wpqt-pl-2 !wpqt-pr-6 !wpqt-text-sm/6 !wpqt-border-[#8c8f94] !wpqt-shadow-none"
      />
      <WPQTInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={__("Search tasks", "quicktasker")}
        className="wpqt-w-52"
        wrapperClassName="!wpqt-mb-0"
        leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
      />
      <div className="wpqt-mx-5">
        {loading ? (
          <LoadingOval width="28" height="28" />
        ) : (
          <ArrowPathIcon
            className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
            data-testid="refresh-icon"
            onClick={onRefresh}
          />
        )}
      </div>
    </div>
  );
}

export { MyTasksHeaderControls };
