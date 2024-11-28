import { Chart, ChartWrapperOptions } from "react-google-charts";
import { PipelineOverviewResponse } from "../../../../types/requestResponse/pipeline-overview-response";

type Props = {
  pipelineOverviewData: PipelineOverviewResponse;
  options: ChartWrapperOptions["options"];
};
function StageDistributionChart({ pipelineOverviewData, options }: Props) {
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
      width={"600px"}
      height={"400px"}
    />
  );
}

export { StageDistributionChart };
