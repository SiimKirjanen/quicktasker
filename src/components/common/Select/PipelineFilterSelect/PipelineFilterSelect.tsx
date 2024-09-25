import { useContext, useMemo } from "@wordpress/element";
import { WPQTSelect } from "../WPQTSelect";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { ArchiveContext } from "../../../../providers/ArchiveContextProvider";
import { SET_ARCHIVE_FILTERED_PIPELINE } from "../../../../constants";

function PipelineFilterSelect() {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const {
    state: { archiveFilteredPipelineId },
    archiveDispatch,
  } = useContext(ArchiveContext);

  const pipelineOptions = useMemo(
    () =>
      pipelines.map((pipeline) => ({
        value: pipeline.id,
        label: pipeline.name,
      })),
    [pipelines],
  );

  const setPipelineFilter = (selection: string) => {
    archiveDispatch({
      type: SET_ARCHIVE_FILTERED_PIPELINE,
      payload: selection,
    });
  };

  return (
    <WPQTSelect
      options={pipelineOptions}
      selectedOptionValue={archiveFilteredPipelineId}
      onSelectionChange={setPipelineFilter}
    />
  );
}

export { PipelineFilterSelect };
