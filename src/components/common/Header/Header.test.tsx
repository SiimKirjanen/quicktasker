import { render, screen } from "@testing-library/react";
import { WPQTPageHeader } from "./Header";

describe("WPQTPageHeader Component", () => {
  test("renders title and description", () => {
    render(
      <WPQTPageHeader description="This is a description">
        Page Title
      </WPQTPageHeader>,
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Page Title",
    );
    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  test("renders with icon", () => {
    const testIcon = <span data-testid="test-icon">📄</span>;
    render(
      <WPQTPageHeader description="desc" icon={testIcon}>
        Page Title
      </WPQTPageHeader>,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  test("renders without icon", () => {
    render(<WPQTPageHeader description="desc">Page Title</WPQTPageHeader>);
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
  });

  test("renders with rightSideContent", () => {
    const rightContent = <button data-testid="right-btn">Right</button>;
    render(
      <WPQTPageHeader description="desc" rightSideContent={rightContent}>
        Page Title
      </WPQTPageHeader>,
    );
    expect(screen.getByTestId("right-btn")).toBeInTheDocument();
  });

  test("renders with all props", () => {
    const testIcon = <span data-testid="test-icon">📄</span>;
    const rightContent = <button data-testid="right-btn">Right</button>;
    render(
      <WPQTPageHeader
        description="desc"
        icon={testIcon}
        rightSideContent={rightContent}
      >
        Page Title
      </WPQTPageHeader>,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-btn")).toBeInTheDocument();
  });

  test("handles null icon and rightSideContent", () => {
    render(
      <WPQTPageHeader description="desc" icon={null} rightSideContent={null}>
        Page Title
      </WPQTPageHeader>,
    );
    expect(screen.getByText("Page Title")).toBeInTheDocument();
  });
});
