import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  AppContext,
  initialState as appInitialState,
} from "../../../../providers/AppContextProvider";
import { PipelineApiTokenCreator } from "./PipelineApiTokenCreator";

const mockCreateApiToken = jest.fn();

jest.mock("../../../../hooks/actions/useApiTokenActions", () => ({
  useApiTokenActions: () => ({ createApiToken: mockCreateApiToken }),
}));

jest.mock("../../../../hooks/useApiTokens", () => ({
  useApiTokens: () => ({ pipelineApiTokensDispatch: jest.fn() }),
}));

function renderCreator(isUserAllowedToDelete: boolean) {
  return render(
    <AppContext.Provider
      value={{
        state: { ...appInitialState, isUserAllowedToDelete },
        appDispatch: jest.fn(),
      }}
    >
      <PipelineApiTokenCreator pipelineId="1" />
    </AppContext.Provider>,
  );
}

function permissionToggle(key: string) {
  return document.getElementById(
    `api-token-permission-${key}`,
  ) as HTMLInputElement;
}

async function createFullAccessToken() {
  fireEvent.change(document.getElementById("api-token-name")!, {
    target: { value: "Token" },
  });
  fireEvent.click(screen.getByText("Full access"));
  fireEvent.click(screen.getByText("Create API Token"));
  await waitFor(() => expect(mockCreateApiToken).toHaveBeenCalled());

  return mockCreateApiToken.mock.calls[0][0];
}

beforeEach(() => {
  mockCreateApiToken.mockResolvedValue({ success: false });
});

afterEach(() => jest.clearAllMocks());

describe("PipelineApiTokenCreator", () => {
  it("lets a user who can delete give the token DELETE permissions", async () => {
    renderCreator(true);

    expect(permissionToggle("delete_pipeline_stages")).not.toBeDisabled();
    expect(permissionToggle("delete_pipeline_tasks")).not.toBeDisabled();
    expect(
      screen.queryByTestId("api-token-delete-permission-note"),
    ).not.toBeInTheDocument();

    const token = await createFullAccessToken();
    expect(token.delete_pipeline_stages).toBe(true);
    expect(token.delete_pipeline_tasks).toBe(true);
  });

  it("does not let a user who cannot delete give the token DELETE permissions", async () => {
    renderCreator(false);

    expect(permissionToggle("delete_pipeline_stages")).toBeDisabled();
    expect(permissionToggle("delete_pipeline_tasks")).toBeDisabled();
    expect(permissionToggle("patch_pipeline_tasks")).not.toBeDisabled();
    expect(
      screen.getByTestId("api-token-delete-permission-note"),
    ).toHaveTextContent("DELETE needs the permission to delete resources.");

    const token = await createFullAccessToken();
    expect(token.patch_pipeline_tasks).toBe(true);
    expect(token.delete_pipeline_stages).toBe(false);
    expect(token.delete_pipeline_tasks).toBe(false);
  });
});
