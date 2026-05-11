import { __ } from "@wordpress/i18n";
import { PipelineOverviewResponse } from "../../../../../types/requestResponse/pipeline-overview-response";
import { ArhivedTaskChart } from "../../ArchivedTaskChart/ArchivedTaskChart";
import { StageDistributionChart } from "../../StageDistributionChart/StageDistributionChart";
import { StatCard } from "../../StatCard/StatCard";
import { TaskStatusChart } from "../../TaskStatusChart/TaskStatusChart";

const defaultChartoptions = {
  legend: {
    position: "left",
    alignment: "center",
    textStyle: {
      color: "#233238",
      fontSize: 14,
    },
  },
  chartArea: { top: 16 },
};

type Props = {
  pipelineOverviewData: PipelineOverviewResponse | null;
};
function PipelineOverviewContent({ pipelineOverviewData }: Props) {
  if (!pipelineOverviewData) {
    return null;
  }

  return (
    <div>
      <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-4 wpqt-mb-8 wpqt-justify-center">
        <StatCard
          label={__("Total tasks", "quicktasker")}
          value={Number(pipelineOverviewData.totalTasksCount)}
          colorClass="wpqt-bg-blue-500"
        />
        <StatCard
          label={__("Completed tasks", "quicktasker")}
          value={Number(pipelineOverviewData.doneTasksCount)}
          colorClass="wpqt-bg-green-500"
        />
        <StatCard
          label={__("Incomplete tasks", "quicktasker")}
          value={Number(pipelineOverviewData.notDoneTasksCount)}
          colorClass="wpqt-bg-yellow-500"
        />
        <StatCard
          label={__("Overdue tasks", "quicktasker")}
          value={Number(pipelineOverviewData.overdueTasksCount)}
          colorClass="wpqt-bg-red-500"
        />
      </div>
      <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-center">
        <StageDistributionChart
          pipelineOverviewData={pipelineOverviewData}
          options={defaultChartoptions}
          width="500px"
        />
        <TaskStatusChart
          pipelineOverviewData={pipelineOverviewData}
          options={defaultChartoptions}
          width="500px"
        />
        <ArhivedTaskChart
          pipelineOverviewData={pipelineOverviewData}
          options={defaultChartoptions}
          width="500px"
        />
      </div>
    </div>
  );
}

export { PipelineOverviewContent };
