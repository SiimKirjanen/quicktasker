import { useEffect, useState } from "@wordpress/element";
import { getPipelineOverviewData } from "../../../../../api/api";
import { Loading } from "../../../../../components/Loading/Loading";
import { PipelineOverviewFilter } from "../../../../../types/overview";
import { Pipeline } from "../../../../../types/pipeline";
import { PipelineOverviewResponse } from "../../../../../types/requestResponse/pipeline-overview-response";
import { ArhivedTaskChart } from "../../ArchivedTaskChart/ArchivedTaskChart";
import { StageDistributionChart } from "../../StageDistributionChart/StageDistributionChart";
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
};

type Props = {
  pipeline: Pipeline;
  overviewFilter: PipelineOverviewFilter;
};
function PipelineOverviewContent({ pipeline, overviewFilter }: Props) {
  const [pipelineOverviewData, setPipelineOverviewData] =
    useState<PipelineOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPipelineOverview = async () => {
      try {
        setLoading(true);
        const response = await getPipelineOverviewData(
          pipeline.id,
          overviewFilter,
        );
        setPipelineOverviewData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineOverview();
  }, [pipeline.id, overviewFilter]);

  if (loading || !pipelineOverviewData) {
    return <Loading ovalSize="48" />;
  }

  return (
    <div className="wpqt-flex wpqt-flex-wrap wpqt-justify-center xl:wpqt-justify-start">
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
  );
}

export { PipelineOverviewContent };
