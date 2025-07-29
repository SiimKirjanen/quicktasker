import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
// DO NOT mock TextCustomField here!

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

const mockUpdateCustomFieldValue = jest.fn(
  () => new Promise((resolve) => setTimeout(resolve, 100)),
);
const mockUpdateCustomFieldDefaultValue = jest.fn(() => Promise.resolve());
const mockMarkCustomFieldAsDeleted = jest.fn(() => Promise.resolve());

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

const baseData = {
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
  deleted_at: "",
  is_deleted: "false",
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("CustomField", () => {
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

  it("calls updateCustomFieldValue for text field save when allowed", async () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Task)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    const input = screen.getByTestId("text-custom-field");
    fireEvent.change(input, { target: { value: "changed" } });
    await waitFor(() =>
      expect(mockUpdateCustomFieldValue).toHaveBeenCalledWith(
        baseData.id,
        "changed",
        "entity1",
        CustomFieldEntityType.Task,
      ),
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
    await waitFor(() =>
      expect(mockUpdateCustomFieldDefaultValue).toHaveBeenCalledWith(
        baseData.id,
        "changed",
      ),
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
    fireEvent.click(screen.getByTestId("custom-field-actions"));
    await waitFor(() =>
      expect(mockMarkCustomFieldAsDeleted).toHaveBeenCalledWith(
        baseData.id,
        expect.any(Function),
      ),
    );
  });

  it("enables checkbox when allowed (Task)", () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Task)}
      >
        <CustomField
          data={{ ...baseData, type: CustomFieldType.Checkbox, value: "false" }}
        />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("checkbox-custom-field")).not.toBeDisabled();
  });

  it("disables text field during save (actionLoading)", async () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Task)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    const input = screen.getByTestId("text-custom-field");
    fireEvent.change(input, { target: { value: "changed" } });
    // Should be disabled while async save is pending
    await waitFor(() =>
      expect(screen.getByTestId("text-custom-field")).toBeDisabled(),
    );
    // After save completes, should be enabled again
    await waitFor(() =>
      expect(screen.getByTestId("text-custom-field")).not.toBeDisabled(),
    );
  });

  it("enables text field when allowed (Pipeline)", () => {
    render(
      <CustomFieldsContext.Provider
        value={getContextValue(CustomFieldEntityType.Pipeline)}
      >
        <CustomField data={{ ...baseData, type: CustomFieldType.Text }} />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("text-custom-field")).not.toBeDisabled();
  });
});
