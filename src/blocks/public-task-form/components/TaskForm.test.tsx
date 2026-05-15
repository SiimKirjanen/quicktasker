import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createPublicTaskRequest } from "../api/public-task-api";
import TaskForm from "./TaskForm";

jest.mock("../api/public-task-api");

const mockCreate = createPublicTaskRequest as jest.MockedFunction<
  typeof createPublicTaskRequest
>;

function renderForm(
  overrides: Partial<React.ComponentProps<typeof TaskForm>> = {},
) {
  const onSubmitted = jest.fn();
  const props = {
    pipelineId: 5,
    submitLabel: "Submit task",
    successMessage: "Thanks!",
    onSubmitted,
    ...overrides,
  };
  render(<TaskForm {...props} />);
  return { onSubmitted };
}

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits task and calls onSubmitted with returned hash", async () => {
    mockCreate.mockResolvedValue({
      success: true,
      data: { task_hash: "abc123" },
    });
    const { onSubmitted } = renderForm();

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "Hello" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit task" }));

    await waitFor(() => expect(onSubmitted).toHaveBeenCalledWith("abc123"));
    expect(mockCreate).toHaveBeenCalledWith({
      pipeline_id: 5,
      name: "Hello",
      description: "",
    });
    expect(await screen.findByText("Thanks!")).toBeInTheDocument();
    expect(screen.getByLabelText("Task title")).toHaveValue("");
  });

  test("shows error message on network failure", async () => {
    mockCreate.mockRejectedValue(new Error("net"));
    const { onSubmitted } = renderForm();

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "Hello" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit task" }));

    expect(
      await screen.findByText("Network error. Please try again."),
    ).toBeInTheDocument();
    expect(onSubmitted).not.toHaveBeenCalled();
  });

  test("shows first server-side error when response indicates failure", async () => {
    mockCreate.mockResolvedValue({
      success: false,
      errors: ["Title too short"],
    });
    renderForm();

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "x" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit task" }));

    expect(await screen.findByText("Title too short")).toBeInTheDocument();
  });

  test("falls back to generic error when server omits errors array", async () => {
    mockCreate.mockResolvedValue({ success: false });
    renderForm();

    fireEvent.change(screen.getByLabelText("Task title"), {
      target: { value: "x" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit task" }));

    expect(await screen.findByText("Submission failed.")).toBeInTheDocument();
  });

  test("does not call API in preview mode", () => {
    renderForm({ preview: true });
    fireEvent.submit(
      screen.getByRole("button", { name: "Submit task" }).closest("form")!,
    );
    expect(mockCreate).not.toHaveBeenCalled();
  });

  test("disables submit button when pipelineId is 0", () => {
    renderForm({ pipelineId: 0 });
    expect(screen.getByRole("button", { name: "Submit task" })).toBeDisabled();
  });
});
