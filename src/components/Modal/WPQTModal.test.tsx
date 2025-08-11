import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import {
  WPQTModal,
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
  WPQTModalTitle,
} from "./WPQTModal";

// Mock dependencies used inside the modal
jest.mock("../common/Button/Button", () => ({
  WPQTButton: ({
    btnText,
    loading,
    onClick,
  }: {
    btnText: string;
    loading?: boolean;
    onClick: () => void;
  }) => (
    <button
      data-testid="wpqt-button"
      data-loading={loading ? "true" : "false"}
      onClick={onClick}
    >
      {btnText}
    </button>
  ),
}));

jest.mock("../Tooltip/WPQTTooltip", () => ({
  WPQTTooltip: ({ id }: { id: string }) => (
    <div data-testid="wpqt-tooltip" data-id={id} />
  ),
}));

// Mock Headless UI to avoid Transition/act issues and supply all named exports used
jest.mock("@headlessui/react", () => {
  const DialogBase = ({
    open,
    onClose,
    children,
  }: {
    open?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
  }) => {
    React.useEffect(() => {
      if (!onClose) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (open === false) return null;
    return (
      <div data-testid="mock-dialog" role="dialog">
        {children}
      </div>
    );
  };

  const DialogPanel = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="mock-dialog-panel" {...props} />
  );

  const DialogTitle = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="mock-dialog-title" {...props} />
  );

  const DialogBackdrop = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="mock-dialog-backdrop" {...props} />
  );

  const Transition = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );
  const TransitionRoot = ({
    show,
    children,
  }: {
    show?: boolean;
    children?: React.ReactNode;
  }) => (show === false ? null : <>{children}</>);
  const TransitionChild = ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  );

  const Field = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="mock-field" {...props} />
  );
  const Fieldset = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div data-testid="mock-fieldset" {...props} />
  );
  const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label data-testid="mock-label" {...props} />
  );

  const Dialog = Object.assign(DialogBase, {
    Panel: DialogPanel,
    Title: DialogTitle,
  });

  return {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
    Transition,
    TransitionRoot,
    TransitionChild,
    Field,
    Fieldset,
    Label,
  };
});

describe("WPQTModal", () => {
  it("renders children when open and hides when closed", () => {
    const { rerender } = render(
      <WPQTModal modalOpen closeModal={jest.fn()}>
        <div>Modal content</div>
      </WPQTModal>,
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();

    rerender(
      <WPQTModal modalOpen={false} closeModal={jest.fn()}>
        <div>Modal content</div>
      </WPQTModal>,
    );
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  it("calls closeModal when clicking the close button", () => {
    const closeModal = jest.fn();
    render(
      <WPQTModal modalOpen closeModal={closeModal}>
        <div>Modal content</div>
      </WPQTModal>,
    );
    fireEvent.click(screen.getByTestId("wpqt-modal-close-button"));
    expect(closeModal).toHaveBeenCalled();
  });

  it("calls closeModal on Escape key", () => {
    const closeModal = jest.fn();
    render(
      <WPQTModal modalOpen closeModal={closeModal}>
        <div>Modal content</div>
      </WPQTModal>,
    );
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(closeModal).toHaveBeenCalled();
  });

  it("applies size classes on the panel", () => {
    const { rerender } = render(
      <WPQTModal modalOpen size="sm" closeModal={jest.fn()}>
        <div>Sized content</div>
      </WPQTModal>,
    );
    // Find the panel via a distinctive class present on DialogPanel
    const getPanel = () =>
      document.querySelector(
        'div[class*="wpqt-rounded-xl"][class*="wpqt-bg-white"][class*="wpqt-backdrop-blur-2xl"]',
      ) as HTMLElement | null;

    expect(getPanel()).toHaveClass("wpqt-max-w-sm");

    rerender(
      <WPQTModal modalOpen size="xl" closeModal={jest.fn()}>
        <div>Sized content</div>
      </WPQTModal>,
    );
    expect(getPanel()).toHaveClass("wpqt-max-w-6xl");
  });
});

describe("WPQTModalTitle", () => {
  it("renders title content", () => {
    render(<WPQTModalTitle>My Title</WPQTModalTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });
});

describe("WPQTModalFieldSet", () => {
  it("renders children", () => {
    render(
      <WPQTModalFieldSet>
        <div>Fieldset child</div>
      </WPQTModalFieldSet>,
    );
    expect(screen.getByText("Fieldset child")).toBeInTheDocument();
  });
});

describe("WPQTModalField", () => {
  it("renders label and children", () => {
    render(
      <WPQTModalField label="Label">
        <input aria-label="input" />
      </WPQTModalField>,
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByLabelText("input")).toBeInTheDocument();
  });

  it("renders tooltip and data attributes when provided", () => {
    render(
      <WPQTModalField label="Label" tooltipId="tip-1" tooltipText="Helpful tip">
        <input aria-label="input" />
      </WPQTModalField>,
    );
    const label = screen.getByText("Label");
    expect(label).toHaveAttribute("data-tooltip-id", "tip-1");
    expect(label).toHaveAttribute("data-tooltip-content", "Helpful tip");
    expect(screen.getByTestId("wpqt-tooltip")).toBeInTheDocument();
  });
});

describe("WPQTModalFooter", () => {
  it("renders save button and calls onSave", () => {
    const onSave = jest.fn();
    render(
      <WPQTModalFooter onSave={onSave} saveBtnText="Save" loading={false} />,
    );
    const btn = screen.getByTestId("wpqt-button");
    expect(btn).toHaveTextContent("Save");
    fireEvent.click(btn);
    expect(onSave).toHaveBeenCalled();
  });

  it("passes loading to the button", () => {
    const onSave = jest.fn();
    render(
      <WPQTModalFooter onSave={onSave} saveBtnText="Save" loading={true} />,
    );
    expect(screen.getByTestId("wpqt-button")).toHaveAttribute(
      "data-loading",
      "true",
    );
  });
});
