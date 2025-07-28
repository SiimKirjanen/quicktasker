import { act, fireEvent, render, screen } from "@testing-library/react";
import { CustomField } from "../../../../../types/custom-field";
import { TextCustomField } from "./TextCustomField";

jest.useFakeTimers();

const baseProps = {
  data: {
    id: "cf1",
    name: "Field Name",
    description: "Field Description",
    type: "text",
  } as CustomField,
  initialValue: "initial",
  onChange: jest.fn(),
  disabled: false,
};

describe("TextCustomField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders field title and input", () => {
    render(<TextCustomField {...baseProps} />);
    expect(screen.getByText("Field Name")).toBeInTheDocument();
    expect(screen.getByText("Field Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("initial")).toBeInTheDocument();
  });

  it("updates input value instantly on change", () => {
    render(<TextCustomField {...baseProps} />);
    const input = screen.getByDisplayValue("initial");
    fireEvent.change(input, { target: { value: "changed" } });
    expect(screen.getByDisplayValue("changed")).toBeInTheDocument();
  });

  it("calls onChange after debounce when value changes", () => {
    render(<TextCustomField {...baseProps} />);
    const input = screen.getByDisplayValue("initial");
    fireEvent.change(input, { target: { value: "changed" } });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(baseProps.onChange).toHaveBeenCalledWith("changed");
  });

  it("calls onChange if value is reverted before debounce", () => {
    render(<TextCustomField {...baseProps} />);
    const input = screen.getByDisplayValue("initial");
    fireEvent.change(input, { target: { value: "changed" } });
    fireEvent.change(input, { target: { value: "initial" } });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // Should be called with "initial" (the reverted value)
    expect(baseProps.onChange).toHaveBeenCalledWith("initial");
  });

  it("resets value and dirty flag when initialValue changes", () => {
    const { rerender } = render(<TextCustomField {...baseProps} />);
    const input = screen.getByDisplayValue("initial");
    fireEvent.change(input, { target: { value: "changed" } });
    rerender(<TextCustomField {...baseProps} initialValue="newInitial" />);
    expect(screen.getByDisplayValue("newInitial")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // Should NOT call onChange with "newInitial" (no user change)
    expect(baseProps.onChange).not.toHaveBeenCalledWith("newInitial");
  });

  it("disables input when disabled prop is true", () => {
    render(<TextCustomField {...baseProps} disabled={true} />);
    const input = screen.getByDisplayValue("initial");
    expect(input).toBeDisabled();
  });
});
