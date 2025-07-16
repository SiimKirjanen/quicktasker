import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { Task } from "../../../types/task";
import { TaskCardActions } from "./TaskCardActions";

// Mock the hook
jest.mock("../../../hooks/actions/useTaskActions", () => ({
  useTaskActions: jest.fn(),
}));

describe("TaskCardActions", () => {
  // Mock task data
  const mockTask: Task = {
    id: "123",
    name: "Test Task",
    description: "",
    is_done: false,
    stage_id: "stage-1",
    pipeline_id: "pipeline-1",
    created_at: "2023-01-01T00:00:00",
    is_archived: false,
    due_date: null,
    pipeline_name: "Test Pipeline",
    task_hash: "hash-123",
    assigned_labels: [],
    task_focus_color: "#FFFFFF",
    task_order: 1,
    free_for_all: false,
    assigned_users: [],
    assigned_wp_users: [],
  };

  // Mock function for handling done status change
  const mockOnDoneStatusChange = jest.fn();

  // Mock implementation for the hook
  const mockChangeTaskDoneStatus = jest
    .fn()
    .mockImplementation((id, done, callback) => {
      // Simulate API call and invoke the callback
      return new Promise((resolve) => {
        setTimeout(() => {
          callback(done);
          resolve({});
        }, 10);
      });
    });

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskActions as jest.Mock).mockReturnValue({
      changeTaskDoneStatus: mockChangeTaskDoneStatus,
    });
  });

  test("renders uncompleted task with gray check icon", () => {
    render(
      <TaskCardActions
        task={mockTask}
        onDoneStatusChange={mockOnDoneStatusChange}
      />,
    );

    const checkIcon = screen.getByTestId("check-icon");
    expect(checkIcon).toHaveClass("wpqt-text-gray-300");
    expect(checkIcon).not.toHaveClass("wpqt-icon-green");
  });

  test("renders completed task with green check icon", () => {
    const completedTask = { ...mockTask, is_done: true };
    render(
      <TaskCardActions
        task={completedTask}
        onDoneStatusChange={mockOnDoneStatusChange}
      />,
    );

    const checkIcon = screen.getByTestId("check-icon");
    expect(checkIcon).toHaveClass("wpqt-icon-green");
    expect(checkIcon).not.toHaveClass("wpqt-text-gray-300");
  });

  test("displays loading state when changing task status", async () => {
    render(
      <TaskCardActions
        task={mockTask}
        onDoneStatusChange={mockOnDoneStatusChange}
      />,
    );

    // Get and click the check icon
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);

    // Check if loading component is shown
    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId("loading-oval")).not.toBeInTheDocument();
    });
  });

  test("changes task status to completed when clicking the gray icon", async () => {
    render(
      <TaskCardActions
        task={mockTask}
        onDoneStatusChange={mockOnDoneStatusChange}
      />,
    );

    // Get and click the check icon
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);

    // Wait for the action to complete
    await waitFor(() => {
      expect(mockChangeTaskDoneStatus).toHaveBeenCalledWith(
        "123",
        true,
        expect.any(Function),
      );
      expect(mockOnDoneStatusChange).toHaveBeenCalledWith("123", true);
    });
  });

  test("changes task status to uncompleted when clicking the green icon", async () => {
    const completedTask = { ...mockTask, is_done: true };
    render(
      <TaskCardActions
        task={completedTask}
        onDoneStatusChange={mockOnDoneStatusChange}
      />,
    );

    // Get and click the check icon
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);

    // Wait for the action to complete
    await waitFor(() => {
      expect(mockChangeTaskDoneStatus).toHaveBeenCalledWith(
        "123",
        false,
        expect.any(Function),
      );
      expect(mockOnDoneStatusChange).toHaveBeenCalledWith("123", false);
    });
  });

  test("stops event propagation when clicking the check icon", () => {
    // Create a wrapper div with a click handler to simulate propagation
    const wrapperClickHandler = jest.fn();

    render(
      <div onClick={wrapperClickHandler} data-testid="wrapper">
        <TaskCardActions
          task={mockTask}
          onDoneStatusChange={mockOnDoneStatusChange}
        />
      </div>,
    );

    // Get the check icon and click it
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);

    // If stopPropagation works, the wrapper's click handler should NOT be called
    expect(wrapperClickHandler).not.toHaveBeenCalled();
  });

  test("applies custom class name when provided", () => {
    render(
      <TaskCardActions
        task={mockTask}
        onDoneStatusChange={mockOnDoneStatusChange}
        className="custom-class"
      />,
    );

    const container = screen.getByTestId("check-icon").parentElement;
    expect(container).toHaveClass("custom-class");
  });
});
