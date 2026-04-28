import { renderHook } from "@testing-library/react";
import { toast } from "react-toastify";

jest.mock("../../api/api", () => ({
  addCommentRequest: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

import * as api from "../../api/api";
import { UserTypes } from "../../types/user";
import { useCommentActions } from "./useCommentActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("useCommentActions", () => {
  it("returns the new comment on success", async () => {
    mockedApi.addCommentRequest.mockResolvedValue({
      data: { newComment: { id: "c1" } },
    } as never);
    const { result } = renderHook(() => useCommentActions());

    const comment = await result.current.addComment(
      "t1",
      "task",
      false,
      "hello",
    );

    expect(mockedApi.addCommentRequest).toHaveBeenCalledWith(
      "t1",
      "task",
      false,
      "hello",
    );
    expect(comment).toEqual({ id: "c1" });
    expect(toast.success).toHaveBeenCalled();
  });

  it("forwards user type", async () => {
    mockedApi.addCommentRequest.mockResolvedValue({
      data: { newComment: {} },
    } as never);
    const { result } = renderHook(() => useCommentActions());

    await result.current.addComment("u1", UserTypes.QUICKTASKER, true, "hi");

    expect(mockedApi.addCommentRequest).toHaveBeenCalledWith(
      "u1",
      UserTypes.QUICKTASKER,
      true,
      "hi",
    );
  });

  it("returns undefined and shows error toast on failure", async () => {
    mockedApi.addCommentRequest.mockRejectedValue(new Error("x"));
    const { result } = renderHook(() => useCommentActions());

    const comment = await result.current.addComment("t1", "task", false, "hi");

    expect(comment).toBeUndefined();
    expect(toast.error).toHaveBeenCalled();
  });
});
