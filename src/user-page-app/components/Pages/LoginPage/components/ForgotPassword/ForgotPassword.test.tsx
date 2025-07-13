import { fireEvent, render, screen } from "@testing-library/react";
import { ForgotPassword } from "./ForgotPassword";

// Mock WordPress i18n functions
jest.mock("@wordpress/i18n", () => ({
  __: jest.fn((str) => str),
  // Add other i18n functions if needed
}));

describe("ForgotPassword", () => {
  test("renders the 'Forgot the password?' text", () => {
    render(<ForgotPassword />);

    const linkText = screen.getByText("Forgot the password?");
    expect(linkText).toBeInTheDocument();
  });

  test("should not show guidance text initially", () => {
    render(<ForgotPassword />);

    const guidanceText = screen.queryByText(
      "Please contact the site admin to reset your password",
    );

    expect(guidanceText).toHaveClass("wpqt-hidden");
  });

  test("should show guidance text when clicked", () => {
    render(<ForgotPassword />);

    // Click the forgot password text
    const linkText = screen.getByText("Forgot the password?");
    fireEvent.click(linkText);

    // Check if guidance text is now visible
    const guidanceText = screen.getByText(
      "Please contact the site admin to reset your password",
    );

    expect(guidanceText).toBeVisible();
  });

  test("should hide guidance text when clicked again", () => {
    render(<ForgotPassword />);

    // Click to show guidance
    const linkText = screen.getByText("Forgot the password?");
    fireEvent.click(linkText);

    // Click again to hide guidance
    fireEvent.click(linkText);

    // Check if guidance text has hidden class
    const guidanceText = screen.queryByText(
      "Please contact the site admin to reset your password",
    );

    expect(guidanceText).toHaveClass("wpqt-hidden");
  });
});
