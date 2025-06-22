import { useContext } from "@wordpress/element";
import { TasksViewFilter } from "../../components/Filter/TasksViewFilter/TasksViewFilter";
import { ImportPipelineModal } from "../../components/Modal/ImportPipelineModal/ImportPipelineModal";
import { MoveTaskModal } from "../../components/Modal/MoveTaskModal/MoveTaskModal";
import { AddPipelineModal } from "../../components/Modal/PipelineModal/AddPipelineModal/AddPipelineModal";
import { EditPipelineModal } from "../../components/Modal/PipelineModal/EditPipelineModal/EditPipelineModal";

import { PipelineExportModal } from "../../components/Modal/PipelineExportModal/PipelineExportModal";
import {
  ActivePipelineContext,
  ActivePipelineContextProvider,
} from "../../providers/ActivePipelineContextProvider";
import { ActivePipelineTaskViewContextProvider } from "../../providers/ActivePipelineTaskViewContextProvider";
import { LabelsContextProvider } from "../../providers/LabelsContextProvider";
import { PipelineView } from "../../types/pipeline";
import { Page } from "../Page/Page";
import Pipeline from "./components/Pipeline";
import { PipelineHeader } from "./components/PipelineHeader/PipelineHeader";
import { TaskView } from "./components/TaskView/TaskView";

const PipelinePage = () => {
  return (
    <ActivePipelineContextProvider>
      <LabelsContextProvider>
        <PipelinePageContent />
      </LabelsContextProvider>
    </ActivePipelineContextProvider>
  );
};
const PipelinePageContent = () => {
  const {
    state: { view, activePipeline },
  } = useContext(ActivePipelineContext);
  const renderPipelineView = view === PipelineView.PIPELINE;

  return (
    <Page>
      <PipelineHeader />
      {renderPipelineView ? (
        <Pipeline />
      ) : (
        <ActivePipelineTaskViewContextProvider>
          <TasksViewFilter />
          <TaskView />
        </ActivePipelineTaskViewContextProvider>
      )}
      <AddPipelineModal />
      <EditPipelineModal />
      <MoveTaskModal />
      <PipelineExportModal pipelineId={activePipeline?.id || null} />
      <ImportPipelineModal />
    </Page>
  );
};
export { PipelinePage };
