import { fireEvent, render, screen } from "@testing-library/react";
import { useApp } from "../../../hooks/useApp";
import {
  ModalContext,
  initialState as modalInitialState,
} from "../../../providers/ModalContextProvider";
import { PipelinesContext } from "../../../providers/PipelinesContextProvider";
import { PipelineSelectionDropdown } from "./PipelineSelectionDropdown";

jest.mock("../../../hooks/useApp");

const mockPipelines = [
  { id: "1", name: "Pipeline 1", is_primary: true },
  { id: "2", name: "Pipeline 2", is_primary: false },
];

const pipelinesDispatch = jest.fn();
const modalDispatch = jest.fn();
const onPipelineClick = jest.fn();

function renderDropdown(props = {}) {
  (useApp as jest.Mock).mockReturnValue({
    state: { isUserAllowedToManageSettings: true },
  });
  return render(
    <PipelinesContext.Provider
      value={{ state: { pipelines: mockPipelines }, pipelinesDispatch }}
    >
      <ModalContext.Provider
        value={{ state: { ...modalInitialState }, modalDispatch }}
      >
        <PipelineSelectionDropdown
          activePipeline={mockPipelines[0]}
          onPipelineClick={onPipelineClick}
          {...props}
        />
      </ModalContext.Provider>
    </PipelinesContext.Provider>,
  );
}

describe("PipelineSelectionDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders pipeline names", () => {
    renderDropdown();
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    expect(screen.getAllByText("Pipeline 1").length).toBeGreaterThan(1);
    expect(screen.getByText("Pipeline 2")).toBeInTheDocument();
  });

  it("calls onPipelineClick when a pipeline is clicked", () => {
    renderDropdown();
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    fireEvent.click(screen.getByText("Pipeline 2"));
    expect(onPipelineClick).toHaveBeenCalledWith("2");
  });

  it("shows star icon for primary pipeline", () => {
    renderDropdown();
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    // Check for the blue star icon by its class
    expect(document.querySelector(".wpqt-text-blue-500")).toBeInTheDocument();
  });

  it("shows action buttons when enableActions is true", () => {
    renderDropdown({ enableActions: true });
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    expect(screen.getByText("Add new board")).toBeInTheDocument();
    expect(screen.getByText("Import existing")).toBeInTheDocument();
  });

  it("does not show action buttons when enableActions is false", () => {
    renderDropdown({ enableActions: false });
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    expect(screen.queryByText("Add new board")).not.toBeInTheDocument();
    expect(screen.queryByText("Import existing")).not.toBeInTheDocument();
  });

  it("calls modalDispatch when add new board is clicked", () => {
    renderDropdown();
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    fireEvent.click(screen.getByText("Add new board"));
    expect(modalDispatch).toHaveBeenCalled();
  });

  it("calls modalDispatch when import existing is clicked", () => {
    renderDropdown();
    fireEvent.click(screen.getAllByText("Pipeline 1")[0]);
    fireEvent.click(screen.getByText("Import existing"));
    expect(modalDispatch).toHaveBeenCalled();
  });
});
