import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Task } from "../../../../../types/task";
import { FreeForAllToggle } from "./FreeForAllToggle";

// Mock Toggle and Loading components
jest.mock("../../../../common/Toggle/Toggle", () => ({
  Toggle: ({
    checked,
    handleChange,
  }: {
    checked: boolean;
    handleChange: (checked: boolean) => void;
  }) => (
    <input
      data-testid="toggle"
      type="checkbox"
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  ),
}));
jest.mock("../../../../Loading/Loading", () => ({
  Loading: ({ ovalSize }: { ovalSize?: number }) => (
    <div data-testid="loading">Loading {ovalSize}</div>
  ),
}));

const mockEditTask = jest.fn();

jest.mock("../../../../../hooks/actions/useTaskActions", () => ({
  useTaskActions: () => ({
    editTask: mockEditTask,
  }),
}));

const baseTask: Task = {
  id: "1",
  name: "Test Task",
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
  assigned_users: [],
  assigned_wp_users: [],
  is_archived: false,
};

describe("FreeForAllToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders toggle with initial value", () => {
    render(
      <FreeForAllToggle
        initialValue={true}
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    const toggle = screen.getByTestId("toggle");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeChecked();
  });

  it("shows loading indicator while editing", async () => {
    mockEditTask.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                success: true,
                task: { ...baseTask, free_for_all: true },
              }),
            100,
          ),
        ),
    );
    render(
      <FreeForAllToggle
        initialValue={false}
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    const toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument(),
    );
  });

  it("calls onEditTaskCompleted with updated task on success", async () => {
    const updatedTask = { ...baseTask, free_for_all: true };
    mockEditTask.mockResolvedValue({ success: true, task: updatedTask });
    const onEditTaskCompleted = jest.fn();
    render(
      <FreeForAllToggle
        initialValue={false}
        task={baseTask}
        onEditTaskCompleted={onEditTaskCompleted}
      />,
    );
    const toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle);
    await waitFor(() =>
      expect(onEditTaskCompleted).toHaveBeenCalledWith(updatedTask),
    );
  });

  it("reverts toggle if editTask fails", async () => {
    mockEditTask.mockResolvedValue({ success: false, task: undefined });
    render(
      <FreeForAllToggle
        initialValue={false}
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    const toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle).toBeChecked());
  });
});
