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
import { StageDistributionChart } from "./StageDistributionChart";

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

const defaultOptions = { colors: ["blue"] };

describe("StageDistributionChart", () => {
  it("shows NotEnoughData when stages array is empty", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData()}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.queryByTestId("chart")).toBeNull();
    expect(
      screen.getByText(/Not enough data to display task distribution/),
    ).toBeInTheDocument();
  });

  it("shows NotEnoughData when all stages have zero task count", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [
            { id: "s1", name: "To Do", tasksCount: "0" },
            { id: "s2", name: "Done", tasksCount: "0" },
          ],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.queryByTestId("chart")).toBeNull();
  });

  it("renders chart when a stage has tasks", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [{ id: "s1", name: "To Do", tasksCount: "5" }],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("maps stage names and parses task counts into chartData rows", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [
            { id: "s1", name: "To Do", tasksCount: "3" },
            { id: "s2", name: "In Progress", tasksCount: "7" },
          ],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1]).toEqual(["To Do", 3]);
    expect(data[2]).toEqual(["In Progress", 7]);
  });

  it("falls back to 0 for non-numeric tasksCount", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [
            { id: "s1", name: "To Do", tasksCount: "abc" },
            { id: "s2", name: "Done", tasksCount: "4" },
          ],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1]).toEqual(["To Do", 0]);
    expect(data[2]).toEqual(["Done", 4]);
  });

  it("switches to ColumnChart when ColumnChart button is clicked", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [{ id: "s1", name: "To Do", tasksCount: "2" }],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    fireEvent.click(screen.getByTitle("Column"));
    expect(screen.getByTestId("chart").getAttribute("data-chart-type")).toBe(
      "ColumnChart",
    );
  });

  it("uses fixed options for non-PieChart types", () => {
    render(
      <StageDistributionChart
        pipelineOverviewData={makeData({
          stages: [{ id: "s1", name: "To Do", tasksCount: "2" }],
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    fireEvent.click(screen.getByTitle("Bar"));
    const opts = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-options")!,
    );
    expect(opts).not.toMatchObject(defaultOptions);
    expect(opts.legend).toBeDefined();
  });
});
