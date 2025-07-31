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
  has_password: false,
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
  pipeline_id: "p1",
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

  it("renders all user sections", () => {
    renderWithProviders({
      task,
      onUserAdd: jest.fn(),
      onUserDelete: jest.fn(),
    });
    expect(screen.getByText("Assigned quicktaskers")).toBeInTheDocument();
    expect(screen.getByText("Assigned WordPress users")).toBeInTheDocument();
    expect(screen.getByText("Assign a quicktasker")).toBeInTheDocument();
    expect(screen.getByText("Assign a WordPress user")).toBeInTheDocument();
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
