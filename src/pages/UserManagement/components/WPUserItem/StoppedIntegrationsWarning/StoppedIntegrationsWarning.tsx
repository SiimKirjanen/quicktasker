import { __, _n, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
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
  integration: PipelineIntegrationCount;
  // Says which API tokens and webhooks stopped working and what makes them work again.
  message: string;
};

/**
 * Tells that a user's API tokens and webhooks on a board stopped working, with links to them.
 */
function StoppedIntegrationsWarning({ integration, message }: Props) {
  const { pipeline_id, api_token_count, webhook_count } = integration;

  return (
    <div data-testid="stopped-integrations-warning">
      {message}
      <div className="wpqt-mt-1 wpqt-flex wpqt-gap-3">
        {api_token_count > 0 && (
          <a href={`#/board/${pipeline_id}/api-tokens`}>
            {__("Open API tokens", "quicktasker")}
          </a>
        )}
        {webhook_count > 0 && (
          <a href={`#/board/${pipeline_id}/webhooks`}>
            {__("Open webhooks", "quicktasker")}
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Shows a StoppedIntegrationsWarning in a toast.
 */
function showStoppedIntegrationsWarning(
  integration: PipelineIntegrationCount,
  message: string,
) {
  toast.warning(
    <StoppedIntegrationsWarning integration={integration} message={message} />,
    // Stays until closed, so the admin has time to act on it.
    { autoClose: false },
  );
}

export {
  formatIntegrationCount,
  showStoppedIntegrationsWarning,
  StoppedIntegrationsWarning,
};
