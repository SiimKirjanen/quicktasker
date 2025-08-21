import { __ } from "@wordpress/i18n";
import { PipelineWebhooksContextProvider } from "../../../../../../../providers/PipelineWebhooksContextProvider";
import { Settings } from "../../../../Settings/Settings";

type Props = {
  pipelineId: string;
};

function PipelineWebhooksSettings({ pipelineId }: Props) {
  return (
    <PipelineWebhooksContextProvider pipelineId={pipelineId}>
      <Settings title={__("Board webhooks", "quicktasker")} description="">
        ege
      </Settings>
    </PipelineWebhooksContextProvider>
  );
}

export { PipelineWebhooksSettings };
