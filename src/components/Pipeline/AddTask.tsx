import { createTaskRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PIPELINE_ADD_TASK } from "../../constants";
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
      className="wpqt-cursor-pointer wpqt-text-center wpqt-absolute wpqt-bottom-0 wpqt-left-0 wpqt-right-0"
      onClick={addTask}
    >
      Add task
    </div>
  );
}

export { AddTask };
