import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PublicTaskSubmissionsSetting } from "./PublicTaskSubmissionsSetting";

jest.mock("../../../../common/Toggle/Toggle", () => ({
  Toggle: ({
    checked,
    handleChange,
  }: {
    checked: boolean;
    handleChange: (checked: boolean) => void;
  }) => (
    <input
      data-testid="toggle"
      type="checkbox"
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  ),
}));

jest.mock("../../../../common/Input/AutoSaveInput/AutoSaveInput", () => ({
  AutoSaveInput: ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => (
    <input
      data-testid="limit-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("../../../../common/Button/Button", () => ({
  ButtonStyleType: { SECONDARY: "secondary" },
  WPQTButton: ({
    btnText,
    onClick,
    disabled,
  }: {
    btnText: string;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button data-testid="reset-btn" onClick={onClick} disabled={disabled}>
      {btnText}
    </button>
  ),
}));

jest.mock("../../../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading" />,
}));

jest.mock("../Setting/Settings", () => ({
  Settings: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockSavePipelineSettings = jest.fn();
jest.mock("../../../../../hooks/actions/useSettingActions", () => ({
  useSettingActions: () => ({
    savePipelineSettings: mockSavePipelineSettings,
  }),
}));

const renderComponent = (overrides = {}) =>
  render(
    <PublicTaskSubmissionsSetting
      pipelineId="42"
      allowPublicTaskCreation={false}
      publicTaskCreationLimit={0}
      publicTaskCreationCount={0}
      {...overrides}
    />,
  );

describe("PublicTaskSubmissionsSetting", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSavePipelineSettings.mockResolvedValue({ success: true });
  });

  it("hides limit/counter section when toggle is off", () => {
    renderComponent();
    expect(screen.queryByTestId("limit-input")).not.toBeInTheDocument();
  });

  it("shows limit/counter section when initially enabled", () => {
    renderComponent({
      allowPublicTaskCreation: true,
      publicTaskCreationLimit: 50,
      publicTaskCreationCount: 3,
    });
    expect(screen.getByTestId("limit-input")).toHaveValue("50");
    expect(screen.getByText(/Submissions so far:/)).toBeInTheDocument();
  });

  it("seeds limit to 50 when toggling on with limit=0", async () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("toggle"));
    await waitFor(() =>
      expect(mockSavePipelineSettings).toHaveBeenCalledWith("42", {
        allow_public_task_creation: true,
        public_task_creation_limit: 50,
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("limit-input")).toHaveValue("50"),
    );
  });

  it("does not seed limit when toggling on with existing limit", async () => {
    renderComponent({
      allowPublicTaskCreation: false,
      publicTaskCreationLimit: 10,
    });
    fireEvent.click(screen.getByTestId("toggle"));
    await waitFor(() =>
      expect(mockSavePipelineSettings).toHaveBeenCalledWith("42", {
        allow_public_task_creation: true,
      }),
    );
  });

  it("reverts toggle on save failure", async () => {
    mockSavePipelineSettings.mockResolvedValue({ success: false });
    renderComponent();
    const toggle = screen.getByTestId("toggle");
    fireEvent.click(toggle);
    await waitFor(() => expect(toggle).not.toBeChecked());
  });

  it("clamps negative/garbage limit input to 0", async () => {
    renderComponent({
      allowPublicTaskCreation: true,
      publicTaskCreationLimit: 5,
    });
    fireEvent.change(screen.getByTestId("limit-input"), {
      target: { value: "-7" },
    });
    await waitFor(() =>
      expect(mockSavePipelineSettings).toHaveBeenCalledWith("42", {
        public_task_creation_limit: 0,
      }),
    );
  });

  it("disables reset button when count is 0", () => {
    renderComponent({
      allowPublicTaskCreation: true,
      publicTaskCreationCount: 0,
    });
    expect(screen.getByTestId("reset-btn")).toBeDisabled();
  });

  it("resets counter to 0 on click", async () => {
    renderComponent({
      allowPublicTaskCreation: true,
      publicTaskCreationLimit: 50,
      publicTaskCreationCount: 7,
    });
    fireEvent.click(screen.getByTestId("reset-btn"));
    await waitFor(() =>
      expect(mockSavePipelineSettings).toHaveBeenCalledWith("42", {
        public_task_creation_count: 0,
      }),
    );
    await waitFor(() => expect(screen.getByTestId("reset-btn")).toBeDisabled());
  });
});
