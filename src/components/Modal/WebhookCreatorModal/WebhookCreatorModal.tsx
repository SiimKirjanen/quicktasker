import { useContext } from "@wordpress/element";
import { SET_WEBHOOK_CREATION_MODAL_OPEN } from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { WebhookCreator } from "./components/WebhookCreator/WebhookCreator";

type Props = {
  pipelineId: string;
};

function WebhookCreatorModal({ pipelineId }: Props) {
  const {
    state: { webhookCreationModalOpen },
    modalDispatch,
  } = useContext(ModalContext);

  return (
    <WPQTModal
      modalOpen={webhookCreationModalOpen}
      closeModal={() => {
        modalDispatch({
          type: SET_WEBHOOK_CREATION_MODAL_OPEN,
          payload: false,
        });
      }}
      size="lg"
    >
      <WebhookCreator pipelineId={pipelineId} />
    </WPQTModal>
  );
}

export { WebhookCreatorModal };
