import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTCard } from "./Card";

describe("WPQTCard", () => {
  test("renders title and description", () => {
    render(<WPQTCard title="Test Title" description="Test Description" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders children", () => {
    render(
      <WPQTCard title="Test Title">
        <div>Child Content</div>
      </WPQTCard>,
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  test("renders dropdown when provided", () => {
    render(
      <WPQTCard title="Test Title" dropdown={<div>Dropdown Content</div>} />,
    );
    expect(screen.getByText("Dropdown Content")).toBeInTheDocument();
  });

  test("applies custom class names", () => {
    render(
      <WPQTCard
        title="Test Title"
        className="custom-class"
        titleClassName="custom-title-class"
      />,
    );
    expect(screen.getByText("Test Title")).toHaveClass("custom-title-class");
    expect(
      screen.getByText("Test Title").parentElement?.parentElement,
    ).toHaveClass("custom-class");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<WPQTCard title="Test Title" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not render description when not provided", () => {
    render(<WPQTCard title="Test Title" />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });
});
