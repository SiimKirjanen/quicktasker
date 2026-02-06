import { fireEvent, render, screen } from "@testing-library/react";
import { OPEN_TASK_EXPORT_MODAL } from "../../../../../../constants";
import {
  initialState,
  ModalContext,
} from "../../../../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../../../../types/task";
import { TaskExportSelection } from "./TaskExportSelection";

// Mock the ModalContext
const mockModalDispatch = jest.fn();
const mockModalContext = {
  state: {
    ...initialState,
    taskExportModalOpen: false,
    taskExportModalSettings: {
      selectedMethod: TaskExportMethods.PDF,
    },
  },
  modalDispatch: mockModalDispatch,
};

describe("TaskExportSelection Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    mockModalDispatch.mockClear();
  });

  it("renders both PDF and JSON icons", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check if the component renders both icons
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");

    expect(pdfIcon).toBeInTheDocument();
    expect(jsonIcon).toBeInTheDocument();
  });

  it("dispatches the correct action when PDF icon is clicked", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    fireEvent.click(pdfIcon);

    // Verify that modalDispatch was called with the correct action for PDF
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });
  });

  it("dispatches the correct action when JSON icon is clicked", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");
    fireEvent.click(jsonIcon);

    // Verify that modalDispatch was called with the correct action for JSON
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.JSON,
      },
    });
  });

  it("has the correct CSS classes for PDF icon styling", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check if the PDF icon has the correct classes
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    expect(pdfIcon).toHaveClass("wpqt-pdf-red");
    expect(pdfIcon).toHaveClass("wpqt-size-5");
    expect(pdfIcon).toHaveClass("wpqt-cursor-pointer");
  });

  it("has the correct CSS classes for JSON icon styling", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check if the JSON icon has the correct classes
    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");
    expect(jsonIcon).toHaveClass("wpqt-size-5");
    expect(jsonIcon).toHaveClass("wpqt-cursor-pointer");
    // JSON icon doesn't have wpqt-pdf-red class
    expect(jsonIcon).not.toHaveClass("wpqt-pdf-red");
  });

  it("renders with the correct wrapper classes", () => {
    const { container } = render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check the outer wrapper div
    const outerWrapper = container.firstChild;
    expect(outerWrapper).toHaveClass("wpqt-flex");
    expect(outerWrapper).toHaveClass("wpqt-mr-5");
    expect(outerWrapper).toHaveClass("wpqt-gap-2");
  });

  it("ensures modalDispatch is called exactly once per PDF icon click", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const pdfIcon = screen.getByTestId("task-export-pdf-icon");

    // Click multiple times
    fireEvent.click(pdfIcon);
    fireEvent.click(pdfIcon);

    // Verify that modalDispatch was called exactly twice
    expect(mockModalDispatch).toHaveBeenCalledTimes(2);

    // And each call had the correct parameters for PDF
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });

    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });
  });

  it("ensures modalDispatch is called exactly once per JSON icon click", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");

    // Click multiple times
    fireEvent.click(jsonIcon);
    fireEvent.click(jsonIcon);

    // Verify that modalDispatch was called exactly twice
    expect(mockModalDispatch).toHaveBeenCalledTimes(2);

    // And each call had the correct parameters for JSON
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.JSON,
      },
    });

    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.JSON,
      },
    });
  });

  it("properly handles alternating clicks between PDF and JSON icons", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");

    // Click alternating between icons
    fireEvent.click(pdfIcon);
    fireEvent.click(jsonIcon);
    fireEvent.click(pdfIcon);

    // Verify that modalDispatch was called exactly three times
    expect(mockModalDispatch).toHaveBeenCalledTimes(3);

    // Each call should have the correct payload for the corresponding icon
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });

    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.JSON,
      },
    });

    expect(mockModalDispatch).toHaveBeenNthCalledWith(3, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });
  });
});
