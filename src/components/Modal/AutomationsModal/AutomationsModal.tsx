import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CLOSE_AUTOMATIONS_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal, WPQTModalTitle } from "../WPQTModal";
import { AutomationsList } from "./components/AutomationsList/AutomationsList";

function AutomationsModal() {
  const {
    state: { automationsModalOpen },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={automationsModalOpen}
      closeModal={() => {
        modalDispatch({ type: CLOSE_AUTOMATIONS_MODAL });
      }}
      size="lg"
    >
      <WPQTModalTitle className="wpqt-text-center">
        {__("Manage board automations", "quicktasker")}
      </WPQTModalTitle>
      <AutomationsList />
    </WPQTModal>
  );
}

export { AutomationsModal };
