import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "./WPQTDropdown";

jest.mock("@headlessui/react", () => ({
  Menu: ({
    children,
  }: {
    children: (props: { close: () => void }) => React.ReactNode;
  }) => <div>{children({ close: jest.fn() })}</div>,
  MenuButton: ({
    children,
    onClick,
    className,
    "data-testid": testId,
  }: {
    children:
      | ((props: { active: boolean }) => React.ReactNode)
      | React.ReactNode;
    onClick?: React.MouseEventHandler;
    className?: string;
    "data-testid"?: string;
  }) => (
    <div data-testid={testId} className={className} onClick={onClick}>
      {typeof children === "function" ? children({ active: false }) : children}
    </div>
  ),
  MenuItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  MenuItems: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
}));

jest.mock("../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: () => null,
}));

afterEach(() => jest.clearAllMocks());

// ─── WPQTDropdown ────────────────────────────────────────────────────────────

describe("WPQTDropdown", () => {
  it("renders the menuBtn via render prop", () => {
    render(
      <WPQTDropdown
        menuBtn={({ active }) => (
          <span data-testid="menu-btn" data-active={active}>
            Btn
          </span>
        )}
      >
        <div>menu content</div>
      </WPQTDropdown>,
    );
    expect(screen.getByTestId("menu-btn")).toBeInTheDocument();
  });

  it("renders static children directly", () => {
    render(
      <WPQTDropdown menuBtn={() => <span>Btn</span>}>
        <div data-testid="static-child">Static</div>
      </WPQTDropdown>,
    );
    expect(screen.getByTestId("static-child")).toBeInTheDocument();
  });

  it("passes close to children when children is a function", () => {
    const childFn = jest.fn(() => <div data-testid="fn-child">fn</div>);
    render(
      <WPQTDropdown menuBtn={() => <span>Btn</span>}>{childFn}</WPQTDropdown>,
    );
    expect(screen.getByTestId("fn-child")).toBeInTheDocument();
    expect(childFn).toHaveBeenCalledWith(expect.any(Function));
  });

  it("forwards data-testid to the MenuButton", () => {
    render(
      <WPQTDropdown menuBtn={() => <span>Btn</span>} data-testid="my-menu-btn">
        <div>content</div>
      </WPQTDropdown>,
    );
    expect(screen.getByTestId("my-menu-btn")).toBeInTheDocument();
  });

  it("stops propagation when MenuButton is clicked", () => {
    const parentClick = jest.fn();
    render(
      <div onClick={parentClick}>
        <WPQTDropdown menuBtn={() => <span>Btn</span>} data-testid="menu-btn">
          <div>content</div>
        </WPQTDropdown>
      </div>,
    );
    fireEvent.click(screen.getByTestId("menu-btn"));
    expect(parentClick).not.toHaveBeenCalled();
  });
});

// ─── WPQTDropdownIcon ─────────────────────────────────────────────────────────

describe("WPQTDropdownIcon", () => {
  it("renders the icon with data-testid", () => {
    render(
      <WPQTDropdownIcon
        IconComponent={EllipsisHorizontalIcon}
        isActive={false}
      />,
    );
    expect(screen.getByTestId("dropdown-icon")).toBeInTheDocument();
  });

  it("applies active class when isActive is true", () => {
    render(
      <WPQTDropdownIcon
        IconComponent={EllipsisHorizontalIcon}
        isActive={true}
      />,
    );
    expect(screen.getByTestId("dropdown-icon")).toHaveClass(
      "wpqt-text-qtBlueHover",
    );
  });

  it("does not apply active class when isActive is false", () => {
    render(
      <WPQTDropdownIcon
        IconComponent={EllipsisHorizontalIcon}
        isActive={false}
      />,
    );
    expect(screen.getByTestId("dropdown-icon")).not.toHaveClass(
      "wpqt-text-qtBlueHover",
    );
  });
});

// ─── WPQTDropdownItem ─────────────────────────────────────────────────────────

describe("WPQTDropdownItem", () => {
  const icon = <span data-testid="icon">icon</span>;

  it("renders the text and icon", () => {
    render(<WPQTDropdownItem text="Delete" icon={icon} onClick={jest.fn()} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick when not disabled", () => {
    const onClick = jest.fn();
    render(<WPQTDropdownItem text="Action" icon={icon} onClick={onClick} />);
    fireEvent.click(screen.getByText("Action"));
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const onClick = jest.fn();
    render(
      <WPQTDropdownItem text="Action" icon={icon} onClick={onClick} disabled />,
    );
    fireEvent.click(screen.getByText("Action"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies disabled styling when disabled", () => {
    const { container } = render(
      <WPQTDropdownItem text="Action" icon={icon} disabled />,
    );
    const itemDiv = container.querySelector(".wpqt-cursor-not-allowed");
    expect(itemDiv).toBeInTheDocument();
    expect(itemDiv).toHaveClass("wpqt-line-through");
  });

  it("shows loading state: text invisible and loading oval visible", () => {
    render(<WPQTDropdownItem text="Action" icon={icon} loading />);
    expect(screen.getByText("Action")).toHaveClass("wpqt-invisible");
    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
  });

  it("shows tooltip attributes when tooltipText and id are provided", () => {
    const { container } = render(
      <WPQTDropdownItem
        text="Action"
        icon={icon}
        id="item-tooltip"
        tooltipText="Tooltip content"
      />,
    );
    const itemDiv = container.querySelector('[data-tooltip-id="item-tooltip"]');
    expect(itemDiv).toBeInTheDocument();
    expect(itemDiv).toHaveAttribute("data-tooltip-content", "Tooltip content");
  });

  it("does not show tooltip when tooltipText is empty", () => {
    const { container } = render(
      <WPQTDropdownItem
        text="Action"
        icon={icon}
        id="item-tooltip"
        tooltipText=""
      />,
    );
    expect(
      container.querySelector('[data-tooltip-id="item-tooltip"]'),
    ).not.toBeInTheDocument();
  });
});
