import { render, screen, waitFor } from "@testing-library/react";
import PublicTaskForm from "./PublicTaskForm";
import {
  getPipelineStatusRequest,
  getTaskStatusesRequest,
} from "./api/public-task-api";

jest.mock("./api/public-task-api");

const mockStatus = getPipelineStatusRequest as jest.MockedFunction<
  typeof getPipelineStatusRequest
>;
const mockTaskStatuses = getTaskStatusesRequest as jest.MockedFunction<
  typeof getTaskStatusesRequest
>;

const defaultProps = {
  pipelineId: 7,
  submitLabel: "Submit task",
  successMessage: "Thanks!",
};

describe("PublicTaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
    mockTaskStatuses.mockResolvedValue({ success: true, data: {} });
  });

  test("renders form when board is open", async () => {
    mockStatus.mockResolvedValue({ success: true, data: { enabled: true } });
    render(<PublicTaskForm {...defaultProps} />);

    expect(await screen.findByLabelText("Task title")).toBeInTheDocument();
  });

  test("renders closed message when board is disabled", async () => {
    mockStatus.mockResolvedValue({ success: true, data: { enabled: false } });
    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByText(
        "This board is not currently accepting task submissions.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Task title")).not.toBeInTheDocument();
  });

  test("renders login-required message", async () => {
    mockStatus.mockResolvedValue({
      success: true,
      data: { enabled: true, login_required: true },
    });
    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByText(
        "You must be logged in as a WordPress user to submit a task to this board.",
      ),
    ).toBeInTheDocument();
  });

  test("renders limit-reached message", async () => {
    mockStatus.mockResolvedValue({
      success: true,
      data: { enabled: true, limit_reached: true },
    });
    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByText("This board has reached its submission limit."),
    ).toBeInTheDocument();
  });

  test("treats failed status response as disabled board", async () => {
    mockStatus.mockResolvedValue({ success: false });
    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByText(
        "This board is not currently accepting task submissions.",
      ),
    ).toBeInTheDocument();
  });

  test("treats thrown status error as disabled board", async () => {
    mockStatus.mockRejectedValue(new Error("net"));
    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByText(
        "This board is not currently accepting task submissions.",
      ),
    ).toBeInTheDocument();
  });

  test("shows loading state before status resolves", () => {
    mockStatus.mockReturnValue(new Promise(() => {}));
    render(<PublicTaskForm {...defaultProps} />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  test("renders submissions list when tracked hashes are stored", async () => {
    window.localStorage.setItem("wpqt_pub_track_7", JSON.stringify(["hash-1"]));
    mockStatus.mockResolvedValue({ success: true, data: { enabled: true } });
    mockTaskStatuses.mockResolvedValue({
      success: true,
      data: {
        "hash-1": { name: "Tracked task", is_done: false, stage_name: "To Do" },
      },
    });

    render(<PublicTaskForm {...defaultProps} />);

    expect(
      await screen.findByRole("heading", { name: "Your submissions" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Tracked task")).toBeInTheDocument(),
    );
  });

  test("renders form without status fetch in preview mode", () => {
    render(<PublicTaskForm {...defaultProps} preview />);
    expect(screen.getByLabelText("Task title")).toBeInTheDocument();
    expect(mockStatus).not.toHaveBeenCalled();
  });
});
