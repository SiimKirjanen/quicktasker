import { renderHook } from "@testing-library/react";

jest.mock("../../api/user-page-api", () => ({
  updateCustomFieldValueRequest: jest.fn(),
}));

const handleError = jest.fn();
jest.mock("../useErrorHandler", () => ({
  useErrorHandler: () => ({ handleError }),
}));

import { CustomFieldEntityType } from "../../../types/custom-field";
import * as api from "../../api/user-page-api";
import { useCustomFieldActions } from "./useCustomFieldActions";

const mockedApi = api as jest.Mocked<typeof api>;

beforeEach(() => jest.clearAllMocks());

describe("user-page useCustomFieldActions", () => {
  it("invokes callback on success", async () => {
    mockedApi.updateCustomFieldValueRequest.mockResolvedValue({} as never);
    const callback = jest.fn();
    const { result } = renderHook(() => useCustomFieldActions());

    await result.current.updateCustomFieldValue(
      "e1",
      CustomFieldEntityType.Task,
      "cf1",
      "v",
      callback,
    );

    expect(mockedApi.updateCustomFieldValueRequest).toHaveBeenCalledWith(
      "e1",
      CustomFieldEntityType.Task,
      "cf1",
      "v",
    );
    expect(callback).toHaveBeenCalled();
  });

  it("calls handleError on failure", async () => {
    mockedApi.updateCustomFieldValueRequest.mockRejectedValue(new Error("x"));
    const { result } = renderHook(() => useCustomFieldActions());

    await result.current.updateCustomFieldValue(
      "e1",
      CustomFieldEntityType.Task,
      "cf1",
      "v",
    );

    expect(handleError).toHaveBeenCalled();
  });
});
