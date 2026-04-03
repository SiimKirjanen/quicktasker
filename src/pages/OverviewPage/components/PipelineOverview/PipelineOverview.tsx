import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Info } from "../../../../components/Info/Info";
import { useMissingContent } from "../../../../hooks/useMissingContent";
import { PipelineOverviewFilter } from "../../../../types/overview";
import { PipelineOverviewToolBar } from "../PipelineOverviewToolBar/PipelineOverviewToolBar";
import { PipelineOverviewContent } from "./components/PipelineOverviewContent";

type Props = {
  pipelineId: string;
};
function PipelineOverview({ pipelineId }: Props) {
  const [overviewFilter, setOverviewFilter] = useState<PipelineOverviewFilter>({
    taskCreationDate: null,
    taskDoneDate: null,
    taskAssignees: [],
  });
  const { pipelineMissing } = useMissingContent();

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to this overview seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

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
        pipelineId={pipelineId}
        overviewFilter={overviewFilter}
      />
    </div>
  );
}

export { PipelineOverview };
