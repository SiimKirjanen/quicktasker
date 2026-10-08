import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { UserContext } from "../../../../../providers/UserContextProvider";
import { Task } from "../../../../../types/task";
import { User, UserTypes, WPUser } from "../../../../../types/user";
import { UserAssignementSelection } from "./UserAssignementSelection";

// Mocks
import * as api from "../../../../../api/api";
jest.mock("../../../../../api/api", () => ({
  assignTaskToUserRequest: jest.fn(() =>
    Promise.resolve({ data: { executedAutomations: [] } }),
  ),
  removeTaskFromUserRequest: jest.fn(() =>
    Promise.resolve({ data: { executedAutomations: [] } }),
  ),
}));
jest.mock("../../../../../hooks/actions/useAutomationActions", () => ({
  useAutomationActions: () => ({
    handleExecutedAutomations: jest.fn(),
  }),
}));
jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));
jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
}));

const mockDispatch = jest.fn();

const baseUser: User = {
  id: "1",
  name: "John",
  description: "desc",
  user_type: UserTypes.QUICKTASKER,
  created_at: "",
  page_hash: "",
  assigned_tasks_count: "0",
  is_active: true,
  is_banned: false,
  banned_at: null,
  has_password: false,
  pipeline_ids: [1],
};
const baseWPUser: WPUser = {
  id: "2",
  name: "Jane",
  description: "desc",
  user_type: UserTypes.WP_USER,
  roles: ["editor"],
  created_at: "",
  caps: [],
  allcaps: [],
  profile_picture: "",
};
const task: Task = {
  id: "t1",
  name: "Task",
  pipeline_id: "1",
  stage_id: "s1",
  description: "",
  due_date: "",
  free_for_all: false,
  is_done: false,
  created_at: "",
  pipeline_name: "Test Pipeline",
  task_hash: "hash123",
  assigned_labels: [],
  task_focus_color: "#ffffff",
  task_order: 0,
  assigned_users: [baseUser],
  assigned_wp_users: [baseWPUser],
  is_archived: false,
};

import { PipelineView } from "../../../../../types/pipeline";
import { UserAssignementSelectionProps } from "./UserAssignementSelection";

function renderWithProviders(props: UserAssignementSelectionProps) {
  return render(
    <ActivePipelineContext.Provider
      value={{
        state: {
          loading: false,
          view: PipelineView.PIPELINE,
          activePipeline: null,
        },
        dispatch: mockDispatch,
        fetchAndSetPipelineData: jest.fn(),
      }}
    >
      <UserContext.Provider
        value={{
          state: {
            users: [baseUser],
            wpUsers: [baseWPUser],
            usersSearchValue: "",
          },
          userDispatch: jest.fn(),
          updateUsers: jest.fn(),
          updateWPUsers: jest.fn(),
        }}
      >
        <UserAssignementSelection {...props} />
      </UserContext.Provider>
    </ActivePipelineContext.Provider>,
  );
}

describe("UserAssignementSelection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both quicktasker and WP users in a single list", () => {
    renderWithProviders({
      task,
      onUserAdd: jest.fn(),
      onUserDelete: jest.fn(),
    });
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getAllByTestId("user-assignment-row-assigned")).toHaveLength(
      2,
    );
  });

  it("calls onUserDelete and dispatch when removing a user", async () => {
    const onUserDelete = jest.fn();
    renderWithProviders({ task, onUserAdd: jest.fn(), onUserDelete });
    fireEvent.click(screen.getByText("John"));
    await waitFor(() => expect(onUserDelete).toHaveBeenCalledWith(baseUser));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("calls onUserAdd and dispatch when assigning a user", async () => {
    const onUserAdd = jest.fn();
    // Remove user from assigned_users so they appear in assignable
    const taskNoAssigned = {
      ...task,
      assigned_users: [],
      assigned_wp_users: [],
    };
    renderWithProviders({
      task: taskNoAssigned,
      onUserAdd,
      onUserDelete: jest.fn(),
    });
    fireEvent.click(screen.getByText("John"));
    await waitFor(() => expect(onUserAdd).toHaveBeenCalledWith(baseUser));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("shows loading indicator while assigning/removing", async () => {
    jest.spyOn(api, "assignTaskToUserRequest").mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                success: true,
                messages: [],
                data: { executedAutomations: [] },
              }),
            50,
          ),
        ),
    );
    const taskNoAssigned = {
      ...task,
      assigned_users: [],
      assigned_wp_users: [],
    };
    renderWithProviders({
      task: taskNoAssigned,
      onUserAdd: jest.fn(),
      onUserDelete: jest.fn(),
    });
    fireEvent.click(screen.getByText("John"));
    expect(screen.getByTestId("oval-loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("oval-loading")).not.toBeInTheDocument(),
    );
  });

  it("shows error toast if assign fails", async () => {
    jest
      .spyOn(api, "assignTaskToUserRequest")
      .mockRejectedValue(new Error("fail"));
    const taskNoAssigned = {
      ...task,
      assigned_users: [],
      assigned_wp_users: [],
    };
    renderWithProviders({
      task: taskNoAssigned,
      onUserAdd: jest.fn(),
      onUserDelete: jest.fn(),
    });
    fireEvent.click(screen.getByText("John"));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to assign user"),
    );
  });

  it("shows error toast if remove fails", async () => {
    jest
      .spyOn(api, "removeTaskFromUserRequest")
      .mockRejectedValue(new Error("fail"));
    renderWithProviders({
      task,
      onUserAdd: jest.fn(),
      onUserDelete: jest.fn(),
    });
    fireEvent.click(screen.getByText("John"));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Failed to remove user"),
    );
  });
});

