import { renderHook } from "@testing-library/react";
import { useManageQuicktaskerPermission } from "./useManageQuicktaskerPermission";

describe("useManageQuicktaskerPermission", () => {
  it("allows managing a QuickTasker the server says can be managed", () => {
    const { result } = renderHook(() =>
      useManageQuicktaskerPermission({ can_manage: true }),
    );

    expect(result.current.canManageQuicktasker).toBe(true);
    expect(result.current.manageQuicktaskerDisabledReason).toBeUndefined();
  });

  it("allows managing a QuickTasker without can_manage, like one just created", () => {
    const { result } = renderHook(() => useManageQuicktaskerPermission({}));

    expect(result.current.canManageQuicktasker).toBe(true);
  });

  it("explains why a QuickTasker on other boards can't be managed", () => {
    const { result } = renderHook(() =>
      useManageQuicktaskerPermission({ can_manage: false }),
    );

    expect(result.current.canManageQuicktasker).toBe(false);
    expect(result.current.manageQuicktaskerDisabledReason).toBe(
      "This QuickTasker has been added to boards you have not been added to",
    );
  });
});
