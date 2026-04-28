import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ADD_CUSTOM_FIELD } from "../../../../../constants";
import {
  CustomFieldsContext,
  CustomFieldsContextType,
} from "../../../../../providers/CustomFieldsContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { DeletedField } from "./DeletedField";

const mockRestoreCustomField = jest.fn();

jest.mock("../../../../../hooks/actions/useCustomFieldActions", () => ({
  useCustomFieldActions: () => ({
    restoreCustomField: mockRestoreCustomField,
  }),
}));

jest.mock("../../../../../hooks/useTimezone", () => ({
  useTimezone: () => ({
    convertToWPTimezone: (d: string) => `formatted:${d}`,
  }),
}));

const baseField = {
  id: "cf1",
  name: "Deleted Field",
  description: "Some description",
  type: CustomFieldType.Text,
  entity_type: CustomFieldEntityType.Task,
  entity_id: "e1",
  created_at: "",
  updated_at: "",
  deleted_at: "2024-01-01T00:00:00Z",
  is_deleted: "true",
  default_value: null,
};

function makeContext(dispatch = jest.fn()): CustomFieldsContextType {
  return {
    state: {
      entityId: "e1",
      entityType: CustomFieldEntityType.Task,
      customFields: [],
      loading: false,
    },
    customFieldsDispatch: dispatch,
    fetchCustomFields: jest.fn(),
  };
}

afterEach(() => jest.clearAllMocks());

describe("DeletedField", () => {
  it("renders field name, description, entity level, and formatted deleted date", () => {
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <DeletedField
          customField={baseField}
          refreshDeletedFields={jest.fn()}
        />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByText("Deleted Field")).toBeInTheDocument();
    expect(screen.getByText("Some description")).toBeInTheDocument();
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(
      screen.getByText("formatted:2024-01-01T00:00:00Z"),
    ).toBeInTheDocument();
  });

  it("does not render deleted date section when deleted_at is empty", () => {
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <DeletedField
          customField={{ ...baseField, deleted_at: "" }}
          refreshDeletedFields={jest.fn()}
        />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.queryByText(/formatted:/)).not.toBeInTheDocument();
  });

  it("calls restoreCustomField with the field id on restore click", async () => {
    mockRestoreCustomField.mockResolvedValue(undefined);
    const { container } = render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <DeletedField
          customField={baseField}
          refreshDeletedFields={jest.fn()}
        />
      </CustomFieldsContext.Provider>,
    );
    fireEvent.click(container.querySelector(".wpqt-main-border")!);
    await waitFor(() =>
      expect(mockRestoreCustomField).toHaveBeenCalledWith(
        "cf1",
        expect.any(Function),
      ),
    );
  });

  it("dispatches ADD_CUSTOM_FIELD and refreshes list after successful restore", async () => {
    const restoredField = { ...baseField, is_deleted: "false", deleted_at: "" };
    mockRestoreCustomField.mockImplementation(
      async (_id: string, callback: (field: typeof restoredField) => void) => {
        callback(restoredField);
      },
    );
    const dispatch = jest.fn();
    const refreshDeletedFields = jest.fn().mockResolvedValue(undefined);
    const { container } = render(
      <CustomFieldsContext.Provider value={makeContext(dispatch)}>
        <DeletedField
          customField={baseField}
          refreshDeletedFields={refreshDeletedFields}
        />
      </CustomFieldsContext.Provider>,
    );
    fireEvent.click(container.querySelector(".wpqt-main-border")!);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ADD_CUSTOM_FIELD,
        payload: restoredField,
      });
      expect(refreshDeletedFields).toHaveBeenCalled();
    });
  });
});
