import { Page } from "./Page/Page";
import Pipeline from "../components/Pipeline/Pipeline";
import { PipelineHeader } from "../components/Pipeline/PipelineHeader/PipelineHeader";
import { ActivePipelineContextProvider } from "../providers/ActivePipelineContextProvider";
import { PipelineModal } from "../components/Modal/PipelineModal/PipelineModal";

const PipelinePage = () => {
  return (
    <ActivePipelineContextProvider>
      <Page>
        <PipelineHeader />
        <Pipeline />
        <PipelineModal />
      </Page>
    </ActivePipelineContextProvider>
  );
};
export { PipelinePage };
