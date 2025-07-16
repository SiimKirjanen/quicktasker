import { fireEvent, render, screen } from "@testing-library/react";
import { Option, WPQTSelect } from "./WPQTSelect";

describe("WPQTSelect Component", () => {
  const mockOptions: Option[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const defaultProps = {
    options: mockOptions,
    selectedOptionValue: "",
    onSelectionChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders select with options", () => {
    render(<WPQTSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Check that options are present
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("renders all selector by default", () => {
    render(<WPQTSelect {...defaultProps} />);

    expect(screen.getByText("All boards")).toBeInTheDocument();
  });

  test("renders custom all selector label", () => {
    render(<WPQTSelect {...defaultProps} allSelectorLabel="All categories" />);

    expect(screen.getByText("All categories")).toBeInTheDocument();
    expect(screen.queryByText("All boards")).not.toBeInTheDocument();
  });

  test("hides all selector when allSelector is false", () => {
    render(<WPQTSelect {...defaultProps} allSelector={false} />);

    expect(screen.queryByText("All boards")).not.toBeInTheDocument();
  });

  test("displays selected value", () => {
    render(<WPQTSelect {...defaultProps} selectedOptionValue="option2" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option2");
  });

  test("calls onSelectionChange when selection changes", () => {
    const mockOnSelectionChange = jest.fn();
    render(
      <WPQTSelect
        {...defaultProps}
        onSelectionChange={mockOnSelectionChange}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option1" } });

    expect(mockOnSelectionChange).toHaveBeenCalledWith("option1");
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
  });

  test("calls onSelectionChange with empty string when all selector is selected", () => {
    const mockOnSelectionChange = jest.fn();
    render(
      <WPQTSelect
        {...defaultProps}
        onSelectionChange={mockOnSelectionChange}
      />,
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "" } });

    expect(mockOnSelectionChange).toHaveBeenCalledWith("");
  });

  test("applies custom className", () => {
    render(<WPQTSelect {...defaultProps} className="custom-class" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass("custom-class");
  });

  test("sets id when provided", () => {
    render(<WPQTSelect {...defaultProps} id="test-select" />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveAttribute("id", "test-select");
  });

  test("works without id prop", () => {
    render(<WPQTSelect {...defaultProps} />);

    const select = screen.getByRole("combobox");

    // Instead of checking that there's no id attribute,
    // check that it doesn't have our custom id
    expect(select).not.toHaveAttribute("id", "test-select");

    // Or check that it has an auto-generated id (which is fine)
    expect(select).toHaveAttribute("id");
    const idValue = select.getAttribute("id");
    expect(idValue).toMatch(/headlessui-select-/); // Headless UI pattern
  });

  test("handles empty options array", () => {
    render(<WPQTSelect {...defaultProps} options={[]} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Only all selector should be present
    expect(screen.getByText("All boards")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  test("works with single option", () => {
    const singleOption = [{ value: "single", label: "Single Option" }];
    render(<WPQTSelect {...defaultProps} options={singleOption} />);

    expect(screen.getByText("Single Option")).toBeInTheDocument();
    expect(screen.getByText("All boards")).toBeInTheDocument();
  });

  test("combines all props correctly", () => {
    const mockOnSelectionChange = jest.fn();
    render(
      <WPQTSelect
        options={mockOptions}
        selectedOptionValue="option2"
        onSelectionChange={mockOnSelectionChange}
        allSelector={false}
        className="test-class"
        id="combined-select"
      />,
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("option2");
    expect(select).toHaveClass("test-class");
    expect(select).toHaveAttribute("id", "combined-select");
    expect(screen.queryByText("All boards")).not.toBeInTheDocument();

    fireEvent.change(select, { target: { value: "option3" } });
    expect(mockOnSelectionChange).toHaveBeenCalledWith("option3");
  });
});
