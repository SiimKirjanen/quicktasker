import { createTaskRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PIPELINE_ADD_TASK } from "../../constants";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Task } from "./Tast";

type Props = {
  stageId: string;
};

function AddTask({ stageId }: Props) {
  const { dispatch } = useContext(PipelineContext);

  const addTask = async () => {
    try {
      const taskName = `New task`;
      const response = await createTaskRequest(stageId, taskName);

      dispatch({
        type: PIPELINE_ADD_TASK,
        payload: {
          stageId,
          task: {
            id: response.data.id,
            name: response.data.name,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="wpqt-flex wpqt-justify-center wpqt-cursor-pointer wpqt-text-center wpqt-p-2 wpqt-z-10 wpqt-sticky wpqt-bottom-0 wpqt-order-1 wpqt-bg-gray-100"
      onClick={addTask}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
    </div>
  );
}

export { AddTask };
