import { useContext } from "@wordpress/element";
import { CLOSE_STAGE_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { StageModalContent } from "./StageModalContent";

function StageModal() {
  const {
    state: { stageModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const closeModal = () => modalDispatch({ type: CLOSE_STAGE_MODAL });

  return (
    <WPQTModal
      modalOpen={stageModalOpen}
      closeModal={closeModal}
      testId="stage-modal"
    >
      <StageModalContent />
    </WPQTModal>
  );
}

export { StageModal };
