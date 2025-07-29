import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Task } from "../../../../../types/task";
import { TaskDueDateInput } from "./TaskDueDateInput";

// Mock DateTimePicker and Loading
jest.mock("react-datetime-picker", () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    ...props
  }: {
    onChange: (date: Date) => void;
    value: Date | null;
  } & React.ComponentPropsWithoutRef<"input">) => (
    <input
      data-testid="date-picker"
      type="datetime-local"
      value={value ? value.toISOString().slice(0, 16) : ""}
      onChange={(e) => onChange(new Date(e.target.value))}
      {...props}
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

const mockConvertUTCDateTimeToWPTimezone = jest.fn(
  (date: string) => new Date(date),
);
jest.mock("../../../../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertUTCDateTimeToWPTimezone: mockConvertUTCDateTimeToWPTimezone,
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

describe("TaskDueDateInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders date picker with initial value", () => {
    render(
      <TaskDueDateInput
        initialValue="2024-07-29T10:00:00Z"
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    expect(mockConvertUTCDateTimeToWPTimezone).toHaveBeenCalledWith(
      "2024-07-29T10:00:00Z",
    );
  });

  it("shows loading indicator while saving", async () => {
    mockEditTask.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: true, task: baseTask }), 100),
        ),
    );
    render(
      <TaskDueDateInput
        initialValue="2024-07-29T10:00:00Z"
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    const input = screen.getByTestId("date-picker");
    fireEvent.change(input, { target: { value: "2024-07-30T12:00" } });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument(),
    );
  });

  it("calls onEditTaskCompleted on success", async () => {
    const updatedTask = { ...baseTask, due_date: "2024-07-30T12:00:00Z" };
    mockEditTask.mockResolvedValue({ success: true, task: updatedTask });
    const onEditTaskCompleted = jest.fn();
    render(
      <TaskDueDateInput
        initialValue="2024-07-29T10:00:00Z"
        task={baseTask}
        onEditTaskCompleted={onEditTaskCompleted}
      />,
    );
    const input = screen.getByTestId("date-picker");
    fireEvent.change(input, { target: { value: "2024-07-30T12:00" } });
    await waitFor(() =>
      expect(onEditTaskCompleted).toHaveBeenCalledWith(updatedTask),
    );
  });

  it("reverts date if editTask fails", async () => {
    mockEditTask.mockResolvedValue({ success: false, task: undefined });
    render(
      <TaskDueDateInput
        initialValue="2024-07-29T10:00:00Z"
        task={baseTask}
        onEditTaskCompleted={jest.fn()}
      />,
    );
    const input = screen.getByTestId("date-picker");
    fireEvent.change(input, { target: { value: "2024-07-30T12:00" } });
    await waitFor(() => {
      // The value should revert to the initial date
      expect((input as HTMLInputElement).value).toContain("2024-07-29T10:00");
    });
  });
});
