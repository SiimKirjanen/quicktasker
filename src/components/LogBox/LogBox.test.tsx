import { render, screen } from "@testing-library/react";
import { WPQTLogCreatedBy } from "../../types/enums";
import { LogStatusEnum, WPQTLogType } from "../../types/log";
import { LogBox } from "./LogBox";

// Mock useTimezone hook
jest.mock("../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertToWPTimezone: (date: string) => `WP: ${date}`,
  }),
}));

// Mock logCreatedByString util
jest.mock("../../utils/log", () => ({
  logCreatedByString: {
    admin: "Admin",
    quicktasker_user: "QuickTasker",
    automation: "Automation",
    import: "Import",
    system: "System",
    all: "All",
  },
}));

const log = {
  id: "1",
  text: "Log text",
  type: "task" as WPQTLogType,
  type_id: "123",
  created_at: "2026-02-10T12:00:00Z",
  author_name: "John Doe",
  user_id: "42",
  created_by: "admin" as WPQTLogCreatedBy,
  log_status: LogStatusEnum.Success,
};

describe("LogBox", () => {
  it("renders log author, createdBy, and date", () => {
    render(<LogBox log={log}>Log details</LogBox>);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("(Admin)")).toBeInTheDocument();
    expect(screen.getByText("WP: 2026-02-10T12:00:00Z")).toBeInTheDocument();
    expect(screen.getByText("Log details")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <LogBox log={log}>
        <div>Child log content</div>
      </LogBox>,
    );
    expect(screen.getByText("Child log content")).toBeInTheDocument();
  });

  it("renders correct createdBy string for quicktasker_user", () => {
    const logQuicktasker = {
      ...log,
      created_by: "quicktasker_user" as WPQTLogCreatedBy,
    };
    render(<LogBox log={logQuicktasker} />);
    expect(screen.getByText("(QuickTasker)")).toBeInTheDocument();
  });
});
