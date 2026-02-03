import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTOnlyIconBtn } from "./WPQTOnlyIconBtn";

// Mock the LoadingOval component
jest.mock("../../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval">Loading...</div>,
}));

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
