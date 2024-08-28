import { Page } from "../components/Page/Page";
import Pipeline from "../components/Pipeline/Pipeline";
import { PipelineHeader } from "../components/Pipeline/PipelineHeader/PipelineHeader";
import { ActivePipelineContextProvider } from "../providers/ActivePipelineContextProvider";

const PipelinePage = () => {
  return (
    <ActivePipelineContextProvider>
      <Page>
        <PipelineHeader />
        <Pipeline />
      </Page>
    </ActivePipelineContextProvider>
  );
};
export { PipelinePage };
