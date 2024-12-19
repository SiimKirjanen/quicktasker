import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTCardDataItem } from "./WPQTCardDataItem";

describe("WPQTCardDataItem", () => {
  test("renders label and value", () => {
    render(<WPQTCardDataItem label="Test Label" value="Test Value" />);
    expect(screen.getByText("Test Label:")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  test("renders label without value", () => {
    render(<WPQTCardDataItem label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders value as a link when valueLink is provided", () => {
    render(
      <WPQTCardDataItem
        label="Test Label"
        value="Test Value"
        valueLink="https://example.com"
      />,
    );
    const link = screen.getByText("Test Value");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("renders icon when provided", () => {
    render(
      <WPQTCardDataItem
        label="Test Label"
        value="Test Value"
        icon={<span data-testid="icon">Icon</span>}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(
      <WPQTCardDataItem
        label="Test Label"
        value="Test Value"
        onClick={handleClick}
      />,
    );
    fireEvent.click(screen.getByText("Test Label:"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when link is clicked", () => {
    const handleClick = jest.fn();
    render(
      <WPQTCardDataItem
        label="Test Label"
        value="Test Value"
        valueLink="https://example.com"
        onClick={handleClick}
      />,
    );
    fireEvent.click(screen.getByText("Test Value"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies custom class names", () => {
    render(
      <WPQTCardDataItem
        label="Test Label"
        value="Test Value"
        className="custom-class"
        labelClassName="custom-label-class"
        valueClassName="custom-value-class"
      />,
    );
    expect(screen.getByText("Test Label:")).toHaveClass("custom-label-class");
    expect(screen.getByText("Test Value")).toHaveClass("custom-value-class");
    expect(screen.getByText("Test Label:").parentElement).toHaveClass(
      "custom-class",
    );
  });
});
