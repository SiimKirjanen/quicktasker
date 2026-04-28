import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("react-router-dom", () => ({ useNavigate: () => jest.fn() }));
jest.mock("@heroicons/react/24/outline", () => ({
  CalendarIcon: () => null,
  CheckBadgeIcon: () => null,
  ClockIcon: () => null,
  ViewColumnsIcon: () => null,
}));
jest.mock("../../../../components/Card/Card", () => ({
  WPQTCard: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="task-card">
      <span data-testid="card-title">{title}</span>
      {children}
    </div>
  ),
}));
jest.mock(
  "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem",
  () => ({
    WPQTCardDataItem: ({ label, value }: { label: string; value?: string }) => (
      <div data-testid={`card-item-${label}`}>
        <span>{label}</span>
        {value && <span>{value}</span>}
      </div>
    ),
  }),
);
jest.mock("../../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertToWPTimezone: (d: string) => `tz:${d}`,
  }),
}));

import { Task } from "../../../../types/task";
import {
  State,
  UserAssignableTasksContext,
} from "../../../providers/UserAssignableTasksContextProvider";
import { AssignebaleTasks } from "./AssignableTasks";

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "t1",
    pipeline_id: "p1",
    pipeline_name: "My Board",
    stage_id: "s1",
    name: "Task One",
    description: "desc",
    created_at: "2024-01-01T00:00:00Z",
    due_date: null,
    task_order: 1,
    task_hash: "hash1",
    assigned_labels: [],
    task_focus_color: "#fff",
    free_for_all: false,
    assigned_users: [],
    assigned_wp_users: [],
    is_archived: false,
    is_done: false,
    ...overrides,
  };
}

function makeState(overrides: Partial<State> = {}): State {
  return {
    loading: false,
    assignableTasks: [],
    searchText: "",
    ...overrides,
  };
}

function wrapper(state: State) {
  const ctx = {
    state,
    userAssignableTasksDispatch: jest.fn(),
    loadAssignableTasks: jest.fn(),
  };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <UserAssignableTasksContext.Provider value={ctx}>
      {children}
    </UserAssignableTasksContext.Provider>
  );
  Wrapper.displayName = "AssignableTasksWrapper";
  return Wrapper;
}

describe("AssignebaleTasks", () => {
  it("renders nothing while loading", () => {
    const { container } = render(<AssignebaleTasks />, {
      wrapper: wrapper(makeState({ loading: true })),
    });
    expect(container.firstChild).toBeNull();
  });

  it("shows 'No tasks assignable' when task list is empty and no search", () => {
    render(<AssignebaleTasks />, { wrapper: wrapper(makeState()) });
    expect(screen.getByText("No tasks assignable to you")).toBeInTheDocument();
  });

  it("shows 'No tasks match search' when search filters all tasks out", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [makeTask({ name: "Fix bug" })],
          searchText: "zzznomatch",
        }),
      ),
    });
    expect(
      screen.getByText("No tasks match your search filter"),
    ).toBeInTheDocument();
  });

  it("renders a card for each task when tasks are present", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [
            makeTask({ task_hash: "h1", name: "Task A" }),
            makeTask({ task_hash: "h2", name: "Task B" }),
          ],
        }),
      ),
    });
    expect(screen.getAllByTestId("task-card")).toHaveLength(2);
    expect(screen.getByText("Task A")).toBeInTheDocument();
    expect(screen.getByText("Task B")).toBeInTheDocument();
  });

  it("shows 'Board is deleted!' when pipeline_name is null", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [makeTask({ pipeline_name: null })],
        }),
      ),
    });
    expect(screen.getByText("Board is deleted!")).toBeInTheDocument();
  });

  it("shows pipeline name when pipeline_name is set", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [makeTask({ pipeline_name: "Sprint Board" })],
        }),
      ),
    });
    expect(screen.getByText("Sprint Board")).toBeInTheDocument();
  });

  it("shows Due date item when task has a due_date", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [makeTask({ due_date: "2024-06-01T00:00:00Z" })],
        }),
      ),
    });
    expect(screen.getByTestId("card-item-Due date")).toBeInTheDocument();
    expect(screen.getByText("tz:2024-06-01T00:00:00Z")).toBeInTheDocument();
  });

  it("omits Due date item when task has no due_date", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({ assignableTasks: [makeTask({ due_date: null })] }),
      ),
    });
    expect(screen.queryByTestId("card-item-Due date")).toBeNull();
  });

  it("shows 'Task completed' label when task is done", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({ assignableTasks: [makeTask({ is_done: true })] }),
      ),
    });
    expect(screen.getByText("Task completed")).toBeInTheDocument();
  });

  it("shows 'Task not completed' label when task is not done", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({ assignableTasks: [makeTask({ is_done: false })] }),
      ),
    });
    expect(screen.getByText("Task not completed")).toBeInTheDocument();
  });

  it("converts created_at through timezone helper", () => {
    render(<AssignebaleTasks />, {
      wrapper: wrapper(
        makeState({
          assignableTasks: [makeTask({ created_at: "2024-03-15T10:00:00Z" })],
        }),
      ),
    });
    expect(screen.getByText("tz:2024-03-15T10:00:00Z")).toBeInTheDocument();
  });
});
