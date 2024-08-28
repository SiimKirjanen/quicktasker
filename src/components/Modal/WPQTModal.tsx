import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

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
            className="data-[closed]:wpqt-transform-[wpqt-scale(95%)] wpqt-w-full wpqt-max-w-md wpqt-rounded-xl wpqt-bg-white wpqt-p-6 wpqt-backdrop-blur-2xl wpqt-duration-300 wpqt-ease-out data-[closed]:wpqt-opacity-0"
          >
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

export { WPQTModal, WPQTModalTitle };
