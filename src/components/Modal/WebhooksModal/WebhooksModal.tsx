import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
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
      <WebhookModalContent webhooks={webhooks} />
    </WPQTModal>
  );
}

type WebhooksModalContentProps = {
  webhooks: Webhook[];
};
function WebhookModalContent({ webhooks }: WebhooksModalContentProps) {
  if (webhooks.length === 0) {
    return <h2>{__("No webhooks found.", "quicktasker")}</h2>;
  }
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      {webhooks.map((webhook) => (
        <Webhook key={webhook.id} webhook={webhook} />
      ))}
    </div>
  );
}

export { WebhooksModal };
