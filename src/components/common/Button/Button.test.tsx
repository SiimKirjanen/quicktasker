import { fireEvent, render, screen } from "@testing-library/react";
import {
  ButtonStyleType,
  ButtonType,
  WPQTButton,
  WPQTIconButton,
  WPQTOnlyIconBtn,
} from "./Button";

// Mock the LoadingOval component
jest.mock("../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval">Loading...</div>,
}));

// Mock the WPQTTooltip component
jest.mock("../../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: ({ id }: { id: string }) => (
    <div data-testid={`tooltip-${id}`}>Tooltip</div>
  ),
}));

describe("WPQTButton Component", () => {
  test("renders with default props", () => {
    render(<WPQTButton btnText="Click me" />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass("wpqt-bg-blue-500"); // Primary style by default
  });

  test("renders with custom class name", () => {
    render(<WPQTButton btnText="Click me" className="custom-class" />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("custom-class");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<WPQTButton btnText="Click me" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("can be disabled", () => {
    render(<WPQTButton btnText="Click me" disabled />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeDisabled();
  });

  test("shows loading state when loading is true", () => {
    render(<WPQTButton btnText="Click me" loading />);

    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("applies primary style correctly", () => {
    render(
      <WPQTButton
        btnText="Click me"
        buttonStyleType={ButtonStyleType.PRIMARY}
      />,
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("wpqt-bg-blue-500");
    expect(button).not.toHaveClass("wpqt-bg-gray-100");
    expect(button).not.toHaveClass("wpqt-bg-red-500");
  });

  test("applies secondary style correctly", () => {
    render(
      <WPQTButton
        btnText="Click me"
        buttonStyleType={ButtonStyleType.SECONDARY}
      />,
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("wpqt-bg-gray-100");
    expect(button).not.toHaveClass("wpqt-bg-blue-500");
    expect(button).not.toHaveClass("wpqt-bg-red-500");
  });

  test("applies danger style correctly", () => {
    render(
      <WPQTButton
        btnText="Click me"
        buttonStyleType={ButtonStyleType.DANGER}
      />,
    );

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toHaveClass("wpqt-bg-red-500");
    expect(button).not.toHaveClass("wpqt-bg-blue-500");
    expect(button).not.toHaveClass("wpqt-bg-gray-100");
  });

  test("sets button type correctly", () => {
    render(<WPQTButton btnText="Submit" type={ButtonType.SUBMIT} />);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
  });
});

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

describe("WPQTOnlyIconBtn Component", () => {
  const mockIcon = <span data-testid="icon">Icon</span>;

  test("renders with icon", () => {
    render(<WPQTOnlyIconBtn icon={mockIcon} onClick={() => {}} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("applies custom class name", () => {
    render(
      <WPQTOnlyIconBtn
        icon={mockIcon}
        onClick={() => {}}
        className="custom-class"
      />,
    );

    // Get the parent of the inner div
    const innerContainer = screen.getByTestId("icon").closest("div");
    const buttonContainer = innerContainer?.parentElement;

    expect(buttonContainer).toHaveClass("custom-class");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<WPQTOnlyIconBtn icon={mockIcon} onClick={handleClick} />);

    const buttonContainer = screen.getByTestId("icon").closest("div");
    // Add null check
    expect(buttonContainer).not.toBeNull();
    // Already has non-null assertion
    fireEvent.click(buttonContainer!);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("shows loading state when loading is true", () => {
    render(<WPQTOnlyIconBtn icon={mockIcon} onClick={() => {}} loading />);

    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      "wpqt-invisible",
    );
  });
});
