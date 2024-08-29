import { Input } from "@headlessui/react";
import { useContext } from "@wordpress/element";
import { ArchiveContext } from "../../../providers/ArchiveContextProvider";
import { SET_ARCHIVE_SEARCH_VALUE } from "../../../constants";
import { PipelineFilterSelect } from "../../Select/PipelineFilterSelect/PipelineFilterSelect";

function ArchiveControls() {
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
    <div className="wpqt-mb-4">
      <div className="wpqt-text-base">Archive filtering</div>
      <div className="wpqt-flex wpqt-gap-2">
        <Input
          type="text"
          value={archiveSearchValue}
          onChange={setArchiveSearchValue}
        />
        <PipelineFilterSelect />
      </div>
    </div>
  );
}

export { ArchiveControls };
