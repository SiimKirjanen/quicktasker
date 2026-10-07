import { __, _n, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { PipelineIntegrationCount } from "../../../../../types/user";

/**
 * Describes a number of API tokens, webhooks and automations, like "2 API tokens and 1 automation".
 * Leaves out the kinds there are none of.
 */
function formatIntegrationCount({
  api_token_count,
  webhook_count,
  automation_count,
}: PipelineIntegrationCount) {
  const parts: string[] = [];

  if (api_token_count > 0) {
    parts.push(
      sprintf(
        // translators: %d: number of API tokens
        _n("%d API token", "%d API tokens", api_token_count, "quicktasker"),
        api_token_count,
      ),
    );
  }
  if (webhook_count > 0) {
    parts.push(
      sprintf(
        // translators: %d: number of webhooks
        _n("%d webhook", "%d webhooks", webhook_count, "quicktasker"),
        webhook_count,
      ),
    );
  }
  if (automation_count > 0) {
    parts.push(
      sprintf(
        // translators: %d: number of automations
        _n("%d automation", "%d automations", automation_count, "quicktasker"),
        automation_count,
      ),
    );
  }

  if (parts.length === 3) {
    return sprintf(
      // translators: 1: number of API tokens, 2: number of webhooks, 3: number of automations
      __("%1$s, %2$s and %3$s", "quicktasker"),
      ...parts,
    );
  }
  if (parts.length === 2) {
    return sprintf(
      // translators: 1 and 2: numbers of API tokens, webhooks or automations
      __("%1$s and %2$s", "quicktasker"),
      ...parts,
    );
  }

  return parts.join("");
}

type Props = {
  integration: PipelineIntegrationCount;
  // Says which API tokens, webhooks and automations stopped working and what makes them work again.
  message: string;
};

/**
 * Tells that a user's API tokens, webhooks and automations on a board stopped working, with links to them.
 */
function StoppedIntegrationsWarning({ integration, message }: Props) {
  const { pipeline_id, api_token_count, webhook_count, automation_count } =
    integration;

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
        {automation_count > 0 && (
          <a href={`#/board/${pipeline_id}/automations`}>
            {__("Open automations", "quicktasker")}
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
