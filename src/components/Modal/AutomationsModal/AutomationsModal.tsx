import { useContext } from "@wordpress/element";
import { CLOSE_AUTOMATIONS_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
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
      <AutomationsList />
    </WPQTModal>
  );
}

export { AutomationsModal };
