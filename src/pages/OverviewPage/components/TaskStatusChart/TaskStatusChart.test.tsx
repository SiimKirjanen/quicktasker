import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-google-charts", () => ({
  Chart: ({ chartType, data, options }: Record<string, unknown>) => (
    <div
      data-testid="chart"
      data-chart-type={chartType as string}
      data-chart-data={JSON.stringify(data)}
      data-chart-options={JSON.stringify(options)}
    />
  ),
}));

jest.mock("react-icons/tb", () => ({
  TbChartBar: () => <span />,
  TbChartPie: () => <span />,
  TbChartHistogram: () => <span />,
}));

import { PipelineOverviewResponse } from "../../../../types/requestResponse/pipeline-overview-response";
import { TaskStatusChart } from "./TaskStatusChart";

function makeData(
  overrides: Partial<PipelineOverviewResponse> = {},
): PipelineOverviewResponse {
  return {
    archivedTasksCount: "0",
    notArchivedTasksCount: "0",
    doneTasksCount: "0",
    notDoneTasksCount: "0",
    overdueTasksCount: "0",
    totalTasksCount: "0",
    stages: [],
    ...overrides,
  };
}

const defaultOptions = { colors: ["green"] };

describe("TaskStatusChart", () => {
  it("shows NotEnoughData when both counts are zero", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData()}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.queryByTestId("chart")).toBeNull();
    expect(
      screen.getByText(/Not enough data to display task status chart/),
    ).toBeInTheDocument();
  });

  it("renders chart when doneTasksCount is non-zero", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({ doneTasksCount: "5" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("renders chart when notDoneTasksCount is non-zero", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({ notDoneTasksCount: "2" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("parses string counts into numbers in chartData", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({
          doneTasksCount: "6",
          notDoneTasksCount: "14",
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1]).toEqual(["Done", 6]);
    expect(data[2]).toEqual(["Not Done", 14]);
  });

  it("falls back to 0 for non-numeric count strings", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({
          doneTasksCount: "N/A",
          notDoneTasksCount: "3",
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1]).toEqual(["Done", 0]);
    expect(data[2]).toEqual(["Not Done", 3]);
  });

  it("defaults to PieChart and uses passed options", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({ doneTasksCount: "1" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const chart = screen.getByTestId("chart");
    expect(chart.getAttribute("data-chart-type")).toBe("PieChart");
    const opts = JSON.parse(chart.getAttribute("data-chart-options")!);
    expect(opts).toMatchObject(defaultOptions);
  });

  it("switches chart type and uses fixed options for BarChart", () => {
    render(
      <TaskStatusChart
        pipelineOverviewData={makeData({ doneTasksCount: "1" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    fireEvent.click(screen.getByTitle("Bar"));
    const chart = screen.getByTestId("chart");
    expect(chart.getAttribute("data-chart-type")).toBe("BarChart");
    const opts = JSON.parse(chart.getAttribute("data-chart-options")!);
    expect(opts).not.toMatchObject(defaultOptions);
    expect(opts.legend).toBeDefined();
  });
});
