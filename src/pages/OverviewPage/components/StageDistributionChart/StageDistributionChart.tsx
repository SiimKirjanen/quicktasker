import { useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Chart, ChartWrapperOptions } from "react-google-charts";
import { PipelineOverviewResponse } from "../../../../types/requestResponse/pipeline-overview-response";
import { hasEnoughDataCheck } from "../../../../utils/statistics";
import {
  ChartTypeSelector,
  OverviewChartType,
} from "../ChartTypeSelector/ChartTypeSelector";
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
  const [chartType, setChartType] = useState<OverviewChartType>("PieChart");

  const chartData = useMemo(
    () => [
      ["Stage", "Task Count"],
      ...(pipelineOverviewData?.stages.map((stage) => [
        stage.name,
        parseInt(stage.tasksCount) || 0,
      ]) ?? []),
    ],
    [pipelineOverviewData],
  );

  const chartOptions = useMemo(
    () =>
      chartType === "PieChart"
        ? { ...options }
        : { legend: { position: "none" }, chartArea: { top: 16 } },
    [chartType, options],
  );

  const hasEnoughData: boolean = hasEnoughDataCheck(chartData);

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
    <div>
      <p className="wpqt-text-center wpqt-font-semibold wpqt-mb-3 wpqt-text-lg">
        {__("Task distribution by stages", "quicktasker")}
      </p>
      <ChartTypeSelector value={chartType} onChange={setChartType} />
      <Chart
        chartType={chartType}
        data={chartData}
        options={chartOptions}
        width={width}
        height={"400px"}
      />
    </div>
  );
}

export { StageDistributionChart };
