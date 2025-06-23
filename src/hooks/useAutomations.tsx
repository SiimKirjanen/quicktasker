import { useContext } from "@wordpress/element";
import { PipelineAutomationsContext } from "../providers/PipelineAutomationsContextProvider";

function useAutomations() {
  const {
    state: { automations, loading },
  } = useContext(PipelineAutomationsContext);

  return {
    automations,
    loading,
  };
}

export { useAutomations };
