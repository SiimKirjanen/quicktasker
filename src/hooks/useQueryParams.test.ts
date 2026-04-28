import { renderHook } from "@testing-library/react";
import useQueryParams from "./useQueryParams";

describe("useQueryParams", () => {
  const setSearch = (search: string) => {
    window.history.replaceState({}, "", "/" + search);
  };

  afterEach(() => setSearch(""));

  it("returns null when param missing", () => {
    setSearch("");
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getQueryParam("foo")).toBeNull();
  });

  it("reads named query params", () => {
    setSearch("?foo=bar&baz=qux");
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.getQueryParam("foo")).toBe("bar");
    expect(result.current.getQueryParam("baz")).toBe("qux");
  });

  it("exposes code shortcut", () => {
    setSearch("?code=abc123");
    const { result } = renderHook(() => useQueryParams());
    expect(result.current.code).toBe("abc123");
  });
});
