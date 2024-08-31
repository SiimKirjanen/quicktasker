import { Input } from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { SET_ARCHIVE_SEARCH_VALUE } from "../../../constants";
import { PipelineFilterSelect } from "../../Select/PipelineFilterSelect/PipelineFilterSelect";
import { WPQTFilter } from "../WPQTFilter";

function ArchiveFilter() {
  const {
    state: { archiveSearchValue },
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

  return (
    <WPQTFilter title="Archive filtering">
      <Input
        type="text"
        value={archiveSearchValue}
        onChange={setArchiveSearchValue}
      />
      <PipelineFilterSelect />
    </WPQTFilter>
  );
}

export { ArchiveFilter };
