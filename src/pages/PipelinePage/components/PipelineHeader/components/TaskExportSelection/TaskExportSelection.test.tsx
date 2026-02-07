import { fireEvent, render, screen } from "@testing-library/react";
import { OPEN_TASK_EXPORT_MODAL } from "../../../../../../constants";
import {
  initialState,
  ModalContext,
} from "../../../../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../../../../types/task";
import { TaskExportSelection } from "./TaskExportSelection";

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
    mockModalDispatch.mockClear();
  });

  it('renders "Export" text above the icons', () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("renders both PDF and JSON icons", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    expect(screen.getByTestId("task-export-pdf-icon")).toBeInTheDocument();
    expect(screen.getByTestId("task-export-pdf-json-icon")).toBeInTheDocument();
  });

  it("dispatches the correct action when PDF icon is clicked", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    fireEvent.click(screen.getByTestId("task-export-pdf-icon"));
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
  });

  it("dispatches the correct action when JSON icon is clicked", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    fireEvent.click(screen.getByTestId("task-export-pdf-json-icon"));
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.JSON },
    });
  });

  it("has the correct CSS classes for PDF icon styling", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
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
    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");
    expect(jsonIcon).toHaveClass("wpqt-size-5");
    expect(jsonIcon).toHaveClass("wpqt-cursor-pointer");
    expect(jsonIcon).not.toHaveClass("wpqt-pdf-red");
  });

  it("renders with the correct wrapper classes", () => {
    const { container } = render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    const outerWrapper = container.firstChild;
    expect(outerWrapper).toHaveClass("wpqt-flex");
    expect(outerWrapper).toHaveClass("wpqt-flex-col");
    expect(outerWrapper).toHaveClass("wpqt-items-center");
    expect(outerWrapper).toHaveClass("wpqt-mr-5");
    expect(outerWrapper).toHaveClass("wpqt-gap-1");
  });

  it("ensures modalDispatch is called exactly once per PDF icon click", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    const pdfIcon = screen.getByTestId("task-export-pdf-icon");
    fireEvent.click(pdfIcon);
    fireEvent.click(pdfIcon);
    expect(mockModalDispatch).toHaveBeenCalledTimes(2);
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
  });

  it("ensures modalDispatch is called exactly once per JSON icon click", () => {
    render(
      <ModalContext.Provider value={mockModalContext}>
        <TaskExportSelection />
      </ModalContext.Provider>,
    );
    const jsonIcon = screen.getByTestId("task-export-pdf-json-icon");
    fireEvent.click(jsonIcon);
    fireEvent.click(jsonIcon);
    expect(mockModalDispatch).toHaveBeenCalledTimes(2);
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.JSON },
    });
    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.JSON },
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
    fireEvent.click(pdfIcon);
    fireEvent.click(jsonIcon);
    fireEvent.click(pdfIcon);
    expect(mockModalDispatch).toHaveBeenCalledTimes(3);
    expect(mockModalDispatch).toHaveBeenNthCalledWith(1, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
    expect(mockModalDispatch).toHaveBeenNthCalledWith(2, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.JSON },
    });
    expect(mockModalDispatch).toHaveBeenNthCalledWith(3, {
      type: OPEN_TASK_EXPORT_MODAL,
      payload: { selectedMethod: TaskExportMethods.PDF },
    });
  });
});
