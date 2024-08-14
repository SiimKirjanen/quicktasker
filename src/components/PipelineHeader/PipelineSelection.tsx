import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { Select } from "@headlessui/react";

function PipelineSelection() {
  const {
    state: { existingPipelines, pipeline },
  } = useContext(PipelineContext);

  return (
    <Select
      name="status"
      className="wpqt-border data-[hover]:wpqt-shadow data-[focus]:wpqt-bg-blue-100"
      aria-label="Board selection"
    >
      {existingPipelines.map((existingPipeline) => {
        return (
          <option
            key={existingPipeline.id}
            value={existingPipeline.id}
            selected={pipeline!.id === existingPipeline.id}
          >
            {existingPipeline.name}
          </option>
        );
      })}
      <option
        key="wpqt-new-pipeline"
        value="wpqt-new-pipeline"
        className="wpqt-pt-3"
      >
        Add new
      </option>
    </Select>
  );
}

export { PipelineSelection };
