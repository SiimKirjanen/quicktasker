import { FunnelIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CHANGE_ARCHIVE_TASK_DONE_FILTER,
  CHANGE_ARCHIVED_TASKS_LIMIT_FILTER,
  SET_ARCHIVE_FILTER_ORDER,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
} from "../../../constants";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
} from "../../../types/enums";
import { WPQTIconButton } from "../../common/Button/Button";
import { WPQTInput } from "../../common/Input/Input";
import { PipelineFilterSelect } from "../../common/Select/PipelineFilterSelect/PipelineFilterSelect";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

function ArchiveFilter() {
  const {
    state: {
      archiveSearchValue,
      archiveFilteredPipelineId,
      archiveTaskDoneFilter,
      archivedTaskLimit,
      archiveFilterOrder,
    },
    archiveDispatch,
    fetchAndSetArchivedTasks,
  } = useContext(ArchiveContext);

  const setArchiveSearchValue = (newValue: string) => {
    archiveDispatch({
      type: SET_ARCHIVE_SEARCH_VALUE,
      payload: newValue,
    });
  };

  const onSelectionChange = (selection: string) => {
    archiveDispatch({
      type: SET_ARCHIVE_FILTERED_PIPELINE,
      payload: selection,
    });
  };

  const convertToWPQTArchiveDoneFilter = (selection: string) => {
    switch (selection) {
      case WPQTArchiveDoneFilter.All:
        return WPQTArchiveDoneFilter.All;
      case WPQTArchiveDoneFilter.Completed:
        return WPQTArchiveDoneFilter.Completed;
      case WPQTArchiveDoneFilter.NotCompleted:
        return WPQTArchiveDoneFilter.NotCompleted;
      default:
        throw new Error(`Invalid selection: ${selection}`);
    }
  };

  const applySearch = (
    <WPQTIconButton
      text={__("Apply filter", "quicktasker")}
      icon={<FunnelIcon className="wpqt-size-5 wpqt-icon-blue" />}
      onClick={fetchAndSetArchivedTasks}
    />
  );

  return (
    <WPQTFilter
      title={__("Archive filtering", "quicktasker")}
      applyFilterChildren={applySearch}
      searchChildren={
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="archive-search"
        >
          <WPQTInput
            inputId="archive-search"
            value={archiveSearchValue}
            onChange={setArchiveSearchValue}
          />
        </WPQTFilterSection>
      }
    >
      <WPQTFilterSection title={__("Task board", "quicktasker")}>
        <PipelineFilterSelect
          selectedOptionValue={archiveFilteredPipelineId}
          selectionChange={onSelectionChange}
        />
      </WPQTFilterSection>

      <WPQTFilterSection title={__("Task status", "quicktasker")}>
        <WPQTSelect
          allSelector={false}
          selectedOptionValue={archiveTaskDoneFilter}
          options={[
            {
              label: __("All", "quicktasker"),
              value: WPQTArchiveDoneFilter.All,
            },
            {
              label: __("Completed", "quicktasker"),
              value: WPQTArchiveDoneFilter.Completed,
            },
            {
              label: __("Not completed", "quicktasker"),
              value: WPQTArchiveDoneFilter.NotCompleted,
            },
          ]}
          onSelectionChange={(selection: string) => {
            const filter = convertToWPQTArchiveDoneFilter(selection);
            archiveDispatch({
              type: CHANGE_ARCHIVE_TASK_DONE_FILTER,
              payload: filter,
            });
          }}
        />
      </WPQTFilterSection>
      <WPQTFilterSection title={__("Number of tasks", "quicktasker")}>
        <WPQTSelect
          allSelector={false}
          selectedOptionValue={archivedTaskLimit}
          options={[
            {
              label: __("Show all", "quicktasker"),
              value: WPQTArvhiveTaskLimit.ALL,
            },
            {
              label: __("Show 100", "quicktasker"),
              value: WPQTArvhiveTaskLimit.ONE_HUNDRED,
            },
            {
              label: __("Show 200", "quicktasker"),
              value: WPQTArvhiveTaskLimit.TWO_HUNDRED,
            },
            {
              label: __("Show 500", "quicktasker"),
              value: WPQTArvhiveTaskLimit.FIVE_HUNDRED,
            },
          ]}
          onSelectionChange={(selection: string) => {
            archiveDispatch({
              type: CHANGE_ARCHIVED_TASKS_LIMIT_FILTER,
              payload: selection as WPQTArvhiveTaskLimit,
            });
          }}
        />
      </WPQTFilterSection>

      <WPQTFilterSection title={__("Task order", "quicktasker")}>
        <WPQTSelect
          allSelector={false}
          selectedOptionValue={archiveFilterOrder}
          options={[
            {
              label: __("Desc", "quicktasker"),
              value: WPQTArchiveOrder.DESC,
            },
            {
              label: __("Asc", "quicktasker"),
              value: WPQTArchiveOrder.ASC,
            },
          ]}
          onSelectionChange={(selection: string) => {
            archiveDispatch({
              type: SET_ARCHIVE_FILTER_ORDER,
              payload: selection as WPQTArchiveOrder,
            });
          }}
        />
      </WPQTFilterSection>
    </WPQTFilter>
  );
}

export { ArchiveFilter };
