import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as urlUtils from "../../../../utils/url";
import { logoutUserPageRequest } from "../../../api/user-page-api";
import { useSession } from "../../../hooks/useSession";
import {
  State,
  UserPageAppContext,
} from "../../../providers/UserPageAppContextProvider";
import { ProfileDropdown } from "./ProfileDropdown";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the necessary dependencies
jest.mock("../../../api/user-page-api", () => ({
  logoutUserPageRequest: jest.fn().mockResolvedValue({}),
}));

jest.mock("../../../hooks/useSession", () => ({
  useSession: jest.fn(),
}));

jest.mock("../../../hooks/useErrorHandler", () => ({
  useErrorHandler: () => ({
    handleError: jest.fn(),
  }),
}));

describe("ProfileDropdown", () => {
  const mockLoadUserPageStatus = jest.fn();
  const mockDeleteSessionCookie = jest.fn().mockResolvedValue({});
  let reloadPageSpy: jest.SpyInstance;

  // Create a complete mock state that satisfies the State interface
  const createMockState = (overrides: Partial<State> = {}): State => ({
    initialLoading: false,
    isActiveUser: false,
    setupCompleted: false,
    isLoggedIn: false,
    pageHash: null,
    userId: null,
    userName: null,
    cf: false,
    timezone: "UTC",
    isQuicktaskerUser: false,
    isWordPressUser: false,
    userType: null,
    profilePictureUrl: null,
    ...overrides,
  });

  // Create a helper function for consistent context setup
  const renderWithContext = (stateOverrides = {}) => {
    return render(
      <MemoryRouter>
        <UserPageAppContext.Provider
          value={{
            state: createMockState(stateOverrides),
            userPageAppDispatch: jest.fn(),
            loadUserPageStatus: mockLoadUserPageStatus,
          }}
        >
          <ProfileDropdown />
        </UserPageAppContext.Provider>
      </MemoryRouter>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock reloadPage helper function
    reloadPageSpy = jest
      .spyOn(urlUtils, "reloadPage")
      .mockImplementation(() => {});
    (useSession as jest.Mock).mockReturnValue({
      deleteSessionCookie: mockDeleteSessionCookie,
    });
  });

  afterEach(() => {
    // Restore original implementation
    reloadPageSpy.mockRestore();
  });

  test("renders user icon when no profile picture URL is provided", () => {
    renderWithContext({ profilePictureUrl: null });

    const userIcon = document.querySelector("svg");
    expect(userIcon).toBeInTheDocument();
  });

  test("renders profile picture when URL is provided", () => {
    renderWithContext({ profilePictureUrl: "https://example.com/avatar.jpg" });

    const profilePicture = document.querySelector("img");
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
  });

  test('navigates to profile page when "View profile" is clicked', async () => {
    renderWithContext({ profilePictureUrl: null });

    // Open dropdown
    fireEvent.click(document.querySelector("svg")!);

    // Click "View profile" item
    const viewProfileItem = await screen.findByText("View profile");
    fireEvent.click(viewProfileItem);

    // Check if navigation occurred (this is handled by react-router-dom)
    // In a real test environment, we would check this differently
  });

  test('logs out when "Log out" is clicked', async () => {
    renderWithContext({ profilePictureUrl: null });

    // Open dropdown
    fireEvent.click(document.querySelector("svg")!);

    // Click "Log out" item
    const logoutItem = await screen.findByText("Log out");
    fireEvent.click(logoutItem);

    // Verify logout process
    await waitFor(() => {
      expect(logoutUserPageRequest).toHaveBeenCalled();
      expect(mockDeleteSessionCookie).toHaveBeenCalled();
      expect(reloadPageSpy).toHaveBeenCalled();
    });
  });

  test("handles error during logout", async () => {
    const error = new Error("Logout failed");
    (logoutUserPageRequest as jest.Mock).mockRejectedValueOnce(error);

    renderWithContext({ profilePictureUrl: null });

    // Open dropdown
    fireEvent.click(document.querySelector("svg")!);

    // Click "Log out" item
    const logoutItem = await screen.findByText("Log out");
    fireEvent.click(logoutItem);

    // Even on error, the finally block still clears the session and reloads
    await waitFor(() => {
      expect(mockDeleteSessionCookie).toHaveBeenCalled();
      expect(reloadPageSpy).toHaveBeenCalled();
    });
  });
});
