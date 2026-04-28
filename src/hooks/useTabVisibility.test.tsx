import { act, renderHook } from "@testing-library/react";
import useTabVisibility from "./useTabVisibility";

describe("useTabVisibility", () => {
  const setHidden = (hidden: boolean) => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => hidden,
    });
  };

  afterEach(() => {
    setHidden(false);
  });

  it("returns true initially when document is visible", () => {
    setHidden(false);
    const { result } = renderHook(() => useTabVisibility());
    expect(result.current.isTabVisible).toBe(true);
  });

  it("updates when visibilitychange fires", () => {
    setHidden(false);
    const { result } = renderHook(() => useTabVisibility());
    act(() => {
      setHidden(true);
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current.isTabVisible).toBe(false);
  });

  it("removes listener on unmount", () => {
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useTabVisibility());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function),
    );
    removeSpy.mockRestore();
  });
});
