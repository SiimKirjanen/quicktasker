import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { AutomationCreationState } from "../../../../../../reducers/automation-creation-reducer";
import {
  AutomationAction,
  AutomationTrigger,
  TargetType,
} from "../../../../../../types/automation";
import { AutomationCreationSteps } from "./AutomationCreationSteps";

// Mock child components
jest.mock("../AutomationTargetSelection/AutomationTargetSelection", () => ({
  AutomationTargetSelection: () => <div>TargetSelection</div>,
}));
jest.mock("../AutomationTriggerSelection/AutomationTriggerSelection", () => ({
  AutomationTriggerSelection: () => <div>TriggerSelection</div>,
}));
jest.mock("../AutomationActionSelection/AutomationActionSelection", () => ({
  AutomationActionSelection: () => <div>ActionSelection</div>,
}));
jest.mock(
  "../AutomationActionTargetSelection/AutomationActionTargetSelection",
  () => ({
    AutomationActionTargetSelection: () => <div>ActionTargetSelection</div>,
  }),
);
jest.mock("../AutomationMeta/AutomationMeta", () => ({
  AutomationMeta: () => <div>MetaSelection</div>,
}));

jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
}));

const baseAutomation: AutomationCreationState = {
  automationTarget: TargetType.PIPELINE,
  automationTrigger: AutomationTrigger.TASK_DONE,
  automationAction: {
    id: AutomationAction.ARCHIVE_TASK,
    requireAutomationTarget: false,
    requireAutomationTargetType: false,
    requireMetaData: false,
  },
  automationActionTargetType: null,
  automationActionTargetId: null,
  metaData: null,
};

describe("AutomationCreationSteps", () => {
  it("renders TargetSelection when automationTarget is null", () => {
    render(
      <AutomationCreationSteps
        automation={{ ...baseAutomation, automationTarget: null }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    expect(screen.getByText("TargetSelection")).toBeInTheDocument();
    expect(screen.getByText("Create automation")).toBeInTheDocument();
  });

  it("renders TriggerSelection when automationTrigger is null", () => {
    render(
      <AutomationCreationSteps
        automation={{ ...baseAutomation, automationTrigger: null }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    expect(screen.getByText("TriggerSelection")).toBeInTheDocument();
  });

  it("renders ActionSelection when automationAction is null", () => {
    render(
      <AutomationCreationSteps
        automation={{ ...baseAutomation, automationAction: null }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    expect(screen.getByText("ActionSelection")).toBeInTheDocument();
  });

  it("renders ActionTargetSelection when action requires target and type", () => {
    render(
      <AutomationCreationSteps
        automation={{
          ...baseAutomation,
          automationAction: {
            ...baseAutomation.automationAction,
            id: AutomationAction.ARCHIVE_TASK,
            requireAutomationTarget: true,
            requireAutomationTargetType: true,
          },
          automationActionTargetType: null,
          automationActionTargetId: null,
        }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    expect(screen.getByText("ActionTargetSelection")).toBeInTheDocument();
  });

  it("renders MetaSelection when action requires metaData", () => {
    render(
      <AutomationCreationSteps
        automation={{
          ...baseAutomation,
          automationAction: {
            ...baseAutomation.automationAction,
            id: AutomationAction.ARCHIVE_TASK,
            requireMetaData: true,
          },
          metaData: null,
        }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    expect(screen.getByText("MetaSelection")).toBeInTheDocument();
  });

  it("disables Create automation button if not ready", () => {
    render(
      <AutomationCreationSteps
        automation={{ ...baseAutomation, automationTarget: null }}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    // Find the button container by text, then walk up to the element with the disabled class
    const buttonText = screen.getByText("Create automation");
    const buttonContainer = buttonText.closest("div.wpqt-main-border");
    expect(buttonContainer).toHaveClass("wpqt-opacity-50");
  });

  it("enables Create automation button if ready", () => {
    render(
      <AutomationCreationSteps
        automation={baseAutomation}
        automationDispatch={jest.fn()}
        createAutomation={jest.fn()}
      />,
    );
    const button = screen.getByText("Create automation").closest("div");
    expect(button).not.toHaveClass("wpqt-opacity-50");
    expect(button).not.toHaveClass("wpqt-cursor-not-allowed");
  });

  it("calls createAutomation when button is clicked and ready", async () => {
    const createAutomation = jest.fn().mockResolvedValue(undefined);
    render(
      <AutomationCreationSteps
        automation={baseAutomation}
        automationDispatch={jest.fn()}
        createAutomation={createAutomation}
      />,
    );
    fireEvent.click(screen.getByText("Create automation"));
    await waitFor(() => {
      expect(createAutomation).toHaveBeenCalled();
    });
  });

  it("does not call createAutomation when disabled", () => {
    const createAutomation = jest.fn();
    render(
      <AutomationCreationSteps
        automation={{ ...baseAutomation, automationTarget: null }}
        automationDispatch={jest.fn()}
        createAutomation={createAutomation}
      />,
    );
    fireEvent.click(screen.getByText("Create automation"));
    expect(createAutomation).not.toHaveBeenCalled();
  });
});
