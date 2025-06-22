import { fireEvent, render, screen } from "@testing-library/react";
import { CHANGE_TASK_EXPORT_MODAL_METHOD } from "../../../../constants";
import {
  initialState,
  ModalContext,
} from "../../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../../types/task";
import { PipelineExportTypeSelection } from "./PipelineExportTypeSelection";

describe("TaskExportTypeSelection Component", () => {
  // Mock for modalDispatch
  const mockModalDispatch = jest.fn();

  // Test when PDF is selected
  it("should render with PDF selected", () => {
    const mockContextWithPDF = {
      modalDispatch: mockModalDispatch,
      state: {
        ...initialState,
        taskExportModalSettings: {
          selectedMethod: TaskExportMethods.PDF,
        },
      },
    };

    render(
      <ModalContext.Provider value={mockContextWithPDF}>
        <PipelineExportTypeSelection />
      </ModalContext.Provider>,
    );

    // Check that PDF icon has selected class
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    expect(pdfIcon).toHaveClass("wpqt-border-blue-500");

    // Check that JSON icon doesn't have selected class
    const jsonIcon = screen.getByTestId("task-export-json-icon");
    expect(jsonIcon).not.toHaveClass("wpqt-border-blue-500");
  });

  // Test when JSON is selected
  it("should render with JSON selected", () => {
    const mockContextWithJSON = {
      modalDispatch: mockModalDispatch,
      state: {
        ...initialState,
        taskExportModalSettings: {
          selectedMethod: TaskExportMethods.JSON,
        },
      },
    };

    render(
      <ModalContext.Provider value={mockContextWithJSON}>
        <PipelineExportTypeSelection />
      </ModalContext.Provider>,
    );

    // Check that JSON icon has selected class
    const jsonIcon = screen.getByTestId("task-export-json-icon");
    expect(jsonIcon).toHaveClass("wpqt-border-blue-500");

    // Check that PDF icon doesn't have selected class
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    expect(pdfIcon).not.toHaveClass("wpqt-border-blue-500");
  });

  // Test clicking on PDF icon
  it("should dispatch action when PDF icon is clicked", () => {
    const mockContext = {
      modalDispatch: mockModalDispatch,
      state: {
        ...initialState,
        taskExportModalSettings: {
          selectedMethod: TaskExportMethods.JSON,
        },
      },
    };

    render(
      <ModalContext.Provider value={mockContext}>
        <PipelineExportTypeSelection />
      </ModalContext.Provider>,
    );

    // Click on PDF icon
    fireEvent.click(screen.getByTestId("task-export-pdf-icon"));

    // Check that the correct action was dispatched
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: CHANGE_TASK_EXPORT_MODAL_METHOD,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
  });

  // Test clicking on JSON icon
  it("should dispatch action when JSON icon is clicked", () => {
    const mockContext = {
      modalDispatch: mockModalDispatch,
      state: {
        ...initialState,
        taskExportModalSettings: {
          selectedMethod: TaskExportMethods.PDF,
        },
      },
    };

    render(
      <ModalContext.Provider value={mockContext}>
        <PipelineExportTypeSelection />
      </ModalContext.Provider>,
    );

    // Click on JSON icon
    fireEvent.click(screen.getByTestId("task-export-json-icon"));

    // Check that the correct action was dispatched
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: CHANGE_TASK_EXPORT_MODAL_METHOD,
      payload: { selectedMethod: TaskExportMethods.JSON },
    });
  });

  // Test rendering of icons
  it("should render PDF and JSON icons correctly", () => {
    render(
      <ModalContext.Provider
        value={{
          modalDispatch: mockModalDispatch,
          state: {
            ...initialState,
            taskExportModalSettings: {
              selectedMethod: TaskExportMethods.PDF,
            },
          },
        }}
      >
        <PipelineExportTypeSelection />
      </ModalContext.Provider>,
    );

    // Check for existence of icons
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    const jsonIcon = screen.getByTestId("task-export-json-icon");

    expect(pdfIcon).toBeInTheDocument();
    expect(jsonIcon).toBeInTheDocument();

    // Check proper styling classes
    const pdfIconElement = pdfIcon.querySelector(".wpqt-pdf-red");
    const jsonIconElement = jsonIcon.querySelector(".wpqt-size-5");

    expect(pdfIconElement).toBeInTheDocument();
    expect(jsonIconElement).toBeInTheDocument();
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});
