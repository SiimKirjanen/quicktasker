import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  ADD_CUSTOM_FIELD,
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
} from "../../../constants";
import {
  CustomFieldsContext,
  CustomFieldsContextType,
} from "../../../providers/CustomFieldsContextProvider";
import {
  ModalContext,
  ModalContextType,
  initialState as modalInitialState,
} from "../../../providers/ModalContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../types/custom-field";
import { CustomFieldCreation } from "./CustomFieldCreation";

const mockAddCustomField = jest.fn();

jest.mock("../../../hooks/actions/useCustomFieldActions", () => ({
  useCustomFieldActions: () => ({
    addCustomField: mockAddCustomField,
  }),
}));

jest.mock("../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
  Loading: () => <div data-testid="loading" />,
}));

jest.mock("../../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: () => null,
}));

function makeCustomFieldsContext(
  overrides: Partial<CustomFieldsContextType["state"]> = {},
  dispatch = jest.fn(),
): CustomFieldsContextType {
  return {
    state: {
      entityId: "entity1",
      entityType: CustomFieldEntityType.Task,
      customFields: [],
      loading: false,
      ...overrides,
    },
    customFieldsDispatch: dispatch,
    fetchCustomFields: jest.fn(),
  };
}

function makeModalContext(dispatch = jest.fn()): ModalContextType {
  return {
    state: modalInitialState,
    modalDispatch: dispatch,
  };
}

afterEach(() => jest.clearAllMocks());

describe("CustomFieldCreation", () => {
  it("renders heading, description, field labels, and add button", () => {
    render(
      <CustomFieldsContext.Provider value={makeCustomFieldsContext()}>
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="Add a custom field here" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByText("Custom Fields")).toBeInTheDocument();
    expect(screen.getByText("Add a custom field here")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("returns null when customFields loading is true", () => {
    const { container } = render(
      <CustomFieldsContext.Provider
        value={makeCustomFieldsContext({ loading: true })}
      >
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders Text and Checkbox type options in the select", () => {
    render(
      <CustomFieldsContext.Provider value={makeCustomFieldsContext()}>
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    expect(screen.getByRole("option", { name: "Text" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Checkbox" }),
    ).toBeInTheDocument();
  });

  it("does not call addCustomField when entityId is missing", async () => {
    render(
      <CustomFieldsContext.Provider
        value={makeCustomFieldsContext({ entityId: "" })}
      >
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() => expect(mockAddCustomField).not.toHaveBeenCalled());
  });

  it("does not call addCustomField when entityType is missing", async () => {
    render(
      <CustomFieldsContext.Provider
        value={makeCustomFieldsContext({
          entityType: undefined as unknown as CustomFieldEntityType,
        })}
      >
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() => expect(mockAddCustomField).not.toHaveBeenCalled());
  });

  it("calls addCustomField with typed name and default Text type", async () => {
    mockAddCustomField.mockResolvedValue(undefined);
    render(
      <CustomFieldsContext.Provider value={makeCustomFieldsContext()}>
        <ModalContext.Provider value={makeModalContext()}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    const [nameInput] = screen.getAllByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "My Field" } });
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() =>
      expect(mockAddCustomField).toHaveBeenCalledWith(
        "entity1",
        CustomFieldEntityType.Task,
        CustomFieldType.Text,
        "My Field",
        "",
        expect.any(Function),
      ),
    );
  });

  it("dispatches ADD_CUSTOM_FIELD and closes modal after successful creation", async () => {
    const newField = {
      id: "cf2",
      name: "New",
      description: "",
      type: CustomFieldType.Text,
      entity_type: CustomFieldEntityType.Task,
      entity_id: "entity1",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      is_deleted: "false",
      default_value: null,
    };
    mockAddCustomField.mockImplementation(
      async (
        _id: string,
        _et: string,
        _ft: string,
        _name: string,
        _desc: string,
        callback: (field: typeof newField) => void,
      ) => callback(newField),
    );
    const cfDispatch = jest.fn();
    const modalDispatch = jest.fn();
    render(
      <CustomFieldsContext.Provider
        value={makeCustomFieldsContext({}, cfDispatch)}
      >
        <ModalContext.Provider value={makeModalContext(modalDispatch)}>
          <CustomFieldCreation description="desc" />
        </ModalContext.Provider>
      </CustomFieldsContext.Provider>,
    );
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() => {
      expect(cfDispatch).toHaveBeenCalledWith({
        type: ADD_CUSTOM_FIELD,
        payload: newField,
      });
      expect(modalDispatch).toHaveBeenCalledWith({
        type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
        payload: false,
      });
    });
  });
});
