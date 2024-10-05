import { Page } from "../Page/Page";
import Pipeline from "./components/Pipeline";
import { ActivePipelineContextProvider } from "../../providers/ActivePipelineContextProvider";
import { AddPipelineModal } from "../../components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal";
import { PipelineHeader } from "./components/PipelineHeader/PipelineHeader";
import { EditPipelineModal } from "../../components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal";

const PipelinePage = () => {
  return (
    <ActivePipelineContextProvider>
      <Page>
        <PipelineHeader />
        <Pipeline />
        <AddPipelineModal />
        <EditPipelineModal />
      </Page>
    </ActivePipelineContextProvider>
  );
};
export { PipelinePage };
