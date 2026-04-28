import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTControls } from "./WPQTControls";

jest.mock("../Card", () => ({
  WPQTCard: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div>
      <div data-testid="card-title">{title}</div>
      {children}
    </div>
  ),
}));

jest.mock("../../Dialog/ConfirmTooltip/ConfirmTooltip", () => ({
  WPQTConfirmTooltip: ({
    children,
    onConfirm,
  }: {
    children: (props: { onClick: () => void }) => React.ReactNode;
    onConfirm: () => void;
  }) => <div>{children({ onClick: onConfirm })}</div>,
}));

jest.mock("../../common/Button/WPQTIconButton/WPQTIconButton", () => ({
  WPQTIconButton: ({
    onClick,
    text,
    loading,
  }: {
    onClick: (e: React.MouseEvent) => void;
    text?: string;
    loading?: boolean;
  }) => (
    <button
      data-testid={`btn-${text?.toLowerCase()}`}
      onClick={onClick}
      aria-busy={loading}
    >
      {text}
    </button>
  ),
}));

jest.mock("../../common/Toggle/Toggle", () => ({
  Toggle: ({
    checked,
    handleChange,
  }: {
    checked: boolean;
    handleChange: (v: boolean) => void;
  }) => (
    <input
      data-testid="toggle"
      type="checkbox"
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  ),
}));

jest.mock("../../Loading/Loading", () => ({
  Loading: () => <div data-testid="loading" />,
}));

const defaultProps = {
  title: "Controls",
  active: true,
  deleteConfirmMessage: "Are you sure you want to delete?",
  onDelete: jest.fn(),
  onActiveChange: jest.fn(),
  openLogs: jest.fn(),
};

afterEach(() => jest.clearAllMocks());

describe("WPQTControls", () => {
  it("renders the card title", () => {
    render(<WPQTControls {...defaultProps} />);
    expect(screen.getByTestId("card-title")).toHaveTextContent("Controls");
  });

  it("renders Toggle and Active label when not loading", () => {
    render(<WPQTControls {...defaultProps} activateLoading={false} />);
    expect(screen.getByTestId("toggle")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("shows loading indicator instead of Toggle when activateLoading is true", () => {
    render(<WPQTControls {...defaultProps} activateLoading={true} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.queryByTestId("toggle")).not.toBeInTheDocument();
  });

  it("reflects the active prop on the Toggle", () => {
    render(<WPQTControls {...defaultProps} active={false} />);
    expect(screen.getByTestId("toggle")).not.toBeChecked();
  });

  it("calls onActiveChange when Toggle is changed", () => {
    const onActiveChange = jest.fn();
    render(<WPQTControls {...defaultProps} onActiveChange={onActiveChange} />);
    fireEvent.click(screen.getByTestId("toggle"));
    expect(onActiveChange).toHaveBeenCalledWith(false);
  });

  it("calls openLogs when Logs button is clicked", () => {
    const openLogs = jest.fn();
    render(<WPQTControls {...defaultProps} openLogs={openLogs} />);
    fireEvent.click(screen.getByTestId("btn-logs"));
    expect(openLogs).toHaveBeenCalled();
  });

  it("calls onDelete when Delete button is confirmed", () => {
    const onDelete = jest.fn();
    render(<WPQTControls {...defaultProps} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId("btn-delete"));
    expect(onDelete).toHaveBeenCalled();
  });

  it("passes deleteLoading to the Delete button", () => {
    render(<WPQTControls {...defaultProps} deleteLoading={true} />);
    expect(screen.getByTestId("btn-delete")).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});
