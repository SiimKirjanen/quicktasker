import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { logInUserPageRequest } from "../../../../../api/user-page-api";
import { SET_USER_LOGGED_IN } from "../../../../../constants";
import { useErrorHandler } from "../../../../../hooks/useErrorHandler";
import { useSession } from "../../../../../hooks/useSession";
import {
  initialState,
  UserPageAppContext,
} from "../../../../../providers/UserPageAppContextProvider";
import { QuickTaskerUserLogin } from "./QuickTaskerUserLogin";

// Mock dependencies
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("../../../../../api/user-page-api", () => ({
  logInUserPageRequest: jest.fn(),
}));

jest.mock("../../../../../hooks/useSession", () => ({
  useSession: jest.fn(),
}));

jest.mock("../../../../../hooks/useErrorHandler", () => ({
  useErrorHandler: jest.fn(),
}));

jest.mock("@wordpress/i18n", () => ({
  __: jest.fn((str) => str),
  sprintf: jest.fn((format, value) => format.replace("%s", value)),
}));

// Mock ForgotPassword component to simplify testing
jest.mock("../ForgotPassword/ForgotPassword", () => ({
  ForgotPassword: () => (
    <div data-testid="forgot-password">Forgot Password</div>
  ),
}));

describe("QuickTaskerUserLogin", () => {
  // Common test setup
  const mockDispatch = jest.fn();
  const mockSetSessionCookie = jest.fn();
  const mockHandleError = jest.fn();
  const defaultProps = {
    state: {
      ...initialState,
      userName: "TestUser",
    },
    userPageAppDispatch: mockDispatch,
    loadUserPageStatus: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mocks
    (useSession as jest.Mock).mockReturnValue({
      setSessionCookie: mockSetSessionCookie,
    });

    (useErrorHandler as jest.Mock).mockReturnValue({
      handleError: mockHandleError,
    });
  });

  test("renders the login form with correct user name", () => {
    render(
      <UserPageAppContext.Provider value={defaultProps}>
        <QuickTaskerUserLogin />
      </UserPageAppContext.Provider>,
    );

    // Check title with user name is shown
    expect(screen.getByText("Hello TestUser")).toBeInTheDocument();

    // Check form elements are present
    expect(screen.getByTestId("password-input")).toBeInTheDocument(); // Password input
    expect(screen.getByText("Login")).toBeInTheDocument(); // Login button
    expect(screen.getByTestId("forgot-password")).toBeInTheDocument(); // Forgot password component
  });

  test("shows error when submitting without password", async () => {
    render(
      <UserPageAppContext.Provider value={defaultProps}>
        <QuickTaskerUserLogin />
      </UserPageAppContext.Provider>,
    );

    // Submit form without entering password
    const submitButton = screen.getByText("Login");
    fireEvent.click(submitButton);

    // Check if toast.error was called
    expect(toast.error).toHaveBeenCalledWith("Please enter a password");

    // Verify no API calls were made
    expect(logInUserPageRequest).not.toHaveBeenCalled();
  });

  test("shows loading state and calls API when submitting with password", async () => {
    // Mock successful API response
    (logInUserPageRequest as jest.Mock).mockResolvedValue({
      data: { token: "test-token" },
    });

    render(
      <UserPageAppContext.Provider value={defaultProps}>
        <QuickTaskerUserLogin />
      </UserPageAppContext.Provider>,
    );

    // Enter password and submit form
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByText("Login");
    fireEvent.click(submitButton);

    // Check if loading state shows
    await waitFor(() => {
      expect(screen.queryByText("Login")).not.toBeInTheDocument();
      expect(screen.getByTestId("oval-loading")).toBeInTheDocument();
    });

    // Verify API call
    expect(logInUserPageRequest).toHaveBeenCalledWith("password123");
  });

  test("updates context and sets session cookie on successful login", async () => {
    // Mock successful API response
    const mockSessionData = { token: "test-token", expiresAt: "2023-12-31" };
    (logInUserPageRequest as jest.Mock).mockResolvedValue({
      data: mockSessionData,
    });

    render(
      <UserPageAppContext.Provider value={defaultProps}>
        <QuickTaskerUserLogin />
      </UserPageAppContext.Provider>,
    );

    // Enter password and submit form
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const submitButton = screen.getByText("Login");
    fireEvent.click(submitButton);

    // Wait for async operations to complete
    await waitFor(() => {
      // Verify session cookie was set
      expect(mockSetSessionCookie).toHaveBeenCalledWith(mockSessionData);

      // Verify context was updated
      expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_USER_LOGGED_IN,
        payload: true,
      });
    });
  });

  test("handles API errors properly", async () => {
    // Mock API error
    const mockError = new Error("Invalid credentials");
    (logInUserPageRequest as jest.Mock).mockRejectedValue(mockError);

    render(
      <UserPageAppContext.Provider value={defaultProps}>
        <QuickTaskerUserLogin />
      </UserPageAppContext.Provider>,
    );

    // Enter password and submit form
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "wrong-password" } });

    const submitButton = screen.getByText("Login");
    fireEvent.click(submitButton);

    // Wait for error handling
    await waitFor(() => {
      // Verify error handler was called
      expect(mockHandleError).toHaveBeenCalledWith(mockError);

      // Loading state should be removed
      expect(screen.getByText("Login")).toBeInTheDocument();
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });

    // Verify the user is not logged in
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
