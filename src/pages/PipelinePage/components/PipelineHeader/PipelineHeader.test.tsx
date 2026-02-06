import { fireEvent, render, screen } from "@testing-library/react";
import { ActivePipelineContext } from "../../../../providers/ActivePipelineContextProvider";
import {
  ModalContext,
  State as ModalState,
} from "../../../../providers/ModalContextProvider";
import { PipelineView } from "../../../../types/pipeline";
import { TaskExportMethods } from "../../../../types/task";
import { PipelineHeader } from "./PipelineHeader";

// Mock child components
jest.mock(
  "../../../../components/Dropdown/PipelineSelectionDropdown/PipelineSelectionDropdown",
  () => ({
    PipelineSelectionDropdown: () => <div data-testid="dropdown" />,
  }),
);
jest.mock("./components/TaskExportSelection/TaskExportSelection", () => ({
  TaskExportSelection: () => <div data-testid="export-selection" />,
}));
jest.mock("../../../../components/Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading" />,
}));

describe("PipelineHeader", () => {
  const activePipeline = {
    id: "1",
    name: "Pipeline 1",
    description: "A pipeline",
    is_primary: true,
  };

  const fetchAndSetPipelineData = jest.fn();
  const modalDispatch = jest.fn();

  // Define a default modal state for your tests
  const defaultModalState: ModalState = {
    taskModalOpen: false,
    targetStageId: "",
    taskToEdit: null,
    taskModalSettings: { allowToMarkTaskAsDone: true },
    moveTaskModalOpen: false,
    stageModalOpen: false,
    stageToEdit: null,
    targetPipelineId: "",
    pipelineModalOpen: false,
    newPipelineModalOpen: false,
    pipelineToEdit: null,
    archiveTaskModalOpen: false,
    archiveModalTask: null,
    userModalOpen: false,
    userToEdit: null,
    userSettingsModalOpen: false,
    taskColorModalOpen: false,
    taskExportModalOpen: false,
    taskExportModalSettings: { selectedMethod: TaskExportMethods.PDF },
    pipelineImportModalOpen: false,
    automationCreatorModalOpen: false,
    automationsModalOpen: false,
    archiveSettingsModalOpen: false,
    taskRestoreModalOpen: false,
    taskRestoreModalSettings: { taskToRestore: null },
    customFieldCreatorModalOpen: false,
    customFieldRecoveryModalOpen: false,
    webhookCreationModalOpen: false,
    webhooksModalOpen: false,
    webhooksLogsModalOpen: false,
    webhooksLogsModalSettings: { webhookId: null },
  };

  function renderWithProviders(ctxOverrides = {}, modalOverrides = {}) {
    return render(
      <ActivePipelineContext.Provider
        value={{
          state: {
            activePipeline,
            loading: false,
            view: PipelineView.PIPELINE,
          },
          fetchAndSetPipelineData,
          dispatch: jest.fn(),
          ...ctxOverrides,
        }}
      >
        <ModalContext.Provider
          value={{
            state: defaultModalState,
            modalDispatch,
            ...modalOverrides,
          }}
        >
          <PipelineHeader />
        </ModalContext.Provider>
      </ActivePipelineContext.Provider>,
    );
  }

  it("renders pipeline name and description", () => {
    renderWithProviders();
    expect(screen.getByText("Pipeline 1")).toBeInTheDocument();
    expect(screen.getByText("A pipeline")).toBeInTheDocument();
  });

  it("renders export, mode selector, refresh, and dropdown", () => {
    renderWithProviders();
    expect(screen.getByTestId("export-selection")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
  });

  it("calls fetchAndSetPipelineData when refresh icon is clicked", () => {
    renderWithProviders();
    const refreshIcon = screen.getByTestId("refresh-icon");
    fireEvent.click(refreshIcon);
    expect(fetchAndSetPipelineData).toHaveBeenCalledWith("1");
  });

  it("calls modalDispatch when edit icon is clicked", () => {
    renderWithProviders();
    // Find the edit icon by class
    const editIcon = Array.from(document.querySelectorAll("svg")).find((el) =>
      el.classList.contains("wpqt-text-gray-400"),
    );
    expect(editIcon).toBeTruthy();
    fireEvent.click(editIcon!);
    expect(modalDispatch).toHaveBeenCalledWith({
      type: "OPEN_EDIT_PIPELINE_MODAL",
      payload: { pipelineToEdit: activePipeline },
    });
  });

  it("shows loading indicator when loading", () => {
    renderWithProviders({
      state: { activePipeline, loading: true, view: PipelineView.PIPELINE },
    });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("returns null if no activePipeline", () => {
    const { container } = render(
      <ActivePipelineContext.Provider
        value={{
          state: {
            activePipeline: null,
            loading: false,
            view: PipelineView.PIPELINE,
          },
          fetchAndSetPipelineData,
          dispatch: jest.fn(),
        }}
      >
        <ModalContext.Provider
          value={{ state: defaultModalState, modalDispatch }}
        >
          <PipelineHeader />
        </ModalContext.Provider>
      </ActivePipelineContext.Provider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it("toggles view when PipelineModeSelector is clicked", () => {
    const dispatch = jest.fn();
    render(
      <ActivePipelineContext.Provider
        value={{
          state: {
            activePipeline,
            loading: false,
            view: PipelineView.PIPELINE,
          },
          fetchAndSetPipelineData,
          dispatch,
        }}
      >
        <ModalContext.Provider
          value={{ state: defaultModalState, modalDispatch }}
        >
          <PipelineHeader />
        </ModalContext.Provider>
      </ActivePipelineContext.Provider>,
    );
    fireEvent.click(screen.getByText(/Switch to Task view/i));
    expect(dispatch).toHaveBeenCalledWith({
      type: "TOGGLE_VIEW",
      payload: "TASK-VIEW",
    });
  });
});
