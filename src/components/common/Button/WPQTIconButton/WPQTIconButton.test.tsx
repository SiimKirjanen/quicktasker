import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTIconButton } from "./WPQTIconButton";

// Mock the LoadingOval component
jest.mock("../../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval">Loading...</div>,
}));

// Mock the WPQTTooltip component
jest.mock("../../../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: ({ id }: { id: string }) => (
    <div data-testid={`tooltip-${id}`}>Tooltip</div>
  ),
}));

describe("WPQTIconButton Component", () => {
  const mockIcon = <span data-testid="icon">Icon</span>;

  test("renders with icon and text", () => {
    render(
      <WPQTIconButton icon={mockIcon} text="Button Text" onClick={() => {}} />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });

  test("renders with only icon", () => {
    render(<WPQTIconButton icon={mockIcon} onClick={() => {}} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.queryByText("Button Text")).not.toBeInTheDocument();
  });

  test("applies custom class name", () => {
    render(
      <WPQTIconButton
        icon={mockIcon}
        text="Button Text"
        onClick={() => {}}
        className="custom-class"
      />,
    );

    const buttonContainer =
      screen.getByText("Button Text").parentElement?.parentElement;
    // Add null check
    expect(buttonContainer).not.toBeNull();
    // Use non-null assertion
    expect(buttonContainer!).toHaveClass("custom-class");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<WPQTIconButton icon={mockIcon} onClick={handleClick} />);

    const buttonContainer = screen.getByTestId("icon").parentElement;
    // Add null check
    expect(buttonContainer).not.toBeNull();
    // Use non-null assertion operator (!) to tell TypeScript it won't be null
    fireEvent.click(buttonContainer!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shows loading state when loading is true", () => {
    render(
      <WPQTIconButton
        icon={mockIcon}
        text="Button Text"
        onClick={() => {}}
        loading
      />,
    );

    // Use "as HTMLElement" to tell TypeScript this won't be null
    expect(
      screen.getByTestId("loading-oval") as HTMLElement,
    ).toBeInTheDocument();
    expect(screen.getByText("Button Text") as HTMLElement).toHaveClass(
      "wpqt-invisible",
    );
  });

  test("renders tooltip when tooltipId and tooltipText are provided", () => {
    render(
      <WPQTIconButton
        icon={mockIcon}
        onClick={() => {}}
        tooltipId="test-tooltip"
        tooltipText="Tooltip content"
      />,
    );

    const buttonContainer = screen.getByTestId("icon").parentElement;
    expect(buttonContainer).toHaveAttribute("data-tooltip-id", "test-tooltip");
    expect(buttonContainer).toHaveAttribute(
      "data-tooltip-content",
      "Tooltip content",
    );
    expect(screen.getByTestId("tooltip-test-tooltip")).toBeInTheDocument();
  });

  test("doesn't render tooltip when tooltipId or tooltipText is missing", () => {
    render(
      <WPQTIconButton
        icon={mockIcon}
        onClick={() => {}}
        tooltipId="test-tooltip"
      />,
    );

    expect(
      screen.queryByTestId("tooltip-test-tooltip"),
    ).not.toBeInTheDocument();

    render(
      <WPQTIconButton
        icon={mockIcon}
        onClick={() => {}}
        tooltipText="Tooltip content"
      />,
    );

    expect(screen.queryByTestId("tooltip-undefined")).not.toBeInTheDocument();
  });
});
