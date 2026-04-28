import { render, screen } from "@testing-library/react";
import {
  CustomFieldsContext,
  CustomFieldsContextType,
} from "../../../providers/CustomFieldsContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../types/custom-field";
import { CustomFields } from "./CustomFields";

jest.mock("./components/CustomField/CustomField", () => ({
  CustomField: ({ data }: { data: { name: string } }) => (
    <div data-testid="custom-field">{data.name}</div>
  ),
}));

jest.mock("../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
}));

function makeContext(
  overrides: Partial<CustomFieldsContextType["state"]> = {},
): CustomFieldsContextType {
  return {
    state: {
      entityId: "e1",
      entityType: CustomFieldEntityType.Task,
      customFields: [],
      loading: false,
      ...overrides,
    },
    customFieldsDispatch: jest.fn(),
    fetchCustomFields: jest.fn(),
  };
}

describe("CustomFields", () => {
  it("shows loading indicator when loading", () => {
    render(
      <CustomFieldsContext.Provider value={makeContext({ loading: true })}>
        <CustomFields />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
  });

  it("shows empty state message when no custom fields exist", () => {
    render(
      <CustomFieldsContext.Provider value={makeContext({ customFields: [] })}>
        <CustomFields />
      </CustomFieldsContext.Provider>,
    );
    expect(
      screen.getByText("No related custom fields created"),
    ).toBeInTheDocument();
  });

  it("renders a CustomField component for each field", () => {
    const fields = [
      {
        id: "1",
        name: "Field Alpha",
        description: "",
        type: CustomFieldType.Text,
        entity_type: CustomFieldEntityType.Task,
        entity_id: "e1",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        is_deleted: "false",
        default_value: null,
      },
      {
        id: "2",
        name: "Field Beta",
        description: "",
        type: CustomFieldType.Checkbox,
        entity_type: CustomFieldEntityType.Task,
        entity_id: "e1",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        is_deleted: "false",
        default_value: null,
      },
    ];
    render(
      <CustomFieldsContext.Provider
        value={makeContext({ customFields: fields })}
      >
        <CustomFields />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getAllByTestId("custom-field")).toHaveLength(2);
    expect(screen.getByText("Field Alpha")).toBeInTheDocument();
    expect(screen.getByText("Field Beta")).toBeInTheDocument();
  });

  it("does not show empty message or loading when fields are present", () => {
    const fields = [
      {
        id: "1",
        name: "Field A",
        description: "",
        type: CustomFieldType.Text,
        entity_type: CustomFieldEntityType.Task,
        entity_id: "e1",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        is_deleted: "false",
        default_value: null,
      },
    ];
    render(
      <CustomFieldsContext.Provider
        value={makeContext({ customFields: fields })}
      >
        <CustomFields />
      </CustomFieldsContext.Provider>,
    );
    expect(
      screen.queryByText("No related custom fields created"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading-oval")).not.toBeInTheDocument();
  });
});
