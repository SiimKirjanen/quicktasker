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

function ArhivedTaskChart({ pipelineOverviewData, options, width }: Props) {
  const [chartType, setChartType] = useState<OverviewChartType>("PieChart");

  const chartData = useMemo(
    () => [
      ["Archived tasks", "Task Count"],
      [
        "Archived tasks",
        parseInt(pipelineOverviewData?.archivedTasksCount ?? "0") || 0,
      ],
      [
        "Not archived tasks",
        parseInt(pipelineOverviewData?.notArchivedTasksCount ?? "0") || 0,
      ],
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
          "Not enough data to display archived tasks chart",
          "quicktasker",
        )}
      />
    );
  }

  return (
    <div>
      <p className="wpqt-text-center wpqt-font-semibold wpqt-mb-3 wpqt-text-lg">
        {__("Archived tasks", "quicktasker")}
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

export { ArhivedTaskChart };
