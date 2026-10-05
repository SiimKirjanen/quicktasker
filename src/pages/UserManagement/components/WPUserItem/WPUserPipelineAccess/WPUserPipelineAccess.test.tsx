import { act, fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";

const mockUpdateWPUserPipelines = jest.fn();
jest.mock("../../../../../hooks/actions/useWPUserPipelineActions", () => ({
  useWPUserPipelineActions: () => ({
    updateWPUserPipelines: mockUpdateWPUserPipelines,
  }),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), warning: jest.fn() },
}));

jest.mock("../../../../../components/common/Select/WPQTMultiSelect", () => ({
  WPQTMultiSelect: ({
    id,
    options,
    selectedValues,
    onSelectionChange,
    autoOpen,
    onClose,
    loadingValues,
  }: {
    id: string;
    options: { value: string; label: string }[];
    selectedValues: string[];
    onSelectionChange: (v: string[]) => void;
    autoOpen?: boolean;
    onClose: () => void;
    loadingValues: string[];
  }) => (
    <div
      data-testid={id}
      data-auto-open={String(autoOpen)}
      data-loading={loadingValues.join(",")}
    >
      <span data-testid="options">{options.map((o) => o.label).join(",")}</span>
      <span data-testid="selected">{selectedValues.join(",")}</span>
      <button type="button" onClick={() => onSelectionChange(["2"])}>
        only board 2
      </button>
      <button type="button" onClick={() => onSelectionChange(["1", "2"])}>
        boards 1 and 2
      </button>
      <button type="button" onClick={() => onSelectionChange([])}>
        no boards
      </button>
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  ),
}));

import { SET_WP_USER_PIPELINE_IDS } from "../../../../../constants";
import { PipelinesContext } from "../../../../../providers/PipelinesContextProvider";
import { UserContext } from "../../../../../providers/UserContextProvider";
import { Pipeline } from "../../../../../types/pipeline";
import {
  UserTypes,
  WPUser,
  WPUserPipelinesUpdate,
} from "../../../../../types/user";
import { WPUserPipelineAccess } from "./WPUserPipelineAccess";

const pipelines = [
  { id: "1", name: "Board 1", is_primary: true },
  { id: "2", name: "Board 2", is_primary: false },
] as Pipeline[];

const manyPipelines = Array.from({ length: 7 }, (_, i) => ({
  id: String(i + 1),
  name: `Board ${i + 1}`,
  is_primary: false,
})) as Pipeline[];

function makeWPUser(pipelineIds?: number[]): WPUser {
  return {
    id: "wp1",
    name: "Bob",
    description: "",
    created_at: "2024-01-01T00:00:00Z",
    caps: [],
    allcaps: [],
    roles: ["editor"],
    user_type: UserTypes.WP_USER,
    profile_picture: "",
    pipeline_ids: pipelineIds,
  };
}

const mockUserDispatch = jest.fn();

function renderAccess(user: WPUser, boards: Pipeline[] = pipelines) {
  return render(
    <PipelinesContext.Provider
      value={{ state: { pipelines: boards }, pipelinesDispatch: jest.fn() }}
    >
      <UserContext.Provider
        value={{
          state: { users: [], wpUsers: [user], usersSearchValue: "" },
          userDispatch: mockUserDispatch,
          updateUsers: jest.fn(),
          updateWPUsers: jest.fn(),
        }}
      >
        <WPUserPipelineAccess user={user} />
      </UserContext.Provider>
    </PipelinesContext.Provider>,
  );
}

function respondWith(update: WPUserPipelinesUpdate) {
  mockUpdateWPUserPipelines.mockImplementation(
    async (
      _userId: string,
      _pipelineIds: string[],
      callback: (u: WPUserPipelinesUpdate) => void,
    ) => callback(update),
  );
}

// Holds each save until release() is called, then saves what was sent.
function holdSaves(
  removed: WPUserPipelinesUpdate["removed_pipelines_with_assigned_tasks"] = [],
) {
  const releases: (() => void)[] = [];
  mockUpdateWPUserPipelines.mockImplementation(
    (
      _userId: string,
      pipelineIds: string[],
      callback: (u: WPUserPipelinesUpdate) => void,
    ) =>
      new Promise<void>((resolve) => {
        releases.push(() => {
          callback({
            pipeline_ids: pipelineIds.map(Number),
            removed_pipelines_with_assigned_tasks: removed,
          });
          resolve();
        });
      }),
  );

  return async () => {
    await act(async () => {
      releases.shift()!();
    });
  };
}

function openSelector() {
  fireEvent.click(screen.getByTestId("wp-user-boards-change"));
}

beforeEach(() => jest.clearAllMocks());

