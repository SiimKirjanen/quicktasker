import { render, screen } from "@testing-library/react";
import { WPQTPageHeader } from "./Header";

describe("WPQTPageHeader Component", () => {
  test("renders title text", () => {
    render(<WPQTPageHeader>Page Title</WPQTPageHeader>);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page Title",
    );
  });

  test("renders with description", () => {
    render(
      <WPQTPageHeader description="This is a description">
        Page Title
      </WPQTPageHeader>,
    );

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  test("works without description", () => {
    render(<WPQTPageHeader>Page Title</WPQTPageHeader>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });

  test("renders with icon", () => {
    const testIcon = <span data-testid="test-icon">📄</span>;

    render(<WPQTPageHeader icon={testIcon}>Page Title</WPQTPageHeader>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  test("works without icon", () => {
    render(<WPQTPageHeader>Page Title</WPQTPageHeader>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
  });

  test("renders with both description and icon", () => {
    const testIcon = <span data-testid="test-icon">📄</span>;

    render(
      <WPQTPageHeader description="Page description" icon={testIcon}>
        Page Title
      </WPQTPageHeader>,
    );

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByText("Page description")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  test("handles null description explicitly", () => {
    render(<WPQTPageHeader description={null}>Page Title</WPQTPageHeader>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    // No description should be rendered
  });

  test("handles null icon explicitly", () => {
    render(<WPQTPageHeader icon={null}>Page Title</WPQTPageHeader>);

    expect(screen.getByText("Page Title")).toBeInTheDocument();
    // No icon should be rendered
  });
});
