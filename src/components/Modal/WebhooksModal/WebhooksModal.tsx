import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_WEBHOOK_CREATION_MODAL_OPEN,
  SET_WEBHOOKS_MODAL_OPEN,
} from "../../../constants";
import { useWebhooks } from "../../../hooks/useWebhooks";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTButton } from "../../common/Button/Button";
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
  const { modalDispatch } = useContext(ModalContext);

  function openWebhookCreationModal() {
    modalDispatch({
      type: SET_WEBHOOK_CREATION_MODAL_OPEN,
      payload: true,
    });
  }
  if (webhooks.length === 0) {
    return <h2>{__("No webhooks found.", "quicktasker")}</h2>;
  }
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      {webhooks.map((webhook) => (
        <Webhook key={webhook.id} webhook={webhook} />
      ))}
      <div className="wpqt-flex wpqt-mt-2 wpqt-justify-end">
        <WPQTButton
          btnText={__("Add new webhook", "quicktasker")}
          onClick={openWebhookCreationModal}
        />
      </div>
    </div>
  );
}

export { WebhooksModal };
