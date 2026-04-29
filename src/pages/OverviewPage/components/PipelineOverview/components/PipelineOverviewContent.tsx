import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getPipelineOverviewData } from "../../../../../api/api";
import { Loading } from "../../../../../components/Loading/Loading";
import { useMissingResourceDetection } from "../../../../../hooks/useMissingResourceDetection";
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
  pipelineId: string;
};
function PipelineOverviewContent({ pipelineId }: Props) {
  const [pipelineOverviewData, setPipelineOverviewData] =
    useState<PipelineOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { detectMissingResources } = useMissingResourceDetection();

  useEffect(() => {
    const fetchPipelineOverview = async () => {
      try {
        setLoading(true);
        const response = await getPipelineOverviewData(pipelineId);
        setPipelineOverviewData(response.data);
      } catch (error) {
        console.error(error);
        detectMissingResources(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineOverview();
  }, [pipelineId]);

  if (loading || !pipelineOverviewData) {
    return <Loading ovalSize="48" />;
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
