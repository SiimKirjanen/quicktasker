import { act, fireEvent, render, screen } from "@testing-library/react";
import { toast } from "react-toastify";

const mockUpdateWPUserPipelines = jest.fn();
jest.mock("../../../../../hooks/actions/useWPUserPipelineActions", () => ({
  useWPUserPipelineActions: () => ({
    updateWPUserPipelines: mockUpdateWPUserPipelines,
  }),
}));

const mockGetPipelinesRequest = jest.fn();
jest.mock("../../../../../api/api", () => ({
  getPipelinesRequest: () => mockGetPipelinesRequest(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
  },
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
      <button
        type="button"
        onClick={() => onSelectionChange(["3", "4", "5", "6"])}
      >
        boards 3 to 6
      </button>
      <button type="button" onClick={() => onSelectionChange(["2", "9"])}>
        board 2 and deleted board 9
      </button>
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  ),
}));

import {
  SET_WP_USER_PIPELINE_IDS,
  WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND,
} from "../../../../../constants";
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

type UpdateExtras = Partial<
  Pick<
    WPUserPipelinesUpdate,
    "stopped_integrations" | "removed_pipelines_with_assigned_tasks"
  >
>;

// The user's boards on the server, which may include boards another
// administrator added the user to since the card was rendered.
let serverPipelineIds: number[] = [];

// Adds and removes boards like the server does.
function saveOnServer(
  add: string[],
  remove: string[],
  extras: UpdateExtras = {},
): WPUserPipelinesUpdate {
  const added = add
    .map(Number)
    .filter((id) => !serverPipelineIds.includes(id))
    .sort((a, b) => a - b);
  const removed = remove
    .map(Number)
    .filter((id) => serverPipelineIds.includes(id));
  serverPipelineIds = [
    ...serverPipelineIds.filter((id) => !removed.includes(id)),
    ...added,
  ].sort((a, b) => a - b);

  return {
    pipeline_ids: serverPipelineIds,
    added_pipeline_ids: added,
    removed_pipeline_ids: removed,
    stopped_integrations: [],
    removed_pipelines_with_assigned_tasks: [],
    ...extras,
  };
}

function respondWith(extras: UpdateExtras) {
  mockUpdateWPUserPipelines.mockImplementation(
    async (
      _userId: string,
      add: string[],
      remove: string[],
      callback: (u: WPUserPipelinesUpdate) => void,
    ) => callback(saveOnServer(add, remove, extras)),
  );
}

// The added and removed boards of each save.
function savedChanges() {
  return mockUpdateWPUserPipelines.mock.calls.map((c) => [c[1], c[2]]);
}

const mockUserDispatch = jest.fn();

function renderAccess(user: WPUser, boards: Pipeline[] = pipelines) {
  serverPipelineIds = [...(user.pipeline_ids ?? [])];
  const tree = (currentUser: WPUser) => (
    <PipelinesContext.Provider
      value={{ state: { pipelines: boards }, pipelinesDispatch: jest.fn() }}
    >
      <UserContext.Provider
        value={{
          state: { users: [], wpUsers: [currentUser], usersSearchValue: "" },
          userDispatch: mockUserDispatch,
          updateUsers: jest.fn(),
          updateWPUsers: jest.fn(),
        }}
      >
        <WPUserPipelineAccess user={currentUser} />
      </UserContext.Provider>
    </PipelinesContext.Provider>
  );
  const result = render(tree(user));

  return {
    ...result,
    // Renders the card again with the user's boards as loaded on refresh.
    rerenderWithUser: (updatedUser: WPUser) =>
      result.rerender(tree(updatedUser)),
  };
}

