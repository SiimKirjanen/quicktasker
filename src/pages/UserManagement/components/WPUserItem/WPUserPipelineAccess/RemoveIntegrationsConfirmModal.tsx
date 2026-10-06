import { useRef } from "@wordpress/element";
import { __, _n, sprintf } from "@wordpress/i18n";
import {
  ButtonStyleType,
  WPQTButton,
} from "../../../../../components/common/Button/Button";
import {
  WPQTModal,
  WPQTModalTitle,
} from "../../../../../components/Modal/WPQTModal";
import { Pipeline } from "../../../../../types/pipeline";
import { PipelineIntegrationCount } from "../../../../../types/user";

/**
 * Describes a number of API tokens and webhooks, like "2 API tokens and 1 webhook".
 */
function formatIntegrationCount({
  api_token_count,
  webhook_count,
}: PipelineIntegrationCount) {
  const tokens = sprintf(
    // translators: %d: number of API tokens
    _n("%d API token", "%d API tokens", api_token_count, "quicktasker"),
    api_token_count,
  );
  const webhooks = sprintf(
    // translators: %d: number of webhooks
    _n("%d webhook", "%d webhooks", webhook_count, "quicktasker"),
    webhook_count,
  );

  if (api_token_count > 0 && webhook_count > 0) {
    return sprintf(
      // translators: 1: number of API tokens, 2: number of webhooks
      __("%1$s and %2$s", "quicktasker"),
      tokens,
      webhooks,
    );
  }

  return api_token_count > 0 ? tokens : webhooks;
}

type Props = {
  userName: string;
  // The boards the user is being removed from that have API tokens or webhooks the user created. Null when closed.
  integrations: PipelineIntegrationCount[] | null;
  pipelines: Pipeline[];
  onAnswer: (confirmed: boolean) => void;
};

/**
 * Asks before removing a user from boards deletes the API tokens and webhooks the user created there.
 */
function RemoveIntegrationsConfirmModal({
  userName,
  integrations,
  pipelines,
  onAnswer,
}: Props) {
  // Kept while the dialog closes, so its content stays until it is gone.
  const shownIntegrations = useRef<PipelineIntegrationCount[]>([]);
  if (integrations) {
    shownIntegrations.current = integrations;
  }

  return (
    <WPQTModal
      modalOpen={integrations !== null}
      closeModal={() => onAnswer(false)}
      testId="remove-integrations-confirm"
      size="md"
    >
      <WPQTModalTitle>
        {__("Delete API tokens and webhooks?", "quicktasker")}
      </WPQTModalTitle>
      <p>
        {sprintf(
          // translators: %s: user name
          __(
            "%s created API tokens or webhooks on the boards they are being removed from. They will be deleted, and integrations that use them will stop working.",
            "quicktasker",
          ),
          userName,
        )}
      </p>
      <ul className="wpqt-my-3 wpqt-list-disc wpqt-pl-5">
        {shownIntegrations.current.map((integration) => {
          const pipeline = pipelines.find(
            (p) => p.id === String(integration.pipeline_id),
          );

          return (
            <li key={integration.pipeline_id}>
              <span className="wpqt-font-semibold">
                {pipeline ? pipeline.name : ""}
              </span>
              {": "}
              {formatIntegrationCount(integration)}
            </li>
          );
        })}
      </ul>
      <p>{__("This can't be undone.", "quicktasker")}</p>
      <div className="wpqt-mt-4 wpqt-flex wpqt-justify-end wpqt-gap-2">
        <WPQTButton
          btnText={__("Cancel", "quicktasker")}
          buttonStyleType={ButtonStyleType.SECONDARY}
          onClick={() => onAnswer(false)}
        />
        <WPQTButton
          btnText={__("Remove and delete", "quicktasker")}
          buttonStyleType={ButtonStyleType.DANGER}
          onClick={() => onAnswer(true)}
        />
      </div>
    </WPQTModal>
  );
}

export { formatIntegrationCount, RemoveIntegrationsConfirmModal };
