import { createNewStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";

type Props = { pipelineId: string };

function AddStage({ pipelineId }: Props) {
  const { dispatch } = useContext(PipelineContext);

  const addStage = async () => {
    try {
      const response = await createNewStageRequest(pipelineId, `New stage`);

      dispatch({
        type: "ADD_STAGE",
        payload: {
          id: response.id,
          name: response.name,
          tasks: [],
        },
      });
    } catch (error) {}
  };

  return (
    <div>
      <button onClick={addStage}>Add Stage</button>
    </div>
  );
}

export { AddStage };
