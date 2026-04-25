import { __ } from "@wordpress/i18n";
import { Info } from "../../../../components/Info/Info";
import { useMissingContent } from "../../../../hooks/useMissingContent";
import { PipelineOverviewContent } from "./components/PipelineOverviewContent";

type Props = {
  pipelineId: string;
};
function PipelineOverview({ pipelineId }: Props) {
  const { pipelineMissing } = useMissingContent();

  if (pipelineMissing) {
    return (
      <Info
        infoDescription={__(
          "The board related to this overview seems to be missing. It may have been deleted.",
          "quicktasker",
        )}
      />
    );
  }

  return <PipelineOverviewContent pipelineId={pipelineId} />;
}

export { PipelineOverview };
