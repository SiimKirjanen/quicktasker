import { Page } from "../Page/Page";
import Pipeline from "./components/Pipeline";
import { ActivePipelineContextProvider } from "../../providers/ActivePipelineContextProvider";
import { PipelineModal } from "../../components/Modal/PipelineModal/PipelineModal";
import { PipelineHeader } from "./components/PipelineHeader/PipelineHeader";

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
