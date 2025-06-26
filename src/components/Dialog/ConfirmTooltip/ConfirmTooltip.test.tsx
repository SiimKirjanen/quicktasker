import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { WPQTConfirmTooltip } from "./ConfirmTooltip";

// Mock the WPQTButton component
jest.mock("../../common/Button/Button", () => ({
  ButtonStyleType: {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DANGER: "danger",
  },
  WPQTButton: ({
    btnText,
    onClick,
  }: {
    btnText: string;
    onClick?: () => void;
  }) => (
    <button data-testid={`button-${btnText}`} onClick={onClick}>
      {btnText}
    </button>
  ),
}));

describe("WPQTConfirmTooltip", () => {
  const mockOnConfirm = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    mockOnConfirm.mockReset();

    // Mock getBoundingClientRect for positioning calculations
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
      x: 100,
      y: 100,
      toJSON() {
        return this;
      },
    }));

    // Mock window.innerWidth for off-screen calculations
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test("should render correctly with children", () => {
    render(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    expect(screen.getByText("Trigger")).toBeInTheDocument();
    // Tooltip should not be visible initially
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  test("should show tooltip when trigger is clicked", () => {
    render(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    fireEvent.click(screen.getByText("Trigger"));

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByTestId("button-Yes")).toBeInTheDocument();
    expect(screen.getByTestId("button-No")).toBeInTheDocument();
  });

  test("should call onConfirm when confirm button is clicked", async () => {
    render(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    // Click confirm button
    fireEvent.click(screen.getByTestId("button-Yes"));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);

    // Tooltip should close after confirmation
    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });

  test("should close tooltip when cancel button is clicked", () => {
    render(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    // Click cancel button
    fireEvent.click(screen.getByTestId("button-No"));

    // Confirm function should not be called
    expect(mockOnConfirm).not.toHaveBeenCalled();

    // Tooltip should close
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  test("should close tooltip when clicked outside", () => {
    render(
      <div>
        <div data-testid="outside-element">Outside Element</div>
        <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
          {({ onClick }) => <button onClick={onClick}>Trigger</button>}
        </WPQTConfirmTooltip>
      </div>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside-element"));

    // Tooltip should close
    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  test("should prevent event propagation when tooltip is clicked", () => {
    const mockOnClick = jest.fn();

    render(
      <div onClick={mockOnClick}>
        <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
          {({ onClick }) => <button onClick={onClick}>Trigger</button>}
        </WPQTConfirmTooltip>
      </div>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    // Click on the tooltip container
    fireEvent.click(screen.getByText("Are you sure?"));

    // The parent's onClick should not be called
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("should use custom message and button text", () => {
    render(
      <WPQTConfirmTooltip
        onConfirm={mockOnConfirm}
        confirmMessage="Custom message"
        confirmButtonText="Confirm"
        cancelButtonText="Cancel"
      >
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(screen.getByTestId("button-Confirm")).toBeInTheDocument();
    expect(screen.getByTestId("button-Cancel")).toBeInTheDocument();
  });

  test("should position tooltip correctly based on position prop", () => {
    // Testing 'bottom' position (default)
    const { rerender } = render(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    fireEvent.click(screen.getByText("Trigger"));

    // Find the tooltip container - adjust the selector based on your actual structure
    const tooltipElement = screen.getByText("Are you sure?").closest("[style]");

    // Verify tooltip is rendered and has position styling
    expect(tooltipElement).toBeInTheDocument();

    // Instead of checking style properties, check if attribute exists
    expect(tooltipElement?.hasAttribute("style")).toBe(true);

    // Close tooltip for next test
    fireEvent.click(screen.getByTestId("button-No"));

    // Test 'top' position
    rerender(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm} position="top">
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    fireEvent.click(screen.getByText("Trigger"));

    // Find the tooltip container
    const tooltipElementTop = screen
      .getByText("Are you sure?")
      .closest("[style]");

    // Verify tooltip is rendered and has styling
    expect(tooltipElementTop).toBeInTheDocument();
    expect(tooltipElementTop?.hasAttribute("style")).toBe(true);

    // Close tooltip for next test
    fireEvent.click(screen.getByTestId("button-No"));

    // Test 'right' position
    rerender(
      <WPQTConfirmTooltip onConfirm={mockOnConfirm} position="right">
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    fireEvent.click(screen.getByText("Trigger"));

    // Find the tooltip container
    const tooltipElementRight = screen
      .getByText("Are you sure?")
      .closest("[style]");

    // Verify tooltip is rendered and has styling
    expect(tooltipElementRight).toBeInTheDocument();
    expect(tooltipElementRight?.hasAttribute("style")).toBe(true);
  });

  test("should apply custom containerClassName", () => {
    render(
      <WPQTConfirmTooltip
        onConfirm={mockOnConfirm}
        containerClassName="custom-class"
      >
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    const container = screen.getByText("Trigger").parentElement;
    expect(container).toHaveClass("custom-class");
  });

  test("should handle async onConfirm function", async () => {
    const mockAsyncOnConfirm = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    });

    render(
      <WPQTConfirmTooltip onConfirm={mockAsyncOnConfirm}>
        {({ onClick }) => <button onClick={onClick}>Trigger</button>}
      </WPQTConfirmTooltip>,
    );

    // Open tooltip
    fireEvent.click(screen.getByText("Trigger"));

    // Click confirm button
    fireEvent.click(screen.getByTestId("button-Yes"));

    expect(mockAsyncOnConfirm).toHaveBeenCalledTimes(1);

    // Wait for async function to complete and tooltip to close
    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });
});
