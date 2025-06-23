import { useContext } from "@wordpress/element";
import { CLOSE_AUTOMATION_CREATOR_MODAL } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { AutomationCreator } from "./components/AutomationCreator/AutomationCreator";

type Props = {
  pipelineId: string;
};
function AutomationCreatorModal({ pipelineId }: Props) {
  const {
    state: { automationCreatorModalOpen },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={automationCreatorModalOpen}
      closeModal={() => {
        modalDispatch({ type: CLOSE_AUTOMATION_CREATOR_MODAL });
      }}
      size="lg"
    >
      <AutomationCreator pipelineId={pipelineId} />
    </WPQTModal>
  );
}

export { AutomationCreatorModal };
