import { render, screen } from "@testing-library/react";
import { WPQTLabel } from "./WPQTLabel";

describe("WPQTLabel Component", () => {
  test("renders label text", () => {
    render(<WPQTLabel>Test Label</WPQTLabel>);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  test("renders as label element", () => {
    render(<WPQTLabel>Test Label</WPQTLabel>);

    const label = screen.getByText("Test Label");
    expect(label.tagName).toBe("LABEL");
  });

  test("sets htmlFor attribute when labelFor prop is provided", () => {
    render(<WPQTLabel labelFor="input-id">Test Label</WPQTLabel>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "input-id");
  });

  test("works without labelFor prop", () => {
    render(<WPQTLabel>Test Label</WPQTLabel>);

    const label = screen.getByText("Test Label");
    expect(label).not.toHaveAttribute("for");
  });

  test("applies custom className when provided", () => {
    render(<WPQTLabel className="custom-class">Test Label</WPQTLabel>);

    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("custom-class");
  });

  test("works without className prop", () => {
    render(<WPQTLabel>Test Label</WPQTLabel>);

    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  test("combines labelFor and className props", () => {
    render(
      <WPQTLabel labelFor="input-id" className="custom-class">
        Test Label
      </WPQTLabel>,
    );

    const label = screen.getByText("Test Label");
    expect(label).toHaveAttribute("for", "input-id");
    expect(label).toHaveClass("custom-class");
  });
});
