import { renderHook } from "@testing-library/react";

jest.mock("../../api/api", () => ({
  updateWPUserPermissionsRequest: jest.fn(),
}));

import * as api from "../../api/api";
import { useCapabilityActions } from "./useCapabilityActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("useCapabilityActions", () => {
  it("invokes callback on success", async () => {
    mockedApi.updateWPUserPermissionsRequest.mockResolvedValue({} as never);
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useCapabilityActions());

    await result.current.updateWPUserCapabilities(
      "u1",
      {} as never,
      success,
      failure,
    );

    expect(mockedApi.updateWPUserPermissionsRequest).toHaveBeenCalledWith(
      "u1",
      {},
    );
    expect(success).toHaveBeenCalled();
    expect(failure).not.toHaveBeenCalled();
  });

  it("invokes failure callback on error", async () => {
    const err = new Error("x");
    mockedApi.updateWPUserPermissionsRequest.mockRejectedValue(err);
    const success = jest.fn();
    const failure = jest.fn();
    const { result } = renderHook(() => useCapabilityActions());

    await result.current.updateWPUserCapabilities(
      "u1",
      {} as never,
      success,
      failure,
    );

    expect(failure).toHaveBeenCalledWith(err);
    expect(success).not.toHaveBeenCalled();
  });
});
