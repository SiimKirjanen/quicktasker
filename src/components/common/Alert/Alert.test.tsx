import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

describe("Alert Component", () => {
  test("renders children correctly", () => {
    render(<Alert>Test Alert</Alert>);
    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  test("applies the correct default type class", () => {
    render(<Alert>Test Alert</Alert>);
    const alertElement = screen.getByText("Test Alert");
    expect(alertElement).toHaveClass("wpqt-bg-gray-100");
    expect(alertElement).toHaveClass("wpqt-border-gray-400");
    expect(alertElement).toHaveClass("wpqt-text-gray-700");
  });

  test("applies the correct type class for success", () => {
    render(<Alert type="success">Success Alert</Alert>);
    const alertElement = screen.getByText("Success Alert");
    expect(alertElement).toHaveClass("wpqt-bg-green-100");
    expect(alertElement).toHaveClass("wpqt-border-green-400");
    expect(alertElement).toHaveClass("wpqt-text-green-700");
  });

  test("applies the correct type class for error", () => {
    render(<Alert type="error">Error Alert</Alert>);
    const alertElement = screen.getByText("Error Alert");
    expect(alertElement).toHaveClass("wpqt-bg-red-100");
    expect(alertElement).toHaveClass("wpqt-border-red-400");
    expect(alertElement).toHaveClass("wpqt-text-red-700");
  });

  test("applies the correct type class for warning", () => {
    render(<Alert type="warning">Warning Alert</Alert>);
    const alertElement = screen.getByText("Warning Alert");
    expect(alertElement).toHaveClass("wpqt-bg-yellow-100");
    expect(alertElement).toHaveClass("wpqt-border-yellow-400");
    expect(alertElement).toHaveClass("wpqt-text-yellow-700");
  });

  test("applies the correct type class for info", () => {
    render(<Alert type="info">Info Alert</Alert>);
    const alertElement = screen.getByText("Info Alert");
    expect(alertElement).toHaveClass("wpqt-bg-blue-100");
    expect(alertElement).toHaveClass("wpqt-border-blue-400");
    expect(alertElement).toHaveClass("wpqt-text-blue-700");
  });

  test("applies additional class names", () => {
    render(<Alert className="custom-class">Custom Class Alert</Alert>);
    const alertElement = screen.getByText("Custom Class Alert");
    expect(alertElement).toHaveClass("custom-class");
  });
});
