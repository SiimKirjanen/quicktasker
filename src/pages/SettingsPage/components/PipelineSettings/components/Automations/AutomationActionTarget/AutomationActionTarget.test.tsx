import { render, screen } from "@testing-library/react";
import { useUser } from "../../../../../../../hooks/useUser";
import { ActionTargetType } from "../../../../../../../types/automation";
import { AutomationActionTarget } from "./AutomationActionTarget";

// Mock the useUser hook
jest.mock("../../../../../../../hooks/useUser");

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>;

describe("AutomationActionTarget Component", () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      getUser: jest.fn(),
    });
  });

  test("renders nothing when actionTargetId is null", () => {
    render(
      <AutomationActionTarget
        actionTargetId={null}
        actionTargetType={ActionTargetType.QUICKTASKER}
      />,
    );
    expect(screen.queryByText("User not found")).not.toBeInTheDocument();
  });

  test("renders nothing when actionTargetType is null", () => {
    render(
      <AutomationActionTarget actionTargetId="1" actionTargetType={null} />,
    );
    expect(screen.queryByText("User not found")).not.toBeInTheDocument();
  });

  test("renders user name when user is found", () => {
    const mockGetUser = jest.fn().mockReturnValue({ name: "John Doe" });
    mockUseUser.mockReturnValue({ getUser: mockGetUser });

    render(
      <AutomationActionTarget
        actionTargetId="1"
        actionTargetType={ActionTargetType.QUICKTASKER}
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("renders 'User not found' when user is not found", () => {
    const mockGetUser = jest.fn().mockReturnValue(null);
    mockUseUser.mockReturnValue({ getUser: mockGetUser });

    render(
      <AutomationActionTarget
        actionTargetId="1"
        actionTargetType={ActionTargetType.QUICKTASKER}
      />,
    );
    expect(screen.getByText("User not found")).toBeInTheDocument();
  });
});
