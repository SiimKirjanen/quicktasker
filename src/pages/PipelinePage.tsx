import { Page } from "../components/Page/Page";
import Pipeline from "../components/Pipeline/Pipeline";
import { PipelineHeader } from "../components/Pipeline/PipelineHeader/PipelineHeader";
import { PipelineContextProvider } from "../providers/PipelineContextProvider";

const PipelinePage = () => {
  return (
    <PipelineContextProvider>
      <Page>
        <PipelineHeader />
        <Pipeline />
      </Page>
    </PipelineContextProvider>
  );
};
export { PipelinePage };
