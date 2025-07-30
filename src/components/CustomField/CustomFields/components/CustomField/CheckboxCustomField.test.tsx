import { fireEvent, render, screen } from "@testing-library/react";
import { CustomField } from "../../../../../types/custom-field";
import { CheckboxCustomField } from "./CheckboxCustomField";

const baseProps = {
  data: {
    id: "cf1",
    name: "Checkbox Field",
    description: "Checkbox Description",
    type: "checkbox",
  } as CustomField,
  initialValue: "false",
  onChange: jest.fn(),
  disabled: false,
};

describe("CheckboxCustomField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders field title and checkbox", () => {
    render(<CheckboxCustomField {...baseProps} />);
    expect(screen.getByText("Checkbox Field")).toBeInTheDocument();
    expect(screen.getByText("Checkbox Description")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("checkbox is unchecked when initialValue is 'false'", () => {
    render(<CheckboxCustomField {...baseProps} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("checkbox is checked when initialValue is 'true'", () => {
    render(<CheckboxCustomField {...baseProps} initialValue="true" />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange with 'true' when checked", () => {
    render(<CheckboxCustomField {...baseProps} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(baseProps.onChange).toHaveBeenCalledWith("true");
    expect(checkbox).toBeChecked();
  });

  it("calls onChange with 'false' when unchecked", () => {
    render(<CheckboxCustomField {...baseProps} initialValue="true" />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(baseProps.onChange).toHaveBeenCalledWith("false");
    expect(checkbox).not.toBeChecked();
  });

  it("disables checkbox when disabled prop is true", () => {
    render(<CheckboxCustomField {...baseProps} disabled={true} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("updates checkbox state when initialValue changes", () => {
    const { rerender } = render(<CheckboxCustomField {...baseProps} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    rerender(<CheckboxCustomField {...baseProps} initialValue="true" />);
    expect(checkbox).toBeChecked();
  });
});
