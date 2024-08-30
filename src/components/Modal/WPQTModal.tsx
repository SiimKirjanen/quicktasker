import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Label,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  modalOpen: boolean;
  closeModal: () => void;
};
function WPQTModal({ modalOpen, closeModal, children }: Props) {
  return (
    <Dialog
      open={modalOpen}
      as="div"
      className="wpqt-relative wpqt-z-10 focus:wpqt-outline-none"
      onClose={closeModal}
    >
      <DialogBackdrop className="wpqt-fixed wpqt-inset-0 wpqt-bg-black/40" />
      <div className="wpqt-fixed wpqt-inset-0 wpqt-z-10 wpqt-w-screen wpqt-overflow-y-auto">
        <div className="wpqt-flex wpqt-min-h-full wpqt-items-center wpqt-justify-center">
          <DialogPanel
            transition
            className="data-[closed]:wpqt-transform-[wpqt-scale(95%)] wpqt-relative wpqt-w-full wpqt-max-w-md wpqt-rounded-xl wpqt-bg-white wpqt-p-6 wpqt-backdrop-blur-2xl wpqt-duration-300 wpqt-ease-out data-[closed]:wpqt-opacity-0"
          >
            <div
              className="wpqt-absolute wpqt-right-[-20px] wpqt-top-[-20px] wpqt-flex wpqt-h-[40px] wpqt-w-[40px] wpqt-cursor-pointer wpqt-items-center wpqt-justify-center wpqt-rounded-full wpqt-border wpqt-border-solid wpqt-bg-white wpqt-text-qtBorder"
              onClick={closeModal}
            >
              <XMarkIcon className="wpqt-size-5" />
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

function WPQTModalTitle({ children }: { children: React.ReactNode }) {
  return (
    <DialogTitle
      as="div"
      className="wpqt-text-base/7 wpqt-font-medium wpqt-text-black"
    >
      {children}
    </DialogTitle>
  );
}

function WPQTModalFieldSet({ children }: { children: React.ReactNode }) {
  return <Fieldset className="wpqt-mb-3">{children}</Fieldset>;
}

function WPQTModalField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Field className="wpqt-mb-3">
      <Label className="wpqt-mb-2 wpqt-block wpqt-text-sm/6 wpqt-font-medium">
        {label}
      </Label>
      {children}
    </Field>
  );
}

function WPQTModalFooter({
  onSave,
  saveBtnText,
}: {
  onSave: () => void;
  saveBtnText: string;
}) {
  return (
    <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end">
      <Button
        className="wpqt-inline-flex wpqt-items-center wpqt-gap-2 wpqt-rounded-md wpqt-bg-gray-700 wpqt-px-3 wpqt-py-1.5 wpqt-text-sm/6 wpqt-font-semibold wpqt-text-white wpqt-shadow-inner wpqt-shadow-white/10 focus:wpqt-outline-none data-[hover]:wpqt-bg-gray-600 data-[open]:wpqt-bg-gray-700 data-[focus]:wpqt-outline-1 data-[focus]:wpqt-outline-white"
        onClick={onSave}
      >
        {saveBtnText}
      </Button>
    </div>
  );
}

export {
  WPQTModal,
  WPQTModalTitle,
  WPQTModalFieldSet,
  WPQTModalField,
  WPQTModalFooter,
};
