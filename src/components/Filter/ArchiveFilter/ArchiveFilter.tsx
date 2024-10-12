import { Input } from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
} from "../../../constants";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { PipelineFilterSelect } from "../../common/Select/PipelineFilterSelect/PipelineFilterSelect";
import { WPQTFilter } from "../WPQTFilter";

function ArchiveFilter() {
  const {
    state: { archiveSearchValue, archiveFilteredPipelineId },
    archiveDispatch,
  } = useContext(ArchiveContext);

  const setArchiveSearchValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    archiveDispatch({
      type: SET_ARCHIVE_SEARCH_VALUE,
      payload: event.target.value,
    });
  };

  const onSelectionChange = (selection: string) => {
    archiveDispatch({
      type: SET_ARCHIVE_FILTERED_PIPELINE,
      payload: selection,
    });
  };

  return (
    <WPQTFilter title={__("Filter", "quicktasker")}>
      <Input
        type="text"
        value={archiveSearchValue}
        onChange={setArchiveSearchValue}
      />
      <PipelineFilterSelect
        selectedOptionValue={archiveFilteredPipelineId}
        selectionChange={onSelectionChange}
      />
    </WPQTFilter>
  );
}

export { ArchiveFilter };
