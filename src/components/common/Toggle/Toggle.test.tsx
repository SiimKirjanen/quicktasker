import { fireEvent, render, screen } from "@testing-library/react";
import { Toggle } from "./Toggle";

// Mock react-switch with proper default export structure
jest.mock("react-switch", () => ({
  __esModule: true,
  default: ({
    checked,
    onChange,
    id,
    "data-testid": dataTestId,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
    "data-testid"?: string;
  }) => (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      id={id}
      data-testid={dataTestId}
    >
      {checked ? "ON" : "OFF"}
    </button>
  ),
}));

describe("Toggle Component", () => {
  const defaultProps = {
    checked: false,
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders toggle with checked state", () => {
    render(<Toggle {...defaultProps} checked={true} />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  test("renders toggle with unchecked state", () => {
    render(<Toggle {...defaultProps} checked={false} />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  test("calls handleChange when clicked", () => {
    const mockHandleChange = jest.fn();
    render(<Toggle {...defaultProps} handleChange={mockHandleChange} />);

    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);

    expect(mockHandleChange).toHaveBeenCalledWith(true);
  });

  test("sets id when provided", () => {
    render(<Toggle {...defaultProps} id="test-toggle" />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("id", "test-toggle");
  });

  test("sets data-testid when provided", () => {
    render(<Toggle {...defaultProps} dataTestId="custom-toggle" />);

    const toggle = screen.getByTestId("custom-toggle");
    expect(toggle).toBeInTheDocument();
  });
});
