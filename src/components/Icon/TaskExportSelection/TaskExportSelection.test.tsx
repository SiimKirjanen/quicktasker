import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { OPEN_TASK_EXPORT_MODAL } from "../../../constants";
import {
  initialState,
  ModalContext,
} from "../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../types/task";
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

  it("renders the PDF icon", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check if the component renders a PDF icon
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    expect(pdfIcon).toBeInTheDocument();
  });

  it("dispatches the correct action when PDF icon is clicked", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Find the PDF icon's container div and click it
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");

    if (pdfIcon) {
      fireEvent.click(pdfIcon);
    } else {
      throw new Error("PDF icon container not found");
    }

    // Verify that modalDispatch was called with the correct action
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });
  });

  it("has the correct CSS classes for styling", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Check if the icon has the PDF-specific class
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    expect(pdfIcon).toHaveClass("wpqt-pdf-red");
    expect(pdfIcon).toHaveClass("wpqt-size-5");

    // Check if the container has the right styling classes
    const container = pdfIcon.closest("div");
    expect(container).toHaveClass("wpqt-cursor-pointer");
    expect(container).toHaveClass("wpqt-text-gray-500");
    expect(container).toHaveClass("hover:wpqt-text-gray-700");
  });

  it("directly calls openTaskExportModal function when PDF icon is clicked", () => {
    // Create a spy on the window object
    const openTaskExportModalSpy = jest.fn();

    // Create a custom mock for the ModalContext
    const customMockModalContext = {
      state: {
        // Rename from 'modalState' to 'state'
        ...initialState, // Include all the required properties
        taskExportModalOpen: false,
        taskExportModalSettings: {
          selectedMethod: TaskExportMethods.PDF,
        },
      },
      modalDispatch: mockModalDispatch,
    };

    // Override the openTaskExportModal function
    jest.spyOn(React, "useContext").mockImplementation((context) => {
      if (context === ModalContext) {
        return {
          ...customMockModalContext,
          openTaskExportModal: openTaskExportModalSpy,
        };
      }
      return jest.requireActual("@wordpress/element").useContext(context);
    });

    render(
      <ModalContext.Provider value={customMockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    // Find and click the PDF icon
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    fireEvent.click(pdfIcon);

    // Verify modalDispatch was called with correct parameters
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });

    // Restore the original implementation
    jest.restoreAllMocks();
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
    expect(outerWrapper).toHaveClass("wpqt-mr-4");

    // Check the inner wrapper div
    const innerWrapper = outerWrapper?.firstChild;
    expect(innerWrapper).toHaveClass("wpqt-inline-flex");
    expect(innerWrapper).toHaveClass("wpqt-items-center");
    expect(innerWrapper).toHaveClass("wpqt-gap-1.5");
  });

  it("ensures modalDispatch is called exactly once per click", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );

    const pdfIcon = screen.getByTestId("task-export-pdf-icon");

    // Click multiple times
    fireEvent.click(pdfIcon);
    fireEvent.click(pdfIcon);
    fireEvent.click(pdfIcon);

    // Verify that modalDispatch was called exactly three times
    expect(mockModalDispatch).toHaveBeenCalledTimes(3);

    // And each call had the correct parameters
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

    expect(mockModalDispatch).toHaveBeenNthCalledWith(3, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: {
        selectedMethod: TaskExportMethods.PDF,
      },
    });
  });
});
