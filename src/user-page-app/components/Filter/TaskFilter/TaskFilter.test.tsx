import { fireEvent, render, screen } from "@testing-library/react";
import { TaskFilter } from "./TaskFilter";

// Mock the WPQTInput component
jest.mock("../../../../components/common/Input/Input", () => ({
  WPQTInput: jest.fn(({ value, onChange }) => (
    <input
      data-testid="mock-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )),
}));

describe("TaskFilter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    render(<TaskFilter title="Search Tasks" searchValue="" />);

    expect(screen.getByText("Search Tasks")).toBeInTheDocument();
  });

  it("passes searchValue to WPQTInput", () => {
    const searchValue = "test search";

    render(<TaskFilter title="Search Tasks" searchValue={searchValue} />);

    const inputElement = screen.getByTestId("mock-input");
    expect(inputElement).toHaveValue(searchValue);
  });

  it("calls onSearchChange when input value changes", () => {
    const mockOnSearchChange = jest.fn();
    const searchValue = "";
    const newValue = "new search text";

    render(
      <TaskFilter
        title="Search Tasks"
        searchValue={searchValue}
        onSearchChange={mockOnSearchChange}
      />,
    );

    const inputElement = screen.getByTestId("mock-input");
    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(mockOnSearchChange).toHaveBeenCalledWith(newValue);
  });

  it("uses default no-op function when onSearchChange is not provided", () => {
    const searchValue = "";

    render(<TaskFilter title="Search Tasks" searchValue={searchValue} />);

    const inputElement = screen.getByTestId("mock-input");

    // This should not throw an error even though onSearchChange is not provided
    fireEvent.change(inputElement, { target: { value: "new value" } });
  });

  it("renders with the correct CSS classes", () => {
    const { container } = render(
      <TaskFilter title="Search Tasks" searchValue="" />,
    );

    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toHaveClass("wpqt-flex");
    expect(wrapperDiv).toHaveClass("wpqt-flex-col");
    expect(wrapperDiv).toHaveClass("wpqt-items-center");
    expect(wrapperDiv).toHaveClass("wpqt-gap-1");
    expect(wrapperDiv).toHaveClass("wpqt-mb-3");
  });
});
