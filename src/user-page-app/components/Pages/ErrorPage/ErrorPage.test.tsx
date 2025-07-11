import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";

// Mock the PageScreenMiddle component
jest.mock("../Page/Page", () => ({
  PageScreenMiddle: jest.fn(({ children }) => (
    <div data-testid="page-screen-middle">{children}</div>
  )),
}));

describe("ErrorPage", () => {
  test("renders error title correctly", () => {
    render(<ErrorPage errorTitle="Test Error" />);

    // Check if the title is rendered
    expect(screen.getByText("Test Error")).toBeInTheDocument();

    // Check if PageScreenMiddle is used
    expect(screen.getByTestId("page-screen-middle")).toBeInTheDocument();
  });

  test("renders error description when provided", () => {
    const errorTitle = "Error Title";
    const errorDescription = "This is a detailed error description";

    render(
      <ErrorPage errorTitle={errorTitle} errorDescription={errorDescription} />,
    );

    // Check if both title and description are rendered
    expect(screen.getByText(errorTitle)).toBeInTheDocument();
    expect(screen.getByText(errorDescription)).toBeInTheDocument();
  });

  test("does not render error description when not provided", () => {
    const errorTitle = "Error Title Only";

    render(<ErrorPage errorTitle={errorTitle} />);

    // Check that title is rendered
    expect(screen.getByText(errorTitle)).toBeInTheDocument();

    // Check that there's only one paragraph element (or none)
    const paragraphs = screen.queryAllByRole("paragraph");
    expect(paragraphs.length).toBeLessThanOrEqual(1);

    // Alternative check: Ensure the container only has one child (the h2)
    const container = screen.getByTestId("page-screen-middle");
    expect(container.children.length).toBe(1);
  });

  test("renders with correct HTML elements", () => {
    const errorTitle = "Error Title";
    const errorDescription = "Error Description";

    render(
      <ErrorPage errorTitle={errorTitle} errorDescription={errorDescription} />,
    );

    // Check that the title is in an h2 tag
    const titleElement = screen.getByText(errorTitle);
    expect(titleElement.tagName).toBe("H2");

    // Check that the description is in a p tag
    const descriptionElement = screen.getByText(errorDescription);
    expect(descriptionElement.tagName).toBe("P");
  });
});
