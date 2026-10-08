import { fireEvent, render, screen } from "@testing-library/react";

let mockIsUserAllowedToManageWPUsers = false;
jest.mock("../../../../../hooks/useApp", () => ({
  useApp: () => ({
    state: { isUserAllowedToManageWPUsers: mockIsUserAllowedToManageWPUsers },
  }),
}));
jest.mock("../../../../../hooks/useNavigation", () => ({
  useNavigation: () => ({ navigatePage: jest.fn() }),
}));
jest.mock("../../../../../hooks/usePageLinks", () => ({
  usePageLinks: () => ({ userPage: "/tasks-app" }),
}));
jest.mock(
  "../../../../../components/Dropdown/UserDropdown/UserDropdown",
  () => ({
    UserDropdown: () => null,
  }),
);
jest.mock("../../../components/UserPipelineAccess/UserPipelineAccess", () => ({
  UserPipelineAccess: ({ user }: { user: { name: string } }) => (
    <button type="button" data-testid="quicktasker-boards">
      Boards of {user.name}
    </button>
  ),
}));

import { OPEN_EDIT_USER_MODAL } from "../../../../../constants";
import { ModalContext } from "../../../../../providers/ModalContextProvider";
import { User, UserTypes } from "../../../../../types/user";
import { UserListItem } from "./UserListItem";

const user: User = {
  id: "7",
  name: "Quinn",
  description: "",
  created_at: "2024-01-01T00:00:00Z",
  assigned_tasks_count: "0",
  user_type: UserTypes.QUICKTASKER,
  is_active: true,
  is_banned: false,
  banned_at: null,
  has_password: true,
  pipeline_ids: [1],
};

const mockModalDispatch = jest.fn();

function renderItem(itemUser: User = user) {
  return render(
    <ModalContext.Provider
      value={
        {
          state: {},
          modalDispatch: mockModalDispatch,
        } as unknown as React.ContextType<typeof ModalContext>
      }
    >
      <UserListItem user={itemUser} />
    </ModalContext.Provider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockIsUserAllowedToManageWPUsers = false;
});

describe("UserListItem", () => {
  it("opens the tasks app of a QuickTasker the viewer can manage", () => {
    const open = jest.spyOn(window, "open").mockImplementation(() => null);
    renderItem({ ...user, page_hash: "abc123", can_manage: true });

    fireEvent.click(screen.getByText("Open tasks app"));

    expect(open).toHaveBeenCalledWith("/tasks-app&code=abc123", "_blank");
    expect(mockModalDispatch).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it("has no tasks app link for a QuickTasker the viewer can't manage", () => {
    renderItem({ ...user, can_manage: false });

    expect(screen.queryByText("Open tasks app")).toBeNull();
  });

  it("shows the user's boards to administrators", () => {
    mockIsUserAllowedToManageWPUsers = true;
    renderItem();

    expect(screen.getByTestId("quicktasker-boards")).toHaveTextContent(
      "Boards of Quinn",
    );
  });

  it("does not show the user's boards to others, who cannot change them", () => {
    renderItem();

    expect(screen.queryByTestId("quicktasker-boards")).toBeNull();
  });

  it("does not open the edit modal when the boards are clicked", () => {
    mockIsUserAllowedToManageWPUsers = true;
    renderItem();

    fireEvent.click(screen.getByTestId("quicktasker-boards"));
    expect(mockModalDispatch).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("Quinn"));
    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: OPEN_EDIT_USER_MODAL,
      payload: user,
    });
  });
});
