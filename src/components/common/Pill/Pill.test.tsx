import { fireEvent, render, screen } from "@testing-library/react";
import { Pill } from "./Pill";

describe("Pill Component", () => {
  test("renders label correctly", () => {
    render(<Pill value="test-value" label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("applies additional class names", () => {
    render(
      <Pill value="test-value" label="Test Label" className="custom-class" />,
    );
    const pillElement = screen.getByText("Test Label");
    expect(pillElement).toHaveClass("custom-class");
  });

  test("calls onClick with the correct value", () => {
    const handleClick = jest.fn();
    render(
      <Pill value="test-value" label="Test Label" onClick={handleClick} />,
    );
    const pillElement = screen.getByText("Test Label");
    fireEvent.click(pillElement);
    expect(handleClick).toHaveBeenCalledWith("test-value");
  });

  test("does not throw error if onClick is not provided", () => {
    render(<Pill value="test-value" label="Test Label" />);
    const pillElement = screen.getByText("Test Label");
    expect(() => fireEvent.click(pillElement)).not.toThrow();
  });
});
