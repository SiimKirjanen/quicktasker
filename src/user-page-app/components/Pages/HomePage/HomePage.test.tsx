import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("react-router-dom", () => ({ useNavigate: () => jest.fn() }));
jest.mock("../../../hooks/useErrorHandler", () => ({
  useErrorHandler: () => ({ handleError: jest.fn() }),
}));
jest.mock("../Page/Page", () => ({
  PageWrap: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  PageContentWrap: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
const mockGetOverviewRequest = jest.fn();
jest.mock("../../../api/user-page-api", () => ({
  getOverviewRequest: () => mockGetOverviewRequest(),
}));

import { HomePage } from "./HomePage";

function respondWithOverview(hasBoards: boolean) {
  mockGetOverviewRequest.mockResolvedValue({
    data: { assignedTasksCount: 0, assignableTaskCount: 0, hasBoards },
  });
}

describe("HomePage", () => {
  it("tells a user without boards to ask to be added to one", async () => {
    respondWithOverview(false);
    render(<HomePage />);

    expect(await screen.findByTestId("tasks-app-no-boards")).toHaveTextContent(
      "You have not been added to any boards yet. Ask an administrator to add you to a board.",
    );
  });

  it("shows no message to a user with boards", async () => {
    respondWithOverview(true);
    render(<HomePage />);

    expect(await screen.findByText(/Assigned tasks:/)).toHaveTextContent(
      "Assigned tasks: 0",
    );
    expect(screen.queryByTestId("tasks-app-no-boards")).toBeNull();
  });
});
