import { getQueryParam, getUserPageCodeParam } from "./url";

// Mock window.location
const mockLocation = {
  search: "",
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("url utilities", () => {
  beforeEach(() => {
    // Reset location.search before each test
    mockLocation.search = "";
  });

  describe("getQueryParam", () => {
    test("returns parameter value when it exists", () => {
      mockLocation.search = "?name=john&age=25";

      const result = getQueryParam("name");

      expect(result).toBe("john");
    });

    test("returns parameter value when it exists among multiple params", () => {
      mockLocation.search = "?foo=bar&test=value&last=end";

      const result = getQueryParam("test");

      expect(result).toBe("value");
    });

    test("returns null when parameter does not exist", () => {
      mockLocation.search = "?name=john&age=25";

      const result = getQueryParam("nonexistent");

      expect(result).toBeNull();
    });

    test("returns null when search string is empty", () => {
      mockLocation.search = "";

      const result = getQueryParam("any");

      expect(result).toBeNull();
    });

    test("returns null when search string has no parameters", () => {
      mockLocation.search = "?";

      const result = getQueryParam("any");

      expect(result).toBeNull();
    });

    test("handles URL encoded values", () => {
      mockLocation.search = "?message=hello%20world&special=%26%3D%3F";

      expect(getQueryParam("message")).toBe("hello world");
      expect(getQueryParam("special")).toBe("&=?");
    });

    test("handles empty parameter values", () => {
      mockLocation.search = "?empty=&name=john";

      expect(getQueryParam("empty")).toBe("");
      expect(getQueryParam("name")).toBe("john");
    });

    test("handles parameters with same name (returns first occurrence)", () => {
      mockLocation.search = "?color=red&color=blue&color=green";

      const result = getQueryParam("color");

      expect(result).toBe("red");
    });

    test("handles case-sensitive parameter names", () => {
      mockLocation.search = "?Name=john&name=jane";

      expect(getQueryParam("Name")).toBe("john");
      expect(getQueryParam("name")).toBe("jane");
      expect(getQueryParam("NAME")).toBeNull();
    });

    test("handles special characters in parameter names", () => {
      mockLocation.search = "?user-id=123&user_name=test";

      expect(getQueryParam("user-id")).toBe("123");
      expect(getQueryParam("user_name")).toBe("test");
    });

    test("handles numeric values as strings", () => {
      mockLocation.search = "?count=42&price=19.99";

      expect(getQueryParam("count")).toBe("42");
      expect(getQueryParam("price")).toBe("19.99");
      expect(typeof getQueryParam("count")).toBe("string");
    });
  });

  describe("getUserPageCodeParam", () => {
    test("returns code parameter when it exists", () => {
      mockLocation.search = "?code=abc123&other=value";

      const result = getUserPageCodeParam();

      expect(result).toBe("abc123");
    });

    test("returns null when code parameter does not exist", () => {
      mockLocation.search = "?name=john&age=25";

      const result = getUserPageCodeParam();

      expect(result).toBeNull();
    });

    test("returns null when search string is empty", () => {
      mockLocation.search = "";

      const result = getUserPageCodeParam();

      expect(result).toBeNull();
    });

    test("handles code parameter with special characters", () => {
      mockLocation.search = "?code=abc-123_xyz&other=test";

      const result = getUserPageCodeParam();

      expect(result).toBe("abc-123_xyz");
    });

    test("handles empty code parameter", () => {
      mockLocation.search = "?code=&name=test";

      const result = getUserPageCodeParam();

      expect(result).toBe("");
    });

    test("handles URL encoded code parameter", () => {
      mockLocation.search = "?code=hello%20world%21";

      const result = getUserPageCodeParam();

      expect(result).toBe("hello world!");
    });

    test("returns first code parameter when multiple exist", () => {
      mockLocation.search = "?code=first&code=second";

      const result = getUserPageCodeParam();

      expect(result).toBe("first");
    });

    test("handles case-sensitive code parameter", () => {
      mockLocation.search = "?Code=wrong&code=correct";

      const result = getUserPageCodeParam();

      expect(result).toBe("correct");
    });
  });

  describe("integration tests", () => {
    test("both functions work with complex query strings", () => {
      mockLocation.search = "?code=user123&name=john%20doe&active=true&count=5";

      expect(getUserPageCodeParam()).toBe("user123");
      expect(getQueryParam("name")).toBe("john doe");
      expect(getQueryParam("active")).toBe("true");
      expect(getQueryParam("count")).toBe("5");
      expect(getQueryParam("missing")).toBeNull();
    });

    test("functions handle malformed query strings gracefully", () => {
      mockLocation.search = "?=invalid&code&name=valid";

      expect(getUserPageCodeParam()).toBe("");
      expect(getQueryParam("name")).toBe("valid");
    });
  });
});
