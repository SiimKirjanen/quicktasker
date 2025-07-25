import { useContext } from "@wordpress/element";
import { SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { CustomFieldCreation } from "../../CustomField/CustomFieldCreation/CustomFieldCreation";
import { WPQTModal } from "../WPQTModal";

type Props = {
  description: string;
};
function CustomFieldCreatorModal({ description }: Props) {
  const {
    state: { customFieldCreatorModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  return (
    <WPQTModal
      modalOpen={customFieldCreatorModalOpen}
      closeModal={() => {
        modalDispatch({
          type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
          payload: false,
        });
      }}
      size="lg"
    >
      <CustomFieldCreation description={description} />
    </WPQTModal>
  );
}

export { CustomFieldCreatorModal };
