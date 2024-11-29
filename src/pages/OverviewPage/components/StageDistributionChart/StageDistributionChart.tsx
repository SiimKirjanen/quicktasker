import { __ } from "@wordpress/i18n";
import { Chart, ChartWrapperOptions } from "react-google-charts";
import { PipelineOverviewResponse } from "../../../../types/requestResponse/pipeline-overview-response";
import { hasEnoughDataCheck } from "../../../../utils/statistics";
import { NotEnoughData } from "../NotEnoughData/NotEnoughData";

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
  const hasEnoughData: boolean = hasEnoughDataCheck(stagesPieChartData);

  if (!hasEnoughData) {
    return (
      <NotEnoughData
        text={__(
          "Not enough data to display task distribution by stages chart",
          "quicktasker",
        )}
      />
    );
  }

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
