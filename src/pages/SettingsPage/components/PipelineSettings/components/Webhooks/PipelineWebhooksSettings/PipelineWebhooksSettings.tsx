import { useContext } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { Loading } from "../../../../../../../components/Loading/Loading";
import { WebhookCreatorModal } from "../../../../../../../components/Modal/WebhookCreatorModal/WebhookCreatorModal";
import { WebhooksModal } from "../../../../../../../components/Modal/WebhooksModal/WebhooksModal";
import {
  HAS_WEBHOOKS,
  SET_WEBHOOK_CREATION_MODAL_OPEN,
  SET_WEBHOOKS_MODAL_OPEN,
} from "../../../../../../../constants";
import { useWebhooks } from "../../../../../../../hooks/useWebhooks";
import { ModalContext } from "../../../../../../../providers/ModalContextProvider";
import { PipelineWebhooksContextProvider } from "../../../../../../../providers/PipelineWebhooksContextProvider";
import { Settings } from "../../../../Settings/Settings";

type Props = {
  pipelineId: string;
};

function PipelineWebhooksSettings({ pipelineId }: Props) {
  const description = HAS_WEBHOOKS
    ? __(
        "Send real-time board event data to external services using webhooks.",
        "quicktasker",
      )
    : __(
        "Send real-time board event data to external services using webhooks. To configure more than one webhook, please upgrade to the premium version.",
        "quicktasker",
      );

  return (
    <PipelineWebhooksContextProvider pipelineId={pipelineId}>
      <Settings
        title={__("Board webhooks", "quicktasker")}
        description={description}
      >
        <PipelineWebhooksInfo />
        <WebhookCreatorModal pipelineId={pipelineId} />
        <WebhooksModal />
      </Settings>
    </PipelineWebhooksContextProvider>
  );
}

function PipelineWebhooksInfo() {
  const { webhooks, loading } = useWebhooks();
  const { modalDispatch } = useContext(ModalContext);
  const webhooksLenght = webhooks?.length || 0;
  const canCreateNewWebhook = HAS_WEBHOOKS || webhooksLenght < 1;

  if (loading) {
    return <Loading ovalSize="24" className="!wpqt-items-start" />;
  }

  return (
    <div className="wpqt-text-left">
      <div className="wpqt-mb-2">
        {webhooksLenght === 0 ? (
          <p>
            {__(
              "There are no webhooks configured for this board.",
              "quicktasker",
            )}
          </p>
        ) : (
          <div>
            <p>
              {sprintf(
                /* translators: %d: number of webhooks */
                __(
                  "There are %d webhooks configured for this board.",
                  "quicktasker",
                ),
                webhooksLenght,
              )}
            </p>
            <div>
              <span
                className="wpqt-cursor-pointer wpqt-text-blue-500 hover:wpqt-underline"
                onClick={() => {
                  modalDispatch({
                    type: SET_WEBHOOKS_MODAL_OPEN,
                    payload: true,
                  });
                }}
              >
                {__("Manage board webhooks", "quicktasker")}
              </span>
            </div>
          </div>
        )}
      </div>
      {canCreateNewWebhook && (
        <div>
          <span
            className="wpqt-cursor-pointer wpqt-text-blue-500 hover:wpqt-underline"
            onClick={() => {
              modalDispatch({
                type: SET_WEBHOOK_CREATION_MODAL_OPEN,
                payload: true,
              });
            }}
          >
            {__("Create a new webhook", "quicktasker")}
          </span>
        </div>
      )}
    </div>
  );
}

export { PipelineWebhooksSettings };
