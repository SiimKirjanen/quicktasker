import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { TEXT_ENTER_DEBOUNCE_TIMEOUT } from "../../../../constants";
import { AutoSaveInput } from "./AutoSaveInput";

// Mock WPQTInput
jest.mock("../Input", () => ({
  WPQTInput: ({
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
    <input
      data-testid="autosave-input"
      value={value}
      disabled={disabled}
      aria-busy={loading}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    />
  ),
}));

jest.useFakeTimers();

describe("AutoSaveInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input with initial value", () => {
    render(<AutoSaveInput value="Initial" onChange={jest.fn()} />);
    expect(screen.getByTestId("autosave-input")).toHaveValue("Initial");
  });

  it("updates input value on change", () => {
    render(<AutoSaveInput value="Initial" onChange={jest.fn()} />);
    const input = screen.getByTestId("autosave-input");
    fireEvent.change(input, { target: { value: "Changed" } });
    expect(input).toHaveValue("Changed");
  });

  it("calls onChange after debounce when value changes", async () => {
    const onChange = jest.fn().mockResolvedValue(undefined);
    render(<AutoSaveInput value="Initial" onChange={onChange} />);
    const input = screen.getByTestId("autosave-input");
    fireEvent.change(input, { target: { value: "Changed" } });
    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });
    await waitFor(() => expect(onChange).toHaveBeenCalledWith("Changed"));
  });

  it("shows loading and disables input while saving", async () => {
    const onChange = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          setTimeout(resolve, 10); // Add a small delay
        }),
    );
    render(<AutoSaveInput value="Initial" onChange={onChange} />);
    const input = screen.getByTestId("autosave-input");
    fireEvent.change(input, { target: { value: "Changed" } });

    act(() => {
      jest.advanceTimersByTime(TEXT_ENTER_DEBOUNCE_TIMEOUT);
    });

    // Wait for loading state
    await waitFor(() => {
      expect(input).toBeDisabled();
      expect(input).toHaveAttribute("aria-busy", "true");
    });

    // Wait for save to finish and input to be enabled again
    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(input).toHaveAttribute("aria-busy", "false");
    });
  });
});
