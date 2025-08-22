import { useContext } from "@wordpress/element";
import { SET_WEBHOOKS_MODAL_OPEN } from "../../../constants";
import { useWebhooks } from "../../../hooks/useWebhooks";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTModal } from "../WPQTModal";
import { Webhook } from "./components/Webhook/Webhook";

function WebhooksModal() {
  const {
    state: { webhooksModalOpen },
    modalDispatch,
  } = useContext(ModalContext);
  const { webhooks } = useWebhooks();

  return (
    <WPQTModal
      modalOpen={webhooksModalOpen}
      closeModal={() => {
        modalDispatch({
          type: SET_WEBHOOKS_MODAL_OPEN,
          payload: false,
        });
      }}
      size="lg"
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
        {webhooks.map((webhook) => (
          <Webhook key={webhook.id} webhook={webhook} />
        ))}
      </div>
    </WPQTModal>
  );
}

export { WebhooksModal };
