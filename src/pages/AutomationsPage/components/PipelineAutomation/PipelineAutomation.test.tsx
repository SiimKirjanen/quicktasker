import { render, screen } from "@testing-library/react";
import {
  ActionTargetType,
  Automation,
  AutomationAction,
  AutomationTrigger,
  TargetType,
} from "../../../../types/automation";
import { PipelineAutomation } from "./PipelineAutomation";

jest.mock("../../../../components/Dropdown/WPQTDropdown", () => ({
  WPQTDropdown: () => null,
  WPQTDropdownIcon: () => null,
  WPQTDropdownItem: () => null,
}));

jest.mock("../../../../utils/timezone", () => ({
  convertToTimezone: (date: string) => date,
}));

const baseAutomation: Automation = {
  id: "1",
  pipeline_id: "1",
  target_id: null,
  target_type: TargetType.Task,
  automation_trigger: AutomationTrigger.TASK_CREATED,
  automation_action: AutomationAction.NEW_ENTITY_EMAIL,
  automation_action_target_id: null,
  automation_action_target_type: null as unknown as ActionTargetType,
  created_at: "2026-01-01 00:00:00",
  updated_at: "2026-01-01 00:00:00",
  metadata: "team@example.com",
  created_by: "3",
  created_by_name: "Anna",
  created_by_has_board_access: false,
  active: true,
  verify_success: true,
};

function renderAutomation(overrides: Partial<Automation> = {}) {
  return render(
    <PipelineAutomation automation={{ ...baseAutomation, ...overrides }} />,
  );
}

describe("PipelineAutomation", () => {
  it("says an automation that sends board data out is not sending when its creator lost access", () => {
    renderAutomation();

    expect(screen.getByTestId("automation-not-sending")).toHaveTextContent(
      "Not sending: its creator lost access to this board or the permission to manage settings",
    );
    expect(screen.getByTestId("automation-creator-lost-access")).toBeVisible();
  });

  it("shows an automation that acts inside the board as active when its creator lost access", () => {
    renderAutomation({
      automation_action: AutomationAction.ARCHIVE_TASK,
      metadata: null,
    });

    expect(screen.queryByTestId("automation-not-sending")).toBeNull();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows a sending automation as active while its creator has access", () => {
    renderAutomation({ created_by_has_board_access: true });

    expect(screen.queryByTestId("automation-not-sending")).toBeNull();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows a deactivated sending automation as inactive", () => {
    renderAutomation({ active: false });

    expect(screen.queryByTestId("automation-not-sending")).toBeNull();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });
});
