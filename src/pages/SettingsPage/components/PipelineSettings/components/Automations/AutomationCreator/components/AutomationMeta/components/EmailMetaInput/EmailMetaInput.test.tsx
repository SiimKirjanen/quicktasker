import { fireEvent, render, screen } from "@testing-library/react";
import { EmailMetaInput } from "./EmailMetaInput";

describe("EmailMetaInput", () => {
  const setAutomationMeta = jest.fn();

  beforeEach(() => {
    setAutomationMeta.mockClear();
  });

  test("renders input and button", () => {
    render(<EmailMetaInput setAutomationMeta={setAutomationMeta} />);
    expect(screen.getByLabelText("Email will be sent to")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Set email" }),
    ).toBeInTheDocument();
  });

  test("validates email and shows error message for invalid email", () => {
    render(<EmailMetaInput setAutomationMeta={setAutomationMeta} />);
    const input = screen.getByLabelText("Email will be sent to");
    fireEvent.change(input, { target: { value: "invalid-email" } });
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  test("does not show error message for valid email", () => {
    render(<EmailMetaInput setAutomationMeta={setAutomationMeta} />);
    const input = screen.getByLabelText("Email will be sent to");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
  });

  test("calls setAutomationMeta with valid email on button click", () => {
    render(<EmailMetaInput setAutomationMeta={setAutomationMeta} />);
    const input = screen.getByLabelText("Email will be sent to");
    fireEvent.change(input, { target: { value: "test@example.com" } });
    const button = screen.getByRole("button", { name: "Set email" });
    fireEvent.click(button);
    expect(setAutomationMeta).toHaveBeenCalledWith("test@example.com");
  });

  test("does not call setAutomationMeta with invalid email on button click", () => {
    render(<EmailMetaInput setAutomationMeta={setAutomationMeta} />);
    const input = screen.getByLabelText("Email will be sent to");
    fireEvent.change(input, { target: { value: "invalid-email" } });
    const button = screen.getByRole("button", { name: "Set email" });
    fireEvent.click(button);
    expect(setAutomationMeta).not.toHaveBeenCalled();
  });
});
