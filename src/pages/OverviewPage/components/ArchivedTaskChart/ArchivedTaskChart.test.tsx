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
import { ArhivedTaskChart } from "./ArchivedTaskChart";

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

const defaultOptions = { colors: ["red"] };

describe("ArhivedTaskChart", () => {
  it("shows NotEnoughData when both counts are zero", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData()}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.queryByTestId("chart")).toBeNull();
    expect(
      screen.getByText(/Not enough data to display archived tasks chart/),
    ).toBeInTheDocument();
  });

  it("renders chart when archivedTasksCount is non-zero", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData({ archivedTasksCount: "3" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("parses string counts into numbers in chartData", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData({
          archivedTasksCount: "4",
          notArchivedTasksCount: "10",
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1][1]).toBe(4);
    expect(data[2][1]).toBe(10);
  });

  it("falls back to 0 for non-numeric count strings", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData({
          archivedTasksCount: "abc",
          notArchivedTasksCount: "5",
        })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const data = JSON.parse(
      screen.getByTestId("chart").getAttribute("data-chart-data")!,
    );
    expect(data[1][1]).toBe(0);
    expect(data[2][1]).toBe(5);
  });

  it("uses passed options for PieChart", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData({ archivedTasksCount: "1" })}
        options={defaultOptions}
        width="500px"
      />,
    );
    const chart = screen.getByTestId("chart");
    expect(chart.getAttribute("data-chart-type")).toBe("PieChart");
    const opts = JSON.parse(chart.getAttribute("data-chart-options")!);
    expect(opts).toMatchObject(defaultOptions);
  });

  it("switches to BarChart and uses fixed options when BarChart selected", () => {
    render(
      <ArhivedTaskChart
        pipelineOverviewData={makeData({ archivedTasksCount: "1" })}
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
