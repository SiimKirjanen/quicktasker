import { render, screen } from "@testing-library/react";
import { AutomationAction } from "../../../../../../../../../types/automation";
import { AutomationMeta } from "./AutomationMeta";

// Mock the EmailMetaInput component
jest.mock("./components/EmailMetaInput/EmailMetaInput", () => ({
  EmailMetaInput: () => (
    <div data-testid="email-meta-input">EmailMetaInput</div>
  ),
}));

describe("AutomationMeta", () => {
  const automationDispatch = jest.fn();

  beforeEach(() => {
    automationDispatch.mockClear();
  });

  test("renders EmailMetaInput when action is NEW_ENTITY_EMAIL", () => {
    const automationCreationState = {
      automationAction: {
        id: AutomationAction.NEW_ENTITY_EMAIL,
      },
    };

    render(
      <AutomationMeta
        automationCreationState={automationCreationState}
        automationDispatch={automationDispatch}
      />,
    );

    expect(screen.getByTestId("email-meta-input")).toBeInTheDocument();
  });

  test("renders null when no action match", () => {
    const automationCreationState = {
      automationAction: {
        id: AutomationAction.ASSIGN_USER,
      },
    };

    const { container } = render(
      <AutomationMeta
        automationCreationState={automationCreationState}
        automationDispatch={automationDispatch}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
