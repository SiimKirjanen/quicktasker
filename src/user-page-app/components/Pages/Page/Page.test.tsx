import { fireEvent, render, screen } from "@testing-library/react";
import { PageContentWrap, PageScreenMiddle, PageTitle, PageWrap } from "./Page";

// Mock NavigationBar to observe props & interaction
const onRefreshMock = jest.fn();
jest.mock("../../Navigation/Navigation", () => ({
  NavigationBar: ({
    loading,
    onRefresh,
  }: {
    loading?: boolean;
    onRefresh?: () => void;
  }) => (
    <div
      data-testid="navigation-bar"
      data-loading={loading ? "true" : "false"}
      onClick={onRefresh}
    >
      Nav
    </div>
  ),
}));

describe("PageWrap", () => {
  beforeEach(() => {
    onRefreshMock.mockClear();
  });

  it("renders children and NavigationBar with loading=false by default", () => {
    render(
      <PageWrap>
        <div data-testid="child">Child</div>
      </PageWrap>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    const nav = screen.getByTestId("navigation-bar");
    expect(nav).toHaveAttribute("data-loading", "false");
  });

  it("passes loading and onRefresh props to NavigationBar", () => {
    render(
      <PageWrap loading onRefresh={onRefreshMock}>
        <div>Content</div>
      </PageWrap>,
    );
    const nav = screen.getByTestId("navigation-bar");
    expect(nav).toHaveAttribute("data-loading", "true");
    fireEvent.click(nav);
    expect(onRefreshMock).toHaveBeenCalled();
  });

  it("applies extra className to scroll container", () => {
    const extra = "custom-class";
    const { container } = render(
      <PageWrap className={extra}>
        <div />
      </PageWrap>,
    );
    // First scrollable div has the composed classes
    const scrollDiv = container.querySelector(
      ".wpqt-user-app-content-height",
    ) as HTMLElement;
    expect(scrollDiv).toHaveClass(extra);
  });
});

describe("PageContentWrap", () => {
  it("wraps children with padding class", () => {
    const { container } = render(
      <PageContentWrap>
        <span data-testid="inner">Inside</span>
      </PageContentWrap>,
    );
    expect(screen.getByTestId("inner")).toBeInTheDocument();
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("wpqt-p-4");
  });
});

describe("PageScreenMiddle", () => {
  it("centers children vertically and horizontally", () => {
    const { container } = render(
      <PageScreenMiddle>
        <div data-testid="centered">Centered</div>
      </PageScreenMiddle>,
    );
    expect(screen.getByTestId("centered")).toBeInTheDocument();
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toEqual(expect.stringContaining("wpqt-h-screen"));
    expect(wrapper.className).toEqual(
      expect.stringContaining("wpqt-items-center"),
    );
    expect(wrapper.className).toEqual(
      expect.stringContaining("wpqt-justify-center"),
    );
  });
});

describe("PageTitle", () => {
  it("renders title and optional description", () => {
    render(<PageTitle description="Desc here">Main Title</PageTitle>);
    expect(screen.getByText("Main Title")).toBeInTheDocument();
    expect(screen.getByText("Desc here")).toBeInTheDocument();
  });

  it("applies custom className and titleClassName", () => {
    const { container } = render(
      <PageTitle className="outer-x" titleClassName="inner-y">
        Title
      </PageTitle>,
    );
    const outer = container.firstChild as HTMLElement;
    expect(outer).toHaveClass("outer-x");
    const heading = screen.getByText("Title");
    expect(heading).toHaveClass("inner-y");
    expect(heading.className).toEqual(expect.stringContaining("wpqt-text-2xl"));
  });

  it("does not render description element if description prop missing", () => {
    render(<PageTitle>Title Only</PageTitle>);
    expect(screen.getByText("Title Only")).toBeInTheDocument();

    const gray = screen.queryByText((_text, el) =>
      (el as HTMLElement).className.includes("wpqt-text-gray-600"),
    );
    expect(gray).toBeNull();
  });
});
