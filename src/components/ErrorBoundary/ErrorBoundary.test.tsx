import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

function ThrowingChild({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error message");
  }
  return <div>Child content</div>;
}

describe("ErrorBoundary", () => {
  it("renders children normally when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText(/Something went wrong. Please refresh the page./),
    ).toBeInTheDocument();
  });

  it("displays the error message in the fallback UI", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(container).toHaveTextContent("Test error message");
  });

  it("calls console.error via componentDidCatch when an error is caught", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(console.error).toHaveBeenCalled();
  });

  it("does not show fallback UI when no error has occurred", () => {
    render(
      <ErrorBoundary>
        <ThrowingChild shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.queryByText(/Something went wrong/)).not.toBeInTheDocument();
  });
});
