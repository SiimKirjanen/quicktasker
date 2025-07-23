import { ActionTargetType } from "../types/automation";
import {
  ServerExtendedUser,
  ServerUser,
  UserTypes,
  WPUser,
} from "../types/user";
import {
  convertExtendedUserFromServer,
  convertUserFromServer,
  convertUserPageUserFromServer,
  mapActionTargetTypeToUserType,
  userTypeStrings,
} from "./user";

// Mock data helpers
const createMockServerUser = (
  overrides: Partial<ServerUser> = {},
): ServerUser => ({
  id: "1",
  name: "Test User",
  description: "Test description",
  user_type: UserTypes.QUICKTASKER,
  created_at: "2023-01-01T00:00:00Z",
  page_hash: "test-hash",
  assigned_tasks_count: "5",
  is_active: "1",
  has_password: "1",
  ...overrides,
});

const createMockWPUser = (overrides: Partial<WPUser> = {}): WPUser => ({
  id: "2",
  name: "WP User",
  description: "WordPress user",
  user_type: UserTypes.WP_USER,
  created_at: "2023-01-01T00:00:00Z",
  caps: ["subscriber"],
  allcaps: ["read", "subscriber"],
  roles: ["subscriber"],
  profile_picture: "https://example.com/avatar.jpg",
  ...overrides,
});

const createMockServerExtendedUser = (
  overrides: Partial<ServerExtendedUser> = {},
): ServerExtendedUser => ({
  id: "3",
  name: "Extended User",
  description: "Extended description",
  user_type: UserTypes.QUICKTASKER,
  created_at: "2023-01-01T00:00:00Z",
  page_hash: "extended-hash",
  assigned_tasks_count: "10",
  is_active: "1",
  // Add these required boolean properties with default values
  has_password: true,
  setup_completed: false,
  ...overrides,
});

describe("user utilities", () => {
  describe("convertUserFromServer", () => {
    test("converts server user with active status", () => {
      const serverUser = createMockServerUser({
        is_active: "1",
        has_password: "1",
      });

      const result = convertUserFromServer(serverUser);

      expect(result).toEqual({
        ...serverUser,
        is_active: true,
        has_password: true,
      });
    });

    test("converts server user with inactive status", () => {
      const serverUser = createMockServerUser({
        is_active: "0",
        has_password: "0",
      });

      const result = convertUserFromServer(serverUser);

      expect(result).toEqual({
        ...serverUser,
        is_active: false,
        has_password: false,
      });
    });

    test("preserves all other properties", () => {
      const serverUser = createMockServerUser({
        name: "Special User",
        description: "Special description",
        page_hash: "special-hash",
        assigned_tasks_count: "15",
      });

      const result = convertUserFromServer(serverUser);

      expect(result.name).toBe("Special User");
      expect(result.description).toBe("Special description");
      expect(result.page_hash).toBe("special-hash");
      expect(result.assigned_tasks_count).toBe("15");
      expect(result.user_type).toBe(UserTypes.QUICKTASKER);
    });
  });

  describe("convertUserPageUserFromServer", () => {
    test("returns WP user unchanged when user_type is WP_USER", () => {
      const wpUser = createMockWPUser();

      const result = convertUserPageUserFromServer(wpUser);

      expect(result).toBe(wpUser); // Should return the exact same object
    });

    test("converts server user when user_type is not WP_USER", () => {
      const serverUser = createMockServerUser({
        user_type: UserTypes.QUICKTASKER,
        is_active: "1",
        has_password: "0",
      });

      const result = convertUserPageUserFromServer(serverUser);

      expect(result).toEqual({
        ...serverUser,
        is_active: true,
        has_password: false,
      });
    });
  });

  describe("convertExtendedUserFromServer", () => {
    test("converts extended user with active status", () => {
      const serverExtendedUser = createMockServerExtendedUser({
        is_active: "1",
      });

      const result = convertExtendedUserFromServer(serverExtendedUser);

      expect(result).toEqual({
        ...serverExtendedUser,
        is_active: true,
      });
    });

    test("converts extended user with inactive status", () => {
      const serverExtendedUser = createMockServerExtendedUser({
        is_active: "0",
      });

      const result = convertExtendedUserFromServer(serverExtendedUser);

      expect(result).toEqual({
        ...serverExtendedUser,
        is_active: false,
      });
    });

    test("preserves all other properties", () => {
      const serverExtendedUser = createMockServerExtendedUser({
        name: "Extended Special User",
        assigned_tasks_count: "20",
      });

      const result = convertExtendedUserFromServer(serverExtendedUser);

      expect(result.name).toBe("Extended Special User");
      expect(result.assigned_tasks_count).toBe("20");
      expect(result.user_type).toBe(UserTypes.QUICKTASKER);
    });
  });

  describe("mapActionTargetTypeToUserType", () => {
    test("maps QUICKTASKER action target type to QUICKTASKER user type", () => {
      const result = mapActionTargetTypeToUserType(
        ActionTargetType.QUICKTASKER,
      );
      expect(result).toBe(UserTypes.QUICKTASKER);
    });

    test("maps WP_USER action target type to WP_USER user type", () => {
      const result = mapActionTargetTypeToUserType(ActionTargetType.WP_USER);
      expect(result).toBe(UserTypes.WP_USER);
    });

    test("returns null for unknown action target type", () => {
      // Test with a value that's not in the ActionTargetType enum
      const result = mapActionTargetTypeToUserType(
        "UNKNOWN" as ActionTargetType,
      );
      expect(result).toBeNull();
    });

    test("handles all defined ActionTargetType values", () => {
      // Assuming there might be other ActionTargetType values
      const knownTypes = [
        ActionTargetType.QUICKTASKER,
        ActionTargetType.WP_USER,
      ];

      knownTypes.forEach((type) => {
        const result = mapActionTargetTypeToUserType(type);
        expect(result).not.toBeNull();
      });
    });
  });

  describe("userTypeStrings", () => {
    test("contains correct string for QUICKTASKER user type", () => {
      expect(userTypeStrings[UserTypes.QUICKTASKER]).toBe("Quicktasker");
    });

    test("contains correct string for WP_USER user type", () => {
      expect(userTypeStrings[UserTypes.WP_USER]).toBe("WordPress User");
    });

    test("has entries for all UserTypes", () => {
      const userTypeValues = Object.values(UserTypes);

      userTypeValues.forEach((userType) => {
        expect(userTypeStrings[userType]).toBeDefined();
        expect(typeof userTypeStrings[userType]).toBe("string");
      });
    });
  });

  describe("edge cases and type safety", () => {
    test("convertUserFromServer handles edge string values", () => {
      const serverUser = createMockServerUser({
        is_active: "0",
        has_password: "anything_else" as "0" | "1", // Type assertion for test
      });

      const result = convertUserFromServer(serverUser);

      expect(result.is_active).toBe(false);
      expect(result.has_password).toBe(false); // Only "1" should be true
    });

    test("convertExtendedUserFromServer handles edge string values", () => {
      const serverExtendedUser = createMockServerExtendedUser({
        is_active: "something_else" as "0" | "1", // Type assertion for test
      });

      const result = convertExtendedUserFromServer(serverExtendedUser);

      expect(result.is_active).toBe(false); // Only "1" should be true
    });
  });
});
