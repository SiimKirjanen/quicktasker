import { useContext } from "@wordpress/element";
import { MissingContentContext } from "../providers/MissingContentProvider";

function useMissingContent() {
  const {
    state: { pipelineMissing },
    dispatch,
  } = useContext(MissingContentContext);

  return { pipelineMissing, dispatch };
}

export { useMissingContent };
