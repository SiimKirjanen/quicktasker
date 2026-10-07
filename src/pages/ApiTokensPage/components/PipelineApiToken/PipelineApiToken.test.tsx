import { render, screen } from "@testing-library/react";
import { ApiToken } from "../../../../types/api-token";
import { PipelineApiToken } from "./PipelineApiToken";

jest.mock(
  "../../../../components/Dropdown/ApiTokenDropdown/ApiTokenDropdown",
  () => ({
    ApiTokenDropdown: () => null,
  }),
);

jest.mock("../../../../hooks/useTimezone", () => ({
  useTimezone: () => ({ convertToWPTimezone: (date: string) => date }),
}));

const baseToken: ApiToken = {
  id: "1",
  pipeline_id: "1",
  name: "Token",
  description: "",
  created_at: "2026-01-01 00:00:00",
  updated_at: "2026-01-01 00:00:00",
  created_by: "3",
  created_by_name: "Anna",
  created_by_has_board_access: true,
  created_by_can_delete: false,
  get_pipeline: true,
  patch_pipeline: false,
  get_pipeline_stages: false,
  post_pipeline_stages: false,
  patch_pipeline_stages: false,
  delete_pipeline_stages: false,
  get_pipeline_tasks: true,
  post_pipeline_tasks: false,
  patch_pipeline_tasks: false,
  delete_pipeline_tasks: true,
};

function renderToken(overrides: Partial<ApiToken> = {}) {
  return render(<PipelineApiToken apiToken={{ ...baseToken, ...overrides }} />);
}

describe("PipelineApiToken", () => {
  it("warns that DELETE requests don't work when the creator cannot delete", () => {
    renderToken();

    expect(
      screen.getByTestId("api-token-delete-not-working"),
    ).toHaveTextContent(
      "DELETE requests don't work: the token's creator can't delete resources.",
    );
  });

  it("does not warn when the creator can delete", () => {
    renderToken({ created_by_can_delete: true });

    expect(
      screen.queryByTestId("api-token-delete-not-working"),
    ).not.toBeInTheDocument();
  });

  it("does not warn when the creator is unknown", () => {
    renderToken({ created_by: null, created_by_can_delete: null });

    expect(
      screen.queryByTestId("api-token-delete-not-working"),
    ).not.toBeInTheDocument();
  });

  it("does not warn when the token has no DELETE permissions", () => {
    renderToken({ delete_pipeline_tasks: false });

    expect(
      screen.queryByTestId("api-token-delete-not-working"),
    ).not.toBeInTheDocument();
  });

  it("only says the whole token doesn't work when its creator lost access", () => {
    renderToken({ created_by_has_board_access: false });

    expect(screen.getByTestId("api-token-not-working")).toBeInTheDocument();
    expect(
      screen.queryByTestId("api-token-delete-not-working"),
    ).not.toBeInTheDocument();
  });
});
