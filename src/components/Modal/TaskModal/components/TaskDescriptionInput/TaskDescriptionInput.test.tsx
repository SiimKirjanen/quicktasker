import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../../constants";
import { Task } from "../../../../../types/task";
import { TaskDescriptionInput } from "./TaskDescriptionInput";

// Mock WPQTTextarea
jest.mock("../../../../common/TextArea/TextArea", () => ({
  WPQTTextarea: ({
    value,
    onChange,
    disabled,
    loading,
    ...props
  }: {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    loading?: boolean;
    [key: string]: unknown;
  }) => (
    <textarea
      data-testid="task-desc-input"
      value={value}
      disabled={disabled}
      aria-busy={loading}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
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
  description: "Initial description",
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

jest.useFakeTimers();

describe("TaskDescriptionInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea with initial value", () => {
    render(
      <TaskDescriptionInput task={baseTask} onEditTaskCompleted={jest.fn()} />,
    );
    expect(screen.getByTestId("task-desc-input")).toHaveValue(
      "Initial description",
    );
  });

  it("updates textarea value on change", () => {
    render(
      <TaskDescriptionInput task={baseTask} onEditTaskCompleted={jest.fn()} />,
    );
    const textarea = screen.getByTestId("task-desc-input");
    fireEvent.change(textarea, { target: { value: "Changed description" } });
    expect(textarea).toHaveValue("Changed description");
  });

  it("calls editTask after debounce when value changes", async () => {
    mockEditTask.mockResolvedValue({
      success: true,
      task: { ...baseTask, description: "Changed description" },
    });
    const onEditTaskCompleted = jest.fn();
    render(
      <TaskDescriptionInput
        task={baseTask}
        onEditTaskCompleted={onEditTaskCompleted}
      />,
    );
    const textarea = screen.getByTestId("task-desc-input");
    fireEvent.change(textarea, { target: { value: "Changed description" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() =>
      expect(mockEditTask).toHaveBeenCalledWith(baseTask.id, {
        description: "Changed description",
      }),
    );
    await waitFor(() =>
      expect(onEditTaskCompleted).toHaveBeenCalledWith({
        ...baseTask,
        description: "Changed description",
      }),
    );
  });

  it("reverts textarea value if editTask fails", async () => {
    mockEditTask.mockResolvedValue({ success: false, task: undefined });
    render(
      <TaskDescriptionInput task={baseTask} onEditTaskCompleted={jest.fn()} />,
    );
    const textarea = screen.getByTestId("task-desc-input");
    fireEvent.change(textarea, { target: { value: "Bad description" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() => expect(textarea).toHaveValue("Initial description"));
  });

  it("disables textarea while loading", async () => {
    let resolveEdit: (value: unknown) => void;
    mockEditTask.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveEdit = resolve;
        }),
    );
    render(
      <TaskDescriptionInput task={baseTask} onEditTaskCompleted={jest.fn()} />,
    );
    const textarea = screen.getByTestId("task-desc-input");
    fireEvent.change(textarea, { target: { value: "Loading description" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    expect(textarea).toBeDisabled();
    // Finish loading
    act(() => {
      resolveEdit({
        success: true,
        task: { ...baseTask, description: "Loading description" },
      });
    });
    await waitFor(() => expect(textarea).toHaveValue("Loading description"));
  });
});