describe("UserAssignementSelection board access", () => {
  const unassignedTask: Task = {
    ...task,
    assigned_users: [],
    assigned_wp_users: [],
  };
  const addedWPUser: WPUser = {
    ...baseWPUser,
    id: "10",
    name: "Added",
    pipeline_ids: [1],
  };
  const notAddedWPUser: WPUser = {
    ...baseWPUser,
    id: "11",
    name: "Not added",
    pipeline_ids: [2],
  };
  const adminWPUser: WPUser = {
    ...baseWPUser,
    id: "12",
    name: "Admin",
    pipeline_ids: [],
    can_access_all_pipelines: true,
  };

  function renderWithWPUsers(
    wpUsers: WPUser[],
    taskToRender: Task,
    users: User[] = [],
  ) {
    return render(
      <ActivePipelineContext.Provider
        value={{
          state: {
            loading: false,
            view: PipelineView.PIPELINE,
            activePipeline: null,
          },
          dispatch: mockDispatch,
          fetchAndSetPipelineData: jest.fn(),
        }}
      >
        <UserContext.Provider
          value={{
            state: { users, wpUsers, usersSearchValue: "" },
            userDispatch: jest.fn(),
            updateUsers: jest.fn(),
            updateWPUsers: jest.fn(),
          }}
        >
          <UserAssignementSelection
            task={{ ...taskToRender, pipeline_id: "1" }}
            onUserAdd={jest.fn()}
            onUserDelete={jest.fn()}
          />
        </UserContext.Provider>
      </ActivePipelineContext.Provider>,
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows WordPress users not added to the board as not assignable, last", () => {
    renderWithWPUsers(
      [notAddedWPUser, addedWPUser, adminWPUser],
      unassignedTask,
    );

    const rows = screen.getByTestId("user-assignment-list").children;
    expect(rows[0]).toHaveTextContent("Added");
    expect(rows[1]).toHaveTextContent("Admin");
    expect(rows[2]).toHaveTextContent("Not added");
    expect(rows[2]).toHaveTextContent("Not added to this board");
    expect(rows[2]).toHaveAttribute(
      "data-testid",
      "user-assignment-row-no-board-access",
    );
  });

  it("does not assign a WordPress user not added to the board", () => {
    renderWithWPUsers([notAddedWPUser], unassignedTask);

    fireEvent.click(screen.getByText("Not added to this board"));

    expect(api.assignTaskToUserRequest).not.toHaveBeenCalled();
  });

  it("lets an assigned WordPress user without board access be removed", async () => {
    renderWithWPUsers([notAddedWPUser], {
      ...unassignedTask,
      assigned_wp_users: [notAddedWPUser],
    });

    expect(screen.getByText("No access to this board")).toBeInTheDocument();
    fireEvent.click(screen.getByText("No access to this board"));

    await waitFor(() =>
      expect(api.removeTaskFromUserRequest).toHaveBeenCalledWith(
        "11",
        "t1",
        UserTypes.WP_USER,
      ),
    );
  });

  describe("QuickTasker users", () => {
    const addedQuicktasker: User = {
      ...baseUser,
      id: "20",
      name: "On board",
      pipeline_ids: [1],
    };
    const notAddedQuicktasker: User = {
      ...baseUser,
      id: "21",
      name: "Elsewhere",
      pipeline_ids: [2],
    };
    // A user that was just created has no boards loaded.
    const newQuicktasker: User = {
      ...baseUser,
      id: "22",
      name: "Brand new",
      pipeline_ids: undefined,
    };

    it("shows QuickTaskers not added to the board as not assignable, last", () => {
      renderWithWPUsers([], unassignedTask, [
        notAddedQuicktasker,
        newQuicktasker,
        addedQuicktasker,
      ]);

      const rows = screen.getByTestId("user-assignment-list").children;
      expect(rows[0]).toHaveTextContent("On board");
      expect(rows[0]).toHaveAttribute("data-testid", "user-assignment-row");
      [rows[1], rows[2]].forEach((row) => {
        expect(row).toHaveTextContent("Not added to this board");
        expect(row).toHaveAttribute(
          "data-testid",
          "user-assignment-row-no-board-access",
        );
      });
    });

    it("assigns a QuickTasker added to the board but not one who is not", async () => {
      renderWithWPUsers([], unassignedTask, [
        notAddedQuicktasker,
        addedQuicktasker,
      ]);

      fireEvent.click(screen.getByText("Elsewhere"));
      expect(api.assignTaskToUserRequest).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText("On board"));
      await waitFor(() =>
        expect(api.assignTaskToUserRequest).toHaveBeenCalledWith(
          "20",
          "t1",
          UserTypes.QUICKTASKER,
        ),
      );
    });

    it("lets an assigned QuickTasker without board access be removed", async () => {
      renderWithWPUsers(
        [],
        { ...unassignedTask, assigned_users: [notAddedQuicktasker] },
        [notAddedQuicktasker],
      );

      fireEvent.click(screen.getByText("No access to this board"));

      await waitFor(() =>
        expect(api.removeTaskFromUserRequest).toHaveBeenCalledWith(
          "21",
          "t1",
          UserTypes.QUICKTASKER,
        ),
      );
    });
  });
});
