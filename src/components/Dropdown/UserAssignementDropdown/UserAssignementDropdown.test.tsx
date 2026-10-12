import { render, screen } from "@testing-library/react";
import { UserContext } from "../../../providers/UserContextProvider";
import { Task } from "../../../types/task";
import { User, UserTypes, WPUser } from "../../../types/user";
import { UserAssignementDropdown } from "./UserAssignementDropdown";

jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
}));
jest.mock("../WPQTDropdown", () => ({
  WPQTDropdown: ({
    menuBtn,
  }: {
    menuBtn: (props: { active: boolean }) => React.ReactNode;
  }) => <div>{menuBtn({ active: false })}</div>,
}));
jest.mock(
  "./components/UserAssignementSelection/UserAssignementSelection",
  () => ({
    UserAssignementSelection: () => null,
  }),
);

function makeWPUser(id: string, name: string, pipelineIds: number[]): WPUser {
  return {
    id,
    name,
    description: "",
    user_type: UserTypes.WP_USER,
    roles: ["editor"],
    created_at: "",
    caps: [],
    allcaps: [],
    profile_picture: "",
    pipeline_ids: pipelineIds,
  };
}

function makeQuicktasker(
  id: string,
  name: string,
  pipelineIds: number[],
): User {
  return {
    id,
    name,
    user_type: UserTypes.QUICKTASKER,
    pipeline_ids: pipelineIds,
  } as User;
}

function renderDropdown(
  assignedWPUsers: WPUser[],
  knownWPUsers: WPUser[],
  assignedUsers: User[] = [],
  knownUsers: User[] = [],
) {
  const task = {
    id: "t1",
    pipeline_id: "1",
    assigned_users: assignedUsers,
    assigned_wp_users: assignedWPUsers,
  } as unknown as Task;

  return render(
    <UserContext.Provider
      value={{
        state: {
          users: knownUsers,
          wpUsers: knownWPUsers,
          usersSearchValue: "",
        },
        userDispatch: jest.fn(),
        updateUsers: jest.fn(),
        updateWPUsers: jest.fn(),
      }}
    >
      <UserAssignementDropdown task={task} />
    </UserContext.Provider>,
  );
}

describe("UserAssignementDropdown", () => {
  it("marks assigned WordPress users without access to the board", () => {
    const added = makeWPUser("10", "Added", [1]);
    const removed = makeWPUser("11", "Removed", [2]);

    renderDropdown([added, removed], [added, removed]);

    const warnings = screen.getAllByTestId("no-board-access-warning");
    expect(warnings).toHaveLength(1);
    expect(warnings[0].parentElement).toHaveTextContent("Removed");
  });

  it("does not mark assigned WordPress users it knows nothing about", () => {
    renderDropdown([makeWPUser("12", "Unknown", [])], []);

    expect(screen.queryByTestId("no-board-access-warning")).toBeNull();
  });

  it("marks assigned QuickTaskers without access to the board", () => {
    const added = makeQuicktasker("20", "On board", [1]);
    const removed = makeQuicktasker("21", "Elsewhere", [2]);
    // A WordPress user with the same ID as a QuickTasker on the board.
    const wpUserWithSameId = makeWPUser("21", "Same ID", [1]);

    renderDropdown(
      [wpUserWithSameId],
      [wpUserWithSameId],
      [added, removed],
      [added, removed],
    );

    const warnings = screen.getAllByTestId("no-board-access-warning");
    expect(warnings).toHaveLength(1);
    expect(warnings[0].parentElement).toHaveTextContent("Elsewhere");
  });
});