// Holds each save until release() is called, then saves what was sent.
function holdSaves(
  removed: WPUserPipelinesUpdate["removed_pipelines_with_assigned_tasks"] = [],
) {
  const releases: (() => void)[] = [];
  mockUpdateWPUserPipelines.mockImplementation(
    (
      _userId: string,
      add: string[],
      remove: string[],
      callback: (u: WPUserPipelinesUpdate) => void,
    ) =>
      new Promise<void>((resolve) => {
        releases.push(() => {
          callback(
            saveOnServer(add, remove, {
              removed_pipelines_with_assigned_tasks: removed,
            }),
          );
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

beforeEach(() => {
  jest.clearAllMocks();
  respondWith({});
  mockGetPipelinesRequest.mockResolvedValue({ data: pipelines });
});

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

  it("shows every board without Change for a user who can manage the site", () => {
    renderAccess({ ...makeWPUser(), can_access_all_pipelines: true });

    const summary = screen.getByTestId("wp-user-boards-summary");
    expect(summary).toHaveTextContent(/^All boards$/);
    expect(summary).not.toHaveClass("wpqt-text-yellow-700");
    expect(
      screen.getByText("Can manage this site, so sees every board."),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("wp-user-boards-change")).toBeNull();
  });

  it("offers Change for a user who cannot manage the site", () => {
    renderAccess({ ...makeWPUser([1]), can_access_all_pipelines: false });

    expect(screen.getByTestId("wp-user-boards-summary")).toHaveTextContent(
      "Board 1",
    );
    expect(screen.getByTestId("wp-user-boards-change")).toBeInTheDocument();
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

  it("saves the added and removed boards and shows the saved boards", async () => {
    renderAccess(makeWPUser([1]));
    openSelector();

    await act(async () => {
      fireEvent.click(screen.getByText("only board 2"));
    });

    expect(mockUpdateWPUserPipelines).toHaveBeenCalledWith(
      "wp1",
      ["2"],
      ["1"],
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

  it("does not save when the selection did not change", async () => {
    renderAccess(makeWPUser([1, 2]));
    openSelector();

    await act(async () => {
      fireEvent.click(screen.getByText("boards 1 and 2"));
    });

    expect(mockUpdateWPUserPipelines).not.toHaveBeenCalled();
  });

  it("warns about tasks still assigned on removed boards", async () => {
    respondWith({
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
      { autoClose: false },
    );
  });

  describe("API tokens, webhooks and automations the user created", () => {
    it("warns that they don't work without board access", async () => {
      respondWith({
        stopped_integrations: [
          {
            pipeline_id: 1,
            api_token_count: 2,
            webhook_count: 1,
            automation_count: 1,
          },
        ],
      });
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      expect(mockUpdateWPUserPipelines).toHaveBeenCalledTimes(1);
      expect(toast.warning).toHaveBeenCalledWith(expect.anything(), {
        autoClose: false,
      });
      render((toast.warning as jest.Mock).mock.calls[0][0]);
      expect(
        screen.getByTestId("stopped-integrations-warning"),
      ).toHaveTextContent(
        "2 API tokens, 1 webhook and 1 automation by Bob on Board 1 won't work without board access.",
      );
      expect(screen.getByText("Open API tokens")).toHaveAttribute(
        "href",
        "#/board/1/api-tokens",
      );
      expect(screen.getByText("Open webhooks")).toHaveAttribute(
        "href",
        "#/board/1/webhooks",
      );
      expect(screen.getByText("Open automations")).toHaveAttribute(
        "href",
        "#/board/1/automations",
      );
    });

    it("only links to the kind of integration the user created", async () => {
      respondWith({
        stopped_integrations: [
          {
            pipeline_id: 1,
            api_token_count: 0,
            webhook_count: 1,
            automation_count: 0,
          },
        ],
      });
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      render((toast.warning as jest.Mock).mock.calls[0][0]);
      expect(
        screen.getByTestId("stopped-integrations-warning"),
      ).toHaveTextContent("1 webhook by Bob on Board 1 won't work");
      expect(screen.queryByText("Open API tokens")).toBeNull();
      expect(screen.getByText("Open webhooks")).toBeInTheDocument();
      expect(screen.queryByText("Open automations")).toBeNull();
    });

    it("does not warn when nothing stopped working", async () => {
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      expect(toast.warning).not.toHaveBeenCalled();
    });
  });

  describe("added and removed boards", () => {
    it("tells the admin which boards the user was added to", async () => {
      renderAccess(makeWPUser([]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 1 and 2"));
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Bob was added to Board 1, Board 2.",
      );
    });

    it("only names the boards that were added", async () => {
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 1 and 2"));
      });

      expect(toast.success).toHaveBeenCalledWith("Bob was added to Board 2.");
    });

    it("counts the boards when many are added at once", async () => {
      const boards = Array.from({ length: 4 }, (_, i) => ({
        id: String(i + 3),
        name: `Board ${i + 3}`,
        is_primary: false,
      })) as Pipeline[];
      renderAccess(makeWPUser([]), boards);
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 3 to 6"));
      });

      expect(toast.success).toHaveBeenCalledWith("Bob was added to 4 boards.");
    });

    it("tells the admin which boards the user was removed from", async () => {
      renderAccess(makeWPUser([1, 2]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Bob was removed from Board 1.",
      );
    });

    it("reports both when boards are added and removed in one save", async () => {
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      expect((toast.success as jest.Mock).mock.calls).toEqual([
        ["Bob was added to Board 2."],
        ["Bob was removed from Board 1."],
      ]);
    });

    it("counts the boards when many are removed at once", async () => {
      const boards = Array.from({ length: 4 }, (_, i) => ({
        id: String(i + 3),
        name: `Board ${i + 3}`,
        is_primary: false,
      })) as Pipeline[];
      renderAccess(makeWPUser([3, 4, 5, 6]), boards);
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("no boards"));
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Bob was removed from 4 boards.",
      );
    });
  });

  it("restores the previous selection when saving fails", async () => {
    mockUpdateWPUserPipelines.mockImplementation(
      async (
        _userId: string,
        _add: string[],
        _remove: string[],
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

  it("saves the changes made during a save together after it", async () => {
    const release = holdSaves();
    renderAccess(makeWPUser([1]));
    openSelector();

    fireEvent.click(screen.getByText("only board 2"));
    fireEvent.click(screen.getByText("boards 1 and 2"));
    fireEvent.click(screen.getByText("no boards"));
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();

    await release();
    // The first save finishing does not undo the newer changes.
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
    // Board 2 was saved by the first save and is removed by the next one.
    expect(screen.getByTestId("wp-user-boards-wp1")).toHaveAttribute(
      "data-loading",
      "2",
    );

    await release();
    // Adding board 1 back is replaced by removing it again.
    expect(savedChanges()).toEqual([
      [["2"], ["1"]],
      [[], ["2", "1"]],
    ]);
    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
    expect(screen.getByTestId("wp-user-boards-wp1")).toHaveAttribute(
      "data-loading",
      "",
    );
  });

  it("does not warn about a board that a waiting change adds back", async () => {
    const release = holdSaves([{ pipeline_id: 1, task_count: 3 }]);
    renderAccess(makeWPUser([1]));
    openSelector();

    fireEvent.click(screen.getByText("only board 2"));
    fireEvent.click(screen.getByText("boards 1 and 2"));
    await release();

    expect(toast.warning).not.toHaveBeenCalled();
    await release();
  });

  describe("boards changed by another administrator", () => {
    it("keeps boards the user was added to since their boards were loaded", async () => {
      renderAccess(makeWPUser([1]));
      // Another administrator added the user to board 9, which is not in the
      // board list either.
      serverPipelineIds = [1, 9];
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 1 and 2"));
      });

      expect(savedChanges()).toEqual([[["2"], []]]);
      expect(screen.getByTestId("selected")).toHaveTextContent("1,2,9");
      expect(mockUserDispatch).toHaveBeenCalledWith({
        type: SET_WP_USER_PIPELINE_IDS,
        payload: { userId: "wp1", pipelineIds: [1, 2, 9] },
      });
      expect((toast.success as jest.Mock).mock.calls).toEqual([
        ["Bob was added to Board 2."],
      ]);
    });

    it("loads the board list again when the user is on a board missing from it", async () => {
      mockGetPipelinesRequest.mockResolvedValue({ data: [] });
      renderAccess(makeWPUser([1]));
      serverPipelineIds = [1, 9];
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 1 and 2"));
      });

      expect(mockGetPipelinesRequest).toHaveBeenCalledTimes(1);
    });

    it("does not remove a board missing from the board list when the others are unticked", async () => {
      renderAccess(makeWPUser([1, 9]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("no boards"));
      });

      expect(savedChanges()).toEqual([[[], ["1"]]]);
      expect(screen.getByTestId("selected")).toHaveTextContent(/^9$/);
    });
  });

  describe("boards loaded again", () => {
    it("shows the boards loaded when User management is refreshed", () => {
      const { rerenderWithUser } = renderAccess(makeWPUser([1]));

      rerenderWithUser(makeWPUser([1, 2]));

      expect(screen.getByTestId("wp-user-boards-summary")).toHaveTextContent(
        "Board 1, Board 2",
      );
    });

    it("starts the selector from the boards loaded again", () => {
      const { rerenderWithUser } = renderAccess(makeWPUser([1]));
      rerenderWithUser(makeWPUser([1, 2]));
      openSelector();

      expect(screen.getByTestId("selected")).toHaveTextContent("1,2");
    });

    it("keeps the selection being saved", async () => {
      const release = holdSaves();
      const { rerenderWithUser } = renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });
      rerenderWithUser(makeWPUser([1, 2]));

      expect(screen.getByTestId("selected")).toHaveTextContent(/^2$/);
      await release();
      expect(screen.getByTestId("selected")).toHaveTextContent(/^2$/);
    });
  });

  describe("deleted boards", () => {
    const boardMissing = {
      messages: [WP_QUICKTASKER_EXCEPTION_PIPELINE_NOT_FOUND],
    };

    function failThenSave(failures: number) {
      let calls = 0;
      mockUpdateWPUserPipelines.mockImplementation(
        async (
          _userId: string,
          add: string[],
          remove: string[],
          callback: (u: WPUserPipelinesUpdate) => void,
          onFailure: (e: unknown) => void,
        ) => {
          calls += 1;
          if (calls <= failures) {
            onFailure(boardMissing);
            return;
          }
          callback(saveOnServer(add, remove));
        },
      );
    }

    it("keeps a board missing from the board list, as it may have been created since", async () => {
      renderAccess(makeWPUser([9]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("board 2 and deleted board 9"));
      });

      expect(savedChanges()).toEqual([[["2"], []]]);
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("saves again without a board another administrator deleted", async () => {
      // Board 1 was deleted elsewhere, so the server no longer lists it.
      mockGetPipelinesRequest.mockResolvedValue({ data: [pipelines[1]] });
      failThenSave(1);
      renderAccess(makeWPUser([]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("boards 1 and 2"));
      });

      expect(savedChanges()).toEqual([
        [["1", "2"], []],
        [["2"], []],
      ]);
      expect(screen.getByTestId("selected")).toHaveTextContent(/^2$/);
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("gives up after saving again once", async () => {
      mockGetPipelinesRequest.mockResolvedValue({ data: pipelines });
      failThenSave(2);
      renderAccess(makeWPUser([1]));
      openSelector();

      await act(async () => {
        fireEvent.click(screen.getByText("only board 2"));
      });

      expect(mockUpdateWPUserPipelines).toHaveBeenCalledTimes(2);
      expect(screen.getByTestId("selected")).toHaveTextContent("1");
      expect(toast.error).toHaveBeenCalledTimes(1);
    });
  });
});
