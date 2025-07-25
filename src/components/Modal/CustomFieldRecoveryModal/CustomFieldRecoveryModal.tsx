import { useContext } from "@wordpress/element";
import { SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { CustomFieldsRecovery } from "../../CustomField/CustomFieldsRecovery/CustomFieldsRecovery";
import { WPQTModal } from "../WPQTModal";

function CustomFieldRecoveryModal() {
  const {
    state: { customFieldRecoveryModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  return (
    <WPQTModal
      modalOpen={customFieldRecoveryModalOpen}
      closeModal={() => {
        modalDispatch({
          type: SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
          payload: false,
        });
      }}
      size="lg"
    >
      <CustomFieldsRecovery />
    </WPQTModal>
  );
}

export { CustomFieldRecoveryModal };
