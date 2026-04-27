import { act, renderHook } from "@testing-library/react";
import { useLoadingStates } from "./useLoadingStates";

describe("useLoadingStates", () => {
  it("starts with all loading flags false", () => {
    const { result } = renderHook(() => useLoadingStates());
    expect(result.current.loading1).toBe(false);
    expect(result.current.loading2).toBe(false);
    expect(result.current.loading3).toBe(false);
  });

  it("setters update individual flags independently", () => {
    const { result } = renderHook(() => useLoadingStates());
    act(() => result.current.setLoading2(true));
    expect(result.current.loading1).toBe(false);
    expect(result.current.loading2).toBe(true);
    expect(result.current.loading3).toBe(false);
  });
});
