// user-session.test.ts
import { State } from "../user-page-app/providers/UserPageAppContextProvider";

// Create a simple mock for js-cookie
const mockGet = jest.fn();

// Mock js-cookie with proper default export structure
jest.mock("js-cookie", () => ({
  __esModule: true,
  default: {
    get: mockGet,
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

// Import our functions after mocking
import {
  calculateLoginStatus,
  convertUserSessionFromServer,
} from "./user-session";

describe("user-session utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("convertUserSessionFromServer", () => {
    test("converts is_active correctly", () => {
      // Test true case
      expect(
        convertUserSessionFromServer({
          id: "123",
          user_id: "user-123",
          user_name: "test",
          user_description: "test",
          created_at_utc: "test",
          expires_at_utc: "test",
          is_active: "1",
        }).is_active,
      ).toBe(true);

      // Test false case
      expect(
        convertUserSessionFromServer({
          id: "123",
          user_id: "user-123",
          user_name: "test",
          user_description: "test",
          created_at_utc: "test",
          expires_at_utc: "test",
          is_active: "0",
        }).is_active,
      ).toBe(false);
    });
  });

  describe("calculateLoginStatus", () => {
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
      profilePictureUrl: null, // Add this default value
      ...overrides,
    });

    test("returns true for Quicktasker user with valid token", () => {
      mockGet.mockReturnValue("token-value");

      const result = calculateLoginStatus(
        createMockState({
          isQuicktaskerUser: true,
          pageHash: "task-123",
        }),
      );

      expect(result).toBe(true);
      expect(mockGet).toHaveBeenCalledWith("wpqt-session-token-task-123");
    });

    test("returns false for Quicktasker user with no token", () => {
      mockGet.mockReturnValue(undefined);

      const result = calculateLoginStatus(
        createMockState({
          isQuicktaskerUser: true,
          pageHash: "task-123",
        }),
      );

      expect(result).toBe(false);
    });

    test("returns true for WordPress user with userId", () => {
      const result = calculateLoginStatus(
        createMockState({
          isWordPressUser: true,
          userId: "123",
        }),
      );

      expect(result).toBe(true);
    });

    test("returns false for WordPress user without userId", () => {
      const result = calculateLoginStatus(
        createMockState({
          isWordPressUser: true,
          userId: null,
        }),
      );

      expect(result).toBe(false);
    });

    test("returns false when no user type is set", () => {
      const result = calculateLoginStatus(createMockState());

      expect(result).toBe(false);
    });
  });
});
