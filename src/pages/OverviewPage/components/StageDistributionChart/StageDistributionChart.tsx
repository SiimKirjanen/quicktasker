import { Chart, ChartWrapperOptions } from "react-google-charts";
import { PipelineOverviewResponse } from "../../../../types/requestResponse/pipeline-overview-response";

type Props = {
  pipelineOverviewData: PipelineOverviewResponse;
  options: ChartWrapperOptions["options"];
  width: string;
};
function StageDistributionChart({
  pipelineOverviewData,
  options,
  width,
}: Props) {
  const stagesPieChartData = [
    ["Stage", "Task Count"],
    ...(pipelineOverviewData?.stages.map((stage) => [
      stage.name,
      parseInt(stage.tasksCount) || 0,
    ]) ?? []),
  ];
  return (
    <Chart
      chartType="PieChart"
      data={stagesPieChartData}
      options={{ ...options, title: "Task distribution by stages" }}
      width={width}
      height={"400px"}
    />
  );
}

export { StageDistributionChart };
