import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CHANGE_ARCHIVE_TASK_DONE_FILTER,
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
} from "../../../constants";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { WPQTArchiveDoneFilter } from "../../../types/enums";
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
    },
    archiveDispatch,
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

  return (
    <WPQTFilter
      title={__("Archive filtering", "quicktasker")}
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
      <WPQTFilterSection title={__("Board", "quicktasker")}>
        <PipelineFilterSelect
          selectedOptionValue={archiveFilteredPipelineId}
          selectionChange={onSelectionChange}
          extraOptions={[
            { value: "DELETED", label: __("DELETED", "quicktasker") },
          ]}
        />
      </WPQTFilterSection>

      <WPQTFilterSection title={__("Status", "quicktasker")}>
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
    </WPQTFilter>
  );
}

export { ArchiveFilter };
