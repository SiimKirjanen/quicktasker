import { fireEvent, render, screen } from "@testing-library/react";
import { PIPELINE_TOGGLE_VIEW } from "../../../../constants";
import * as useAppModule from "../../../../hooks/useApp";
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
jest.mock("./components/BoardOptionsSelection/BoardOptionsSelection", () => ({
  BoardOptionsSelection: () => (
    <>
      <div>Settings</div>
      <div>Automations</div>
      <div>Webhooks</div>
      <div data-testid="board-options-selection" />
    </>
  ),
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
    automationLogsModalOpen: false,
    automationLogsModalSettings: { automationId: null },
  };

  function renderWithProviders(
    ctxOverrides = {},
    modalOverrides = {},
    appOverrides = {},
  ) {
    // Default: user is allowed to manage settings
    const defaultAppState = {
      siteURL: "",
      pluginURL: "",
      publicUserPageId: "",
      is_customFields: true,
      timezone: "",
      isUserAllowedToDelete: false,
      isUserAllowedToManageSettings: true,
      userPageCustomStyles: "",
      taskUploadsURL: "",
      ...appOverrides,
    };
    jest.spyOn(useAppModule, "useApp").mockReturnValue({
      state: defaultAppState,
      appDispatch: jest.fn(),
    });
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

  it("renders export, board options, mode selector, refresh, and dropdown when allowed", () => {
    renderWithProviders();
    expect(screen.getByTestId("export-selection")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
    expect(screen.getByTestId("board-options-selection")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Automations")).toBeInTheDocument();
    expect(screen.getByText("Webhooks")).toBeInTheDocument();
  });

  it("does not render board options when user is not allowed to manage settings", () => {
    renderWithProviders({}, {}, { isUserAllowedToManageSettings: false });
    expect(
      screen.queryByTestId("board-options-selection"),
    ).not.toBeInTheDocument();
  });

  it("calls fetchAndSetPipelineData when refresh icon is clicked", () => {
    renderWithProviders();
    const refreshIcon = screen.getByTestId("refresh-icon");
    fireEvent.click(refreshIcon);
    expect(fetchAndSetPipelineData).toHaveBeenCalledWith("1");
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
      type: PIPELINE_TOGGLE_VIEW,
      payload: PipelineView.TASK,
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
});