describe("WPUserPipelineAccess", () => {
  it("lists the user's boards without creating the selector", () => {
    renderAccess(makeWPUser([2, 1]));

    expect(screen.getByTestId("wp-user-boards-summary")).toHaveTextContent(
      "Board 1, Board 2",
    );
    expect(screen.queryByTestId("wp-user-boards-wp1")).toBeNull();
  });

  it("shows a warning when the user has no boards", () => {
    renderAccess(makeWPUser());

    const summary = screen.getByTestId("wp-user-boards-summary");
    expect(summary).toHaveTextContent("No boards");
    expect(summary).toHaveClass("wpqt-text-yellow-700");
  });

  it("lists five boards and counts the rest", () => {
    renderAccess(makeWPUser([1, 2, 3, 4, 5, 6, 7]), manyPipelines);

    const summary = screen.getByTestId("wp-user-boards-summary");
    expect(summary).toHaveTextContent(
      "Board 1, Board 2, Board 3, Board 4, Board 5 +2 more",
    );
    expect(summary).toHaveAttribute(
      "title",
      manyPipelines.map((p) => p.name).join(", "),
    );
  });

  it("opens the selector from Change and keeps the list of boards", () => {
    renderAccess(makeWPUser([1]));

    openSelector();
    expect(screen.getByTestId("wp-user-boards-wp1")).toHaveAttribute(
      "data-auto-open",
      "true",
    );
    expect(screen.getByTestId("wp-user-boards-summary")).toHaveTextContent(
      "Board 1",
    );

    fireEvent.click(screen.getByText("close"));
    expect(screen.queryByTestId("wp-user-boards-wp1")).toBeNull();
    expect(screen.getByTestId("wp-user-boards-change")).toHaveFocus();
  });

  it("offers every board and selects the user's boards", () => {
    renderAccess(makeWPUser([1]));
    openSelector();

    expect(screen.getByTestId("options")).toHaveTextContent("Board 1,Board 2");
    expect(screen.getByTestId("selected")).toHaveTextContent("1");
  });

  it("selects nothing when the user has no boards", () => {
    renderAccess(makeWPUser());
    openSelector();

    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
  });

  it("saves the new selection and shows the saved boards", async () => {
    respondWith({
      pipeline_ids: [2],
      removed_pipelines_with_assigned_tasks: [],
    });
    renderAccess(makeWPUser([1]));
    openSelector();

    await act(async () => {
      fireEvent.click(screen.getByText("only board 2"));
    });

    expect(mockUpdateWPUserPipelines).toHaveBeenCalledWith(
      "wp1",
      ["2"],
      expect.any(Function),
      expect.any(Function),
    );
    expect(screen.getByTestId("selected")).toHaveTextContent("2");
    expect(mockUserDispatch).toHaveBeenCalledWith({
      type: SET_WP_USER_PIPELINE_IDS,
      payload: { userId: "wp1", pipelineIds: [2] },
    });
    expect(toast.warning).not.toHaveBeenCalled();
  });

  it("warns about tasks still assigned on removed boards", async () => {
    respondWith({
      pipeline_ids: [2],
      removed_pipelines_with_assigned_tasks: [
        { pipeline_id: 1, task_count: 3 },
      ],
    });
    renderAccess(makeWPUser([1]));
    openSelector();

    await act(async () => {
      fireEvent.click(screen.getByText("only board 2"));
    });

    expect(toast.warning).toHaveBeenCalledWith(
      expect.stringContaining("Bob is still assigned to 3 tasks on Board 1"),
    );
  });

  it("restores the previous selection when saving fails", async () => {
    mockUpdateWPUserPipelines.mockImplementation(
      async (
        _userId: string,
        _pipelineIds: string[],
        _callback: () => void,
        onFailure: (e: unknown) => void,
      ) => onFailure(new Error("x")),
    );
    renderAccess(makeWPUser([1]));
    openSelector();

    await act(async () => {
      fireEvent.click(screen.getByText("only board 2"));
    });

    expect(screen.getByTestId("selected")).toHaveTextContent("1");
    expect(toast.error).toHaveBeenCalled();
    expect(mockUserDispatch).not.toHaveBeenCalled();
  });

  it("shows a spinner on the changed boards, and next to Change once it closes", async () => {
    const release = holdSaves();
    renderAccess(makeWPUser([1]));
    openSelector();
    const select = screen.getByTestId("wp-user-boards-wp1");
    expect(select).toHaveAttribute("data-loading", "");

    fireEvent.click(screen.getByText("only board 2"));
    // Board 2 was added and board 1 removed.
    expect(select).toHaveAttribute("data-loading", "2,1");
    expect(screen.queryByTestId("wp-user-boards-saving")).toBeNull();

    fireEvent.click(screen.getByText("close"));
    expect(screen.getByTestId("wp-user-boards-saving")).toBeInTheDocument();

    await release();
    expect(screen.queryByTestId("wp-user-boards-saving")).toBeNull();
  });

  it("saves the newest selection made during a save after it", async () => {
    const release = holdSaves();
    renderAccess(makeWPUser([1]));
    openSelector();

    fireEvent.click(screen.getByText("only board 2"));
    fireEvent.click(screen.getByText("boards 1 and 2"));
    fireEvent.click(screen.getByText("no boards"));
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();

    await release();
    // The first save finishing does not undo the newer selection.
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
    // Board 2 was saved by the first save and is removed by the next one.
    expect(screen.getByTestId("wp-user-boards-wp1")).toHaveAttribute(
      "data-loading",
      "2",
    );

    await release();
    expect(mockUpdateWPUserPipelines.mock.calls.map((c) => c[1])).toEqual([
      ["2"],
      [],
    ]);
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
    expect(screen.getByTestId("wp-user-boards-wp1")).toHaveAttribute(
      "data-loading",
      "",
    );
  });

  it("does not warn about a board that a waiting selection adds back", async () => {
    const release = holdSaves([{ pipeline_id: 1, task_count: 3 }]);
    renderAccess(makeWPUser([1]));
    openSelector();

    fireEvent.click(screen.getByText("only board 2"));
    fireEvent.click(screen.getByText("boards 1 and 2"));
    await release();

    expect(toast.warning).not.toHaveBeenCalled();
    await release();
  });
});
