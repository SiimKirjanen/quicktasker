import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../constants";
import { AutoSaveTextarea } from "./AutoSaveTextarea";

// Mock WPQTTextarea
jest.mock("../../TextArea/TextArea", () => ({
  WPQTTextarea: ({
    value,
    onChange,
    disabled,
    loading,
    ...props
  }: {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    loading?: boolean;
    [key: string]: unknown;
  }) => (
    <textarea
      data-testid="autosave-textarea"
      value={value}
      disabled={disabled}
      aria-busy={loading}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  ),
}));

jest.useFakeTimers();

describe("AutoSaveTextarea", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea with initial value", () => {
    render(<AutoSaveTextarea value="Initial" onChange={jest.fn()} />);
    expect(screen.getByTestId("autosave-textarea")).toHaveValue("Initial");
  });

  it("updates textarea value on change", () => {
    render(<AutoSaveTextarea value="Initial" onChange={jest.fn()} />);
    const textarea = screen.getByTestId("autosave-textarea");
    fireEvent.change(textarea, { target: { value: "Changed" } });
    expect(textarea).toHaveValue("Changed");
  });

  it("calls onChange after debounce when value changes", async () => {
    const onChange = jest.fn().mockResolvedValue(undefined);
    render(<AutoSaveTextarea value="Initial" onChange={onChange} />);
    const textarea = screen.getByTestId("autosave-textarea");
    fireEvent.change(textarea, { target: { value: "Changed" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() => expect(onChange).toHaveBeenCalledWith("Changed"));
  });

  it("shows loading and disables textarea while saving", async () => {
    let resolvePromise: (() => void) | undefined;
    const onChange = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        }),
    );
    render(<AutoSaveTextarea value="Initial" onChange={onChange} />);
    const textarea = screen.getByTestId("autosave-textarea");
    fireEvent.change(textarea, { target: { value: "Saving" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    // Should be disabled while loading
    expect(textarea).toBeDisabled();
    // Finish saving
    act(() => {
      if (resolvePromise) resolvePromise();
    });
    await waitFor(() => expect(textarea).not.toBeDisabled());
  });

  it("updates textarea value if parent value changes", () => {
    const { rerender } = render(
      <AutoSaveTextarea value="Initial" onChange={jest.fn()} />,
    );
    rerender(<AutoSaveTextarea value="Updated" onChange={jest.fn()} />);
    expect(screen.getByTestId("autosave-textarea")).toHaveValue("Updated");
  });
});
