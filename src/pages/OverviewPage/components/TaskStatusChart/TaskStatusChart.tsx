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
function TaskStatusChart({ pipelineOverviewData, options, width }: Props) {
  const taskDonePieChartData = [
    ["Task status", "Task Count"],
    ["Done", parseInt(pipelineOverviewData?.doneTasksCount ?? "0") || 0],
    ["Not Done", parseInt(pipelineOverviewData?.notDoneTasksCount ?? "0") || 0],
  ];
  const hasEnoughData: boolean = hasEnoughDataCheck(taskDonePieChartData);

  if (!hasEnoughData) {
    return (
      <NotEnoughData
        text={__("Not enough data to display task status chart", "quicktasker")}
      />
    );
  }

  return (
    <Chart
      chartType="PieChart"
      data={taskDonePieChartData}
      options={{ ...options, title: "Task status" }}
      width={width}
      height={"400px"}
    />
  );
}

export { TaskStatusChart };
