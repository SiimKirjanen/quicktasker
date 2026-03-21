import * as urlUtils from "./url";
import { getQueryParam, getUserPageCodeParam, reloadPage } from "./url";

describe("url utilities", () => {
  let getLocationSearchSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock getLocationSearch helper
    getLocationSearchSpy = jest.spyOn(urlUtils, "getLocationSearch");
  });

  afterEach(() => {
    // Restore original implementation
    getLocationSearchSpy.mockRestore();
  });

  describe("getQueryParam", () => {
    test("returns parameter value when it exists", () => {
      getLocationSearchSpy.mockReturnValue("?name=john&age=25");

      const result = getQueryParam("name");

      expect(result).toBe("john");
    });

    test("returns parameter value when it exists among multiple params", () => {
      getLocationSearchSpy.mockReturnValue("?foo=bar&test=value&last=end");

      const result = getQueryParam("test");

      expect(result).toBe("value");
    });

    test("returns null when parameter does not exist", () => {
      getLocationSearchSpy.mockReturnValue("?name=john&age=25");

      const result = getQueryParam("nonexistent");

      expect(result).toBeNull();
    });

    test("returns null when search string is empty", () => {
      getLocationSearchSpy.mockReturnValue("");

      const result = getQueryParam("any");

      expect(result).toBeNull();
    });

    test("returns null when search string has no parameters", () => {
      getLocationSearchSpy.mockReturnValue("?");

      const result = getQueryParam("any");

      expect(result).toBeNull();
    });

    test("handles URL encoded values", () => {
      getLocationSearchSpy.mockReturnValue(
        "?message=hello%20world&special=%26%3D%3F",
      );

      expect(getQueryParam("message")).toBe("hello world");
      expect(getQueryParam("special")).toBe("&=?");
    });

    test("handles empty parameter values", () => {
      getLocationSearchSpy.mockReturnValue("?empty=&name=john");

      expect(getQueryParam("empty")).toBe("");
      expect(getQueryParam("name")).toBe("john");
    });

    test("handles parameters with same name (returns first occurrence)", () => {
      getLocationSearchSpy.mockReturnValue("?color=red&color=blue&color=green");

      const result = getQueryParam("color");

      expect(result).toBe("red");
    });

    test("handles case-sensitive parameter names", () => {
      getLocationSearchSpy.mockReturnValue("?Name=john&name=jane");

      expect(getQueryParam("Name")).toBe("john");
      expect(getQueryParam("name")).toBe("jane");
      expect(getQueryParam("NAME")).toBeNull();
    });

    test("handles special characters in parameter names", () => {
      getLocationSearchSpy.mockReturnValue("?user-id=123&user_name=test");

      expect(getQueryParam("user-id")).toBe("123");
      expect(getQueryParam("user_name")).toBe("test");
    });

    test("handles numeric values as strings", () => {
      getLocationSearchSpy.mockReturnValue("?count=42&price=19.99");

      expect(getQueryParam("count")).toBe("42");
      expect(getQueryParam("price")).toBe("19.99");
      expect(typeof getQueryParam("count")).toBe("string");
    });
  });

  describe("getUserPageCodeParam", () => {
    test("returns code parameter when it exists", () => {
      getLocationSearchSpy.mockReturnValue("?code=abc123&other=value");

      const result = getUserPageCodeParam();

      expect(result).toBe("abc123");
    });

    test("returns null when code parameter does not exist", () => {
      getLocationSearchSpy.mockReturnValue("?name=john&age=25");

      const result = getUserPageCodeParam();

      expect(result).toBeNull();
    });

    test("returns null when search string is empty", () => {
      getLocationSearchSpy.mockReturnValue("");

      const result = getUserPageCodeParam();

      expect(result).toBeNull();
    });

    test("handles code parameter with special characters", () => {
      getLocationSearchSpy.mockReturnValue("?code=abc-123_xyz&other=test");

      const result = getUserPageCodeParam();

      expect(result).toBe("abc-123_xyz");
    });

    test("handles empty code parameter", () => {
      getLocationSearchSpy.mockReturnValue("?code=&name=test");

      const result = getUserPageCodeParam();

      expect(result).toBe("");
    });

    test("handles URL encoded code parameter", () => {
      getLocationSearchSpy.mockReturnValue("?code=hello%20world%21");

      const result = getUserPageCodeParam();

      expect(result).toBe("hello world!");
    });

    test("returns first code parameter when multiple exist", () => {
      getLocationSearchSpy.mockReturnValue("?code=first&code=second");

      const result = getUserPageCodeParam();

      expect(result).toBe("first");
    });

    test("handles case-sensitive code parameter", () => {
      getLocationSearchSpy.mockReturnValue("?Code=wrong&code=correct");

      const result = getUserPageCodeParam();

      expect(result).toBe("correct");
    });
  });

  describe("integration tests", () => {
    test("both functions work with complex query strings", () => {
      getLocationSearchSpy.mockReturnValue(
        "?code=user123&name=john%20doe&active=true&count=5",
      );

      expect(getUserPageCodeParam()).toBe("user123");
      expect(getQueryParam("name")).toBe("john doe");
      expect(getQueryParam("active")).toBe("true");
      expect(getQueryParam("count")).toBe("5");
      expect(getQueryParam("missing")).toBeNull();
    });

    test("functions handle malformed query strings gracefully", () => {
      getLocationSearchSpy.mockReturnValue("?=invalid&code&name=valid");

      expect(getUserPageCodeParam()).toBe("");
      expect(getQueryParam("name")).toBe("valid");
    });
  });

  describe("reloadPage", () => {
    test("is exported and can be called", () => {
      // Mock the function to prevent actual reload
      const reloadPageSpy = jest
        .spyOn(urlUtils, "reloadPage")
        .mockImplementation(() => {});

      reloadPage();

      expect(reloadPageSpy).toHaveBeenCalledTimes(1);
      expect(reloadPageSpy).toHaveBeenCalledWith();

      reloadPageSpy.mockRestore();
    });

    test("can be mocked for testing (integration test)", () => {
      // This test verifies the pattern used in ProfileDropdown tests
      const mockReload = jest
        .spyOn(urlUtils, "reloadPage")
        .mockImplementation(() => {});

      // Call the mocked function
      urlUtils.reloadPage();

      expect(mockReload).toHaveBeenCalled();

      mockReload.mockRestore();
    });
  });
});
