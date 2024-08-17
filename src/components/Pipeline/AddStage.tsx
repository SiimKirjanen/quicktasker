import { createNewStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = { pipelineId: string };

function AddStage({ pipelineId }: Props) {
  const { dispatch } = useContext(PipelineContext);

  const addStage = async () => {
    try {
      const response = await createNewStageRequest(pipelineId, `New stage`);

      dispatch({
        type: "ADD_STAGE",
        payload: {
          id: response.data.id,
          name: response.data.name,
          tasks: [],
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="wpqt-main-border wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-flex-col wpqt-items-center wpqt-justify-center wpqt-p-3 hover:wpqt-bg-gray-100"
      onClick={addStage}
    >
      <PlusCircleIcon className="wpqt-size-6 wpqt-text-green-600" />
      <div className="wpqt-whitespace-nowrap">Add stage</div>
    </div>
  );
}

export { AddStage };
