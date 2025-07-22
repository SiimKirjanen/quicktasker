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
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("renders as a div element", () => {
    render(
      <DataDisplay>
        <span>Child Content</span>
      </DataDisplay>,
    );

    // Get the parent element of the span
    const container = screen.getByText("Child Content").parentElement;
    expect(container?.tagName).toBe("DIV");
  });

  test("renders multiple children", () => {
    render(
      <DataDisplay>
        <span>First Child</span>
        <span>Second Child</span>
        <span>Third Child</span>
      </DataDisplay>,
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
    expect(screen.getByText("Third Child")).toBeInTheDocument();
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
    // Also verify the default classes are still applied
    expect(container).toHaveClass("wpqt-mb-1");
  });

  test("works without className prop", () => {
    render(
      <DisplayRow label="Test Label">
        <span>Content</span>
      </DisplayRow>,
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();

    const container = screen.getByText("Test Label").parentElement;
    expect(container).toHaveClass("wpqt-mb-1");
  });

  test("renders without label when not provided", () => {
    render(
      <DisplayRow>
        <span>Just Content</span>
      </DisplayRow>,
    );

    // Verify no label is rendered
    const content = screen.getByText("Just Content");
    expect(content).toBeInTheDocument();

    // Verify parent structure
    const container = content.parentElement;
    expect(container?.textContent).toBe("Just Content");
  });

  test("applies appropriate styling to label", () => {
    render(
      <DisplayRow label="Test Label">
        <span>Content</span>
      </DisplayRow>,
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("wpqt-font-semibold");
  });

  test("applies appropriate styling to content", () => {
    render(
      <DisplayRow label="Test Label">
        <span data-testid="child-content">Content</span>
      </DisplayRow>,
    );

    // The parent of the child content should be the text-base span
    const contentContainer = screen.getByTestId("child-content").parentElement;
    expect(contentContainer).toHaveClass("wpqt-text-base");
  });
});
