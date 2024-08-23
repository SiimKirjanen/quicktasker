import Pipeline from "../components/Pipeline/Pipeline";
import { PipelineHeader } from "../components/Pipeline/PipelineHeader/PipelineHeader";
import { PipelineContextProvider } from "../providers/PipelineContextProvider";

const PipelinePage = () => {
  return (
    <PipelineContextProvider>
      <div>
        <PipelineHeader />
        <Pipeline />
      </div>
    </PipelineContextProvider>
  );
};
export { PipelinePage };
