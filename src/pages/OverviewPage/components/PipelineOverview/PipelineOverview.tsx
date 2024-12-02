import { useState } from "@wordpress/element";
import { PipelineOverviewFilter } from "../../../../types/overview";
import { Pipeline } from "../../../../types/pipeline";
import { PipelineOverviewToolBar } from "../PipelineOverviewToolBar/PipelineOverviewToolBar";
import { PipelineOverviewContent } from "./components/PipelineOverviewContent";

type Props = {
  pipeline: Pipeline;
};
function PipelineOverview({ pipeline }: Props) {
  const [overviewFilter, setOverviewFilter] = useState<PipelineOverviewFilter>({
    taskCreationDate: null,
    taskDoneDate: null,
    taskAssignees: [],
  });
  return (
    <div>
      <PipelineOverviewToolBar
        overviewFilter={overviewFilter}
        onCreationDateChange={(value) => {
          setOverviewFilter({
            ...overviewFilter,
            taskCreationDate: value,
          });
        }}
        onDoneDateChange={(value) => {
          setOverviewFilter({
            ...overviewFilter,
            taskDoneDate: value,
          });
        }}
      />
      <PipelineOverviewContent
        pipeline={pipeline}
        overviewFilter={overviewFilter}
      />
    </div>
  );
}

export { PipelineOverview };
