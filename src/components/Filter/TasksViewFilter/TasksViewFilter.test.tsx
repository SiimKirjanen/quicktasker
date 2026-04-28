import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

const mockTaskViewDispatch = jest.fn();
const mockStageOptions = [{ label: "To Do", value: "s1" }];
// UserTypes.QUICKTASKER = "quicktasker", UserTypes.WP_USER = "wp-user" (from ActionTargetType)
const mockCombinedUsers = [
  { id: "u1", name: "Alice", user_type: "quicktasker" },
  { id: "wp1", name: "Bob", user_type: "wp-user" },
];

jest.mock("../../../hooks/useActivePipeline", () => ({
  useActivePipeline: () => ({ stageOptions: mockStageOptions }),
}));
jest.mock("../../../hooks/useUser", () => ({
  useUser: () => ({ combinedUsers: mockCombinedUsers }),
}));
jest.mock("../../common/Select/WPQTSelect", () => ({
  WPQTSelect: ({
    id,
    options,
    selectedOptionValue,
    onSelectionChange,
    allSelectorLabel,
  }: {
    id: string;
    options: { value: string; label: string }[];
    selectedOptionValue: string;
    onSelectionChange: (v: string) => void;
    allSelectorLabel: string;
  }) => (
    <select
      data-testid={id}
      value={selectedOptionValue}
      onChange={(e) => onSelectionChange(e.target.value)}
    >
      <option value="">{allSelectorLabel}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));
jest.mock("../../common/Input/Input", () => ({
  WPQTInput: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (v: string) => void;
  }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
jest.mock("../WPQTFilter", () => ({
  WPQTFilter: ({
    children,
    searchChildren,
  }: {
    children: React.ReactNode;
    searchChildren: React.ReactNode;
  }) => (
    <div>
      {searchChildren}
      {children}
    </div>
  ),
  WPQTFilterSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import {
  SET_STAGE_FILTER,
  SET_TASK_VIEW_SEARCH_TEXT,
  SET_USER_FILTER,
} from "../../../constants";
import {
  ActivePipelineTaskViewContext,
  State,
} from "../../../providers/ActivePipelineTaskViewContextProvider";
import { UserTypes } from "../../../types/user";
import { TasksViewFilter } from "./TasksViewFilter";

function makeState(overrides: Partial<State> = {}): State {
  return {
    stageIdFilter: "",
    userFilter: { id: null, type: null },
    searchText: "",
    ...overrides,
  };
}

function wrapper(state: State) {
  const ctx = { state, taskViewDispatch: mockTaskViewDispatch };
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ActivePipelineTaskViewContext.Provider value={ctx}>
      {children}
    </ActivePipelineTaskViewContext.Provider>
  );
  Wrapper.displayName = "TaskViewWrapper";
  return Wrapper;
}

beforeEach(() => jest.clearAllMocks());

describe("TasksViewFilter", () => {
  describe("userOptions construction", () => {
    it("builds value as 'id:user_type' and label as 'name (typeString)'", () => {
      render(<TasksViewFilter />, { wrapper: wrapper(makeState()) });
      const userSelect = screen.getByTestId("task-view-assigned-user-filter");
      const options = Array.from(userSelect.querySelectorAll("option"));
      expect(options[1].value).toBe("u1:quicktasker");
      expect(options[1].textContent).toBe("Alice (Quicktasker)");
      expect(options[2].value).toBe("wp1:wp-user");
      expect(options[2].textContent).toBe("Bob (WordPress User)");
    });
  });

  describe("selectedUserOption computation", () => {
    it("is empty string when userFilter.id is null", () => {
      render(<TasksViewFilter />, { wrapper: wrapper(makeState()) });
      const userSelect = screen.getByTestId(
        "task-view-assigned-user-filter",
      ) as HTMLSelectElement;
      expect(userSelect.value).toBe("");
    });

    it("is 'id:type' when userFilter is set", () => {
      render(<TasksViewFilter />, {
        wrapper: wrapper(
          makeState({ userFilter: { id: "u1", type: UserTypes.QUICKTASKER } }),
        ),
      });
      const userSelect = screen.getByTestId(
        "task-view-assigned-user-filter",
      ) as HTMLSelectElement;
      expect(userSelect.value).toBe("u1:quicktasker");
    });
  });

  describe("onUserSelectionChange", () => {
    it("splits the value string and dispatches SET_USER_FILTER", () => {
      render(<TasksViewFilter />, { wrapper: wrapper(makeState()) });
      fireEvent.change(screen.getByTestId("task-view-assigned-user-filter"), {
        target: { value: "u1:quicktasker" },
      });
      expect(mockTaskViewDispatch).toHaveBeenCalledWith({
        type: SET_USER_FILTER,
        payload: { id: "u1", type: "quicktasker" },
      });
    });
  });

  describe("onStageSelectionChange", () => {
    it("dispatches SET_STAGE_FILTER with the selected stage id", () => {
      render(<TasksViewFilter />, { wrapper: wrapper(makeState()) });
      fireEvent.change(screen.getByTestId("task-view-stage-filter"), {
        target: { value: "s1" },
      });
      expect(mockTaskViewDispatch).toHaveBeenCalledWith({
        type: SET_STAGE_FILTER,
        payload: "s1",
      });
    });
  });

  describe("onSearchChange", () => {
    it("dispatches SET_TASK_VIEW_SEARCH_TEXT on input change", () => {
      render(<TasksViewFilter />, { wrapper: wrapper(makeState()) });
      fireEvent.change(screen.getByTestId("search-input"), {
        target: { value: "hello" },
      });
      expect(mockTaskViewDispatch).toHaveBeenCalledWith({
        type: SET_TASK_VIEW_SEARCH_TEXT,
        payload: "hello",
      });
    });
  });
});
