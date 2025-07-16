import { fireEvent, render, screen } from "@testing-library/react";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { Option } from "../WPQTSelect";
import { PipelineFilterSelect } from "./PipelineFilterSelect";

// Mock the WPQTSelect component
jest.mock("../WPQTSelect", () => ({
  WPQTSelect: ({
    options,
    selectedOptionValue,
    onSelectionChange,
  }: {
    options: Option[];
    selectedOptionValue: string;
    onSelectionChange: (value: string) => void;
  }) => (
    <select
      data-testid="wpqt-select"
      value={selectedOptionValue}
      onChange={(e) => onSelectionChange(e.target.value)}
    >
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

describe("PipelineFilterSelect Component", () => {
  const mockPipelines = [
    { id: "pipeline1", name: "Pipeline 1", is_primary: false },
    { id: "pipeline2", name: "Pipeline 2", is_primary: false },
    { id: "pipeline3", name: "Pipeline 3", is_primary: false },
  ];

  const mockContextValue = {
    state: { pipelines: mockPipelines },
    pipelinesDispatch: jest.fn(),
  };

  const defaultProps: {
    selectedOptionValue: string;
    selectionChange: jest.Mock<(value: string) => void>;
    extraOptions?: Option[];
  } = {
    selectedOptionValue: "",
    selectionChange: jest.fn(),
  };

  const renderWithContext = (props = defaultProps) => {
    return render(
      <PipelinesContext.Provider value={mockContextValue}>
        <PipelineFilterSelect {...props} />
      </PipelinesContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders select with pipeline options", () => {
    renderWithContext();

    expect(screen.getByTestId("wpqt-select")).toBeInTheDocument();
    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("Pipeline 2")).toBeInTheDocument();
    expect(screen.getByText("Pipeline 3")).toBeInTheDocument();
  });

  test("displays selected value", () => {
    renderWithContext({
      ...defaultProps,
      selectedOptionValue: "pipeline2",
    });

    const select = screen.getByTestId("wpqt-select");
    expect(select).toHaveValue("pipeline2");
  });

  test("calls selectionChange when selection changes", () => {
    const mockSelectionChange = jest.fn();
    renderWithContext({
      ...defaultProps,
      selectionChange: mockSelectionChange,
    });

    const select = screen.getByTestId("wpqt-select");
    fireEvent.change(select, { target: { value: "pipeline1" } });

    expect(mockSelectionChange).toHaveBeenCalledWith("pipeline1");
    expect(mockSelectionChange).toHaveBeenCalledTimes(1);
  });

  test("includes extra options when provided", () => {
    const extraOptions: Option[] = [
      { value: "extra1", label: "Extra Option 1" },
      { value: "extra2", label: "Extra Option 2" },
    ];

    renderWithContext({
      ...defaultProps,
      extraOptions,
    });

    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("Extra Option 1")).toBeInTheDocument();
    expect(screen.getByText("Extra Option 2")).toBeInTheDocument();
  });

  test("works without extra options", () => {
    renderWithContext();

    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("Pipeline 2")).toBeInTheDocument();
    expect(screen.getByText("Pipeline 3")).toBeInTheDocument();
  });

  test("handles empty pipelines array", () => {
    const emptyContextValue = {
      state: { pipelines: [] },
      pipelinesDispatch: jest.fn(),
    };

    render(
      <PipelinesContext.Provider value={emptyContextValue}>
        <PipelineFilterSelect {...defaultProps} />
      </PipelinesContext.Provider>,
    );

    const select = screen.getByTestId("wpqt-select");
    expect(select).toBeInTheDocument();
    // Should not have any pipeline options
    expect(screen.queryByText("Pipeline 1")).not.toBeInTheDocument();
  });

  test("handles empty pipelines with extra options", () => {
    const emptyContextValue = {
      state: { pipelines: [] },
      pipelinesDispatch: jest.fn(),
    };

    const extraOptions: Option[] = [
      { value: "extra1", label: "Extra Option 1" },
    ];

    render(
      <PipelinesContext.Provider value={emptyContextValue}>
        <PipelineFilterSelect {...defaultProps} extraOptions={extraOptions} />
      </PipelinesContext.Provider>,
    );

    expect(screen.getByText("Extra Option 1")).toBeInTheDocument();
    expect(screen.queryByText("Pipeline 1")).not.toBeInTheDocument();
  });

  test("maintains option order with pipelines first, then extra options", () => {
    const extraOptions: Option[] = [
      { value: "extra1", label: "Extra Option 1" },
    ];

    renderWithContext({
      ...defaultProps,
      extraOptions,
    });

    const select = screen.getByTestId("wpqt-select");
    const options = select.querySelectorAll("option");

    // Verify pipeline options come first
    expect(options[0]).toHaveTextContent("Pipeline 1");
    expect(options[1]).toHaveTextContent("Pipeline 2");
    expect(options[2]).toHaveTextContent("Pipeline 3");
    // Then extra options
    expect(options[3]).toHaveTextContent("Extra Option 1");
  });

  test("updates options when pipelines context changes", () => {
    const { rerender } = renderWithContext();

    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();

    // Update context with new pipelines - fix the property name
    const newContextValue = {
      state: {
        pipelines: [
          { id: "newPipeline1", name: "New Pipeline 1", is_primary: false },
          { id: "newPipeline2", name: "New Pipeline 2", is_primary: false },
        ],
      },
      pipelinesDispatch: jest.fn(),
    };

    rerender(
      <PipelinesContext.Provider value={newContextValue}>
        <PipelineFilterSelect {...defaultProps} />
      </PipelinesContext.Provider>,
    );

    expect(screen.getByText("New Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("New Pipeline 2")).toBeInTheDocument();
    expect(screen.queryByText("Pipeline 1")).not.toBeInTheDocument();
  });
});
