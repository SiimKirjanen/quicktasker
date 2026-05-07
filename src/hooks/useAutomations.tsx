import { useContext } from "@wordpress/element";
import { PipelineAutomationsContext } from "../providers/PipelineAutomationsContextProvider";

function useAutomations() {
  const {
    state: { automations, loading },
    refetchPipelineAutomations,
  } = useContext(PipelineAutomationsContext);

  return {
    automations,
    loading,
    refetchPipelineAutomations,
  };
}

export { useAutomations };
