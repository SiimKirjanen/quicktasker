import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";

import { SET_WEBHOOKS_MODAL_OPEN } from "../../../constants";
import {
  ModalContext,
  ModalContextType,
} from "../../../providers/ModalContextProvider";
import { TaskExportMethods } from "../../../types/task";
import {
  Webhook,
  WebhookTargetAction,
  WebhookTargetType,
} from "../../../types/webhook";
import { mockedWebhooks as baseMockedWebhooks } from "../../../utils/webhook-test.utils"; // <-- use shared mocks
import { WebhooksModal } from "./WebhooksModal";

// Mock i18n to passthrough strings
jest.mock("@wordpress/i18n", () => ({ __: (s: string) => s }));

// Local mutable reference used by the mocked hook
let currentWebhooks: Webhook[] = [];

// Mock useWebhooks hook
jest.mock("../../../hooks/useWebhooks", () => ({
  useWebhooks: () => ({ webhooks: currentWebhooks }),
}));

// Mock Webhook component (just show its id)
jest.mock("./components/Webhook/Webhook", () => ({
  Webhook: ({ webhook }: { webhook: { id: string } }) => (
    <div data-testid="webhook-item">{webhook.id}</div>
  ),
}));

// Mock WPQTModal so we can trigger closeModal without relying on its internals
jest.mock("../WPQTModal", () => ({
  WPQTModal: ({
    modalOpen,
    closeModal,
    children,
    size,
  }: {
    modalOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    size?: string;
  }) => (
    <div data-testid="wpqt-modal" data-open={modalOpen} data-size={size}>
      <button data-testid="close-modal" onClick={closeModal}>
        close
      </button>
      {children}
    </div>
  ),
}));

function buildModalState(
  overrides: Partial<ModalContextType["state"]> = {},
): ModalContextType["state"] {
  return {
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
    webhooksLogsModalSettings: {
      webhookId: null,
    },
    ...overrides,
  };
}

function renderWithContext({
  open = true,
  dispatch = jest.fn(),
}: {
  open?: boolean;
  dispatch?: jest.Mock;
} = {}) {
  const modalState = buildModalState({ webhooksModalOpen: open });

  const value: ModalContextType = {
    state: modalState,
    modalDispatch: dispatch,
  };

  return {
    dispatch,
    ...render(
      <ModalContext.Provider value={value}>
        <WebhooksModal />
      </ModalContext.Provider>,
    ),
  };
}

// Helper to build a minimal valid webhook if custom ones needed
function makeWebhook(
  id: string,
  action: WebhookTargetAction = WebhookTargetAction.CREATE,
): Webhook {
  return {
    id,
    pipeline_id: "p-" + id,
    webhook_url: `https://example.com/${id}`,
    target_type: WebhookTargetType.TASK,
    target_action: action,
    target_id: null,
    created_at: "2024-01-01T00:00:00Z",
    webhook_confirm: false,
  };
}

describe("WebhooksModal", () => {
  beforeEach(() => {
    // start empty unless test sets otherwise
    currentWebhooks = [];
    jest.clearAllMocks();
  });

  it("shows empty message when there are no webhooks", () => {
    currentWebhooks = [];
    renderWithContext();
    expect(screen.getByText("No webhooks found.")).toBeInTheDocument();
    expect(screen.queryByTestId("webhook-item")).toBeNull();
  });

  it("renders list of shared mocked webhooks (from utils)", () => {
    // use subset of shared mocks
    currentWebhooks = baseMockedWebhooks.slice(0, 2);
    renderWithContext();
    const items = screen.getAllByTestId("webhook-item");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent(baseMockedWebhooks[0].id);
    expect(items[1]).toHaveTextContent(baseMockedWebhooks[1].id);
    expect(screen.queryByText("No webhooks found.")).not.toBeInTheDocument();
  });

  it("renders custom constructed webhooks", () => {
    currentWebhooks = [
      makeWebhook("wX"),
      makeWebhook("wY", WebhookTargetAction.UPDATE),
    ];
    renderWithContext();
    const items = screen.getAllByTestId("webhook-item") as HTMLElement[];
    expect(items.map((el: HTMLElement) => el.textContent)).toEqual([
      "wX",
      "wY",
    ]);
  });

  it("passes modal open state to WPQTModal mock", () => {
    currentWebhooks = [];
    renderWithContext({ open: true });
    expect(screen.getByTestId("wpqt-modal")).toHaveAttribute(
      "data-open",
      "true",
    );
  });

  it("dispatches close action when close button clicked", () => {
    currentWebhooks = [baseMockedWebhooks[0]];
    const { dispatch } = renderWithContext({ open: true });
    fireEvent.click(screen.getByTestId("close-modal"));
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_WEBHOOKS_MODAL_OPEN,
      payload: false,
    });
  });
});
