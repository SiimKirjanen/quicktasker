import { render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { getCustomFieldsRequest } from "../../../api/api";
import {
  CustomFieldsContext,
  CustomFieldsContextType,
} from "../../../providers/CustomFieldsContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../types/custom-field";
import { CustomFieldsRecovery } from "./CustomFieldsRecovery";

jest.mock("../../../api/api", () => ({
  getCustomFieldsRequest: jest.fn(),
}));

jest.mock("./components/DeletedField/DeletedField", () => ({
  DeletedField: ({ customField }: { customField: { name: string } }) => (
    <div data-testid="deleted-field">{customField.name}</div>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

const mockGetCustomFieldsRequest = getCustomFieldsRequest as jest.Mock;

function makeContext(): CustomFieldsContextType {
  return {
    state: {
      entityId: "entity1",
      entityType: CustomFieldEntityType.Task,
      customFields: [],
      loading: false,
    },
    customFieldsDispatch: jest.fn(),
    fetchCustomFields: jest.fn(),
  };
}

afterEach(() => jest.clearAllMocks());

describe("CustomFieldsRecovery", () => {
  it("shows loading state before fetch completes", () => {
    mockGetCustomFieldsRequest.mockReturnValue(new Promise(() => {}));
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();
  });

  it("renders the recovery heading and description", () => {
    mockGetCustomFieldsRequest.mockReturnValue(new Promise(() => {}));
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByText("Custom Field recovery")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Deleted custom field by accident? No worries! You can recover it here.",
      ),
    ).toBeInTheDocument();
  });

  it("shows empty message when no deleted fields are returned", async () => {
    mockGetCustomFieldsRequest.mockResolvedValue({ data: [] });
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    await waitFor(() =>
      expect(screen.getByText("No deleted custom fields")).toBeInTheDocument(),
    );
  });

  it("renders a DeletedField for each returned deleted field", async () => {
    const fields = [
      {
        id: "1",
        name: "Old Field",
        description: "",
        type: CustomFieldType.Text,
        entity_type: CustomFieldEntityType.Task,
        entity_id: "entity1",
        created_at: "",
        updated_at: "",
        deleted_at: "2024-01-01",
        is_deleted: "true",
        default_value: null,
      },
      {
        id: "2",
        name: "Another Field",
        description: "",
        type: CustomFieldType.Checkbox,
        entity_type: CustomFieldEntityType.Task,
        entity_id: "entity1",
        created_at: "",
        updated_at: "",
        deleted_at: "2024-01-02",
        is_deleted: "true",
        default_value: null,
      },
    ];
    mockGetCustomFieldsRequest.mockResolvedValue({ data: fields });
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    await waitFor(() =>
      expect(screen.getAllByTestId("deleted-field")).toHaveLength(2),
    );
    expect(screen.getByText("Old Field")).toBeInTheDocument();
    expect(screen.getByText("Another Field")).toBeInTheDocument();
  });

  it("shows error toast when fetch fails", async () => {
    mockGetCustomFieldsRequest.mockRejectedValue(new Error("Network error"));
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
  });

  it("fetches deleted fields with active=false", async () => {
    mockGetCustomFieldsRequest.mockResolvedValue({ data: [] });
    render(
      <CustomFieldsContext.Provider value={makeContext()}>
        <CustomFieldsRecovery />
      </CustomFieldsContext.Provider>,
    );
    await waitFor(() =>
      expect(mockGetCustomFieldsRequest).toHaveBeenCalledWith(
        "entity1",
        CustomFieldEntityType.Task,
        false,
      ),
    );
  });
});
