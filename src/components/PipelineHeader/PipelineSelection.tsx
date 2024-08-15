import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { Select } from "@headlessui/react";
import { getPipelineData } from "../../api/api";
import { toast } from "react-toastify";
import { PIPELINE_SET_PIPELINE } from "../../constants";

function PipelineSelection() {
  const {
    state: { existingPipelines, activePipeline },
    dispatch,
  } = useContext(PipelineContext);

  const changePipeline = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const resp = await getPipelineData(event.target.value);

      dispatch({
        type: PIPELINE_SET_PIPELINE,
        payload: resp.data,
      });
    } catch (e) {
      toast.error("Failed to change pipeline", {
        position: "bottom-right",
      });
    }
  };

  return (
    <Select
      name="status"
      className="wpqt-border data-[hover]:wpqt-shadow data-[focus]:wpqt-bg-blue-100"
      aria-label="Board selection"
      onChange={changePipeline}
    >
      {existingPipelines.map((existingPipeline) => {
        return (
          <option
            key={existingPipeline.id}
            value={existingPipeline.id}
            selected={activePipeline!.id === existingPipeline.id}
          >
            {existingPipeline.name}
          </option>
        );
      })}
    </Select>
  );
}

export { PipelineSelection };
