import { fireEvent, render } from "@testing-library/react";
import {
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
  SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
} from "../../../constants";
import {
  ModalContext,
  ModalContextType,
  initialState as modalInitialState,
} from "../../../providers/ModalContextProvider";
import { CustomFieldActins } from "./CustomFieldActions";

jest.mock("../../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: () => null,
}));

jest.mock("../../Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
}));

function makeModalContext(dispatch = jest.fn()): ModalContextType {
  return {
    state: modalInitialState,
    modalDispatch: dispatch,
  };
}

afterEach(() => jest.clearAllMocks());

describe("CustomFieldActins", () => {
  it("renders two icon buttons (restore and add)", () => {
    const { container } = render(
      <ModalContext.Provider value={makeModalContext()}>
        <CustomFieldActins />
      </ModalContext.Provider>,
    );
    expect(
      container.querySelector('[data-tooltip-id="custom-field-restore"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-tooltip-id="custom-field-create"]'),
    ).toBeInTheDocument();
  });

  it("dispatches SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN on restore button click", () => {
    const dispatch = jest.fn();
    const { container } = render(
      <ModalContext.Provider value={makeModalContext(dispatch)}>
        <CustomFieldActins />
      </ModalContext.Provider>,
    );
    fireEvent.click(
      container.querySelector('[data-tooltip-id="custom-field-restore"]')!,
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
      payload: true,
    });
  });

  it("dispatches SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN on add button click", () => {
    const dispatch = jest.fn();
    const { container } = render(
      <ModalContext.Provider value={makeModalContext(dispatch)}>
        <CustomFieldActins />
      </ModalContext.Provider>,
    );
    fireEvent.click(
      container.querySelector('[data-tooltip-id="custom-field-create"]')!,
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
      payload: true,
    });
  });

  it("applies a custom className to the wrapper element", () => {
    const { container } = render(
      <ModalContext.Provider value={makeModalContext()}>
        <CustomFieldActins className="wpqt-my-custom-class" />
      </ModalContext.Provider>,
    );
    expect(container.firstChild).toHaveClass("wpqt-my-custom-class");
  });
});
