import { useContext } from "@wordpress/element";
import { MissingContentContext } from "../providers/MissingContentProvider";

function useMissingContent() {
  const {
    state: { pipelineMissing, pipelineNoAccess },
    dispatch,
  } = useContext(MissingContentContext);

  return { pipelineMissing, pipelineNoAccess, dispatch };
}

export { useMissingContent };
