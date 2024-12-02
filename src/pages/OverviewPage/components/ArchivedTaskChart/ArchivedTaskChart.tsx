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
function ArhivedTaskChart({ pipelineOverviewData, options, width }: Props) {
  const archivedPieChartData = [
    ["Archived tasks", "Task Count"],
    [
      "Archived tasks",
      parseInt(pipelineOverviewData?.archivedTasksCount ?? "0") || 0,
    ],
    [
      "Not archived tasks",
      parseInt(pipelineOverviewData?.notArchivedTasksCount ?? "0") || 0,
    ],
  ];
  const hasEnoughData: boolean = hasEnoughDataCheck(archivedPieChartData);

  if (!hasEnoughData) {
    return (
      <NotEnoughData
        text={__(
          "Not enough data to display archived tasks chart",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <Chart
      chartType="PieChart"
      data={archivedPieChartData}
      options={{ ...options, title: "Archived tasks" }}
      width={width}
      height={"400px"}
    />
  );
}

export { ArhivedTaskChart };
