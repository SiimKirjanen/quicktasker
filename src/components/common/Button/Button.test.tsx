import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonStyleType, ButtonType, WPQTButton } from "./Button";

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
