import { render, screen } from "@testing-library/react";

import { useUser } from "../../../../hooks/useUser";
import { ActionTargetType } from "../../../../types/automation";
import { UserTypes } from "../../../../types/user";
import { AutomationActionTarget } from "./AutomationActionTarget";

// Mock the useUser hook
jest.mock("../../../../hooks/useUser");

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe("AutomationActionTarget Component", () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      getUser: jest.fn(),
      combinedUsers: [],
    });
  });

  test("renders nothing when actionTargetId is null", () => {
    render(
      <AutomationActionTarget
        actionTargetId={null}
        actionTargetType={ActionTargetType.QUICKTASKER}
        pipelineId="1"
      />,
    );
    expect(screen.queryByText("User not found")).not.toBeInTheDocument();
  });

  test("renders nothing when actionTargetType is null", () => {
    render(
      <AutomationActionTarget
        actionTargetId="1"
        actionTargetType={null}
        pipelineId="1"
      />,
    );
    expect(screen.queryByText("User not found")).not.toBeInTheDocument();
  });

  test("renders user name when user is found", () => {
    const mockGetUser = jest.fn().mockReturnValue({ name: "John Doe" });
    mockUseUser.mockReturnValue({ getUser: mockGetUser, combinedUsers: [] });

    render(
      <AutomationActionTarget
        actionTargetId="1"
        actionTargetType={ActionTargetType.QUICKTASKER}
        pipelineId="1"
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders 'User not found' when user is not found", () => {
    const mockGetUser = jest.fn().mockReturnValue(null);
    mockUseUser.mockReturnValue({ getUser: mockGetUser, combinedUsers: [] });

    render(
      <AutomationActionTarget
        actionTargetId="1"
        actionTargetType={ActionTargetType.QUICKTASKER}
        pipelineId="1"
      />,
    );
    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  describe("board access", () => {
    function renderWPUserTarget(user: object) {
      mockUseUser.mockReturnValue({
        getUser: jest.fn().mockReturnValue({
          name: "Bob",
          user_type: UserTypes.WP_USER,
          ...user,
        }),
        combinedUsers: [],
      });

      render(
        <AutomationActionTarget
          actionTargetId="7"
          actionTargetType={ActionTargetType.WP_USER}
          pipelineId="1"
        />,
      );
    }

    test("warns when the WordPress user has not been added to the board", () => {
      renderWPUserTarget({ pipeline_ids: [2] });

      expect(
        screen.getByTestId("automation-target-no-board-access"),
      ).toHaveTextContent(
        "Not added to this board, so the automation cannot assign them",
      );
    });

    test("does not warn when the WordPress user has been added to the board", () => {
      renderWPUserTarget({ pipeline_ids: [1] });

      expect(
        screen.queryByTestId("automation-target-no-board-access"),
      ).toBeNull();
    });

    test("does not warn for administrators", () => {
      renderWPUserTarget({ pipeline_ids: [], can_access_all_pipelines: true });

      expect(
        screen.queryByTestId("automation-target-no-board-access"),
      ).toBeNull();
    });

    test("does not warn for QuickTasker users", () => {
      mockUseUser.mockReturnValue({
        getUser: jest
          .fn()
          .mockReturnValue({ name: "Quinn", user_type: UserTypes.QUICKTASKER }),
        combinedUsers: [],
      });

      render(
        <AutomationActionTarget
          actionTargetId="3"
          actionTargetType={ActionTargetType.QUICKTASKER}
          pipelineId="1"
        />,
      );

      expect(
        screen.queryByTestId("automation-target-no-board-access"),
      ).toBeNull();
    });
  });
});
