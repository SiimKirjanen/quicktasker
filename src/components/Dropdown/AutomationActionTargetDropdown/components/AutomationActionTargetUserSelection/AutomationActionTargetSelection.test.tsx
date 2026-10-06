import { fireEvent, render, screen } from "@testing-library/react";
import { User, UserTypes, WPUser } from "../../../../../types/user";
import { AutomationActionTargetUserSelection } from "./AutomationActionTargetSelection";

function makeWPUser(id: string, name: string, pipelineIds: number[]): WPUser {
  return {
    id,
    name,
    description: "",
    created_at: "2024-01-01T00:00:00Z",
    caps: [],
    allcaps: [],
    roles: ["editor"],
    user_type: UserTypes.WP_USER,
    profile_picture: "",
    pipeline_ids: pipelineIds,
  };
}

const quickTasker = {
  id: "q1",
  name: "Quinn",
  user_type: UserTypes.QUICKTASKER,
} as User;
const addedUser = makeWPUser("w1", "Added", [1]);
const outsider = makeWPUser("w2", "Outsider", [2]);

function renderSelection(pipelineId?: string) {
  const assignUser = jest.fn();
  render(
    <AutomationActionTargetUserSelection
      quickTaskerUsers={[quickTasker]}
      wpUsers={[outsider, addedUser]}
      pipelineId={pipelineId}
      assignUser={assignUser}
    />,
  );
  return assignUser;
}

describe("AutomationActionTargetUserSelection board access", () => {
  it("lists WordPress users not added to the board last, as not pickable", () => {
    renderSelection("1");

    const rows = screen
      .getByTestId("automation-target-list")
      .querySelectorAll("[data-testid^='automation-target-row']");
    expect(Array.from(rows).map((row) => row.textContent)).toEqual([
      "Addededitor",
      "Quinn",
      "OutsidereditorNot added to this board",
    ]);
    expect(
      screen.getByTestId("automation-target-row-no-board-access"),
    ).toHaveAttribute("aria-disabled", "true");
  });

  it("does not pick a WordPress user who has not been added to the board", () => {
    const assignUser = renderSelection("1");

    fireEvent.click(screen.getByText("Outsider"));
    expect(assignUser).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Added"));
    fireEvent.click(screen.getByText("Quinn"));
    expect(assignUser.mock.calls.map(([user]) => user.id)).toEqual([
      "w1",
      "q1",
    ]);
  });

  it("lets every user be picked without a board", () => {
    renderSelection();

    expect(
      screen.queryByTestId("automation-target-row-no-board-access"),
    ).toBeNull();
  });
});
