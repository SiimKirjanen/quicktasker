import { fireEvent, render, screen } from "@testing-library/react";
import { InputType, WPQTInput } from "./Input";

// Mock the LoadingOval component
jest.mock("../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval">Loading...</div>,
}));

describe("WPQTInput Component", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with value", () => {
    render(<WPQTInput {...defaultProps} value="test value" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("test value");
  });

  test("calls onChange when input value changes", () => {
    const mockOnChange = jest.fn();
    render(<WPQTInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledWith("new value");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("renders as disabled when disabled prop is true", () => {
    render(<WPQTInput {...defaultProps} disabled />);

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  test("renders as enabled by default", () => {
    render(<WPQTInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).not.toBeDisabled();
  });

  test("applies custom className to input", () => {
    render(<WPQTInput {...defaultProps} className="custom-input-class" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-input-class");
  });

  test("applies custom wrapperClassName to wrapper div", () => {
    render(
      <WPQTInput {...defaultProps} wrapperClassName="custom-wrapper-class" />,
    );

    const input = screen.getByRole("textbox");
    const wrapper = input.parentElement;
    expect(wrapper).toHaveClass("custom-wrapper-class");
  });

  test("renders with text type by default", () => {
    render(<WPQTInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");
  });

  test("renders with password type when specified", () => {
    render(<WPQTInput {...defaultProps} type={InputType.PASSWORD} />);

    const input = screen.getByDisplayValue("");
    expect(input).toHaveAttribute("type", "password");
  });

  test("sets autoFocus when isAutoFocus is true", () => {
    render(<WPQTInput {...defaultProps} isAutoFocus />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });

  test("sets input id when inputId is provided", () => {
    render(<WPQTInput {...defaultProps} inputId="test-input-id" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "test-input-id");
  });

  test("sets input name when name is provided", () => {
    render(<WPQTInput {...defaultProps} name="test-input-name" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "test-input-name");
  });

  test("shows loading indicator when loading is true", () => {
    render(<WPQTInput {...defaultProps} loading />);

    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
  });

  test("does not show loading indicator by default", () => {
    render(<WPQTInput {...defaultProps} />);

    expect(screen.queryByTestId("loading-oval")).not.toBeInTheDocument();
  });

  test("works without optional props", () => {
    render(<WPQTInput {...defaultProps} />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(input).not.toBeDisabled();
    expect(input).toHaveAttribute("type", "text");
  });

  test("forwards ref to input element", () => {
    const ref = { current: null };
    render(<WPQTInput {...defaultProps} ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });
});
