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
  }: {
    id: string;
    options: { value: string; label: string }[];
    selectedValues: string[];
    onSelectionChange: (v: string[]) => void;
  }) => (
    <div data-testid={id}>
      <span data-testid="options">{options.map((o) => o.label).join(",")}</span>
      <span data-testid="selected">{selectedValues.join(",")}</span>
      <button type="button" onClick={() => onSelectionChange(["2"])}>
        only board 2
      </button>
    </div>
  ),
}));

import { PipelinesContext } from "../../../../../providers/PipelinesContextProvider";
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

function renderAccess(user: WPUser) {
  return render(
    <PipelinesContext.Provider
      value={{ state: { pipelines }, pipelinesDispatch: jest.fn() }}
    >
      <WPUserPipelineAccess user={user} />
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

beforeEach(() => jest.clearAllMocks());

describe("WPUserPipelineAccess", () => {
  it("offers every board and selects the user's boards", () => {
    renderAccess(makeWPUser([1]));

    expect(screen.getByTestId("options")).toHaveTextContent("Board 1,Board 2");
    expect(screen.getByTestId("selected")).toHaveTextContent("1");
  });

  it("selects nothing when the user has no boards", () => {
    renderAccess(makeWPUser());

    expect(screen.getByTestId("selected")).toBeEmptyDOMElement();
  });

  it("saves the new selection and shows the saved boards", async () => {
    respondWith({
      pipeline_ids: [2],
      removed_pipelines_with_assigned_tasks: [],
    });
    renderAccess(makeWPUser([1]));

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

    await act(async () => {
      fireEvent.click(screen.getByText("only board 2"));
    });

    expect(screen.getByTestId("selected")).toHaveTextContent("1");
    expect(toast.error).toHaveBeenCalled();
  });
});
