import { act, fireEvent, render, screen } from "@testing-library/react";
import {
  CustomFieldsContext,
  CustomFieldsContextType,
} from "../../../../../providers/CustomFieldsContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { CheckboxCustomFieldProps } from "./CheckboxCustomField";
import { CustomField } from "./CustomField";
import { TextCustomFieldProps } from "./TextCustomField";

// Mock child components
jest.mock("./TextCustomField", () => ({
  TextCustomField: ({
    initialValue,
    onChange,
    disabled,
  }: TextCustomFieldProps) => (
    <input
      data-testid="text-custom-field"
      value={initialValue}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
jest.mock("./CheckboxCustomField", () => ({
  CheckboxCustomField: ({
    initialValue,
    onChange,
    disabled,
  }: CheckboxCustomFieldProps) => (
    <input
      data-testid="checkbox-custom-field"
      type="checkbox"
      checked={initialValue === "true"}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked ? "true" : "false")}
    />
  ),
}));
jest.mock("../CustomFieldActions/CustomFieldActions", () => ({
  CustomFieldActions: ({ onDelete }: { onDelete?: () => void }) => (
    <button data-testid="custom-field-actions" onClick={onDelete}>
      Delete
    </button>
  ),
}));

const mockUpdateCustomFieldValue = jest.fn();
const mockUpdateCustomFieldDefaultValue = jest.fn();
const mockMarkCustomFieldAsDeleted = jest.fn();

jest.mock("../../../../../hooks/actions/useCustomFieldActions", () => ({
  useCustomFieldActions: () => ({
    updateCustomFieldValue: mockUpdateCustomFieldValue,
    updateCustomFieldDefaultValue: mockUpdateCustomFieldDefaultValue,
    markCustomFieldAsDeleted: mockMarkCustomFieldAsDeleted,
  }),
}));

function getContextValue(
  entityType: CustomFieldEntityType = CustomFieldEntityType.Task,
): CustomFieldsContextType {
  return {
    state: {
      entityType,
      entityId: "entity1",
      customFields: [],
      loading: false,
    },
    customFieldsDispatch: jest.fn(),
    fetchCustomFields: jest.fn(),
  };
}

const baseData: CustomField = {
  id: "cf1",
  name: "Field Name",
  description: "Field Description",
  type: CustomFieldType.Text,
  value: "initial",
  default_value: "default",
  entity_type: CustomFieldEntityType.Task,
  entity_id: "entity1",
  created_at: "2024-06-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  deleted_at: "", // Use empty string instead of null
  is_deleted: "false",
};

describe("CustomField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders TextCustomField for text type", () => {
    render(
      <CustomFieldsContext.Provider value={getContextValue()}>
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("text-custom-field")).toBeInTheDocument();
    expect(screen.getByTestId("custom-field-actions")).toBeInTheDocument();
  });

  it("renders CheckboxCustomField for checkbox type", () => {
    render(
      <CustomFieldsContext.Provider value={getContextValue()}>
        <CustomField
          data={{ ...baseData, type: CustomFieldType.Checkbox, value: "true" }}
        />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("checkbox-custom-field")).toBeInTheDocument();
    expect(screen.getByTestId("custom-field-actions")).toBeInTheDocument();
  });

  it("calls updateCustomFieldValue for text field save", async () => {
    render(
      <CustomFieldsContext.Provider value={getContextValue()}>
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    const input = screen.getByTestId("text-custom-field");
    fireEvent.change(input, { target: { value: "changed" } });
    await act(async () => {});
    expect(mockUpdateCustomFieldValue).toHaveBeenCalledWith(
      baseData.id,
      "changed",
      "entity1",
      CustomFieldEntityType.Task,
    );
  });

  it("calls updateCustomFieldDefaultValue for pipeline entity", async () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Pipeline)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    const input = screen.getByTestId("text-custom-field");
    fireEvent.change(input, { target: { value: "changed" } });
    await act(async () => {});
    expect(mockUpdateCustomFieldDefaultValue).toHaveBeenCalledWith(
      baseData.id,
      "changed",
    );
  });

  it("calls markCustomFieldAsDeleted and dispatches on delete", async () => {
    const dispatch = jest.fn();
    render(
      <CustomFieldsContext.Provider
        value={{ ...getContextValue(), customFieldsDispatch: dispatch }}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    // Simulate delete by clicking the button
    await act(async () => {
      fireEvent.click(screen.getByTestId("custom-field-actions"));
    });
    expect(mockMarkCustomFieldAsDeleted).toHaveBeenCalledWith(
      baseData.id,
      expect.any(Function),
    );
  });

  it("disables field when not allowed (Pipeline)", () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Pipeline)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("text-custom-field")).toBeDisabled();
  });

  it("enables field when allowed (QUICKTASKER)", () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.QUICKTASKER)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("text-custom-field")).not.toBeDisabled();
  });
});
