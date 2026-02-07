import { fireEvent, render, screen } from "@testing-library/react";
import { BoardOptionsSelection } from "./BoardOptionsSelection";

// Mock hooks
jest.mock("../../../../../../hooks/useActivePipeline", () => ({
  useActivePipeline: () => ({ activePipelineId: "123" }),
}));
const navigatePageMock = jest.fn();
jest.mock("../../../../../../hooks/useNavigation", () => ({
  useNavigation: () => ({ navigatePage: navigatePageMock }),
}));

// Mock i18n
jest.mock("@wordpress/i18n", () => ({
  __: (str: string) => str,
}));

describe("BoardOptionsSelection", () => {
  beforeEach(() => {
    navigatePageMock.mockClear();
  });

  it("renders Automations and Webhooks options", () => {
    render(<BoardOptionsSelection />);
    expect(screen.getByText("Automations")).toBeInTheDocument();
    expect(screen.getByText("Webhooks")).toBeInTheDocument();
  });

  it("navigates to automations when Automations is clicked", () => {
    render(<BoardOptionsSelection />);
    fireEvent.click(screen.getByText("Automations"));
    expect(navigatePageMock).toHaveBeenCalledWith("#/board/123/automations");
  });

  it("navigates to webhooks when Webhooks is clicked", () => {
    render(<BoardOptionsSelection />);
    fireEvent.click(screen.getByText("Webhooks"));
    expect(navigatePageMock).toHaveBeenCalledWith("#/board/123/webhooks");
  });
});
