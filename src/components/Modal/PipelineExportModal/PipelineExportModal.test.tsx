import { fireEvent, render, screen } from "@testing-library/react";
import { CLOSE_TASK_EXPORT_MODAL } from "../../../constants";
import {
  AppContext,
  initialState as appContextInitialState,
} from "../../../providers/AppContextProvider";
import {
  initialState,
  ModalContext,
} from "../../../providers/ModalContextProvider";

import { TaskExportMethods } from "../../../types/task";
import { PipelineExportModal } from "./PipelineExportModal";
import { getModalCtaBtnText } from "./export-modal-utils/export-modal-utils";

// Mock the utility function
jest.mock("./export-modal-utils/export-modal-utils", () => ({
  getModalCtaBtnText: jest.fn(() => "Mock Export Button Text"),
}));

// Mock the TypeSelection component
jest.mock("./PipelineExportTypeSelection/PipelineExportTypeSelection", () => ({
  PipelineExportTypeSelection: () => <div data-testid="mock-type-selection" />,
}));

describe("PipelineExportModal Component", () => {
  // Mock for context values
  const mockModalDispatch = jest.fn();
  const mockSiteURL = "https://example.com/wp-admin/admin.php";

  // Default context values
  const defaultModalContext = {
    modalDispatch: mockModalDispatch,
    state: {
      ...initialState,
      taskExportModalOpen: true,
      taskExportModalSettings: {
        selectedMethod: TaskExportMethods.PDF,
      },
    },
  };

  const defaultAppContext = {
    state: {
      ...appContextInitialState,
      siteURL: mockSiteURL,
    },
    appDispatch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders when modal is open", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    expect(screen.getByText("Tasks export")).toBeInTheDocument();
    expect(screen.getByTestId("mock-type-selection")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Filter by task name and desription"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Include board archived tasks"),
    ).toBeInTheDocument();
  });

  it("doesn't render when modal is closed", () => {
    const closedModalContext = {
      ...defaultModalContext,
      state: {
        ...defaultModalContext.state,
        taskExportModalOpen: false,
      },
    };

    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={closedModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    expect(screen.queryByText("Tasks export")).not.toBeInTheDocument();
  });

  it("calls modalDispatch to close modal when close button is clicked", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const closeButton = screen.getByTestId("wpqt-modal-close-button");
    fireEvent.click(closeButton);

    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: CLOSE_TASK_EXPORT_MODAL,
    });
  });

  it("updates search state when input value changes", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const searchInput = screen.getByLabelText(
      "Filter by task name and desription",
    );
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(searchInput).toHaveValue("test search");
  });

  it("toggles archive inclusion when toggle is clicked", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const archiveToggle = screen.getByRole("switch");
    expect(archiveToggle).not.toBeChecked();

    fireEvent.click(archiveToggle);
    expect(archiveToggle).toBeChecked();

    // Verify hidden input value is updated
    const archiveHiddenInput = document.querySelector(
      'input[name="include_archive"]',
    );
    expect(archiveHiddenInput).toHaveValue("1");
  });

  it("includes pipeline_id in form when provided", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const pipelineIdInput = document.querySelector('input[name="pipeline_id"]');
    expect(pipelineIdInput).toHaveValue("123");
  });

  it("doesn't include pipeline_id in form when null", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId={null} />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const pipelineIdInput = document.querySelector('input[name="pipeline_id"]');
    expect(pipelineIdInput).not.toBeInTheDocument();
  });

  it("sets correct form action from siteURL", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const form = document.querySelector("form");
    expect(form).toHaveAttribute("action", mockSiteURL);
  });

  it("sets correct export page based on selected method", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const pageInput = document.querySelector('input[name="wpqt-page"]');
    expect(pageInput).toHaveValue("pdf-export");
  });

  it("calls getModalCtaBtnText with the correct export method", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    expect(getModalCtaBtnText).toHaveBeenCalledWith(TaskExportMethods.PDF);
  });

  it("renders form with correct attributes", () => {
    render(
      <AppContext.Provider value={defaultAppContext}>
        <ModalContext.Provider value={defaultModalContext}>
          <PipelineExportModal pipelineId="123" />
        </ModalContext.Provider>
      </AppContext.Provider>,
    );

    const form = document.querySelector("form");
    expect(form).toHaveAttribute("method", "GET");
    expect(form).toHaveAttribute("target", "_blank");
  });
});
