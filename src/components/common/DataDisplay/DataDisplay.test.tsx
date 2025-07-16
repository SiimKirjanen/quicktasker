import { render, screen } from "@testing-library/react";
import { DataDisplay, DisplayRow } from "./DataDisplay";

describe("DataDisplay Component", () => {
  test("renders children correctly", () => {
    render(
      <DataDisplay>
        <span data-testid="test-content">Test Content</span>
      </DataDisplay>,
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });
});

describe("DisplayRow Component", () => {
  test("renders label and children", () => {
    render(
      <DisplayRow label="Test Label">
        <span data-testid="test-content">Test Content</span>
      </DisplayRow>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });

  test("applies custom className when provided", () => {
    render(
      <DisplayRow label="Test Label" className="custom-class">
        <span>Content</span>
      </DisplayRow>,
    );

    const container = screen.getByText("Test Label").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  test("works without className prop", () => {
    render(
      <DisplayRow label="Test Label">
        <span>Content</span>
      </DisplayRow>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
