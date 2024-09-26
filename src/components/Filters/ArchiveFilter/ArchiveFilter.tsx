import { Input } from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import {
  SET_ARCHIVE_FILTERED_PIPELINE,
  SET_ARCHIVE_SEARCH_VALUE,
} from "../../../constants";
import { WPQTFilter } from "../WPQTFilter";
import { PipelineFilterSelect } from "../../common/Select/PipelineFilterSelect/PipelineFilterSelect";

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
    <WPQTFilter title="Archive filtering">
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
