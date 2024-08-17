import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { createPipelineRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import {
  PIPELINE_ADD_EXISTING_PIPELINE,
  PIPELINE_SET_PIPELINE,
} from "../../constants";

function AddPipeline() {
  const { dispatch } = useContext(PipelineContext);

  const addPipeline = async () => {
    try {
      const response = await createPipelineRequest("New Board");

      dispatch({
        type: PIPELINE_ADD_EXISTING_PIPELINE,
        payload: response.data,
      });
      dispatch({
        type: PIPELINE_SET_PIPELINE,
        payload: {
          ...response.data,
          stages: [],
        },
      });
    } catch (e) {
      toast.error("Failed to create a board", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div
      className="wpqt-flex wpqt-cursor-pointer wpqt-items-center"
      onClick={addPipeline}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
      Add Board
    </div>
  );
}

export { AddPipeline };
