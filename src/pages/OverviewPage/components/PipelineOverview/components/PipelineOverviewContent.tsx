import { useEffect, useState } from "@wordpress/element";
import { getPipelineOverviewData } from "../../../../../api/api";
import { Loading } from "../../../../../components/Loading/Loading";
import { SET_PIPELINE_MISSING } from "../../../../../constants";
import { useMissingContent } from "../../../../../hooks/useMissingContent";
import { useMissingResourceDetection } from "../../../../../hooks/useMissingResourceDetection";
import { PipelineOverviewFilter } from "../../../../../types/overview";
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
  pipelineId: string;
  overviewFilter: PipelineOverviewFilter;
};
function PipelineOverviewContent({ pipelineId, overviewFilter }: Props) {
  const [pipelineOverviewData, setPipelineOverviewData] =
    useState<PipelineOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { detectMissingResources } = useMissingResourceDetection();
  const { dispatch } = useMissingContent();

  useEffect(() => {
    const fetchPipelineOverview = async () => {
      try {
        setLoading(true);
        const response = await getPipelineOverviewData(
          pipelineId,
          overviewFilter,
        );
        setPipelineOverviewData(response.data);
      } catch (error) {
        console.error(error);

        if (detectMissingResources(error).detected) {
          dispatch({ type: SET_PIPELINE_MISSING, payload: true });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPipelineOverview();
  }, [pipelineId, overviewFilter]);

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
