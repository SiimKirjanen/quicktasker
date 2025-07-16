import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTTextarea } from "./TextArea";

describe("WPQTTextarea Component", () => {
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders textarea with value", () => {
    render(<WPQTTextarea {...defaultProps} value="test content" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("test content");
  });

  test("calls onChange when text changes", () => {
    const mockOnChange = jest.fn();
    render(<WPQTTextarea {...defaultProps} onChange={mockOnChange} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "new content" } });

    expect(mockOnChange).toHaveBeenCalledWith("new content");
  });

  test("applies custom className", () => {
    render(<WPQTTextarea {...defaultProps} className="custom-class" />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("custom-class");
  });

  test("sets rows attribute", () => {
    render(<WPQTTextarea {...defaultProps} rowsCount={5} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("rows", "5");
  });

  test("sets cols attribute when provided", () => {
    render(<WPQTTextarea {...defaultProps} colsCount={40} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("cols", "40");
  });
});
