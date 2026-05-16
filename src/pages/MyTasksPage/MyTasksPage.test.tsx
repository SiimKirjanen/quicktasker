import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { TaskFromServer } from "../../types/task";

const mockGetMyTasksRequest = jest.fn();
jest.mock("../../api/api", () => ({
  getMyTasksRequest: (...args: unknown[]) => mockGetMyTasksRequest(...args),
}));

jest.mock("../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertToWPTimezone: (v: string) => v,
  }),
}));

jest.mock("../Page/Page", () => ({
  Page: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("../../components/Card/Card", () => ({
  WPQTCard: ({
    title,
    description,
    children,
  }: {
    title: string;
    description?: string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="task-card">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  ),
}));

jest.mock("../../components/common/Header/Header", () => ({
  WPQTPageHeader: ({
    children,
    rightSideContent,
  }: {
    children: React.ReactNode;
    rightSideContent?: React.ReactNode;
  }) => (
    <div>
      <h1>{children}</h1>
      {rightSideContent}
    </div>
  ),
}));

jest.mock("../../components/common/Input/Input", () => ({
  WPQTInput: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  }) => (
    <input
      data-testid="search-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("../../components/Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
}));

import { MyTasksPage } from "./MyTasksPage";

function makeTask(overrides: Partial<TaskFromServer> = {}): TaskFromServer {
  return {
    id: "1",
    pipeline_id: "10",
    pipeline_name: "Board A",
    stage_id: "100",
    stage_name: "In Progress",
    name: "Sample task",
    description: "Sample description",
    task_hash: "hash",
    created_at: "2026-01-01 10:00:00",
    assigned_labels: [],
    due_date: null,
    task_focus_color: null,
    task_completed_at: null,
    task_order: "0",
    free_for_all: "0",
    assigned_users: [],
    assigned_wp_users: [],
    is_archived: "0",
    is_done: "0",
    ...overrides,
  } as TaskFromServer;
}

async function renderAndWait(response: {
  success: boolean;
  data?: { created: TaskFromServer[]; assigned: TaskFromServer[] | null };
}) {
  mockGetMyTasksRequest.mockResolvedValue(response);
  await act(async () => {
    render(<MyTasksPage />);
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MyTasksPage", () => {
  it("renders both sections when API returns created and assigned arrays", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [makeTask({ id: "1", name: "Created A" })],
        assigned: [makeTask({ id: "2", name: "Assigned A" })],
      },
    });

    expect(screen.getByText("Tasks I created")).toBeInTheDocument();
    expect(screen.getByText("Tasks assigned to me")).toBeInTheDocument();
    expect(screen.getByText("Created A")).toBeInTheDocument();
    expect(screen.getByText("Assigned A")).toBeInTheDocument();
  });

  it("hides the 'Tasks assigned to me' section when assigned is null", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [makeTask({ id: "1", name: "Created A" })],
        assigned: null,
      },
    });

    expect(screen.getByText("Tasks I created")).toBeInTheDocument();
    expect(screen.queryByText("Tasks assigned to me")).not.toBeInTheDocument();
  });

  it("renders empty-state copy when both sections have no tasks", async () => {
    await renderAndWait({
      success: true,
      data: { created: [], assigned: [] },
    });

    expect(
      screen.getByText("You haven't created any tasks yet."),
    ).toBeInTheDocument();
    expect(screen.getByText("No tasks assigned to you.")).toBeInTheDocument();
  });

  it("filters tasks by name via the search input", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [
          makeTask({ id: "1", name: "Alpha task" }),
          makeTask({ id: "2", name: "Beta task" }),
        ],
        assigned: [makeTask({ id: "3", name: "Gamma task" })],
      },
    });

    const input = screen.getByTestId("search-input");
    await act(async () => {
      fireEvent.change(input, { target: { value: "Alpha" } });
    });

    expect(screen.getByText("Alpha task")).toBeInTheDocument();
    expect(screen.queryByText("Beta task")).not.toBeInTheDocument();
    expect(screen.queryByText("Gamma task")).not.toBeInTheDocument();
  });

  it("filters tasks by description and tolerates null descriptions", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [
          makeTask({
            id: "1",
            name: "T1",
            description: "matchingKeyword inside",
          }),
          makeTask({
            id: "2",
            name: "T2",
            description: null as unknown as string,
          }),
        ],
        assigned: null,
      },
    });

    const input = screen.getByTestId("search-input");
    await act(async () => {
      fireEvent.change(input, { target: { value: "matchingKeyword" } });
    });

    expect(screen.getByText("T1")).toBeInTheDocument();
    expect(screen.queryByText("T2")).not.toBeInTheDocument();
  });

  it("re-fetches when the refresh icon is clicked", async () => {
    mockGetMyTasksRequest.mockResolvedValueOnce({
      success: true,
      data: { created: [], assigned: [] },
    });
    await act(async () => {
      render(<MyTasksPage />);
    });

    expect(mockGetMyTasksRequest).toHaveBeenCalledTimes(1);

    mockGetMyTasksRequest.mockResolvedValueOnce({
      success: true,
      data: {
        created: [makeTask({ id: "1", name: "Fresh task" })],
        assigned: [],
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("refresh-icon"));
    });

    await waitFor(() => expect(mockGetMyTasksRequest).toHaveBeenCalledTimes(2));
    expect(screen.getByText("Fresh task")).toBeInTheDocument();
  });

  it("shows Done with completion date when task is done", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [
          makeTask({
            id: "1",
            name: "Done task",
            is_done: "1",
            task_completed_at: "2026-02-02 12:00:00",
          }),
        ],
        assigned: null,
      },
    });

    expect(screen.getByText("Done: 2026-02-02 12:00:00")).toBeInTheDocument();
    expect(screen.queryByText("In progress")).not.toBeInTheDocument();
  });

  it("shows 'In progress' when task is not done", async () => {
    await renderAndWait({
      success: true,
      data: {
        created: [makeTask({ id: "1", name: "Open task", is_done: "0" })],
        assigned: null,
      },
    });

    expect(screen.getByText("In progress")).toBeInTheDocument();
  });
});
