import { render, screen } from "@testing-library/react";
import {
  formatIntegrationCount,
  StoppedIntegrationsWarning,
} from "./StoppedIntegrationsWarning";

const integration = {
  pipeline_id: 3,
  api_token_count: 0,
  webhook_count: 0,
  automation_count: 0,
};

describe("formatIntegrationCount", () => {
  it("lists API tokens, webhooks and automations", () => {
    expect(
      formatIntegrationCount({
        ...integration,
        api_token_count: 1,
        webhook_count: 2,
        automation_count: 3,
      }),
    ).toBe("1 API token, 2 webhooks and 3 automations");
  });

  it("leaves out the kinds there are none of", () => {
    expect(
      formatIntegrationCount({
        ...integration,
        api_token_count: 2,
        automation_count: 1,
      }),
    ).toBe("2 API tokens and 1 automation");
    expect(
      formatIntegrationCount({ ...integration, automation_count: 2 }),
    ).toBe("2 automations");
  });
});

describe("StoppedIntegrationsWarning", () => {
  it("links to the automations when only automations stopped", () => {
    render(
      <StoppedIntegrationsWarning
        integration={{ ...integration, automation_count: 1 }}
        message="1 automation won't work."
      />,
    );

    expect(screen.getByText("Open automations")).toHaveAttribute(
      "href",
      "#/board/3/automations",
    );
    expect(screen.queryByText("Open API tokens")).toBeNull();
    expect(screen.queryByText("Open webhooks")).toBeNull();
  });
});
