import { fireEvent, render, screen } from "@testing-library/react";
import {
  AppContext,
  initialState as appInitialState,
} from "../../../../../providers/AppContextProvider";
import {
  CustomFieldEntityType,
  CustomFieldType,
} from "../../../../../types/custom-field";
import { CustomFieldActions } from "./CustomFieldActions";

jest.mock("../../../../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: () => null,
}));

jest.mock("../../../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
  Loading: () => <div data-testid="loading" />,
}));

const baseField = {
  id: "cf1",
  name: "Field",
  description: "",
  type: CustomFieldType.Text,
  entity_type: CustomFieldEntityType.Task,
  entity_id: "e1",
  created_at: "",
  updated_at: "",
  deleted_at: "",
  is_deleted: "false",
  default_value: null,
};

function makeAppContext(isUserAllowedToDelete: boolean) {
  return {
    state: { ...appInitialState, isUserAllowedToDelete },
    appDispatch: jest.fn(),
  };
}

afterEach(() => jest.clearAllMocks());

describe("CustomFieldActions", () => {
  it("renders the delete button when isUserAllowedToDelete is true", () => {
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Task}
          onDelete={jest.fn()}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    expect(container.querySelector(".wpqt-main-border")).toBeInTheDocument();
  });

  it("hides the delete button when isUserAllowedToDelete is false", () => {
    const { container } = render(
      <AppContext.Provider value={makeAppContext(false)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Task}
          onDelete={jest.fn()}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    expect(
      container.querySelector(".wpqt-main-border"),
    ).not.toBeInTheDocument();
  });

  it("calls onDelete when entity_type matches locationOfCustomFields", () => {
    const onDelete = jest.fn();
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Task}
          onDelete={onDelete}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    fireEvent.click(container.querySelector(".wpqt-main-border")!);
    expect(onDelete).toHaveBeenCalled();
  });

  it("does not call onDelete when entity_type does not match locationOfCustomFields", () => {
    const onDelete = jest.fn();
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Pipeline}
          onDelete={onDelete}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    fireEvent.click(container.querySelector(".wpqt-main-border")!);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("shows tooltip when entity_type does not match locationOfCustomFields", () => {
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Pipeline}
          onDelete={jest.fn()}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    expect(
      container.querySelector('[data-tooltip-id="custom-field-cf1-delete"]'),
    ).toBeInTheDocument();
  });

  it("does not show tooltip when entity_type matches locationOfCustomFields", () => {
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Task}
          onDelete={jest.fn()}
          actionLoading={false}
        />
      </AppContext.Provider>,
    );
    expect(
      container.querySelector('[data-tooltip-id="custom-field-cf1-delete"]'),
    ).not.toBeInTheDocument();
  });

  it("shows loading indicator instead of delete button when actionLoading is true", () => {
    const { container } = render(
      <AppContext.Provider value={makeAppContext(true)}>
        <CustomFieldActions
          data={baseField}
          locationOfCustomFields={CustomFieldEntityType.Task}
          onDelete={jest.fn()}
          actionLoading={true}
        />
      </AppContext.Provider>,
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(
      container.querySelector(".wpqt-main-border"),
    ).not.toBeInTheDocument();
  });
});
