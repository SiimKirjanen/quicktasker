import { deleteStageRequest } from "../../api/api";
import { useContext } from "@wordpress/element";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PIPELINE_DELETE_STAGE } from "../../constants";

type Props = {
  stageId: string;
};

function StageControls({ stageId }: Props) {
  const { dispatch } = useContext(PipelineContext);

  const deleteStage = async () => {
    try {
      await deleteStageRequest(stageId);

      dispatch({ type: PIPELINE_DELETE_STAGE, payload: stageId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={deleteStage}>Delete</button>
    </div>
  );
}

export { StageControls };
