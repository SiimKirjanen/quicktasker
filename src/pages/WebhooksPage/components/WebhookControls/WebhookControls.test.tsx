import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockedWebhooks } from "../../../../utils/webhook-test.utils";
import { WebhookControls } from "./WebhookControls";

// Mocks
const deleteWebhookMock = jest.fn();
const editWebhookMock = jest.fn();
const pipelineWebhooksDispatchMock = jest.fn();
const modalDispatchMock = jest.fn();

const mockWebhook = mockedWebhooks[0];

jest.mock("../../../../hooks/actions/useWebhookActions", () => ({
  useWebhookActions: () => ({
    deleteWebhook: deleteWebhookMock,
    editWebhook: editWebhookMock,
  }),
}));

jest.mock("../../../../hooks/useWebhooks", () => ({
  useWebhooks: () => ({
    pipelineWebhooksDispatch: pipelineWebhooksDispatchMock,
  }),
}));

jest.mock("@wordpress/element", () => ({
  ...jest.requireActual("@wordpress/element"),
  useContext: () => ({
    modalDispatch: modalDispatchMock,
  }),
}));

jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
}));

// Mock ConfirmTooltip to immediately call onConfirm
jest.mock(
  "../../../../components/Dialog/ConfirmTooltip/ConfirmTooltip",
  () => ({
    WPQTConfirmTooltip: ({
      children,
      onConfirm,
    }: {
      children: (props: {
        onClick: (e: React.MouseEvent) => void;
      }) => React.ReactNode;
      onConfirm: () => void;
    }) => children({ onClick: onConfirm }),
  }),
);

describe("WebhookControls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Logs and Delete buttons", () => {
    render(<WebhookControls webhook={mockWebhook} />);
    expect(screen.getByText("Logs")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls modalDispatch with correct payload when Logs is clicked", () => {
    render(<WebhookControls webhook={mockWebhook} />);
    fireEvent.click(screen.getByText("Logs"));
    expect(modalDispatchMock).toHaveBeenCalledWith({
      type: "OPEN_WEBHOOKS_LOGS_MODAL",
      payload: { webhookId: "w1" },
    });
  });

  it("calls deleteWebhook and pipelineWebhooksDispatch on Delete", async () => {
    deleteWebhookMock.mockResolvedValue({ success: true });
    render(<WebhookControls webhook={mockWebhook} />);
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(deleteWebhookMock).toHaveBeenCalledWith("w1");
      expect(pipelineWebhooksDispatchMock).toHaveBeenCalledWith({
        type: "REMOVE_PIPELINE_WEBHOOK",
        payload: { webhookId: "w1" },
      });
    });
  });

  it("does not dispatch REMOVE_PIPELINE_WEBHOOK if deleteWebhook fails", async () => {
    deleteWebhookMock.mockResolvedValue({ success: false });
    render(<WebhookControls webhook={mockWebhook} />);
    fireEvent.click(screen.getByText("Delete"));
    await waitFor(() => {
      expect(deleteWebhookMock).toHaveBeenCalledWith("w1");
      expect(pipelineWebhooksDispatchMock).not.toHaveBeenCalled();
    });
  });

  it("calls editWebhook and pipelineWebhooksDispatch on activate toggle", async () => {
    editWebhookMock.mockResolvedValue({ success: true });
    render(<WebhookControls webhook={mockWebhook} />);
    // Find the toggle and click it
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(editWebhookMock).toHaveBeenCalledWith("w1", { active: false });
      expect(pipelineWebhooksDispatchMock).toHaveBeenCalledWith({
        type: "EDIT_PIPELINE_WEBHOOK",
        payload: {
          webhookId: "w1",
          webhookData: { active: false },
        },
      });
    });
  });

  it("does not dispatch EDIT_PIPELINE_WEBHOOK if editWebhook fails", async () => {
    editWebhookMock.mockResolvedValue({ success: false });
    render(<WebhookControls webhook={mockWebhook} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(editWebhookMock).toHaveBeenCalledWith("w1", { active: false });
      expect(pipelineWebhooksDispatchMock).not.toHaveBeenCalledWith({
        type: "EDIT_PIPELINE_WEBHOOK",
        payload: expect.anything(),
      });
    });
  });
});
