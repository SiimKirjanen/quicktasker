// src/pages/WebhooksPage/components/PipelineWebhooksInfo/PipelineWebhooksInfo.test.tsx
import { render, screen } from "@testing-library/react";
import * as i18nModule from "@wordpress/i18n";
import * as webhooksModule from "../../../../hooks/useWebhooks";
import {
  WebhookTargetAction,
  WebhookTargetType,
} from "../../../../types/webhook";
import { PipelineWebhooksInfo } from "./PipelineWebhooksInfo";

jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
  sprintf: (str: string, num: number) => str.replace("%d", num.toString()),
}));

describe("PipelineWebhooksInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(i18nModule, "__").mockImplementation((str) => str);
    jest
      .spyOn(i18nModule, "sprintf")
      .mockImplementation((str, num) => str.replace("%d", num.toString()));
  });

  it("shows no webhooks message when webhooks is empty", () => {
    jest.spyOn(webhooksModule, "useWebhooks").mockReturnValue({
      webhooks: [],
      loading: false,
      pipelineWebhooksDispatch: jest.fn(),
    });
    render(<PipelineWebhooksInfo />);
    expect(
      screen.getByText("There are no webhooks configured for this board."),
    ).toBeInTheDocument();
  });

  it("shows webhooks count when webhooks exist", () => {
    jest.spyOn(webhooksModule, "useWebhooks").mockReturnValue({
      webhooks: [
        {
          id: "1",
          pipeline_id: "1",
          target_type: "webhook" as WebhookTargetType,
          target_id: "1",
          target_action: "test" as WebhookTargetAction,
          webhook_url: "https://example.com/webhook1",
          active: true,
          created_at: "2024-01-01",
          webhook_confirm: false,
        },
        {
          id: "2",
          pipeline_id: "1",
          target_type: "webhook" as WebhookTargetType,
          target_id: "2",
          target_action: "test" as WebhookTargetAction,
          webhook_url: "https://example.com/webhook2",
          active: true,
          created_at: "2024-01-01",
          webhook_confirm: false,
        },
      ],
      loading: false,
      pipelineWebhooksDispatch: jest.fn(),
    });
    render(<PipelineWebhooksInfo />);
    expect(
      screen.getByText("There are 2 webhooks configured for this board."),
    ).toBeInTheDocument();
  });

  it("shows no webhooks message when webhooks is undefined", () => {
    jest.spyOn(webhooksModule, "useWebhooks").mockReturnValue({
      webhooks: [],
      loading: false,
      pipelineWebhooksDispatch: jest.fn(),
    });
    render(<PipelineWebhooksInfo />);
    expect(
      screen.getByText("There are no webhooks configured for this board."),
    ).toBeInTheDocument();
  });
});
