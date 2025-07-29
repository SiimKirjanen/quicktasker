import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../../constants";
import { Task } from "../../../../../types/task";
import { TaskNameInput } from "./TaskNameInput";

// Mock WPQTInput
jest.mock("../../../../common/Input/Input", () => ({
  WPQTInput: ({
    value,
    onChange,
    disabled,
    loading,
    ...props
  }: React.ComponentProps<"input"> & {
    loading?: boolean;
    onChange?: (value: string) => void;
  }) => (
    <input
      data-testid="task-name-input"
      value={value}
      disabled={disabled}
      aria-busy={loading}
      onChange={(e) => onChange && onChange(e.target.value)}
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
  name: "Initial Task Name",
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

jest.useFakeTimers();

describe("TaskNameInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with initial value", () => {
    render(<TaskNameInput task={baseTask} onEditTaskCompleted={jest.fn()} />);
    expect(screen.getByTestId("task-name-input")).toHaveValue(
      "Initial Task Name",
    );
  });

  it("updates input value on change", () => {
    render(<TaskNameInput task={baseTask} onEditTaskCompleted={jest.fn()} />);
    const input = screen.getByTestId("task-name-input");
    fireEvent.change(input, { target: { value: "Changed Name" } });
    expect(input).toHaveValue("Changed Name");
  });

  it("calls editTask after debounce when value changes", async () => {
    mockEditTask.mockResolvedValue({
      success: true,
      task: { ...baseTask, name: "Changed Name" },
    });
    const onEditTaskCompleted = jest.fn();
    render(
      <TaskNameInput
        task={baseTask}
        onEditTaskCompleted={onEditTaskCompleted}
      />,
    );
    const input = screen.getByTestId("task-name-input");
    fireEvent.change(input, { target: { value: "Changed Name" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() =>
      expect(mockEditTask).toHaveBeenCalledWith(baseTask.id, {
        name: "Changed Name",
      }),
    );
    await waitFor(() =>
      expect(onEditTaskCompleted).toHaveBeenCalledWith({
        ...baseTask,
        name: "Changed Name",
      }),
    );
  });

  it("reverts input value if editTask fails", async () => {
    mockEditTask.mockResolvedValue({ success: false, task: undefined });
    render(<TaskNameInput task={baseTask} onEditTaskCompleted={jest.fn()} />);
    const input = screen.getByTestId("task-name-input");
    fireEvent.change(input, { target: { value: "Bad Name" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() => expect(input).toHaveValue("Initial Task Name"));
  });

  it("disables input while loading", async () => {
    let resolveEdit: (value: { success: boolean; task?: Task }) => void;
    mockEditTask.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveEdit = resolve;
        }),
    );
    render(<TaskNameInput task={baseTask} onEditTaskCompleted={jest.fn()} />);
    const input = screen.getByTestId("task-name-input");
    fireEvent.change(input, { target: { value: "Loading Name" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    // Input should be disabled while loading
    expect(input).toBeDisabled();
    // Finish loading
    act(() => {
      resolveEdit({
        success: true,
        task: { ...baseTask, name: "Loading Name" },
      });
    });
    await waitFor(() => expect(input).toHaveValue("Loading Name"));
  });
});
