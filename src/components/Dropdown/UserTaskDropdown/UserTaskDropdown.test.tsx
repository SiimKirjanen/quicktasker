import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserTaskDropdown } from "./UserTaskDropdown";

jest.mock("../WPQTDropdown", () => ({
  WPQTDropdown: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown">{children}</div>
  ),
  WPQTDropdownIcon: () => <div data-testid="dropdown-icon" />,
  WPQTDropdownItem: ({
    text,
    onClick,
    loading,
  }: {
    text: string;
    onClick: (e: React.MouseEvent) => void;
    loading?: boolean;
  }) => (
    <div data-testid="dropdown-item" data-loading={loading} onClick={onClick}>
      {text}
    </div>
  ),
}));

afterEach(() => jest.clearAllMocks());

describe("UserTaskDropdown", () => {
  it("renders the dropdown with unassign item", () => {
    render(<UserTaskDropdown taskId="task1" onUnAssignTask={jest.fn()} />);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByText("Unassign from task")).toBeInTheDocument();
  });

  it("calls onUnAssignTask with the correct taskId on click", async () => {
    const onUnAssignTask = jest.fn().mockResolvedValue(undefined);
    render(
      <UserTaskDropdown taskId="task42" onUnAssignTask={onUnAssignTask} />,
    );
    fireEvent.click(screen.getByTestId("dropdown-item"));
    await waitFor(() => expect(onUnAssignTask).toHaveBeenCalledWith("task42"));
  });

  it("shows loading state during unassign and clears it after", async () => {
    let resolve: () => void;
    const onUnAssignTask = jest.fn(
      () =>
        new Promise<void>((res) => {
          resolve = res;
        }),
    );
    render(<UserTaskDropdown taskId="task1" onUnAssignTask={onUnAssignTask} />);
    fireEvent.click(screen.getByTestId("dropdown-item"));
    await waitFor(() =>
      expect(screen.getByTestId("dropdown-item")).toHaveAttribute(
        "data-loading",
        "true",
      ),
    );
    resolve!();
    await waitFor(() =>
      expect(screen.getByTestId("dropdown-item")).toHaveAttribute(
        "data-loading",
        "false",
      ),
    );
  });

  it("calls stopPropagation on click to prevent event bubbling", async () => {
    const onUnAssignTask = jest.fn().mockResolvedValue(undefined);
    const parentClick = jest.fn();
    render(
      <div onClick={parentClick}>
        <UserTaskDropdown taskId="task1" onUnAssignTask={onUnAssignTask} />
      </div>,
    );
    fireEvent.click(screen.getByTestId("dropdown-item"));
    await waitFor(() => expect(onUnAssignTask).toHaveBeenCalled());
    expect(parentClick).not.toHaveBeenCalled();
  });
});
