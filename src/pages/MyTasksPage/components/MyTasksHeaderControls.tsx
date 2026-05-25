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
    <div className="wpqt-flex wpqt-flex-wrap wpqt-items-center wpqt-gap-3 sm:wpqt-gap-4">
      <WPQTSelect
        options={boardOptions}
        selectedOptionValue={boardFilter}
        onSelectionChange={onBoardFilterChange}
        allSelectorLabel={__("All boards", "quicktasker")}
        className="!wpqt-shadow-none"
      />
      <WPQTInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={__("Search tasks", "quicktasker")}
        className="wpqt-w-52 !wpqt-border-qtBorder"
        wrapperClassName="!wpqt-mb-0"
        leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
      />
      <div className="wpqt-mx-2 sm:wpqt-mx-5">
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
