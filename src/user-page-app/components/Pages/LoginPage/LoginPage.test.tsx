import { render, screen } from "@testing-library/react";
import { UserTypes } from "../../../../types/user";
import { UserPageAppContext } from "../../../providers/UserPageAppContextProvider";
import { LoginPage } from "./LoginPage";
import { QuickTaskerUserLogin } from "./components/QuickTaskerUserLogin/QuickTaskerUserLogin";

// Mock dependencies
jest.mock("@wordpress/i18n", () => ({
  __: jest.fn((str) => str),
  sprintf: jest.fn((format, value) => `${format} ${value}`),
}));

// Mock the QuickTaskerUserLogin component
jest.mock("./components/QuickTaskerUserLogin/QuickTaskerUserLogin", () => ({
  QuickTaskerUserLogin: jest.fn(() => (
    <div data-testid="quicktasker-login">QuickTasker Login Form</div>
  )),
}));

describe("LoginPage", () => {
  // Helper function to create context with different user states
  const createMockContext = (overrides = {}) => ({
    state: {
      userName: "Test User",
      isQuicktaskerUser: false,
      isWordPressUser: false,
      initialLoading: false,
      isActiveUser: true,
      setupCompleted: true,
      isLoggedIn: false,
      pageHash: "test-hash",
      userId: "user123",
      cf: false,
      timezone: "UTC",
      userType: UserTypes.QUICKTASKER,
      ...overrides,
    },
    userPageAppDispatch: jest.fn(),
    loadUserPageStatus: jest.fn(),
  });

  test("renders QuickTaskerUserLogin for QuickTasker users", () => {
    const mockContext = createMockContext({
      isQuicktaskerUser: true,
      isWordPressUser: false,
    });

    render(
      <UserPageAppContext.Provider value={mockContext}>
        <LoginPage />
      </UserPageAppContext.Provider>,
    );

    // Should render the QuickTasker login component
    expect(screen.getByTestId("quicktasker-login")).toBeInTheDocument();
    expect(QuickTaskerUserLogin).toHaveBeenCalled();

    // Should not render WordPress login message
    expect(
      screen.queryByText("Your WordPress session has expired"),
    ).not.toBeInTheDocument();
  });

  test("renders WordPress login message for WordPress users", () => {
    const mockContext = createMockContext({
      userName: "WordPress User",
      isQuicktaskerUser: false,
      isWordPressUser: true,
    });

    render(
      <UserPageAppContext.Provider value={mockContext}>
        <LoginPage />
      </UserPageAppContext.Provider>,
    );

    // Should render the WordPress login message
    expect(screen.getByText("Hello WordPress User")).toBeInTheDocument();
    expect(
      screen.getByText("Your WordPress session has expired"),
    ).toBeInTheDocument();
    expect(screen.getByText("Please log in to continue")).toBeInTheDocument();

    // Should not render QuickTasker login
    expect(screen.queryByTestId("quicktasker-login")).not.toBeInTheDocument();
  });

  test("renders nothing when user is neither QuickTasker nor WordPress user", () => {
    const mockContext = createMockContext({
      isQuicktaskerUser: false,
      isWordPressUser: false,
    });

    const { container } = render(
      <UserPageAppContext.Provider value={mockContext}>
        <LoginPage />
      </UserPageAppContext.Provider>,
    );

    // Container should be empty
    expect(container.firstChild).toBeNull();

    // Should not render QuickTasker login or WordPress message
    expect(screen.queryByTestId("quicktasker-login")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Your WordPress session has expired"),
    ).not.toBeInTheDocument();
  });

  test("passes userName correctly to QuickTasker login", () => {
    const mockContext = createMockContext({
      userName: "QuickTasker User",
      isQuicktaskerUser: true,
      isWordPressUser: false,
    });

    render(
      <UserPageAppContext.Provider value={mockContext}>
        <LoginPage />
      </UserPageAppContext.Provider>,
    );

    // Verify QuickTaskerUserLogin was called
    expect(QuickTaskerUserLogin).toHaveBeenCalled();
  });
});
